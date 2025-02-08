import { useState } from "react";
import { type FilterState, type Place, getFilterSummary } from "./sharedData";
import { Edit, MapPin, Star, Info, Maximize } from "lucide-react";
import Image from "next/image";
import CleanMapView from "./CleanMapView";

interface ListViewProps {
  places: Place[];
  filters: FilterState;
  onShowMap: (place: Place) => void;
  onShowInfo: (place: Place) => void;
  onNavigateToMapView: () => void;
}

export default function ListView({
  places,
  filters,
  onShowMap,
  onShowInfo,
  onNavigateToMapView,
}: ListViewProps) {
  const [expandedPlace, setExpandedPlace] = useState<string | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedPlace(expandedPlace === id.toString() ? null : id.toString());
  };

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col bg-gray-100 pb-12">
      <div className="bg-white p-2 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2 text-gray-700">
          <Image
            src="/logohuancayo.svg"
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
        <button className="text-white text-sm flex items-center space-x-1 bg-[#a028ef] px-2 py-1 rounded-full">
          <Edit className="w-4 h-4" />
          <span>Escríbenos</span>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {places.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-lg text-gray-600">
              No se encontraron lugares con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 p-4">
            {places.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-48">
                  <Image
                    src={
                      place.photos[0] || "/placeholder.svg?height=192&width=384"
                    }
                    alt={place.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold">
                    {place.type === "event" ? "Evento" : "Permanente"}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{place.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{place.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{place.address}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {place.description}
                  </p>
                  {expandedPlace === place.id.toString() && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">
                        {place.differential}
                      </p>
                      {place.type === "event" && (
                        <p className="text-sm text-gray-700 mt-1">
                          Fecha: {(place as any).eventDetails.date}, Hora:{" "}
                          {(place as any).eventDetails.time}
                        </p>
                      )}
                      {(place.type === "business" ||
                        place.type === "public") && (
                        <p className="text-sm text-gray-700 mt-1">
                          Horario: {place.openingHours}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => toggleExpand(place.id)}
                      className="text-[#a028ef] text-sm font-semibold"
                    >
                      {expandedPlace === place.id.toString()
                        ? "Ver menos"
                        : "Ver más"}
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onShowMap(place)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Ver en mapa
                      </button>
                      <button
                        onClick={() => onShowInfo(place)}
                        className="bg-[#a028ef] text-white px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Ver información
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
