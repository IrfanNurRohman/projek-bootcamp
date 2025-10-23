import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarModul from "../components/molecules/SidebarModul";
import { RotateCcw } from "lucide-react";

const TryAgainPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scoreFromState = location.state?.score ?? 0;
  const total = 10;
  const correct = Math.round((scoreFromState / 100) * total);
  const wrong = total - correct;
  const date = new Date().toLocaleString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const modules = [
    { type: "pretest", title: "Pre-Test: Introduction to HR", duration: "10 Soal" },
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6 p-0 md:p-6">
        {/* LEFT CONTENT */}
        <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Banner full width */}
          <div className="w-full h-[360px] bg-[url('/src/assets/tryagain.png')] bg-cover bg-center" />

          {/* Body content */}
          <div className="p-8">
            {/* Judul tanggal pretest */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Tanggal Pretest</h2>
              <p className="text-gray-600 text-sm mt-1">{date}</p>
            </div>

            {/* Grid hasil */}
            <div className="grid grid-cols-12 gap-4 items-stretch mt-6">
              <div className="col-span-3 bg-yellow-100 rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Nilai</p>
                <p className="text-2xl font-bold text-yellow-600">{scoreFromState}</p>
              </div>
              <div className="col-span-3 border rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Soal</p>
                <p className="text-lg font-semibold">{total}</p>
              </div>
              <div className="col-span-3 border rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Benar</p>
                <p className="text-lg font-semibold text-green-600">{correct}</p>
              </div>
              <div className="col-span-3 border rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Salah</p>
                <p className="text-lg font-semibold text-red-500">{wrong}</p>
              </div>
            </div>

            {/* Text bawah */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 text-red-500">Belum Berhasil</h3>
              <p className="text-gray-600">
                Pretest sudah selesai namun hasilmu belum memenuhi standar.
              </p>
              <p className="text-gray-600 mt-1">
                Jangan khawatir, kamu bisa mencoba lagi agar hasilmu lebih baik.
              </p>
            </div>

            {/* Button ulangi */}
            <div className="mt-8">
              <button
                onClick={() => navigate("/quiz")}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <RotateCcw size={18} /> Ulangi Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar kanan */}
        <SidebarModul modules={modules} activeIndex={3} showFooter={true} />
      </div>
    </div>
  );
};

export default TryAgainPage;
