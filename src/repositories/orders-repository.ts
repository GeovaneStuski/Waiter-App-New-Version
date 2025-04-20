import { Order } from "@/@types/entities/order";
import { http } from "@/utils/http";

export const OrdersRepository = {
  list: async () => http.get<Order[]>("/orders"),
};
