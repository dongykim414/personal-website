import Link from "next/link";

export type ResumeVariant = "default" | "resume-b";

export function UtilityBar({ variant }: { variant: ResumeVariant }) {
  return (
    <header className="utility-bar">
      <div className="utility-inner">
        <a className="brand" href="#top" aria-label="페이지 처음으로">
          <span className="brand-mark" aria-hidden="true">
            DY
          </span>
          <span>Kim Dongyoung</span>
        </a>
        <nav className="resume-switcher" aria-label="이력서 버전 선택">
          <Link href="/" aria-current={variant === "default" ? "page" : undefined}>
            기본
          </Link>
          <Link
            href="/resume-b"
            aria-current={variant === "resume-b" ? "page" : undefined}
          >
            비교 B
          </Link>
        </nav>
      </div>
    </header>
  );
}
