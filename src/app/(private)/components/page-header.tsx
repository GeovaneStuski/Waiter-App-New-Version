import { LucideIcon } from 'lucide-react';

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PageHeader({ icon: Icon, title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col mb-12 gap-4">
      <div className="flex items-center gap-2">
        <Icon />

        <h1 className="text-2xl leading-none font-bold">{title}</h1>
      </div>

      <p className="text-gray-500 text-base font-medium">{description}</p>
    </div>
  );
}