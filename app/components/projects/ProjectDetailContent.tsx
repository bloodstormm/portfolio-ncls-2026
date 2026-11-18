"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/app/components/ui/button";
import type { Project } from "@/app/types/projects";
import { NextProject } from "./NextProject";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectHero } from "./ProjectHero";

export function ProjectDetailContent({
  project,
  nextProject,
  position,
  total,
}: {
  project: Project | null;
  nextProject: Project | null;
  position: number;
  total: number;
}) {
  const t = useTranslations("projectDetail");

  if (!project) {
    return (
      <section className="container mx-auto flex min-h-[60svh] flex-col items-center justify-center gap-8 px-6 text-center lg:px-8">
        <h1 className="font-Wulkan text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
          {t("notFound")}
        </h1>
        <Button asChild size="pill">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" />
            {t("backToProjects")}
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <ProjectHero project={project} position={position} total={total} />
      <ProjectDescription project={project} />
      <ProjectGallery images={project.images ?? []} title={project.title} />
      {nextProject && <NextProject project={nextProject} />}
    </>
  );
}
