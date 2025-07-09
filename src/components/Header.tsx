import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Language, useTranslation } from "@/lib/translations";
import { AddListingForm } from "./AddListingForm";
import { FormData } from "@/types/advertisement";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  onAddListing: (formData: FormData) => void;
}

export const Header = ({
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
  onAddListing,
}: HeaderProps) => {
  const { t } = useTranslation(language);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Icon name="MessageSquare" size={32} className="text-[#5865F2]" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t("title")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Language and Theme Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setLanguage(language === "en" ? "ru" : "en")}
              >
                <Icon name="Globe" size={14} className="mr-1" />
                {language === "en" ? "EN" : "RU"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-xs"
              >
                <Icon
                  name={isDarkMode ? "Sun" : "Moon"}
                  size={14}
                  className="mr-1"
                />
                {isDarkMode ? t("lightTheme") : t("darkTheme")}
              </Button>
            </div>

            <AddListingForm language={language} onSubmit={onAddListing} />
          </div>
        </div>
      </div>
    </header>
  );
};
