import { useState } from "react";
import { Advertisement, FormData, SortOption } from "@/types";

const initialAdvertisements: Advertisement[] = [
  {
    id: 1,
    title: "Реклама в игровом сообществе",
    description:
      "Активное сообщество геймеров. Высокий охват среди целевой аудитории 18-25 лет.",
    serverName: "GameHub",
    serverLink: "https://discord.gg/gamehub",
    members: "15,000",
    price: "5,000 ₽",
    category: "Игры",
    createdAt: "2 часа назад",
    views: 124,
  },
  {
    id: 2,
    title: "Криптовалютный канал",
    description:
      "Аудитория инвесторов и трейдеров. Ежедневная активность 2000+ участников.",
    serverName: "CryptoTalk",
    serverLink: "https://discord.gg/cryptotalk",
    members: "8,500",
    price: "3,500 ₽",
    category: "Финансы",
    createdAt: "4 часа назад",
    views: 89,
  },
  {
    id: 3,
    title: "IT-сообщество разработчиков",
    description:
      "Профессиональная аудитория программистов и дизайнеров. Качественный трафик.",
    serverName: "DevSpace",
    serverLink: "https://discord.gg/devspace",
    members: "12,200",
    price: "4,200 ₽",
    category: "IT",
    createdAt: "6 часов назад",
    views: 156,
  },
];

export const useAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(
    initialAdvertisements,
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("новые");

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency === selectedCurrency ? "" : currency);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedCurrency("");
    setSortBy("новые");
  };

  const incrementViews = (adId: number) => {
    setAdvertisements((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, views: ad.views + 1 } : ad)),
    );
  };

  const parsePrice = (priceStr: string) => {
    const numStr = priceStr.replace(/[^0-9]/g, "");
    return parseInt(numStr) || 0;
  };

  const getTimeScore = (createdAt: string) => {
    if (createdAt.includes("час")) {
      const hours = parseInt(createdAt.split(" ")[0]);
      return hours;
    }
    return 0;
  };

  const filteredAndSortedAds = advertisements
    .filter((ad) => {
      // Фильтр по категориям
      if (selectedCategories.length > 0) {
        const adCategories = ad.category.split(",").map((cat) => cat.trim());
        const categoryMatch = selectedCategories.some((selectedCat) =>
          adCategories.some(
            (adCat) =>
              adCat.toLowerCase().includes(selectedCat.toLowerCase()) ||
              selectedCat.toLowerCase().includes(adCat.toLowerCase()),
          ),
        );
        if (!categoryMatch) return false;
      }

      // Фильтр по валюте
      if (selectedCurrency) {
        return ad.price.includes(selectedCurrency);
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "дешёвые":
          return parsePrice(a.price) - parsePrice(b.price);
        case "дорогие":
          return parsePrice(b.price) - parsePrice(a.price);
        case "новые":
        default:
          return getTimeScore(a.createdAt) - getTimeScore(b.createdAt);
      }
    });

  const addAdvertisement = (formData: FormData) => {
    const newAd: Advertisement = {
      id: advertisements.length + 1,
      title: formData.title,
      description: formData.description,
      serverName: "Server Name", // Mock data
      serverLink: formData.serverLink,
      members: "1,000", // Mock data
      price: `${formData.price} ${formData.currency}`,
      category: formData.category,
      createdAt: "Только что",
      views: 0,
    };

    setAdvertisements((prev) => [newAd, ...prev]);
  };

  return {
    advertisements: filteredAndSortedAds,
    selectedCategories,
    selectedCurrency,
    sortBy,
    handleCategoryToggle,
    handleCurrencyChange,
    resetFilters,
    incrementViews,
    addAdvertisement,
    setSortBy,
  };
};
