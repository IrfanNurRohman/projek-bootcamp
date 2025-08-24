import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// import Home from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProfilePage from './pages/profilPage.jsx'
import CourseDetail from './components/CourseDetail'

export default function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:id" element={<CourseDetail />} />
        </Route>
        <Route path="*" element={<div className="container-std"><div className="card"><h2 className="text-xl font-semibold">404</h2><p className="text-slate-300">Halaman tidak ditemukan.</p></div></div>} />
      </Routes>

      {/* Conditionally render the Footer based on the current route */}
      {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
    </AuthProvider>
  )
}
