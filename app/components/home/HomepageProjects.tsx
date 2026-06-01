"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { db } from "@/app/lib/firebase";
import { RichTextRenderer } from "@/app/components/RichTextRenderer";
import type { Project } from "@/app/types/projects";
import { PulsingRings } from "./PulsingRings";

const DISCIPLINE_LABELS: Record<string, string> = {
  design: "Design",
  development: "Development",
  both: "Design & Dev",
};

function ProjectCard({
  project,
  index,
  size = "small",
}: {
  project: Project;
  index: number;
  size?: "large" | "small";
}) {
  const locale = useLocale();
  const [isLoaded, setIsLoaded] = useState(false);
  const description =
    locale === "en" ? (project.description_en ?? project.description) : project.description;

  return (
    <Link href={`/projects/${project.id}` as `/projects/${string}`} className="block h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl cursor-pointer">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-102">
          <img
            src={project.coverUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: isLoaded ? "blur(0px)" : "blur(18px)",
              transform: isLoaded ? "scale(1)" : "scale(1.08)",
              transition: "filter 0.65s ease-out, transform 0.65s ease-out",
            }}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top row: index + arrow */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span className="font-Odasans text-xs text-white/30 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 -translate-y-1 group-hover:translate-y-0">
            <BsArrowUpRight className="text-white h-4 w-4" />
          </span>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          {project.discipline && (
            <p className="font-Odasans text-[10px] uppercase tracking-widest text-white/50 mb-2">
              {DISCIPLINE_LABELS[project.discipline] ?? project.discipline}
            </p>
          )}
          <h3
            className={`font-Wulkan uppercase tracking-wide text-white leading-tight ${
              size === "large" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
          >
            {project.title}
          </h3>

          {description && (
            <div className="overflow-hidden mt-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              <RichTextRenderer
                content={description}
                maxLines={size === "large" ? 3 : 2}
                className="text-white/60 text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function HomepageProjects() {
  const t = useTranslations("home");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "projects"));
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Project, "id">) }) as Project)
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 3);
      setProjects(data);
    }
    load();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <PulsingRings />
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end justify-between"
      >
        <div className="space-y-2">
          <span className="text-primary text-xs uppercase tracking-widest font-semibold">
            {t("projectsLabel")}
          </span>
          <h2 className="font-Wulkan text-4xl mt-1 md:text-5xl">
            {t("projectsTitle")}
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden md:inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors duration-300"
        >
          {t("projectsCta")}
          <BsArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {/* Editorial grid: large left + two stacked right */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 md:h-140"
      >
        {/* Large card */}
        {projects[0] && (
          <div className="h-72 md:h-full">
            <ProjectCard project={projects[0]} index={0} size="large" />
          </div>
        )}

        {/* Two small cards stacked */}
        <div className="grid grid-rows-2 gap-4 h-120 md:h-full">
          {projects[1] && (
            <ProjectCard project={projects[1]} index={1} size="small" />
          )}
          {projects[2] && (
            <ProjectCard project={projects[2]} index={2} size="small" />
          )}
        </div>
      </motion.div>

      <div className="text-center md:hidden">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors duration-300"
        >
          {t("projectsCta")}
          <BsArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      </div>
    </section>
  );
}
