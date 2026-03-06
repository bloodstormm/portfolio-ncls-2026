"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight, BsGithub, BsGlobe } from "react-icons/bs";
import { db } from "../../lib/firebase";
import { fadeInUp } from "../../utils/Animations";
import { RichTextRenderer } from "../../components/RichTextRenderer";
import type { Project } from "@/app/types/projects";

export default function ProjectDetailsPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadProject() {
      if (!params.id) return;

      try {
        const [projectDoc, allSnap] = await Promise.all([
          getDoc(doc(db, "projects", params.id as string)),
          getDocs(collection(db, "projects")),
        ]);

        if (projectDoc.exists()) {
          setProject({ id: projectDoc.id, ...projectDoc.data() } as Project);
        }

        const all = allSnap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Project))
          .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

        const currentIndex = all.findIndex((p) => p.id === params.id);
        if (currentIndex !== -1 && currentIndex < all.length - 1) {
          setNextProject(all[currentIndex + 1]);
        }
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted text-sm">Carregando projeto...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <motion.div {...fadeInUp} className="text-center space-y-6">
          <h1 className="font-Wulkan text-3xl text-primary">Projeto não encontrado</h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full"
          >
            <BsArrowLeft className="h-4 w-4" />
            Ver todos os projetos
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background -mt-20">

      {/* ── Hero cover ── */}
      <section className="relative w-full h-[70vh] min-h-[480px]">
        <Image
          src={project.coverUrl}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        {/* Blur layer */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        {/* Dark fade bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back button */}
        <motion.div
          {...fadeInUp}
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

        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

      {/* ── Description + links ── */}
      <section className="container mx-auto px-6 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-10"
        >
          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-primary">Sobre o projeto</h3>
            <div className="w-12 h-0.5 bg-primary rounded-full" />
            <RichTextRenderer
              content={project.description}
              className="text-lg leading-relaxed text-foreground/80"
            />
          </div>

          {/* Action links */}
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

      {/* ── Gallery ── */}
      {project.images && project.images.length > 0 && (
        <section className="container mx-auto px-6 pb-24 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-primary rounded-full" />
              <span className="text-sm uppercase tracking-widest text-muted font-medium">
                Galeria
              </span>
            </div>

            {/* First image — full width */}
            <div
              className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "16/7" }}
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={project.images[0]}
                alt={`${project.title} - 1`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <BsArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Remaining images — grid */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.slice(1).map((imageUrl, i) => (
                  <div
                    key={imageUrl}
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                    style={{ aspectRatio: "4/3" }}
                    onClick={() => setLightboxIndex(i + 1)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${project.title} - ${i + 2}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <BsArrowUpRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ── Next project ── */}
      {nextProject && (
        <section className="container mx-auto px-6 py-16 max-w-6xl">
          <Link href={`/projects/${nextProject.id}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl h-52">

              {/* Imagem — oculta por padrão, revela no hover */}
              <Image
                src={nextProject.coverUrl}
                alt={nextProject.title}
                fill
                className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
              />

              {/* Fundo escuro padrão */}
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-black/50 border border-beige/20 group-hover:border-transparent rounded-2xl transition-all duration-700" />

              {/* Conteúdo */}
              <div className="relative h-full px-8 py-6 flex flex-col justify-between">
                <span className="text-xs uppercase tracking-widest text-muted group-hover:text-white/60 font-medium transition-colors duration-500">
                  Próximo projeto
                </span>

                <div className="flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    {nextProject.category && (
                      <span className="text-xs uppercase tracking-widest text-primary group-hover:text-primary/80 font-medium transition-colors duration-300">
                        {nextProject.category}
                      </span>
                    )}
                    <h2 className="font-Wulkan text-3xl md:text-4xl uppercase leading-tight text-foreground group-hover:text-white transition-colors duration-500">
                      {nextProject.title}
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
      )}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && project.images && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            ✕
          </button>

          {lightboxIndex > 0 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
            >
              <BsArrowLeft className="h-4 w-4" />
            </button>
          )}

          <div
            className="relative max-w-5xl w-full max-h-[85vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.images[lightboxIndex]}
              alt={`${project.title} - ${lightboxIndex + 1}`}
              width={1400}
              height={900}
              className="object-contain w-full h-full max-h-[85vh]"
            />
          </div>

          {lightboxIndex < project.images.length - 1 && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
            >
              <BsArrowRight className="h-4 w-4" />
            </button>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === lightboxIndex ? "bg-white w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </main>
  );
}
