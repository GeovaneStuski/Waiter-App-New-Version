import { HouseIcon } from "lucide-react";
import { PageHeader } from "../components/page-header";
import { Card } from "./components/order-card";
import { OrdersRepository } from "@/repositories/orders-repository";

const cards = [
  {
    icon: "🕑",
    title: "Fila de espera",
    type: "WAITING",
  },
  {
    icon: "👩‍🍳",
    title: "Em produção",
    type: "IN_PRODUCTION",
  },
  {
    icon: "✅",
    title: "Pronto",
    type: "DONE",
  },
] as const;

export default async function HomePage() {
  const orders = await OrdersRepository.list();

  const filteredOrders = {
    DONE: orders.filter((order) => order.status === "DONE"),
    IN_PRODUCTION: orders.filter((order) => order.status === "IN_PRODUCTION"),
    WAITING: orders.filter((order) => order.status === "WAITING"),
  } as const;

  return (
    <div className="h-full w-full">
      <PageHeader
        icon={HouseIcon}
        title="Home"
        description="Acompanhe os pedidos dos clientes"
      />

      <div className="flex w-full gap-8">
        {cards.map((card) => (
          <Card orders={filteredOrders[card.type]} {...card} key={card.type} />
        ))}
      </div>
    </div>
  );
}
