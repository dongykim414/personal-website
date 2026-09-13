"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

import { DetailGrid } from "./ExperienceSection";
import type { AdditionalExperienceData } from "./data";
export function AdditionalExperience({ experiences, }: {
    experiences: AdditionalExperienceData[];
}) {
    const { t } = useLanguage();
    return (<section className="section" id="additional">
      <header className="section-title">
        <span className="section-index" aria-hidden="true">
          <span className="section-number">02</span>
        </span>
        <h2>{t("추가 경험")}</h2>
      </header>

      {experiences.map((experience) => (<article className="additional-entry" key={experience.title}>
          <h3>{experience.title}</h3>
          {experience.description ? (<p className="project-description">{experience.description}</p>) : null}
          {experience.tech ? (<ul className="tech-list" aria-label={t("{0} 사용 기술", experience.title)}>
              {experience.tech.map((item) => (<li key={item}>{item}</li>))}
            </ul>) : null}
          <DetailGrid details={experience.details}/>
        </article>))}
    </section>);
}
