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
        expand={true}
        closeButton
      />
    </>
  );
}