import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('demo_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('demo_user', JSON.stringify(user))
    else localStorage.removeItem('demo_user')
  }, [user])

  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error('Email & Password wajib diisi')
    setUser({ email })
    return true
  }

  const register = async ({ name, email, password }) => {
    if (!name || !email || !password) throw new Error('Lengkapi semua field')
    setUser({ email, name })
    return true
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, register, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
