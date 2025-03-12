import { Order } from "@/@types/order";
import { http } from "@/utils/server-http";

export const OrdersRepository = {
  list: async () => {
    const response = await http.get<Order[]>('/orders');

    return response.data;
  }
}