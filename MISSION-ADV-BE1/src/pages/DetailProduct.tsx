import HeaderDashboard from "../components/HeaderDashboard";
import Breadcrumb from "../components/molecules/Breadcrumb";
import { RatingStars } from "../components/molecules/RatingStars";
import CoursePromoBanner from "../components/molecules/CoursePromoBanner";
import CourseDescription from "../components/molecules/CourseDescription";
import TutorProfile from "../components/molecules/TutorProfile";
import FooterContent from "../components/molecules/FooterContent";
import { useProgressStore } from "../store/useProgressStore";
import { ChevronDown, PlayCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
  const { id } = useParams();
  const { reviewData } = useProgressStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [course, setCourse] = useState<any | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🔹 Ambil data dari database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCourse = await axios.get(`http://localhost:8000/api/produk-kelas/${id}`);
        setCourse(resCourse.data);

        const resModules = await axios.get(`http://localhost:8000/api/produk-kelas/${id}/detail`);
        setModules(resModules.data);

        const resRelated = await axios.get(`http://localhost:8000/api/produk-kelas`);
        setRelatedCourses(resRelated.data.slice(0, 3)); // tampilkan 3 course lain
      } catch (error) {
        console.error("❌ Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Memuat data...</p>;
  if (!course) return <p className="text-center mt-10 text-gray-500">Kursus tidak ditemukan.</p>;

  return (
    <div>
      <HeaderDashboard />
      <div className="container px-4 mx-auto w-full bg-[#fffdf2]">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/dashboard" },
            { label: course.kategori || "Kategori", href: "/dashboard" },
            { label: course.nama_kelas },
          ]}
        />

        {/* Banner Header */}
        <div className="relative min-h-[400px] bg-cover bg-no-repeat text-white shadow-md rounded-lg overflow-hidden flex justify-left text-left mb-6">
          <img
            src={course.gambar_kelas}
            alt={course.nama_kelas}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black opacity-70 z-0 rounded-lg" />
          <div className="relative z-10 py-[24px] md:py-[20px] flex flex-col items-start text-left px-5 md:px-10 justify-center">
            <h2 className="text-[24px] md:text-[42px] font-semibold mb-3 leading-snug max-w-[800px]">
              {course.nama_kelas}
            </h2>
            <p className="text-white text-[14px] md:text-[16px] mb-6">
              Belajar bersama tutor profesional di Video Course. Kapanpun, di manapun.
            </p>
            <RatingStars rating={course.rating || 0} reviewCount={course.jumlah_review || 0} />
          </div>
        </div>

        {/* ======================== */}
        {/* Konten utama */}
        {/* ======================== */}
        <div className="hidden md:flex flex-row gap-6">
          <div className="basis-3/4 space-y-6">
            {/* Deskripsi */}
            <CourseDescription description={course.deskripsi} />

            {/* Tutor */}
            <TutorProfile
              avatar={course.avatar_tutor}
              name={course.tutor_nama}
              job={course.tutor_jabatan}
              company={course.tutor_perusahaan}
            />

            {/* ======================== */}
            {/* Modul */}
            {/* ======================== */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Kamu akan Mempelajari</h3>

              {modules.length > 0 ? (
                modules.map((modul, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg mb-3 overflow-hidden"
                  >
                    <button
                      onClick={() => handleToggle(index)}
                      className="flex justify-between w-full px-4 py-3 text-left font-medium text-green-700 hover:bg-green-50 transition"
                    >
                      <span>{modul.judul_modul}</span>
                      <ChevronDown
                        className={`transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="bg-white border-t border-gray-100 px-4 py-2 space-y-2">
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm text-gray-700">
                          <span className="flex items-center gap-2">
                            <PlayCircle size={16} /> {modul.tipe_modul}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock size={14} /> {modul.durasi}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Belum ada modul untuk kursus ini.</p>
              )}
            </div>

            {/* ======================== */}
            {/* Rating dan Review */}
            {/* ======================== */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Rating dan Review</h3>
              {reviewData ? (
                <div className="border p-4 rounded-lg bg-gray-50">
                  <RatingStars rating={reviewData.rating} reviewCount={1} />
                  <p className="mt-2 text-gray-700">{reviewData.review}</p>
                </div>
              ) : (
                <p className="text-gray-500">Belum ada review yang disimpan untuk modul ini.</p>
              )}
            </div>
          </div>

          {/* Sidebar Banner */}
          <div className="basis-1/4">
            <CoursePromoBanner
              isBanner={true}
              price={course.harga}
              discountPrice={course.harga_diskon}
            />
          </div>
        </div>

        {/* ======================== */}
        {/* Video Pembelajaran Lain */}
        {/* ======================== */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Video Pembelajaran Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.length > 0 ? (
              relatedCourses.map((related, i) => (
                <div
                  key={i}
                  className="cursor-pointer border rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition"
                >
                  <img
                    src={related.gambar_kelas}
                    alt={related.nama_kelas}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-md font-semibold leading-tight">{related.nama_kelas}</h4>
                    <p className="text-sm text-gray-500">{related.tutor_nama}</p>
                    <RatingStars rating={related.rating || 4.8} reviewCount={50} />
                    <p className="text-green-600 font-semibold mt-2">
                      Rp {related.harga?.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada video terkait.</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          <FooterContent />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
