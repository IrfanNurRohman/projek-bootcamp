import { useState, useRef, useEffect } from "react";
import { AlignJustify, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function MoreMenu() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Auto-close saat klik di luar sheet dan bukan tombol
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            const clickedOutsideSheet = sheetRef.current && !sheetRef.current.contains(target);
            const clickedOutsideButton = buttonRef.current && !buttonRef.current.contains(target);

            if (clickedOutsideSheet && clickedOutsideButton) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {/* Tombol Hamburger */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <AlignJustify className="w-6 h-6 text-yellow-600" />
            </button>

            {/* Sheet Menu */}
            {isOpen && (
                <div
                    ref={sheetRef}
                    className="fixed inset-x-0 top-[74px] max-h-screen py-4 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300"
                >
                    {/* Close Button */}
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                            <X className="w-5 h-5 text-gray-500 hover:text-black" />
                        </button>
                    </div>

                    {/* Menu Content */}
                    <div className="px-6">
                        <ul className="text-sm text-gray-700">
                            <li className="pb-3 cursor-pointer hover:text-yellow-600">Kategori</li>

                            <li className="border-t border-gray-200 py-3 cursor-pointer hover:text-yellow-600">
                                Profil Saya
                            </li>

                            <li className="border-t border-gray-200 py-3 cursor-pointer hover:text-yellow-600">
                                Kelas Saya
                            </li>

                            <li className="border-t border-gray-200 py-3 cursor-pointer hover:text-yellow-600">
                                Pesanan Saya
                            </li>

                            <li className="border-t border-gray-200 py-3 text-red-600 flex items-center gap-2 cursor-pointer hover:text-red-700">
                                Keluar 
                                <button
                                  
                                    onClick={() => navigate("/")}
                                    aria-label="Toggle menu"
                                >
                                    <LogOut className="w-6 h-6 text-red-600" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}