import Login from "./components/login/Login"
import { FC } from 'react'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'
import { Routes, Route } from 'react-router-dom'

const App: FC = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
