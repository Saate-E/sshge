import { Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import LandingPage from './pages/LandingPage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    </Routes>
  )
}

export default App
