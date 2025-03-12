import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type LinkButtonProps = {
  icon: LucideIcon;
  label: string;
  active: boolean;
  link: string;
}

export const LinkButton = ({ link, active, icon: Icon, label }: LinkButtonProps) => (
  <Link data-active={active} className="size-[108px] justify-center gap-2 flex flex-col duration-200 items-center text-zinc-500 data-[active=false]:hover:text-zinc-600 data-[active=true]:text-red-500" href={link}>
    <Icon className="size-6" />
    <span className="font-semibold text-sm">{label}</span>
  </Link>
);