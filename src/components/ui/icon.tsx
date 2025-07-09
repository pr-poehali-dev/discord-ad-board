import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const Icon = ({
  name,
  size = 24,
  className = "",
  fallback = "CircleAlert",
}: IconProps) => {
  const LucideIcon = (LucideIcons as any)[name];

  if (!LucideIcon) {
    const FallbackIcon = (LucideIcons as any)[fallback];
    return FallbackIcon ? (
      <FallbackIcon size={size} className={className} />
    ) : null;
  }

  return <LucideIcon size={size} className={className} />;
};

export default Icon;
