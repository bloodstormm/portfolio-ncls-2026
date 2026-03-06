"use client";

import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}

      {/* Toast Provider */}
      <Toaster
        position="top-right"
        richColors
        expand={true}
        theme="light"
        closeButton
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid hsl(var(--beige) / 0.3)',
            color: 'hsl(var(--primary))',
          },
        }}
      />
    </>
  );
}