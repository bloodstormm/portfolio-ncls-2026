"use client";

import { motion } from "framer-motion";
import { fadeInUpBlur } from "@/app/utils/Animations";
import { useTranslations } from "next-intl";

interface ProjectsHeaderProps {
  count: number;
}

export function ProjectsHeader({ count }: ProjectsHeaderProps) {
  const t = useTranslations("projects");
  return (
    <motion.section
      {...fadeInUpBlur}
      className="container mx-auto px-6 pt-16 pb-12 max-w-6xl"
    >
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          {t("label")}
        </span>
        <h1 className="font-Wulkan text-5xl md:text-7xl uppercase tracking-wide leading-none">
          {t("title")}
        </h1>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <p className="text-foreground/60 text-lg max-w-xl leading-relaxed">
            {t("description")}
          </p>
          <span className="text-sm text-muted font-mono">
            {t(count !== 1 ? "count_other" : "count_one", { count })}
          </span>
        </div>
        <div className="w-full h-px bg-beige/30 mt-6" />
      </div>
    </motion.section>
  );
}
