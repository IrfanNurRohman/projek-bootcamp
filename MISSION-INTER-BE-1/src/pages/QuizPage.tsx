import React, { useState, useEffect } from "react";
import SidebarModul from "../components/molecules/SidebarModul";
import { useProgressStore } from "../store/useProgressStore";
import { useNavigate } from "react-router-dom";

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeModule } = useProgressStore();

  const modules = [
    { type: "pretest", title: "Pre-Test: Introduction to HR", duration: "10 Soal" },
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ] as const;

  const questions = [
    { id: 1, text: "Apa fungsi utama HR dalam perusahaan?", options: ["Mengatur keuangan perusahaan", "Mengelola sumber daya manusia", "Mengatur strategi pemasaran", "Menentukan harga produk"], correct: 1 },
    { id: 2, text: "Siapa yang bertanggung jawab terhadap proses rekrutmen?", options: ["HR Department", "Marketing Team", "Finance Division", "IT Support"], correct: 0 },
    { id: 3, text: "Tujuan dari pelatihan karyawan adalah?", options: ["Meningkatkan kemampuan dan kinerja karyawan", "Mengurangi beban kerja HR", "Menambah gaji karyawan", "Meningkatkan harga produk"], correct: 0 },
    { id: 4, text: "Apa yang dimaksud dengan turnover karyawan?", options: ["Pergantian karyawan yang keluar dan masuk perusahaan", "Promosi jabatan dalam perusahaan", "Karyawan yang bekerja lembur", "Karyawan yang mendapat penghargaan"], correct: 0 },
    { id: 5, text: "HR bertanggung jawab dalam hal berikut, kecuali?", options: ["Rekrutmen dan seleksi", "Pelatihan dan pengembangan", "Penjualan produk", "Manajemen kompensasi"], correct: 2 },
    { id: 6, text: "Apa tujuan dari performance appraisal?", options: ["Menilai kinerja karyawan", "Memberi bonus tahunan", "Menentukan struktur organisasi", "Menilai laporan keuangan"], correct: 0 },
    { id: 7, text: "Kebijakan cuti termasuk dalam area mana?", options: ["Manajemen kompensasi dan benefit", "Manajemen pemasaran", "Manajemen proyek", "Manajemen pelanggan"], correct: 0 },
    { id: 8, text: "Recruitment process dimulai dari?", options: ["Identifikasi kebutuhan posisi", "Wawancara kandidat", "Onboarding karyawan", "Evaluasi kinerja"], correct: 0 },
    { id: 9, text: "Apa manfaat pelatihan onboarding?", options: ["Membantu karyawan baru beradaptasi dengan budaya perusahaan", "Memberikan tunjangan tambahan", "Menilai kemampuan keuangan karyawan", "Meningkatkan jumlah pelanggan"], correct: 0 },
    { id: 10, text: "Bagian HR biasanya bekerja sama dengan bagian mana untuk menentukan kebutuhan tenaga kerja?", options: ["Setiap departemen terkait", "Tim marketing", "Tim keuangan", "Bagian IT"], correct: 0 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(questions.length).fill(null));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnswer = (qIndex: number, oIndex: number) => {
    const copy = [...answers];
    copy[qIndex] = oIndex;
    setAnswers(copy);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleFinish = () => setShowModal(true);

  const handleConfirmFinish = () => {
    setShowModal(false);

    // hitung benar/salah/score
    const correctCount = questions.reduce((acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc), 0);
    const wrongCount = questions.length - correctCount;
    const score = Math.round((correctCount / questions.length) * 100);

    // simpan ke Zustand (module + score)
    const date = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const scoreData = {
      score,
      correct: correctCount,
      wrong: wrongCount,
      total: questions.length,
      date,
    };

    completeModule("quiz", scoreData);

    // sinkron ke classProgress (supaya MyClass bisa baca)
    const selectedClass = JSON.parse(localStorage.getItem("selectedClass") || "null");
    const classProgress = JSON.parse(localStorage.getItem("classProgress") || "{}");

    const updatedClassProgress = {
      ...classProgress,
      [selectedClass?.id || "default"]: {
        ...(classProgress[selectedClass?.id || "default"] || {}),
        quiz: true,
        score,
        correct: correctCount,
        wrong: wrongCount,
        date,
      },
    };
    localStorage.setItem("classProgress", JSON.stringify(updatedClassProgress));

    // update myClasses progress summary
    const myClasses = JSON.parse(localStorage.getItem("myClasses") || "[]");
    const updatedMyClasses = myClasses.map((c: any) => {
      if (c.id === selectedClass?.id) {
        // hitung done modules dari classProgress
        const prog = updatedClassProgress[selectedClass?.id || "default"] || {};
        const doneModules = ["pretest", "video", "summary", "quiz"].filter((m) => prog[m]).length;
        const percent = Math.round((doneModules / 4) * 100);
        return { ...c, progress: percent };
      }
      return c;
    });
    localStorage.setItem("myClasses", JSON.stringify(updatedMyClasses));

    // jika lulus (>=70) -> congrats, else tryagain
    const pass = score >= 50;
    if (pass) {
      // tampilkan popup singkat (sesuai permintaan: jangan ubah UI) -> gunakan alert ringan
      alert("🎉 Selamat! Kamu lulus quiz. Sertifikat bisa diambil di My Class.");
      navigate("/congrats", { state: { score } });
    } else {
      alert("😔 Nilai belum mencukupi — coba lagi agar lulus.");
      navigate("/tryagain", { state: { score } });
    }
  };

  const allAnswered = answers.every((a) => a !== null);
  const progress = Math.round((answers.filter((a) => a !== null).length / questions.length) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-3">
        <div className="bg-green-500 h-3 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-col md:flex-row gap-8 p-6">
        {/* Sidebar soal */}
        <div className="w-full md:w-1/5 bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold mb-3">List Soal</h3>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {questions.map((q, i) => {
              const isAnswered = answers[i] !== null;
              const isActive = i === currentIndex;
              return (
                <div key={q.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setCurrentIndex(i)}
                    className={`w-10 h-10 rounded-md font-medium border text-sm transition-all duration-300 flex items-center justify-center ${
                      isActive ? "bg-green-600 text-white border-green-700" : isAnswered ? "bg-green-100 border-green-400 text-green-700" : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                  <div className={`w-2 h-2 mt-1 rounded-full ${isAnswered ? "bg-green-500" : "bg-gray-300"}`} />
                </div>
              );
            })}
          </div>

          <button
            disabled={!allAnswered}
            onClick={handleFinish}
            className={`w-full text-center py-2 rounded-lg border font-semibold ${allAnswered ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          >
            {allAnswered ? "Selesaikan semua soal" : "Selesaikan semua soal untuk mengakhiri quiz"}
          </button>
        </div>

        {/* Soal area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-2">Pertanyaan {currentIndex + 1}</h3>
          <p className="text-gray-700 mb-6">{questions[currentIndex].text}</p>

          <div className="space-y-2">
            {questions[currentIndex].options.map((opt, i) => (
              <label key={i} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-300 ${answers[currentIndex] === i ? "border-green-500 bg-green-50" : "border-gray-300 hover:bg-gray-50"}`}>
                <input type="radio" name={`q${currentIndex}`} checked={answers[currentIndex] === i} onChange={() => handleAnswer(currentIndex, i)} />
                {opt}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={handlePrev} disabled={currentIndex === 0} className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 disabled:opacity-50">Sebelumnya</button>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1} className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50">Selanjutnya</button>
          </div>
        </div>

        <SidebarModul modules={modules} activeIndex={3} showFooter={false} />
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <img src="/src/assets/selesai.png" alt="Selesai" className="mx-auto mb-4 w-48" />
            <h3 className="text-xl font-semibold mb-2">Selesaikan Quiz</h3>
            <p className="text-gray-600 mb-6">Apakah kamu yakin untuk menyelesaikan quiz ini?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowModal(false)} className="border border-green-500 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50">Batal</button>
              <button onClick={handleConfirmFinish} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Selesai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
