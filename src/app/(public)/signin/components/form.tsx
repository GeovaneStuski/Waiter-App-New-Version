'use client'

import { FormProvider } from "react-hook-form";
import { useSignin } from "../useSignin";
import { Field } from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Form() {
  const { form, onSubmit } = useSignin();

  const { handleSubmit, formState: { errors }, watch } = form;

  return (
    <FormProvider {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit, console.error)}>
        <Field.Root name="email">
          <Field.Label>E-mail</Field.Label>

          <Field.Main>
            <Input placeholder="nome@exemplo.com" />
          </Field.Main>

          <Field.Error />
        </Field.Root>

        <Field.Root name="password">
          <Field.Label>Senha</Field.Label>

          <Field.Main>
            <Input placeholder="******" />
          </Field.Main>

          <Field.Error />
        </Field.Root>

        <Button disabled={Object.keys(errors).length > 0 || !watch('email') || !watch('password')} className="w-full rounded-full h-12 bg-red-500 hover:bg-red-400 disabled:bg-zinc-400">Fazer Login</Button>
      </form>
    </FormProvider>
  )
}