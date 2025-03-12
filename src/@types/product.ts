import { Category } from './category';
import { Ingredient } from './ingredients';

export type Product = {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: Ingredient[];
  category: Category;
};

export type OrderProduct = {
  _id: string;
  quantity: number;
  product: Product;
}