import { Product } from '@/@types/product';
import { http } from '../utils/http';
import { http as client } from '@/utils/client-http';

export const ProductsRepository = {
  list: async () => http.get<Product[]>('/products'),
  
  delete: async (id: string) => {
    const response = await client.delete(`/products/${id}`);

    return response.data;
  }
};