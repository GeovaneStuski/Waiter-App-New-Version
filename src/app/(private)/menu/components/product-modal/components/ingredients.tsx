"use client";

import { Ingredient } from "@/@types/entities/ingredients";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {
  ingredients?: Ingredient[];
};

export function ProductModalIngredients({ ingredients }: Props) {
  const [searchParam, setSearchParam] = useState("");

  const { watch, control, setValue } = useFormContext();

  const { append } = useFieldArray({
    control,
    name: "product.ingredients",
  });

  function handleRemoveIngredient(id: string) {
    const ingredients = watch("product.ingredients") as string[];

    const filteredIngredients = ingredients.filter(
      (ingredientId) => ingredientId !== id,
    );

    setValue("product.ingredients", filteredIngredients);
  }

  const filteredIngredients = useMemo(
    () =>
      ingredients?.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchParam.toLowerCase()),
      ),
    [ingredients, searchParam],
  );

  return (
    <div className="h-full w-full space-y-6">
      <header className="flex items-center justify-between">
        <DialogTitle className="text-lg font-semibold text-gray-500">
          Ingredientes
        </DialogTitle>

        <Button variant="destructive" className="text-sm">
          Novo ingrediente
        </Button>
      </header>

      <div>
        <label className="mb-1 text-sm">Busque o ingrediente</label>

        <Input
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          type="text"
          placeholder="Ex: Queijo"
        />
      </div>

      <div className="custom-scrollbar h-full max-h-[520px] space-y-1 overflow-y-auto">
        {filteredIngredients &&
          filteredIngredients.map(({ icon, _id, name }) => (
            <label
              data-selected={watch("product.ingredients")?.includes(_id)}
              className="flex cursor-pointer items-center justify-between rounded-lg border p-4 text-sm data-[selected=true]:border-red-500"
              key={_id}
            >
              <div className="space-x-2">
                <span className="size-6">{icon}</span>
                <span className="text-gray-600">{name}</span>
              </div>

              <Checkbox
                checked={watch("product.ingredients")?.includes(_id)}
                onCheckedChange={(checked) =>
                  checked ? append(_id) : handleRemoveIngredient(_id)
                }
              />
            </label>
          ))}
      </div>
    </div>
  );
}
