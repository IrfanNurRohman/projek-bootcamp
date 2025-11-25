import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarMenu from "../components/molecules/SidebarMenu";
import FooterContent from "../components/molecules/FooterContent";
import HeaderDashboard from "../components/HeaderDashboard";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    gender: "",
    avatar_img: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Ganti dengan email user yang sedang login (misalnya dari localStorage)
  const userEmail = localStorage.getItem("userEmail");

  // 🔹 Ambil data profil dari backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/profile?email=${userEmail}`
        );
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error("Gagal ambil profil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userEmail]);

  // 🔹 Update value input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // 🔹 Upload dan ubah foto jadi base64
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar_img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Simpan perubahan ke database
  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:8000/profile", profile);
      if (res.data.success) {
        alert("Profil berhasil diperbarui!");
        navigate("/dashboard");
      } else {
        alert("Gagal menyimpan profil: " + res.data.message);
      }
    } catch (err) {
      console.error("Error saat update profil:", err);
      alert("Terjadi kesalahan pada server.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#fffdf2] min-h-screen flex flex-col">
      <HeaderDashboard />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-10 px-6 flex-1 w-full">
        <SidebarMenu />

        {/* Form Profil */}
        <div className="flex-1 bg-white border rounded-2xl shadow-md p-8 md:p-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
            <div className="relative">
              <img
                src={
                  profile.avatar_img
                    ? profile.avatar_img
                    : "https://i.pravatar.cc/100?img=47"
                }
                alt="profile"
                className="w-24 h-24 rounded-lg object-cover border"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="upload-photo"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-semibold text-lg text-gray-800">
                {profile.fullname}
              </h2>
              <p className="text-gray-500 text-sm">{profile.email}</p>
              <label
                htmlFor="upload-photo"
                className="text-red-500 text-sm mt-1 hover:underline cursor-pointer"
              >
                Ganti Foto Profil
              </label>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-6"></div>

          <div className="grid md:grid-cols-3 gap-6 w-full min-w-0">
            <div className="min-w-0">
              <label className="text-sm text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="min-w-0">
              <label className="text-sm text-gray-700">E-Mail</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="min-w-0">
              <label className="text-sm text-gray-700">No. HP</label>
              <input
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-10 pr-2">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-lg font-semibold shadow-sm transition"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <FooterContent />
    </div>
  );
};

export default ProfilePage;
