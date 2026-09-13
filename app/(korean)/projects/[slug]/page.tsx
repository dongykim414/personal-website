import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/components/portfolio/content";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };
  return { title: `${project.title} | 김동영`, description: project.description, openGraph: { title: `${project.title} | 김동영 프론트엔드 포트폴리오`, description: project.description, locale: "ko_KR", type: "article" } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
