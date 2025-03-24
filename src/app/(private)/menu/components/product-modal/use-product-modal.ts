'use client';

import { Product } from '@/@types/product';
import { getImageByPath } from '@/utils/get-image-by-path';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  image: z.string(),
  ingredients: z.array(z.string()),
});

type ProductModalFormData = z.infer<typeof schema>;

export function useProductModal(product?: Product) {
  const form = useForm<ProductModalFormData>({
    resolver: zodResolver(schema),
    defaultValues: { ingredients: [] }
  });

  const { reset, watch } = form;

  useEffect(() => {
    reset(productToFormSchema(product));
  }, [product]);
  return {
    form,
    watch
  };
}

function productToFormSchema(product?: Product) {
  return { 
    ingredients: product?.ingredients.map((ingredient) => ingredient._id),
    image: product?.imagePath && getImageByPath(product.imagePath)
  };
}