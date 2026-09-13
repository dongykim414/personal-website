"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

import Link from "@/components/i18n/LocalizedLink";
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
            <Link href="/" className={styles.textLink}><Icon name="back"/>{t("소개와 프로젝트")}</Link>
            <div><a href="/documents/resume.pdf" download={t("김동영_프론트엔드_이력서.pdf")} className={styles.smallButton}><Icon name="download"/>{t("PDF 다운로드")}</a><PrintButton /></div>
          </div>
          <ExperienceSection projects={data.projects}/>
          <AdditionalExperience experiences={data.additionalExperiences}/>

          <section className="section contact-section" id="contact">
            <div className="footer-contact">
              <p>{t("김동영 · Frontend Developer · Seoul, Korea")}</p>
              <a href="mailto:Dongykim414@gmail.com">
                Dongykim414@gmail.com ↗
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>);
}
