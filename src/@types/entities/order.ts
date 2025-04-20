import { OrderProduct } from "./product";

export type Order = {
  _id: string;
  table: string;
  status: OrderStatus;
  finishedAt: string;
  createdAt: string;
  user: string;
  products: OrderProduct[];
};

export type OrderStatus = "DONE" | "WAITING" | "IN_PRODUCTION";
