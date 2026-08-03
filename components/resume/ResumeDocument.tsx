import { AdditionalExperience } from "./AdditionalExperience";
import { ExperienceSection } from "./ExperienceSection";
import { ResumeSidebar } from "./ResumeSidebar";
import type { ResumeData } from "./data";
import { UtilityBar } from "./UtilityBar";

type ResumeDocumentProps = {
  data: ResumeData;
};

export function ResumeDocument({ data }: ResumeDocumentProps) {
  return (
    <>
      <UtilityBar />

      <main className="page" id="top">
        <ResumeSidebar coreStack={data.coreStack} />
        <div className="content">
          <ExperienceSection projects={data.projects} />
          <AdditionalExperience experiences={data.additionalExperiences} />

          <section className="section contact-section" id="contact">
            <div className="footer-contact">
              <p>김동영 · Frontend Developer · Seoul, Korea</p>
              <a href="mailto:Dongykim414@gmail.com">
                Dongykim414@gmail.com ↗
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
