"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import type { Project } from "@/app/types/projects";

/** First sentences of the project text, without the editor's HTML. */
function summary(html: string | undefined, max = 140) {
  const text = (html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const t = useTranslations("home");
  const tp = useTranslations("projects");
  const locale = useLocale();
  const reduced = useReducedMotion();
  // Cards underneath shrink a little as the next ones slide over them
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.04],
  );
  const href = `/projects/${project.id}` as `/projects/${string}`;
  const text = summary(
    locale === "en" && project.description_en
      ? project.description_en
      : project.description,
  );
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <li
      style={{ top: `calc(6.5rem + ${index * 0.75}rem)` }}
      className="sticky"
    >
      <motion.article
        style={reduced ? undefined : { scale }}
        className="grid origin-top overflow-hidden rounded-[2rem] border border-border bg-white dark:bg-espresso md:min-h-[30rem] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div className="order-2 flex flex-col justify-between gap-8 p-6 md:order-1 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm tabular-nums text-muted-foreground">
              {pad(index + 1)} / {pad(total)}
            </span>
            {project.type === "case_study" && <Badge>{tp("caseStudy")}</Badge>}
            {project.discipline && (
              <Badge variant="outline" className="text-muted-foreground">
                {tp(`discipline.${project.discipline}`)}
              </Badge>
            )}
          </div>
          <div>
            <h3 className="max-w-[16ch] font-Wulkan text-[clamp(1.875rem,3.4vw,3.25rem)] leading-[1.04] text-balance">
              {project.title}
            </h3>
            {text && (
              <p className="mt-3 line-clamp-2 max-w-[44ch] text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base">
                {text}
              </p>
            )}
            <Button asChild size="pill" className="mt-6 md:mt-8">
              <Link href={href}>
                {t("viewProject")}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="group relative order-1 m-3 mb-0 block aspect-[16/10] overflow-hidden rounded-[1.5rem] md:order-2 md:mb-3 md:ml-0 md:aspect-auto"
        >
          <Image
            src={project.coverUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 55vw, 92vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        </Link>
      </motion.article>
    </li>
  );
}

/**
 * Featured projects as a stack: each card sticks under the header and the
 * next one slides over it as the page scrolls.
 */
export function ProjectsStack({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <ol
      ref={ref}
      className={`container mx-auto flex flex-col gap-6 px-6 md:gap-10 lg:px-8 ${className ?? ""}`}
    >
      {projects.map((project, index) => (
        <StackCard
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </ol>
  );
}
