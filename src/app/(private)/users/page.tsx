import { UsersRoundIcon } from "lucide-react";
import { PageHeader } from "../components/page-header";

export default async function HomePage() {
  return (
    <div className="h-full w-full">
      <PageHeader
        icon={UsersRoundIcon}
        title="Usuários"
        description="Cadastre e gerencie seus usuários"
      />
    </div>
  );
}
