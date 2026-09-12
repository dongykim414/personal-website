import { portfolioProjects, profile, supportingExperience } from "@/components/portfolio/content";
import type { ResumeData } from "./data";

export const currentResumeData: ResumeData = {
  coreStack: [...profile.skills, "Redux", "Chart.js", "Amplitude", "CloudWatch"],
  projects: portfolioProjects.map((project) => ({
    id: project.slug,
    kicker: `${project.category} · ${project.period}`,
    title: project.title,
    description: project.description,
    tech: project.tech,
    details: [
      { label: "담당 범위", description: `${project.role} · ${project.team}` },
      { label: "핵심 기여", items: project.summary },
      ...project.sections.map((section) => ({ label: section.label.split(" / ")[1], description: section.result })),
      ...(project.slug === "challenge-today" ? [{ label: "제품 확장", result: { body: "공개 플랫폼과 공모전·분석 신청 흐름을 구축해 분석 작품 수 확대에 기여했습니다.", note: "내부 집계 기준 약 100개 → 약 1,000개. 개인 구현만의 성과로 분리한 수치는 아닙니다." } }] : []),
    ],
  })),
  additionalExperiences: supportingExperience.map((item) => ({ title: item.title, tech: item.tech.split(" · "), details: [{ label: "기여", description: item.body }] })),
};
