import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { useTutorStore } from "../store/useTutorStore";
import SidebarModul from "../components/molecules/SidebarModul";


const DetailProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedTutor, setSelectedTutor } = useTutorStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(25);

  // Ambil data dari store, atau dari localStorage fallback
  useEffect(() => {
    if (!selectedTutor && id) {
      const savedCourses = localStorage.getItem("courses");
      if (savedCourses) {
        const found = JSON.parse(savedCourses).find(
          (c: any) => String(c.id) === id
        );
        if (found) setSelectedTutor(found);
      }
    }
  }, [id, selectedTutor, setSelectedTutor]);

  if (!selectedTutor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading course...</p>
      </div>
    );
  }

  const modules = [
    { type: "video", title: "Video: Introduction to HR", duration: "12 Menit" },
    { type: "video", title: "Video: Leadership 101", duration: "14 Menit" },
    { type: "summary", title: "Rangkuman: HR Basics", duration: "5 Menit" },
    { type: "quiz", title: "Quiz: Introduction to HR", duration: "10 Soal" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-6">
        {/* LEFT SIDE - VIDEO + INFO */}
        <div className="flex-1">
          <div className="w-full h-[450px] bg-black rounded-lg overflow-hidden mb-4">
            <ReactPlayer
             url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            width="100%"
            height="100%"
            controls
            playing={false} // kamu bisa ubah ke true kalau mau autoplay
            />
          </div>

          <div className="mt-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Praktikkan Skill dengan Technical Book
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Pelajari dan praktikkan skill teknis dalam berbagai industri
              dengan Technical Book Riselearn
            </p>

            {/* INSTRUCTOR INFO */}
            <div className="flex items-center mb-4">
              <img
                src={selectedTutor.avatarImage}
                alt={selectedTutor.instructorName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-sm font-semibold">
                  {selectedTutor.instructorName}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedTutor.instructorJob} di{" "}
                  {selectedTutor.instructorCompany}
                </p>
              </div>
            </div>

            {/* RATING */}
            <div className="flex items-center text-yellow-400 text-sm">
              {"★".repeat(Math.round(selectedTutor.rating || 4))}
              <span className="text-gray-700 ml-2">
                {selectedTutor.rating} ({selectedTutor.reviewCount} ulasan)
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - SIDEBAR */}
        <SidebarModul
          progress={progress}
          modules={modules}
          onSelect={(i) => setActiveIndex(i)}
          activeIndex={activeIndex}
        />
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-green-500 text-white py-3 px-4 flex justify-between items-center rounded-t-lg">
        <button
          className="flex items-center gap-2 text-white"
          onClick={() => navigate(-1)}
        >
          ← {selectedTutor.courseName}
        </button>
        <button className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg">
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};

export default DetailProduct;
