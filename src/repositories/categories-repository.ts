import { Category } from "@/@types/entities/category";
import { CreateOrUpdateCategoryPayload } from "@/@types/repositories/category";
import { http } from "@/utils/http";

export const CategoriesRepository = {
  list: async () => http.get<Category[]>("/categories"),
  create: async (data: CreateOrUpdateCategoryPayload) =>
    http.post<Category>(`/categories`, data),
  update: async (id: string, data: CreateOrUpdateCategoryPayload) =>
    http.put<Category>(`/categories/${id}`, data),
  delete: async (id: string) => http.delete(`/categories/${id}`),
};
