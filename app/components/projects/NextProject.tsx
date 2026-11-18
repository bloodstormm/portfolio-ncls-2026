"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { TextRoll } from "@/app/components/ui/skiper-ui/text-roll";
import type { Project } from "@/app/types/projects";

export function NextProject({ project }: { project: Project }) {
  const t = useTranslations("projectDetail");

  return (
    <section className="container mx-auto px-6 pb-20 md:pb-28 lg:px-8">
      <motion.div
        initial="initial"
        whileHover="hovered"
        className="border-y border-border"
      >
        <Link
          href={`/projects/${project.id}` as `/projects/${string}`}
          className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-8 outline-none focus-visible:bg-secondary md:grid-cols-[minmax(0,1fr)_14rem_auto] md:gap-10 md:py-10"
        >
          <span className="min-w-0">
            <span className="block text-sm font-medium text-primary">
              {t("nextProject")}
            </span>
            <span className="mt-3 block font-Wulkan text-2xl leading-tight text-balance lg:hidden">
              {project.title}
            </span>
            <TextRoll className="mt-3 hidden font-Wulkan text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.15] lg:block">
              {project.title}
            </TextRoll>
          </span>
          <span className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
            <Image
              src={project.coverUrl}
              alt=""
              fill
              sizes="14rem"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
            />
          </span>
          <span className="grid size-12 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight aria-hidden="true" className="size-5" />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
