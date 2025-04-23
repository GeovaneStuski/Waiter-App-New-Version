import { UtensilsCrossedIcon } from "lucide-react";

type Props = {
  customMessage?: string;
};

export function Loading({ customMessage }: Props) {
  return (
    <div className="flex w-full animate-pulse flex-col items-center space-y-1 py-2 font-medium">
      <UtensilsCrossedIcon className="size-10 text-zinc-600" />
      <span>{customMessage || "Carregando..."}</span>
    </div>
  );
}
