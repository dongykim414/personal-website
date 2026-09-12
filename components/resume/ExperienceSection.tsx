import Link from "next/link";
import type { DetailBlock, Project } from "./data";

function TechList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="tech-list" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PlainList({ items }: { items: string[] }) {
  return (
    <ul className="plain-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function DetailGrid({ details }: { details: DetailBlock[] }) {
  return (
    <div className="detail-grid">
      {details.map((detail) => (
        <div className="detail-row" key={detail.label}>
          <h5 className="detail-label">{detail.label}</h5>
          <div className="detail-content">
            {detail.description ? (
              <p className="detail-description">{detail.description}</p>
            ) : null}
            {detail.result ? (
              <div className="service-result">
                {detail.result.title ? <strong>{detail.result.title}</strong> : null}
                {detail.result.body}
                {detail.result.note ? <small>{detail.result.note}</small> : null}
              </div>
            ) : null}
            {detail.items ? <PlainList items={detail.items} /> : null}
            {detail.groups ? (
              <div className="work-groups">
                {detail.groups.map((group) => (
                  <section className="work-group" key={group.title}>
                    <h5>{group.title}</h5>
                    <PlainList items={group.items} />
                  </section>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectExperience({ project }: { project: Project }) {
  return (
    <article className="project" id={project.id}>
      <div className="project-rail" aria-hidden="true">
        <span className="project-node" />
      </div>
      <div className="project-content">
        <p className="project-kicker">{project.kicker}</p>
        <h4>
          <a
            className="project-anchor"
            href={`#${project.id}`}
            aria-label={`${project.title} 프로젝트 바로가기`}
          >
            <span>{project.title}</span>
            <span className="anchor-mark" aria-hidden="true">
              #
            </span>
          </a>
        </h4>
        <p className="project-description">{project.description}</p>
        <TechList items={project.tech} label={`${project.title} 사용 기술`} />
        <DetailGrid details={project.details} />
        {(project.id === "challenge-today" || project.id === "webtoon-metric") && <Link className="resume-case-link" href={`/projects/${project.id}`}>문제 해결 과정과 데모 보기 →</Link>}
      </div>
    </article>
  );
}

export function ProjectTimeline({ projects }: { projects: Project[] }) {
  return (
    <div className="project-timeline">
      {projects.map((project) => (
        <ProjectExperience key={project.title} project={project} />
      ))}
    </div>
  );
}

export function ExperienceSection({ projects }: { projects: Project[] }) {
  return (
    <section className="section" id="experience">
      <header className="section-title">
        <span className="section-index" aria-hidden="true">
          <span className="section-number">01</span>
        </span>
        <h2>업무 경력</h2>
      </header>

      <div className="company">
        <header className="company-head">
          <div className="company-name-line">
            <h3>오늘의 웹툰</h3>
            <span className="company-role">Frontend Developer</span>
          </div>
          <span className="company-period">2021.05 — 2025.02</span>
        </header>
        <ProjectTimeline projects={projects} />
      </div>
    </section>
  );
}
