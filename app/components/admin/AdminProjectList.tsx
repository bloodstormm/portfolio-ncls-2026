"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BsPlus, BsPencil, BsTrash } from "react-icons/bs";
import type { Project } from "@/app/types/projects";

interface AdminProjectListProps {
  projects: Project[];
  onNew: () => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function AdminProjectList({ projects, onNew, onEdit, onDelete }: AdminProjectListProps) {
  return (
    <section className="container mx-auto px-6 py-14 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end justify-between gap-6 mb-12"
      >
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-Odasans">Admin</span>
          <h1 className="font-Wulkan text-5xl md:text-6xl uppercase leading-none">Projetos</h1>
          <p className="text-foreground/40 text-sm">
            {projects.length} projeto{projects.length !== 1 ? "s" : ""} cadastrado{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={onNew}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
        >
          <BsPlus className="h-4 w-4" />
          Novo projeto
        </button>
      </motion.div>

      <div className="w-full h-px bg-foreground/10 mb-12" />

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-32"
        >
          <p className="font-Wulkan text-2xl uppercase text-foreground/20 mb-6">Nenhum projeto ainda</p>
          <button
            onClick={onNew}
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/10 text-sm text-foreground/40 hover:text-primary hover:border-primary/30 rounded-full transition-all duration-300"
          >
            <BsPlus className="h-4 w-4" />
            Criar primeiro projeto
          </button>
        </motion.div>
      ) : (
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            >
              <article className="group grid md:grid-cols-[1fr_200px] gap-0 border-b border-foreground/10 py-8 hover:border-primary/20 transition-colors duration-300">
                <div className="flex flex-col justify-between gap-4 md:pr-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-Odasans text-foreground/20 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {project.category && (
                        <span className="text-xs uppercase tracking-widest text-primary/50">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <h2 className="font-Wulkan text-2xl md:text-3xl uppercase leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags?.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs text-foreground/40 border border-foreground/10 px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEdit(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border border-foreground/10 text-foreground/40 hover:text-primary hover:border-primary/30 rounded-full transition-all duration-300"
                    >
                      <BsPencil className="h-3 w-3" />
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border border-foreground/10 text-foreground/20 hover:text-red-400 hover:border-red-400/30 rounded-full transition-all duration-300"
                    >
                      <BsTrash className="h-3 w-3" />
                      Excluir
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden mt-4 md:mt-0" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={project.coverUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
