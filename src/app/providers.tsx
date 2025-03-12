'use client'

import { Toaster } from "@/components/ui/sonner";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  )
}