"use client";

import { DataTable } from "@/components/data-table";
import { ProductsRepository } from "@/repositories/products-repository";
import { columns } from "./columns";
import { ProductModal } from "../product-modal";
import { useQuery } from "react-query";
import { queryKeys } from "@/lib/query-keys";
import { Spinner } from "@/components/spinner";

export function ProductTable() {
  const { data: products, isLoading } = useQuery({
    queryKey: queryKeys.products(),
    queryFn: async () => ProductsRepository.list(),
  });

  return (
    <div>
      <header className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-zinc-800">Produtos</h1>
          <div className="flex size-6 items-center justify-center rounded-sm bg-zinc-200 text-center">
            {isLoading ? <Spinner /> : products?.length}
          </div>
        </div>

        <ProductModal buttonLabel="Criar Produto" />
      </header>

      <DataTable
        isLoading={isLoading}
        data={products || []}
        columns={columns}
      />
    </div>
  );
}
