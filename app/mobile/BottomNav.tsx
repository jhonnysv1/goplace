import { Layout, List, Map, Filter } from "lucide-react";
import { FilterSheet } from "./FilterSheet";
import type React from "react";
import { FilterState } from "./sharedData";

interface BottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function BottomNav({
  currentView,
  setCurrentView,
  filters,
  setFilters,
}: BottomNavProps) {
  const navItems = [
    { id: "reels", icon: Layout, label: "Reels" },
    { id: "list", icon: List, label: "List" },
    { id: "map", icon: Map, label: "Map" },
  ];

  return (
    <nav className="bg-white border-t border-gray-200">
      <div className="flex justify-around items-center">
        <FilterSheet filters={filters} setFilters={setFilters}>
          <button className="flex flex-col items-center py-2 px-2">
            <Filter className="w-6 h-6 text-[#a028ef]" />
            <span className="mt-1 text-xs text-[#a028ef]">Filtrar</span>
          </button>
        </FilterSheet>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center py-4 px-2 ${
              currentView === item.id ? "text-[#a028ef]" : "text-gray-500"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="mt-1 text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
