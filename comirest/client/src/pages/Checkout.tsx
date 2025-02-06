import { FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import './Checkout.css'
import Footer from '../components/footer/Footer'
import payment01 from '../assets/images/payment01.png'
import payment02 from '../assets/images/payment02.png'
import payment03 from '../assets/images/payment03.png'

interface CartItem {
  id: number
  title: string
  description: string
  price: number
  image: string
  quantity: number
  nameMenu: string
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
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  // Redireccionar si no hay estado o items
  if (!location.state || !location.state.cartItems?.length) {
    navigate('/menu')
    return null
  }

  const { cartItems, cartTotal } = location.state as LocationState

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const paymentImages = [payment01, payment02, payment03]

  const handlePayment = async (paymentMethod: string) => {
    try {
      console.log('Iniciando proceso de pago...')
      console.log('Items en el carrito:', cartItems)

      // Procesar cada item del carrito de forma secuencial
      for (const item of cartItems) {
        console.log('Procesando item:', item)
        
        const url = `https://s20-06-webapp.onrender.com/admin/consumption-history/consume-food?name=${item.title}&quantity=${item.quantity}`
        
        console.log('URL de la petición:', url)

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'accept': '*/*'
          }
        })

        console.log('Respuesta del servidor:', {
          status: response.status,
          statusText: response.statusText
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Error detallado:', errorText)
          throw new Error(`Error al registrar el producto: ${item.title}. Status: ${response.status}`)
        }

        const responseData = await response.json().catch(e => console.log('No JSON response'))
        console.log('Datos de respuesta:', responseData)
      }

      console.log('Todos los productos fueron registrados correctamente')
      setShowConfirmation(true)
      setTimeout(() => {
        navigate('/menu')
      }, 2000)

    } catch (error) {
      console.error('Error completo:', error)
      console.error('Stack trace:', (error as Error).stack)
      setErrorMessage('Error al procesar el pago. Por favor, intente nuevamente.')
      setShowErrorModal(true)
    }
  }

  // Modal de Error
  const ErrorModal: FC<{ message: string }> = ({ message }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <XMarkIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Error</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {message}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={() => setShowErrorModal(false)}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-900">
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
            <div 
              className="payment-option"
              onClick={() => handlePayment('efectivo')}
            >
              <div className="payment-image-container">
                <img 
                  src={payment01}
                  alt="Efectivo"
                  className="payment-image"
                />
              </div>
              <p className="payment-description">Efectivo</p>
            </div>
            <div 
              className="payment-option"
              onClick={() => handlePayment('debito')}
            >
              <div className="payment-image-container">
                <img 
                  src={payment02}
                  alt="Tarjeta de Débito"
                  className="payment-image"
                />
              </div>
              <p className="payment-description">Tarjeta de Débito</p>
            </div>
            <div 
              className="payment-option"
              onClick={() => handlePayment('credito')}
            >
              <div className="payment-image-container">
                <img 
                  src={payment03}
                  alt="Tarjeta de Crédito"
                  className="payment-image"
                />
              </div>
              <p className="payment-description">Tarjeta de Crédito</p>
            </div>
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

    {showErrorModal && <ErrorModal message={errorMessage} />}

    <Footer></Footer>
    </div>
  )
}

export default Checkout 