'use client';

import { Category } from '@/@types/category';
import { Product } from '@/@types/product';
import { priceFormatter } from '@/utils/price-formatter';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon } from 'lucide-react';
import { ProductModal } from '../product-modal';
import { DeleteProductModal } from '../delete-product-modal';
import { getImageByPath } from '@/utils/get-image-by-path';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'imagePath',
    header: 'Imagem',
    size: 20,
    cell: ({ row: { original } }) => (
      <img className="w-12 h-8 object-cover  rounded-lg" src={original.imagePath ? getImageByPath(original.imagePath) : 'https://www.minhareceita.com.br/app/uploads/2022/12/Dpizza-de-pepperoni-caseira-portal-minha-receita.jpg'} />
    )
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    size: 450
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    size: 20,

    cell: ({ getValue }) => `${(getValue() as Category).icon} ${(getValue() as Category).name}`
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    size: 20,

    cell: ({ getValue }) => priceFormatter(getValue() as number)
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    size: 20,
    cell: ({ row: { original } }) => {
      return (
        <div className="gap-10 flex 2xl:w-10 w-auto">
          <ProductModal product={original} buttonLabel={Edit2Icon}/>

          <DeleteProductModal product={original}/>
        </div>
      );
    }
  },
];