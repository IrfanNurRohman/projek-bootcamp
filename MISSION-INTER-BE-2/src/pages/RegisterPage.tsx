import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthCardProps {
  heading: string;
  subheading: string;
  mode?: "login" | "register";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterPage: React.FC<AuthCardProps> = ({ heading, subheading }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ State untuk popup OTP
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Format email tidak valid");
    if (password.length < 6) return alert("Password minimal 6 karakter");
    if (password !== passwordConfirmation) return alert("Konfirmasi password tidak cocok");
    if (!phoneNumber || phoneNumber.length < 9) return alert("Nomor HP tidak valid");

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
        fullname,
        phoneNumber,
        gender,
      });

      if (response.data.success) {
        // ✅ Tampilkan popup OTP
        setShowOtpModal(true);
      } else {
        setError(response.data.message || "Daftar gagal. Cek email & password.");
      }
    } catch (err) {
      console.error("Daftar error:", err);
      setError("Terjadi kesalahan pada server.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fungsi verifikasi OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Masukkan kode OTP terlebih dahulu!");

    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        alert("Verifikasi OTP berhasil! Silakan login.");
        setShowOtpModal(false);
        navigate("/");
      } else {
        alert(res.data.message || "Kode OTP salah atau sudah kadaluarsa.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan pada server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf2] relative">
      {/* Navbar */}
      <div className="h-[74px] w-full bg-white flex items-center">
        <img
          src="logo.png"
          alt="Videobelajar Logo"
          className="h-[42px] w-[152px] ml-[24px] md:h-[56px] md:w-[237px] md:ml-[120px]"
        />
      </div>

      {/* Form Register */}
      <div className="min-h-[calc(100vh-90px)] w-screen flex items-center justify-center md:py-8 px-4">
        <div className="bg-white py-9 px-6 rounded-lg shadow-lg w-full max-w-[590px]">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-[10px]">{heading}</h3>
            <p className="text-gray-600 mb-9">{subheading}</p>
          </div>

          <form className="space-y-4 w-full text-left" onSubmit={handleSubmit}>
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullname}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Nama Lengkap"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Kelamin
              </label>
              <select
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                No. Hp <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 mt-1">
                <div className="min-w-[122px] flex items-center justify-between border border-gray-300 rounded-md px-3 bg-white">
                  <img src="https://flagcdn.com/w40/id.png" alt="Flag" className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">+62</span>
                  <ChevronDown size={16} className="text-gray-500 ml-2" />
                </div>
                <input
                  type="number"
                  required
                  placeholder="81234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-[42px] w-full rounded-md border border-gray-300 px-4 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[38px] right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Konfirmasi Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute top-[38px] right-3 text-gray-500 hover:text-gray-700"
              >
                {showPasswordConfirmation ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#3ECF4C] text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Daftar"}
            </button>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="flex-grow h-1 bg-gray-100"></div>
              <span className="text-gray-600">atau</span>
              <div className="flex-grow h-1 bg-gray-100"></div>
            </div>

            <button
              type="button"
              className="w-full bg-[#E2FCD9] text-[#3ECF4C] font-semibold py-2 px-4 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* 🔥 POPUP OTP */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-3 text-center">Verifikasi OTP</h2>
            <p className="text-gray-600 text-center mb-4">
              Masukkan kode OTP yang telah dikirim ke <b>{email}</b>
            </p>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-center text-lg tracking-widest focus:ring-2 focus:ring-green-500"
              placeholder="••••••"
            />
            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={() => setShowOtpModal(false)}
                className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleVerifyOtp}
                className="px-5 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Verifikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
