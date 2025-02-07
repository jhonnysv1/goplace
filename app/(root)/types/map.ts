export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  type: string;
  temporality: string;
  cost: string;
  publicTarget: string;
  location: Location;
  address: string;
  image: string;
  tags: string[];
  openingHours?: string;
  eventDateTime?: string;
}

export interface Filter {
  name: string;
  options: string[];
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
  filters: Filter[];
}
