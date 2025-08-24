import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  // Fungsi untuk toggle password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="container-std">
      <div className="card max-w-lg mx-auto mt-8 p-6 rounded-xl shadow-lg bg-white w-full md:max-w-md">
        <h2 className="text-2xl font-bold text-center text-black">Masuk ke Akun</h2>
        <p className="text-gray-600 text-center mt-1">Yuk, lanjutin belajarmu di video belajar.</p>
        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
            <input
              className="input w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email" placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
            <div className="relative">
              <input
                className="input w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 my-auto h-10 w-10 grid place-items-center rounded-lg hover:bg-neutral-100 active:scale-95"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a21.86 21.86 0 0 1 5.06-5.94" />
                    <path d="M1 1l22 22" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a21.84 21.84 0 0 1-3.15 4.46" />
                    <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mt-2 text-right">
            <a href="#" className="text-sm text-neutral-700 hover:underline" to="/forgot-password">
              Lupa Password?
            </a>
          </div>
          {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
          <button
            className="w-full p-3 mt-4 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {/* Daftar Button */}
        <div className="mt-4 text-center">
          <Link to="/register">
            <button className="w-full p-3 mt-4 rounded-lg bg-green-100 text-green-500 font-semibold hover:bg-green-200 focus:ring-2 focus:ring-green-300">
              Daftar
            </button>
          </Link>
        </div>

        {/* Alternative login text */}
        <div className="text-center mt-4 text-gray-500">atau</div>

        {/* Google login button */}
        <div className="mt-4 text-center">
          <button
            className="w-full p-3 mt-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="inline-block mr-2 w-5 h-5" />
            Masuk dengan Google
          </button>
        </div>
      </div>
    </div>
  )
}
