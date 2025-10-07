import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTutors } from "../services/api"; // ✅ ambil data dari api.tsx
import { useTutorStore } from "../store/useTutorStore"; // ✅ store Zustand
import courseImage from "../data/courseImage";
import avatarImage from "../data/avatarImage";
import HeaderDashboard from "../components/HeaderDashboard";
import CourseCard from "../components/molecules/CourseCard";
import BannerCard from "../components/molecules/BannerCard";
import FooterContent from "../components/molecules/FooterContent";

interface Course {
  id: number | null;
  courseImageIndex: number;
  avatarImageIndex: number;
  courseName: string;
  instructorName: string;
  instructorJob: string;
  instructorCompany: string;
  rating: number;
  reviewCount: number;
  price: string;
  name?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedTutor } = useTutorStore();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const savedCourses = localStorage.getItem("courses");
        if (savedCourses) {
          setCourses(JSON.parse(savedCourses));
        } else {
          const data = await getAllTutors();
          setCourses(data);
          localStorage.setItem("courses", JSON.stringify(data));
        }
      } catch (err) {
        console.error("❌ Gagal mengambil data:", err);
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
          <div className="relative z-10 px-4 py-[24px] md:py-[20px] flex flex-col items-center text-center">
            <h2 className="text-[24px] md:text-[48px] font-semibold mb-3 max-w-[240px] md:max-w-[800px] leading-snug">
              <span className="block md:hidden">
                Revolusi <br /> Pembelajaran: <br />
                Temukan Ilmu Baru melalui Platform Video Interaktif!
              </span>
              <span className="hidden md:inline">
                Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
                Interaktif!
              </span>
            </h2>
            <p className="text-white text-[14px] md:text-[16px] mb-6 max-w-[270px] md:max-w-[480px] lg:max-w-[920px] mx-auto leading-relaxed">
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
          <div className="category-buttons flex-nowrap flex justify-start gap-4 md:gap-6 px-4 py-3 md:py-4 text-xs md:text-sm font-medium overflow-x-auto scrollbar-hide">
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

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard
                key={index}
                courseImage={courseImage[course.courseImageIndex || 0]}
                avatarImage={avatarImage[course.avatarImageIndex || 0]}
                courseName={course.courseName || course.name || ""}
                instructorName={course.instructorName || "Tutor Profesional"}
                instructorJob={course.instructorJob || "Mentor"}
                instructorCompany={course.instructorCompany || "VideoBelajar"}
                rating={course.rating || 4.8}
                reviewCount={course.reviewCount || 100}
                price={course.price || "Gratis"}
                onClick={() => {
                  setSelectedTutor(course); // ✅ simpan ke store
                  navigate(`/detail-product/${course.id}`);
                }}
              />
            ))
          ) : (
            <p className="text-gray-600">Tidak ada kursus tersedia.</p>
          )}
        </div>

        {/* FOOTER */}
        <BannerCard
          heading="Mau Belajar Lebih Banyak ?"
          subheading="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik harisenin.com"
        />
        <FooterContent />
      </div>
    </div>
  );
};

export default Dashboard;
