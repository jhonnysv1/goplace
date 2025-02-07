"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Ticket,
  Instagram,
  Facebook,
  Phone,
  Maximize,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Event } from "./sharedData";
import dynamic from "next/dynamic";
import CleanMapView from "./CleanMapView";

const Map = dynamic(() => import("react-map-gl"), { ssr: false });
const Source = dynamic(() => import("react-map-gl").then((mod) => mod.Source), {
  ssr: false,
});
const Layer = dynamic(() => import("react-map-gl").then((mod) => mod.Layer), {
  ssr: false,
});

interface EventProfileViewProps {
  place: Event;
  onClose: () => void;
  onShowFullMap: (place: Event) => void;
}

export default function EventProfileView({
  place,
  onClose,
  onShowFullMap,
}: EventProfileViewProps) {
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
              "https://source.unsplash.com/random/800x600?event"
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
                href={`tel:${place.organizer}`}
                className="flex-1 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar
              </a>
              <a
                href={place.ticketInfo.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-full"
              >
                <Ticket className="w-5 h-5 mr-2" />
                Comprar Entradas
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
                  Detalles del Evento
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>Fecha: {place.eventDetails.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>Hora: {place.eventDetails.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>Duración: {place.eventDetails.duration}</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Lineup
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {place.eventDetails.lineup?.map((artist, index) => (
                    <li key={index}>{artist}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Programa
                </h2>
                <ul className="space-y-2">
                  {place.eventDetails.schedule?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                    >
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">
                        {item.time} - {item.activity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Entradas
                </h2>
                <p className="text-gray-700 mb-2">
                  Precio: {place.ticketInfo.price}
                </p>
                <p className="text-gray-700 mb-2">
                  Entradas disponibles: {place.ticketInfo.availableTickets}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Organizador
                </h2>
                <p className="text-gray-700">{place.organizer}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Patrocinadores
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {place.sponsors.map((sponsor, index) => (
                    <li key={index}>{sponsor}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  ¿Qué hace único a este evento?
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
