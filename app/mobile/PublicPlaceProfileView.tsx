"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sun,
  Coffee,
  AlertTriangle,
  Instagram,
  Facebook,
  Phone,
  Maximize,
} from "lucide-react";
import { motion } from "framer-motion";
import type { PublicPlace } from "./sharedData";
import dynamic from "next/dynamic";
import CleanMapView from "./CleanMapView";

const Map = dynamic(() => import("react-map-gl"), { ssr: false });
const Source = dynamic(() => import("react-map-gl").then((mod) => mod.Source), {
  ssr: false,
});
const Layer = dynamic(() => import("react-map-gl").then((mod) => mod.Layer), {
  ssr: false,
});

interface PublicPlaceProfileViewProps {
  place: PublicPlace;
  onClose: () => void;
  onShowFullMap: (place: PublicPlace) => void;
}

export default function PublicPlaceProfileView({
  place,
  onClose,
  onShowFullMap,
}: PublicPlaceProfileViewProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("info");

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % place.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + place.photos.length) % place.photos.length
    );
  };

  const polygonCoordinates = [
    [place.longitude - 0.001, place.latitude - 0.001],
    [place.longitude + 0.001, place.latitude - 0.001],
    [place.longitude + 0.001, place.latitude + 0.001],
    [place.longitude - 0.001, place.latitude + 0.001],
    [place.longitude - 0.001, place.latitude - 0.001],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md"
          aria-label="Cerrar perfil"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        <div className="h-72 relative">
          <Image
            src={
              place.photos[currentPhotoIndex] ||
              "https://source.unsplash.com/random/800x600?public-place"
            }
            alt={place.name}
            layout="fill"
            objectFit="cover"
          />
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            aria-label="Siguiente foto"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {place.name}
          </h1>
          <p className="text-gray-600 mb-4">{place.description}</p>
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            <MapPin className="w-5 h-5" />
            <span>{place.address}</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              ¿Tienes alguna duda?
            </h2>
            <div className="flex space-x-4">
              <a
                href={`tel:${place.phone}`}
                className="flex-1 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-full"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Cómo llegar
              </a>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Redes Sociales
            </h2>
            <div className="flex space-x-4">
              {place.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white p-2 rounded-full ${
                    social.platform === "Instagram"
                      ? "bg-[#E1306C]"
                      : "bg-[#1877F2]"
                  }`}
                >
                  {social.platform === "Instagram" ? (
                    <Instagram className="w-6 h-6" />
                  ) : (
                    <Facebook className="w-6 h-6" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        <nav className="px-6 mb-6">
          <ul className="flex space-x-6 border-b">
            {["info", "map"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-1 py-4 font-medium transition-colors ${
                    activeTab === tab
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab === "info" ? "Información" : "Mapa"}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 pb-6">
          {activeTab === "info" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Horario
                </h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{place.openingHours}</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Mejor momento para visitar
                </h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Sun className="w-5 h-5" />
                  <span>{place.publicPlaceInfo.bestTimeToVisit}</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Instalaciones
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {place.publicPlaceInfo.facilities.map((facility, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Coffee className="w-4 h-4" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Restricciones
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {place.publicPlaceInfo.restrictions.map(
                    (restriction, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>{restriction}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Información de Accesibilidad
                </h2>
                <p className="text-gray-700">
                  {place.publicPlaceInfo.accessibilityInfo}
                </p>
              </div>
              {place.publicPlaceInfo.guidedTours && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    Tours Guiados
                  </h2>
                  {place.publicPlaceInfo.guidedTours.map((tour, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg mb-2"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {tour.name}
                      </h3>
                      <p className="text-gray-700">{tour.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Duración: {tour.duration}
                      </p>
                      <p className="text-sm text-gray-500">
                        Precio: {tour.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Horario: {tour.schedule}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {place.historicalInfo && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    Información Histórica
                  </h2>
                  <p className="text-gray-700">{place.historicalInfo}</p>
                </div>
              )}
              {place.culturalSignificance && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    Significado Cultural
                  </h2>
                  <p className="text-gray-700">{place.culturalSignificance}</p>
                </div>
              )}
              {place.nearbyAttractions && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    Atracciones Cercanas
                  </h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {place.nearbyAttractions.map((attraction, index) => (
                      <li key={index}>{attraction}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  ¿Qué hace único a este lugar?
                </h2>
                <p className="text-gray-700">{place.differential}</p>
              </div>
            </div>
          )}
          {activeTab === "map" && (
            <div className="space-y-4">
              <div className="h-[300px] relative">
                <CleanMapView place={place} />
                <button
                  onClick={() => onShowFullMap(place)}
                  className="absolute bottom-4 right-4 bg-white text-gray-700 px-3 py-2 rounded-full text-sm flex items-center shadow-md"
                >
                  <Maximize className="w-4 h-4 mr-1" />
                  Ver mapa completo
                </button>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Ver en Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
