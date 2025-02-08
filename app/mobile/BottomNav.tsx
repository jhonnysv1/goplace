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
    { id: "list", icon: List, label: "Lista" },
    { id: "map", icon: Map, label: "Mapa" },
  ];

  return (
    <nav className="bg-black text-white shadow-md h-12 flex items-center justify-around">
      {/* Botón de Filtros */}
      <FilterSheet filters={filters} setFilters={setFilters}>
        <button className="flex flex-col items-center text-gray-300 hover:text-white transition-all active:scale-95">
          <Filter className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Filtrar</span>
        </button>
      </FilterSheet>

      {/* Botones de Navegación */}
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`flex flex-col items-center transition-all active:scale-95 ${
            currentView === item.id ? "text-white" : "text-gray-400"
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{item.label}</span>
          {currentView === item.id && (
            <div className="w-1 h-1 bg-white rounded-full mt-0.5" />
          )}
        </button>
      ))}
    </nav>
  );
}
