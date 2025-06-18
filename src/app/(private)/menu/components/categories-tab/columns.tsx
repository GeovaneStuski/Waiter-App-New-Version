import { Category } from "@/@types/entities/category";
import { ColumnDef } from "@tanstack/react-table";
import { CategoriesModal } from "./components/categories-modal";
import { Edit2Icon } from "lucide-react";
import { DeleteCategoryModal } from "./components/delete-category-modal";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "icon",
    header: "Icone",
    size: 20,
    cell: ({ row: { original } }) => original.icon,
  },
  {
    accessorKey: "name",
    header: "Nome",
    size: 800,
    cell: ({ row: { original } }) => original.name,
  },
  {
    accessorKey: "actions",
    header: "Ações",
    size: 20,
    cell: ({ row: { original } }) => {
      return (
        <div className="flex w-auto gap-10 2xl:w-10">
          <CategoriesModal category={original} buttonLabel={Edit2Icon} />

          <DeleteCategoryModal category={original} />
        </div>
      );
    },
  },
];
