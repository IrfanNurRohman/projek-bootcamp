import { useState, useMemo } from "react";

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
}
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderDashboard from "../components/HeaderDashboard";
import FilterMenu from "../components/molecules/FilterMenu";
import FooterContent from "../components/molecules/FooterContent";
import courseImage from "../data/courseImage";
import avatarImage from "../data/avatarImage";
import CourseCard from "../components/molecules/CourseCard";
import CustomPagination from "../components/molecules/CustomPagination";
import SortDropdown from "../components/molecules/SortDropDown";
import { Search, Plus, X, Pencil, Trash2 } from "lucide-react";
import Breadcrumb from "../components/molecules/Breadcrumb";
import { useTutorStore, type Tutor } from "../store/useTutorStore"; // ✅ store zustand

const emptyCourse = {
  id: null,
  courseImageIndex: 0,
  avatarImageIndex: 0,
  courseName: "",
  instructorName: "",
  instructorJob: "",
  instructorCompany: "",
  rating: 5,
  reviewCount: 0,
  price: "Rp 0 K",
};

const AllProducts = () => {
  const navigate = useNavigate();
  const { selectTutor } = useTutorStore(); // ✅ ambil dari zustand

  const initialCourses = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, index) => ({
        id: index + 1,
        courseImageIndex: index % courseImage.length,
        avatarImageIndex: index % avatarImage.length,
        courseName: "Big 4 Auditor Financial Analyst",
        instructorName: "Jenna Ortega",
        instructorJob: "Senior Accountant",
        instructorCompany: "Harisenin",
        rating: (index % 5) + 3,
        reviewCount: 120,
        price: `Rp ${(100 + Math.floor(Math.random() * 5) * 150).toLocaleString()} K`,
      })),
    []
  );

  const getCoursesFromLocalStorage = () => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  };

  const [courses, setCourses] = useState(getCoursesFromLocalStorage);
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState(emptyCourse);

  const filteredCourses = useMemo(() => {
    if (!query) return courses;
    const q = query.toLowerCase();
    return courses.filter((c: Course) =>
      [
        c.courseName,
        c.instructorName,
        c.instructorJob,
        c.instructorCompany,
        c.price,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [courses, query]);

  const openAdd = () => {
    setForm({ ...emptyCourse });
    setFormMode("add");
    setEditIndex(null);
    setIsFormOpen(true);
  };

  const openEdit = (index: number) => {
    const c = courses[index];
    setForm({ ...c });
    setFormMode("edit");
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://mocki.io/v1/42a35b6f-6314-47d9-bc30-267a4833225d"
      );
      console.log("API Response:", response.data);

      let updatedCourses;

      if (formMode === "add") {
        const newCourse = { ...form, id: Date.now() };
        updatedCourses = [...courses, newCourse];
      } else if (formMode === "edit" && editIndex !== null) {
        updatedCourses = courses.map((c: Course, i: number) => (i === editIndex ? { ...form } : c));
      }

      setCourses(updatedCourses);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      setIsFormOpen(false);
      navigate("/dashboard");
      alert("Kursus berhasil ditambahkan!");
    } catch (error) {
      console.error("Error during API request:", error);
      alert("Terjadi kesalahan dengan permintaan.");
    }
  };

  const handleDelete = (index: number) => {
    const updatedCourses = courses.filter((_: Course, i: number) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const updatePrice = (value: string | number) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    const numeric = String(value).replace(/[^0-9]/g, "");
    if (numeric === "") {
      setForm((f) => ({ ...f, price: "" }));
      return;
    }
    const n = parseInt(numeric, 10);
    const pretty = `Rp ${n.toLocaleString()} K`;
    setForm((f) => ({ ...f, price: pretty }));
  };

  // ✅ Klik course → simpan di zustand → navigate ke detail page
  const handleCourseClick = (course: Course) => {
    // Transform Course to Tutor
    const tutor: Tutor = {
      id: course.id || 0,
      name: course.instructorName,
      title: course.instructorJob,
      bio: `${course.instructorJob} at ${course.instructorCompany}`,
      avatar: avatarImage[course.avatarImageIndex],
      category: course.courseName,
      subtitle: course.courseName,
      rating: course.rating,
      reviews: course.reviewCount,
      description: course.courseName,
    };
    selectTutor(tutor);
    navigate(`/detail-product/${course.id}`);
  };

  return (
    <div>
      <HeaderDashboard />
      <div className="container px-4 mx-auto w-full bg-[##fffdf2]">
        <div className="max-w-[320px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">
          <h1 className="text-[24px] font-semibold mb-1">
            Koleksi Video <br className="inline sm:hidden" /> Pembelajaran
            Unggulan
          </h1>
          <p className="text-[14px] text-gray-600 mb-6">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/dashboard" },
            {
              label:
                "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.",
            },
          ]}
        />

        <div className="flex flex-col md:flex-row justify-between">
          <FilterMenu className="mr-4" />

          <div className="flex-1">
            <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
              <button
                onClick={openAdd}
                className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-3 shadow-md hover:opacity-90 transition"
              >
                <Plus className="w-4 h-4" /> Tambah Kelas
              </button>

              <div className="flex flex-row gap-4 items-center h-[60px]">
                <SortDropdown />
                <div className="relative w-full md:max-w-[240px] rounded-lg bg-white shadow-md p-4 flex flex-row items-center justify-between">
                  <input
                    type="text"
                    placeholder="Cari Kelas"
                    className="text-sm text-gray-800 placeholder-gray-400 focus:outline-none w-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Search className="w-4 h-4 text-primary ml-2" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {filteredCourses.map((c: Course, index: number) => (
                <div key={index} className="relative group">
                  <CourseCard
                    courseImage={courseImage[c.courseImageIndex]}
                    avatarImage={avatarImage[c.avatarImageIndex]}
                    courseName={c.courseName}
                    instructorName={c.instructorName}
                    instructorJob={c.instructorJob}
                    instructorCompany={c.instructorCompany}
                    rating={c.rating}
                    reviewCount={c.reviewCount}
                    price={c.price}
                    onClick={() => handleCourseClick(c)} // ✅ ubah jadi handler zustand
                  />

                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openEdit(index)}
                      className="p-2 rounded-lg bg-white/90 hover:bg-white shadow border border-gray-200"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 shadow border border-red-200"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <CustomPagination totalPages={5} />
          </div>
        </div>
      </div>

      {/* ✅ Form modal tetap sama */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="w-full md:max-w-2xl bg-white rounded-t-2xl md:rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {formMode === "add" ? "Tambah Kelas" : "Edit Kelas"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* isi form sama seperti kode kamu sebelumnya */}
            {/* (disingkat agar tidak panjang banget di sini) */}
          </div>
        </div>
      )}

      <FooterContent />
    </div>
  );
};

export default AllProducts;
