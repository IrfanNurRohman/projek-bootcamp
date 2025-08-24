import React from 'react'
import sosmed1 from '../assets/linkedin.png'
import sosmed2 from '../assets/facebook.png'
import sosmed3 from '../assets/ig.png'
import sosmed4 from '../assets/twiter.png'

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] text-gray-700 p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left md:w-1/3">
          <h2 className="text-2xl font-semibold text-orange-600">videobelajar</h2>
          <p className="mt-2 text-sm">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</p>
          <p className="mt-1 text-sm">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
          <p className="mt-1 text-sm">+62-877-7123-1234</p>
        </div>

        {/* Right Section: Links */}
        <div className="flex flex-col md:flex-row justify-between w-full md:w-[60%] mt-6 md:mt-0">
          {/* Kategori */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="font-semibold">Kategori</h4>
            <ul className="space-y-2 mt-2 text-sm">
              <li>Digital & Teknologi</li>
              <li>Pemasaran</li>
              <li>Manajemen Bisnis</li>
              <li>Pengembangan Diri</li>
              <li>Desain</li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="font-semibold">Perusahaan</h4>
            <ul className="space-y-2 mt-2 text-sm">
              <li>Tentang Kami</li>
              <li>FAQ</li>
              <li>Kebijakan Privasi</li>
              <li>Ketentuan Layanan</li>
              <li>Bantuan</li>
            </ul>
          </div>

          {/* Komunitas */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold">Komunitas</h4>
            <ul className="space-y-2 mt-2 text-sm">
              <li>Tips Sukses</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 text-center">
        <div className="flex justify-center gap-6">
          <a href="#" className="text-xl">
            <img src={sosmed3} alt="Instagram" className="h-8 w-8 hover:text-orange-600" />
          </a>
          <a href="#" className="text-xl">
            <img src={sosmed2} alt="Facebook" className="h-8 w-8 hover:text-orange-600" />
          </a>
          <a href="#" className="text-xl">
            <img src={sosmed1} alt="LinkedIn" className="h-8 w-8 hover:text-orange-600" />
          </a>
          <a href="#" className="text-xl">
            <img src={sosmed4} alt="Twitter" className="h-8 w-8 hover:text-orange-600" />
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>©2025 irfan nur rohman developer.</p>
      </div>
    </footer>
  )
}
