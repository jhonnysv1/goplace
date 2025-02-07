import { useState } from "react";
import { Check, DollarSign, Calendar, MapPin, Tag, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const filters = [
  {
    name: "Precio",
    icon: DollarSign,
    options: ["Gratis", "Económico", "Moderado", "Exclusivo"],
  },
  {
    name: "Fecha",
    icon: Calendar,
    options: ["Hoy", "Mañana", "Este fin de semana", "Esta semana", "Este mes"],
  },
  {
    name: "Tipo",
    icon: Tag,
    options: ["Eventos", "Lugares", "Ofertas"],
  },
  {
    name: "Cercanía",
    icon: MapPin,
    options: ["1 km", "5 km", "10 km", "20 km"],
  },
];

export function Filters() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleFilter = (filterName: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[filterName] || [];
      return {
        ...prev,
        [filterName]: current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option],
      };
    });
  };

  const totalSelectedFilters = Object.values(selectedFilters).flat().length;

  const renderFilterContent = () => (
    <>
      {filters.map((filter) => (
        <div key={filter.name} className="mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <filter.icon className="w-4 h-4 mr-2" />
            {filter.name}
          </h3>
          <div className="space-y-2">
            {filter.options.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded cursor-pointer text-sm"
                onClick={() => toggleFilter(filter.name, option)}
              >
                <div
                  className={cn(
                    "w-4 h-4 border rounded-sm flex items-center justify-center",
                    selectedFilters[filter.name]?.includes(option)
                      ? "bg-orange-500 border-orange-500"
                      : "border-gray-300"
                  )}
                >
                  {selectedFilters[filter.name]?.includes(option) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-white p-2 border-b flex items-start justify-start space-x-1">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
              {totalSelectedFilters > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-4 px-1 text-[10px]"
                >
                  {totalSelectedFilters}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Ajusta los filtros para encontrar lo que buscas
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">{renderFilterContent()}</div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex space-x-2">
        {filters.map((filter) => (
          <Popover key={filter.name}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                <filter.icon className="mr-1 h-3 w-3" />
                {filter.name}
                {selectedFilters[filter.name]?.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 px-1 text-[10px]"
                  >
                    {selectedFilters[filter.name].length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <div className="p-2">
                {filter.options.map((option) => (
                  <div
                    key={option}
                    className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded cursor-pointer text-xs"
                    onClick={() => toggleFilter(filter.name, option)}
                  >
                    <div
                      className={cn(
                        "w-3 h-3 border rounded-sm flex items-center justify-center",
                        selectedFilters[filter.name]?.includes(option)
                          ? "bg-orange-500 border-orange-500"
                          : "border-gray-300"
                      )}
                    >
                      {selectedFilters[filter.name]?.includes(option) && (
                        <Check className="h-2 w-2 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
