import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarModul from "../components/molecules/SidebarModul";
import { useTutorStore } from "../store/useTutorStore";
import { useProgressStore } from "../store/useProgressStore";

const PretestPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTutor, setSelectedTutor } = useTutorStore();
  const { completeModule } = useProgressStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const questions = [
    {
      question: "Apa yang dimaksud dengan Human Resource (HR)?",
      options: [
        "Manajemen keuangan perusahaan",
        "Sumber daya manusia dalam organisasi",
        "Pengelolaan barang dan aset",
        "Perencanaan pemasaran produk",
      ],
      correct: 1,
    },
    {
      question: "Tujuan utama HR adalah?",
      options: [
        "Menjual produk lebih banyak",
        "Mengelola karyawan secara efektif",
        "Meningkatkan laba penjualan",
        "Mengurangi biaya produksi",
      ],
      correct: 1,
    },
  ];

  const modules = [
    { type: "pretest", title: "Pre-Test: Introduction to HR", duration: "10 Soal" },
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ] as const;

  useEffect(() => {
    const cls = JSON.parse(localStorage.getItem("selectedClass") || "null");
    if (!cls) navigate("/my-class");
    else setSelectedClass(cls);

    if (!selectedTutor && cls) {
      setSelectedTutor(cls);
    }
  }, [navigate, selectedTutor, setSelectedTutor]);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // ✅ Simpan progress pretest
      completeModule("pretest");

      // ✅ Update progress di localStorage (buat MyClass)
      const currentProgress = JSON.parse(localStorage.getItem("classProgress") || "{}");
      const updatedProgress = {
        ...currentProgress,
        [selectedClass?.id || "default"]: {
          ...(currentProgress[selectedClass?.id || "default"] || {}),
          pretest: true,
        },
      };
      localStorage.setItem("classProgress", JSON.stringify(updatedProgress));

      // ✅ Setelah selesai, arahkan ke halaman video-class
      navigate("/video-class");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-6">
        {/* === Bagian Kiri (Soal) === */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Pre-Test: {selectedClass?.classTitle}
          </h1>

          <div>
            <p className="text-gray-700 font-semibold mb-4">
              {questions[currentQuestion].question}
            </p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((opt, i) => (
                <label
                  key={i}
                  className={`block border rounded-lg p-3 cursor-pointer transition-all ${
                    answers[currentQuestion] === opt
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    className="mr-2"
                    checked={answers[currentQuestion] === opt}
                    onChange={() => handleAnswer(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              {currentQuestion < questions.length - 1
                ? "Next →"
                : "Lanjut ke materi berikutnya →"}
            </button>
          </div>
        </div>

        {/* === Sidebar Modul === */}
        <SidebarModul modules={modules} activeIndex={0} showFooter={false} />
      </div>
    </div>
  );
};

export default PretestPage;
