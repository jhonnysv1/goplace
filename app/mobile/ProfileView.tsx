"use client";

import type { Place } from "./sharedData";
import BusinessProfileView from "./BusinessProfileView";
import EventProfileView from "./EventProfileView";
import PublicPlaceProfileView from "./PublicPlaceProfileView";

interface ProfileViewProps {
  place: Place;
  onClose: () => void;
  onShowFullMap: (place: Place) => void;
}

export default function ProfileView({
  place,
  onClose,
  onShowFullMap,
}: ProfileViewProps) {
  switch (place.type) {
    case "business":
      return (
        <BusinessProfileView
          place={place}
          onClose={onClose}
          onShowFullMap={onShowFullMap}
        />
      );
    case "event":
      return (
        <EventProfileView
          place={place}
          onClose={onClose}
          onShowFullMap={onShowFullMap}
        />
      );
    case "public":
      return (
        <PublicPlaceProfileView
          place={place}
          onClose={onClose}
          onShowFullMap={onShowFullMap}
        />
      );
    default:
      return null;
  }
}
