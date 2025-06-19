import { User } from "@/@types/entities/user";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { UsersRepository } from "@/repositories/users-repository";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

type Props = {
  user: User;
};

export function DeleteUserModal({ user }: Props) {
  const { mutateAsync: onDeleteUser, isLoading } = useMutation({
    mutationFn: async (id: string) => UsersRepository.delete(id),
    onSuccess: () => {
      queryClient.setQueryData(
        queryKeys.users(),
        (oldUsers?: User[] | undefined) => {
          return oldUsers?.filter((oldUser) => oldUser._id !== user._id) || [];
        },
      );
      toast.success("Usuário deletado com sucesso!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao deletar o usuário");
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
          <AlertDialogTitle>Excluir Usuário</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-6 py-4 text-center">
          <span className="text-base font-medium">
            Tem certeza que deseja excluir o usuário?
          </span>

          <div className="space-y-6">
            <div className="space-y-1 text-start">
              <Label className="opacity-50">Nome</Label>
              <Input disabled value={user.name} />
            </div>

            <div className="space-y-1 text-start">
              <Label className="opacity-50">E-mail</Label>
              <Input disabled value={user.email} />
            </div>
          </div>
        </div>

        <AlertDialogFooter className="flex w-full items-center !justify-between">
          <AlertDialogCancel>Manter Usuário</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              isLoading={isLoading}
              onClick={() => onDeleteUser(user._id)}
            >
              Excluir Usuário
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
