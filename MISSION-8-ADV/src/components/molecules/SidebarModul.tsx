import React from "react";
import { ChevronDown } from "lucide-react";

interface ModulItem {
  type: "video" | "quiz" | "summary";
  title: string;
  duration: string;
  active?: boolean;
}

interface SidebarModulProps {
  progress: number;
  modules: ModulItem[];
  onSelect: (index: number) => void;
  activeIndex: number;
}

const SidebarModul: React.FC<SidebarModulProps> = ({
  progress,
  modules,
  onSelect,
  activeIndex,
}) => {
  return (
    <div className="w-full md:w-[340px] bg-white shadow-md border rounded-lg overflow-y-auto h-[calc(100vh-180px)]">
      

      {/* MODULE LIST */}
      <div className="p-3">
        <p className="font-semibold mb-3">Introduction to HR</p>
        {modules.map((modul, index) => (
          <div
            key={index}
            className={`flex items-center justify-between mb-2 p-3 rounded-lg border ${
              activeIndex === index
                ? "bg-green-50 border-green-400"
                : "hover:bg-gray-50 border-gray-200"
            } cursor-pointer`}
            onClick={() => onSelect(index)}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{modul.title}</span>
              <span className="text-xs text-gray-500">{modul.duration}</span>
            </div>
            {modul.type === "video" ? (
              <span className="text-gray-500 text-xs">▶</span>
            ) : modul.type === "quiz" ? (
              <span className="text-yellow-500 text-xs font-semibold">
                Quiz
              </span>
            ) : (
              <span className="text-gray-400 text-xs">📝</span>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t mt-auto p-4 flex justify-between items-center">
        <p className="text-sm font-semibold">Introduction to HR</p>
        <ChevronDown className="text-gray-500" size={18} />
      </div>

      <button className="bg-yellow-400 hover:bg-yellow-500 w-full text-white font-semibold py-3">
        ⭐ Beri Review & Rating
      </button>
    </div>
  );
};

export default SidebarModul;
