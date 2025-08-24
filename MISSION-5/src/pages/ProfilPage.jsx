import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Link, NavLink } from 'react-router-dom'
import profilImage from '../assets/profil.png'  // Import the profile image
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify components
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth()
  const [profileImage, setProfileImage] = useState(user.profileImage)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    // Update profile with new data
    updateUserProfile({ name, email, phone, profileImage });

    // Show a success toast message
    toast.success("Data profil sudah berubah!", {
      position: toast.POSITION.TOP_RIGHT, // Position the toast on the top right
      autoClose: 3000, // Automatically close the toast after 3 seconds
    });
  }

  return (
    <div className="container-std bg-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">Ubah Profil</h3>
          <p className="mt-2 text-gray-500 text-sm">Ubah Data Diri Anda</p>
          <div className="mt-6">
            <NavLink to="/profil" className="text-yellow-500 text-sm">Profil Saya</NavLink>
            <div className="border-b border-gray-300 mt-2"></div>
            <NavLink to="/classes" className="text-gray-800 text-sm">Kelas Saya</NavLink>
            <div className="border-b border-gray-300 mt-2"></div>
            <NavLink to="/orders" className="text-gray-800 text-sm">Pesanan Saya</NavLink>
          </div>
        </div>

        {/* Profile Form Section */}
        <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Profil Saya</h3>
          </div>

          <div className="flex items-center mb-6">
            <img
              src={profilImage}  // avatar profile image
              alt="Profile"
              className="h-12 w-12 rounded-lg cursor-pointer"
            />
            <div className="flex flex-col pl-[20px]">
              <span className="text-gray-800">{name}</span>
              <span className="text-gray-500">{email}</span>
              <button
                className="text-red-500 text-sm font-medium text-left"
                onClick={() => document.getElementById("profile-img-input").click()}
              >
                Ganti Foto Profil
              </button>
            </div>
          </div>

          <input
            type="file"
            id="profile-img-input"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Name, Email, and Phone inputs side by side */}
          <div className="flex flex-wrap gap-6">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700">Nomor HP</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
          <Link to="/dashboard">
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-md mt-6"
            >
              Simpan
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
