import { AdditionalExperience } from "./AdditionalExperience";
import { ExperienceSection } from "./ExperienceSection";
import { ResumeSidebar } from "./ResumeSidebar";
import type { ResumeData } from "./data";
import { UtilityBar, type ResumeVariant } from "./UtilityBar";

type ResumeDocumentProps = {
  data: ResumeData;
  variant: ResumeVariant;
};

export function ResumeDocument({ data, variant }: ResumeDocumentProps) {
  return (
    <>
      <UtilityBar variant={variant} />

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
