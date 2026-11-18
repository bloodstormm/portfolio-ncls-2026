"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Pencil, Plus, RotateCw, Trash2 } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import type { Project } from "@/app/types/projects";

const ease = [0.16, 1, 0.3, 1] as const;

const disciplineLabel: Record<string, string> = {
  design: "Design",
  development: "Desenvolvimento",
  both: "Design e código",
};

interface AdminProjectListProps {
  projects: Project[];
  status: "loading" | "ready" | "error";
  errorMessage?: string;
  onRetry: () => void;
  onNew: () => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function AdminProjectList({
  projects,
  status,
  errorMessage,
  onRetry,
  onNew,
  onEdit,
  onDelete,
}: AdminProjectListProps) {
  return (
    <>
      {/* Heading */}
      <section className="container mx-auto px-6 pb-10 pt-14 md:pb-12 md:pt-20 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-sm font-medium text-primary md:text-base"
        >
          Painel
        </motion.p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6 md:mt-6">
          <h1 className="flex items-start font-Wulkan text-[clamp(3rem,7vw,6rem)] leading-none tracking-[-0.02em]">
            <motion.span
              initial={{ opacity: 0, y: "40%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 1, ease, delay: 0.05 }}
              className="block"
            >
              Projetos
            </motion.span>
            {status === "ready" && (
              <motion.sup
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="ml-2 mt-[0.3em] font-Poppins text-base font-medium tracking-normal text-primary md:text-xl"
              >
                {String(projects.length).padStart(2, "0")}
              </motion.sup>
            )}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <Button size="pill" onClick={onNew}>
              <Plus />
              Novo projeto
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24 md:pb-32 lg:px-8">
        {status === "loading" && (
          <ul aria-busy="true" aria-label="Carregando projetos" className="border-t border-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex items-center gap-4 border-b border-border py-4 lg:gap-8 lg:py-6">
                <span className="aspect-[4/3] w-20 shrink-0 animate-pulse rounded-xl bg-secondary lg:w-28" />
                <span className="h-6 flex-1 animate-pulse rounded-full bg-secondary" />
                <span className="hidden h-6 w-24 animate-pulse rounded-full bg-secondary lg:block" />
              </li>
            ))}
          </ul>
        )}

        {status === "error" && (
          <div className="border-t border-border py-24 text-center">
            <p className="font-Wulkan text-3xl">Não deu para carregar os projetos</p>
            {errorMessage && (
              <p className="mx-auto mt-3 max-w-[48ch] text-sm text-muted-foreground">{errorMessage}</p>
            )}
            <Button variant="outline" onClick={onRetry} className="mt-8 h-10 rounded-full px-5">
              <RotateCw />
              Tentar de novo
            </Button>
          </div>
        )}

        {status === "ready" && projects.length === 0 && (
          <div className="border-t border-border py-24 text-center">
            <p className="font-Wulkan text-3xl text-muted-foreground">Nenhum projeto ainda</p>
            <Button variant="outline" onClick={onNew} className="mt-8 h-10 rounded-full px-5">
              <Plus />
              Criar o primeiro
            </Button>
          </div>
        )}

        {status === "ready" && projects.length > 0 && (
          <ul className="border-t border-border">
            {projects.map((project, index) => {
              const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;
              return (
                <motion.li
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: Math.min(index, 8) * 0.04 }}
                  className="group grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-4 lg:grid-cols-[2.5rem_7rem_minmax(0,1fr)_auto_3.5rem_auto] lg:gap-8 lg:py-6"
                >
                  <span className="hidden text-sm tabular-nums text-muted-foreground lg:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    aria-label={`Editar ${project.title}`}
                    className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-secondary"
                  >
                    {project.coverUrl && (
                      <Image
                        src={project.coverUrl}
                        alt=""
                        fill
                        sizes="7rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </button>

                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() => onEdit(project)}
                      className="block text-left font-Wulkan text-xl leading-tight text-balance transition-colors duration-300 hover:text-primary lg:text-[clamp(1.5rem,2.2vw,2.25rem)]"
                    >
                      {project.title || "Sem título"}
                    </button>
                    <span className="mt-2 flex flex-wrap gap-2 lg:hidden">
                      {project.type === "case_study" && <Badge>Estudo de caso</Badge>}
                      {project.discipline && (
                        <Badge variant="secondary">{disciplineLabel[project.discipline]}</Badge>
                      )}
                    </span>
                  </div>

                  <span className="hidden items-center gap-2 lg:flex">
                    {project.type === "case_study" && <Badge>Estudo de caso</Badge>}
                    {project.discipline && (
                      <Badge variant="secondary">{disciplineLabel[project.discipline]}</Badge>
                    )}
                  </span>
                  <span className="hidden text-right text-sm tabular-nums text-muted-foreground lg:block">
                    {year}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hidden size-10 rounded-full lg:inline-flex"
                    >
                      <Link
                        href={`/pt/projects/${project.id}`}
                        target="_blank"
                        aria-label={`Abrir ${project.title} no site`}
                        title="Abrir no site"
                      >
                        <ArrowUpRight />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(project)}
                      aria-label={`Editar ${project.title}`}
                      title="Editar"
                      className="size-10 rounded-full hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(project)}
                      aria-label={`Excluir ${project.title}`}
                      title="Excluir"
                      className="size-10 rounded-full hover:border-destructive hover:bg-destructive hover:text-white"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
