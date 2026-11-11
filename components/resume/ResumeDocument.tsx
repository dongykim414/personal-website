"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

import { implementations, implementationIntro } from "./data-current";
import { AdditionalExperience } from "./AdditionalExperience";
import { ExperienceSection } from "./ExperienceSection";
import { ResumeSidebar } from "./ResumeSidebar";
import type { ResumeData } from "./data";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { PrintButton } from "@/components/portfolio/PrintButton";
import { Icon } from "@/components/portfolio/Icons";
import styles from "@/components/portfolio/site.module.css";
type ResumeDocumentProps = {
    data: ResumeData;
};
export function ResumeDocument({ data: originalData }: ResumeDocumentProps) {
    const { t, content } = useLanguage();
    const data = content(originalData);
    return (<div className={`${styles.site} ${styles.resumeSurface}`}>
      <SiteHeader />

      <main className="page" id="main-content">
        <ResumeSidebar coreStack={data.coreStack}/>
        <div className="content">
          <div className={styles.resumeToolbar}>
            <div><a href="/documents/resume.pdf" download={t("김동영_프론트엔드_이력서.pdf")} className={styles.smallButton}><Icon name="download"/>{t("PDF 다운로드")}</a><PrintButton /></div>
          </div>
          <ExperienceSection projects={data.projects}/>
          <AdditionalExperience id="additional" number="02" title={t("기술 및 추가 경험")} experiences={data.additionalExperiences}/>
          <AdditionalExperience id="implementations" number="03" title={t("프로젝트에서 실제로 한 일")} introduction={t(implementationIntro)} experiences={content(implementations)}/>

          <section className="section contact-section" id="contact">
            <div className="footer-contact">
              <p>{t("김동영 · Frontend Developer")}</p>
              <a href="mailto:Dongykim414@gmail.com">
                Dongykim414@gmail.com ↗
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>);
}
