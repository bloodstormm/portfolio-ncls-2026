"use client";

import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub, BsGlobe } from "react-icons/bs";
import { RichTextRenderer } from "@/app/components/RichTextRenderer";
import type { Project } from "@/app/types/projects";

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectDescriptionProps {
  project: Project;
}

export function ProjectDescription({ project }: ProjectDescriptionProps) {
  return (
    <section className="container mx-auto px-6 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease, delay: 0.6 }}
        className="space-y-10"
      >
        <div className="space-y-4">
          <h3 className="text-3xl font-semibold text-primary">Sobre o projeto</h3>
          <div className="w-12 h-0.5 bg-primary rounded-full" />
          <RichTextRenderer
            content={project.description}
            className="text-lg leading-relaxed text-foreground/80"
          />
        </div>

        {(project.demoUrl || project.repositoryUrl) && (
          <div className="flex gap-4 flex-wrap pt-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors duration-300 text-sm font-medium"
              >
                <BsGlobe className="h-4 w-4" />
                Ver demo
                <BsArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-beige/40 text-foreground hover:border-primary/50 hover:text-primary rounded-full transition-all duration-300 text-sm font-medium"
              >
                <BsGithub className="h-4 w-4" />
                Repositório
              </a>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
