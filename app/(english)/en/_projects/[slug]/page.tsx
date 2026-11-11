import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/components/portfolio/content";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { translateContent } from "@/components/i18n/translate";

export const dynamicParams = false;
export function generateStaticParams() { return portfolioProjects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = translateContent(portfolioProjects.find((item) => item.slug === slug), "en");
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} | Dongyoung Kim`, description: project.description, openGraph: { title: `${project.title} | Dongyoung Kim`, description: project.description, locale: "en_US", type: "article" } };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
