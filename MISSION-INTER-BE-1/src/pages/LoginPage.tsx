import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthCardProps {
  heading: string;
  subheading: string;
  mode: "login" | "register";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginPage: React.FC<AuthCardProps> = ({
  heading,
  subheading,
  mode,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        console.log("Login berhasil ✅");

        // ✅ Simpan email user ke localStorage
        localStorage.setItem("userEmail", email);

        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login gagal. Cek email & password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan pada server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf2]">
      <div className="h-[74px] w-full bg-white flex items-center">
        <img
          src="logo.png"
          alt="Videobelajar Logo"
          className="h-[42px] w-[152px] ml-[24px] md:h-[56px] md:w-[237px] md:ml-[120px]"
        />
      </div>

      <div className="min-h-[calc(100vh-90px)] w-screen flex items-center justify-center px-4">
        <div className="bg-white py-8 px-6 rounded-lg shadow-lg w-full max-w-[590px] h-full">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{heading}</h3>
            <p className="text-gray-600 mb-6">{subheading}</p>
          </div>

          <form className="space-y-6 w-full text-left" onSubmit={handleSubmit}>
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {mode === "login" ? (
              <>
                <button
                  type="submit"
                  className="w-full bg-[#3ECF4C] text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Masuk"}
                </button>
                <button
                  type="button"
                  className="w-full bg-[#E2FCD9] text-[#3ECF4C] font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                  onClick={() => navigate("/register")}
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
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google logo"
              />
              Masuk dengan Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
