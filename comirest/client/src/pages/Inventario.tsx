import { FC, useState, useEffect } from 'react'
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AdminSidebar, UserMenu } from './Admin'

interface MenuItem {
  id: number
  nameMenu: string
  description: string
  price: number
  category: string
  imageUrl: string
}

interface EditModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onSave: (item: MenuItem, file?: File) => Promise<void>
  mode: 'edit' | 'create'
}

const EditModal: FC<EditModalProps> = ({ item, isOpen, onClose, onSave, mode }) => {
  const [editedItem, setEditedItem] = useState<MenuItem | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (mode === 'create') {
      setEditedItem({
        id: 0,
        nameMenu: '',
        description: '',
        price: 0,
        category: 'PLATODELDIA',
        imageUrl: ''
      })
    } else {
      setEditedItem(item)
    }
  }, [item, mode])

  if (!isOpen || !editedItem) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editedItem) return

    setIsSaving(true)
    setError(null)
    try {
      await onSave(editedItem, selectedFile || undefined)
      onClose()
    } catch (err) {
      setError('Error al guardar los cambios')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {mode === 'create' ? 'Crear Nuevo Plato' : 'Modificar Plato'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === 'edit' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <input
                  type="text"
                  value={editedItem.id}
                  disabled
                  className="mt-1 block w-full rounded-md bg-[#F4B042]/10 border-gray-300 cursor-not-allowed shadow-sm sm:text-sm text-gray-800"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={editedItem.nameMenu}
                onChange={(e) => setEditedItem({...editedItem, nameMenu: e.target.value})}
                className="mt-1 block w-full rounded-md bg-[#F4B042]/10 border-gray-300 shadow-sm focus:border-[#F4B042] focus:ring-[#F4B042] sm:text-sm text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={editedItem.description}
                onChange={(e) => setEditedItem({...editedItem, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full rounded-md bg-[#F4B042]/10 border-gray-300 shadow-sm focus:border-[#F4B042] focus:ring-[#F4B042] sm:text-sm text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                value={editedItem.price}
                onChange={(e) => setEditedItem({...editedItem, price: Number(e.target.value)})}
                className="mt-1 block w-full rounded-md bg-[#F4B042]/10 border-gray-300 shadow-sm focus:border-[#F4B042] focus:ring-[#F4B042] sm:text-sm text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                value={editedItem.category}
                onChange={(e) => setEditedItem({...editedItem, category: e.target.value})}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-[#F4B042]/10 border-gray-300 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] sm:text-sm rounded-md text-gray-800"
              >
                <option value="PLATODELDIA">Platos del Día</option>
                <option value="PASTAS">Pastas</option>
                <option value="BEBIDA">Bebidas</option>
                <option value="POSTRES">Postres</option>
                <option value="DESAYUNO">Desayunos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#A9FFFF]/20 file:text-gray-800
                  hover:file:bg-[#A9FFFF]/30"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-600">{error}</div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#A9FFFF] text-base font-medium text-gray-800 hover:bg-[#A9FFFF]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9FFFF] sm:text-sm disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const Inventario: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('PLATODELDIA')
  const [items, setItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'edit' | 'create'>('edit')

  const categories = [
    { value: 'PLATODELDIA', label: 'Platos del Día' },
    { value: 'PASTAS', label: 'Pastas' },
    { value: 'BEBIDA', label: 'Bebidas' },
    { value: 'POSTRES', label: 'Postres' },
    { value: 'DESAYUNO', label: 'Desayunos' }
  ]

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://s20-06-webapp.onrender.com/foods/category/${selectedCategory}`)
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setItems(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [selectedCategory])

  const handleEdit = async (item: MenuItem) => {
    try {
      const response = await fetch(`https://s20-06-webapp.onrender.com/foods/${item.id}`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setSelectedItem(data)
      setModalMode('edit')
      setIsModalOpen(true)
    } catch (err) {
      setError('Error al cargar los datos del plato')
    }
  }

  const handleCreate = () => {
    setSelectedItem(null)
    setModalMode('create')
    setIsModalOpen(true)
  }

  const handleSave = async (updatedItem: MenuItem, file?: File) => {
    try {
      if (modalMode === 'create') {
        // Crear nuevo plato
        const formData = new FormData()
        formData.append('nameMenu', updatedItem.nameMenu)
        formData.append('description', updatedItem.description)
        formData.append('price', updatedItem.price.toString())
        formData.append('category', updatedItem.category)
        if (file) {
          formData.append('image', file)
        }

        const response = await fetch(
          'https://s20-06-webapp.onrender.com/foods', 
          {
            method: 'POST',
            headers: {
              'accept': '*/*'
            },
            body: formData
          }
        )

        if (!response.ok) {
          throw new Error('Failed to create')
        }

        const newItem = await response.json()
        setItems(prevItems => [...prevItems, newItem])
      } else {
        // Código existente para actualizar
        // Crear FormData
        const formData = new FormData()
        formData.append('nameMenu', updatedItem.nameMenu)
        formData.append('description', updatedItem.description)
        formData.append('price', updatedItem.price.toString())
        formData.append('category', updatedItem.category)
        formData.append('imageURL', updatedItem.imageUrl)

        const response = await fetch(
          `https://s20-06-webapp.onrender.com/foods/${updatedItem.id}`, 
          {
            method: 'PUT',
            headers: {
              'accept': '*/*'
            },
            body: formData
          }
        )

        if (!response.ok) {
          const errorData = await response.text()
          console.error('Error response:', errorData)
          throw new Error('Failed to update')
        }

        const updatedData = await response.json()
        
        // Actualizar la lista de items
        const updatedItems = items.map(item => 
          item.id === updatedItem.id ? {
            ...item,
            nameMenu: updatedData.nameMenu,
            description: updatedData.description,
            price: updatedData.price,
            category: updatedData.category,
            imageUrl: updatedData.imageUrl
          } : item
        )
        setItems(updatedItems)
      }
    } catch (error) {
      console.error('Error saving item:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="bg-[#A9FFFF] shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">Inventario</h1>
              <UserMenu />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Categoría
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-[#F4B042]/10 border-gray-300 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] sm:text-sm rounded-md text-gray-800"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCreate}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-800 bg-[#A9FFFF] hover:bg-[#A9FFFF]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9FFFF]"
            >
              Agregar nuevo plato
            </button>
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
                {items.map((item) => (
                  <li key={item.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img 
                          src={item.imageUrl} 
                          alt={item.nameMenu}
                          className="h-16 w-16 rounded-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.nameMenu}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F4B042]/20 text-[#F4B042]">
                          ${item.price}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-800 bg-[#A9FFFF] hover:bg-[#A9FFFF]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9FFFF]"
                        >
                          Modificar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>

      <EditModal
        item={selectedItem}
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedItem(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}

export default Inventario 