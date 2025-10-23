import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTutorStore } from "../store/useTutorStore";
import HeaderDashboard from "../components/HeaderDashboard";
import CourseCard from "../components/molecules/CourseCard";
import BannerCard from "../components/molecules/BannerCard";
import FooterContent from "../components/molecules/FooterContent";

interface ProdukKelas {
  id: number;
  nama_kelas: string;
  deskripsi: string;
  kategori: string;
  harga: number;
  rating: number;
  jumlah_review: number;
  tutor_nama: string;
  tutor_jabatan: string;
  tutor_perusahaan: string;
  gambar_kelas: string;
  avatar_tutor: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedTutor } = useTutorStore();
  const [courses, setCourses] = useState<ProdukKelas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/produk-kelas");
        setCourses(res.data);
      } catch (err) {
        console.error("❌ Gagal mengambil data dari database:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <div className="mb-7">
        <HeaderDashboard />
      </div>

      <div className="container mx-auto px-4">
        {/* HERO SECTION */}
        <div className="relative min-h-[400px] bg-dashboard bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-center text-center mb-6">
          <div className="absolute inset-0 bg-black opacity-60 z-0 rounded-lg" />
          <div className="relative z-10 px-4 py-[24px] flex flex-col items-center text-center">
            <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 leading-snug max-w-[800px]">
              Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
              Interaktif!
            </h2>
            <p className="text-white text-[14px] md:text-[16px] mb-6 max-w-[480px] md:max-w-[920px] leading-relaxed">
              Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
              pembelajaran berkualitas tinggi.
            </p>
            <button
              className="bg-[#3ECF4C] hover:bg-green-700 text-sm text-white py-2 px-6 rounded-md transition duration-300"
              onClick={() => navigate("/all-products")}
            >
              Temukan Video Course untuk Dipelajari!
            </button>
          </div>
        </div>

        {/* TITLE SECTION */}
        <h2 className="text-xl font-semibold mb-3">
          Kelola Video Pembelajaran Unggulan
        </h2>
        <p className="text-[#333333AD] text-sm md:text-base mb-4 md:mb-8">
          Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
        </p>

        {/* CATEGORY BUTTONS */}
        <div className="bg-[#fdfbf5] mb-6 md:mb-8">
          <div className="flex gap-6 px-4 py-3 text-sm font-medium overflow-x-auto scrollbar-hide">
            <button className="text-[#f25c05] relative pb-1">
              Semua Kelas
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f25c05] rounded-full"></span>
            </button>
            <button className="text-gray-500 hover:text-black transition">
              Pemasaran
            </button>
            <button className="text-gray-500 hover:text-black transition">
              Desain
            </button>
            <button className="text-gray-500 hover:text-black transition">
              Pengembangan Diri
            </button>
            <button className="text-gray-500 hover:text-black transition">
              Bisnis
            </button>
          </div>
        </div>

        {/* COURSE GRID */}
        {loading ? (
          <p className="text-gray-500 text-center py-10">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  courseImage={course.gambar_kelas}
                  avatarImage={course.avatar_tutor}
                  courseName={course.nama_kelas}
                  instructorName={course.tutor_nama}
                  instructorJob={course.tutor_jabatan}
                  instructorCompany={course.tutor_perusahaan}
                  rating={course.rating}
                  reviewCount={course.jumlah_review}
                  price={`Rp ${course.harga.toLocaleString("id-ID")}`}
                  onClick={() => {
                    setSelectedTutor(course);
                    navigate(`/detail-product/${course.id}`);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-600">Tidak ada kursus tersedia.</p>
            )}
          </div>
        )}

        <BannerCard
          heading="Mau Belajar Lebih Banyak?"
          subheading="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program terbaik kami."
        />
        <FooterContent />
      </div>
    </div>
  );
};

export default Dashboard;
