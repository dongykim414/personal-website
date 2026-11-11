"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

import { DetailGrid } from "./ExperienceSection";
import type { AdditionalExperienceData } from "./data";
export function AdditionalExperience({ experiences, id, title, number, introduction }: {
    experiences: AdditionalExperienceData[];
    id: string;
    title: string;
    number: string;
    introduction?: string;
}) {
    const { t } = useLanguage();
    return (<section className="section" id={id}>
      <header className="section-title">
        <span className="section-index" aria-hidden="true">
          <span className="section-number">{number}</span>
        </span>
        <h2>{title}</h2>
      </header>

      {introduction && <p className="project-description">{introduction}</p>}
      {experiences.map((experience) => (<article className="additional-entry" key={experience.title}>
          <h3>{experience.title}</h3>
          {experience.description ? (<p className="project-description">{experience.description}</p>) : null}
          {experience.tech ? (<ul className="tech-list" aria-label={t("{0} 사용 기술", experience.title)}>
              {experience.tech.map((item) => (<li key={item}>{item}</li>))}
            </ul>) : null}
          {experience.details.length > 0 && <DetailGrid details={experience.details}/>}
        </article>))}
    </section>);
}
