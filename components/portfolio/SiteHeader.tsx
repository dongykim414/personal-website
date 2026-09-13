"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import Link from "@/components/i18n/LocalizedLink";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icons";
import styles from "./site.module.css";
export function SiteHeader() {
    const { t, locale } = useLanguage();
    const pathname = usePathname();
    const path = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const languagePath = locale === "en" ? path : `/en${path === "/" ? "" : path}`;
    return <header className={styles.header}>
    <a className={styles.skip} href="#main-content">{t("본문으로 건너뛰기")}</a>
    <div className={styles.headerInner}>
      <Link className={styles.brand} href="/" aria-label={t("김동영 홈")}><span className={styles.brandMark}>dy<span>.</span></span><span className={styles.brandName}>{t("김동영")}<span>Frontend Developer</span></span></Link>
      <nav className={styles.topNav} aria-label={t("주 메뉴")}>
        <Link href="/" aria-current={path === "/" ? "page" : undefined}>{t("소개")}</Link>
        <Link href="/#projects" aria-current={path.startsWith("/projects/") ? "page" : undefined}>{t("프로젝트")}</Link>
        <Link href="/resume" aria-current={path === "/resume" ? "page" : undefined}>{t("이력서")}</Link>
        <a className={styles.headerContact} href="mailto:Dongykim414@gmail.com"><span>{t("연락하기")}</span><Icon name="external"/></a>
      </nav>
      <NextLink className={styles.languageSwitch} href={languagePath} hrefLang={locale === "en" ? "ko" : "en"} aria-label={locale === "en" ? "Switch to Korean" : "Switch to English"} onClick={(event) => {
        if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
          event.currentTarget.href = `${languagePath}${window.location.search}${window.location.hash}`;
          event.preventDefault();
          window.location.assign(event.currentTarget.href);
        }
      }}><span lang="ko">한국어</span><span aria-hidden="true"> / </span><span lang="en">EN</span><span className={styles.srOnly}>{locale === "en" ? " — English selected" : " — 한국어 선택됨"}</span></NextLink>
    </div>
  </header>;
}
