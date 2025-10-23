import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SidebarModul from "../components/molecules/SidebarModul";
import { useProgressStore } from "../store/useProgressStore";

const VideoClass: React.FC = () => {
  const navigate = useNavigate();
  const { completedModules, completeModule } = useProgressStore();

  const modules = [
    { type: "pretest", title: "Pre-Test: Introduction to HR", duration: "10 Soal" },
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ] as const;

  const activeIndex = 1;
  const progress = ((completedModules.length / modules.length) * 100).toFixed(0);
  const isCompleted = completedModules.includes("video");

  const handleNext = () => {
    // ✅ tandai video selesai di store
    completeModule("video");

    // ✅ update progress ke localStorage (sinkronisasi dengan MyClass)
    const selectedClass = JSON.parse(localStorage.getItem("selectedClass") || "null");
    const currentProgress = JSON.parse(localStorage.getItem("classProgress") || "{}");

    const updatedProgress = {
      ...currentProgress,
      [selectedClass?.id || "default"]: {
        ...(currentProgress[selectedClass?.id || "default"] || {}),
        video: true,
      },
    };

    localStorage.setItem("classProgress", JSON.stringify(updatedProgress));

    // lanjut ke halaman rangkuman
    navigate("/summary");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* === Progress bar === */}
      <div className="w-full bg-gray-200 h-3">
        <div
          className="bg-green-500 h-3 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* === Layout utama === */}
      <div className="flex flex-col md:flex-row gap-8 p-6">
        {/* === Video === */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <div className="w-full h-[450px] bg-black rounded-lg overflow-hidden mb-6">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              width="100%"
              height="100%"
              controls
            />
          </div>

          <h2 className="text-xl font-semibold mb-2">Video: Introduction to HR</h2>
          <p className="text-gray-600 mb-6">
            Pelajari konsep dasar HR (Human Resource) dalam video pembelajaran ini.
          </p>

          <button
            onClick={handleNext}
            className={`${
              isCompleted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-5 py-3 rounded-lg font-semibold transition-all`}
            disabled={isCompleted}
          >
            {isCompleted ? "Sudah Selesai ✅" : "Selesai Video →"}
          </button>
        </div>

        {/* === Sidebar === */}
        <SidebarModul modules={modules} activeIndex={activeIndex} showFooter={false} />
      </div>
    </div>
  );
};

export default VideoClass;
