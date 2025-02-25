import { Order } from "@/@types/order";

type CardProps = {
  icon: string;
  title: string;
  order: Order[];
}

export function Card({ icon, title }: CardProps) {
  return (
    <div className="p-4 w-full flex-col flex items-center rounded-lg border border-zinc-200">
      <div className="items-center h-11 flex gap-2 text-lg">
        <span>{icon}</span>
        <span className="font-semibold">{title}</span>
      </div>
    </div>
  )
}