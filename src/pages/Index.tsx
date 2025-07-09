import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Advertisement {
  id: number;
  title: string;
  description: string;
  serverName: string;
  serverLink: string;
  members: string;
  price: string;
  category: string;
  createdAt: string;
}

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

const translations: Translations = {
  title: { en: "Discord Ads Board", ru: "Discord Ads Board" },
  addListing: { en: "Add Listing", ru: "Добавить объявление" },
  add: { en: "Add", ru: "Добавить" },
  newListing: { en: "New Listing", ru: "Новое объявление" },
  titleLabel: { en: "Title", ru: "Заголовок" },
  titlePlaceholder: {
    en: "Brief description of the offer",
    ru: "Краткое описание предложения",
  },
  descriptionLabel: { en: "Description", ru: "Описание" },
  descriptionPlaceholder: {
    en: "Detailed description of the advertising offer",
    ru: "Подробное описание рекламного предложения",
  },
  serverLinkLabel: {
    en: "Discord Server Link",
    ru: "Ссылка на Discord сервер",
  },
  serverLinkPlaceholder: {
    en: "https://discord.gg/server",
    ru: "https://discord.gg/server",
  },
  categoryLabel: { en: "Category", ru: "Категория" },
  categoryPlaceholder: { en: "Gaming, IT, Finance", ru: "Игры, IT, Финансы" },
  priceLabel: { en: "Price", ru: "Цена" },
  publish: { en: "Publish", ru: "Опубликовать" },
  categories: { en: "Categories", ru: "Категории" },
  sorting: { en: "Sorting", ru: "Сортировка" },
  newest: { en: "Newest First", ru: "Сначала новые" },
  cheapest: { en: "Cheapest First", ru: "Сначала дешёвые" },
  expensive: { en: "Most Expensive", ru: "Сначала дорогие" },
  reset: { en: "Reset", ru: "Сброс" },
  contact: { en: "Contact", ru: "Связаться" },
  hoursAgo: { en: "hours ago", ru: "часов назад" },
  justNow: { en: "Just now", ru: "Только что" },
  linkError: {
    en: "Please enter a valid Discord link",
    ru: "Пожалуйста, укажите корректную Discord ссылку",
  },
  gameCategory: { en: "Gaming", ru: "Игры" },
  financeCategory: { en: "Finance", ru: "Финансы" },
  language: { en: "Language", ru: "Язык" },
  theme: { en: "Theme", ru: "Тема" },
  lightTheme: { en: "Light", ru: "Светлая" },
  darkTheme: { en: "Dark", ru: "Тёмная" },
  english: { en: "English", ru: "Английский" },
  russian: { en: "Russian", ru: "Русский" },
};

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "ru">("en");

  const t = (key: string) => translations[key]?.[language] || key;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
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
    },
  ]);

  // Фильтры
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("новые");

  const categories = ["IT", "Игры", "Финансы", "Музыка", "Образование"];

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
      if (selectedCategories.length === 0) return true;

      // Проверяем, содержит ли категория объявления хотя бы одну из выбранных категорий
      const adCategories = ad.category.split(",").map((cat) => cat.trim());
      return selectedCategories.some((selectedCat) =>
        adCategories.some(
          (adCat) =>
            adCat.toLowerCase().includes(selectedCat.toLowerCase()) ||
            selectedCat.toLowerCase().includes(adCat.toLowerCase()),
        ),
      );
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serverLink: "",
    price: "",
    currency: "₽",
    category: "",
  });

  const [linkError, setLinkError] = useState("");

  const validateDiscordLink = (link: string): boolean => {
    const discordRegex = /^https:\/\/discord\.(gg|com\/invite)\/[a-zA-Z0-9]+$/;
    return discordRegex.test(link);
  };

  const extractServerInfo = (link: string) => {
    // Мок данных - в реальном приложении здесь был бы API запрос
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDiscordLink(formData.serverLink)) {
      setLinkError(t("linkError"));
      return;
    }

    const serverInfo = extractServerInfo(formData.serverLink);

    const newAd: Advertisement = {
      id: advertisements.length + 1,
      title: formData.title,
      description: formData.description,
      serverName: serverInfo.name,
      serverLink: formData.serverLink,
      members: serverInfo.members,
      price: `${formData.price} ${formData.currency}`,
      category: formData.category,
      createdAt: t("justNow"),
    };

    setAdvertisements([newAd, ...advertisements]);
    setFormData({
      title: "",
      description: "",
      serverLink: "",
      price: "",
      currency: "₽",
      category: "",
    });
    setLinkError("");
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Icon name="Globe" size={14} className="mr-1" />
                      {language === "en" ? "EN" : "RU"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage("en")}>
                      {t("english")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("ru")}>
                      {t("russian")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm sm:text-base px-3 sm:px-4">
                    <Icon name="Plus" size={16} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{t("addListing")}</span>
                    <span className="sm:hidden">{t("add")}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] w-[95vw] max-w-[95vw] sm:w-full sm:max-w-[500px] dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle className="dark:text-gray-100">
                      {t("newListing")}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="dark:text-gray-200">
                        {t("titleLabel")}
                      </Label>
                      <Input
                        id="title"
                        placeholder={t("titlePlaceholder")}
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="dark:text-gray-200"
                      >
                        {t("descriptionLabel")}
                      </Label>
                      <Textarea
                        id="description"
                        placeholder={t("descriptionPlaceholder")}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="serverLink"
                        className="dark:text-gray-200"
                      >
                        {t("serverLinkLabel")}
                      </Label>
                      <Input
                        id="serverLink"
                        placeholder={t("serverLinkPlaceholder")}
                        value={formData.serverLink}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            serverLink: e.target.value,
                          });
                          setLinkError("");
                        }}
                        required
                        className={`dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${linkError ? "border-red-500" : ""}`}
                      />
                      {linkError && (
                        <p className="text-sm text-red-500 mt-1">{linkError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="dark:text-gray-200">
                        {t("categoryLabel")}
                      </Label>
                      <Input
                        id="category"
                        placeholder={t("categoryPlaceholder")}
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price" className="dark:text-gray-200">
                        {t("priceLabel")}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="price"
                          placeholder="5,000"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          required
                          className="flex-1 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                        />
                        <Select
                          value={formData.currency}
                          onValueChange={(value) =>
                            setFormData({ ...formData, currency: value })
                          }
                        >
                          <SelectTrigger className="w-20 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                            <SelectItem
                              value="₽"
                              className="dark:text-gray-100"
                            >
                              ₽
                            </SelectItem>
                            <SelectItem
                              value="$"
                              className="dark:text-gray-100"
                            >
                              $
                            </SelectItem>
                            <SelectItem
                              value="€"
                              className="dark:text-gray-100"
                            >
                              €
                            </SelectItem>
                            <SelectItem
                              value="₴"
                              className="dark:text-gray-100"
                            >
                              ₴
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                    >
                      {t("publish")}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("categories")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("sorting")}
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem value="новые" className="dark:text-gray-100">
                      {t("newest")}
                    </SelectItem>
                    <SelectItem value="дешёвые" className="dark:text-gray-100">
                      {t("cheapest")}
                    </SelectItem>
                    <SelectItem value="дорогие" className="dark:text-gray-100">
                      {t("expensive")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full sm:w-auto dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  {t("reset")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredAndSortedAds.map((ad) => (
            <Card
              key={ad.id}
              className="hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle
                      className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-2 cursor-pointer hover:text-[#5865F2] transition-colors"
                      onClick={() => incrementViews(ad.id)}
                    >
                      {ad.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {ad.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center justify-between sm:block sm:text-right sm:ml-4">
                    <div className="text-xl sm:text-2xl font-bold text-[#5865F2] mb-1">
                      {ad.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {ad.createdAt}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Server" size={16} className="text-gray-400" />
                      <a
                        href={ad.serverLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-[#5865F2] transition-colors cursor-pointer"
                      >
                        {ad.serverName}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {ad.members}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Tag" size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {ad.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Eye" size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {ad.views}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white w-full sm:w-auto dark:border-[#5865F2] dark:hover:bg-[#5865F2]"
                    onClick={() => {
                      incrementViews(ad.id);
                      window.open(ad.serverLink, "_blank");
                    }}
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    {t("contact")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
