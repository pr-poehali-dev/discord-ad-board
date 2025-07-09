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
import Icon from "@/components/ui/icon";

interface Advertisement {
  id: number;
  title: string;
  description: string;
  serverName: string;
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
      members: "12,200",
      price: "4,200 ₽",
      category: "IT",
      createdAt: "6 часов назад",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serverName: "",
    members: "",
    price: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAd: Advertisement = {
      id: advertisements.length + 1,
      ...formData,
      createdAt: "Только что",
    };
    setAdvertisements([newAd, ...advertisements]);
    setFormData({
      title: "",
      description: "",
      serverName: "",
      members: "",
      price: "",
      category: "",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="MessageSquare" size={32} className="text-[#5865F2]" />
              <h1 className="text-2xl font-bold text-gray-900">
                Discord Ads Board
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить объявление
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serverName">Название сервера</Label>
                      <Input
                        id="serverName"
                        placeholder="Имя Discord сервера"
                        value={formData.serverName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serverName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="members">Участники</Label>
                      <Input
                        id="members"
                        placeholder="10,000"
                        value={formData.members}
                        onChange={(e) =>
                          setFormData({ ...formData, members: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Цена</Label>
                      <Input
                        id="price"
                        placeholder="5,000 ₽"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {advertisements.map((ad) => (
            <Card
              key={ad.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900 mb-2">
                      {ad.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {ad.description}
                    </CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-[#5865F2] mb-1">
                      {ad.price}
                    </div>
                    <div className="text-sm text-gray-500">{ad.createdAt}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Server" size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {ad.serverName}
                      </span>
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
                    className="border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white"
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
