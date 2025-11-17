import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const sortOptions = [
  "Harga Rendah",
  "Harga Tinggi",
  "A to Z",
  "Z to A",
  "Rating Tertinggi",
  "Rating Terendah",
];

export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[122px] ">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-white shadow-md p-4 flex flex-row items-center justify-between w-full h-full cursor-pointer hover:bg-gray-100"
      >
        <span className="text-sm font-medium text-[#333333]">
          {selected || "Urutkan"}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-primary" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {sortOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}