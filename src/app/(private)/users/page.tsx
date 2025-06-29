"use client";

import { UsersRoundIcon } from "lucide-react";
import { PageHeader } from "../components/page-header";
import { useQuery } from "react-query";
import { queryKeys } from "@/lib/query-keys";
import { UsersRepository } from "@/repositories/users-repository";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Spinner } from "@/components/spinner";
import { UserModal } from "./components/users-modal";

export default function HomePage() {
  const { data: users, isLoading } = useQuery({
    queryKey: queryKeys.users(),
    queryFn: async () => UsersRepository.list(),
  });

  return (
    <div className="h-full w-full">
      <PageHeader
        icon={UsersRoundIcon}
        title="Usuários"
        description="Cadastre e gerencie seus usuários"
      />

      <header className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-zinc-800">Usuários</h1>
          <div className="flex size-6 items-center justify-center rounded-sm bg-zinc-200 text-center">
            {isLoading ? <Spinner /> : users?.length}
          </div>
        </div>

        <UserModal buttonLabel="Novo Usuário" />
      </header>

      <DataTable columns={columns} data={users || []} isLoading={isLoading} />
    </div>
  );
}
