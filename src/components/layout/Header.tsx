import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <header className="bg-[#5865F2] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Icon name="MessageSquare" size={32} />
            <h1 className="text-2xl sm:text-3xl font-bold">{t("title")}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Icon name="Palette" size={16} className="mr-2" />
                    {t("theme")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-gray-700 dark:border-gray-600">
                  <DropdownMenuItem
                    onClick={onThemeToggle}
                    className="dark:text-gray-100 dark:hover:bg-gray-600"
                  >
                    <Icon
                      name={isDarkMode ? "Sun" : "Moon"}
                      size={16}
                      className="mr-2"
                    />
                    {isDarkMode ? t("lightTheme") : t("darkTheme")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Icon name="Globe" size={16} className="mr-2" />
                    {t("language")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-gray-700 dark:border-gray-600">
                  <DropdownMenuItem
                    onClick={() => onLanguageChange("en")}
                    className="dark:text-gray-100 dark:hover:bg-gray-600"
                  >
                    🇺🇸 {t("english")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onLanguageChange("ru")}
                    className="dark:text-gray-100 dark:hover:bg-gray-600"
                  >
                    🇷🇺 {t("russian")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <AddAdForm onSubmit={onAddAdvertisement} t={t} />
          </div>
        </div>
      </div>
    </header>
  );
};
