import { Order } from "@/@types/order";
import { http } from "@/utils/http";

export const OrdersRepository = {
  list: async () => {
    const response = await http.get<Order[]>('/orders');

    return response.data;
  }
}