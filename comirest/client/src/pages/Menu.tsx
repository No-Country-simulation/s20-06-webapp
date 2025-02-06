import { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import './Menu.css'
import Footer from '../components/footer/Footer'

interface MenuItem {
  id: number
  nameMenu: string
  description: string
  price: number
  category: string
  imageUrl: string
}

type TabType = 'platos' | 'pastas' | 'bebidas' | 'postres' | 'desayunos'

interface DishItem {
  id: number
  title: string
  description: string
  price: number
  image: string
}

interface CategoryContent {
  mainDishes: DishItem[]
  secondaryDish: DishItem
  threeDishes: DishItem[]
}

interface CartItem extends DishItem {
  quantity: number
}

const Menu: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('platos')
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Intentar obtener datos del caché
        const cachedMenu = localStorage.getItem('menuItems')
        const cachedTimestamp = localStorage.getItem('menuTimestamp')
        const now = new Date().getTime()

        // Si hay datos en caché y tienen menos de 5 minutos, usarlos
        if (cachedMenu && cachedTimestamp && (now - Number(cachedTimestamp)) < 300000) {
          const parsedMenu = JSON.parse(cachedMenu)
          setMenuItems(parsedMenu)
          setIsLoading(false)
          // Hacer la petición en segundo plano
          fetchLatestData()
          return
        }

        // Si no hay caché o expiró, hacer la petición normalmente
        await fetchLatestData()

      } catch (error) {
        console.error('Error fetching menu:', error)
        setError('Error al cargar el menú')
      }
    }

    const fetchLatestData = async () => {
      try {
        const response = await fetch('https://s20-06-webapp.onrender.com/foods')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        
        // Guardar en caché
        localStorage.setItem('menuItems', JSON.stringify(data))
        localStorage.setItem('menuTimestamp', new Date().getTime().toString())
        
        setMenuItems(data.sort((a: MenuItem, b: MenuItem) => a.id - b.id))
        setError(null)
      } catch (error) {
        console.error('Error fetching menu:', error)
        setError('Error al cargar el menú')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const getFilteredItems = (category: string): DishItem[] => {
    if (error || isLoading) return []
    
    return menuItems
      .filter(item => item.category === category.toUpperCase())
      .map(item => ({
        id: item.id,
        title: item.nameMenu,
        description: item.description,
        price: item.price,
        image: item.imageUrl
      }))
  }

  const getCategoryContent = (category: string): CategoryContent => {
    const items = getFilteredItems(category)
    const defaultItem = {
      id: 0,
      title: isLoading ? 'Cargando...' : error || 'No disponible',
      description: '',
      price: 0,
      image: ''
    }
    
    return {
      mainDishes: items.length > 0 ? [items[0]] : [defaultItem],
      secondaryDish: items[1] || defaultItem,
      threeDishes: items.length > 2 ? items.slice(2) : []
    }
  }

  const menuData: Record<TabType, CategoryContent> = {
    platos: getCategoryContent('PLATODELDIA'),
    pastas: getCategoryContent('PASTAS'),
    bebidas: getCategoryContent('BEBIDA'),
    postres: getCategoryContent('POSTRES'),
    desayunos: getCategoryContent('DESAYUNO')
  }

  const tabs = [
    { id: 'platos', label: 'Platos del Día' },
    { id: 'pastas', label: 'Pastas' },
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'postres', label: 'Postres' },
    { id: 'desayunos', label: 'Desayunos' }
  ]

  const currentContent = menuData[activeTab]

  const addToCart = (dish: DishItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === dish.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...dish, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== id)
    )
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  )

  return (
    <div className="menu-page">
      {/* Botón de regreso */}
      <div className="back-button-container">
        <button 
          onClick={() => navigate('/')}
          className="back-button"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Banner */}
      <div className="menu-banner">
        <div className="banner-overlay">
          <h1 className="banner-title">Carta</h1>
        </div>
      </div>

      {/* Contenedor principal del menú */}
      <div className="menu-container">
        {/* Navbar de categorías con carrito */}
        <nav className="menu-tabs">
          <div className="menu-tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`menu-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as TabType)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="cart-container">
            <button 
              className="cart-button"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="cart-count">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Dropdown del carrito */}
            {isCartOpen && (
              <div className="cart-dropdown">
                <h3 className="cart-title">Carrito de Compras</h3>
                {cartItems.length === 0 ? (
                  <p className="cart-empty">El carrito está vacío</p>
                ) : (
                  <>
                    <div className="cart-items">
                      {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="cart-item-image"
                          />
                          <div className="cart-item-info">
                            <h4>{item.title}</h4>
                            <p>${item.price}</p>
                            <div className="quantity-controls">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                +
                              </button>
                            </div>
                          </div>
                          <button 
                            className="remove-item"
                            onClick={() => removeFromCart(item.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="cart-footer">
                      <div className="cart-total">
                        <span>Total:</span>
                        <span>${cartTotal}</span>
                      </div>
                      <button 
                        className="pay-button"
                        onClick={() => navigate('/checkout', { 
                          state: { 
                            cartItems,
                            cartTotal
                          } 
                        })}
                      >
                        Pagar
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Contenedores para el contenido */}
        <div className="menu-content">
          {/* Primer contenedor */}
          <div className="content-container">
            <div className="dish-container">
              <div className="dish-image-container">
                <img 
                  src={currentContent.mainDishes[0].image}
                  alt={currentContent.mainDishes[0].title}
                  className="dish-image"
                />
              </div>
              <div className="dish-info">
                <h3 className="dish-title">{currentContent.mainDishes[0].title}</h3>
                <p className="dish-description">
                  {currentContent.mainDishes[0].description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <div className="dish-footer">
                  <span className="dish-price">${currentContent.mainDishes[0].price}</span>
                  <button 
                    className="add-button"
                    onClick={() => addToCart(currentContent.mainDishes[0])}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Segundo contenedor */}
          <div className="content-container">
            <div className="dish-container">
              <div className="dish-info">
                <h3 className="dish-title">{currentContent.secondaryDish.title}</h3>
                <p className="dish-description">
                  {currentContent.secondaryDish.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <div className="dish-footer">
                  <button 
                    className="add-button"
                    onClick={() => addToCart(currentContent.secondaryDish)}
                  >
                    Agregar
                  </button>
                  <span className="dish-price">${currentContent.secondaryDish.price}</span>
                </div>
              </div>
              <div className="dish-image-container">
                <img 
                  src={currentContent.secondaryDish.image}
                  alt={currentContent.secondaryDish.title}
                  className="dish-image"
                />
              </div>
            </div>
          </div>
          
          {/* Tercer contenedor */}
          <div className="content-container">
            <div className="three-dishes-container">
              {currentContent.threeDishes.map((dish) => (
                <div key={dish.id} className="dish-card">
                  <div className="dish-card-image">
                    <img 
                      src={dish.image}
                      alt={dish.title}
                      className="dish-image"
                    />
                  </div>
                  <div className="dish-card-info">
                    <h3 className="dish-title">{dish.title}</h3>
                    <p className="dish-description">
                      {dish.description.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    <div className="dish-footer">
                      <span className="dish-price">${dish.price}</span>
                      <button 
                        className="add-button"
                        onClick={() => addToCart(dish)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Menu 