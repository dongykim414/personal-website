export function ResumeSidebar({ coreStack }: { coreStack: string[] }) {
  return (
    <aside className="sidebar" aria-label="프로필과 연락처">
      <div className="identity">
        <p className="eyebrow">Frontend Developer</p>
        <h1>김동영</h1>
        <p className="identity-role">
          사용자 경험을 구현하고,
          데이터의 흐름을 설계합니다.
        </p>
        <p className="identity-summary">
          작가와 독자가 이용하는 공개 플랫폼부터, 마케터가 성과를 읽는 분석 제품과 운영자가 서비스를 관리하는 백오피스까지 개발했습니다. 서로 다른 사용자의 목적과 업무 흐름을 제품으로 옮기며, 신규 서비스 구축부터 출시 이후 개선과 운영까지 경험했습니다.
        </p>
      </div>

      <section className="side-block">
        <p className="side-label">Contact</p>
        <ul className="contact-list">
          <li>
            <a href="mailto:Dongykim414@gmail.com">Dongykim414@gmail.com</a>
          </li>
          <li>경력 3년 9개월</li>
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
        <a href="#experience">
          업무 경력 <span>01</span>
        </a>
        <a href="#additional">
          추가 경험 <span>02</span>
        </a>
        <a href="#contact">
          연락처 <span>03</span>
        </a>
      </nav>
    </aside>
  );
}
