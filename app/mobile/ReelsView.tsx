"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Share,
  MapPin,
  Clock,
  Filter,
  Calendar,
  Footprints,
  Edit,
  Play,
  User,
  Map,
  Info,
  BookOpen,
} from "lucide-react";
import { type FilterState, type Place, getFilterSummary } from "./sharedData";
import ProfileView from "./ProfileView";
import Image from "next/image";

interface ReelsViewProps {
  places: Place[];
  filters: FilterState;
  onShowFullMap: (place: Place) => void;
  onShowMap: (place: Place) => void;
}

export default function ReelsView({
  places,
  filters,
  onShowFullMap,
  onShowMap,
}: ReelsViewProps) {
  const [currentReel, setCurrentReel] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, places.length);
  }, [places]);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentReel];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo
          .play()
          .catch((error) => console.error("Error playing video:", error));
      } else {
        currentVideo.pause();
      }
    }
  }, [currentReel, isPlaying]);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentReel];
    if (currentVideo) {
      const updateProgress = () => {
        setProgress((currentVideo.currentTime / currentVideo.duration) * 100);
      };
      currentVideo.addEventListener("timeupdate", updateProgress);
      return () => {
        currentVideo.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [currentReel]);

  useEffect(() => {
    setTimeout(() => {
      setIsPlaying(false); // Asegura que el botón Play se muestre en la primera carga
    }, 500);
  }, []);

  const nextReel = () => {
    setDirection(1);
    setCurrentReel((prev) => (prev + 1) % places.length);
  };

  const prevReel = () => {
    setDirection(-1);
    setCurrentReel((prev) => (prev - 1 + places.length) % places.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentVideo = videoRefs.current[currentReel];
    if (currentVideo) {
      const newTime =
        (Number.parseFloat(e.target.value) / 100) * currentVideo.duration;
      currentVideo.currentTime = newTime;
    }
  };

  const handleVideoClick = () => {
    console.log("Video clicked");
    const currentVideo = videoRefs.current[currentReel];

    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        y: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        y: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (places.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">
          No se encontraron lugares con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col relative bg-black overflow-hidden pb-12">
      <AnimatePresence>
        {showProfile && (
          <ProfileView
            place={places[currentReel]}
            onClose={() => setShowProfile(false)}
            onShowFullMap={onShowFullMap}
          />
        )}
      </AnimatePresence>
      <div className="flex-grow relative">
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 p-2 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-white">
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
            <span className="text-xs text-gray-300">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <button className="text-white text-sm flex items-center space-x-1 bg-[#a028ef] px-2 py-1 rounded-full">
            <Edit className="w-4 h-4" />
            <span>Escríbenos</span>
          </button>
        </div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentReel}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y);
              if (swipe < -swipeConfidenceThreshold) {
                nextReel();
              } else if (swipe > swipeConfidenceThreshold) {
                prevReel();
              }
            }}
            className="absolute inset-0 w-full h-full pointer-events-none" // Bloquea clics en contenedor
          >
            <video
              ref={(el) => {
                videoRefs.current[currentReel] = el;
              }}
              src={places[currentReel].videoUrl}
              className="w-full h-full object-cover pointer-events-auto" // Permite clics en el video
              loop
              playsInline
              onClick={handleVideoClick} // Se pausa/reproduce al hacer clic
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 flex flex-col justify-center items-center">
              {!isPlaying && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
               flex items-center justify-center
               w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm
               transition-transform duration-200 hover:scale-110 active:scale-95
               shadow-lg z-50"
                >
                  <Play className="w-14 h-14 text-white/90" />
                </button>
              )}
              <div className="absolute bottom-2 left-4 right-4 flex justify-between items-end">
                <div className="flex-grow bg-black/30 p-3 rounded-lg relative">
                  <div className="absolute bottom-[calc(100%+0.5rem)] right-0 flex flex-col space-y-2">
                    <button className="text-white bg-black/50 p-2 rounded-full">
                      <Footprints className="w-6 h-6" /> Go
                    </button>
                    <button className="text-white bg-black/50 p-2 rounded-full">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button className="text-white bg-black/50 p-2 rounded-full">
                      <Share className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={places[currentReel].logoUrl || "/placeholder.svg"}
                      alt={`Logo de ${places[currentReel].name}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-white font-semibold flex-grow">
                      {places[currentReel].name}
                    </span>

                    {/* Botón "Ver perfil" con icono de usuario */}
                    <button
                      className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 pointer-events-auto"
                      onClick={(event) => {
                        event.stopPropagation(); // Detiene la propagación para que no afecte al video
                        setShowProfile(true);
                      }}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Info. completa</span>
                    </button>

                    {/* Nuevo botón "Ver en mapa" con icono de mapa */}
                    <button
                      className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 pointer-events-auto"
                      onClick={(event) => {
                        event.stopPropagation(); // Detiene la propagación para que no afecte al video
                        console.log("Ver en mapa clicked");
                        onShowMap(places[currentReel]);
                      }}
                    >
                      <Map className="w-4 h-4" />
                      <span>Ver en mapa</span>
                    </button>
                  </div>
                  <p className="text-white text-sm mb-2">
                    {places[currentReel].description}
                  </p>
                  <div className="flex items-center text-white text-xs mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{places[currentReel].address}</span>
                  </div>
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs mr-2 ${
                          places[currentReel].type === "event"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {places[currentReel].type === "event"
                          ? "Evento"
                          : "Permanente"}
                      </span>
                      {places[currentReel].type === "event" ? (
                        <>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>
                            {formatEventDate(places[currentReel].eventDate!)}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{places[currentReel].openingHours}</span>
                        </>
                      )}
                    </div>
                    {places[currentReel].isFree && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        Gratis
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
          <ChevronUp
            className="w-8 h-8 text-white cursor-pointer pointer-events-auto"
            onClick={prevReel}
          />
          <ChevronDown
            className="w-8 h-8 text-white cursor-pointer pointer-events-auto"
            onClick={nextReel}
          />
        </div>
      </div>
    </div>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
