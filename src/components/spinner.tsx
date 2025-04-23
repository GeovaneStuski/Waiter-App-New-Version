import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
};

export const Spinner = ({ className }: Props) => (
  <Loader2 className={cn("size-4 animate-spin text-zinc-600", className)} />
);
