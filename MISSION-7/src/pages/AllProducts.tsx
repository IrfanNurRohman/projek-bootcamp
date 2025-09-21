import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for the GET request
import HeaderDashboard from "../components/HeaderDashboard";
import FilterMenu from "../components/molecules/FilterMenu";
import FooterContent from "../components/molecules/FooterContent";
import courseImage from "../data/courseImage"; // array of course image sources
import avatarImage from "../data/avatarImage"; // array of avatar image sources
import CourseCard from "../components/molecules/CourseCard";
import CustomPagination from "../components/molecules/CustomPagination";
import SortDropdown from "../components/molecules/SortDropDown";
import { Search, Plus, X, Pencil, Trash2, Image as ImageIcon, User as UserIcon } from "lucide-react";
import Breadcrumb from "../components/molecules/Breadcrumb";

const emptyCourse = {
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
  const navigate = useNavigate(); // Use navigate to redirect

  // Seed 9 example items (kept from your original map)
  const initialCourses = useMemo(() =>
    Array.from({ length: 9 }).map((_, index) => ({
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
  []); 

  const getCoursesFromLocalStorage = () => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  };

  const [courses, setCourses] = useState(getCoursesFromLocalStorage);
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(emptyCourse);

  const filteredCourses = useMemo(() => {
    if (!query) return courses;
    const q = query.toLowerCase();
    return courses.filter((c) =>
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

  const openEdit = (index) => {
    const c = courses[index];
    setForm({
      courseImageIndex: c.courseImageIndex,
      avatarImageIndex: c.avatarImageIndex,
      courseName: c.courseName,
      instructorName: c.instructorName,
      instructorJob: c.instructorJob,
      instructorCompany: c.instructorCompany,
      rating: c.rating,
      reviewCount: c.reviewCount,
      price: c.price,
    });
    setFormMode("edit");
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the GET request to validate the login, but don't block adding the course
    try {
      const response = await axios.get('https://mocki.io/v1/42a35b6f-6314-47d9-bc30-267a4833225d');
      console.log("API Response:", response.data); // Log the response for debugging

      // Proceed with adding the course regardless of the response
      let updatedCourses;
        
      if (formMode === "add") {
        updatedCourses = [...courses, { ...form }];
      } else if (formMode === "edit" && editIndex !== null) {
        updatedCourses = courses.map((c, i) => (i === editIndex ? { ...form } : c));
      }

      // Update state courses
      setCourses(updatedCourses);

      // Save to localStorage
      localStorage.setItem("courses", JSON.stringify(updatedCourses));

      // Close the form
      setIsFormOpen(false);

      // Navigate to the dashboard after form submission
      navigate("/dashboard");

      // Show a success message in Bahasa Indonesia
      alert("Kursus berhasil ditambahkan!");
    } catch (error) {
      console.error("Error during API request:", error);
      alert("Terjadi kesalahan dengan permintaan.");
    }
  };

  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const updatePrice = (value) => {
    const numeric = String(value).replace(/[^0-9]/g, "");
    if (numeric === "") {
      setForm((f) => ({ ...f, price: "" }));
      return;
    }
    const n = parseInt(numeric, 10);
    const pretty = `Rp ${n.toLocaleString()} K`;
    setForm((f) => ({ ...f, price: pretty }));
  };

  return (
    <div>
      <HeaderDashboard />
      <div className="container px-4 mx-auto w-full bg-[##fffdf2]">
        <div className="max-w-[320px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">
          <h1 className="text-[24px] font-semibold mb-1">Koleksi Video <br className="inline sm:hidden" /> Pembelajaran Unggulan</h1>
          <p className="text-[14px] text-gray-600 mb-6">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
        </div>
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/dashboard" },
            { label: "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager." },
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
              {filteredCourses.map((c, index) => (
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
                    onClick={() => navigate("/detail-product")}
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

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="w-full md:max-w-2xl bg-white rounded-t-2xl md:rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{formMode === "add" ? "Tambah Kelas" : "Edit Kelas"}</h2>
              <button onClick={() => setIsFormOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm text-gray-600">Nama Kelas</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.courseName}
                    onChange={(e) => setForm((f) => ({ ...f, courseName: e.target.value }))}
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Instructor Name</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.instructorName}
                    onChange={(e) => setForm((f) => ({ ...f, instructorName: e.target.value }))}
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Instructor Job</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.instructorJob}
                    onChange={(e) => setForm((f) => ({ ...f, instructorJob: e.target.value }))}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Instructor Company</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.instructorCompany}
                    onChange={(e) => setForm((f) => ({ ...f, instructorCompany: e.target.value }))}
                  />
                </label>

                <div className="grid grid-cols-3 gap-3">
                  <label className="block col-span-1">
                    <span className="text-sm text-gray-600">Rating</span>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={form.rating}
                      onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                    />
                  </label>

                  <label className="block col-span-2">
                    <span className="text-sm text-gray-600">Review Count</span>
                    <input
                      type="number"
                      min={0}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={form.reviewCount}
                      onChange={(e) => setForm((f) => ({ ...f, reviewCount: Number(e.target.value) }))}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-gray-600">Harga (dalam ribuan, contoh: 250 ➜ Rp 250 K)</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.price}
                    onChange={(e) => updatePrice(e.target.value)}
                  />
                </label>
              </div>

              {/* Right column */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-600 inline-flex items-center gap-1"><ImageIcon className="w-4 h-4" /> Course Image</span>
                    <select
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={form.courseImageIndex}
                      onChange={(e) => setForm((f) => ({ ...f, courseImageIndex: Number(e.target.value) }))}
                    >
                      {courseImage.map((_, idx) => (
                        <option key={idx} value={idx}>{`Gambar #${idx + 1}`}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-600 inline-flex items-center gap-1"><UserIcon className="w-4 h-4" /> Avatar Image</span>
                    <select
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={form.avatarImageIndex}
                      onChange={(e) => setForm((f) => ({ ...f, avatarImageIndex: Number(e.target.value) }))}
                    >
                      {avatarImage.map((_, idx) => (
                        <option key={idx} value={idx}>{`Avatar #${idx + 1}`}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Previews */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Preview Course Image</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={courseImage[form.courseImageIndex]} alt="course" className="w-full h-28 object-cover rounded-lg" />
                  </div>
                  <div className="border rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Preview Avatar</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatarImage[form.avatarImageIndex]} alt="avatar" className="w-20 h-20 object-cover rounded-full mx-auto" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-primary text-white shadow hover:opacity-90"
                  >
                    {formMode === "add" ? "Tambah" : "Simpan"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <FooterContent />
    </div>
  );
};

export default AllProducts;
