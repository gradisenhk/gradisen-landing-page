import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Gdsense from './pages/Gdsense'
import Gdsmart from './pages/Gdsmart'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gdsense" element={<Gdsense />} />
        <Route path="/gdsmart" element={<Gdsmart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
