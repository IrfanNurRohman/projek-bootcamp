import React from "react";
import { useNavigate } from "react-router-dom";


// import { AlignJustify, Star, StarHalf, StarOff } from "lucide-react"
import HeaderDashboard from "../components/HeaderDashboard";
import courseImage from '../data/courseImage'; // import courseImage from the correct path
import avatarImage from "../data/avatarImage"; // import avatarImage from the correct path

// import { RatingStars } from "../components/molecules/RatingStars"; // import RatingStars component

import CourseCard from "../components/molecules/CourseCard";
import BannerCard from "../components/molecules/BannerCard";
import FooterContent from "../components/molecules/FooterContent";





const Dashboard: React.FC = () => {
    // const randomImage = useMemo(() => {
    //     const index = Math.floor(Math.random() * courseImage.length)

    //     return courseImage[index]
    // }, [])
    // const randomAvatar = useMemo(() => {
    //     const index = Math.floor(Math.random() * avatarImage.length)
    //     return avatarImage[index]
    // }, [])

    const navigate = useNavigate();



    return (
        <div>


            <div className="mb-7">
                <HeaderDashboard />
            </div>

            <div className="container mx-auto px-4 ">
                <div className="relative min-h-[400px] bg-dashboard bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-center text-center mb-6">
                    {/* Overlay hanya di gambar */}
                    <div className="absolute inset-0 bg-black opacity-60 z-0 rounded-lg" />

                    {/* Konten di atas overlay */}
                    <div className="relative z-10 px-4 py-[24px] md:py-[20px] flex flex-col items-center text-center">
                        <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 max-w-[240px] md:max-w-[800px] leading-snug">
                            <span className="block md:hidden">
                                Revolusi <br /> Pembelajaran: <br />
                                Temukan Ilmu Baru melalui Platform Video Interaktif!
                            </span>

                            <span className="hidden md:inline"
                               
                            >

                                Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!

                            </span>
                        </h2>

                        <p className="text-white text-[14px] md:text-[16px] mb-6 max-w-[270px] md:max-w-[480px] lg:max-w-[920px] mx-auto leading-relaxed">
                            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, <br className="hidden md:inline" /> Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
                        </p>

                        <button className="bg-[#3ECF4C] hover:bg-green-700 text-sm text-white py-2 px-6 rounded-md transition duration-300"
                         onClick={() => navigate("/all-products")}>
                            Temukan Video Course untuk Dipelajari!
                        </button>
                    </div>
                </div>
                <h2 className="text-xl font-semibold mb-3">Kelola Video Pembelajaran Unggulan</h2>
                <p className="text-[#333333AD] text-sm md:text-base mb-4 md:mb-8">
                    Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
                </p>
                <div className="bg-[#fdfbf5] mb-6 md:mb-8">
                    <div
                        className="category-buttons flex-nowrap flex justify-start gap-4 md:gap-6 px-4 py-3 md:py-4 text-xs md:text-sm font-medium overflow-x-auto scrollbar-hide"
                    >
                        <button className="text-[#f25c05] relative pb-1 px-1 md:px-0 whitespace-nowrap">
                            Semua Kelas
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f25c05] rounded-full"></span>
                        </button>
                        <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
                            Pemasaran
                        </button>
                        <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
                            Desain
                        </button>
                        <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
                            Pengembangan Diri
                        </button>
                        <button className="text-gray-500 hover:text-black transition px-1 md:px-0 whitespace-nowrap">
                            Bisnis
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">

                    {
                        // Generate multiple CourseCard components with random images and avatars
                        Array.from({ length: 9 }).map((_, index) => (
                            <CourseCard
                                key={index}
                                courseImage={courseImage[index]}
                                avatarImage={avatarImage[index]}
                                courseName="Big 4 Auditor Financial Analyst"
                                instructorName="Jenna Ortega"
                                instructorJob="Senior Accountant"
                                instructorCompany="Harisenin"
                                rating={(index % 5) + 3} // Example rating from 1 to 5
                                reviewCount={120}
                                price={`Rp ${(100 +
                                    Math.floor(Math.random() * 5) * 150).toLocaleString()} K`} // Example price variation
                                onClick={() => navigate("/detail-product")}
                            />
                        ))
                    }

                </div>

                <BannerCard heading="Mau Belajar Lebih Banyak ?" subheading="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik harisenin.com" />

                <FooterContent />

            </div>


        </div>


    );
}

export default Dashboard;