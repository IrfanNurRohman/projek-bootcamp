import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarModul from "../components/molecules/SidebarModul";
import { useProgressStore } from "../store/useProgressStore";
import { Download } from "lucide-react";

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { completedModules, completeModule } = useProgressStore();

  const modules = [
    { type: "pretest", title: "Pre-Test: Introduction to HR", duration: "10 Soal" },
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ] as const;

  const activeIndex = 2;
  const progress = ((completedModules.length / modules.length) * 100).toFixed(0);
  const isCompleted = completedModules.includes("summary");

  const handleNext = () => {
    completeModule("summary");

    const selectedClass = JSON.parse(localStorage.getItem("selectedClass") || "null");
    const currentProgress = JSON.parse(localStorage.getItem("classProgress") || "{}");

    const updatedProgress = {
      ...currentProgress,
      [selectedClass?.id || "default"]: {
        ...(currentProgress[selectedClass?.id || "default"] || {}),
        summary: true,
      },
    };

    localStorage.setItem("classProgress", JSON.stringify(updatedProgress));
    navigate("/quiz");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* === Progress Bar === */}
      <div className="w-full bg-gray-200 h-3">
        <div
          className="bg-green-500 h-3 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* === Layout === */}
      <div className="flex flex-col md:flex-row gap-8 p-6">
        {/* === Main Content === */}
        <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Banner Video Placeholder */}
          <div className="bg-gray-700 h-[505px] flex items-center justify-center">
            <div className="bg-white rounded-full p-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* === Download Section === */}
          <div className="p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Download Rangkuman Modul
            </h2>
            <p className="text-gray-600 mb-4">
              Silakan download rangkuman modul dari materi yang telah kamu pelajari.
            </p>

            <a
              href="/files/rangkuman-hr.pdf"
              download
              className="inline-flex items-center gap-2 bg-white text-green-600 border border-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all"
            >
              <Download size={16} />
              Download Rangkuman
            </a>

            <div className="mt-8">
              <button
                onClick={handleNext}
                className={`${
                  isCompleted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white px-6 py-3 rounded-lg font-semibold transition-all`}
                disabled={isCompleted}
              >
                {isCompleted ? "Sudah Selesai ✅" : "Lanjut ke Quiz →"}
              </button>
            </div>
          </div>
        </div>

        {/* === Sidebar Modul === */}
        <SidebarModul modules={modules} activeIndex={activeIndex} showFooter={false} />
      </div>
    </div>
  );
};

export default SummaryPage;
