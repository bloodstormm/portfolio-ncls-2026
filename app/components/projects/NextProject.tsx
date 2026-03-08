"use client";

import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import type { Project } from "@/app/types/projects";

interface NextProjectProps {
  project: Project;
}

export function NextProject({ project }: NextProjectProps) {
  return (
    <section className="container mx-auto px-6 py-16 max-w-6xl">
      <Link href={`/projects/${project.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl h-52">
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-foreground/5 group-hover:bg-black/50 border border-beige/20 group-hover:border-transparent rounded-2xl transition-all duration-700" />

          <div className="relative h-full px-8 py-6 flex flex-col justify-between">
            <span className="text-xs uppercase tracking-widest text-muted group-hover:text-white/60 font-medium transition-colors duration-500">
              Próximo projeto
            </span>
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                {project.category && (
                  <span className="text-xs uppercase tracking-widest text-primary group-hover:text-primary/80 font-medium transition-colors duration-300">
                    {project.category}
                  </span>
                )}
                <h2 className="font-Wulkan text-3xl md:text-4xl uppercase leading-tight text-foreground group-hover:text-white transition-colors duration-500">
                  {project.title}
                </h2>
              </div>
              <div className="shrink-0 w-12 h-12 rounded-full border border-beige/30 group-hover:border-white/40 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300">
                <BsArrowRight className="h-4 w-4 text-foreground/50 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
