import type { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { currentResumeData } from "@/components/resume/data-current";

export const metadata: Metadata = { title: "이력서 | 김동영", description: "김동영 프론트엔드 개발자의 경력, 프로젝트 기여와 기술 경험. 오늘의웹툰, 웹툰 메트릭, 공통 UI와 출시·운영 경험." };

export default function ResumePage() {
  return <ResumeDocument data={currentResumeData} />;
}
