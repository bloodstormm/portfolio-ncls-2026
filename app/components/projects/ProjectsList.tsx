"use client";

/**
 * Compact index of projects. On a mouse, the cover of the hovered row follows the cursor
 * (spring follow adapted from Skiper UI "skiper61", SpringMouseFollow) and the title rolls
 * (Skiper UI "skiper58", TextRoll). On touch screens each row shows a small cover instead.
 */
import { useState } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Badge } from "@/app/components/ui/badge";
import { TextRoll } from "@/app/components/ui/skiper-ui/text-roll";
import type { Project } from "@/app/types/projects";

const SPRING = { mass: 0.1, damping: 14, stiffness: 131 };

export function ProjectsList({ projects }: { projects: Project[] }) {
  const tp = useTranslations("projects");
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);
  const scale = useSpring(0.6, SPRING);

  return (
    <div
      className="relative"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - bounds.left);
        y.set(event.clientY - bounds.top);
      }}
      onPointerLeave={() => {
        opacity.set(0);
        scale.set(0.6);
        setActive(null);
      }}
    >
      <ul className="border-t border-border">
        {projects.map((project, index) => {
          const year = project.createdAt
            ? new Date(project.createdAt).getFullYear()
            : null;
          return (
            <motion.li
              key={project.id}
              initial="initial"
              whileHover="hovered"
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                setActive(index);
                opacity.set(1);
                scale.set(1);
              }}
              className={`border-b border-border transition-opacity duration-300 ${
                active !== null && active !== index ? "lg:opacity-40" : ""
              }`}
            >
              <Link
                href={`/projects/${project.id}` as `/projects/${string}`}
                className="group grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-4 py-4 outline-none focus-visible:bg-secondary lg:grid-cols-[3.5rem_minmax(0,1fr)_auto_4rem_2.5rem] lg:gap-8 lg:py-7"
              >
                {/* Small cover: only where there is no cursor to follow */}
                <span className="relative block aspect-[4/3] overflow-hidden rounded-xl lg:hidden">
                  <Image
                    src={project.coverUrl}
                    alt=""
                    fill
                    sizes="5rem"
                    className="object-cover"
                  />
                </span>
                <span className="hidden text-sm tabular-nums text-muted-foreground lg:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="block font-Wulkan text-xl leading-tight text-balance lg:hidden">
                    {project.title}
                  </span>
                  <TextRoll className="hidden font-Wulkan text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.15] lg:block">
                    {project.title}
                  </TextRoll>
                  <span className="mt-2 flex flex-wrap gap-2 lg:hidden">
                    {project.type === "case_study" && (
                      <Badge>{tp("caseStudy")}</Badge>
                    )}
                    {project.discipline && (
                      <Badge variant="secondary">
                        {tp(`discipline.${project.discipline}`)}
                      </Badge>
                    )}
                  </span>
                </span>

                <span className="hidden items-center gap-2 lg:flex">
                  {project.type === "case_study" && (
                    <Badge>{tp("caseStudy")}</Badge>
                  )}
                  {project.discipline && (
                    <Badge variant="secondary">
                      {tp(`discipline.${project.discipline}`)}
                    </Badge>
                  )}
                </span>
                <span className="hidden text-right text-sm tabular-nums text-muted-foreground lg:block">
                  {year}
                </span>
                <span className="grid size-9 place-items-center rounded-full border border-border text-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground lg:size-10">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      {/* Cover that follows the cursor */}
      <motion.div
        aria-hidden="true"
        style={{ x, y, opacity, scale }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
      >
        <div className="relative aspect-[4/3] w-[22rem] -translate-y-1/2 translate-x-8 overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgb(0_0_0/0.5)]">
          {projects.map((project, index) => (
            <Image
              key={project.id}
              src={project.coverUrl}
              alt=""
              fill
              sizes="22rem"
              className={`object-cover transition-opacity duration-300 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
