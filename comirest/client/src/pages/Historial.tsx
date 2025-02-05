import { FC, useState, useEffect } from 'react'
import { AdminSidebar, UserMenu } from './Admin'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Food {
  id: number
  nameMenu: string
  description: string
  price: number
  category: string
  imageUrl: string
}

interface ConsumptionRecord {
  id: number
  food: Food
  quantity: number
  total: number
  createdAt: string
}

const Historial: FC = () => {
  const [records, setRecords] = useState<ConsumptionRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<ConsumptionRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('TODAS')
  const [selectedDate, setSelectedDate] = useState<string>('')

  const categories = [
    { value: 'TODAS', label: 'Todas las categorías' },
    { value: 'PLATODELDIA', label: 'Platos del Día' },
    { value: 'PASTAS', label: 'Pastas' },
    { value: 'BEBIDA', label: 'Bebidas' },
    { value: 'POSTRES', label: 'Postres' },
    { value: 'DESAYUNO', label: 'Desayunos' }
  ]

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://s20-06-webapp.onrender.com/admin/consumption-history')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setRecords(data)
        setFilteredRecords(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar el historial')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  useEffect(() => {
    let result = [...records]
    
    // Filtrar por categoría
    if (selectedCategory !== 'TODAS') {
      result = result.filter(record => record.food.category === selectedCategory)
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(record => 
        record.food.nameMenu.toLowerCase().includes(searchLower) ||
        record.food.description.toLowerCase().includes(searchLower)
      )
    }

    // Filtrar por fecha
    if (selectedDate) {
      result = result.filter(record => 
        record.createdAt.startsWith(selectedDate)
      )
    }
    
    setFilteredRecords(result)
  }, [searchTerm, selectedCategory, selectedDate, records])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.replace(' ', 'T'))
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        <header className="bg-[#A9FFFF] shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">Historial de Consumo</h1>
              <UserMenu />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Filtros y búsqueda */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-[#F4B042]/10 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] sm:text-sm"
              />
            </div>
            <div className="w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-[#F4B042]/10 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] sm:text-sm rounded-md text-gray-800"
                style={{ backgroundColor: 'rgb(244 176 66 / 0.1)' }}
              >
                {categories.map((category) => (
                  <option 
                    key={category.value} 
                    value={category.value}
                    style={{ backgroundColor: 'rgb(244 176 66 / 0.1)' }}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-64">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-[#F4B042]/10 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] sm:text-sm rounded-md text-gray-800"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#A9FFFF] border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-12">{error}</div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <li key={record.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img 
                          src={record.food.imageUrl} 
                          alt={record.food.nameMenu}
                          className="h-16 w-16 rounded-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {record.food.nameMenu}
                        </p>
                        <p className="text-sm text-gray-500">
                          {record.food.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(record.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F4B042]/20 text-[#F4B042]">
                          Cantidad: {record.quantity}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          Total: ${record.total}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {filteredRecords.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No se encontraron registros que coincidan con la búsqueda
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Historial 