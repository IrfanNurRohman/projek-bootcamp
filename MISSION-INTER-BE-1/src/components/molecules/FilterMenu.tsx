import { Book, Clock, ChevronDown, ChevronUp, Wallet } from "lucide-react";
import { useState } from "react";


interface FilterMenuProps {
    className?: string;
}

const FilterMenu = ({ className }: FilterMenuProps) => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    return (
        <div className={className}>




            <div className="w-full md:w-[366px] bg-white border rounded-lg p-4 shadow-sm flex flex-col mx-auto mb-4 ">
                {/* Reset Button */}
                <div className="flex justify-between mb-4">
                    <h6>
                        <span className="text-lg text-[#333333] font-semibold">Filter</span>
                    </h6>
                    <button className="text-[#FF5C2B] font-semibold text-[16px] flex items-center gap-1 hover:underline">
                        Reset
                    </button>
                </div>

                {/* Filter Options */}
                <div className="space-y-3">
                    {/* Bidang Studi */}
                    <div className="rounded-lg bg-white shadow-md p-4">
                        <div
                            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
                            onClick={() => toggleSection("bidang")}
                        >
                            <div className="flex items-center gap-2">
                                <Book className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Bidang Studi</span>
                            </div>
                            {openSection === "bidang" || window.innerWidth >= 768 ? (
                                <ChevronUp className="w-4 h-4 text-primary" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        {openSection === "bidang" || window.innerWidth >= 768 && (
                            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">

                                <label className="flex items-center gap-2 text-sm text-gray-800">
                                    <input type="checkbox" className="w-4 h-4 bg-primary" />
                                    Pemasaran
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-800">
                                    <input type="checkbox" className="w-4 h-4 bg-primary" />
                                    Digital & Teknologi
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-800">
                                    <input type="checkbox" className="w-4 h-4 bg-primary" />
                                    Pengembangan Diri
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-800">
                                    <input type="checkbox" className="w-4 h-4 bg-primary" />
                                    Bisnis Manajemen
                                </label>

                            </div>
                        )}
                    </div>

                    {/* Harga */}
                    <div className="rounded-lg bg-white shadow-md p-4">
                        <div
                            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
                            onClick={() => toggleSection("harga")}
                        >
                            <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Harga</span>
                            </div>
                            {openSection === "harga" || window.innerWidth >= 768 ? (
                                <ChevronUp className="w-4 h-4 text-primary" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        {openSection === "harga" || window.innerWidth >= 768 && (
                            <div className="mt-3 space-y-2 text-sm text-[#333]  flex flex-col">
                                <label><input type="checkbox" /> Gratis</label>
                                <label><input type="checkbox" />  Rp100.000</label>
                                <label><input type="checkbox" /> Rp100.000 – Rp500.000</label>
                                <label><input type="checkbox" />  Rp500.000</label>
                            </div>
                        )}
                    </div>

                    {/* Durasi */}
                    <div className="rounded-lg bg-white shadow-md p-4">
                        <div
                            className="flex items-center justify-between cursor-pointer hover:text-yellow-600"
                            onClick={() => toggleSection("durasi")}
                        >
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Durasi</span>
                            </div>
                            {openSection === "durasi" || window.innerWidth >= 768 ? (
                                <ChevronUp className="w-4 h-4 text-primary" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        {openSection === "durasi" || window.innerWidth >= 768 && (
                            <div className="mt-3 space-y-2 text-sm text-[#333] flex flex-col">
                                <label><input type="checkbox" /> Kurang dari 4 Jam</label>
                                <label><input type="checkbox" /> 4 – 8 Jam</label>
                                <label><input type="checkbox" /> Lebih dari 8 Jam</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default FilterMenu;