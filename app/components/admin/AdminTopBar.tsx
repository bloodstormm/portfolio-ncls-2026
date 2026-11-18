"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useTheme } from "@/app/hooks/useTheme";

type ViewMode = "list" | "form";

interface AdminTopBarProps {
  viewMode: ViewMode;
  editingTitle: string | null;
  onCancel: () => void;
  onLogout: () => void;
}

export function AdminTopBar({ viewMode, onCancel, onLogout }: AdminTopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="group relative">
            <span className="font-Odasans text-4xl font-bold text-logo">NCLS</span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-logo transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === "form" && (
            <Button variant="ghost" onClick={onCancel} className="h-10 rounded-full px-4">
              <ArrowLeft />
              <span className="hidden sm:inline">Voltar à lista</span>
            </Button>
          )}
          <Button variant="outline" asChild className="hidden h-10 rounded-full px-4 sm:inline-flex">
            <Link href="/" target="_blank">
              Ver site
              <ArrowUpRight />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="size-10 rounded-full"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onLogout}
            aria-label="Sair"
            title="Sair"
            className="size-10 rounded-full"
          >
            <LogOut />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
