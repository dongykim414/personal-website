import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { resumeData } from "@/components/resume/data";

export default function Home() {
  return <ResumeDocument data={resumeData} variant="default" />;
}
