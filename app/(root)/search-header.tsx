"use client";

import { useState } from "react";
import { Search, Crosshair, MapPin, Clock, Flame, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const popularSearches = [
  {
    id: "weekend-fun",
    text: "Donde divertirme el fin de semana",
    category: "entretenimiento",
    subcategory: "conciertos",
  },
  {
    id: "kid-friendly",
    text: "Adonde ir con mi hijo",
    category: "entretenimiento",
    subcategory: null,
  },
  {
    id: "ceviche",
    text: "Mejor ceviche",
    category: "gastronomia",
    subcategory: "restaurantes",
  },
  {
    id: "machu-picchu",
    text: "Tours a Machu Picchu",
    category: "cultura-turismo",
    subcategory: "tours-guiados",
  },
];

const recentSearches = [
  { id: "recent-1", text: "Restaurantes cerca" },
  { id: "recent-2", text: "Parques en Lima" },
  { id: "recent-3", text: "Museos gratis" },
];

interface SearchHeaderProps {
  onPopularSearchSelect: (
    category: string | null,
    subcategory: string | null
  ) => void;
}

export function SearchHeader({ onPopularSearchSelect }: SearchHeaderProps) {
  const [selectedSearch, setSelectedSearch] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePopularSearchClick = (search: (typeof popularSearches)[0]) => {
    setSelectedSearch(search.id === selectedSearch ? null : search.id);
    onPopularSearchSelect(search.category, search.subcategory);
  };

  const handleRecentSearchClick = (search: (typeof recentSearches)[0]) => {
    console.log("Recent search clicked:", search.text);
  };

  return (
    <div className="bg-white border-b">
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-orange-500">ViVeMap</div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop Search Elements */}
          <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
              <Input
                className="pl-10 pr-4 h-9 border-none focus:ring-0 bg-gray-100 rounded-full"
                placeholder="Buscar lugar"
                type="search"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 bg-gray-100 hover:bg-orange-200 hover:text-orange-700 rounded-full px-4 transition-colors duration-200"
            >
              <Crosshair className="mr-2 h-4 w-4" />
              GPS
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 bg-gray-100 hover:bg-orange-200 hover:text-orange-700 rounded-full px-4 transition-colors duration-200"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Marcador Mapa
            </Button>
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 pr-4 h-9 border-none focus:ring-0 bg-gray-100 rounded-full"
                placeholder="¿Qué estás buscando?"
                type="search"
              />
            </div>
          </div>

          {/* Right-aligned Buttons and Avatar */}
          <div className="hidden md:flex items-center gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors duration-200">
              Publicar negocio/evento
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
              <Input
                className="pl-10 pr-4 h-9 border-none focus:ring-0 bg-gray-100 rounded-full w-full"
                placeholder="Buscar lugar"
                type="search"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 bg-gray-100 hover:bg-orange-200 hover:text-orange-700 rounded-full px-4 transition-colors duration-200 flex-1"
              >
                <Crosshair className="mr-2 h-4 w-4" />
                GPS
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 bg-gray-100 hover:bg-orange-200 hover:text-orange-700 rounded-full px-4 transition-colors duration-200 flex-1"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Marcador Mapa
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 pr-4 h-9 border-none focus:ring-0 bg-gray-100 rounded-full w-full"
                placeholder="¿Qué estás buscando?"
                type="search"
              />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors duration-200 w-full">
              Publicar negocio/evento
            </Button>
          </div>
        )}

        {/* Popular and Recent Searches */}
        <div className="space-y-2 mt-4">
          {/* Popular Searches */}
          <div className="flex items-start flex-wrap">
            <div className="flex items-center mr-4 mb-2 w-full md:w-auto">
              <Flame className="w-4 h-4 mr-2 text-orange-500" />
              <span className="font-semibold text-orange-700">Popular</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <Badge
                  key={search.id}
                  variant="outline"
                  className={`cursor-pointer whitespace-nowrap rounded-full px-4 bg-gray-100 border-none transition-colors duration-200 ${
                    selectedSearch === search.id
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "hover:bg-orange-200 hover:text-orange-700"
                  }`}
                  onClick={() => handlePopularSearchClick(search)}
                >
                  {search.text}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="flex items-start flex-wrap">
            <div className="flex items-center mr-4 mb-2 w-full md:w-auto">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span className="font-semibold text-gray-700">Reciente</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <Badge
                  key={search.id}
                  variant="outline"
                  className={`cursor-pointer whitespace-nowrap rounded-full px-4 bg-gray-100 border-none transition-colors duration-200 ${
                    selectedSearch === search.id
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "hover:bg-orange-200 hover:text-orange-700"
                  }`}
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
