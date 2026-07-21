import { coreStack } from "./data";

export function ResumeSidebar() {
  return (
    <aside className="sidebar" aria-label="프로필과 연락처">
      <div className="identity">
        <p className="eyebrow">Frontend Developer</p>
        <h1>김동영</h1>
        <p className="identity-role">
          사용자 경험과 운영 효율을 함께 개선하는 프론트엔드 개발자
        </p>
        <p className="identity-summary">
          React와 TypeScript 기반의 공개 플랫폼, B2B 데이터 대시보드, 내부 운영
          도구를 개발하고 운영했습니다. 서비스의 목적과 데이터 흐름을 이해하고,
          팀이 유지보수하기 좋은 구조로 구현하는 것을 중요하게 생각합니다.
        </p>
      </div>

      <section className="side-block">
        <p className="side-label">Contact</p>
        <ul className="contact-list">
          <li>
            <a href="mailto:Dongykim414@gmail.com">Dongykim414@gmail.com</a>
          </li>
          <li>Seoul, Korea</li>
        </ul>
      </section>

      <section className="side-block">
        <p className="side-label">Core stack</p>
        <ul className="skill-list">
          {coreStack.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <nav className="side-block page-nav" aria-label="페이지 목차">
        <p className="side-label">On this page</p>
        <a href="#about">
          소개 <span>01</span>
        </a>
        <a href="#experience">
          업무 경력 <span>02</span>
        </a>
        <a href="#additional">
          추가 경험 <span>03</span>
        </a>
        <a href="#principles">
          업무 방식 <span>04</span>
        </a>
        <a href="#contact">
          연락처 <span>05</span>
        </a>
      </nav>
    </aside>
  );
}
