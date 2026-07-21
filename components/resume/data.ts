export type DetailBlock = {
  label: string;
  items?: string[];
  groups?: Array<{ title: string; items: string[] }>;
  result?: {
    title: string;
    body: string;
    note: string;
  };
};

export type Project = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  tech: string[];
  details: DetailBlock[];
};

export const coreStack = [
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
    title: "웹툰 성과 분석 및 마케팅 솔루션(웹툰 메트릭)",
    description:
      "웹툰메트릭은 웹툰 트렌드와 작품 성과를 분석하고, 광고 및 바이럴 캠페인 성과를 한 곳에서 확인할 수 있는 웹툰 마케팅 솔루션입니다. 웹툰 사업자와 개인 작가가 매출, 순위, 독자 지표를 바탕으로 마케팅 성과를 확인하고 홍보 전략을 수립할 수 있도록 서비스를 제공합니다.",
    tech: ["React", "TypeScript", "Recoil", "Material-UI", "D3.js", "Visx", "Axios"],
    details: [
      {
        label: "역할",
        items: [
          "웹툰 트렌드 및 마케팅 솔루션 FE 개발 및 운영",
          "리포트 정보 구조와 데이터 시각화 UI 설계 및 구현",
          "유료 리포트 및 B2B 고객 시연 환경 개발",
        ],
      },
      {
        label: "서비스 성과",
        result: {
          title: "웹툰메트릭을 활용한 마케팅 캠페인 결과",
          body: "2024년 상반기 5개 캠페인에서 캠페인당 평균 독자 5,800명 획득, 평균 순위 20위 상승, 평균 매출 69% 증가를 기록했습니다.",
          note: "개인 개발 성과가 아닌 서비스 활용 사례입니다.",
        },
      },
      {
        label: "주요 업무",
        items: [
          "유형별 웹툰 트렌드 검색 및 작품별 유료 분석 리포트 화면 개발",
          "웹툰 성과와 마케팅 성과를 통합 조회하는 B2B 대시보드 개발",
          "조건별 필터링 및 상세 성과 조회 기능 개발",
          "비즈니스 지표 시각화를 위한 D3.js 기반 React 차트 및 공통 시각화 구조 개발",
          "운영 데이터와 분리된 B2B 고객 시연용 Demo 환경 구축",
        ],
      },
    ],
  },
  {
    id: "webtoon-platform",
    kicker: "Public Platform",
    title: "웹툰 연재 플랫폼",
    description:
      "오늘의웹툰은 작가가 웹툰 작품을 등록·공개하고 독자가 웹툰을 탐색, 열람할 수 있는 공개형 웹툰 연재 플랫폼입니다. 작품 분석 신청과 공모전 참여 기능을 통해 분석 대상 작품을 지속적으로 확보합니다.",
    tech: ["React", "TypeScript", "Recoil", "Material-UI", "Axios", "Visx", "Chart.js"],
    details: [
      {
        label: "역할",
        items: [
          "신규 웹툰 플랫폼 FE 구축 및 운영",
          "서비스 고도화 및 신규 기능 개발",
          "프론트엔드 구조 및 성능 개선",
        ],
      },
      {
        label: "주요 업무",
        groups: [
          {
            title: "서비스 구축 및 기능 개발",
            items: [
              "신규 작품 확보를 위한 웹툰 연재 플랫폼 MVP 개발 및 출시",
              "대학생 웹툰 공모전 운영 페이지와 작품 접수·분석 신청 프로세스를 구축하여 2년간 확보 작품 수 약 10배 증가에 기여",
              "모바일·데스크톱 환경별 메인 페이지를 개편하고 반응형 UI 구현",
              "회원 인증 프로세스 개발 및 외부 인증 서비스 연동",
            ],
          },
          {
            title: "구조 및 성능 개선",
            items: [
              "Recoil과 Custom Hook을 활용해 API 응답 캐싱 구조를 구현하여 중복 API 요청 최소화",
              "컴포넌트 책임과 상태 관리 범위를 분리하여 불필요한 리렌더링 최소화",
              "이미지 크기 최적화로 평균 이미지 전송 용량을 약 40% 절감하고 Lazy Loading을 적용하여 초기 로딩 리소스 축소",
              "반복 UI를 공통 컴포넌트로 분리하여 중복 코드를 줄이고 화면 개발 및 유지보수 효율 개선",
            ],
          },
          {
            title: "데이터 수집 및 운영 개선",
            items: [
              "주요 사용자 행동에 대한 Amplitude 이벤트를 정의하고 로그 전송",
              "AWS CloudWatch 운영 로그를 활용한 서비스 오류 및 사용자 문의 원인 분석과 이슈 대응",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "webtoon-backoffice",
    kicker: "Internal Operations",
    title: "웹툰 운영 백오피스",
    description:
      "웹툰 운영 백오피스는 내부 운영자가 작품 운영 정보, 데이터 분석 업무, 공모전 프로세스를 통합적으로 관리할 수 있도록 지원하는 백오피스 시스템입니다. 공모전과 같은 별도 운영 프로세스의 진행 현황과 판정 흐름도 함께 관리할 수 있도록 지원합니다.",
    tech: ["React", "Redux", "Material-UI", "SCSS", "Axios", "Chart.js"],
    details: [
      {
        label: "역할",
        items: [
          "FE 기능 개발 및 유지보수",
          "기존 백오피스 플랫폼 기능 개선",
          "운영자 사용성 개선 및 신규 관리 페이지 개발",
        ],
      },
      {
        label: "주요 업무",
        items: [
          "분석 보고서 화면 고도화를 통해 주요 지표의 가독성과 분석 결과 해석 편의성 개선",
          "공모전 운영 페이지 개발로 진행 단계 및 판정 상태 관리 흐름을 체계화하고 반복 운영 업무 일부 자동화",
          "작품 관리 및 분석 운영 플랫폼의 주요 운영 화면을 개선하여 작품 조회, 광고 검수, 분석 결과 확인 등 반복적인 내부 관리 업무의 효율성 개선",
        ],
      },
    ],
  },
];

export const additionalExperiences = [
  {
    title: "웹툰 IP 기반 2.5D 스토리형 모바일 게임",
    description:
      "보유 웹툰 IP의 스토리와 캐릭터를 활용한 턴 진행 방식의 2.5D 모바일 게임입니다. 스토리와 연출을 데이터로 구성해 순차적으로 실행하도록 개발하고 iOS와 Android에 출시했습니다.",
    tech: ["Unity", "C#", "JSON", "iOS", "Android"],
    details: [
      {
        label: "역할",
        items: [
          "Unity 기반 모바일 게임 클라이언트 개발",
          "데이터 기반 게임 진행 구조 및 콘텐츠 연출 구현",
          "iOS 및 Android 앱 출시와 배포 운영",
        ],
      },
      {
        label: "주요 업무",
        items: [
          "웹툰 IP 기반 2.5D 스토리형 모바일 게임 개발 및 iOS, Android 출시",
          "스토리와 연출을 데이터로 구성하고 턴 단위로 실행하는 게임 진행 구조 구현",
          "App Store와 Google Play 테스트, 심사 대응 및 배포 프로세스 담당",
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
