import { useState } from "react";
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

const Index = () => {
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
      setLinkError("Пожалуйста, укажите корректную Discord ссылку");
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
      createdAt: "Только что",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Icon name="MessageSquare" size={32} className="text-[#5865F2]" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                Discord Ads Board
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm sm:text-base px-3 sm:px-4">
                  <Icon name="Plus" size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Добавить объявление</span>
                  <span className="sm:hidden">Добавить</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] w-[95vw] max-w-[95vw] sm:w-full sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Новое объявление</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Заголовок</Label>
                    <Input
                      id="title"
                      placeholder="Краткое описание предложения"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Подробное описание рекламного предложения"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serverLink">Ссылка на Discord сервер</Label>
                    <Input
                      id="serverLink"
                      placeholder="https://discord.gg/server"
                      value={formData.serverLink}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          serverLink: e.target.value,
                        });
                        setLinkError("");
                      }}
                      required
                      className={linkError ? "border-red-500" : ""}
                    />
                    {linkError && (
                      <p className="text-sm text-red-500 mt-1">{linkError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Input
                      id="category"
                      placeholder="Игры, IT, Финансы"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена</Label>
                    <div className="flex gap-2">
                      <Input
                        id="price"
                        placeholder="5,000"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                        className="flex-1"
                      />
                      <Select
                        value={formData.currency}
                        onValueChange={(value) =>
                          setFormData({ ...formData, currency: value })
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="₽">₽</SelectItem>
                          <SelectItem value="$">$</SelectItem>
                          <SelectItem value="€">€</SelectItem>
                          <SelectItem value="₴">₴</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                  >
                    Опубликовать
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Категории
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
                    <span className="text-sm text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Сортировка
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="новые">Сначала новые</SelectItem>
                    <SelectItem value="дешёвые">Сначала дешёвые</SelectItem>
                    <SelectItem value="дорогие">Сначала дорогие</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full sm:w-auto"
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Сброс
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredAndSortedAds.map((ad) => (
            <Card
              key={ad.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl text-gray-900 mb-2">
                      {ad.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {ad.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center justify-between sm:block sm:text-right sm:ml-4">
                    <div className="text-xl sm:text-2xl font-bold text-[#5865F2] mb-1">
                      {ad.price}
                    </div>
                    <div className="text-sm text-gray-500">{ad.createdAt}</div>
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
                        className="text-sm font-medium text-gray-900 hover:text-[#5865F2] transition-colors cursor-pointer"
                      >
                        {ad.serverName}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {ad.members}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Tag" size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {ad.category}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white w-full sm:w-auto"
                    onClick={() => window.open(ad.serverLink, "_blank")}
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Связаться
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
