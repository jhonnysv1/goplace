import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-2 md:mb-0">
            <span className="font-semibold">ViVeMap</span> - Descubre y explora
            los mejores lugares y eventos en tu ciudad.
          </div>
          <div className="w-full md:w-auto mb-2 md:mb-0">
            <a href="#" className="hover:text-orange-500 mr-4">
              Inicio
            </a>
            <a href="#" className="hover:text-orange-500 mr-4">
              Explorar
            </a>
            <a href="#" className="hover:text-orange-500 mr-4">
              Eventos
            </a>
            <a href="#" className="hover:text-orange-500">
              Contacto
            </a>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end space-x-4">
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <Facebook size={16} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <Instagram size={16} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
