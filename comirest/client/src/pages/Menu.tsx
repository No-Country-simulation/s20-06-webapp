import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import './Menu.css'
import Footer from '../components/footer/Footer'

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

const menuData: Record<TabType, CategoryContent> = {
  platos: {
    mainDishes: [
      {
        id: 1,
        title: "Spaghetti alla Carbonara",
        description: "Ricota, jamón y mozzarella. \nCon salsa a elección de tomate, blanca o mixta. \n+ Gaseosa o Agua saborizada chica a elección.",
        price: 13000,
        image: "../src/assets/images/platodeldia01.png"
      }
    ],
    secondaryDish: {
      id: 2,
      title: "Tortellini",
      description: "Ricota, jamón y nueces. \nCon salsa a elección de tomate, blanca o mixta. \n+ Gaseosa o Agua saborizada chica a elección.",
      price: 14000,
      image: "../src/assets/images/platodeldia02.png"
    },
    threeDishes: [
      {
        id: 3,
        title: "Fetuccine al huevo",
        description: "Con salsa de tomate \n+ Gaseosa o Agua saborizada chica a elección.",
        price: 11000,
        image: "../src/assets/images/platodeldia03.png"
      },
      {
        id: 4,
        title: "Tagliatelle",
        description: "Con salsa de tomate \n+ Gaseosa o Agua saborizada chica a elección.",
        price: 11000,
        image: "../src/assets/images/platodeldia04.png"
      },
      {
        id: 5,
        title: "Gnocchi",
        description: "Con salsa de tomate \n+ Gaseosa o Agua saborizada chica a elección.",
        price: 11000,
        image: "../src/assets/images/platodeldia05.png"
      }
    ]
  },
  pastas: {
    mainDishes: [
      {
        id: 6,
        title: "Ravioles de Verdura",
        description: "Rellenos de espinaca y ricota. \nCon salsa a elección.",
        price: 12000,
        image: "../src/assets/images/pastas01.jpg"
      }
    ],
    secondaryDish: {
      id: 7,
      title: "Lasagna Clásica",
      description: "Capas de pasta con salsa boloñesa y bechamel.",
      price: 13500,
      image: "../src/assets/images/pastas02.webp"
    },
    threeDishes: [
      {
        id: 8,
        title: "Sorrentinos",
        description: "Rellenos de jamón y mozzarella.",
        price: 12500,
        image: "../src/assets/images/pastas03.jpg"
      },
      {
        id: 9,
        title: "Canelones",
        description: "Rellenos de carne y verduras.",
        price: 12000,
        image: "../src/assets/images/pastas04.jpg"
      },
      {
        id: 10,
        title: "Penne Rigate",
        description: "Con salsa arrabiata picante.",
        price: 11500,
        image: "../src/assets/images/pastas05.jpg"
      }
    ]
  },
  bebidas: {
    mainDishes: [
      {
        id: 11,
        title: "Vino Malbec",
        description: "Botella 750ml - Bodega Luigi Bosca",
        price: 8000,
        image: "../src/assets/images/bebidas01.jpg"
      }
    ],
    secondaryDish: {
      id: 12,
      title: "Cerveza Artesanal",
      description: "Variedad de estilos - 500ml",
      price: 1500,
      image: "../src/assets/images/bebidas02.jpg"
    },
    threeDishes: [
      {
        id: 13,
        title: "Agua Mineral",
        description: "Con/Sin gas - 500ml",
        price: 800,
        image: "../src/assets/images/bebidas03.jpg"
      },
      {
        id: 14,
        title: "Gaseosas",
        description: "Línea Coca-Cola - 500ml",
        price: 900,
        image: "../src/assets/images/bebidas04.jpg"
      },
      {
        id: 15,
        title: "Limonada",
        description: "Natural con menta y jengibre",
        price: 1000,
        image: "../src/assets/images/bebidas05.webp"
      }
    ]
  },
  postres: {
    mainDishes: [
      {
        id: 16,
        title: "Tiramisú",
        description: "Clásico postre italiano con café y mascarpone",
        price: 3500,
        image: "../src/assets/images/postres01.jpg"
      }
    ],
    secondaryDish: {
      id: 17,
      title: "Panna Cotta",
      description: "Con frutos rojos y salsa de caramelo",
      price: 3000,
      image: "../src/assets/images/postres02.jpg"
    },
    threeDishes: [
      {
        id: 18,
        title: "Gelato",
        description: "3 bochas de helado artesanal",
        price: 2500,
        image: "../src/assets/images/postres03.jpg"
      },
      {
        id: 19,
        title: "Cannoli",
        description: "Rellenos de crema pastelera",
        price: 2800,
        image: "../src/assets/images/postres04.png"
      },
      {
        id: 20,
        title: "Profiteroles",
        description: "Con chocolate caliente",
        price: 3200,
        image: "../src/assets/images/postres05.jpg"
      }
    ]
  },
  desayunos: {
    mainDishes: [
      {
        id: 21,
        title: "Desayuno Completo",
        description: "Café, jugo de naranja, tostadas, manteca y mermelada",
        price: 4500,
        image: "../src/assets/images/desayunos01.jpg"
      }
    ],
    secondaryDish: {
      id: 22,
      title: "Medialunas",
        description: "6 medialunas recién horneadas",
        price: 2500,
        image: "../src/assets/images/desayunos02.jpg"
    },
    threeDishes: [
      {
        id: 23,
        title: "Tostado Completo",
        description: "Jamón y queso con jugo de naranja",
        price: 3500,
        image: "../src/assets/images/desayunos03.jpg"
      },
      {
        id: 24,
        title: "Café con Leche",
        description: "Con 2 medialunas",
        price: 2000,
        image: "../src/assets/images/desayunos04.webp"
      },
      {
        id: 25,
        title: "Yogur con Granola",
        description: "Con frutas frescas y miel",
        price: 2800,
        image: "../src/assets/images/desayunos05.jpg"
      }
    ]
  }
}

const Menu: FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('platos')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

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