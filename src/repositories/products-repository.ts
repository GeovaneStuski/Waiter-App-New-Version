import { Product } from '@/@types/entities/product';
import { http } from '../utils/http';
import { CreateOrUpdateProductPayload } from '@/@types/repositories/product';

export const ProductsRepository = {
  list: async () => http.get<Product[]>('/products'),

  create: async (data: CreateOrUpdateProductPayload) => http.post('/products', data),

  update: async (id: string, data: CreateOrUpdateProductPayload) => http.put(`/products/${id}`, data),
  
  delete: async (id: string) => http.delete(`/products/${id}`)
};