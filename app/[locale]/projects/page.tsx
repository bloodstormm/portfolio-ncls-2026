import { ProjectsContent } from "@/app/components/projects/ProjectsContent";
import { getProjects } from "@/app/lib/getProjects";

// Refresh project data at most once a minute.
export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsContent projects={projects} />;
}
