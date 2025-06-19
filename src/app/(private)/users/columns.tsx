"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/@types/entities/user";
import { DeleteUserModal } from "./components/delete-user-modal";

const formatedPosition = {
  waiter: "Garçom",
  admin: "Administrador",
} as const;

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    size: 450,
  },
  {
    accessorKey: "email",
    header: "E-mail",
    size: 450,
  },
  {
    accessorKey: "position",
    header: "Cargo",
    size: 450,
    cell: ({ row: { original } }) => formatedPosition[original.position],
  },
  {
    accessorKey: "actions",
    header: "Ações",
    size: 20,
    cell: ({ row: { original } }) => {
      return (
        <div className="flex w-auto gap-10 2xl:w-10">
          {/* <ProductModal product={original} buttonLabel={Edit2Icon} /> */}

          <DeleteUserModal user={original} />
        </div>
      );
    },
  },
];
