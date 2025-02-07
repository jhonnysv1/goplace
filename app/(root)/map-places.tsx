"use client";

import { useState, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import type { Place } from "./types/map";

interface MapComponentProps {
  places: Place[];
  className?: string;
}

export default function MapComponent({
  places,
  className = "",
}: MapComponentProps) {
  const [popupInfo, setPopupInfo] = useState<Place | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(null);
  const [viewport, setViewport] = useState({
    latitude: -9.189967,
    longitude: -75.015152,
    zoom: 5,
  });

  useEffect(() => {
    setMapToken(process.env.NEXT_PUBLIC_MAPBOX_TOKEN || null);
  }, []);

  const handleMapError = (e: any) => {
    console.error("Map loading error:", e);
    setMapError(`Error loading map: ${e.message || "Unknown error"}`);
  };

  if (!mapToken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
        Mapbox token not found
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative ${className}`}>
      {mapError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
          {mapError}
        </div>
      ) : (
        <Map
          mapboxAccessToken={mapToken}
          initialViewState={viewport}
          onMove={(evt) => setViewport(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onError={handleMapError}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              longitude={place.location.lng}
              latitude={place.location.lat}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(place);
              }}
            >
              <MapPin className="text-red-500" />
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.location.lng}
              latitude={popupInfo.location.lat}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                <h3 className="font-bold">{popupInfo.name}</h3>
                <p className="text-sm">{popupInfo.address}</p>
              </div>
            </Popup>
          )}

          <NavigationControl position="top-right" />
          <GeolocateControl position="top-right" />
          <ScaleControl position="bottom-right" />
        </Map>
      )}
    </div>
  );
}
