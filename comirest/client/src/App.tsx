import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'
import Login from './components/login/Login'
import Admin from './pages/Admin'
import Inventario from './pages/Inventario'
import Historial from './pages/Historial'

const App: FC = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/inventario" element={<Inventario />} />
        <Route path="/admin/historial" element={<Historial />} />
      </Routes>
    </div>
  )
}

export default App
