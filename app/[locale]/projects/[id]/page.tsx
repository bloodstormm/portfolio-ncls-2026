import { ProjectDetailContent } from "@/app/components/projects/ProjectDetailContent";
import { getProjects } from "@/app/lib/getProjects";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.id === id);

  return (
    <ProjectDetailContent
      project={index === -1 ? null : projects[index]}
      nextProject={index === -1 ? null : (projects[index + 1] ?? null)}
      position={index + 1}
      total={projects.length}
    />
  );
}
