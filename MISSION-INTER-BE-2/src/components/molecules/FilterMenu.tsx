// FilterMenu.tsx
import { Book, Clock, ChevronDown, ChevronUp, Wallet } from "lucide-react";
import { useState } from "react";

interface FilterMenuProps {
  className?: string;
  onFilterChange: (filters: {
    bidang: string[];
    harga: string[];
    durasi: string[];
  }) => void;
}

const FilterMenu = ({ className, onFilterChange }: FilterMenuProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    bidang: [] as string[],
    harga: [] as string[],
    durasi: [] as string[],
  });

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

const handleCheckbox = (
  section: keyof typeof selectedFilters,
  value: string
) => {
  setSelectedFilters(prev => {
    const newValues = prev[section].includes(value)
      ? prev[section].filter(v => v !== value)
      : [...prev[section], value];

    const newFilters = { ...prev, [section]: newValues };
    console.log("Filter terkirim:", newFilters);
    onFilterChange(newFilters); 
    return newFilters;
  });
};


  const handleReset = () => {
    const resetFilters = { bidang: [], harga: [], durasi: [] };
    setSelectedFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className={className}>
      <div className="w-full md:w-[366px] bg-white border rounded-lg p-4 shadow-sm flex flex-col mx-auto mb-4">
        <div className="flex justify-between mb-4">
          <h6>
            <span className="text-lg text-[#333333] font-semibold">Filter</span>
          </h6>
          <button
            onClick={handleReset}
            className="text-[#FF5C2B] font-semibold text-[16px] flex items-center gap-1 hover:underline"
          >
            Reset
          </button>
        </div>

        {/* === BIDANG STUDI === */}
        <div className="rounded-lg bg-white shadow-md p-4">
          <div
            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
            onClick={() => toggleSection("bidang")}
          >
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Bidang Studi
              </span>
            </div>
            {openSection === "bidang" ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </div>

          {openSection === "bidang" && (
            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">
              {["Pemasaran", "Digital & Teknologi", "Desain", "Pengembangan Diri", "Bisnis Manajemen"].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.bidang.includes(opt)}
                    onChange={() => handleCheckbox("bidang", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* === HARGA === */}
        <div className="rounded-lg bg-white shadow-md p-4">
          <div
            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
            onClick={() => toggleSection("harga")}
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Harga</span>
            </div>
            {openSection === "harga" ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </div>

          {openSection === "harga" && (
            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">
              {["Gratis", "Rp100.000", "Rp100.000 – Rp500.000", "Rp500.000+"].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.harga.includes(opt)}
                    onChange={() => handleCheckbox("harga", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* === DURASI === */}
        <div className="rounded-lg bg-white shadow-md p-4">
          <div
            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
            onClick={() => toggleSection("durasi")}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Durasi</span>
            </div>
            {openSection === "durasi" ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </div>

          {openSection === "durasi" && (
            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">
              {["<4 Jam", "4–8 Jam", ">8 Jam"].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.durasi.includes(opt)}
                    onChange={() => handleCheckbox("durasi", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
