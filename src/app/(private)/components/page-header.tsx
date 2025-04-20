import { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function PageHeader({
  icon: Icon,
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Icon />

        <h1 className="text-2xl font-bold leading-none">{title}</h1>
      </div>

      <p className="text-base font-medium text-gray-500">{description}</p>
    </div>
  );
}
