import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function OrderCardContainer({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex h-fit w-full flex-col items-center rounded-lg border border-zinc-200 p-4",
        className,
      )}
    />
  );
}
