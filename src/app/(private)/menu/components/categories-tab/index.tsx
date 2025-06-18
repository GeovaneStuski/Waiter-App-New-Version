"use client";

import { DataTable } from "@/components/data-table";
import { Spinner } from "@/components/spinner";
import { queryKeys } from "@/lib/query-keys";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { CategoriesModal } from "./components/categories-modal";

export function CategoryTab() {
  const { data: categories, isLoading } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: async () => CategoriesRepository.list(),
  });

  return (
    <div>
      <header className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-zinc-800">Categorias</h1>
          <div className="flex size-6 items-center justify-center rounded-sm bg-zinc-200 text-center">
            {isLoading ? <Spinner /> : categories?.length}
          </div>
        </div>

        <CategoriesModal buttonLabel="Nova Categoria" />
      </header>

      <DataTable
        isLoading={isLoading}
        data={categories || []}
        columns={columns}
      />
    </div>
  );
}
