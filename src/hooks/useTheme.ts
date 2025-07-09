import { useState, useEffect } from "react";
import { Language } from "@/types";
import { translations } from "@/constants/translations";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string) => translations[key]?.[language] || key;

  return {
    isDarkMode,
    language,
    toggleTheme,
    changeLanguage,
    t,
  };
};
