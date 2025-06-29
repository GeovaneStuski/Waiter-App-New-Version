"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { UserFormSchemaToUser } from "./utils/mapper";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { User, Position } from "@/@types/entities/user";
import { CreateOrUpdateUserPayload } from "@/@types/repositories/users";
import { UsersRepository } from "@/repositories/users-repository";

type Props = {
  user?: User;
  setIsOpen: (value: boolean) => void;
};

const schema = z.object({
  user: z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Campo obrigatório"),
    email: z.string().email("E-mail inválido").min(1, "Campo obrigatório"),
    password: z.string().min(1, "Campo obrigatório"),
    position: z.nativeEnum(Position).default(Position.waiter),
  }),
});

export type UserModalFormData = z.infer<typeof schema>;

export function useUserModal({ user, setIsOpen }: Props) {
  const form = useForm<UserModalFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: {
        position: Position.waiter,
      },
    },
  });

  const { isLoading: isCreatingUser, mutateAsync: createUser } = useMutation({
    mutationFn: async (data: CreateOrUpdateUserPayload) =>
      UsersRepository.create(data),
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao criar o usuário!");
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.users(),
        (oldData: User[] | undefined) => oldData!.concat(data as User),
      );
      toast.success("Usuário criado com sucesso!");
      setIsOpen(false);
    },
  });

  const { isLoading: isUpdatingUser, mutateAsync: updateUser } = useMutation({
    mutationFn: async (data: CreateOrUpdateUserPayload) =>
      UsersRepository.update(user!._id, data),
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao editar o usuário!");
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.users(),
        (oldData: User[] | undefined) => {
          if (!oldData) return [];

          return oldData.map((user) =>
            user._id === (data as User)._id ? (data as User) : user,
          );
        },
      );
      toast.success("Usuário atualizado com sucesso!");
      setIsOpen(false);
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset(userToFormSchema(user));
  }, [user]);

  async function onSubmit(data: UserModalFormData) {
    const method = user ? updateUser : createUser;

    const response = await method(UserFormSchemaToUser(data));

    return response;
  }

  return {
    form,
    onSubmit,
    isLoading: isCreatingUser || isUpdatingUser,
  };
}

function userToFormSchema(user?: User) {
  return {
    user: {
      id: user?._id || "",
      email: user?.email || "",
      name: user?.name || "",
      password: user?.password || "",
      position:
        Position[user?.position as keyof typeof Position] || Position.waiter,
    },
  } satisfies UserModalFormData;
}
