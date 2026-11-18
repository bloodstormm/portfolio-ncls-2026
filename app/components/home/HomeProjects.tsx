"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/app/components/ui/button";
import { ProjectsStack } from "./ProjectsStack";
import type { Project } from "@/app/types/projects";

// The home shows only the newest ones; the rest live on the projects page
const FEATURED = 4;

export function HomeProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations("home");

  return (
    <section
      id="projetos"
      className="scroll-mt-20 pb-24 pt-20 md:pb-36 md:pt-28"
    >
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
        <>
          <ProjectsStack
            projects={projects.slice(0, FEATURED)}
            className="mt-12 md:mt-16"
          />
          <div className="container mx-auto mt-10 flex justify-center px-6 sm:hidden">
            <Button asChild variant="outline" size="pill">
              <Link href="/projects">
                {t("allProjects")}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
