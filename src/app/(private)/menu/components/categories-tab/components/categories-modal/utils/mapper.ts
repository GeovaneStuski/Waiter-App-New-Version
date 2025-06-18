import { CategoriesModalFormData } from "../use-categories-modal";
import { CreateOrUpdateCategoryPayload } from "@/@types/repositories/category";

export function CategoryFormSchemaToCategory({
  category,
}: CategoriesModalFormData) {
  return {
    name: category.name,
    icon: category.icon,
  } satisfies CreateOrUpdateCategoryPayload;
}
