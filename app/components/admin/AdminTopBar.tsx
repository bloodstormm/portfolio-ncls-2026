"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BsArrowLeft, BsX } from "react-icons/bs";

type ViewMode = "list" | "form";

interface AdminTopBarProps {
  viewMode: ViewMode;
  editingTitle: string | null;
  onCancel: () => void;
  onLogout: () => void;
}

export function AdminTopBar({ viewMode, editingTitle, onCancel, onLogout }: AdminTopBarProps) {
  const router = useRouter();

  const title =
    viewMode === "list" ? "Projetos" : editingTitle ? "Editar Projeto" : "Novo Projeto";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 border-b border-beige/20 bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
          >
            <BsArrowLeft className="h-3.5 w-3.5" />
            Portfólio
          </button>
          <div className="h-4 w-px bg-beige/40" />
          <span className="font-Wulkan text-lg uppercase text-primary tracking-wide">{title}</span>
        </div>

        <div className="flex items-center gap-4">
          {viewMode === "form" && (
            <button
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
            >
              <BsX className="h-4 w-4" />
              Cancelar
            </button>
          )}
          <button
            onClick={onLogout}
            className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
          >
            Sair
          </button>
        </div>
      </div>
    </motion.header>
  );
}
