import { useState, useMemo } from "react";
import { Advertisement } from "@/types/advertisement";

export const useFilters = (advertisements: Advertisement[]) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("новые");

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedCurrency("");
    setSortBy("новые");
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

  const filteredAndSortedAds = useMemo(() => {
    return advertisements
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
        if (selectedCurrency && selectedCurrency !== "") {
          return ad.currency === selectedCurrency;
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
  }, [advertisements, selectedCategories, selectedCurrency, sortBy]);

  return {
    selectedCategories,
    selectedCurrency,
    sortBy,
    filteredAndSortedAds,
    handleCategoryToggle,
    setSelectedCurrency,
    setSortBy,
    resetFilters,
  };
};
