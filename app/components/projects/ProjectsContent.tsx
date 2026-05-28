"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/app/lib/firebase";
import { fadeInUpBlur } from "@/app/utils/Animations";
import { useTranslations } from "next-intl";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/app/types/projects";

type DisciplineFilter = "all" | "design" | "development" | "both";

const filterOptions: DisciplineFilter[] = ["all", "design", "development", "both"];

export function ProjectsContent() {
  const t = useTranslations("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<DisciplineFilter>("all");

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "projects"));
        const data = snap.docs
          .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Project, "id">) }) as Project)
          .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setProjects(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.discipline === activeFilter);

  return (
    <main className="min-h-screen bg-background">
      <ProjectsHeader count={filtered.length} />

      <section className="container mx-auto px-6 pb-24 max-w-6xl">
        {/* Filter toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 flex-wrap mb-12"
        >
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`relative px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                activeFilter === option
                  ? "border-primary text-primary bg-primary/10"
                  : "border-beige/20 text-foreground/50 hover:border-beige/40 hover:text-foreground/80"
              }`}
            >
              {t(`filter.${option}`)}
              {activeFilter === option && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-primary/10 border border-primary -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div {...fadeInUpBlur} className="text-center py-24 text-muted">
            <p className="text-lg">{t("soon")}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-0"
            >
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </main>
  );
}
