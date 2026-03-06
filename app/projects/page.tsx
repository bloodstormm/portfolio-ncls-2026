"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowUpRight, BsArrowLeft } from "react-icons/bs";
import { db } from "../lib/firebase";
import { StaggerContainer, itemAnimation, fadeInUp } from "../utils/Animations";
import type { Project } from "@/app/types/projects";

export default function ProjectsPage() {
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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.1 }}
        className="container mx-auto px-4 py-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors duration-300 mb-8"
        >
          <BsArrowLeft className="h-4 w-4" />
          <span>Voltar ao início</span>
        </Link>

        <div className="text-center space-y-4">
          <h1 className="font-Wulkan text-4xl md:text-5xl uppercase tracking-wide">
            Meus Projetos
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            Aqui você encontra todos os meus trabalhos de UX/UI Design e Desenvolvimento Front-end.
            Cada projeto representa uma jornada única de criação e aprendizado.
          </p>
        </div>
      </motion.header>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          variants={StaggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemAnimation}>
              <Link href={`/projects/${project.id}`} className="group block">
                <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm border border-beige/20 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">

                  {/* Project Image */}
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={project.coverUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-6 transform -translate-y-4 group-hover:translate-y-0">
                        <BsArrowUpRight className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-8 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-Odasans text-2xl font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full border border-beige/30 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                        <BsArrowUpRight className="h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    </div>

                    <p className="text-muted leading-relaxed">
                      {project.description}
                    </p>

                    {/* Additional Images Preview */}
                    {project.images && project.images.length > 0 && (
                      <div className="pt-4">
                        <div className="flex gap-3 overflow-hidden">
                          {project.images.slice(0, 4).map((url, index) => (
                            <div
                              key={url}
                              className="relative h-16 w-20 shrink-0 rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300"
                            >
                              <Image
                                src={url}
                                alt={`${project.title} preview ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {project.images.length > 4 && (
                            <div className="h-16 w-20 rounded-lg bg-beige/20 flex items-center justify-center text-sm text-muted font-medium">
                              +{project.images.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="font-Odasans text-xl text-primary mb-2">
              Em breve, novos projetos
            </h3>
            <p className="text-muted">
              Estou trabalhando em novos projetos incríveis. Volte em breve!
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}