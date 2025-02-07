"use client";

import React, { useState } from "react";
import { SearchHeader } from "./search-header";
import { CategoryFilters } from "./category-filters";
import { Filters } from "./filters";
import { PlacesList } from "./places-list";
import { Place } from "./types/map";
import dynamic from "next/dynamic";
import { ViewToggle } from "./view-toggle";
import { Footer } from "./footer";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("./map-places"), { ssr: false });

// Sample data - replace with your actual data
const samplePlaces: Place[] = [
  {
    id: "1",
    name: "Restaurante Familiar El Sabor",
    description: "Comida casera en un ambiente acogedor",
    category: "gastronomia",
    subcategory: "restaurantes",
    type: "Negocio",
    temporality: "Permanente",
    cost: "Económico",
    publicTarget: "Familiar",
    location: { lat: -12.0464, lng: -77.0428 },
    address: "Av. La Mar 1337, Miraflores",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["Pet Friendly", "Área de juegos para niños", "Menú vegetariano"],
    openingHours: "Lun-Dom: 11:00-22:00",
  },
  {
    id: "2",
    name: "Festival de Música Independiente",
    description: "Tres días de música en vivo con artistas locales",
    category: "entretenimiento",
    subcategory: "conciertos",
    type: "Evento temporal",
    temporality: "Evento con fecha",
    cost: "Premium",
    publicTarget: "Individual",
    location: { lat: -12.1219, lng: -77.0299 },
    address: "Parque de la Exposición, Lima",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljJTIwZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
    tags: ["Música en vivo", "Food trucks", "Zona VIP"],
    eventDateTime: "15-17 Jul, 2023 • 16:00-23:00",
  },
  {
    id: "3",
    name: "Parque Zonal Huáscar",
    description: "Amplio parque con diversas actividades recreativas",
    category: "aventura-naturaleza",
    subcategory: "parques",
    type: "Lugar público",
    temporality: "Permanente",
    cost: "Gratuito",
    publicTarget: "Familiar",
    location: { lat: -12.0214, lng: -76.9282 },
    address: "Av. 200 Millas, Villa El Salvador",
    image:
      "https://images.unsplash.com/photo-1584285405429-136bf988919c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFya3xlbnwwfHwwfHx8MA%3D%3D",
    tags: ["Laguna artificial", "Ciclovía", "Canchas deportivas"],
    openingHours: "Lun-Dom: 06:00-18:00",
  },
  {
    id: "4",
    name: "Feria Gastronómica Mistura",
    description: "La feria gastronómica más grande de Latinoamérica",
    category: "gastronomia",
    subcategory: "ferias-gastronomicas",
    type: "Evento temporal",
    temporality: "Evento con fecha",
    cost: "Moderado",
    publicTarget: "Familiar",
    location: { lat: -12.1328, lng: -77.0217 },
    address: "Costa Verde, Magdalena del Mar",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGZlc3RpdmFsfGVufDB8fDB8fHww",
    tags: ["Comida peruana", "Chefs internacionales", "Puestos de comida"],
    eventDateTime: "05-15 Sep, 2023 • 11:00-22:00",
  },
  {
    id: "5",
    name: "Discoteca Bizarro",
    description: "Club nocturno con música alternativa y rock",
    category: "entretenimiento",
    subcategory: "discotecas",
    type: "Negocio",
    temporality: "Permanente",
    cost: "Moderado",
    publicTarget: "Jóvenes",
    location: { lat: -12.1328, lng: -77.0217 },
    address: "Av. Larco 1000, Miraflores",
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHRjbHVifGVufDB8fDB8fHww",
    tags: ["Música en vivo", "Pista de baile", "Bar"],
    openingHours: "Jue-Sáb: 23:00-05:00",
  },
];

export default function DesktopView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [view, setView] = useState<"list" | "map">("list");

  const handlePopularSearchSelect = (
    category: string | null,
    subcategory: string | null
  ) => {
    setSelectedCategory(category);
    setSelectedSubcategories(subcategory ? [subcategory] : []);
  };

  return (
    <main className="h-screen flex flex-col">
      <SearchHeader onPopularSearchSelect={handlePopularSearchSelect} />
      <CategoryFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategories={selectedSubcategories}
        setSelectedSubcategories={setSelectedSubcategories}
      />
      <Filters />
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div
          className={`w-full md:w-4/6 flex-grow md:flex-grow-0 ${
            view === "map" ? "hidden md:block" : ""
          }`}
        >
          <PlacesList places={samplePlaces} />
        </div>
        <div
          className={`w-full md:w-2/6 h-[calc(100vh-64px)] md:h-full ${
            view === "list" ? "hidden md:block" : ""
          }`}
        >
          <MapComponent places={samplePlaces} />
        </div>
      </div>
      <ViewToggle view={view} setView={setView} />
      <Footer />
    </main>
  );
}
