"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icons";
import styles from "./site.module.css";

export function SiteHeader() {
  const path = usePathname();
  return <header className={styles.header}>
    <a className={styles.skip} href="#main-content">본문으로 건너뛰기</a>
    <div className={styles.headerInner}>
      <Link className={styles.brand} href="/" aria-label="김동영 홈"><span className={styles.brandMark}>dy<span>.</span></span><span className={styles.brandName}>김동영 <span>Frontend Developer</span></span></Link>
      <nav className={styles.topNav} aria-label="주 메뉴">
        <Link href="/" aria-current={path === "/" ? "page" : undefined}>소개</Link>
        <Link href="/#projects" aria-current={path.startsWith("/projects/") ? "page" : undefined}>프로젝트</Link>
        <Link href="/resume" aria-current={path === "/resume" ? "page" : undefined}>이력서</Link>
        <a className={styles.headerContact} href="mailto:Dongykim414@gmail.com"><span>연락하기</span><Icon name="external" /></a>
      </nav>
    </div>
  </header>;
}
