"use client";

import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "react-query";

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
