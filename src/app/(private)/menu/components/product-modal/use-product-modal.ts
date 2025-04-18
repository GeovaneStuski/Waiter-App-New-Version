'use client';

import { Product } from '@/@types/entities/product';
import { ProductsRepository } from '@/repositories/products-repository';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';
import { ProductFormSchemaToProduct } from './utils/mapper';
import { CreateOrUpdateProductPayload } from '@/@types/repositories/product';

const schema = z.object({
  product: z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Campo obrigatório'),
    description: z.string().min(1, 'Campo obrigatório'),
    category: z.string(),
    price: z.coerce.number().min(1, 'Campo obrigatório'),
    image: z.any(),
    ingredients: z.array(z.string()),
  })
});

export type ProductModalFormData = z.infer<typeof schema>;

export function useProductModal(product?: Product) {
  const form = useForm<ProductModalFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      product: { 
        ingredients: []
      }}
  });

  const { isLoading: isCreatingProduct, mutateAsync: createProduct } = useMutation({
    mutationFn: (data: CreateOrUpdateProductPayload) => ProductsRepository.create(data)
  });

  const { isLoading: isUpdatingProduct, mutateAsync: updateProduct } = useMutation({
    mutationFn: (data: CreateOrUpdateProductPayload) => ProductsRepository.update(product!._id, data)
  });

  const { reset } = form;

  useEffect(() => {
    reset(productToFormSchema(product));
  }, [product]);

  async function onSubmit(data: ProductModalFormData) {
    try {
      const method = product ? updateProduct : createProduct;

      const response = await method(ProductFormSchemaToProduct(data));

      return response;
    } catch(err) {
      console.log('Error: ', err);
    }
  }
  
  return {
    form,
    onSubmit,
    isLoading: isCreatingProduct || isUpdatingProduct
  };
}

function productToFormSchema(product?: Product) {
  return { 
    product: {
      id: product?._id,
      ingredients: product?.ingredients.map((ingredient) => ingredient._id) || [],
      image: product?.imagePath,
      category: product?.category._id || '',
      description: product?.description || '',
      name: product?.name || '',
      price: product?.price || 0
    }
  } satisfies ProductModalFormData;
}