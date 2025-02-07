import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Calendar } from "lucide-react";

interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  type: string;
  temporality: string;
  cost: string;
  publicTarget: string;
  location: { lat: number; lng: number };
  address: string;
  image: string;
  tags: string[];
  openingHours?: string;
  eventDateTime?: string;
}

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const getTypeTag = () => {
    switch (place.type) {
      case "Negocio":
        return <Badge className="bg-green-500 text-white">Negocio</Badge>;
      case "Evento temporal":
        return <Badge className="bg-red-500 text-white">Evento</Badge>;
      case "Lugar público":
        return <Badge className="bg-orange-500 text-white">Público</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <Image
          src={place.image || "/placeholder.svg"}
          alt={place.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{place.name}</CardTitle>
          {getTypeTag()}
        </div>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {place.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{place.address}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            <Users className="w-3 h-3 mr-1" />
            {place.publicTarget}
          </Badge>
          {place.type === "Evento temporal" ? (
            <Badge variant="secondary" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {place.eventDateTime}
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {place.openingHours}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {place.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          {place.category} • {place.temporality} • {place.cost}
        </div>
      </CardContent>
    </Card>
  );
}
