import { Category } from "../types/map";

export const specialCategory: Category = {
  id: "eventos-cerca",
  name: "Eventos cerca de mí",
  icon: "📍",
  subcategories: [
    { id: "hoy", name: "Hoy" },
    { id: "esta-semana", name: "Esta semana" },
    { id: "este-mes", name: "Este mes" },
    { id: "gratis", name: "Gratis" },
    { id: "familiar", name: "Familiar" },
    { id: "infantil", name: "Infantil" },
  ],
  filters: [
    { name: "Distancia", options: ["1 km", "5 km", "10 km", "20 km"] },
    {
      name: "Tipo de evento",
      options: ["Cultural", "Deportivo", "Musical", "Gastronómico", "Infantil"],
    },
    { name: "Precio", options: ["Gratis", "De pago"] },
  ],
};

export const categories: Category[] = [
  {
    id: "gastronomia",
    name: "Gastronomía",
    icon: "🍽️",
    subcategories: [
      { id: "restaurantes", name: "Restaurantes" },
      { id: "restaurantes-tematicos", name: "Restaurantes temáticos" },
      { id: "recreos-aire-libre", name: "Recreos al aire libre" },
      { id: "fondos-haciendas", name: "Fondos o haciendas" },
      { id: "ferias-gastronomicas", name: "Ferias gastronómicas" },
    ],
    filters: [
      { name: "Tipo de lugar", options: ["Negocio", "Feria", "Lugar público"] },
      { name: "Público", options: ["Familiar", "Parejas", "Individual"] },
      { name: "Costo", options: ["Gratuito", "Económico", "Premium"] },
    ],
  },
  {
    id: "cultura",
    name: "Cultura",
    icon: "🎭",
    subcategories: [
      { id: "museos", name: "Museos" },
      { id: "teatros", name: "Teatros" },
      { id: "galerias-arte", name: "Galerías de arte" },
      { id: "centros-culturales", name: "Centros culturales" },
      { id: "festivales-culturales", name: "Festivales culturales" },
    ],
    filters: [
      { name: "Tipo de lugar", options: ["Público", "Privado", "Evento"] },
      { name: "Temporalidad", options: ["Permanente", "Temporal"] },
      { name: "Público", options: ["Familiar", "Adultos", "Niños"] },
    ],
  },
  {
    id: "aventura-turismo",
    name: "Aventura & Turismo",
    icon: "🏞️",
    subcategories: [
      { id: "sitios-arqueologicos", name: "Sitios arqueológicos" },
      { id: "tours-guiados", name: "Tours guiados" },
      { id: "parques-nacionales", name: "Parques nacionales" },
      { id: "deportes-aventura", name: "Deportes de aventura" },
      { id: "playas", name: "Playas" },
    ],
    filters: [
      {
        name: "Tipo de actividad",
        options: ["Cultural", "Naturaleza", "Aventura"],
      },
      { name: "Dificultad", options: ["Fácil", "Moderado", "Difícil"] },
      {
        name: "Duración",
        options: ["Medio día", "Día completo", "Varios días"],
      },
    ],
  },
  {
    id: "educacion",
    name: "Educación",
    icon: "📚",
    subcategories: [
      { id: "universidades", name: "Universidades" },
      { id: "institutos", name: "Institutos" },
      { id: "academias", name: "Academias" },
      { id: "bibliotecas", name: "Bibliotecas" },
      { id: "talleres-educativos", name: "Talleres educativos" },
    ],
    filters: [
      { name: "Tipo de institución", options: ["Pública", "Privada"] },
      {
        name: "Nivel educativo",
        options: ["Básica", "Superior", "Técnica", "Continua"],
      },
      { name: "Modalidad", options: ["Presencial", "Virtual", "Híbrida"] },
    ],
  },
  {
    id: "bienestar-belleza",
    name: "Bienestar & Belleza",
    icon: "💆",
    subcategories: [
      { id: "spas", name: "Spas" },
      { id: "masajes", name: "Masajes" },
      { id: "salones-belleza", name: "Salones de belleza" },
      { id: "yoga-meditacion", name: "Centros de yoga y meditación" },
      { id: "campanas-salud", name: "Campañas de salud gratuitas" },
    ],
    filters: [
      {
        name: "Tipo de lugar",
        options: ["Spa", "Campaña comunitaria", "Negocio"],
      },
      { name: "Público", options: ["Individual", "Grupal"] },
      { name: "Temporalidad", options: ["Permanente", "Evento"] },
    ],
  },
  {
    id: "salud",
    name: "Salud",
    icon: "🏥",
    subcategories: [
      { id: "clinicas-medicas", name: "Clínicas médicas" },
      { id: "pediatria", name: "Pediatría" },
      { id: "dermatologia", name: "Dermatología" },
      { id: "odontologia", name: "Odontología" },
      { id: "psicologia", name: "Psicología" },
      { id: "campanas-medicas", name: "Campañas médicas gratuitas" },
    ],
    filters: [
      { name: "Tipo de lugar", options: ["Negocio", "Campaña gratuita"] },
      { name: "Consulta", options: ["Presencial", "Virtual"] },
      { name: "Horarios", options: ["Abierto ahora", "Por cita"] },
    ],
  },
  {
    id: "mascotas",
    name: "Mascotas",
    icon: "🐾",
    subcategories: [
      { id: "veterinarias", name: "Veterinarias" },
      { id: "guarderias", name: "Guarderías de mascotas" },
      { id: "paseadores", name: "Paseadores" },
      { id: "adiestramiento", name: "Adiestramiento" },
    ],
    filters: [
      { name: "Tipo de mascota", options: ["Perros", "Gatos"] },
      { name: "Emergencias", options: ["24 horas"] },
      { name: "Servicio a domicilio", options: ["Sí", "No"] },
    ],
  },
  {
    id: "entretenimiento",
    name: "Entretenimiento",
    icon: "🎉",
    subcategories: [
      { id: "cines", name: "Cines" },
      { id: "conciertos", name: "Conciertos" },
      { id: "ferias-artesanales", name: "Ferias artesanales" },
      { id: "parques-tematicos", name: "Parques temáticos" },
      { id: "discotecas", name: "Discotecas y bares" },
    ],
    filters: [
      { name: "Tipo de lugar", options: ["Negocio", "Evento"] },
      {
        name: "Público",
        options: ["Familiar", "Infantil", "Parejas", "Adultos"],
      },
      { name: "Temporalidad", options: ["Permanente", "Evento"] },
    ],
  },
  {
    id: "compras",
    name: "Compras",
    icon: "🛍️",
    subcategories: [
      { id: "centros-comerciales", name: "Centros comerciales" },
      { id: "tiendas-ropa", name: "Tiendas de ropa" },
      { id: "mercados-artesanales", name: "Mercados artesanales" },
      { id: "ferias-locales", name: "Ferias locales" },
    ],
    filters: [
      { name: "Tipo de lugar", options: ["Negocio", "Feria"] },
      { name: "Público", options: ["Familiar", "Adultos"] },
    ],
  },
  {
    id: "hogar",
    name: "Hogar",
    icon: "🏠",
    subcategories: [
      { id: "lavanderias", name: "Lavanderías" },
      { id: "fontaneros", name: "Fontaneros" },
      { id: "electricistas", name: "Electricistas" },
      { id: "servicios-limpieza", name: "Servicios de limpieza" },
      { id: "cocheras-estacionamientos", name: "Cocheras y estacionamientos" },
    ],
    filters: [
      { name: "Servicio a domicilio", options: ["Sí", "No"] },
      { name: "Horarios", options: ["Abierto ahora"] },
    ],
  },
  {
    id: "autos-movilidad",
    name: "Autos y Movilidad",
    icon: "🚗",
    subcategories: [
      { id: "talleres-mecanicos", name: "Talleres mecánicos" },
      { id: "alquiler-vehiculos", name: "Alquiler de autos y bicicletas" },
      { id: "reparacion-vehiculos", name: "Reparación de vehículos" },
      { id: "estaciones-carga", name: "Estaciones de carga eléctrica" },
    ],
    filters: [
      { name: "Tipo de vehículo", options: ["Auto", "Moto", "Bicicleta"] },
      { name: "Servicio urgente", options: ["Sí", "No"] },
    ],
  },
];
