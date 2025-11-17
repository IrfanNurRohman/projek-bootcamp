import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarModul from "../components/molecules/SidebarModul";
import { Award, Star } from "lucide-react";
import { useProgressStore } from "../store/useProgressStore";

const CongratsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scores, completeModule } = useProgressStore();

  const stateScore = location.state?.score;
  const scoreData =
    scores.quiz ||
    (stateScore !== undefined
      ? {
          score: stateScore,
          total: 10,
          correct: Math.round((stateScore / 100) * 10),
          wrong: 10 - Math.round((stateScore / 100) * 10),
          date: new Date().toLocaleString("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }
      : undefined);

  React.useEffect(() => {
    completeModule("quiz");
  }, [completeModule]);

  const modules = [
    { type: "pretest", title: "Pre-Test: Introduction to HR", duration: "10 Soal" },
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ];

  if (!scoreData) {
    return (
      <div className="p-8">
        <p>Data hasil tidak ditemukan.</p>
      </div>
    );
  }

  const handleTakeCertificate = () => {
    const selectedClass = JSON.parse(localStorage.getItem("selectedClass") || "null");
    if (!selectedClass) {
      alert("Kelas tidak ditemukan. Kembali ke My Class.");
      navigate("/my-class");
      return;
    }

    const classProgress = JSON.parse(localStorage.getItem("classProgress") || "{}");
    const updated = {
      ...classProgress,
      [selectedClass.id || "default"]: {
        ...(classProgress[selectedClass.id || "default"] || {}),
        certificateTaken: true,
        certificateData: scoreData,
        progress: 100,
      },
    };
    localStorage.setItem("classProgress", JSON.stringify(updated));

    const myClasses = JSON.parse(localStorage.getItem("myClasses") || "[]");
    const updatedMy = myClasses.map((c: any) =>
      c.id === selectedClass.id ? { ...c, progress: 100 } : c
    );
    localStorage.setItem("myClasses", JSON.stringify(updatedMy));

    alert("🎓 Sertifikat berhasil diambil! Cek My Class untuk mengunduh.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6 p-0 md:p-6">
        {/* LEFT CONTENT */}
        <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Banner full width */}
          <div className="w-full h-[360px] bg-[url('/src/assets/congrats.png')] bg-cover bg-center" />

          {/* Body content */}
          <div className="p-8">
            {/* Judul tanggal pretest */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Tanggal Pretest</h2>
              <p className="text-gray-600 text-sm mt-1">{scoreData.date}</p>
            </div>

            {/* Grid hasil */}
            <div className="grid grid-cols-12 gap-4 items-stretch mt-6">
              <div className="col-span-3 bg-yellow-100 rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Nilai</p>
                <p className="text-2xl font-bold text-yellow-600">{scoreData.score}</p>
              </div>
              <div className="col-span-3 border rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Soal</p>
                <p className="text-lg font-semibold">{scoreData.total}</p>
              </div>
              <div className="col-span-3 border rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Benar</p>
                <p className="text-lg font-semibold text-green-600">{scoreData.correct}</p>
              </div>
              <div className="col-span-3 border rounded-lg p-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">Salah</p>
                <p className="text-lg font-semibold text-red-500">{scoreData.wrong}</p>
              </div>
            </div>

            {/* Text bawah */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Selesai!</h3>
              <p className="text-gray-600">
                Pretest sudah selesai dan kami sudah tahu progresmu.
              </p>
              <p className="text-gray-600 mt-1">Saatnya memulai kelas.</p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleTakeCertificate}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <Award className="inline-block mr-2" size={16} /> Ambil Sertifikat
              </button>
              <button
                onClick={() => navigate("/my-class")}
                className="border border-yellow-400 text-yellow-500 px-6 py-3 rounded-lg font-medium hover:bg-yellow-50 transition"
              >
                <Star className="inline-block mr-2" size={14} /> Lihat My Class
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

export default CongratsPage;
