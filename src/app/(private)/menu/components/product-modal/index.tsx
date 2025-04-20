"use client";

import { Product } from "@/@types/entities/product";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductModalImageContainer } from "./components/image-container";
import { ProductModalIngredients } from "./components/ingredients";
import { useQuery } from "react-query";
import { IngredientsRepository } from "@/repositories/ingredients-repository";
import { useProductModal } from "./use-product-modal";
import { FormProvider } from "react-hook-form";
import { Field } from "@/components/field";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/field/label";
import { cn } from "@/lib/utils";
import { ProductModalCategories } from "./components/categories";
import { priceFormatter } from "@/utils/price-formatter";
import { queryKeys } from "@/lib/query-keys";
import { useState } from "react";

type Props = {
  buttonLabel: string | LucideIcon;
  product?: Product;
};

export function ProductModal({ buttonLabel: ButtonLabel, product }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { form, onSubmit, isLoading } = useProductModal({ product, setIsOpen });

  const { watch, reset, setValue, handleSubmit } = form;

  const { data: ingredients } = useQuery({
    queryKey: queryKeys.ingredients(),
    queryFn: async () => IngredientsRepository.list(),
  });

  function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    let rawValue = e.target.value.replace(/[^\d]/g, "");

    if (rawValue) {
      rawValue = (Number(rawValue) / 100).toFixed(2);
    }

    setValue("product.price", Number(rawValue));
  }

  const Trigger =
    typeof ButtonLabel === "string" ? (
      ButtonLabel
    ) : (
      <ButtonLabel className="size-5 text-zinc-500" />
    );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prevState) => !prevState)}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-sm">
          {Trigger}
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="product-modal" size="large">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit, console.error)}>
            <DialogHeader onClose={() => reset()}>
              <DialogTitle className="text-2xl font-semibold">
                {product ? "Editar" : "Novo"} Produto
              </DialogTitle>
            </DialogHeader>

            <div className="flex h-[680px] w-full gap-4">
              <div
                className={cn(
                  "w-full",
                  watch("product.category") ? "space-y-[31px]" : "space-y-4",
                )}
              >
                <ProductModalImageContainer isLoading={false} />

                <Field.Root name="product.name">
                  <Field.Label>Nome do Produto</Field.Label>

                  <Field.Main>
                    <Input placeholder="Ex: Quatro Queijos" />
                  </Field.Main>
                </Field.Root>

                <Field.Root name="product.description">
                  <Field.Label>Descrição</Field.Label>

                  <Field.Main>
                    <Input placeholder="Ex: Pizza de Quatro Queijos com borda tradicional" />
                  </Field.Main>

                  <FieldLabel>Máximo 110 caracteres</FieldLabel>
                </Field.Root>

                <Field.Root name="product.price">
                  <Field.Label>Preço</Field.Label>

                  <Field.Main controller>
                    {({ field: { value } }) => (
                      <Input
                        value={priceFormatter(value)}
                        onChange={handleChangePrice}
                        placeholder="R$ 00,00"
                      />
                    )}
                  </Field.Main>
                </Field.Root>

                <ProductModalCategories />
              </div>

              <ProductModalIngredients ingredients={ingredients} />
            </div>

            <DialogFooter>
              <Button isLoading={isLoading} type="submit">
                {product ? "Editar" : "Novo"} Produto
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
