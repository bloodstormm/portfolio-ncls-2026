// app/components/ProjectsList/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { db } from "../../lib/firebase";
import { StaggerContainer, itemAnimation, fadeInUp } from "../../utils/Animations";
import type { Project } from "@/app/types/projects";

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);

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
      setProjects(data);
    }

    load();
  }, []);


  return (
    <section className="container mx-auto my-20 px-4 space-y-12">
      <motion.div
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.3 }}
        className="text-center space-y-4"
      >
        <h2 className="font-Wulkan text-3xl md:text-4xl uppercase tracking-wide">
          Projetos Recentes
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Uma seleção dos meus trabalhos mais recentes em UX/UI e desenvolvimento front-end
        </p>
      </motion.div>

      <motion.div
        variants={StaggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemAnimation}>
            <Link href={`/projects/${project.id}`} className="group block">
              <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm border border-beige/20 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">

                {/* Preview da imagem */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.coverUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Botão de visualizar */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform -translate-y-4 group-hover:translate-y-0">
                      <BsArrowUpRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-Odasans text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-beige/30 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                      <BsArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                  <p className="text-muted text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Preview das imagens extras */}
                  {project.images && project.images.length > 0 && (
                    <div className="pt-4">
                      <div className="flex gap-2 overflow-hidden">
                        {project.images.slice(0, 3).map((url, index) => (
                          <div
                            key={url}
                            className={`relative h-12 w-16 shrink-0 rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300 ${index > 1 ? 'hidden sm:block' : ''}`}
                          >
                            <Image
                              src={url}
                              alt={`${project.title} preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {project.images.length > 3 && (
                          <div className="h-12 w-16 rounded-lg bg-beige/20 flex items-center justify-center text-xs text-muted font-medium">
                            +{project.images.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Indicador de hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action para ver todos os projetos */}
      <div className="text-center pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="font-medium">Ver Todos os Projetos</span>
          <BsArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}