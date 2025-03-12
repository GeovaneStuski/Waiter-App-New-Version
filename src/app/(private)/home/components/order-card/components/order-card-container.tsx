import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function OrderCardContainer({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn("p-4 h-fit w-full flex-col flex items-center rounded-lg border border-zinc-200", className)} />
}