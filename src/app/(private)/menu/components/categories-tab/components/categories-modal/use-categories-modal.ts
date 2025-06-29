"use client";

import { Category } from "@/@types/entities/category";
import { CreateOrUpdateCategoryPayload } from "@/@types/repositories/category";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";
import { CategoryFormSchemaToCategory } from "./utils/mapper";

const formSchema = z.object({
  category: z.object({
    id: z.string().optional(),
    name: z.string(),
    icon: z.string(),
  }),
});

type Props = {
  category?: Category;
  setIsOpen: (open: boolean) => void;
};

export type CategoriesModalFormData = z.infer<typeof formSchema>;

export function UseCategoriesModal({ category, setIsOpen }: Props) {
  const form = useForm<CategoriesModalFormData>({
    resolver: zodResolver(formSchema),
  });

  const { reset } = form;

  useEffect(() => {
    reset(categoryToFormSchema(category));
  }, [category]);

  const { isLoading: isCreatingCategory, mutateAsync: createCategory } =
    useMutation({
      mutationFn: async (data: CreateOrUpdateCategoryPayload) =>
        CategoriesRepository.create(data),
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao criar a categoria!");
      },
      onSuccess: (data) => {
        queryClient.setQueryData(
          queryKeys.categories(),
          (oldData: Category[] | undefined) =>
            oldData!.concat(data as Category),
        );
        toast.success("Categoria criada com sucesso!");
        setIsOpen(false);
      },
    });

  const { isLoading: isUpdatingCategory, mutateAsync: updateCategory } =
    useMutation({
      mutationFn: async (data: CreateOrUpdateCategoryPayload) =>
        CategoriesRepository.update(category!._id, data),
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao editar a categoria!");
      },
      onSuccess: (data) => {
        queryClient.setQueryData(
          queryKeys.categories(),
          (oldData: Category[] | undefined) => {
            if (!oldData) return [];

            return oldData.map((category) =>
              category._id === (data as Category)._id
                ? (data as Category)
                : category,
            );
          },
        );
        toast.success("Categoria atualizada com sucesso!");
        setIsOpen(false);
      },
    });

  async function onSubmit(data: CategoriesModalFormData) {
    const method = category ? updateCategory : createCategory;

    const response = await method(CategoryFormSchemaToCategory(data));

    return response;
  }

  return {
    form,
    isLoading: isUpdatingCategory || isCreatingCategory,
    onSubmit,
  };
}

function categoryToFormSchema(category?: Category) {
  return {
    category: {
      icon: category?.icon || "",
      name: category?.name || "",
      id: category?._id || "",
    },
  } satisfies CategoriesModalFormData;
}
