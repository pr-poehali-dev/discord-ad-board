export interface Advertisement {
  id: number;
  title: string;
  description: string;
  serverName: string;
  serverLink: string;
  members: string;
  price: string;
  currency: string;
  category: string;
  createdAt: string;
}

export interface FormData {
  title: string;
  description: string;
  serverLink: string;
  price: string;
  currency: string;
  category: string;
}

export const CURRENCIES = ["₽", "$", "€", "₴"] as const;
export const CATEGORIES = [
  "IT",
  "Игры",
  "Финансы",
  "Музыка",
  "Образование",
] as const;

export type Currency = (typeof CURRENCIES)[number];
export type Category = (typeof CATEGORIES)[number];
