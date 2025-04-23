"use client";

import { Product } from "@/@types/entities/product";
import { ProductsRepository } from "@/repositories/products-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { ProductFormSchemaToProduct } from "./utils/mapper";
import { CreateOrUpdateProductPayload } from "@/@types/repositories/product";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";

type Props = {
  product?: Product;
  setIsOpen: (value: boolean) => void;
};

const schema = z.object({
  product: z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Campo obrigatório"),
    description: z.string().min(1, "Campo obrigatório"),
    category: z.string(),
    price: z.coerce.number().min(1, "Campo obrigatório"),
    image: z.any(),
    ingredients: z.array(z.string()),
  }),
});

export type ProductModalFormData = z.infer<typeof schema>;

export function useProductModal({ product, setIsOpen }: Props) {
  const form = useForm<ProductModalFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      product: {
        ingredients: [],
      },
    },
  });

  const { isLoading: isCreatingProduct, mutateAsync: createProduct } =
    useMutation({
      mutationFn: async (data: CreateOrUpdateProductPayload) =>
        ProductsRepository.create(data),
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao criar o produto!");
      },
      onSuccess: (data) => {
        queryClient.setQueryData(
          queryKeys.products(),
          (oldData: Product[] | undefined) => oldData!.concat(data as Product),
        );
        toast.success("Produto criado com sucesso!");
        setIsOpen(false);
      },
    });

  const { isLoading: isUpdatingProduct, mutateAsync: updateProduct } =
    useMutation({
      mutationFn: async (data: CreateOrUpdateProductPayload) =>
        ProductsRepository.update(product!._id, data),
      onError: (error) => {
        console.error(error);
        toast.error("Erro ao editar o produto!");
      },
      onSuccess: (data) => {
        queryClient.setQueryData(
          queryKeys.products(),
          (oldData: Product[] | undefined) => {
            if (!oldData) return [];

            return oldData.map((product) =>
              product._id === (data as Product)._id
                ? (data as Product)
                : product,
            );
          },
        );
        toast.success("Produto atualizado com sucesso!");
        setIsOpen(false);
      },
    });

  const { reset } = form;

  useEffect(() => {
    reset(productToFormSchema(product));
  }, [product]);

  async function onSubmit(data: ProductModalFormData) {
    const method = product ? updateProduct : createProduct;

    const response = await method(ProductFormSchemaToProduct(data));

    return response;
  }

  return {
    form,
    onSubmit,
    isLoading: isCreatingProduct || isUpdatingProduct,
  };
}

function productToFormSchema(product?: Product) {
  return {
    product: {
      id: product?._id || "",
      ingredients:
        product?.ingredients.map((ingredient) => ingredient._id) || [],
      image: product?.imagePath || null,
      category: product?.category._id || "",
      description: product?.description || "",
      name: product?.name || "",
      price: product?.price || 0,
    },
  } satisfies ProductModalFormData;
}
