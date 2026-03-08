"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight, BsEye } from "react-icons/bs";
import { itemAnimation } from "@/app/utils/Animations";
import { RichTextRenderer } from "@/app/components/RichTextRenderer";
import type { Project } from "@/app/types/projects";

export type CardSize = "small" | "large" | "featured";

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  size?: CardSize;
}

export function ProjectCard({
  project,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  size = "small",
}: ProjectCardProps) {
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
                  animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
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
