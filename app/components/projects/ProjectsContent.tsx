"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "@/app/lib/firebase";
import { fadeInUpBlur } from "@/app/utils/Animations";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/app/types/projects";

export function ProjectsContent() {
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
      <ProjectsHeader count={projects.length} />

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
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
