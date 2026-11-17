"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DotGrid, Rings } from "@/app/components/home/Decor";
import { HomeCards } from "@/app/components/home/HomeCards";
import { Button } from "@/app/components/ui/button";
import { WordsStagger } from "@/app/components/ui/words-stagger";
import { cn } from "@/app/lib/utils";
import type { Project } from "@/app/types/projects";
import { ProjectsList } from "./ProjectsList";

type DisciplineFilter = "all" | "design" | "development" | "both";

const filterOptions: DisciplineFilter[] = [
  "all",
  "design",
  "development",
  "both",
];
const ease = [0.16, 1, 0.3, 1] as const;

export function ProjectsContent({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState<DisciplineFilter>("all");

  const count = (option: DisciplineFilter) =>
    option === "all"
      ? projects.length
      : projects.filter((project) => project.discipline === option).length;
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.discipline === activeFilter);

  return (
    <>
      {/* Heading */}
      <section className="relative overflow-hidden">
        <Rings className="absolute -right-40 -top-40 hidden h-[30rem] w-[30rem] text-primary/30 [mask-image:radial-gradient(closest-side,black_35%,transparent_98%)] md:block" />
        <DotGrid className="absolute -left-10 bottom-0 hidden h-64 w-64 text-primary/50 md:block" />

        <div className="container relative mx-auto px-6 pb-10 pt-14 md:pb-12 md:pt-24 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-sm font-medium text-primary md:text-base"
          >
            {t("label")}
          </motion.p>
          <h1 className="mt-4 flex items-start font-Wulkan text-[clamp(3rem,7vw,6rem)] leading-none tracking-[-0.02em] md:mt-6">
            <motion.span
              initial={{ opacity: 0, y: "40%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 1, ease, delay: 0.05 }}
              className="block"
            >
              {t("title")}
            </motion.span>
            {projects.length > 0 && (
              <motion.sup
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="ml-2 mt-[0.3em] font-Poppins text-base font-medium tracking-normal text-primary md:text-xl"
              >
                {String(projects.length).padStart(2, "0")}
              </motion.sup>
            )}
          </h1>
          <div className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            <WordsStagger delay={0.35} stagger={0.03} speed={0.5}>
              {t("description")}
            </WordsStagger>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24 md:pb-40 lg:px-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
          role="group"
          aria-label={t("title")}
          className="flex flex-wrap items-center gap-2.5 border-t border-border pt-8"
        >
          {filterOptions.map((option) => {
            const active = activeFilter === option;
            return (
              <Button
                key={option}
                type="button"
                variant={active ? "default" : "outline"}
                aria-pressed={active}
                disabled={count(option) === 0}
                onClick={() => setActiveFilter(option)}
                className="h-10 rounded-full px-4"
              >
                {t(`filter.${option}`)}
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    active
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {count(option)}
                </span>
              </Button>
            );
          })}
        </motion.div>

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-lg text-muted-foreground">
            {t("soon")}
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="mt-8 md:mt-10"
            >
              <ProjectsList projects={filtered} />
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <HomeCards />
    </>
  );
}
