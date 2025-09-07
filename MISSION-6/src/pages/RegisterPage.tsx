import React from "react";
import { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthCardProps {
  heading: string;
  subheading: string;
  mode: "login" | "register";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterPage: React.FC<AuthCardProps> = ({
  heading,
  subheading,
  mode,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Format email tidak valid");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    if (!phone || phone.length < 9) {
      alert("Nomor HP tidak valid");
      return;
    }

    // Validasi lainnya bisa ditambahkan sesuai kebutuhan

    // Jika lolos semua validasi
    alert("Registrasi berhasil, anda akan diarahkan ke dashboard ..");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  // const togglePasswordVisibility = () => {
  //     setShowPassword(!showPassword)
  // }
  return (
    <div className="min-h-screen bg-[#fffdf2]">
      <div className="h-[74px] w-full bg-white flex items-center">
        <img
          src="logo.png"
          alt="Videobelajar Logo"
          className="h-[42px] w-[152px] ml-[24px] md:h-[56px] md:w-[237px] md:ml-[120px]"
        />
      </div>

      <div className="min-h-[calc(100vh-90px)] w-screen  flex items-center justify-center md:py-8 px-4">
        <div className="bg-white py-9 px-6 rounded-lg shadow-lg w-full max-w-[590px] h-full">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-[10px]">{heading}</h3>
            <p className="text-gray-600 mb-9">{subheading}</p>
          </div>

          <form className="space-y-4 w-full text-left" onSubmit={handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nama Lengkap"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Jenis Kelamin
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="phone"
                
                className="block text-sm font-medium text-gray-700"
              >
                No. Hp <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-2 w-full mt-1">
                {/* Flag + Code */}
                <div className="min-w-[122px] md:min-w-[150px] h-[42px] flex items-center justify-between border border-gray-300 rounded-md px-3 bg-white cursor-pointer">
                  <img
                    src="https://flagcdn.com/w40/id.png"
                    alt="Indonesia Flag"
                    className="w-5 h-5 inline-block mr-2 bg-[#f5f6fa]"
                  />
                  <span className="text-sm text-gray-700 font-medium">+62</span>
                  <ChevronDown size={16} className="text-gray-500 ml-2" />
                </div>

                {/* Phone Input */}
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  required
                  placeholder="81234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-[42px] block w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-full relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 pr-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <div className="w-full relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                id="password"
                name="password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 pr-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
                className="absolute top-[38px] right-3 text-gray-500 hover:text-gray-700"
              >
                {showPasswordConfirmation ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Buttons */}
            {mode === "login" ? (
              <>
                <button
                  type="submit"
                  className="w-full bg-[#3ECF4C] text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  className="w-full bg-[#E2FCD9] text-[#3ECF4C] font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                >
                  Daftar
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#3ECF4C] text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              >
                Daftar
              </button>
            )}
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="flex-grow h-1 bg-gray-100"></div>
              <span className="text-gray-600">atau</span>
              <div className="flex-grow h-1 bg-gray-100"></div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#E2FCD9] text-[#3ECF4C] font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
