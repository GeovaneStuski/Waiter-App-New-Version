import { NotepadText } from "lucide-react";
import { PageHeader } from "../components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductTable } from "./components/ProductTable";
import { TabsContent } from "@radix-ui/react-tabs";
import { CategoryTab } from "./components/categories-tab";

const tabs = [
  {
    key: "products",
    label: "Produto",
  },
  {
    key: "categories",
    label: "Categorias",
  },
] as const;

export default function MenuPage() {
  return (
    <div className="h-full w-full">
      <PageHeader
        icon={NotepadText}
        title="Cardápio"
        description="Gerencie os produtos do seu estabelecimento"
      />

      <Tabs defaultValue="products">
        <TabsList className="my-8 h-fit w-full justify-start rounded-none border-b border-zinc-200 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              className="data-rounded-t-lg h-12 rounded-none px-16 text-sm hover:bg-zinc-100 data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-red-500"
              key={tab.key}
              value={tab.key}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="products">
          <ProductTable />
        </TabsContent>

        <TabsContent value="categories">
          <CategoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
