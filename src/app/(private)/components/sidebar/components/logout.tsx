'use client'

import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { PowerIcon } from "lucide-react";
import { deleteCookie } from 'cookies-next/client'
import { cookiesName } from "@/utils/cookiesNames";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();

  function handleLogout() {
    deleteCookie(cookiesName['NEXT_AUTH_AUTHORIZATION']);
    router.push('/signin')
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className='size-[108px] hover:text-zinc-600 flex duration-200 items-center justify-center flex-col gap-2 font-semibold text-zinc-500 text-sm'>
        <PowerIcon className='size-6' />

        <span>Sair</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja sair?</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>Tem certeza que deseja sair de sua conta?</AlertDialogDescription>

        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel>Manter-se conectado</AlertDialogCancel>

          <AlertDialogAction onClick={handleLogout}>Sair</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 