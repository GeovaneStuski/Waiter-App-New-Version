import { Ingredient } from '@/@types/ingredients';
import { http } from '@/utils/http';

export const IngredientsRepository = {
  list: async () => http.get<Ingredient[]>('/ingredients')
};