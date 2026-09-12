import Link from "next/link";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import styles from "@/components/portfolio/site.module.css";

export default function NotFound() {
  return <div className={styles.site}><SiteHeader /><main id="main-content" className={styles.notFound}><p className={styles.eyebrow}>404 / NOT FOUND</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p><Link href="/" className={styles.primaryButton}>소개와 프로젝트 보기 →</Link></main></div>;
}
