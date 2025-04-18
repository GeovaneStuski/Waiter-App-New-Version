import { Category } from '@/@types/entities/category';
import { http } from '@/utils/http';

export const CategoriesRepository = {
  list: async () => http.get<Category[]>('/categories')
};