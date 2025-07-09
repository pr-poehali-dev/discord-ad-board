import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { FormData } from "@/types";

interface AddAdFormProps {
  onSubmit: (formData: FormData) => void;
  t: (key: string) => string;
}

export const AddAdForm = ({ onSubmit, t }: AddAdFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    serverLink: "",
    price: "",
    currency: "₽",
    category: "",
  });

  const validateDiscordLink = (link: string): boolean => {
    const discordRegex = /^https:\/\/discord\.(gg|com\/invite)\/[a-zA-Z0-9]+$/;
    return discordRegex.test(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDiscordLink(formData.serverLink)) {
      setLinkError(t("linkError"));
      return;
    }

    onSubmit(formData);
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm px-3 py-2 whitespace-nowrap">
          <span className="hidden sm:inline">{t("addListing")}</span>
          <span className="sm:hidden">{t("addShort")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] dark:bg-gray-800 dark:border-gray-700">
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
            <Label htmlFor="description" className="dark:text-gray-200">
              {t("descriptionLabel")}
            </Label>
            <Textarea
              id="description"
              placeholder={t("descriptionPlaceholder")}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serverLink" className="dark:text-gray-200">
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
              className={`dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${
                linkError ? "border-red-500" : ""
              }`}
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
                  <SelectItem value="₽" className="dark:text-gray-100">
                    ₽
                  </SelectItem>
                  <SelectItem value="$" className="dark:text-gray-100">
                    $
                  </SelectItem>
                  <SelectItem value="€" className="dark:text-gray-100">
                    €
                  </SelectItem>
                  <SelectItem value="₴" className="dark:text-gray-100">
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
  );
};
