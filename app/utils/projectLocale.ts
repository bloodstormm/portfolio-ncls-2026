import type { Project } from "@/app/types/projects";

/**
 * Returns the appropriate description based on the current locale.
 * Falls back to PT description if EN is not set.
 */
export function getDescription(project: Project, locale: string): string {
  if (locale === "en" && project.description_en) {
    return project.description_en;
  }
  return project.description;
}
