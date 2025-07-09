import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { categories, currencies } from "@/constants/translations";
import { Language, SortOption } from "@/types";

interface AdFiltersProps {
  selectedCategories: string[];
  selectedCurrency: string;
  sortBy: SortOption;
  onCategoryToggle: (category: string) => void;
  onCurrencyChange: (currency: string) => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  t: (key: string) => string;
}

export const AdFilters = ({
  selectedCategories,
  selectedCurrency,
  sortBy,
  onCategoryToggle,
  onCurrencyChange,
  onSortChange,
  onResetFilters,
  t,
}: AdFiltersProps) => {
  return (
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
                  onCheckedChange={() => onCategoryToggle(category)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("currencies")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {currencies.map((currency) => (
              <label
                key={currency}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedCurrency === currency}
                  onCheckedChange={() => onCurrencyChange(currency)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currency}
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
              onClick={onResetFilters}
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
