import { ProjectsContent } from "@/app/components/projects/ProjectsContent";
import { getProjects } from "@/app/lib/getProjects";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsContent projects={projects} />;
}
