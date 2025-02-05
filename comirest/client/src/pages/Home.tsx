import { FC } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'
import 'swiper/css'
import 'swiper/css/pagination'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import './Home.css'
import Footer from '../components/footer/Footer'
import { useNavigate } from 'react-router-dom'
import { images } from '../assets/images'
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Arreglar el ícono del marcador
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

const TopBar: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="topbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Contacto y Redes Sociales */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-300">
              <PhoneIcon className="w-4 h-4 mr-2" />
              <span>+541526355957</span>
            </div>
            <div className="flex items-center space-x-3">
              {/* Facebook */}
              <a 
                href="#" 
                className="text-gray-300 hover:text-red-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="#" 
                className="text-gray-300 hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Botón Administrador */}
          <button 
            onClick={() => navigate('/login')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm transition-colors"
          >
            ADMINISTRADOR
          </button>
        </div>
      </div>
    </div>
  )
}

const Navigation: FC = () => {
  const navigate = useNavigate()

  return (
    <header className="w-full">
      <TopBar />
      <div className="middle-bar" />
      <nav className="main-nav">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="nav-title"
            >
              Pasta Nonna
            </motion.div>

            {/* Navigation Links */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center space-x-8"
            >
              {[
                { name: 'Menú', path: '/menu' },
                { name: 'Nosotros', path: '/nosotros' },
                { name: 'Contacto', path: '/contacto' },
                { name: 'QR', path: '/qr' }
              ].map((item) => (
                <button
                  key={item.name}
                  className="text-white hover:text-red-500 transition-colors"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </button>
              ))}
            </motion.div>

            {/* Search and Cart */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <button className="relative text-gray-300 hover:text-red-500 transition-colors">
                <ShoppingCartIcon className="w-6 h-6" />
                <span className="cart-badge">
                  0
                </span>
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="search-input"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              
            </motion.div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const Home: FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="hero-content grid md:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-image-container"
            >
              <div className="absolute inset-0 bg-neutral-800">
                <img src={images.home.image01} alt="" />
              </div>
            </motion.div>

            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text-container"
            >
              <h1 className="hero-title">
                Pasta Nonna
              </h1>
              <h2 className="hero-subtitle">
                ¡Bienvenidos a Pasta Nonna!
              </h2>
              <p className="hero-description">
                Pasta Nonna no es sólo un lugar para disfrutar de las mejores pastas. Es un paraíso para tu paladar, un lugar confortable donde sentirás una explosión de sabores. Aquí crearás inolvidables momentos de bienestar con el mejor servicio y el amor con el que nuestros chef realizan cada plato.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-button"
              >
                Reservas
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Acerca de Nosotros Section */}
      <section className="about-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna de texto */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="about-title">
                Acerca de Nosotros
              </h2>
              <p className="about-description">
                En Pasta Nonna, la pasta es mucho más que un plato: es una herencia, una tradición transmitida de generación en generación. Desde 1979, hemos abierto nuestras puertas con el firme propósito de compartir la auténtica cocina italiana. Nuestras recetas, muy bien guardadas, combinan ingredientes frescos y de la más alta calidad con técnicas artesanales que evocan los sabores de la nonna. Cada plato es una invitación a un viaje a Italia, un recorrido por 
              </p>
              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="text-red-400 hover:text-red-500 inline-flex items-center gap-2 transition-colors"
              >
                Ver más...
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </motion.a>
            </motion.div>

            {/* Imagen */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="about-image">
                <div className="absolute inset-0 bg-neutral-800">
                  <img src={images.home.image02} alt="" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menú Section */}
      <section className="menu-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="menu-title">
              Menú
            </h2>
          </motion.div>

          <div className="menu-grid">
            {[
              { 
                name: 'Spaghetti alla Carbonara',
                image: images.home.menu01
              },
              { 
                name: 'Fettuccine Alfredo',
                image: images.home.menu02
              },
              { 
                name: 'Ravioli di Ricotta',
                image: images.home.menu03
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="menu-item"
              >
                <div className="menu-image-container">
                  <div className="absolute inset-0 bg-neutral-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="menu-item-title">
                  {item.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicanos Section */}
      <section className="location-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="location-content">
            {/* Mapa y Título */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-6"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Dónde estamos
              </h2>
              <div className="location-map">
                <MapContainer 
                  center={[-34.6037, -58.3816]} 
                  zoom={15} 
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LeafletMarker position={[-34.6037, -58.3816]}>
                    <Popup>
                      Pasta Nonna <br /> ¡Te esperamos!
                    </Popup>
                  </LeafletMarker>
                </MapContainer>
              </div>
            </motion.div>

            {/* Horario y Dirección */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3 space-y-8"
            >
              {/* Horario */}
              <div>
                <div className="flex items-center gap-2 text-black mb-4">
                  <ClockIcon className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Horario</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Lunes a Domingo</span>
                    <span>10:00 a 22:00</span>
                  </li>
                </ul>
              </div>

              {/* Dirección */}
              <div>
                <div className="flex items-center gap-2 text-black mb-4">
                  <MapPinIcon className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Dirección</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Almirante Barbosa 445<br />
                </p>
              </div>
            </motion.div>

            {/* Contacto */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-3 space-y-8"
            >
              {/* Email */}
              <div>
                <div className="flex items-center gap-2 text-black mb-4">
                  <EnvelopeIcon className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Email</h3>
                </div>
                <a 
                  href="mailto:contacto@pizzeria.com.ar"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  pastanonna@pastanonna.com
                </a>
              </div>

              {/* WhatsApp */}
              <div>
                <div className="flex items-center gap-2 text-black mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <h3 className="text-xl font-bold">WhatsApp</h3>
                </div>
                <a 
                  href="https://wa.me/5491123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  +54 11942568945
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  )
}

export default Home 