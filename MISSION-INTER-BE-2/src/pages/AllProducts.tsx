import { useState, useEffect, useMemo } from "react";
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
import { Search, Plus, X, Pencil, Trash2, Image as ImageIcon, User as UserIcon } from "lucide-react";
import Breadcrumb from "../components/molecules/Breadcrumb";

const emptyCourse = {
  nama_kelas: "",
  deskripsi: "",
  kategori: "",
  harga: 0,
  rating: 5,
  jumlah_review: 0,
  tutor_nama: "",
  tutor_jabatan: "",
  tutor_perusahaan: "",
  gambar_kelas: courseImage[0],
  avatar_tutor: avatarImage[0],
};


const AllProducts = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyCourse);

  // Tambahkan di bagian atas state
const [filters, setFilters] = useState({
  bidang: [],
  harga: [],
  durasi: [],
});

const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
  console.log("Filter aktif:", newFilters);
};


  // ======================
  // Fetch Data dari Server
  // ======================
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/produk-kelas");
      setCourses(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ======================
  // Filter Search
  // ======================
  const filteredCourses = useMemo(() => {
      let hasil = [...courses];

    // 🔍 Filter pencarian teks
  if (query) {
    const q = query.toLowerCase();
    hasil = hasil.filter((c) =>
      [
        c.nama_kelas,
        c.tutor_nama,
        c.tutor_jabatan,
        c.tutor_perusahaan,
        c.kategori,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  // 🎓 Filter Bidang Studi
  if (filters.bidang.length > 0) {
    hasil = hasil.filter((c) => filters.bidang.includes(c.kategori));
  }

  // 💰 Filter Harga
  if (filters.harga.length > 0) {
    hasil = hasil.filter((c) => {
      const harga = c.harga;
      return filters.harga.some((range) => {
        if (range === "Gratis") return harga === 0;
        if (range === "Rp100.000") return harga <= 100000;
        if (range === "Rp100.000 – Rp500.000")
          return harga > 100000 && harga <= 500000;
        if (range === "Rp500.000+") return harga > 500000;
        return false;
      });
    });
  }

  // ⏱️ Filter Durasi (opsional, nanti bisa disesuaikan)
  if (filters.durasi.length > 0 && c.durasi_menit) {
    hasil = hasil.filter((c) => {
      const jam = c.durasi_menit / 60;
      return filters.durasi.some((range) => {
        if (range === "<4 Jam") return jam < 4;
        if (range === "4–8 Jam") return jam >= 4 && jam <= 8;
        if (range === ">8 Jam") return jam > 8;
        return false;
      });
    });
  }

  return hasil;
}, [courses, query, filters]);

  // ======================
  // Tambah / Edit Form
  // ======================
  const openAdd = () => {
    setForm({ ...emptyCourse });
    setFormMode("add");
    setEditId(null);
    setIsFormOpen(true);
  };

  const openEdit = (id) => {
    const c = courses.find((item) => item.id === id);
    if (!c) return;
    setForm({ ...c });
    setFormMode("edit");
    setEditId(id);
    setIsFormOpen(true);
  };

  // ======================
  // Submit ke Server
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === "add") {
        await axios.post("http://localhost:5000/allproduct", form);
        alert("✅ Kelas berhasil ditambahkan!");
      } else if (formMode === "edit" && editId) {
        await axios.put(`http://localhost:5000/allproduct/${editId}`, form);
        alert("✏️ Kelas berhasil diperbarui!");
      }
      setIsFormOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error saat menyimpan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // ======================
  // Hapus Data
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kelas ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/allproduct/${id}`);
      alert("🗑️ Kelas berhasil dihapus!");
      fetchCourses();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  return (
    <div>
      <HeaderDashboard />
      <div className="container px-4 mx-auto w-full bg-[##fffdf2]">
        <div className="max-w-[1000px]">
          <h1 className="text-[24px] font-semibold mb-1">
            Koleksi Video Pembelajaran Unggulan
          </h1>
          <p className="text-[14px] text-gray-600 mb-6">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>

        <Breadcrumb items={[{ label: "Beranda", href: "/dashboard" }, { label: "Koleksi Kelas" }]} />

        <div className="flex flex-col md:flex-row justify-between">
        <FilterMenu className="mr-4" onFilterChange={handleFilterChange} />
          <div className="flex-1">
            <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
              <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-3 shadow-md hover:opacity-90 transition">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredCourses.map((c) => (
                <div key={c.id} className="relative group">
                  <CourseCard
                    courseImage={c.gambar_kelas}
                    avatarImage={c.avatar_tutor}
                    courseName={c.nama_kelas}
                    instructorName={c.tutor_nama}
                    instructorJob={c.tutor_jabatan}
                    instructorCompany={c.tutor_perusahaan}
                    rating={c.rating}
                    reviewCount={c.jumlah_review}
                    price={`Rp ${c.harga.toLocaleString()} K`}
                    onClick={() => navigate("/detail-product")}
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => openEdit(c.id)} className="p-2 rounded-lg bg-white/90 hover:bg-white shadow border border-gray-200" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 shadow border border-red-200" title="Hapus">
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

      {/* =================== FORM =================== */}
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
              {/* Kiri */}
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm text-gray-600">Nama Kelas</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.nama_kelas}
                    onChange={(e) => setForm((f) => ({ ...f, nama_kelas: e.target.value }))}
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Deskripsi</span>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.deskripsi}
                    onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Kategori</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.kategori}
                    onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value }))}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Harga (ribuan)</span>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.harga}
                    onChange={(e) => setForm((f) => ({ ...f, harga: Number(e.target.value) }))}
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
                    <span className="text-sm text-gray-600">Jumlah Review</span>
                    <input
                      type="number"
                      min={0}
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={form.jumlah_review}
                      onChange={(e) => setForm((f) => ({ ...f, jumlah_review: Number(e.target.value) }))}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-gray-600">Tutor Name</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.tutor_nama}
                    onChange={(e) => setForm((f) => ({ ...f, tutor_nama: e.target.value }))}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Tutor Job</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.tutor_jabatan}
                    onChange={(e) => setForm((f) => ({ ...f, tutor_jabatan: e.target.value }))}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600">Tutor Company</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.tutor_perusahaan}
                    onChange={(e) => setForm((f) => ({ ...f, tutor_perusahaan: e.target.value }))}
                  />
                </label>
              </div>

              {/* Kanan */}
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm text-gray-600 inline-flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" /> Course Image
                  </span>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.gambar_kelas}
                    onChange={(e) => setForm((f) => ({ ...f, gambar_kelas: e.target.value }))}
                  >
                    {courseImage.map((img, idx) => (
                      <option key={idx} value={img}>{`Gambar #${idx + 1}`}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm text-gray-600 inline-flex items-center gap-1">
                    <UserIcon className="w-4 h-4" /> Avatar Image
                  </span>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.avatar_tutor}
                    onChange={(e) => setForm((f) => ({ ...f, avatar_tutor: e.target.value }))}
                  >
                    {avatarImage.map((img, idx) => (
                      <option key={idx} value={img}>{`Avatar #${idx + 1}`}</option>
                    ))}
                  </select>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Preview Course Image</div>
                    <img src={form.gambar_kelas} alt="course" className="w-full h-28 object-cover rounded-lg" />
                  </div>
                  <div className="border rounded-xl p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Preview Avatar</div>
                    <img src={form.avatar_tutor} alt="avatar" className="w-20 h-20 object-cover rounded-full mx-auto" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50">Batal</button>
                  <button type="submit" className="px-5 py-3 rounded-xl bg-primary text-white shadow hover:opacity-90">{formMode === "add" ? "Tambah" : "Simpan"}</button>
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
