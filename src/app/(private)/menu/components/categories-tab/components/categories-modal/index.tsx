"use client";

import { Category } from "@/@types/entities/category";
import { Field } from "@/components/field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { UseCategoriesModal } from "./use-categories-modal";
import { Input } from "@/components/ui/input";

type Props = {
  buttonLabel: string | LucideIcon;
  category?: Category;
};

export function CategoriesModal({ buttonLabel: ButtonLabel, category }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { form, onSubmit, isLoading } = UseCategoriesModal({
    category,
    setIsOpen,
  });

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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, console.error)}
            className="space-y-8"
          >
            <Field.Root name="category.icon">
              <Field.Label>Emoji</Field.Label>

              <Field.Main>
                <Input placeholder="Ex: 🧀" />
              </Field.Main>
            </Field.Root>

            <Field.Root name="category.name">
              <Field.Label>Nome da Categoria</Field.Label>

              <Field.Main>
                <Input placeholder="Ex: Lanches" />
              </Field.Main>
            </Field.Root>

            <DialogFooter>
              <Button isLoading={isLoading} variant="default">
                Cadastrar Categoria
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
