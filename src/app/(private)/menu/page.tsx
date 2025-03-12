import { NotepadText } from 'lucide-react';
import { PageHeader } from '../components/page-header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductTable } from './components/ProductTable';
import { TabsContent } from '@radix-ui/react-tabs';

const tabs = [
  {
    key: 'product',
    label: 'Produto',
    content: ProductTable,
  },
  {
    key: 'category',
    label: 'Categoria',
    content: null,
  },
] as const;

export default async function MenuPage() {
  return (
    <div className="w-full h-full">
      <PageHeader
        icon={NotepadText}
        title="Cardápio"
        description="Gerencie os produtos do seu estabelecimento"
      />

      <Tabs defaultValue="product">
        <TabsList className="border-b h-fit my-8 p-0 bg-transparent border-zinc-200 w-full rounded-none justify-start">
          {tabs.map(tab => (
            <TabsTrigger className="h-12 rounded-none px-16 data-[state=active]:font-semibold data-[state=active]:text-red-500 text-sm data-[state=active]:bg-white data-rounded-t-lg hover:bg-zinc-100" key={tab.key} value={tab.key}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(({ key, content: Content }) => (
          <TabsContent key={key} value={key}>
            {Content && <Content />}
          </TabsContent>
        ))}
      </Tabs>

    </div>
  );
}
