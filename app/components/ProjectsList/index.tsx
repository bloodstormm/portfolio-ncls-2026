// app/components/ProjectsList/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowUpRight, BsEye } from "react-icons/bs";
import { db } from "../../lib/firebase";
import { StaggerContainer, itemAnimation, fadeInUp } from "../../utils/Animations";
import { RichTextRenderer } from "../RichTextRenderer";
import type { Project } from "@/app/types/projects";

function ProjectCard({
  project,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  size = "small",
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  size?: "small" | "large" | "featured";
}) {
  return (
    <motion.div
      variants={itemAnimation}
      className="relative group w-full h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/projects/${project.id}`} className="block h-full">
        <article className="relative h-full overflow-hidden rounded-3xl border border-beige/20 group-hover:border-primary/40 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/20">

          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-50"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* Top */}
            <div className="flex justify-between items-start">
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-xs font-mono text-white/90">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {size === "featured" && (
                <span className="text-xs uppercase tracking-widest text-primary font-semibold bg-primary/20 px-3 py-1 rounded-full backdrop-blur-md">
                  Mais Recente
                </span>
              )}
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1.2, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <BsEye className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Bottom */}
            <div className="space-y-3">
              <motion.h3
                className={`font-odasans font-semibold text-white leading-tight ${
                  size === "featured"
                    ? "text-2xl md:text-3xl"
                    : size === "large"
                    ? "text-xl md:text-2xl"
                    : "text-base md:text-lg"
                }`}
                animate={{ y: isHovered ? 0 : 6 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>

              {(size === "featured" || size === "large") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                  className="hidden md:block"
                >
                  <RichTextRenderer
                    content={project.description}
                    className="text-sm text-white/80 leading-relaxed"
                    maxLines={2}
                  />
                </motion.div>
              )}

              <motion.div
                className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 8 }}
                animate={{ y: isHovered ? 0 : 8 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <span className="text-white/80 text-sm font-medium">Ver Detalhes</span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <BsArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </motion.div>

              <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
            animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </article>
      </Link>
    </motion.div>
  );
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "projects"));
      const data = snap.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...(doc.data() as Omit<Project, "id">),
          }) as Project
      );

      setProjects(
        data.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        })
      );
    }

    load();
  }, []);

  const [p0, p1, p2, ...rest] = projects;

  return (
    <section className="container mx-auto my-20 px-4 space-y-16">
      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.3 }}
        className="text-center space-y-4"
      >
        <h2 className="font-Wulkan text-4xl md:text-5xl uppercase tracking-wide">
          Projetos em Destaque
        </h2>
        <div className="w-32 h-1 bg-primary mx-auto rounded-full" />
        <p className="text-foreground/70 text-xl max-w-3xl mx-auto leading-relaxed">
          Uma curadoria visual dos meus trabalhos mais impactantes
        </p>
      </motion.div>

      <motion.div
        variants={StaggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Linha principal: destaque lateral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ height: 520 }}>

          {/* Projeto 1 — destaque, ocupa 2/3 */}
          {p0 && (
            <div className="md:col-span-2 h-full">
              <ProjectCard
                project={p0}
                index={0}
                isHovered={hoveredProject === p0.id}
                onMouseEnter={() => setHoveredProject(p0.id)}
                onMouseLeave={() => setHoveredProject(null)}
                size="featured"
              />
            </div>
          )}

          {/* Projetos 2 e 3 — empilhados na direita */}
          <div className="flex flex-col gap-6 h-full">
            {p1 && (
              <div className="flex-1">
                <ProjectCard
                  project={p1}
                  index={1}
                  isHovered={hoveredProject === p1.id}
                  onMouseEnter={() => setHoveredProject(p1.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  size="large"
                />
              </div>
            )}
            {p2 && (
              <div className="flex-1">
                <ProjectCard
                  project={p2}
                  index={2}
                  isHovered={hoveredProject === p2.id}
                  onMouseEnter={() => setHoveredProject(p2.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  size="large"
                />
              </div>
            )}
          </div>
        </div>

        {/* Grade 3 colunas para o restante */}
        {rest.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ gridAutoRows: "280px" }}
          >
            {rest.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i + 3}
                isHovered={hoveredProject === project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                size="large"
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.6 }}
        className="text-center pt-16"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-full font-medium text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10">Explorar Todos os Projetos</span>
          <BsArrowUpRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </section>
  );
}
