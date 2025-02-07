"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Compass,
  Coffee,
  Palette,
  Mountain,
  GraduationCap,
  Sparkles,
  Heart,
  Dog,
  Gamepad2,
  ShoppingBag,
  Home,
  Car,
  Search,
  Clock,
} from "lucide-react";

const categories = [
  {
    id: "eventos",
    name: "Eventos cerca",
    icon: MapPin,
    subcategories: ["Conciertos", "Festivales", "Ferias", "Deportivos"],
  },
  {
    id: "gastronomia",
    name: "Gastronomía",
    icon: Coffee,
    subcategories: ["Restaurantes", "Cafeterías", "Bares", "Comida rápida"],
  },
  {
    id: "cultura",
    name: "Cultura",
    icon: Palette,
    subcategories: ["Museos", "Galerías", "Teatros", "Cines"],
  },
  {
    id: "aventura",
    name: "Aventura",
    icon: Mountain,
    subcategories: [
      "Senderismo",
      "Camping",
      "Deportes extremos",
      "Parques de aventura",
    ],
  },
  {
    id: "educacion",
    name: "Educación",
    icon: GraduationCap,
    subcategories: ["Cursos", "Talleres", "Conferencias", "Bibliotecas"],
  },
  {
    id: "bienestar",
    name: "Bienestar",
    icon: Sparkles,
    subcategories: ["Spas", "Yoga", "Gimnasios", "Salones de belleza"],
  },
  {
    id: "salud",
    name: "Salud",
    icon: Heart,
    subcategories: [
      "Clínicas",
      "Farmacias",
      "Centros de salud",
      "Consultorios",
    ],
  },
  {
    id: "mascotas",
    name: "Mascotas",
    icon: Dog,
    subcategories: [
      "Veterinarias",
      "Tiendas de mascotas",
      "Peluquerías caninas",
      "Parques para perros",
    ],
  },
  {
    id: "entretenimiento",
    name: "Entretenimiento",
    icon: Gamepad2,
    subcategories: [
      "Parques de diversiones",
      "Boliches",
      "Karaoke",
      "Escape rooms",
    ],
  },
  {
    id: "compras",
    name: "Compras",
    icon: ShoppingBag,
    subcategories: [
      "Centros comerciales",
      "Tiendas de ropa",
      "Mercados",
      "Tiendas de electrónica",
    ],
  },
  {
    id: "hogar",
    name: "Hogar",
    icon: Home,
    subcategories: ["Muebles", "Decoración", "Jardinería", "Electrodomésticos"],
  },
  {
    id: "autos",
    name: "Autos",
    icon: Car,
    subcategories: ["Concesionarios", "Talleres", "Lavaderos", "Repuestos"],
  },
];

const popularSearches = [
  {
    name: "Qué hacer el fin de semana",
    filters: {
      timeFrame: "Fin de semana",
      category: "eventos",
      subcategories: ["Festivales", "Conciertos"],
    },
  },
  {
    name: "Adónde ir con mi hijo",
    filters: {
      category: "entretenimiento",
      subcategories: ["Parques de diversiones"],
    },
  },
];

const recentSearches = [
  {
    name: "Fiestas cerca",
    filters: { category: "eventos", subcategories: ["Festivales"] },
  },
];

interface FilterState {
  category: string | null;
  subcategories: string[];
  timeFrame: string | null;
  showEventual: boolean;
  showPermanent: boolean;
  showFreeOnly: boolean;
  showPromotions: boolean;
}

interface FilterSheetProps {
  children: React.ReactNode;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function FilterSheet({
  children,
  filters,
  setFilters,
}: FilterSheetProps) {
  const [open, setOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryId ? null : categoryId,
      subcategories: [],
    }));
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    setFilters((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(subcategory)
        ? prev.subcategories.filter((sc) => sc !== subcategory)
        : [...prev.subcategories, subcategory],
    }));
  };

  const handleTimeFrameClick = (timeFrame: string) => {
    setFilters((prev) => ({
      ...prev,
      timeFrame: prev.timeFrame === timeFrame ? null : timeFrame,
    }));
  };

  const applyFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearchClick = (searchFilters: Partial<FilterState>) => {
    applyFilters(searchFilters);
  };

  const resetFilters = () => {
    setFilters({
      category: null,
      subcategories: [],
      timeFrame: null,
      showEventual: false,
      showPermanent: false,
      showFreeOnly: false,
      showPromotions: false,
    });
  };

  useEffect(() => {
    if (!open) {
      console.log("Applying filters:", filters);
    }
  }, [open, filters]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="top"
        className="w-full h-[90vh] pt-6 px-0 flex flex-col"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 mb-4 flex flex-row items-center justify-between">
            <SheetTitle className="text-lg font-bold">Filtros</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-grow px-4 overflow-y-auto h-[calc(90vh-120px)]">
            <div className="space-y-6 pb-20">
              {/* Buscador y botón GPS */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">¿Dónde estás?</h3>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Buscar lugar"
                      className="pl-9 pr-4 py-2"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Compass className="mr-2 h-4 w-4" />
                    GPS
                  </Button>
                </div>
              </div>

              {/* Búsquedas populares */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Lo que más buscamos:</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSearchClick(search.filters)}
                    >
                      {search.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Búsquedas recientes */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Búsquedas recientes:</h3>
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleSearchClick(search.filters)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {search.name}
                  </Button>
                ))}
              </div>

              {/* Categorías y Subcategorías */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">
                  ¿Buscas algo específico?
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = filters.category === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                          isSelected
                            ? "text-[#a028ef] bg-[#a028ef]/10"
                            : "text-gray-600 hover:text-[#a028ef] hover:bg-[#a028ef]/5"
                        }`}
                      >
                        <Icon className="w-6 h-6 mb-2" />
                        <span className="text-xs text-center leading-tight">
                          {category.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {filters.category && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">
                    Subcategorías de{" "}
                    {categories.find((c) => c.id === filters.category)?.name}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categories
                      .find((c) => c.id === filters.category)
                      ?.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => handleSubcategoryToggle(subcategory)}
                          className={`text-xs p-1 rounded ${
                            filters.subcategories.includes(subcategory)
                              ? "text-[#a028ef] bg-[#a028ef]/10"
                              : "text-gray-600 hover:text-[#a028ef] hover:bg-[#a028ef]/5"
                          }`}
                        >
                          {subcategory}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Selector de tipo de lugar */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Tipo de lugar:</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="eventual"
                      className="text-sm cursor-pointer"
                    >
                      Eventuales
                    </Label>
                    <Switch
                      id="eventual"
                      checked={filters.showEventual}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          showEventual: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="permanent"
                      className="text-sm cursor-pointer"
                    >
                      Permanentes
                    </Label>
                    <Switch
                      id="permanent"
                      checked={filters.showPermanent}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          showPermanent: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Selector de tiempo para eventos */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">¿Cuándo?</h3>
                <div className="flex flex-wrap gap-2">
                  {["Hoy", "Fin de semana", "Esta semana", "Este mes"].map(
                    (timeFrame) => (
                      <Button
                        key={timeFrame}
                        variant={
                          filters.timeFrame === timeFrame
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleTimeFrameClick(timeFrame)}
                      >
                        {timeFrame}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Selector de costo */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Deseo ver:</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="free" className="text-sm cursor-pointer">
                      Gratuitos o públicos
                    </Label>
                    <Switch
                      id="free"
                      checked={filters.showFreeOnly}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          showFreeOnly: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="promotions"
                      className="text-sm cursor-pointer"
                    >
                      Ofertas y promociones
                    </Label>
                    <Switch
                      id="promotions"
                      checked={filters.showPromotions}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          showPromotions: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-white fixed bottom-0 left-0 right-0">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={resetFilters}
              >
                Resetear
              </Button>
              <SheetClose asChild>
                <Button className="flex-1 bg-[#a028ef] hover:bg-[#a028ef]/90">
                  Aplicar Filtros
                </Button>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
