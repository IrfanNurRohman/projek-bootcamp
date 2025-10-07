import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

import { ChevronRight, ChevronDown } from 'lucide-react'


const FooterContent = () => {
    const [isKategoriOpen, setIsKategoriOpen] = useState(false);
    const [isPerusahaanOpen, setIsPerusahaanOpen] = useState(false);
    const [isKomunitasOpen, setIsKomunitasOpen] = useState(false);

    return (
        <footer className=" px-6 py-10 w-full bg-white text-gray-800">
            <div className="footer-content grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:justify-between">
                {/* Kolom 1: Brand */}
                <div className="flex flex-col items-start">
                    <img
                        src="logo.png"
                        alt="Videobelajar Logo"
                        className="h-[42px] w-[152px] md:h-[56px] md:w-[237px]"
                    />
                    <p className="text-sm font-bold mb-2">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id</p>
                    <p className="text-sm">Jl. Usman Effendi No. 50 Lowokwaru, Malang </p>
                    <p className="text-sm">+62-877-7123-1234</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3">



                    {/* Kolom 2: Kategori */}
                    <div>
                        <div
                            className="flex items-center justify-between mb-2 cursor-pointer md:cursor-default"
                            onClick={() => setIsKategoriOpen(!isKategoriOpen)}
                        >
                            <h3 className="font-semibold mb-2">Kategori</h3>
                            {/* Icon hanya muncul di mobile */}
                            <div className="md:hidden">
                                {isKategoriOpen ? (
                                    <ChevronDown />
                                ) : (
                                    <ChevronRight />
                                )}
                            </div>
                        </div>

                        <ul className={`space-y-1 text-sm ${isKategoriOpen ? "block" : "hidden"
                            } md:block`}
                        >
                            <li>Digital & Teknologi</li>
                            <li>Pemasaran</li>
                            <li>Manajemen Bisnis</li>
                            <li>Pengembangan Diri</li>
                            <li>Desain</li>
                        </ul>
                    </div>

                    {/* Kolom 3: Perusahaan */}
                    <div>
                        <div className="flex items-center justify-between mb-2"
                            onClick={() => setIsPerusahaanOpen(!isPerusahaanOpen)}
                        >
                            <h3 className="font-semibold mb-2">Perusahaan</h3>
                            <div className="md:hidden">
                                {isPerusahaanOpen ? (
                                    <ChevronDown />
                                ) : (
                                    <ChevronRight />
                                )}
                            </div>

                        </div>
                        <ul className={`space-y-1 text-sm ${isPerusahaanOpen ? "block" : "hidden"
                            } md:block`}>
                            <li>Tentang Kami</li>
                            <li>FAQ</li>
                            <li>Kebijakan Privasi</li>
                            <li>Ketentuan Layanan</li>
                            <li>Bantuan</li>
                            {/* ... */}
                        </ul>
                    </div>

                    {/* Kolom 4: Komunitas */}
                    <div>
                        <div className="flex items-center justify-between mb-2"
                            onClick={() => setIsKomunitasOpen(!isKomunitasOpen)}
                        >
                            <h3 className="font-semibold mb-2">Komunitas</h3>
                             <div className="md:hidden">
                                {isKomunitasOpen ? (
                                    <ChevronDown />
                                ) : (
                                    <ChevronRight />
                                )}
                            </div>

                        </div>
                        <ul className={`space-y-1 text-sm ${isKomunitasOpen ? "block" : "hidden"
                            } md:block`}>
                            <li>Tips Sukses</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom border-t border-neutral-300 pt-4 flex flex-col sm:flex-row justify-between items-left text-sm">
                {/* Social Media Icons */}
                <div className="order-1 md:order-2 flex space-x-4 mb-4 md:mb-0">
                    {[
                        { href: "https://linkedin.com", label: "LinkedIn", icon: faLinkedinIn },
                        { href: "https://facebook.com", label: "Facebook", icon: faFacebookF },
                        { href: "https://instagram.com", label: "Instagram", icon: faInstagram },
                        { href: "https://twitter.com", label: "Twitter", icon: faTwitter },
                    ].map(({ href, label, icon }) => (
                        <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                            <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-black transition">
                                <FontAwesomeIcon icon={icon} className="text-black w-4 h-4" />
                            </div>
                        </a>
                    ))}
                </div>

                {/* Copyright Text */}
                <p className="order-2 sm:order-1 text-neutral-500 text-left">
                    &copy; 2023 Gerobak Sayur. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default FooterContent;