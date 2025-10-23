import React from "react";
import SortDropdown from "./SortDropDown";
import { Search } from "lucide-react";

interface HeaderTabsProps {
  tabs: { id: number; label: string }[];
  activeTabId: number;
  onTabChange: (id: number) => void;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
}) => {
  return (
<div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between px-4 gap-y-4">
  {/* Tabs */}
  <nav className="w-full md:w-auto">
    <ul className="flex overflow-x-auto space-x-4 scrollbar-hide">
      {tabs.map((tab) => (
        <li key={tab.id}>
          <button
            onClick={() => onTabChange(tab.id)}
            className={`pb-2 text-sm whitespace-nowrap transition-colors ${
              activeTabId === tab.id
                ? "border-b-2 border-red-500 font-semibold text-red-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  </nav>

  {/* Search & Sort */}
  <div className="flex flex-col md:flex-row-reverse gap-4 w-full md:w-auto">
    <SortDropdown />

    <div className="relative w-full md:w-[240px] rounded-lg bg-white shadow-md p-3 flex items-center">
      <input
        type="text"
        placeholder="Cari Kelas"
        className="text-sm text-gray-800 placeholder-gray-400 focus:outline-none w-full"
      />
      <Search className="w-4 h-4 text-primary ml-2 shrink-0" />
    </div>
  </div>
</div>
  );
};

export default HeaderTabs;
