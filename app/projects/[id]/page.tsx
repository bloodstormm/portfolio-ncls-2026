"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowLeft, BsArrowUpRight } from "react-icons/bs";
import { db } from "../../lib/firebase";
import { fadeInUp, fadeInLeft, StaggerContainer, itemAnimation } from "../../utils/Animations";
import type { Project } from "@/app/types/projects";

export default function ProjectDetailsPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!params.id) return;

      try {
        const projectDoc = await getDoc(doc(db, "projects", params.id as string));
        if (projectDoc.exists()) {
          setProject({
            id: projectDoc.id,
            ...projectDoc.data(),
          } as Project);
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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Carregando projeto...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          {...fadeInUp}
          className="text-center"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="font-Odasans text-2xl text-primary mb-4">
            Projeto não encontrado
          </h1>
          <p className="text-muted mb-8">
            O projeto que você está procurando não existe ou foi removido.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors duration-300"
          >
            <BsArrowLeft className="h-4 w-4" />
            <span>Ver todos os projetos</span>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.1 }}
        className="container mx-auto px-4 py-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors duration-300"
        >
          <BsArrowLeft className="h-4 w-4" />
          <span>Voltar aos projetos</span>
        </Link>
      </motion.nav>

      {/* Project Header */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Project Info */}
          <motion.div
            {...fadeInLeft}
            transition={{ ...fadeInLeft.transition, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-Wulkan text-4xl md:text-5xl uppercase tracking-wide text-primary mb-4">
                {project.title}
              </h1>
              <div className="w-24 h-1 bg-primary rounded-full mb-6"></div>
              <p className="text-muted text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-beige/40 text-primary hover:border-primary/50 hover:bg-primary/5 rounded-full transition-all duration-300"
              >
                <span>Ver mais projetos</span>
                <BsArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/80 rounded-full transition-colors duration-300"
              >
                <span>Entre em contato</span>
                <BsArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Main Project Image */}
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
            className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Project Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="font-Odasans text-2xl text-primary mb-4">
              Galeria do Projeto
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            variants={StaggerContainer}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {project.images.map((imageUrl, index) => (
              <motion.div
                key={imageUrl}
                variants={itemAnimation}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
              >
                <Image
                  src={imageUrl}
                  alt={`${project.title} - Imagem ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <BsArrowUpRight className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Related Projects CTA */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-beige/10 to-primary/10 rounded-2xl p-12"
        >
          <h2 className="font-Odasans text-2xl text-primary mb-4">
            Gostou deste projeto?
          </h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Explore outros trabalhos no meu portfólio ou entre em contato para discutirmos seu próximo projeto.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-300"
            >
              <span>Ver todos os projetos</span>
              <BsArrowUpRight className="h-5 w-5" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white hover:bg-primary/80 rounded-full transition-colors duration-300"
            >
              <span>Voltar ao início</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}