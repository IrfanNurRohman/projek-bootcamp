import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import imageLogo from '../assets/logonavbar.png' // Import the logo image correctly
import profilImage from '../assets/profil.png'  // Import the profile image

const linkCls = ({ isActive }) => isActive ? "text-black" : "text-black/80 hover:text-black"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()  // Get the current location (path) from react-router-dom

  // Check if we are on Login or Register page
  const isOnAuthPage = location.pathname === '/login' || location.pathname === '/register'
  const isOnDashboardPage = location.pathname === '/dashboard'

  return (
    <nav className="sticky top-0 z-10 backdrop-blur bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={imageLogo} alt="Logo" className="h-8" />
        </div>

        {/* Navbar Links */}
        <div className="flex items-center gap-4">
          {/* Show these links only if not on Login, Register or Dashboard pages */}
          {!isOnAuthPage && !isOnDashboardPage && (
            <>
              {/* <NavLink to="/" className={linkCls}>Home</NavLink> */}
              <NavLink to="/login" className={linkCls}>Login</NavLink>
              <NavLink to="/register" className={linkCls}>Register</NavLink>
             
            </>
          )}

          {/* If user is logged in and on Dashboard page, show Dashboard, Profile, Categories, and Logout */}
          {user && isOnDashboardPage && (
            <div className="flex items-center gap-7">
              <NavLink to="/categories" className={linkCls}>Kategori</NavLink>

              {/* Profile Image as a clickable NavLink */}
              <NavLink to="/profil">
                <img
                  src={profilImage}  // avatar profile image
                  alt="Profile"
                  className="h-10 w-10 rounded-lg cursor-pointer "
                />
              </NavLink>

              <button
                className="btn ml-1"
                onClick={() => { logout(); navigate('/login') }}
              >
                Logout
              </button>
            </div>
          )}

          {/* If user is logged in but not on Dashboard, show Dashboard and Logout */}
          {user && !isOnDashboardPage && !isOnAuthPage && (
            <>
              <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
              <button className="btn ml-1" onClick={() => { logout(); navigate('/login') }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
