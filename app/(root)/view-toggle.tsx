import { List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  view: "list" | "map";
  setView: (view: "list" | "map") => void;
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-full shadow-lg md:hidden">
      <div className="flex">
        <Button
          variant={view === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("list")}
          className="rounded-l-full"
        >
          <List className="w-4 h-4 mr-2" />
          Lista
        </Button>
        <Button
          variant={view === "map" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("map")}
          className="rounded-r-full"
        >
          <Map className="w-4 h-4 mr-2" />
          Mapa
        </Button>
      </div>
    </div>
  );
}
