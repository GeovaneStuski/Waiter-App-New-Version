"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/@types/entities/user";
import { DeleteUserModal } from "./components/delete-user-modal";
import { UserModal } from "./components/users-modal";
import { Edit2Icon } from "lucide-react";

const formatedPosition = {
  waiter: "Garçom",
  admin: "Administrador",
} as const;

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "position",
    header: "Cargo",
    cell: ({ row: { original } }) => formatedPosition[original.position],
  },
  {
    accessorKey: "actions",
    header: "Ações",
    size: 20,
    cell: ({ row: { original } }) => {
      return (
        <div className="flex w-auto gap-10 2xl:w-10">
          <UserModal user={original} buttonLabel={Edit2Icon} />

          <DeleteUserModal user={original} />
        </div>
      );
    },
  },
];
