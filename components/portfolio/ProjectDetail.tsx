import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { PortfolioProject } from "./content";
import { portfolioProjects } from "./content";
import { Icon } from "./Icons";
import { SectionNav } from "./SectionNav";
import { SiteHeader } from "./SiteHeader";
import styles from "./site.module.css";

const ChartDemo = dynamic(() => import("./ChartDemo"), { loading: () => <p className={styles.demoLoading}>차트 데모를 준비하고 있습니다.</p> });
const ManuscriptDemo = dynamic(() => import("./ManuscriptDemo"), { loading: () => <p className={styles.demoLoading}>원고 데모를 준비하고 있습니다.</p> });

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  const next = portfolioProjects.find((item) => item.slug !== project.slug)!;
  const sections = [{ id: "overview", label: "프로젝트 개요" }, ...project.sections.map((section) => ({ id: section.id, label: section.label.split(" / ")[1] }))];
  return <div className={styles.site}><SiteHeader />
    <div className={styles.detailLayout}>
      <aside className={styles.detailSidebar}><Link href="/#projects" className={styles.backLink}><Icon name="back" />모든 프로젝트</Link><p className={styles.eyebrow}>PROJECT {project.number}</p><h2>{project.title}</h2><p className={styles.detailPeriod}>{project.period}</p><SectionNav items={sections} /><a href={project.url} target="_blank" rel="noreferrer" className={styles.textLink}>서비스 방문 <Icon name="external" /></a><a className={styles.sideDownload} href="/documents/portfolio.pdf" download="김동영_프론트엔드_포트폴리오.pdf"><Icon name="download" /> 포트폴리오 PDF</a></aside>
      <main id="main-content" className={styles.detailMain}>
        <section id="overview" className={styles.projectOverview}>
          <p className={styles.eyebrow}>{project.category}</p><h1>{project.tagline}</h1><p className={styles.overviewDescription}>{project.description}</p>
          <dl className={styles.projectFacts}><div><dt>기간</dt><dd>{project.period}</dd></div><div><dt>담당</dt><dd>{project.role}</dd></div><div><dt>협업</dt><dd>{project.team}</dd></div></dl>
          <ul className={styles.tags} aria-label="사용 기술">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <figure className={styles.projectFigure}><a href={project.image} target="_blank" rel="noreferrer" aria-label={`${project.title} 실제 화면 원본 크기로 보기, 새 탭`}><Image src={project.image} alt={project.imageAlt} width={project.slug === "challenge-today" ? 1039 : 1343} height={project.slug === "challenge-today" ? 689 : 675} sizes="(max-width: 800px) 94vw, 850px" priority /></a><figcaption>기존 포트폴리오에 수록된 실제 서비스{project.slug === "webtoon-metric" ? " 데모" : ""} 화면 · 이미지를 누르면 원본 크기로 볼 수 있습니다.</figcaption></figure>
          <div className={styles.scopeBox}><span className={styles.eyebrow}>MY CONTRIBUTION</span><ul className={styles.contributions}>{project.summary.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>

        {project.sections.map((section) => <section id={section.id} className={styles.caseSection} key={section.id}>
          <p className={styles.eyebrow}>{section.label}</p><h2>{section.title}</h2><p className={styles.caseContext}>{section.context}</p>
          {section.flow && <div className={styles.flowDiagram} aria-label="구현 흐름"><ol>{section.flow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < section.flow!.length - 1 && <Icon name="arrow" />}</li>)}</ol><p>구현의 핵심 흐름을 요약한 도식</p></div>}
          {section.id === "feed" && <figure className={styles.mobileFigure}><Image src="/projects/challenge-mobile.webp" alt="한 작품씩 탐색하는 오늘의웹툰 모바일 세로 피드" width={323} height={697} sizes="220px" /><figcaption><strong>PC는 비교하고,<br />모바일은 집중하도록.</strong><p>같은 작품 데이터를 디바이스에 맞는 정보 밀도와 이동 방식으로 표현했습니다.</p></figcaption></figure>}
          <div className={styles.decisions}>{section.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></div>)}</div>
          <div className={styles.caseResult}><span>구현 결과</span><p>{section.result}</p></div>
          {section.demo === "chart" && <ChartDemo />}
          {section.demo === "manuscript" && <ManuscriptDemo />}
          {/* {section.reflection && <details className={styles.reflection}><summary>설계의 비용과 다음 개선 <Icon name="plus" /></summary><p>{section.reflection}</p></details>} */}
        </section>)}

        <Link href={`/projects/${next.slug}`} className={styles.nextProject}><span>다음 프로젝트<strong>{next.title}</strong><span>{next.tagline}</span></span><Icon name="arrow" width="28" height="28" /></Link>
        <footer className={styles.footer}><Link href="/">김동영 · Frontend Developer</Link><a href="#overview">처음으로 ↑</a></footer>
      </main>
    </div>
  </div>;
}
