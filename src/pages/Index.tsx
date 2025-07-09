import { useState, useEffect } from "react";
import { Language } from "@/lib/translations";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { AdvertisementCard } from "@/components/AdvertisementCard";
import { useAdvertisements } from "@/hooks/useAdvertisements";
import { useFilters } from "@/hooks/useFilters";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  const { advertisements, addAdvertisement } = useAdvertisements(language);
  const {
    selectedCategories,
    selectedCurrency,
    sortBy,
    filteredAndSortedAds,
    handleCategoryToggle,
    setSelectedCurrency,
    setSortBy,
    resetFilters,
  } = useFilters(advertisements);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onAddListing={addAdvertisement}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <Filters
          language={language}
          selectedCategories={selectedCategories}
          selectedCurrency={selectedCurrency}
          sortBy={sortBy}
          onCategoryToggle={handleCategoryToggle}
          onCurrencyChange={setSelectedCurrency}
          onSortChange={setSortBy}
          onReset={resetFilters}
        />

        <div className="space-y-4 sm:space-y-6">
          {filteredAndSortedAds.map((ad) => (
            <AdvertisementCard
              key={ad.id}
              advertisement={ad}
              language={language}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
