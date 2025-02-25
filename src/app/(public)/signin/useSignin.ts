'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from 'react-query'
import { AuthRepository } from "@/repositories/auth-repository"
import { SigninPayload } from "@/@types/auth-repository"
import axios from "axios"
import { toast } from 'sonner'
import { cookiesName } from "@/utils/cookiesNames"
import { setCookie } from "cookies-next/client"

const formSchema = z.object({
  email: z.string().min(1, 'campo obrigatório'),
  password: z.string().min(1, 'campo obrigatório').min(5, 'A senha é muito curta'),
})

export function useSignin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const { mutateAsync: Signin } = useMutation({
    mutationFn: async (body: SigninPayload) => AuthRepository.Signin(body)
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await Signin(data);

      setCookie(cookiesName.NEXT_AUTH_AUTHORIZATION, response.token);

      toast.success('Logado com sucesso!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 400) {
          toast.error('Credenciais inválidas')
        }
      }
    }
  }

  return {
    form,
    onSubmit
  }
}