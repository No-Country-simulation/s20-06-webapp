import { FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import './Checkout.css'
import Footer from '../components/footer/Footer'
import { div } from 'framer-motion/client'

interface CartItem {
  id: number
  title: string
  description: string
  price: number
  image: string
  quantity: number
}

interface LocationState {
  cartItems: CartItem[]
  cartTotal: number
}

const Checkout: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  // Redireccionar si no hay estado o items
  if (!location.state || !location.state.cartItems?.length) {
    navigate('/menu')
    return null
  }

  const { cartItems, cartTotal } = location.state as LocationState

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handlePaymentClick = () => {
    setIsLoading(true)
    // Simular el proceso de pago
    setTimeout(() => {
      setIsLoading(false)
      setShowConfirmation(true)
    }, 2000)
  }

  return (
    <div>
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Primer contenedor - Título y botón cerrar */}
        <div className="header-container">
          <h1 className="checkout-title">Detalle de tu pedido</h1>
          <button 
            className="close-button"
            onClick={() => navigate('/menu')}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Segundo contenedor - Detalles del pedido */}
        <div className="order-details">
          <div className="order-description">
            <h2 className="section-title">Descripción</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <h3>{item.title}</h3>
                <div className="order-item-details">
                  <p className="order-item-description">
                    {item.description.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <div className="order-item-quantity">
                    <span>Cantidad: {item.quantity}</span>
                    <span className="order-item-price">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="order-images">
            {cartItems.map((item) => (
              <div key={item.id} className="order-image-container">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="order-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tercer contenedor - Total */}
        <div className="order-total">
          <div className="total-info">
            <div className="quantity-info">
              <span>Cantidad de productos:</span>
              <span>{totalItems}</span>
            </div>
            <div className="price-info">
              <span>Total a pagar:</span>
              <span>${cartTotal}</span>
            </div>
          </div>
        </div>

        {/* Cuarto contenedor - Métodos de pago */}
        <div className="payment-section">
          <h2 className="section-title">Métodos de pago</h2>
          <div className="payment-methods">
            {['Efectivo', 'Tarjeta de crédito', 'Tarjeta de débito'].map((method, index) => (
              <div 
                key={method} 
                className="payment-option"
                onClick={handlePaymentClick}
              >
                <div className="payment-image-container">
                  <img 
                    src={`../src/assets/images/payment0${index + 1}.png`}
                    alt={method}
                    className="payment-image"
                  />
                </div>
                <p className="payment-description">{method}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Loading Overlay */}
    {isLoading && (
      <div className="overlay">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando pago...</p>
        </div>
      </div>
    )}

    {/* Confirmation Popup */}
    {showConfirmation && (
      <div className="overlay">
        <div className="confirmation-popup">
          <h2>¡FELICITACIONES!</h2>
          <p>Tu orden ha sido registrada con éxito.</p>
          <p>Tu código para el pago es el <span>809</span></p>
          <button 
            className="close-popup-button"
            onClick={() => navigate('/menu')}
          >
            Aceptar
          </button>
        </div>
      </div>
    )}

    <Footer></Footer>
    </div>
  )
}

export default Checkout 