import { useState, useEffect } from "react";
import { Language } from "@/lib/translations";

const TestIndex = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 p-4">
        <h1 className="text-2xl font-bold">Test Index - Working</h1>
        <p>Language: {language}</p>
        <p>Dark Mode: {isDarkMode ? "Yes" : "No"}</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold mb-4">Test Content</h2>
          <button
            onClick={() => setLanguage(language === "en" ? "ru" : "en")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Toggle Language
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Toggle Dark Mode
          </button>
        </div>
      </main>
    </div>
  );
};

export default TestIndex;
