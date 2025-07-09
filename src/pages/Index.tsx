import { useTheme } from "@/hooks/useTheme";
import { useAdvertisements } from "@/hooks/useAdvertisements";
import { Header } from "@/components/layout/Header";
import { AdFilters } from "@/components/ads/AdFilters";
import { AdCard } from "@/components/ads/AdCard";
import { SortOption } from "@/types";

const Index = () => {
  const { isDarkMode, language, toggleTheme, changeLanguage, t } = useTheme();
  const {
    advertisements,
    selectedCategories,
    selectedCurrency,
    sortBy,
    handleCategoryToggle,
    handleCurrencyChange,
    resetFilters,
    incrementViews,
    addAdvertisement,
    setSortBy,
  } = useAdvertisements();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        isDarkMode={isDarkMode}
        language={language}
        onThemeToggle={toggleTheme}
        onLanguageChange={changeLanguage}
        onAddAdvertisement={addAdvertisement}
        t={t}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <AdFilters
          selectedCategories={selectedCategories}
          selectedCurrency={selectedCurrency}
          sortBy={sortBy}
          onCategoryToggle={handleCategoryToggle}
          onCurrencyChange={handleCurrencyChange}
          onSortChange={setSortBy}
          onResetFilters={resetFilters}
          t={t}
        />

        <div className="space-y-4 sm:space-y-6">
          {advertisements.map((ad) => (
            <AdCard
              key={ad.id}
              advertisement={ad}
              onViewIncrement={incrementViews}
              t={t}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
