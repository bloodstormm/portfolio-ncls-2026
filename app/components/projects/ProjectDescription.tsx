"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { useLocale, useTranslations } from "next-intl";
import { RichTextRenderer } from "@/app/components/RichTextRenderer";
import { Button } from "@/app/components/ui/button";
import type { Project } from "@/app/types/projects";
import { ReadingProgress } from "./ReadingProgress";
import { getDescription } from "@/app/utils/projectLocale";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProjectDescription({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations("projectDetail");
  const textRef = useRef<HTMLDivElement>(null);
  const year = project.createdAt
    ? new Date(project.createdAt).getFullYear()
    : null;

  return (
    <section className="container mx-auto px-6 py-20 md:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease }}
        className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
      >
        {/* Side column: stays in view while the text scrolls */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-Wulkan text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]">
            {t("about")}
          </h2>
          {year && (
            <p className="mt-4 text-sm tabular-nums text-muted-foreground">
              {year}
            </p>
          )}

          {(project.demoUrl || project.repositoryUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl && (
                <Button asChild size="pill">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe aria-hidden="true" />
                    {t("visitSite")}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
              )}
              {project.repositoryUrl && (
                <Button asChild variant="outline" size="pill">
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGithub aria-hidden="true" />
                    {t("repository")}
                  </a>
                </Button>
              )}
            </div>
          )}
          <ReadingProgress
            target={textRef}
            className="ml-1 mt-12 hidden lg:block"
          />
        </div>

        <div ref={textRef}>
          <RichTextRenderer
            content={getDescription(project, locale)}
            className="max-w-[68ch] text-base leading-relaxed text-foreground/80 md:text-lg"
          />
        </div>
      </motion.div>
    </section>
  );
}
