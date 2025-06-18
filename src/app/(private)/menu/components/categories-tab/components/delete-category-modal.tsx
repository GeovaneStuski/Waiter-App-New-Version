import { Category } from "@/@types/entities/category";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

type Props = {
  category: Category;
};

export function DeleteCategoryModal({ category }: Props) {
  const { mutateAsync: onDeleteCategory, isLoading } = useMutation({
    mutationFn: async (id: string) => CategoriesRepository.delete(id),
    onSuccess: () => {
      queryClient.setQueryData(
        queryKeys.categories(),
        (oldProducts?: Category[] | undefined) => {
          return (
            oldProducts?.filter(
              (oldCategory) => oldCategory._id !== category._id,
            ) || []
          );
        },
      );
      toast.success("Categoria deletada com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao deletar a categoria");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon className="size-5 text-red-500" />
      </AlertDialogTrigger>

      <AlertDialogContent
        id="delete-product-modal"
        aria-describedby="delete-product-modal"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription className="flex flex-col items-center gap-4">
          <span>Tem certeza que deseja excluir a categoria?</span>

          <div className="flex h-11 w-fit items-center gap-1 rounded-full border border-zinc-200 px-4">
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className="flex w-full items-center !justify-between">
          <AlertDialogCancel>Manter Categoria</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              isLoading={isLoading}
              onClick={() => onDeleteCategory(category._id)}
            >
              Excluir Categoria
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
