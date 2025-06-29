"use client";

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
import { FormProvider } from "react-hook-form";
import { Field } from "@/components/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Position, User } from "@/@types/entities/user";
import { useUserModal } from "./use-user-modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Props = {
  buttonLabel: string | LucideIcon;
  user?: User;
};

export function UserModal({ buttonLabel: ButtonLabel, user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { form, onSubmit, isLoading } = useUserModal({ user, setIsOpen });

  const { reset, handleSubmit } = form;

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
        <Button variant="destructive" className="h-fit text-sm">
          {Trigger}
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="product-modal-description"
        size="default"
      >
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit, console.error)}>
            <DialogHeader onClose={() => reset()}>
              <DialogTitle className="text-2xl font-semibold">
                {user ? "Editar" : "Novo"} Usuário
              </DialogTitle>
            </DialogHeader>

            <div className="w-full space-y-6 py-6">
              <Field.Root name="user.name">
                <Field.Label>Nome</Field.Label>

                <Field.Main>
                  <Input placeholder="Fulano de Tal" />
                </Field.Main>

                <Field.Error />
              </Field.Root>

              <Field.Root name="user.email">
                <Field.Label>E-mail</Field.Label>

                <Field.Main>
                  <Input type="email" placeholder="fulano@gmail.com" />
                </Field.Main>

                <Field.Error />
              </Field.Root>

              <Field.Root name="user.password">
                <Field.Label>Senha</Field.Label>

                <Field.Main controller>
                  {({ field }) => (
                    <Input {...field} type="password" placeholder="****" />
                  )}
                </Field.Main>

                <Field.Error />
              </Field.Root>

              <Field.Root name="user.position">
                <Field.Label>Tipo</Field.Label>

                <Field.Main controller>
                  {({ field: { value } }) => (
                    <RadioGroup
                      className="mt-2 flex items-center"
                      defaultValue={value || Position.waiter}
                      defaultChecked
                    >
                      <Label className="flex items-center gap-2">
                        <RadioGroupItem value={Position.admin} />
                        Admin
                      </Label>

                      <Label className="flex items-center gap-2">
                        <RadioGroupItem value={Position.waiter} />
                        Garçom
                      </Label>
                    </RadioGroup>
                  )}
                </Field.Main>

                <Field.Error />
              </Field.Root>
            </div>

            <DialogFooter>
              <Button
                className="data-[creation=true]:w-full"
                data-creation={!user}
                isLoading={isLoading}
                type="submit"
              >
                Cadastrar usuário
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
