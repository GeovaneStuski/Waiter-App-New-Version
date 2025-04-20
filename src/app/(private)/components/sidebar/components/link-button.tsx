import { LucideIcon } from "lucide-react";
import Link from "next/link";

type LinkButtonProps = {
  icon: LucideIcon;
  label: string;
  active: boolean;
  link: string;
};

export const LinkButton = ({
  link,
  active,
  icon: Icon,
  label,
}: LinkButtonProps) => (
  <Link
    data-active={active}
    className="flex size-[108px] flex-col items-center justify-center gap-2 text-zinc-500 duration-200 data-[active=true]:text-red-500 data-[active=false]:hover:text-zinc-600"
    href={link}
  >
    <Icon className="size-6" />
    <span className="text-sm font-semibold">{label}</span>
  </Link>
);
