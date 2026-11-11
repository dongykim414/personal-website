"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

import { introduction } from "./data-current";

export function ResumeSidebar({ coreStack }: {
    coreStack: string[];
}) {
    const { t } = useLanguage();
    return (<aside className="sidebar" aria-label={t("프로필과 연락처")}>
      <div className="identity">
        <p className="eyebrow">Frontend Developer</p>
        <h1>{t("김동영")}</h1>
        <p className="identity-role">{t("오늘의웹툰의 첫 프론트엔드 개발자로 합류했습니다.")}</p>
        <p className="identity-summary">{t("웹툰 연재 플랫폼의 초기 MVP부터 출시 후 운영까지 참여하고, 작품과 마케팅 데이터를 활용한 B2B 분석 서비스와 사내 운영 도구를 개발했습니다.")}</p>
        <p className="identity-summary">{t(introduction[1])}</p>
      </div>

      <section className="side-block">
        <p className="side-label">Contact</p>
        <ul className="contact-list">
          <li>
            <a href="mailto:Dongykim414@gmail.com">Dongykim414@gmail.com</a>
          </li>
          <li><a href="tel:01053579878">010-5357-9878</a></li>
        </ul>
      </section>

      <section className="side-block">
        <p className="side-label">Core stack</p>
        <ul className="skill-list">
          {coreStack.map((skill) => (<li key={skill}>{skill}</li>))}
        </ul>
      </section>

      <nav className="side-block page-nav" aria-label={t("페이지 목차")}>
        <p className="side-label">On this page</p>
        <a href="#experience">{t("경력 및 주요 프로젝트")}<span>01</span>
        </a>
        <a href="#additional">{t("기술 및 추가 경험")}<span>02</span>
        </a>
        <a href="#implementations">{t("프로젝트에서 실제로 한 일")}<span>03</span></a>
        <a href="#contact">{t("연락처")}<span>04</span>
        </a>
      </nav>
    </aside>);
}
