"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { db } from "../lib/firebase";
import { fadeInUpBlur } from "../utils/Animations";
import { RichTextRenderer } from "../components/RichTextRenderer";
import type { Project } from "@/app/types/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "projects"));
        const data = snap.docs
          .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Project, "id">) }) as Project)
          .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setProjects(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-background">

      {/* ── Cabeçalho ── */}
      <motion.section
        {...fadeInUpBlur}
        className="container mx-auto px-6 pt-16 pb-12 max-w-6xl"
      >
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Portfólio
          </span>
          <h1 className="font-Wulkan text-5xl md:text-7xl uppercase tracking-wide leading-none">
            Projetos
          </h1>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <p className="text-foreground/60 text-lg max-w-xl leading-relaxed">
              Uma seleção dos meus trabalhos em UX/UI Design e Desenvolvimento Front-end.
            </p>
            <span className="text-sm text-muted font-mono">
              {projects.length} projeto{projects.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="w-full h-px bg-beige/30 mt-6" />
        </div>
      </motion.section>

      {/* ── Lista de projetos ── */}
      <section className="container mx-auto px-6 pb-24 max-w-6xl">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div {...fadeInUpBlur} className="text-center py-24 text-muted">
            <p className="text-lg">Em breve, novos projetos.</p>
          </motion.div>
        ) : (
          <div className="space-y-0">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              >
                <Link href={`/projects/${project.id}`} className="group block">
                  <article className="grid md:grid-cols-2 gap-0 border-b border-beige/20 py-10 group-hover:border-primary/20 transition-colors duration-300">

                    {/* Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 + 0.1 }}
                      className="flex flex-col justify-between gap-6 md:pr-12"
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

                        <h2 className="font-Wulkan text-3xl md:text-4xl uppercase leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
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
                          <span
                            key={tag}
                            className="text-xs text-muted border border-beige/30 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Imagem */}
                    <div
                      className="relative overflow-hidden rounded-2xl mt-6 md:mt-0"
                      style={{ aspectRatio: "16/9" }}
                    >
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

                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
