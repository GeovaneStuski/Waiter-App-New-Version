import { Ingredient } from '@/@types/entities/ingredients';
import { http } from '@/utils/http';

export const IngredientsRepository = {
  list: async () => http.get<Ingredient[]>('/ingredients')
};