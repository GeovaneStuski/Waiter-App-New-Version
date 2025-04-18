
'use client';

import { DataTable } from '@/components/data-table';
import { ProductsRepository } from '@/repositories/products-repository';
import { columns } from './columns';
import { ProductModal } from '../product-modal';
import { useQuery } from 'react-query';
import { queryKeys } from '@/utils/query-keys';

export function ProductTable() {
  const { data: products } = useQuery({
    queryKey: queryKeys.products(),
    queryFn: async () => ProductsRepository.list()
  });

  return (
    <div>
      <header className="w-full flex justify-between  mb-4 items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-zinc-800">Produtos</h1>
          <span className="size-6 bg-zinc-200 text-center rounded-sm">{products?.length}</span>
        </div>

        <ProductModal buttonLabel="Criar Produto"/>
      </header>
      
      <DataTable data={products || []} columns={columns} />
    </div>
  );
}