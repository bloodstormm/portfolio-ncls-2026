"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import type { Project } from "@/app/types/projects";

/** First sentences of the project text, without the editor's HTML. */
function summary(html: string | undefined, max = 150) {
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

/**
 * A project shown as its cover with the text on top: number, tags, title,
 * a short description and the link. Used by the home carousel and the projects page.
 */
export function ProjectTile({
  project,
  position,
  total,
  size = "large",
  sizes,
  className,
}: {
  project: Project;
  position: number;
  total: number;
  /** "large" puts the button beside the text on wide screens; "small" stacks everything. */
  size?: "large" | "small";
  sizes: string;
  className?: string;
}) {
  const t = useTranslations("home");
  const tp = useTranslations("projects");
  const locale = useLocale();
  const large = size === "large";
  const text = summary(
    locale === "en" && project.description_en
      ? project.description_en
      : project.description,
  );
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden text-white",
        className,
      )}
    >
      <Image
        src={project.coverUrl}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.94)_0%,rgb(0_0_0/0.72)_40%,rgb(0_0_0/0.2)_72%,rgb(0_0_0/0.3)_100%)]"
      />
      <div
        className={cn(
          "relative flex h-full flex-col justify-between p-6",
          large ? "md:p-10" : "md:p-8",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm tabular-nums text-white/80">
            {pad(position)} / {pad(total)}
          </span>
          {project.type === "case_study" && <Badge>{tp("caseStudy")}</Badge>}
          {project.discipline && (
            <Badge className="bg-white/20 text-white backdrop-blur-sm">
              {tp(`discipline.${project.discipline}`)}
            </Badge>
          )}
        </div>
        <div
          className={cn(
            "flex flex-col gap-5",
            large && "md:flex-row md:items-end md:justify-between md:gap-10",
          )}
        >
          <div className="min-w-0">
            <h3
              className={cn(
                "max-w-[18ch] font-Wulkan leading-[1.02] text-balance",
                large
                  ? "text-[clamp(2rem,4.4vw,4rem)]"
                  : "text-[clamp(1.75rem,3vw,2.75rem)]",
              )}
            >
              {project.title}
            </h3>
            {text && (
              <p className="mt-3 line-clamp-2 max-w-[52ch] text-sm leading-relaxed text-white/80 md:mt-4 md:text-base">
                {text}
              </p>
            )}
          </div>
          <Button
            asChild
            size="pill"
            className={cn("shrink-0 self-start", large && "md:self-auto")}
          >
            <Link href={`/projects/${project.id}` as `/projects/${string}`}>
              {t("viewProject")}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
