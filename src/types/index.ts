export interface Advertisement {
  id: number;
  title: string;
  description: string;
  serverName: string;
  serverLink: string;
  members: string;
  price: string;
  category: string;
  createdAt: string;
  views: number;
}

export interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

export type Language = "en" | "ru";
export type SortOption = "новые" | "дешёвые" | "дорогие";

export interface FormData {
  title: string;
  description: string;
  serverLink: string;
  price: string;
  currency: string;
  category: string;
}
