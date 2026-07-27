import type {
  AdditionalExperienceData,
  Project,
  ResumeData,
} from "./data";

export const coreStack: string[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "Recoil",
  "Redux",
  "D3.js",
  "Visx",
  "Material UI",
  "Axios",
  "SCSS",
  "Amplitude",
  "AWS CloudWatch",
  "Git",
  "GitHub",
];

export const projects: Project[] = [
  {
    id: "webtoon-metrics",
    kicker: "B2B Data Product",
    title: "웹툰 성과 분석 및 마케팅 솔루션",
    description:
      "웹툰 사업자와 작가가 작품 및 캠페인의 매출, 순위, 독자 지표를 조회하고 마케팅 성과를 분석하는 B2B 제품입니다.",
    tech: ["React", "TypeScript", "Recoil", "Material-UI", "D3.js", "Visx", "Axios"],
    details: [
      {
        label: "고객 활용 성과",
        result: {
          body: "2024년 상반기 웹툰메트릭을 활용한 5개 마케팅 캠페인에서 캠페인당 평균 독자 5,800명 확보, 작품 순위 평균 20위 상승, 매출 평균 69% 증가를 기록했습니다.",
        },
      },
      {
        label: "담당 및 기여",
        description:
          "프론트엔드 개발 2인 중 데이터 시각화, 유료 분석 리포트, 고객 시연 환경을 주로 담당했습니다.",
        items: [
          "작품별 유료 분석 리포트와 웹툰·캠페인 성과를 통합 조회하는 B2B 대시보드 개발",
          "매출, 순위, 독자 및 캠페인 지표의 정보 구조를 정리하고 조건별 필터와 상세 조회 화면 구현",
          "D3.js의 데이터 계산과 React의 SVG 렌더링을 분리해 차트 구조를 구성하고 주요 분석 차트 구현",
          "작품 유형별 웹툰 트렌드 검색과 조건별 탐색 기능 개발",
          "운영 데이터와 분리된 고객 시연용 Demo 환경을 구축해 실제 운영에 영향을 주지 않는 Demo개발",
        ],
      },
    ],
  },
  {
    id: "webtoon-platform",
    kicker: "Public Platform",
    title: "웹툰 연재 플랫폼",
    description:
      "작가가 작품을 등록·공개하고 독자가 작품을 탐색·열람하는 공개 플랫폼입니다. 공모전 참여와 작품 분석 신청 기능을 통해 신규 분석 작품을 확보했습니다.",
    tech: ["React", "TypeScript", "Recoil", "Material-UI", "Axios", "Visx", "Chart.js"],
    details: [
      {
        label: "담당 및 기여",
        description:
          "프론트엔드 개발 2인 중 플랫폼 초기 구축부터 참여해 회원 가입, 작품 등록·탐색·열람, 공모전 접수·분석 신청으로 이어지는 주요 사용자 흐름과 프론트엔드 구조를 함께 설계하고 구현했습니다. 출시 이후에도 신규 기능 개발, 상태 관리와 성능 개선, 서비스 운영을 이어갔습니다.",
        items: [
          "웹툰 연재 플랫폼 MVP의 주요 사용자 화면과 회원 인증 프로세스를 개발하고 외부 인증 서비스 연동",
          "대학생 웹툰 공모전 운영 페이지와 작품 접수·분석 신청 프로세스를 구축하여 2년간 확보 작품 수 약 10배 증가에 기여",
          "모바일과 데스크톱의 서로 다른 이용 방식을 반영해 메인 화면을 개편하고 반응형 UI 구현",
          "Recoil Custom Hook에서 서버 데이터 조회와 캐싱을 관리하여 여러 화면의 동일 데이터 중복 요청 방지",
          "이미지 크기 최적화로 평균 이미지 전송 용량을 약 40% 절감하고 Lazy Loading을 적용해 초기 로딩 리소스 축소",
          "주요 사용자 행동에 대한 Amplitude 이벤트를 정의하고, CloudWatch 운영 로그와 함께 서비스 오류 및 사용자 문의 원인 분석",
        ],
      },
    ],
  },
  {
    id: "webtoon-backoffice",
    kicker: "Internal Operations",
    title: "웹툰 운영 백오피스",
    description:
      "내부 운영자가 작품, 분석 보고서, 광고 검수 및 공모전 진행 상태를 한 곳에서 관리하는 백오피스 시스템입니다.",
    tech: ["React", "Redux", "Material-UI", "SCSS", "Axios", "Chart.js"],
    details: [
      {
        label: "담당 및 기여",
        description:
          "프론트엔드 개발을 단독 담당하여 기존 백오피스를 유지보수하고, 작품·분석·공모전 운영에 필요한 신규 관리 화면을 개발했습니다.",
        items: [
          "작품 조회, 광고 검수, 분석 결과 확인에 필요한 테이블·필터·정렬 기능을 구현하고 주요 운영 화면 개선",
          "정확히 일치하지 않는 검색어로도 작품을 찾을 수 있도록 한글 퍼지 검색을 적용해 작품 탐색 방식 개선",
          "분석 보고서의 지표와 결과 표시 순서를 재구성하고 차트와 상세 정보를 정리해 결과 확인 과정 개선",
          "공모전 진행 단계와 판정 상태를 한 화면에서 추적하고 관리할 수 있는 운영 페이지 개발",
          "Redux에 조회 데이터를 저장해 여러 관리 화면에서 재사용하고 동일 데이터의 반복 API 요청 방지",
        ],
      },
    ],
  },
];

export const additionalExperiences: AdditionalExperienceData[] = [
  {
    title: "웹툰 IP 기반 2.5D 스토리형 모바일 게임",
    description:
      "보유 웹툰 IP의 스토리와 캐릭터를 활용한 턴 진행 방식의 모바일 게임으로, iOS와 Android에 출시했습니다.",
    tech: ["Unity", "C#", "JSON", "iOS", "Android"],
    details: [
      {
        label: "담당 및 기여",
        description:
          "Unity 클라이언트 개발부터 데이터 기반 스토리 진행 구조, 앱 테스트와 스토어 배포까지 담당했습니다.",
        items: [
          "스토리와 캐릭터 연출을 JSON 데이터로 구성하고 턴 단위로 순차 실행하는 게임 진행 구조 구현",
          "웹툰 IP 기반 2.5D 화면과 주요 게임 클라이언트 기능 개발",
          "iOS와 Android 빌드 및 기기 테스트, App Store·Google Play 심사 대응과 출시 담당",
        ],
      },
    ],
  },
  {
    title: "개발 문화 및 온보딩",
    details: [
      {
        label: "기여",
        items: [
          "팀 코드 리뷰에 참여하여 구현 방식과 코드 품질에 대한 피드백 제공",
          "인턴 개발자를 위한 개발 환경 및 온보딩 문서를 작성하고 초기 과제 설계와 코드 리뷰 지원",
        ],
      },
    ],
  },
  {
    title: "기타 프로젝트",
    details: [
      {
        label: "개발",
        items: ["단축 URL을 생성하고 관리하는 링크 서비스의 프론트엔드 화면 개발"],
      },
    ],
  },
];

export const resumeBData: ResumeData = {
  coreStack,
  projects,
  additionalExperiences,
};
