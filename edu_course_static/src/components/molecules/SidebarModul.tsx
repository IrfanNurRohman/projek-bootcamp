import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  FileText,
  PlayCircle,
  BookOpen,
  Star,
  CheckCircle,
  Lock,
} from "lucide-react";
import { useProgressStore } from "../../store/useProgressStore";

interface ModulItem {
  type: "pretest" | "video" | "summary" | "quiz";
  title: string;
  duration: string;
}

interface SidebarModulProps {
  modules: ModulItem[];
  onSelect?: (index: number) => void;
  activeIndex?: number;
  showFooter?: boolean;
}

const SidebarModul: React.FC<SidebarModulProps> = ({
  modules,
  onSelect = () => {},
  activeIndex = 0,
  showFooter = true,
}) => {
  const navigate = useNavigate();
  const { completedModules, saveReview, reviewData } = useProgressStore();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [review, setReview] = useState(reviewData?.review || "");

  const handleSelect = (modul: ModulItem, index: number) => {
    const moduleOrder = ["pretest", "video", "summary", "quiz"];
    const currentIndex = moduleOrder.indexOf(modul.type);
    const requiredPrevious = moduleOrder.slice(0, currentIndex);

    const allPreviousDone = requiredPrevious.every((m) =>
      completedModules.includes(m)
    );

    if (!allPreviousDone) {
      alert("Selesaikan modul sebelumnya dulu!");
      return;
    }

    onSelect(index);

    switch (modul.type) {
      case "pretest":
        navigate("/pretest-rules");
        break;
      case "video":
        navigate("/video-class");
        break;
      case "summary":
        navigate("/summary");
        break;
      case "quiz":
        navigate("/quiz");
        break;
    }
  };

  const handleSaveReview = () => {
    if (!rating) {
      alert("Silakan beri rating terlebih dahulu!");
      return;
    }
    saveReview({ rating, review });
    setShowReviewModal(false);
    alert("Terima kasih atas review-nya!");
  };

  return (
    <>
      <div className="w-full md:w-[330px] bg-white border rounded-xl shadow-sm flex flex-col h-[calc(100vh-140px)] relative">
        <div className="p-5 border-b">
          <h2 className="text-base font-semibold text-gray-800">Daftar Modul</h2>
        </div>

        <div className="overflow-y-auto flex-1 p-5 pt-3 space-y-3">
          <p className="font-semibold text-gray-800 mb-3">Introduction to HR</p>

          {modules.map((modul, index) => {
            const isActive = activeIndex === index;
            const isDone = completedModules.includes(modul.type);

            const icon =
              modul.type === "video" ? (
                <PlayCircle size={16} />
              ) : modul.type === "summary" ? (
                <BookOpen size={16} />
              ) : modul.type === "quiz" ? (
                <FileText size={16} />
              ) : (
                <FileText size={16} />
              );

            return (
              <div
                key={index}
                onClick={() => handleSelect(modul, index)}
                className={`flex items-start justify-between border rounded-lg p-3 cursor-pointer transition-all ${
                  isActive
                    ? "bg-green-50 border-green-400"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-gray-800" : "text-gray-700"
                    }`}
                  >
                    {modul.title}
                  </span>
                  <span className="text-xs text-gray-500">{modul.duration}</span>
                </div>

                <div className="flex items-center gap-1">
                  {isDone ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <Lock size={16} className="text-gray-400" />
                  )}
                  {icon}
                </div>
              </div>
            );
          })}
        </div>

        {showFooter && (
          <div className="border-t bg-white">
            <div className="p-4 flex justify-between items-center border-b">
              <p className="text-sm font-semibold text-gray-800">
                Introduction to HR
              </p>
              <ChevronDown className="text-gray-500" size={18} />
            </div>

            <button
              onClick={() => {
                if (!completedModules.includes("quiz")) {
                  alert("Selesaikan semua modul sebelum memberi review!");
                  return;
                }
                setShowReviewModal(true);
              }}
              className={`w-full font-semibold py-3 flex items-center justify-center gap-2 transition-all ${
                completedModules.includes("quiz")
                  ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <Star size={16} className="fill-white" />
              Beri Review & Rating
            </button>
          </div>
        )}
      </div>

      {/* Modal Review */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[420px] p-6 shadow-xl">
            <h3 className="text-center font-semibold text-sm mb-2">
              Tulis Review Terbaikmu!
            </h3>
            <p className="text-center text-xs text-gray-500 mb-4">
              Apakah kamu yakin untuk menyelesaikan pretest ini?
            </p>

            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              className="w-full border rounded-lg p-2 text-sm mb-4 focus:ring-2 focus:ring-green-400"
              rows={3}
              placeholder="Masukkan review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="flex justify-between gap-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-1/2 py-2 border rounded-lg font-semibold text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleSaveReview}
                className="w-1/2 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarModul;
