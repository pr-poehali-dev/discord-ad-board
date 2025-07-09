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
import Icon from "@/components/ui/icon";
import { Language, useTranslation } from "@/lib/translations";
import { FormData, CURRENCIES } from "@/types/advertisement";

interface AddListingFormProps {
  language: Language;
  onSubmit: (formData: FormData) => void;
}

export const AddListingForm = ({ language, onSubmit }: AddListingFormProps) => {
  const { t } = useTranslation(language);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
                setFormData({ ...formData, serverLink: e.target.value });
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
                  {CURRENCIES.map((currency) => (
                    <SelectItem
                      key={currency}
                      value={currency}
                      className="dark:text-gray-100"
                    >
                      {currency}
                    </SelectItem>
                  ))}
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
