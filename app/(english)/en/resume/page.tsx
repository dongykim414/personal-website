import type { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { currentResumeData } from "@/components/resume/data-current";

export const metadata: Metadata = { title: "Resume | Dongyoung Kim", description: "Dongyoung Kim's experience, project contributions, and technical background.", openGraph: { title: "Resume | Dongyoung Kim", description: "Experience and project contributions as a frontend developer.", locale: "en_US", type: "profile" } };

export default function ResumePage() { return <ResumeDocument data={currentResumeData} />; }
