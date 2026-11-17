"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { DotGrid, Rings } from "@/app/components/home/Decor";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { WordsStagger } from "@/app/components/ui/words-stagger";
import type { Project } from "@/app/types/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProjectHero({
  project,
  position,
  total,
}: {
  project: Project;
  position: number;
  total: number;
}) {
  const t = useTranslations("projectDetail");
  const tp = useTranslations("projects");
  // Read on the client only: the admin flag lives in sessionStorage
  const isAdmin = useSyncExternalStore(
    () => () => {},
    () => !!sessionStorage.getItem("admin_authenticated"),
    () => false,
  );
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const pad = (value: number) => String(value).padStart(2, "0");

  const rise = (order: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay: 0.1 + order * 0.1 },
  });

  return (
    <section className="relative overflow-hidden">
      <Rings className="absolute -right-40 -top-40 hidden h-[30rem] w-[30rem] text-primary/30 [mask-image:radial-gradient(closest-side,black_35%,transparent_98%)] md:block" />
      <DotGrid className="absolute -left-10 top-40 hidden h-64 w-64 text-primary/50 md:block" />

      <div className="container relative mx-auto px-6 pt-10 md:pt-16 lg:px-8">
        <motion.div
          {...rise(0)}
          className="flex items-center justify-between gap-4"
        >
          <Button asChild variant="outline" className="h-10 rounded-full px-4">
            <Link href="/projects">
              <ArrowLeft aria-hidden="true" />
              {t("allProjects")}
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <NextLink
                href={`/admin/projects?edit=${project.id}`}
                title="Editar projeto"
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <Pencil aria-hidden="true" className="size-4" />
              </NextLink>
            )}
            {position > 0 && (
              <span className="text-sm tabular-nums text-muted-foreground">
                {pad(position)} / {pad(total)}
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          {...rise(1)}
          className="mt-10 flex flex-wrap gap-2 md:mt-14"
        >
          {project.type === "case_study" && <Badge>{tp("caseStudy")}</Badge>}
          {project.discipline && (
            <Badge variant="secondary">
              {tp(`discipline.${project.discipline}`)}
            </Badge>
          )}
        </motion.div>

        <h1 className="mt-5 max-w-[20ch] font-Wulkan text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-balance">
          <WordsStagger delay={0.25} stagger={0.06} speed={0.6}>
            {project.title}
          </WordsStagger>
        </h1>

        {project.tags && project.tags.length > 0 && (
          <motion.ul {...rise(3)} className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge
                  variant="outline"
                  className="px-3 py-1 font-normal text-muted-foreground"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div
          ref={coverRef}
          initial={{ opacity: 0, clipPath: "inset(8% 6% 8% 6% round 2rem)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
          transition={{ duration: 1.2, ease, delay: 0.35 }}
          className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] md:mt-14 md:aspect-[16/8]"
        >
          <motion.div
            style={{ y: coverY }}
            className="absolute inset-x-0 -inset-y-[7%]"
          >
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
