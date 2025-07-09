import { useState } from "react";
import { Advertisement, FormData } from "@/types/advertisement";
import { Language } from "@/lib/translations";

const mockAdvertisements: Advertisement[] = [
  {
    id: 1,
    title: "Реклама в игровом сообществе",
    description:
      "Активное сообщество геймеров. Высокий охват среди целевой аудитории 18-25 лет.",
    serverName: "GameHub",
    serverLink: "https://discord.gg/gamehub",
    members: "15,000",
    price: "5,000",
    currency: "₽",
    category: "Игры",
    createdAt: "2 часа назад",
  },
  {
    id: 2,
    title: "Криптовалютный канал",
    description:
      "Аудитория инвесторов и трейдеров. Ежедневная активность 2000+ участников.",
    serverName: "CryptoTalk",
    serverLink: "https://discord.gg/cryptotalk",
    members: "8,500",
    price: "3,500",
    currency: "₽",
    category: "Финансы",
    createdAt: "4 часа назад",
  },
  {
    id: 3,
    title: "IT-сообщество разработчиков",
    description:
      "Профессиональная аудитория программистов и дизайнеров. Качественный трафик.",
    serverName: "DevSpace",
    serverLink: "https://discord.gg/devspace",
    members: "12,200",
    price: "4,200",
    currency: "₽",
    category: "IT",
    createdAt: "6 часов назад",
  },
];

export const useAdvertisements = (language: Language) => {
  const [advertisements, setAdvertisements] =
    useState<Advertisement[]>(mockAdvertisements);

  const extractServerInfo = (link: string) => {
    const mockServers: { [key: string]: { name: string; members: string } } = {
      gamehub: { name: "GameHub", members: "15,000" },
      cryptotalk: { name: "CryptoTalk", members: "8,500" },
      devspace: { name: "DevSpace", members: "12,200" },
    };

    const inviteCode = link.split("/").pop()?.toLowerCase() || "";
    return (
      mockServers[inviteCode] || {
        name: `Server_${inviteCode}`,
        members: "1,000",
      }
    );
  };

  const addAdvertisement = (formData: FormData) => {
    const serverInfo = extractServerInfo(formData.serverLink);

    const newAd: Advertisement = {
      id: advertisements.length + 1,
      title: formData.title,
      description: formData.description,
      serverName: serverInfo.name,
      serverLink: formData.serverLink,
      members: serverInfo.members,
      price: formData.price,
      currency: formData.currency,
      category: formData.category,
      createdAt: language === "en" ? "Just now" : "Только что",
    };

    setAdvertisements([newAd, ...advertisements]);
  };

  return {
    advertisements,
    addAdvertisement,
  };
};
