"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { db } from "@/app/lib/firebase";
import { fadeInUpBlur } from "@/app/utils/Animations";
import { ProjectHero } from "./ProjectHero";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectGallery } from "./ProjectGallery";
import { NextProject } from "./NextProject";
import type { Project } from "@/app/types/projects";

export function ProjectDetailContent() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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
          .map((d) => ({ id: d.id, ...d.data() }) as Project)
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
        <motion.div
          {...fadeInUpBlur}
          transition={{ ...fadeInUpBlur.transition, duration: 0.8 }}
          className="text-center space-y-6"
        >
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

  const allImages = [project.coverUrl, ...(project.images ?? [])];

  return (
    <main className="min-h-screen bg-background -mt-20">
      <ProjectHero project={project} />
      <ProjectDescription project={project} />
      <ProjectGallery images={allImages} title={project.title} />
      {nextProject && <NextProject project={nextProject} />}
    </main>
  );
}
