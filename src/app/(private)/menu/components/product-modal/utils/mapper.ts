import { CreateOrUpdateProductPayload } from '@/@types/repositories/product';
import { ProductModalFormData } from '../use-product-modal';


export function ProductFormSchemaToProduct({ product }: ProductModalFormData) {
  return {
    category: product.category,
    description: product.description,
    name: product.name,
    price: product.price.toString(),
    ingredients: product.ingredients,
    image: product.image,
  } satisfies CreateOrUpdateProductPayload;
}