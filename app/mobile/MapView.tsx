"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { type FilterState, type Place, getFilterSummary } from "./sharedData";
import { Edit, X } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

const Map = dynamic(() => import("react-map-gl"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

const Marker = dynamic(() => import("react-map-gl").then((mod) => mod.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-map-gl").then((mod) => mod.Popup), {
  ssr: false,
});

const NavigationControl = dynamic(
  () => import("react-map-gl").then((mod) => mod.NavigationControl),
  {
    ssr: false,
  }
);

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoiamhvbm55c3YxIiwiYSI6ImNpcmk0bDFscTAyMW9meWt4OHc5MWUwMTQifQ.6rJ2scOhqZjzWjA5nZCQLQ";

interface MapViewProps {
  places: Place[];
  filters: FilterState;
}

export default function MapView({ places, filters }: MapViewProps) {
  const [viewState, setViewState] = useState({
    latitude: -12.0664,
    longitude: -75.2049,
    zoom: 13,
  });

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMapLoaded(true);
    }
  }, []);

  if (!mapLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white p-2 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2 text-gray-700">
          <Image
            src="/placeholder.svg?height=24&width=24"
            alt="Filter icon"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm truncate max-w-[200px]">
            {getFilterSummary(filters)}
          </span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-white text-sm flex items-center space-x-1 bg-[#a028ef] px-2 py-1 rounded-full">
            <Edit className="w-4 h-4" />
            <span>Escríbenos</span>
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" />
          {places.map((place) => (
            <Marker
              key={place.id}
              longitude={place.longitude}
              latitude={place.latitude}
              color="#a028ef"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedPlace(place);
              }}
            />
          ))}
          {selectedPlace && (
            <Popup
              longitude={selectedPlace.longitude}
              latitude={selectedPlace.latitude}
              anchor="bottom"
              onClose={() => setSelectedPlace(null)}
            >
              <div className="p-2">
                <h3 className="font-bold">{selectedPlace.name}</h3>
                <p className="text-sm">{selectedPlace.description}</p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}
