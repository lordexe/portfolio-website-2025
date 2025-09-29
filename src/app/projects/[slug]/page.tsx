import { notFound } from "next/navigation";
import { ProjectPageClient } from "./ProjectPageClient";
import { ALL_PROJECTS, getProjectDataBySlug, ProjectData } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getNextProject(project: ProjectData) {
  const currentIndex = ALL_PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProjectIndex = (currentIndex + 1) % ALL_PROJECTS.length;
  return ALL_PROJECTS[nextProjectIndex];
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectDataBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project);

  return <ProjectPageClient project={project} nextProject={nextProject} />;
}
