"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { RichTextRenderer } from "@/app/components/RichTextRenderer";
import type { Project } from "@/app/types/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardEase = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: cardEase, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.id}`} className="group block">
        <article className="border-b border-beige/20 py-8 md:py-10 group-hover:border-primary/20 transition-colors duration-300">

          {/* Imagem mobile — aparece antes do texto */}
          <div className="relative overflow-hidden rounded-2xl mb-6 md:hidden" style={{ aspectRatio: "16/9" }}>
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <BsArrowUpRight className="h-3.5 w-3.5 text-white" />
            </div>
          </div>

          {/* Grid desktop: info | imagem */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: cardEase, delay: index * 0.05 + 0.1 }}
              className="flex flex-col justify-between gap-6 pr-12"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-foreground/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.category && (
                    <span className="text-xs uppercase tracking-widest text-primary/70 font-medium">
                      {project.category}
                    </span>
                  )}
                </div>
                <h2 className="font-Wulkan text-4xl uppercase leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h2>
                <RichTextRenderer
                  content={project.description}
                  className="text-foreground/60 text-sm leading-relaxed"
                  maxLines={3}
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {project.tags?.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-xs text-muted border border-beige/30 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Imagem desktop */}
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
              <Image
                src={project.coverUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <BsArrowUpRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Info mobile — abaixo da imagem */}
          <div className="md:hidden space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-foreground/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.category && (
                <span className="text-xs uppercase tracking-widest text-primary/70 font-medium">
                  {project.category}
                </span>
              )}
            </div>
            <h2 className="font-Wulkan text-3xl uppercase leading-tight text-foreground">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              {project.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-muted border border-beige/30 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </article>
      </Link>
    </motion.div>
  );
}
