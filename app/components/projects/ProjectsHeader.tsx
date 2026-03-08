"use client";

import { motion } from "framer-motion";
import { fadeInUpBlur } from "@/app/utils/Animations";

interface ProjectsHeaderProps {
  count: number;
}

export function ProjectsHeader({ count }: ProjectsHeaderProps) {
  return (
    <motion.section
      {...fadeInUpBlur}
      className="container mx-auto px-6 pt-16 pb-12 max-w-6xl"
    >
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          Portfólio
        </span>
        <h1 className="font-Wulkan text-5xl md:text-7xl uppercase tracking-wide leading-none">
          Projetos
        </h1>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <p className="text-foreground/60 text-lg max-w-xl leading-relaxed">
            Uma seleção dos meus trabalhos em UX/UI Design e Desenvolvimento Front-end.
          </p>
          <span className="text-sm text-muted font-mono">
            {count} projeto{count !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="w-full h-px bg-beige/30 mt-6" />
      </div>
    </motion.section>
  );
}
