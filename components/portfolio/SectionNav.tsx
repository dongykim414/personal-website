"use client";

import { useEffect, useState } from "react";
import styles from "./site.module.css";

export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    const elements = items.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-15% 0px -50% 0px", threshold: 0 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);
  return <nav className={styles.sectionNav} aria-label="본문 목차">{items.map(({ id, label }, index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}><span className={styles.navNumber}>{String(index + 1).padStart(2, "0")}</span>{label}<span className={styles.navLine} /></a>)}</nav>;
}
