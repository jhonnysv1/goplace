import { PlaceCard } from "./place-card";
import type { Place } from "./types/map";

interface PlacesListProps {
  places: Place[];
}

export function PlacesList({ places }: PlacesListProps) {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
