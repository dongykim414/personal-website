import { AdditionalExperience } from "@/components/resume/AdditionalExperience";
import { ExperienceSection } from "@/components/resume/ExperienceSection";
import { ResumeSidebar } from "@/components/resume/ResumeSidebar";
import { UtilityBar } from "@/components/resume/UtilityBar";
import { WorkPrinciples } from "@/components/resume/WorkPrinciples";

export default function Home() {
  return (
    <>
      <UtilityBar />

      <main className="page" id="top">
        <ResumeSidebar />
        <div className="content">
          <section className="section" id="about">
            <header className="section-title">
              <span className="section-index" aria-hidden="true">
                <span className="section-number">01</span>
              </span>
              <h2>소개</h2>
            </header>
            <div className="intro">
              <p>
                사용자가 편하게 이용할 수 있고, 팀이 유지보수하기 좋은 서비스를
                만드는 것을 중요하게 생각합니다. 기능 구현에 그치지 않고 서비스의
                목적과 운영 환경을 함께 고려하며 개발합니다.
              </p>
            </div>
          </section>

          <ExperienceSection />
          <AdditionalExperience />
          <WorkPrinciples />

          <section className="section contact-section" id="contact">
            <div className="footer-contact">
              <p>김동영 · Frontend Developer · Seoul, Korea</p>
              <a href="mailto:Dongykim414@gmail.com">
                Dongykim414@gmail.com ↗
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
