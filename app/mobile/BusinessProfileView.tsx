"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Star,
  MapPin,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Clock,
  Trophy,
  Instagram,
  Facebook,
  Phone,
  MessageCircle,
  Maximize,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Business } from "./sharedData";
import dynamic from "next/dynamic";
import CleanMapView from "./CleanMapView";

const Map = dynamic(() => import("react-map-gl"), { ssr: false });
const Source = dynamic(() => import("react-map-gl").then((mod) => mod.Source), {
  ssr: false,
});
const Layer = dynamic(() => import("react-map-gl").then((mod) => mod.Layer), {
  ssr: false,
});

interface BusinessProfileViewProps {
  place: Business;
  onClose: () => void;
  onShowFullMap: (place: Business) => void;
}

export default function BusinessProfileView({
  place,
  onClose,
  onShowFullMap,
}: BusinessProfileViewProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
              "https://source.unsplash.com/random/800x600?business"
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
                href={`https://wa.me/${place.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-full"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <nav className="px-6 mb-6">
          <ul className="flex space-x-6 border-b">
            {["info", "products", "environments", "reviews", "map"].map(
              (tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-1 py-4 font-medium transition-colors ${
                      activeTab === tab
                        ? "text-black border-b-2 border-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {tab === "info"
                      ? "Información"
                      : tab === "products"
                      ? "Productos"
                      : tab === "environments"
                      ? "Ambientes"
                      : tab === "reviews"
                      ? "Reseñas"
                      : "Mapa"}
                  </button>
                </li>
              )
            )}
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
                  ¿Qué nos hace diferentes?
                </h2>
                <p className="text-gray-700">{place.differential}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Estudios y Certificaciones
                </h2>
                <ul className="space-y-2">
                  {place.studies.map((study, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                    >
                      <GraduationCap className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{study}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Premios y Reconocimientos
                </h2>
                <ul className="space-y-2">
                  {place.awards.map((award, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                    >
                      <Trophy className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Ofertas Especiales
                </h2>
                {place.specialOffers.map((offer, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {offer.title}
                    </h3>
                    <p className="text-gray-700">{offer.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Válido hasta: {offer.validUntil}
                    </p>
                  </div>
                ))}
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
          )}
          {activeTab === "products" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Nuestros Mejores Productos/Servicios
              </h2>
              {place.bestProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md mb-6"
                >
                  <Image
                    src={
                      product.image || "/placeholder.svg?height=300&width=400"
                    }
                    alt={product.name}
                    width={400}
                    height={300}
                    objectFit="cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    {product.creationVideoUrl && (
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900">
                          Proceso de Creación
                        </h4>
                        <video
                          src={product.creationVideoUrl}
                          controls
                          className="w-full rounded-lg"
                        >
                          Tu navegador no soporta el elemento de video.
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "environments" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Nuestros Ambientes
              </h2>
              {place.environments.map((environment, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md mb-6"
                >
                  <Image
                    src={
                      environment.image ||
                      "/placeholder.svg?height=300&width=400"
                    }
                    alt={environment.name}
                    width={400}
                    height={300}
                    objectFit="cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">
                      {environment.name}
                    </h3>
                    <p className="text-gray-700">{environment.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {place.rating.toFixed(1)}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= place.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill={star <= place.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({place.comments.length} reseñas)
                </span>
              </div>
              <div className="space-y-4">
                {place.comments.map((comment, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">
                        {comment.user}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= comment.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill={
                              star <= comment.rating ? "currentColor" : "none"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Videos de Testimonios
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {place.testimonialVideos.map((video, index) => (
                    <div key={index} className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>
                  ))}
                </div>
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
