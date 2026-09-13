"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon } from "./Icons";
import styles from "./site.module.css";
export function PrintButton() {
    const { t } = useLanguage();
    return <button className={styles.smallButton} type="button" onClick={() => window.print()}>{t("현재 이력서 인쇄")}<Icon name="external"/></button>;
}
