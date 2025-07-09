import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Advertisement } from "@/types";

interface AdCardProps {
  advertisement: Advertisement;
  onViewIncrement: (id: number) => void;
  t: (key: string) => string;
}

export const AdCard = ({ advertisement, onViewIncrement, t }: AdCardProps) => {
  const handleTitleClick = () => {
    onViewIncrement(advertisement.id);
  };

  const handleContactClick = () => {
    onViewIncrement(advertisement.id);
    window.open(advertisement.serverLink, "_blank");
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <CardTitle
              className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-2 cursor-pointer hover:text-[#5865F2] transition-colors"
              onClick={handleTitleClick}
            >
              {advertisement.title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {advertisement.description}
            </CardDescription>
          </div>
          <div className="flex items-center justify-between sm:block sm:text-right sm:ml-4">
            <div className="text-xl sm:text-2xl font-bold text-[#5865F2] mb-1">
              {advertisement.price}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {advertisement.createdAt}
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
                href={advertisement.serverLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-[#5865F2] transition-colors cursor-pointer"
                onClick={handleTitleClick}
              >
                {advertisement.serverName}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {advertisement.members}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {advertisement.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {advertisement.views}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white w-full sm:w-auto dark:border-[#5865F2] dark:hover:bg-[#5865F2]"
            onClick={handleContactClick}
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            {t("contact")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
