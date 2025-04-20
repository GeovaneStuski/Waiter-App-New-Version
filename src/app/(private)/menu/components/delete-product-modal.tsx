import { Product } from "@/@types/entities/product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { ProductsRepository } from "@/repositories/products-repository";
import { getImageByPath } from "@/utils/get-image-by-path";
import { priceFormatter } from "@/utils/price-formatter";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export function DeleteProductModal({ product }: Props) {
  const { mutateAsync: onDeleteProduct, isLoading } = useMutation({
    mutationFn: async (id: string) => ProductsRepository.delete(id),
    onSuccess: () => {
      queryClient.setQueryData(
        queryKeys.products(),
        (oldProducts?: Product[] | undefined) => {
          return (
            oldProducts?.filter(
              (oldProduct) => oldProduct._id !== product._id,
            ) || []
          );
        },
      );
      toast.success("Produto deletado com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao deletar o produto");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon className="size-5 text-red-500" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Produto</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-6 text-center">
          <span className="text-base font-medium">
            Tem certeza que deseja excluir o produto?
          </span>

          <div className="mx-8 flex items-center overflow-hidden rounded-xl border border-zinc-200">
            <img
              className="h-32 w-40 object-cover"
              src={getImageByPath(product.imagePath)}
              alt="product-page"
            />
            <div className="flex flex-col justify-between gap-2.5 p-4 text-start text-base font-medium">
              <span>
                {product.category.icon} {product.category.name}
              </span>
              <span className="font-semibold">{product.name}</span>
              <span>{priceFormatter(product.price)}</span>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="flex w-full items-center !justify-between">
          <AlertDialogCancel>Manter Produto</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              isLoading={isLoading}
              onClick={() => onDeleteProduct(product._id)}
            >
              Excluir Produto
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
