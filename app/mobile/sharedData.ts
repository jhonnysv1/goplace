// Interfaces base
interface BasePlace {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  videoUrl: string;
  logoUrl: string;
  category: string;
  subcategory: string;
  isFree: boolean;
  photos: string[];
  differential: string;
  rating: number;
  comments: Comment[];
  socialMedia: SocialMedia[];
}

interface Comment {
  user: string;
  comment: string;
  rating: number;
}

interface SocialMedia {
  platform: string;
  url: string;
}

// Interface para negocios
export interface Business extends BasePlace {
  type: "business";
  openingHours: string;
  studies: string[];
  bestProducts: Product[];
  testimonialVideos: string[];
  environments: Environment[];
  awards: string[];
  specialOffers: SpecialOffer[];
  phone: string;
  whatsapp: string;
}

interface Product {
  name: string;
  image: string;
  description: string;
  creationVideoUrl?: string;
}

interface Environment {
  name: string;
  description: string;
  image: string;
}

interface SpecialOffer {
  title: string;
  description: string;
  validUntil: string;
}

// Interface para eventos
export interface Event extends BasePlace {
  type: "event";
  eventDate: string;
  ticketInfo: TicketInfo;
  eventDetails: EventDetails;
  organizer: string;
  sponsors: string[];
}

interface TicketInfo {
  price: string;
  buyUrl: string;
  availableTickets?: number;
}

interface EventDetails {
  date: string;
  time: string;
  duration: string;
  lineup?: string[];
  schedule?: EventSchedule[];
}

interface EventSchedule {
  time: string;
  activity: string;
}

// Interface para lugares públicos
export interface PublicPlace extends BasePlace {
  type: "public";
  openingHours: string;
  publicPlaceInfo: PublicPlaceInfo;
  historicalInfo?: string;
  culturalSignificance?: string;
  nearbyAttractions?: string[];
  phone?: string;
}

interface PublicPlaceInfo {
  bestTimeToVisit: string;
  facilities: string[];
  restrictions: string[];
  accessibilityInfo: string;
  guidedTours?: GuidedTour[];
}

interface GuidedTour {
  name: string;
  description: string;
  duration: string;
  price: string;
  schedule: string;
}

// Tipo unión para todos los lugares
export type Place = Business | Event | PublicPlace;

// Función para determinar el tipo de lugar
export function getPlaceType(place: Place): "business" | "event" | "public" {
  return place.type;
}

// Datos de ejemplo
export const places: Place[] = [
  {
    id: 1,
    name: "Café Delicioso",
    description: "¡Prueba nuestro nuevo café de temporada! #café #desayuno",
    address: "Calle Principal 123, Huancayo",
    latitude: -12.0664,
    longitude: -75.2049,
    videoUrl: "/restaurant.mp4",
    logoUrl: "/logo.jpg",
    type: "business",
    category: "gastronomia",
    subcategory: "Cafeterías",
    isFree: false,
    openingHours:
      "Lunes a Sábado: 7:00 AM - 8:00 PM, Domingo: 8:00 AM - 6:00 PM",
    photos: ["/restaurant/cafeteria1.jpg", "/restaurant/cafeteria2.avif"],
    differential:
      "Nuestro café es cultivado localmente y tostado en el sitio para garantizar la máxima frescura.",
    studies: [
      "Certificación en Barismo Avanzado",
      "Curso de Cata de Café Especialidad",
    ],
    bestProducts: [
      {
        name: "Café de especialidad",
        image: "/restaurant/cafe1.jpg",
        description:
          "Nuestro café de especialidad es cultivado en las alturas de los Andes y tostado diariamente para garantizar el mejor sabor.",
        creationVideoUrl: "/videos/proceso-cafe-especialidad.mp4",
      },
      {
        name: "Pasteles artesanales",
        image: "/restaurant/cafe2.jpg",
        description:
          "Deliciosos pasteles hechos a mano con ingredientes locales y recetas tradicionales.",
        creationVideoUrl: "/videos/proceso-pasteles-artesanales.mp4",
      },
      {
        name: "Desayunos gourmet",
        image: "/images/desayunos-gourmet.jpg",
        description:
          "Una experiencia culinaria única que combina sabores locales con técnicas internacionales.",
      },
    ],
    rating: 4.8,
    comments: [
      { user: "María L.", comment: "¡El mejor café de la ciudad!", rating: 5 },
      { user: "Juan P.", comment: "Excelente ambiente y servicio.", rating: 4 },
    ],
    testimonialVideos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ],
    environments: [
      {
        name: "Terraza al aire libre",
        description:
          "Disfruta de tu café en nuestra hermosa terraza con vista a la ciudad.",
        image: "/images/terraza-cafe-delicioso.jpg",
      },
      {
        name: "Sala de estudio",
        description:
          "Espacio tranquilo y acogedor perfecto para trabajar o estudiar.",
        image: "/images/sala-estudio-cafe-delicioso.jpg",
      },
    ],
    awards: [
      "Mejor Café de la Ciudad 2022",
      "Premio a la Innovación Gastronómica 2021",
    ],
    specialOffers: [
      {
        title: "Happy Hour Café",
        description:
          "Todos los días de 3pm a 5pm, 2x1 en cafés de especialidad.",
        validUntil: "2023-12-31",
      },
    ],
    socialMedia: [
      { platform: "Instagram", url: "https://www.instagram.com/cafedelicioso" },
      { platform: "Facebook", url: "https://www.facebook.com/cafedelicioso" },
    ],
    phone: "+51 123 456 789",
    whatsapp: "+51 987 654 321",
  },
  {
    id: 2,
    name: "Concierto en el Parque",
    description:
      "Gran concierto al aire libre este fin de semana. ¡No te lo pierdas! #música #evento",
    address: "Parque Central, Huancayo",
    latitude: -12.07,
    longitude: -75.21,
    videoUrl: "/festival.mp4",
    logoUrl: "/logo.jpg",
    type: "event",
    category: "eventos",
    subcategory: "Conciertos",
    isFree: false,
    photos: ["/concierto.png", "/images/concierto-2.jpg"],
    differential:
      "Un evento único que reúne a los mejores artistas locales en un entorno natural incomparable.",
    rating: 0,
    comments: [],
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/conciertoparque",
      },
      { platform: "Facebook", url: "https://www.facebook.com/conciertoparque" },
    ],
    eventDate: "2023-08-15",
    ticketInfo: {
      price: "Desde S/. 50",
      buyUrl: "https://www.ticketmaster.com/concierto-parque",
      availableTickets: 1000,
    },
    eventDetails: {
      date: "2023-08-15",
      time: "18:00",
      duration: "6 horas",
      lineup: ["Artista 1", "Artista 2", "Artista 3"],
      schedule: [
        { time: "18:00", activity: "Apertura de puertas" },
        { time: "19:00", activity: "DJ local" },
        { time: "20:00", activity: "Artista 1" },
        { time: "21:30", activity: "Artista 2" },
        { time: "23:00", activity: "Artista 3" },
      ],
    },
    organizer: "Productora Musical XYZ",
    sponsors: ["Marca de Bebidas ABC", "Tienda de Música 123"],
  },
  {
    id: 3,
    name: "Mirador de la Ciudad",
    description:
      "Disfruta de las mejores vistas de la ciudad. ¡Un lugar imperdible! #turismo #vistas",
    address: "Cerro de la Libertad, Huancayo",
    latitude: -12.06,
    longitude: -75.2,
    videoUrl: "/mirador.mp4",
    logoUrl: "/logo.jpg",
    type: "public",
    category: "cultura",
    subcategory: "Miradores",
    isFree: true,
    openingHours: "Abierto: 24 horas",
    photos: ["/mirador.jpg", "/images/mirador-2.jpg", "/images/mirador-3.jpg"],
    differential:
      "El punto más alto de la ciudad con vistas panorámicas de 360 grados.",
    rating: 4.5,
    comments: [
      {
        user: "Ana R.",
        comment: "Vistas impresionantes, especialmente al atardecer.",
        rating: 5,
      },
      {
        user: "Carlos M.",
        comment: "Un poco difícil de llegar, pero vale la pena.",
        rating: 4,
      },
    ],
    socialMedia: [
      { platform: "Instagram", url: "https://www.instagram.com/miradorciudad" },
      { platform: "Facebook", url: "https://www.facebook.com/miradorciudad" },
    ],
    publicPlaceInfo: {
      bestTimeToVisit: "Al atardecer para disfrutar de la puesta de sol",
      facilities: [
        "Estacionamiento",
        "Baños públicos",
        "Cafetería",
        "Tienda de recuerdos",
      ],
      restrictions: [
        "No se permite el ingreso de mascotas",
        "Prohibido el consumo de alcohol",
      ],
      accessibilityInfo: "Rampa de acceso para sillas de ruedas disponible",
      guidedTours: [
        {
          name: "Tour del Amanecer",
          description:
            "Disfruta de las primeras luces del día desde el mirador",
          duration: "2 horas",
          price: "S/. 30",
          schedule: "Todos los días a las 5:00 AM",
        },
        {
          name: "Tour Histórico",
          description:
            "Conoce la historia de la ciudad mientras disfrutas de las vistas",
          duration: "3 horas",
          price: "S/. 45",
          schedule: "Martes y Jueves a las 10:00 AM",
        },
      ],
    },
    historicalInfo:
      "El Mirador de la Ciudad fue construido en 1950 como parte de un proyecto de desarrollo turístico.",
    culturalSignificance:
      "Es un símbolo de la ciudad y un punto de encuentro para eventos culturales y celebraciones.",
    nearbyAttractions: [
      "Museo de Historia Regional",
      "Parque de las Flores",
      "Mercado Artesanal",
    ],
  },
  {
    id: 4,
    name: "Clínica Dental Sonrisa Perfecta",
    description:
      "Atención odontológica de calidad con tecnología de punta. ¡Sonríe con confianza!",
    address: "Av. Los Próceres 456, Huancayo",
    latitude: -12.065,
    longitude: -75.203,
    videoUrl: "/dentista.mp4",
    logoUrl: "/logo.jpg",
    type: "business",
    category: "salud",
    subcategory: "Clínicas Dentales",
    isFree: false,
    openingHours:
      "Lunes a Viernes: 8:00 AM - 7:00 PM, Sábados: 9:00 AM - 2:00 PM",
    photos: ["/dental/clinic1.jpg", "/dental/clinic2.jpg"],
    differential:
      "Ofrecemos tratamientos de última generación con un equipo altamente capacitado.",
    studies: [
      "Especialización en Ortodoncia y Ortopedia Maxilar",
      "Curso de Estética Dental Avanzada",
    ],
    bestProducts: [
      {
        name: "Blanqueamiento Dental",
        image: "/dental/blanqueamiento.jpg",
        description:
          "Devuelve el brillo natural a tu sonrisa con nuestro tratamiento profesional.",
        creationVideoUrl: "/videos/blanqueamiento-dental.mp4",
      },
      {
        name: "Ortodoncia Invisible",
        image: "/dental/ortodoncia.jpg",
        description:
          "Corrige la alineación de tus dientes con alineadores transparentes casi invisibles.",
      },
      {
        name: "Implantes Dentales",
        image: "/dental/implantes.jpg",
        description:
          "Recupera la funcionalidad y estética de tu sonrisa con implantes de titanio de alta calidad.",
      },
    ],
    rating: 4.9,
    comments: [
      {
        user: "Lucía M.",
        comment: "Excelente atención y profesionales muy amables.",
        rating: 5,
      },
      {
        user: "Carlos T.",
        comment: "Me encantó el blanqueamiento, mi sonrisa luce increíble.",
        rating: 5,
      },
    ],
    testimonialVideos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ],
    environments: [
      {
        name: "Sala de Espera Confortable",
        description:
          "Un espacio moderno y acogedor con café y revistas mientras esperas tu turno.",
        image: "/dental/sala-espera.jpg",
      },
      {
        name: "Consultorio Equipado",
        description:
          "Tecnología de punta en cada consultorio para garantizar la mejor atención.",
        image: "/dental/consultorio.jpg",
      },
    ],
    awards: [
      "Premio a la Excelencia Odontológica 2023",
      "Mejor Clínica Dental de la Región 2022",
    ],
    specialOffers: [
      {
        title: "Primera consulta gratuita",
        description: "Diagnóstico y evaluación sin costo en tu primera visita.",
        validUntil: "2025-12-31",
      },
      {
        title: "20% de descuento en blanqueamiento",
        description:
          "Promoción especial por tiempo limitado en nuestro tratamiento de blanqueamiento dental.",
        validUntil: "2025-06-30",
      },
    ],
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/sonrisaperfectahuancayo",
      },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/sonrisaperfectahuancayo",
      },
    ],
    phone: "+51 456 789 012",
    whatsapp: "+51 987 654 321",
  },
];

export interface FilterState {
  category: string | null;
  subcategories: string[];
  timeFrame: string | null;
  showEventual: boolean;
  showPermanent: boolean;
  showFreeOnly: boolean;
  showPromotions: boolean;
}

export function getFilterSummary(filters: FilterState): string {
  const parts = [];
  if (filters.category) {
    parts.push(filters.category);
  }
  if (filters.subcategories && filters.subcategories.length > 0) {
    parts.push(filters.subcategories.join(", "));
  }
  if (filters.timeFrame) {
    parts.push(filters.timeFrame);
  }
  if (filters.showEventual && filters.showPermanent) {
    parts.push("Eventuales y Permanentes");
  } else if (filters.showEventual) {
    parts.push("Eventuales");
  } else if (filters.showPermanent) {
    parts.push("Permanentes");
  }
  if (filters.showFreeOnly) {
    parts.push("Gratis");
  }
  if (filters.showPromotions) {
    parts.push("Promociones");
  }
  return parts.length > 0 ? parts.join(" - ") : "Huancayo - Entretenimiento";
}

export function filterPlaces(places: Place[], filters: FilterState): Place[] {
  return places.filter((place) => {
    if (filters.category && place.category !== filters.category) return false;
    if (
      filters.subcategories.length > 0 &&
      !filters.subcategories.includes(place.subcategory)
    )
      return false;
    if (filters.showEventual && filters.showPermanent) {
      // Show both types
    } else if (filters.showEventual && place.type !== "event") return false;
    else if (
      filters.showPermanent &&
      place.type !== "business" &&
      place.type !== "public"
    )
      return false;
    if (filters.showFreeOnly && !place.isFree) return false;
    // Note: We don't have a 'promotions' field in our data, so we'll skip that filter for now
    return true;
  });
}
