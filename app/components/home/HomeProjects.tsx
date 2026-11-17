"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/app/components/ui/button";
import { CoverflowCarousel } from "@/app/components/ui/skiper-ui/coverflow-carousel";
import { ProjectTile } from "@/app/components/projects/ProjectTile";
import type { Project } from "@/app/types/projects";

export function HomeProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations("home");

  return (
    <section id="projetos" className="scroll-mt-28 pb-24 md:pb-40">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-primary md:text-base">
              {t("projectsLabel")}
            </p>
            <h2 className="mt-4 font-Wulkan text-[clamp(2.75rem,7vw,6rem)] leading-none tracking-[-0.02em] md:mt-5">
              {t("projectsTitle")}
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden h-11 rounded-full px-6 sm:inline-flex"
          >
            <Link href="/projects">
              {t("allProjects")}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="container mx-auto mt-10 px-6 text-lg text-muted-foreground lg:px-8">
          {t("projectsEmpty")}
        </p>
      ) : (
        <CoverflowCarousel
          className="mt-12 md:mt-16"
          prevLabel={t("prevProject")}
          nextLabel={t("nextProject")}
          items={projects.map((project, index) => ({
            id: project.id,
            content: (
              <ProjectTile
                project={project}
                position={index + 1}
                total={projects.length}
                sizes="(min-width: 1024px) 60rem, 84vw"
              />
            ),
          }))}
        />
      )}
    </section>
  );
}
