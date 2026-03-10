"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { db } from "../../lib/firebase";
import { StaggerContainer, fadeInUp } from "../../utils/Animations";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/app/types/projects";

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "projects"));
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Project, "id">) }) as Project)
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setProjects(data);
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
        <h2 className="font-Wulkan text-3xl md:text-5xl uppercase tracking-wide">
          Projetos Recentes
        </h2>
        <div className="w-24 md:w-32 h-1 bg-primary mx-auto rounded-full" />
        <p className="text-foreground/70 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
          Alguns dos projetos mais recentes que desenvolvi como freelancer.
        </p>
      </motion.div>

      <motion.div
        variants={StaggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Linha principal: destaque + 2 empilhados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[520px]">
          {p0 && (
            <div className="md:col-span-2 aspect-[4/3] md:aspect-auto md:h-full">
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
          <div className="flex flex-col gap-6 md:h-full">
            {p1 && (
              <div className="aspect-[16/9] md:aspect-auto md:flex-1">
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
              <div className="aspect-[16/9] md:aspect-auto md:flex-1">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <div key={project.id} className="aspect-[16/9] sm:aspect-auto sm:h-[280px]">
                <ProjectCard
                  project={project}
                  index={i + 3}
                  isHovered={hoveredProject === project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  size="large"
                />
              </div>
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
          className="group inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 bg-primary text-white rounded-full font-medium text-base md:text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10">Explorar Todos os Projetos</span>
          <BsArrowUpRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </section>
  );
}
