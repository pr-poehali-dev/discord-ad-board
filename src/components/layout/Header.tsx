import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Language } from "@/types";
import { AddAdForm } from "@/components/ads/AddAdForm";
import { FormData } from "@/types";

interface HeaderProps {
  isDarkMode: boolean;
  language: Language;
  onThemeToggle: () => void;
  onLanguageChange: (lang: Language) => void;
  onAddAdvertisement: (formData: FormData) => void;
  t: (key: string) => string;
}

export const Header = ({
  isDarkMode,
  language,
  onThemeToggle,
  onLanguageChange,
  onAddAdvertisement,
  t,
}: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="MessageSquare" size={24} className="text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange(language === "en" ? "ru" : "en")}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {language === "en" ? "🇺🇸 EN" : "🇷🇺 RU"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={16} />
            </Button>
            <AddAdForm onSubmit={onAddAdvertisement} t={t} />
          </div>
        </div>
      </div>
    </header>
  );
};
