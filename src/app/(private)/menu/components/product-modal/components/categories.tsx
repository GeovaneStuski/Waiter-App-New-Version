import { Field } from "@/components/field";
import { Loading } from "@/components/loading";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";

export function ProductModalCategories() {
  const { watch } = useFormContext();

  const haveSelectedCategory = watch("product.category");

  const { data: categories, isLoading } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: async () => CategoriesRepository.list(),
  });

  const selectedCategory = useMemo(() => {
    return categories?.find(
      (category) => category._id == watch("product.category"),
    );
  }, [watch("product.category"), categories]);

  return (
    <Field.Root
      className={cn(
        "space-y-1.5",
        haveSelectedCategory && "flex flex-row items-center justify-between",
      )}
      name="product.category"
    >
      <Field.Label>Categoria</Field.Label>

      {!isLoading && (
        <Field.Main controller>
          {({ field: { onChange, value } }) =>
            !haveSelectedCategory ? (
              <div className="grid h-full max-h-[80px] grid-cols-3 gap-2.5 overflow-y-auto">
                {categories?.map((category) => (
                  <button
                    onClick={() => onChange(category._id)}
                    data-selected={category._id === value}
                    className="flex justify-center space-x-1 rounded-full border border-zinc-200 px-4 py-2.5 text-sm data-[selected=true]:border-red-500"
                    key={category._id}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => onChange("")}
                className="flex w-fit justify-center space-x-1 rounded-full border border-zinc-200 px-4 py-2.5 text-sm data-[selected=true]:border-red-500"
              >
                <span>{selectedCategory?.icon}</span>
                <span>{selectedCategory?.name}</span>
                <span className="font-semibold text-red-500">Alterar</span>
              </button>
            )
          }
        </Field.Main>
      )}

      {isLoading && <Loading customMessage="Carregando categorias..." />}
    </Field.Root>
  );
}
