import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import SidebarModul from "../components/molecules/SidebarModul";
import { useTutorStore } from "../store/useTutorStore";
import { useProgressStore } from "../store/useProgressStore";

const PretestRulesPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTutor, setSelectedTutor } = useTutorStore();
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const { completedModules, completeModule } = useProgressStore();

  useEffect(() => {
    const cls = JSON.parse(localStorage.getItem("selectedClass") || "null");
    if (!cls) navigate("/my-class");
    else setSelectedClass(cls);

    // Sinkronisasi ke store jika kosong
    if (!selectedTutor && cls) {
      setSelectedTutor(cls);
    }
  }, [navigate, selectedTutor, setSelectedTutor]);

  const handleStartPretest = () => {
    // Tandai pretest selesai
    completeModule(0);
    navigate("/pretest");
  };

  const modules = [
    { type: "pretest", title: "Pre-Test: Introduction to HR", duration: "10 Soal" },
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-6">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src="../src/assets/rules.png"
              alt="Pretest Rules"
              className="w-full h-[360px] object-cover block"
            />
            <div className="p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Pre-Test: {selectedClass?.classTitle}
              </h1>

              <p className="text-gray-600 mb-6">
                Sebelum memulai pre-test, harap baca aturan berikut.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-0.5" size={18} />
                  <p>Pastikan kamu berada di tempat yang tenang dan nyaman.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-0.5" size={18} />
                  <p>Setiap soal hanya bisa dijawab satu kali.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-0.5" size={18} />
                  <p>
                    Waktu akan dimulai setelah kamu klik tombol “Mulai Pre-Test”.
                  </p>
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={handleStartPretest}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Mulai Pre-Test →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Sidebar Modul Diperbaiki */}
        <SidebarModul
          modules={modules}
          activeIndex={0}
          onSelect={() => {}}
          completedModules={completedModules} // ✅ ini yang sebelumnya hilang
        />
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-green-500 text-white py-3 px-4 flex justify-between items-center rounded-t-lg">
        <button
          className="flex items-center gap-2 text-white"
          onClick={() => navigate(-1)}
        >
          ← Kembali
        </button>
        <button
          onClick={handleStartPretest}
          className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg"
        >
          Mulai Pre-Test →
        </button>
      </div>
    </div>
  );
};

export default PretestRulesPage;
