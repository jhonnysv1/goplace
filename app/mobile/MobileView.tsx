"use client";

import { useState } from "react";
import ReelsView from "./ReelsView";
import ListView from "./ListView";
import MapView from "./MapView";
import BottomNav from "./BottomNav";
import { places, type FilterState, filterPlaces } from "./sharedData";
import ProfileView from "./ProfileView";
import type { Place } from "./sharedData";
import CleanMapView from "./CleanMapView";
import { X } from "lucide-react";

export default function MobileView() {
  const [currentView, setCurrentView] = useState("reels");
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    subcategories: [],
    timeFrame: null,
    showEventual: false,
    showPermanent: false,
    showFreeOnly: false,
    showPromotions: false,
  });
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showListMap, setShowListMap] = useState(false);

  const filteredPlaces = filterPlaces(places, filters);

  const handleShowFullMap = (place: Place) => {
    setSelectedPlace(place);
    setShowMap(true);
  };

  const handleShowInfo = (place: Place) => {
    setSelectedPlace(place);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedPlace(null);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedPlace(null);
  };

  const handleShowListMap = (place: Place) => {
    setSelectedPlace(place);
    setShowListMap(true);
  };

  const handleCloseListMap = () => {
    setShowListMap(false);
    setSelectedPlace(null);
  };

  const handleNavigateToMapView = () => {
    setCurrentView("map");
    setShowListMap(false);
  };

  const renderView = () => {
    switch (currentView) {
      case "reels":
        return (
          <ReelsView
            places={filteredPlaces}
            filters={filters}
            onShowFullMap={handleShowFullMap}
            onShowMap={handleShowListMap}
          />
        );
      case "list":
        return (
          <ListView
            places={filteredPlaces}
            filters={filters}
            onShowInfo={handleShowInfo}
            onShowMap={handleShowListMap}
            onNavigateToMapView={handleNavigateToMapView}
          />
        );
      case "map":
        return <MapView places={filteredPlaces} filters={filters} />;
      default:
        return (
          <ReelsView
            places={filteredPlaces}
            filters={filters}
            onShowFullMap={handleShowFullMap}
            onShowMap={handleShowListMap}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-hidden relative">
        {renderView()}
        {showListMap && selectedPlace && (
          <div className="absolute bottom-0 left-0 right-0 h-1/2 z-10">
            <CleanMapView place={selectedPlace} />
            <button
              onClick={handleNavigateToMapView}
              className="absolute bottom-4 right-4 bg-white text-gray-700 px-3 py-2 rounded-full text-sm flex items-center shadow-md"
            >
              <span className="mr-1">Ver en vista mapa</span>
            </button>
            <button
              onClick={handleCloseMap}
              className="absolute top-4 left-4 bg-white text-gray-700 p-2 rounded-full shadow-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
      <div className="flex-shrink-0">
        <BottomNav
          currentView={currentView}
          setCurrentView={setCurrentView}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      {showProfile && selectedPlace && (
        <ProfileView
          place={selectedPlace}
          onClose={handleCloseProfile}
          onShowFullMap={handleShowFullMap}
        />
      )}
      {showMap && selectedPlace && (
        <div className="absolute inset-0 z-20">
          <CleanMapView place={selectedPlace} />
          <button
            onClick={handleCloseMap}
            className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-full shadow-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
