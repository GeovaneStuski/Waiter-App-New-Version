/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Category } from "@/@types/category"
import { Product } from "@/@types/product"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { ProductsRepository } from "@/repositories/products-repository"
import { priceFormatter } from "@/utils/price-formatter"
import { ColumnDef } from "@tanstack/react-table"
import { Edit2Icon, Trash2Icon } from "lucide-react"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'imagePath',
    header: 'Imagem',
    size: 20,
    cell: () => (
      <img className="w-12 h-8 object-cover  rounded-lg" src={"https://www.minhareceita.com.br/app/uploads/2022/12/Dpizza-de-pepperoni-caseira-portal-minha-receita.jpg"} />
    )
  },
  {
    accessorKey: 'name',
    header: "Nome",
    size: 450
  },
  {
    accessorKey: 'category',
    header: "Categoria",
    size: 20,

    cell: ({ getValue }) => `${(getValue() as Category).icon} ${(getValue() as Category).name}`
  },
  {
    accessorKey: 'price',
    header: "Preço",
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
          <button>
            <Edit2Icon className="size-5 text-zinc-500" />
          </button>

          <AlertDialog>
            <AlertDialogTrigger>
              <Trash2Icon className="size-5 text-red-500" />
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Produto</AlertDialogTitle>
              </AlertDialogHeader>

              <div className="space-y-6 text-center">
                <span className="text-base font-medium">Tem certeza que deseja excluir o produto?</span>

                <div className="flex items-center border border-zinc-200 rounded-xl mx-8 overflow-hidden">
                  <img className="object-cover w-40 h-32" src="https://www.minhareceita.com.br/app/uploads/2022/12/Dpizza-de-pepperoni-caseira-portal-minha-receita.jpg" alt="product-page" />
                  <div className="flex flex-col text-base font-medium p-4 justify-between gap-2.5 text-start">
                    <span>{original.category.icon} {original.category.name}</span>
                    <span className="font-semibold">{original.name}</span>
                    <span>{priceFormatter(original.price)}</span>
                  </div>
                </div>
              </div>

              <AlertDialogFooter className="w-full flex !justify-between items-center">
                <AlertDialogCancel>Manter Produto</AlertDialogCancel>
                <AlertDialogAction onClick={() => ProductsRepository.delete(original._id)}>Excluir Produto</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    }
  },
]