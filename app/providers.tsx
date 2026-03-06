"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();

  return (
    <>
      {children}

      {/* Overlay de transição entre rotas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="pointer-events-none fixed inset-0 z-50 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.div
          key={pathname + "-enter"}
          className="pointer-events-none fixed inset-0 z-50 bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </>
  );
}