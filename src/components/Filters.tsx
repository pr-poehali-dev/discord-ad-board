import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { Language, useTranslation } from "@/lib/translations";
import { CATEGORIES, CURRENCIES } from "@/types/advertisement";

interface FiltersProps {
  language: Language;
  selectedCategories: string[];
  selectedCurrency: string;
  sortBy: string;
  onCategoryToggle: (category: string) => void;
  onCurrencyChange: (currency: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export const Filters = ({
  language,
  selectedCategories,
  selectedCurrency,
  sortBy,
  onCategoryToggle,
  onCurrencyChange,
  onSortChange,
  onReset,
}: FiltersProps) => {
  const { t } = useTranslation(language);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("categories")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onCategoryToggle(category)}
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
              {t("currency")}
            </label>
            <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
              <SelectTrigger className="w-full sm:w-[120px] dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                <SelectValue placeholder={t("allCurrencies")} />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="" className="dark:text-gray-100">
                  {t("allCurrencies")}
                </SelectItem>
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("sorting")}
            </label>
            <Select value={sortBy} onValueChange={onSortChange}>
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
              onClick={onReset}
              className="w-full sm:w-auto dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              {t("reset")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
