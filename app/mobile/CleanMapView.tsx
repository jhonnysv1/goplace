"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Place } from "./sharedData";
import "mapbox-gl/dist/mapbox-gl.css";
import { X } from "lucide-react";

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

interface CleanMapViewProps {
  place: Place;
  onClose?: () => void;
}

export default function CleanMapView({ place, onClose }: CleanMapViewProps) {
  const [viewState, setViewState] = useState({
    latitude: place.latitude,
    longitude: place.longitude,
    zoom: 15,
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
    <div className="w-full h-full relative">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
        <Marker
          longitude={place.longitude}
          latitude={place.latitude}
          color="#a028ef"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedPlace(place);
          }}
        />
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
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md"
          aria-label="Cerrar mapa"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
}
