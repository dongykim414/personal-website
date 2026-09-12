"use client";

import { Icon } from "./Icons";
import styles from "./site.module.css";

export function PrintButton() {
  return <button className={styles.smallButton} type="button" onClick={() => window.print()}>현재 이력서 인쇄 <Icon name="external" /></button>;
}
