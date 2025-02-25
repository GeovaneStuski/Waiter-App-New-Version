import { HouseIcon } from "lucide-react";
import { PageHeader } from "../components/page-header";
import { Card } from "./components/card";
import { OrdersRepository } from "@/repositories/orders-repository";

const cards = [
  {
    icon: '🕑',
    title: 'Fila de espera',
    type: 'WAITING'
  },
  {
    icon: '👩‍🍳',
    title: 'Em produção',
    type: 'IN_PRODUCTION'
  },
  {
    icon: '✅',
    title: 'Pronto',
    type: 'DONE'
  },
] as const

export default async function HomePage() {
  const orders = await OrdersRepository.list()
    .catch((e) => console.error(e)) || []

  const filteredOrders = {
    DONE: orders.filter(order => order.status === 'DONE'),
    IN_PRODUCTION: orders.filter(order => order.status === 'IN_PRODUCTION'),
    WAITING: orders.filter(order => order.status === 'WAITING'),
  } as const

  return (
    <div className="w-full h-full">
      <PageHeader
        icon={HouseIcon}
        title="Home"
        description="Acompanhe os pedidos dos clientes"
      />

      <div className="w-full flex gap-8">
        {cards.map(card => (
          <Card order={filteredOrders[card.type]} {...card} key={card.type} />
        ))}
      </div>
    </div>
  )
}
