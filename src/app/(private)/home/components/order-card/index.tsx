import { Order } from "@/@types/entities/order";
import { OrderCard } from "./order-card";

type CardProps = {
  icon: string;
  title: string;
  orders: Order[];
};

export function Card({ icon, title, orders }: CardProps) {
  return (
    <OrderCard.Container>
      <OrderCard.Header icon={icon} title={title} />

      <div className="w-full space-y-4">
        {orders.map((order) => (
          <OrderCard.Card
            key={order._id}
            status={{ icon, title }}
            order={order}
          />
        ))}
      </div>
    </OrderCard.Container>
  );
}
