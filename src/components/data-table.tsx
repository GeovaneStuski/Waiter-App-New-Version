"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { UtensilsCrossedIcon } from "lucide-react";
import { ProductModal } from "@/app/(private)/menu/components/product-modal";

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading: boolean;
};

export function DataTable<TData>({ columns, data, isLoading }: Props<TData>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((header) => (
            <TableRow className="h-[52px] bg-zinc-100" key={header.id}>
              {header.headers.map((header) => (
                <TableHead
                  className="text-gray-700"
                  style={{ width: `${header.getSize()}px` }}
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {!isLoading && data.length > 0 && (
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow className="bg-white" key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell
                    style={{ width: `${cell.column.getSize()}px` }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {isLoading ? (
        <div className="flex w-full animate-pulse flex-col items-center space-y-1 py-2 font-medium">
          <UtensilsCrossedIcon className="size-10 text-zinc-600" />
          <span>Carregando...</span>
        </div>
      ) : (
        <div className="flex justify-center space-x-1 py-4">
          <span>Nenhum Produto cadastrado ainda? clique</span>
          <ProductModal buttonLabel="Aqui" />
        </div>
      )}
    </div>
  );
}
