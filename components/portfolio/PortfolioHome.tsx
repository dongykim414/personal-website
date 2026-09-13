"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import * as koreanContent from "./content";
import { Icon } from "./Icons";
import { SectionNav } from "./SectionNav";
import { SiteHeader } from "./SiteHeader";
import styles from "./site.module.css";
export function PortfolioHome() {
    const { t, content } = useLanguage();
    const { portfolioProjects, profile, supportingExperience } = content(koreanContent);
    const homeSections = [{ id: "about", label: t("소개") }, { id: "projects", label: t("대표 프로젝트") }, { id: "experience", label: t("경력과 경험") }, { id: "contact", label: t("연락처") }];
    return <div className={styles.site}>
    <SiteHeader />
    <div className={styles.homeLayout}>
      <aside className={styles.profile} aria-label={t("프로필")}>
        <p className={styles.eyebrow}>FRONTEND DEVELOPER</p>
        <h1 className={styles.name}>{t("김동영")}<span>.</span></h1>
        <p className={styles.profileLead}>{t("화면의 경험부터")}<br />{t("데이터의 흐름까지.")}</p>
        <p className={styles.profileDescription}>{t("사용자가 쓰기 좋은 제품,")}<br />{t("팀이 이어서 만들기 좋은 구조를 생각합니다.")}</p>
        <SectionNav items={homeSections}/>
        <div className={styles.profileActions}>
          <a href={`mailto:${profile.email}`}><Icon name="mail"/>{t("이메일 보내기")}<Icon name="external"/></a>
          <a href="/documents/resume.pdf" download={t("김동영_프론트엔드_이력서.pdf")}><Icon name="download"/>{t("이력서 PDF")}<span className={styles.fileType}>PDF</span></a>
        </div>
        <p className={styles.profileFoot}>React · TypeScript<br />{t("제품 구축 · 데이터 시각화")}</p>
      </aside>

      <main id="main-content" className={styles.homeMain}>
        <section id="about" className={styles.introduction}>
          <p className={styles.eyebrow}>ABOUT</p>
          <h2>{t("복잡한 요구사항을")}<br /><span>{t("명확한 사용자 흐름으로.")}</span></h2>
          <p>{t("스타트업의 첫 프론트엔드 개발자로 서비스 초기 구축부터 출시와 운영까지 참여했습니다. 독자와 작가가 사용하는")} <strong>{t("웹툰 플랫폼")}</strong>{t(", 고객이 성과를 해석하는")} <strong>{t("B2B 데이터 제품")}</strong>{t("을 만들었습니다.")}</p>
          <p>{t("React·TypeScript로 핵심 사용자 흐름을 구현하고, 반복되는 문제를 공통 데이터 구조와 재사용 가능한 컴포넌트로 정리했습니다.")}</p>
          <div className={styles.careerStrip}><span><strong>{profile.career}</strong>{t("실무 경험")}</span><span><strong>B2C & B2B</strong>{t("제품 구축·운영")}</span><span><strong>React + TS</strong>{t("주요 개발 환경")}</span></div>
        </section>

        <section id="projects" className={styles.homeSection}>
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>SELECTED WORK</p><h2>{t("직접 만들고, 깊이 고민한 것들")}</h2></div><span className={styles.count}>02</span></div>
          <p className={styles.sectionDescription}>{t("담당한 역할과 기술적 판단, 구현의 안쪽을 담았습니다.")}</p>
          <div className={styles.projectList}>{portfolioProjects.map((project) => <article className={styles.projectCard} key={project.slug}>
            <Link href={`/projects/${project.slug}`} className={styles.cardImageLink} aria-label={t("{0} 프로젝트 자세히 보기", project.title)}>
              <div className={`${styles.cardImage} ${project.slug === "challenge-today" ? styles.challengeImage : styles.metricImage}`}>
                <span className={styles.cardImageLabel}>{project.category}</span>
                <Image src={project.image} alt={project.imageAlt} width={project.slug === "challenge-today" ? 1039 : 1343} height={project.slug === "challenge-today" ? 689 : 675} sizes="(max-width: 800px) 90vw, 720px"/>
                <span className={styles.imageArrow}><Icon name="external"/></span>
              </div>
            </Link>
            <div className={styles.cardBody}>
              <div className={styles.projectMeta}><span>PROJECT {project.number}</span><span>{project.period}</span></div>
              <h3><Link href={`/projects/${project.slug}`}>{project.title}<Icon name="external"/></Link></h3>
              <p className={styles.cardTagline}>{project.tagline}</p>
              <ul className={styles.contributions}>{project.summary.map((item) => <li key={item}>{item}</li>)}</ul>
              <ul className={styles.tags} aria-label={t("사용 기술")}>{project.tech.slice(0, 5).map((tech) => <li key={tech}>{tech}</li>)}</ul>
              <div className={styles.cardFooter}><Link href={`/projects/${project.slug}`} className={styles.textLink}>{t("문제 해결 과정 보기")}<Icon name="arrow"/></Link><span className={styles.demoHint}>{t("직접 체험하는 데모 포함")}</span></div>
            </div>
          </article>)}</div>
        </section>

        <section id="experience" className={styles.homeSection}>
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>EXPERIENCE</p><h2>{t("제품을 만들고, 운영하며")}</h2></div></div>
          <div className={styles.company}><div><h3>{profile.company}</h3><p>Frontend Developer</p></div><span>{profile.period}</span></div>
          <p className={styles.sectionDescription}>{t("기획·백엔드·마케팅과 요구사항 및 데이터 구조를 조율하며 제품을 개선했습니다.")}</p>
          <div className={styles.supportingList}>{supportingExperience.map((item, index) => <article key={item.title} className={styles.supportingItem}><span className={styles.experienceNumber}>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p><p className={styles.supportingTech}>{item.tech}</p></div></article>)}</div>
          <Link href="/resume" className={styles.textLink}>{t("이력서 전체 보기")}<Icon name="arrow"/></Link>
        </section>

        <section id="contact" className={`${styles.homeSection} ${styles.contact}`}>
          <p className={styles.eyebrow}>LET’S TALK</p><h2>{t("함께 만들 제품이 있다면.")}</h2>
          <p>{t("경험과 프로젝트에 관해 더 나누고 싶은 이야기가 있다면 이메일로 연락해 주세요.")}</p>
          <a className={styles.contactEmail} href={`mailto:${profile.email}`}>{profile.email}<Icon name="external"/></a>
          <div className={styles.downloads}><a href="/documents/resume.pdf" download={t("김동영_프론트엔드_이력서.pdf")}><Icon name="download"/>{t("이력서 PDF")}</a><a href="/documents/portfolio.pdf" download={t("김동영_프론트엔드_포트폴리오.pdf")}><Icon name="download"/>{t("포트폴리오 PDF")}</a></div>
        </section>
        <footer className={styles.footer}><span>{t("김동영 · Frontend Developer")}</span><a href="#about">{t("처음으로 ↑")}</a></footer>
      </main>
    </div>
  </div>;
}
