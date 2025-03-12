import { Product } from "@/@types/product";
import { http as server } from "@/utils/server-http";
import { http as client } from "@/utils/client-http";

export const ProductsRepository = {
  list: async () => {
    const response = await server.get<Product[]>('/products');

    return response.data;
  },
  delete: async (id: string) => {
    const response = await client.delete(`/products/${id}`);

    return response.data;
  }
}