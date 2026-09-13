"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";

import Link from "@/components/i18n/LocalizedLink";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import styles from "@/components/portfolio/site.module.css";
export default function NotFound() {
    const { t } = useLanguage();
    return <div className={styles.site}><SiteHeader /><main id="main-content" className={styles.notFound}><p className={styles.eyebrow}>404 / NOT FOUND</p><h1>{t("페이지를 찾을 수 없습니다.")}</h1><p>{t("주소가 변경되었거나 존재하지 않는 페이지입니다.")}</p><Link href="/" className={styles.primaryButton}>{t("소개와 프로젝트 보기 →")}</Link></main></div>;
}
