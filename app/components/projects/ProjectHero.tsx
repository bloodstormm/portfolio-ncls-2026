"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import type { Project } from "@/app/types/projects";

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative w-full h-[70vh] min-h-[480px]">
      <Image
        src={project.coverUrl}
        alt={project.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Botão voltar */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease }}
        className="absolute top-24 left-0 right-0 container mx-auto px-6"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm"
        >
          <BsArrowLeft className="h-4 w-4" />
          Todos os projetos
        </Link>
      </motion.div>

      {/* Título sobre a imagem */}
      <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="space-y-4 max-w-3xl"
        >
          {project.category && (
            <span className="text-xs uppercase tracking-widest text-primary font-semibold bg-primary/15 px-3 py-1 rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          )}
          <h1 className="font-Wulkan text-4xl md:text-6xl uppercase tracking-wide text-white leading-tight">
            {project.title}
          </h1>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
