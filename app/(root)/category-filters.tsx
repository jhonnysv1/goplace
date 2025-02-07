"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { categories, specialCategory } from "./data/categories";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Category, Subcategory } from "./types/map";

interface CategoryFiltersProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSubcategories: string[];
  setSelectedSubcategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export function CategoryFilters({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategories,
  setSelectedSubcategories,
}: CategoryFiltersProps) {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setSelectedSubcategories([]);
  };

  const selectedCategoryData: Category | undefined =
    selectedCategory === specialCategory.id
      ? specialCategory
      : categories.find((cat) => cat.id === selectedCategory);

  const scroll = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      categoriesRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (categoriesRef.current) {
        const { scrollLeft } = categoriesRef.current;
        setCanScrollLeft(scrollLeft > 0);
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const element = categoriesRef.current;
    if (element) {
      element.addEventListener("scroll", checkScroll);
    }

    window.addEventListener("resize", checkMobile);
    checkMobile();

    return () => {
      if (element) {
        element.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const renderCategories = () => (
    <>
      {/* Special "Eventos cerca de mí" button */}
      <Button
        variant="ghost"
        className={cn(
          "flex-shrink-0 h-16 px-4 mr-4 hover:bg-gray-100 text-gray-700 hover:text-gray-800 rounded-none transition-all duration-200",
          selectedCategory === specialCategory.id
            ? "bg-gray-200 hover:bg-gray-300 text-black border-b-2 border-black"
            : "border-b-2 border-transparent"
        )}
        onClick={() => handleCategoryClick(specialCategory.id)}
      >
        <div className="flex flex-col items-center">
          <MapPin className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium leading-tight text-center">
            {specialCategory.name}
          </span>
        </div>
      </Button>

      {/* Regular category buttons */}
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className={cn(
            "flex-shrink-0 h-16 px-4 rounded-none transition-all duration-200",
            "hover:bg-transparent hover:text-gray-700",
            selectedCategory === category.id
              ? "text-black border-b-2 border-black"
              : "text-gray-500 border-b-2 border-transparent"
          )}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className="flex flex-col items-center">
            <span className="text-lg mb-1">{category.icon}</span>
            <span className="text-xs font-medium leading-tight text-center">
              {category.name}
            </span>
          </div>
        </Button>
      ))}
    </>
  );

  return (
    <div className="p-2 relative">
      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name ||
                  specialCategory.name
                : "Seleccionar categoría"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem
              onSelect={() => handleCategoryClick(specialCategory.id)}
            >
              <MapPin className="mr-2 h-4 w-4" />
              <span>{specialCategory.name}</span>
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onSelect={() => handleCategoryClick(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="w-full relative">
          <motion.button
            initial={false}
            animate={{ opacity: canScrollLeft ? 1 : 0 }}
            className={cn(
              "absolute left-0 top-1/2 transform -translate-y-1/2 z-10",
              "w-8 h-8 flex items-center justify-center",
              "text-gray-400 hover:text-gray-600 transition-colors",
              !canScrollLeft && "pointer-events-none"
            )}
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          <div
            ref={categoriesRef}
            className="flex items-center overflow-hidden py-1 mb-2 scroll-smooth w-full px-8"
            onScroll={() => {
              if (categoriesRef.current) {
                const { scrollLeft } = categoriesRef.current;
                setCanScrollLeft(scrollLeft > 0);
              }
            }}
          >
            {renderCategories()}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: selectedCategoryData ? 1 : 0,
          y: selectedCategoryData ? 0 : -10,
        }}
        className="space-y-2 mt-2"
      >
        {selectedCategoryData && (
          <div className="flex flex-wrap gap-2">
            {selectedCategoryData.subcategories.map(
              (subcategory: Subcategory) => (
                <motion.div
                  key={subcategory.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full py-1 px-4 h-auto text-xs border-gray-300",
                      "hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300 transition-colors duration-200",
                      selectedSubcategories.includes(subcategory.id)
                        ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:text-white hover:border-orange-600"
                        : "bg-white text-gray-700"
                    )}
                    onClick={() =>
                      setSelectedSubcategories((prev: string[]) =>
                        prev.includes(subcategory.id)
                          ? prev.filter((id) => id !== subcategory.id)
                          : [...prev, subcategory.id]
                      )
                    }
                  >
                    {subcategory.name}
                  </Button>
                </motion.div>
              )
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
