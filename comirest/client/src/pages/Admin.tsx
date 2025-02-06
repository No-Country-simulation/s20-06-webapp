import { FC, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const AdminSidebar: FC = () => {
  const location = useLocation()
  
  const menuItems = [
    { name: 'Inicio', path: '/admin' },
    { name: 'Historial de consumo', path: '/admin/historial' },
    { name: 'Inventario', path: '/admin/inventario' }
  ]

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg">
      {/* Logo */}
      <div className="p-6">
        <img 
          src="/COMIRESTLOGO.png" 
          alt="COMIREST" 
          className="w-full max-w-[150px] mx-auto"
        />
      </div>

      {/* Categorías */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">CATEGORÍAS</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#A9FFFF] text-gray-800'
                  : 'text-gray-600 hover:bg-[#A9FFFF]/20 hover:text-[#A9FFFF]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

const UserMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    navigate('/login')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <UserCircleIcon className="h-8 w-8" />
        <span className="text-sm font-medium">Admin User</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#A9FFFF]/20 hover:text-[#A9FFFF]"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const SalesChart: FC = () => {
  const [salesData, setSalesData] = useState<{ name: string; ventas: number; total: number }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [yAxisMetric, setYAxisMetric] = useState<'cantidad' | 'total'>('cantidad')
  const [xAxisGroup, setXAxisGroup] = useState<'plato' | 'categoria'>('plato')

  useEffect(() => {
    const fetchSalesData = async () => {
      setIsLoading(true)
      try {
        // Intentar obtener datos del caché
        const cachedData = localStorage.getItem('salesChartData')
        const cachedTimestamp = localStorage.getItem('salesChartTimestamp')
        const now = new Date().getTime()

        // Si hay datos en caché y tienen menos de 5 minutos, usarlos
        if (cachedData && cachedTimestamp && (now - Number(cachedTimestamp)) < 300000) {
          const parsedData = JSON.parse(cachedData)
          setSalesData(parsedData)
          setIsLoading(false)
        }

        // Hacer la petición al servidor
        const response = await fetch('https://s20-06-webapp.onrender.com/admin/consumption-history')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()

        const today = new Date().toISOString().split('T')[0]
        const todaysSales = data.filter((record: any) => 
          record.createdAt.startsWith(today)
        )

        let chartData = []

        if (xAxisGroup === 'plato') {
          // Agrupar por nombre de producto
          const salesByProduct = todaysSales.reduce((acc: any, record: any) => {
            const name = record.food.nameMenu
            if (!acc[name]) {
              acc[name] = { cantidad: 0, total: 0 }
            }
            acc[name].cantidad += record.quantity
            acc[name].total += record.total
            return acc
          }, {})

          chartData = Object.entries(salesByProduct).map(([name, data]: [string, any]) => ({
            name,
            ventas: data.cantidad,
            total: data.total
          }))

          chartData.sort((a, b) => b[yAxisMetric === 'cantidad' ? 'ventas' : 'total'] - 
                                 a[yAxisMetric === 'cantidad' ? 'ventas' : 'total'])
        } else {
          // Agrupar por categoría
          const salesByCategory = todaysSales.reduce((acc: any, record: any) => {
            const category = record.food.category
            if (!acc[category]) {
              acc[category] = { cantidad: 0, total: 0 }
            }
            acc[category].cantidad += record.quantity
            acc[category].total += record.total
            return acc
          }, {})

          chartData = Object.entries(salesByCategory).map(([name, data]: [string, any]) => ({
            name: name === 'PLATODELDIA' ? 'Platos del Día' :
                 name === 'PASTAS' ? 'Pastas' :
                 name === 'BEBIDA' ? 'Bebidas' :
                 name === 'POSTRES' ? 'Postres' :
                 name === 'DESAYUNO' ? 'Desayunos' : name,
            ventas: data.cantidad,
            total: data.total
          }))

          chartData.sort((a, b) => b[yAxisMetric === 'cantidad' ? 'ventas' : 'total'] - 
                                 a[yAxisMetric === 'cantidad' ? 'ventas' : 'total'])
        }

        // Guardar en caché
        localStorage.setItem('salesChartData', JSON.stringify(chartData))
        localStorage.setItem('salesChartTimestamp', now.toString())
        
        setSalesData(chartData)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de ventas')
        console.error('Error fetching sales data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSalesData()
  }, [xAxisGroup, yAxisMetric])

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Productos Más Vendidos del Día
        </h2>
        <div className="flex justify-center items-center h-[400px]">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#A9FFFF] border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Productos Más Vendidos del Día
        </h2>
        <div className="flex justify-center items-center h-[400px] text-red-500">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Productos Más Vendidos del Día
        </h2>
        <div className="flex gap-4">
          <select
            value={yAxisMetric}
            onChange={(e) => setYAxisMetric(e.target.value as 'cantidad' | 'total')}
            className="pl-3 pr-10 py-2 text-sm border-gray-300 bg-[#F4B042]/10 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] rounded-md text-gray-800"
          >
            <option value="cantidad">Cantidad</option>
            <option value="total">Venta Total</option>
          </select>
          <select
            value={xAxisGroup}
            onChange={(e) => setXAxisGroup(e.target.value as 'plato' | 'categoria')}
            className="pl-3 pr-10 py-2 text-sm border-gray-300 bg-[#F4B042]/10 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] rounded-md text-gray-800"
          >
            <option value="plato">Por Plato</option>
            <option value="categoria">Por Categoría</option>
          </select>
        </div>
      </div>
      <div className="h-[400px] w-full">
        {salesData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 60
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                height={60}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{ 
                  value: yAxisMetric === 'cantidad' ? 'Cantidad vendida' : 'Venta Total ($)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip />
              <Bar 
                dataKey={yAxisMetric === 'cantidad' ? 'ventas' : 'total'}
                fill="#F4B042"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            No hay ventas registradas hoy
          </div>
        )}
      </div>
    </div>
  )
}

const SalesSummary: FC = () => {
  const [summaryData, setSummaryData] = useState<{
    totalVentas: number;
    topPlatos: Array<{ name: string; cantidad: number; total: number }>;
    topCategorias: Array<{ name: string; cantidad: number; total: number }>;
  }>({
    totalVentas: 0,
    topPlatos: [],
    topCategorias: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metricType, setMetricType] = useState<'cantidad' | 'total'>('cantidad')

  useEffect(() => {
    const fetchSummaryData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://s20-06-webapp.onrender.com/admin/consumption-history')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()

        const today = new Date().toISOString().split('T')[0]
        const todaysSales = data.filter((record: any) => 
          record.createdAt.startsWith(today)
        )

        // Calcular total de ventas
        const totalVentas = todaysSales.reduce((sum: number, record: any) => 
          sum + record.total, 0
        )

        // Agrupar por platos
        const salesByProduct = todaysSales.reduce((acc: any, record: any) => {
          const name = record.food.nameMenu
          if (!acc[name]) {
            acc[name] = { cantidad: 0, total: 0 }
          }
          acc[name].cantidad += record.quantity
          acc[name].total += record.total
          return acc
        }, {})

        // Agrupar por categorías
        const salesByCategory = todaysSales.reduce((acc: any, record: any) => {
          const category = record.food.category
          if (!acc[category]) {
            acc[category] = { cantidad: 0, total: 0 }
          }
          acc[category].cantidad += record.quantity
          acc[category].total += record.total
          return acc
        }, {})

        // Convertir y ordenar platos
        const topPlatos = Object.entries(salesByProduct)
          .map(([name, data]: [string, any]) => ({
            name,
            cantidad: data.cantidad,
            total: data.total
          }))
          .sort((a, b) => b.cantidad - a.cantidad)
          .slice(0, 3)

        // Convertir y ordenar categorías
        const topCategorias = Object.entries(salesByCategory)
          .map(([name, data]: [string, any]) => ({
            name: name === 'PLATODELDIA' ? 'Platos del Día' :
                 name === 'PASTAS' ? 'Pastas' :
                 name === 'BEBIDA' ? 'Bebidas' :
                 name === 'POSTRES' ? 'Postres' :
                 name === 'DESAYUNO' ? 'Desayunos' : name,
            cantidad: data.cantidad,
            total: data.total
          }))
          .sort((a, b) => b.cantidad - a.cantidad)
          .slice(0, 3)

        setSummaryData({
          totalVentas,
          topPlatos,
          topCategorias
        })
        setError(null)
      } catch (err) {
        setError('Error al cargar el resumen de ventas')
        console.error('Error fetching summary data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSummaryData()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-96">
        <div className="flex justify-center items-center h-full">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#A9FFFF] border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-96">
        <div className="flex justify-center items-center h-full text-red-500">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Resumen de Ventas del Día
        </h2>
        <select
          value={metricType}
          onChange={(e) => setMetricType(e.target.value as 'cantidad' | 'total')}
          className="pl-3 pr-10 py-2 text-sm border-gray-300 bg-[#F4B042]/10 focus:outline-none focus:ring-[#F4B042] focus:border-[#F4B042] rounded-md text-gray-800"
        >
          <option value="cantidad">Ver Cantidades</option>
          <option value="total">Ver Total Vendido</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total de Ventas */}
        <div className="bg-[#F4B042]/10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Ventas Totales
          </h3>
          <p className="text-3xl font-bold text-[#F4B042]">
            ${summaryData.totalVentas.toLocaleString()}
          </p>
        </div>

        {/* Top 3 Platos */}
        <div className="bg-[#F4B042]/10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Platos Más Vendidos
          </h3>
          <ul className="space-y-2">
            {summaryData.topPlatos.map((plato, index) => (
              <li key={plato.name} className="flex justify-between items-center">
                <span className="text-gray-800">
                  {index + 1}. {plato.name}
                </span>
                <span className="text-[#F4B042] text-lg font-medium">
                  {metricType === 'cantidad' 
                    ? `${plato.cantidad} unid.`
                    : `$${plato.total.toLocaleString()}`
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top 3 Categorías */}
        <div className="bg-[#F4B042]/10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Categorías Más Vendidas
          </h3>
          <ul className="space-y-2">
            {summaryData.topCategorias.map((categoria, index) => (
              <li key={categoria.name} className="flex justify-between items-center">
                <span className="text-gray-800">
                  {index + 1}. {categoria.name}
                </span>
                <span className="text-[#F4B042] text-lg font-medium">
                  {metricType === 'cantidad' 
                    ? `${categoria.cantidad} unid.`
                    : `$${categoria.total.toLocaleString()}`
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const Admin: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="bg-[#A9FFFF] shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">Panel General</h1>
              <UserMenu />
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <SalesChart />
            <SalesSummary />
          </div>
        </main>
      </div>
    </div>
  )
}

export { AdminSidebar, UserMenu }
export default Admin 