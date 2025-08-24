import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Registrasi gagal')
    } finally {
      setLoading(false)
    }
  }

  // Fungsi untuk toggle password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="container-std">
      <div className="card max-w-xl mx-auto mt-8 p-6 rounded-xl shadow-lg bg-white w-full md:max-w-md">
        <h2 className="text-2xl font-semibold text-center text-black">Pendaftaran Akun</h2>
        <p className="text-gray-600 text-center mt-1">Yuk, daftarkan akunnmu sekarang juga!</p>
        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              className="input w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nama lengkap"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
            <input
              className="input w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">No. Hp</label>
            <div className="flex items-center space-x-2">
              <select
                className="w-1/4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                value={form.phoneCode}
                onChange={e => setForm(f => ({ ...f, phoneCode: e.target.value }))}>
                <option value="+62">+62</option>
                {/* You can add more country codes here */}
              </select>
              <input
                className="input w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nomor HP"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
          </div>

          {/* Kata Sandi */}
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

          {/* Konfirmasi Kata Sandi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
            <div className="relative">
              <input
                className="input w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={form.confirmPassword}
                onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 my-auto h-10 w-10 grid place-items-center rounded-lg hover:bg-neutral-100 active:scale-95"
              >
                {showConfirmPassword ? (
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

          {error && <div className="text-red-400 text-center">{error}</div>}
          <button
            className="btn btn-primary w-full p-3 mt-4 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        {/* Daftar Button */}
        <div className="mt-4 text-center">
          <Link to="/login">
            <button className="w-full p-3 mt-4 rounded-lg bg-green-100 text-green-500 font-semibold hover:bg-green-200 focus:ring-2 focus:ring-green-300">
              Masuk
            </button>
          </Link>
        </div>

        {/* Google login button */}
        <div className="mt-4 text-center">
          <div className="text-center text-gray-500">atau</div>
          <button className="w-full p-3 mt-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="inline-block mr-2 w-5 h-5" />
            Daftar dengan Google
          </button>
        </div>
      </div>
    </div>
  )
}
