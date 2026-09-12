export interface CaseSection {
  id: string;
  label: string;
  title: string;
  context: string;
  decisions: { title: string; body: string }[];
  result: string;
  reflection?: string;
  flow?: string[];
  demo?: "manuscript" | "chart";
}

export interface PortfolioProject {
  slug: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  period: string;
  role: string;
  team: string;
  tech: string[];
  image: string;
  imageAlt: string;
  url: string;
  summary: string[];
  sections: CaseSection[];
}

export const profile = {
  name: "김동영",
  email: "Dongykim414@gmail.com",
  company: "오늘의 웹툰",
  period: "2021.05 — 2025.02",
  career: "3년 9개월",
  skills: ["React", "TypeScript", "JavaScript", "Recoil", "D3.js", "SVG", "Axios", "SCSS"],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "challenge-today",
    number: "01",
    category: "B2C PLATFORM",
    title: "오늘의웹툰",
    tagline: "탐색하는 독자와, 작품을 올리는 작가를 연결하다.",
    description: "독자는 작품을 탐색하고 감상하며, 작가는 작품과 회차를 등록·관리하는 웹툰 연재 플랫폼입니다. MVP 단계부터 참여해 원고 편집, 모바일 피드와 공통 데이터 조회를 중심으로 개발했습니다.",
    period: "2022.08 — 2023.09",
    role: "담당 기능 프론트엔드 단독 개발",
    team: "백엔드 개발자 1명과 협업",
    tech: ["React", "TypeScript", "JavaScript", "Recoil", "Axios", "SCSS"],
    image: "/projects/challenge-desktop.webp",
    imageAlt: "오늘의웹툰 PC 화면. 작품 카드와 장르별 목록을 탐색하는 웹툰 플랫폼",
    url: "https://challenge.webtoon.today/",
    summary: [
      "이미지·ZIP 업로드에서 미리보기, 규격 변환, 모바일 순서 편집까지 연결",
      "모바일 피드의 카드 스냅, 앱 내 위치 복원과 추가 조회 구현",
      "작품·작가·회차를 공유하는 Recoil 조회·갱신 구조 구성",
    ],
    sections: [
      {
        id: "manuscript",
        label: "01 / 원고 편집",
        title: "선택한 파일과 제출 가능한 파일을 구분했습니다.",
        context: "파일을 읽는 시점과 서버 업로드가 끝나는 시점은 다릅니다. 사용자는 파일을 추가한 뒤 내용을 확인하고 순서를 바꿀 수 있어야 하며, 최종 제출에는 업로드가 완료된 URL과 편집한 순서가 반영되어야 했습니다.",
        flow: ["파일 선택·검사", "로컬 미리보기", "업로드·로드 확인", "서버 URL 교체", "순서 편집·제출"],
        decisions: [
          { title: "업로드와 화면 표현을 연결", body: "FileReader로 로컬 미리보기를 먼저 표시한 뒤 발급받은 업로드 URL로 파일을 전송했습니다. 원격 이미지가 로드되면 서버 URL로 교체하고 파일별 로딩 표시를 갱신했습니다. ZIP은 서버 압축 해제 API가 반환한 이미지 목록을 편집 데이터에 추가했습니다." },
          { title: "용도에 맞는 이미지 처리", body: "홍보 이미지는 원본·목표 종횡비로 중앙 크롭 영역을 계산해 Canvas에서 600×600으로 변환했습니다. 사용자가 크롭 영역을 지정하는 단일 썸네일에는 react-cropper를 연결했습니다." },
          { title: "마우스와 터치에서 순서 편집", body: "마우스는 드래그 대상과 현재 요소의 위치를 비교하고, 터치는 이미지 중심 좌표·셀 크기·열 수로 이동 인덱스를 계산했습니다. 외부 파일 드롭과 내부 정렬을 구분하고, 범위 밖 이동과 업로드 중 정렬을 제한했습니다." },
        ],
        result: "파일 추가부터 미리보기·규격 변환·순서 편집을 거쳐 접수 데이터로 전달하는 흐름을 구성했습니다. 업로드는 공통 함수로, 단일 이미지·파일명 목록·그리드 표현은 별도 컴포넌트로 나눠 등록과 접수 화면에 사용했습니다.",
        reflection: "다시 설계한다면 안정적인 파일 ID와 파일별 실패·취소·재시도 상태를 명시하겠습니다. 비동기 완료 순서가 달라져도 편집 대상과 제출 데이터가 일치하는지 우선 검증하겠습니다.",
        demo: "manuscript",
      },
      {
        id: "feed",
        label: "02 / 모바일 탐색",
        title: "상세 화면에서 돌아와도, 탐색은 이어지도록 했습니다.",
        context: "PC에서는 여러 작품을 비교하고, 모바일에서는 한 작품에 집중하는 탐색이 필요했습니다. 모바일은 손가락을 떼면 카드 단위로 정렬되고, 상세 화면에서 돌아오면 이전 작품으로 이어져야 했습니다.",
        flow: ["touch·mouse·wheel", "방향·거리 계산", "목표 인덱스", "translateY 스냅", "포커스·추가 조회"],
        decisions: [
          { title: "바깥 피드의 이동 규칙을 직접 구현", body: "시작·이동·종료 좌표와 이전 translateY를 추적했습니다. 카드 높이·마진·방향·임계값으로 목표 인덱스를 계산하고 CSS transform·transition으로 스냅했습니다. wheel에는 짧은 입력 제한을 적용했습니다." },
          { title: "상태의 수명에 따른 저장 위치", body: "마지막 작품 키는 Recoil, 현재 포커스는 React state, 드래그 여부와 이동 좌표는 ref로 관리했습니다. 앱 내 재진입 시 저장된 작품 키의 인덱스를 찾아 위치를 계산했습니다. 브라우저 종료 후 영구 저장과는 구분되는 방식입니다." },
          { title: "라이브러리와 직접 구현의 경계", body: "카드 내부 이미지 페이드·자동 재생은 Swiper가 담당합니다. 재생 완료 콜백을 바깥 피드의 다음 카드 이동에 연결하고, 전환 후 마지막 몇 장에 접근하면 추가 데이터를 요청했습니다. PC에는 탭별 목록과 12개 단위 더보기를 제공했습니다." },
        ],
        result: "PC의 목록 탐색과 모바일의 카드 탐색이 공통 데이터를 활용하도록 구성했습니다. 스와이프, 카드 정렬, 화면 복귀와 다음 데이터 조회를 하나의 흐름으로 연결했습니다.",
        reflection: "직접 제어하는 만큼 카드 크기·경계 인덱스·타이머 정리도 직접 관리해야 합니다. 다음에는 목표 인덱스 계산을 독립 함수로 분리하고, 저장된 작품이 목록에 없는 경우와 애니메이션 중 새 입력을 우선 검증하겠습니다.",
      },
      {
        id: "data",
        label: "03 / 공통 데이터",
        title: "화면별 목록과 공통 작품 데이터를 분리했습니다.",
        context: "피드·검색·상세 화면은 같은 작품 정보를 서로 다른 목록과 UI에서 사용합니다. 화면별 응답을 그대로 보관하면 데이터 조합과 갱신 책임이 곳곳에 흩어질 수 있어 공통 데이터와 조회 경로를 구성했습니다.",
        flow: ["화면별 작품 키", "Custom fetch hook", "미조회 키 일괄 요청", "Recoil 객체 맵", "화면 데이터 조합"],
        decisions: [
          { title: "키 목록과 객체 맵", body: "작품·작가·회차의 조회 키 목록과 데이터 객체 맵을 Recoil에서 관리했습니다. 피드·검색 결과는 작품 키를 보유하고 공통 객체 맵과 조합해 렌더링 데이터를 구성했습니다." },
          { title: "조회와 명시적 갱신", body: "secureFetch는 기존 키를 걸러 필요한 데이터만 요청하고, 작품 다중 키는 API 한 요청에 묶었습니다. refreshTitle·refreshUser·회차 refresh는 기존 데이터도 다시 조회하는 경로로 두었습니다." },
          { title: "등록·신청까지 연결", body: "세션과 작품 소유 정보로 감상·관리 UI를 분기했습니다. 접수 폼에서 인증·필수 정보·업로드 상태를 검증하고 작품 → 회차 → 콘텐츠 → 신청 API를 순차 호출하며 단계별 실패를 안내했습니다." },
        ],
        result: "각 화면이 공통 작품·작가 데이터를 재사용하고 공통 훅으로 조회·갱신 흐름을 사용하도록 구성했습니다. 포커스·로딩·편집 상태는 로컬에서 관리했습니다.",
        reflection: "키를 이용한 메모리 내 재사용 구조이므로 캐시 유효성과 실패 요청의 재조회 정책을 애플리케이션이 책임집니다. 다시 설계한다면 요청 상태와 성공한 캐시를 구분하고 재시도·무효화 정책을 명시하겠습니다.",
      },
    ],
  },
  {
    slug: "webtoon-metric",
    number: "02",
    category: "B2B DATA PRODUCT",
    title: "웹툰 메트릭",
    tagline: "성과 데이터를, 고객이 해석할 수 있는 리포트로.",
    description: "웹툰 작품의 순위·매출·독자와 마케팅 성과를 확인하는 B2B 서비스입니다. 고객용 리포트의 API 연동, 지표별 커스텀 차트, 유료 리포트 상태와 고객 시연용 데모 환경을 구현했습니다.",
    period: "2023.10 — 2024.09",
    role: "Frontend Developer",
    team: "FE 2명 / BE 2명",
    tech: ["React", "TypeScript", "D3.js", "SVG", "Axios", "visx"],
    image: "/projects/metric-desktop.webp",
    imageAlt: "웹툰 메트릭 데모 화면. 작품과 광고 지표를 요약 수치와 차트로 비교하는 대시보드",
    url: "https://metric.webtoon.today",
    summary: [
      "D3 계산과 React SVG 렌더링을 분리한 공통 차트 구성",
      "작품·장르 평균 비교와 지표별 단위·요약 설명 연결",
      "기존 화면과 요청 구조를 재사용하는 고객 시연용 데모 구현",
    ],
    sections: [
      {
        id: "charts",
        label: "01 / 데이터 시각화",
        title: "지표의 의미는 남기고, 차트는 재사용했습니다.",
        context: "내부 운영 중심의 데이터를 고객이 비교·해석할 수 있는 리포트로 구성해야 했습니다. 순위는 작은 숫자가 위에, 매출은 작품과 장르 평균이 같은 차트에 표시되어야 합니다. 축·격자·레이블·프리뷰를 세밀하게 조합할 필요가 있었습니다.",
        flow: ["RankChart·SalesChart", "{ date, value } series", "D3 계산", "React SVG", "단위·범례·요약"],
        decisions: [
          { title: "지표별 컴포넌트가 비교 기준을 결정", body: "RankChart·SalesChart에서 응답을 { date, value } 배열로 변환했습니다. 순위는 1개 series, 매출은 작품·장르 평균 2개 series로 구성해 공통 MultiLineChart에 전달하고 단위·범례·요약을 연결했습니다." },
          { title: "D3는 계산, React는 렌더링", body: "D3의 extent·scaleLinear·scaleTime·line·area로 범위·눈금·좌표·path를 계산하고 React JSX에서 path·line·text·circle을 렌더링했습니다. 툴팁 기준선·점과 HTML 표시 위치도 데이터 좌표에 맞춰 계산했습니다." },
          { title: "지표별 표현을 props로 조합", body: "순위의 Y축을 반전하고 날짜·숫자 축을 구분했습니다. 축·격자 표시, 여백·색상·영역 채우기를 조합해 공통 차트가 각 지표의 표현 차이를 수용하도록 구성했습니다." },
        ],
        result: "순위와 매출이 같은 선형 차트 컴포넌트를 재사용하도록 구성했습니다. 고객이 수치의 추이와 비교 기준을 함께 읽을 수 있는 리포트를 구현했습니다.",
        reflection: "표현을 직접 제어하는 만큼 빈 데이터·좁은 값 범위·눈금·툴팁 좌표 같은 경계 조건도 직접 관리해야 합니다. 공통화는 실제 여러 지표에서 사용하는 표현을 중심으로 잡았습니다.",
        demo: "chart",
      },
      {
        id: "demo",
        label: "02 / 고객 시연",
        title: "같은 화면에서, 응답 경로를 바꿨습니다.",
        context: "고객 시연에서는 기존 서비스 화면을 유지하면서 시연용 데이터를 보여줘야 했습니다. 공통 Axios 요청 경계에 전환 지점을 두고, 데모 대상 요청의 응답 경로를 바꾸는 방식으로 구현했습니다.",
        flow: ["기존 서비스 UI", "공통 API client", "Axios interceptor", "Custom adapter", "Mock handler"],
        decisions: [
          { title: "요청 경계에서 분기", body: "데모 진입 시 모드 설정과 세션 갱신을 연결했습니다. request interceptor에서 데모 여부와 endpoint를 확인하고, 대상 요청에 custom adapter를 연결했습니다." },
          { title: "API와 호환되는 응답", body: "URL 경로에 맞는 mock handler를 선택해 기존 API와 호환되는 응답을 반환하도록 구성했습니다. 데모에서 제공하지 않는 기능은 안내 메시지와 오류 응답으로 처리했습니다." },
        ],
        result: "화면별 시연용 UI를 별도로 만들지 않고 기존 컴포넌트와 API 호출 구조를 재사용했습니다. 실제 고객 시연과 후속 상담에서 사용할 수 있는 데모 환경을 구성했습니다.",
        reflection: "API 응답 형식이나 지원 기능이 바뀌면 mock handler도 함께 관리해야 합니다. UI 공유와 별개로 데모 응답과 전환 범위의 유지보수가 필요합니다.",
      },
      {
        id: "report",
        label: "03 / 리포트 상태",
        title: "구매 여부와 데이터 준비 상태를 구분했습니다.",
        context: "구매 전에는 리포트 구성을 보여주되 상세 수치를 제한하고, 생성 중에는 준비되지 않은 데이터의 표시를 제한해야 했습니다. 전체 구성은 유지하면서 상태에 맞는 데이터와 안내를 연결했습니다.",
        decisions: [
          { title: "Pending · 구매 대기", body: "상세 수치를 마스킹하고 프리뷰 차트와 구매 안내를 표시했습니다." },
          { title: "Generating · 생성 중", body: "리포트 생성 중임을 안내하고 준비되지 않은 상세 데이터의 표시를 제한했습니다." },
          { title: "Complete · 생성 완료", body: "준비된 상세 수치와 분석 차트를 표시했습니다. 데이터가 없는 차트에는 별도 프리뷰 표현을 연결했습니다." },
        ],
        result: "서버가 제공한 상태와 데이터에 따라 사용자가 볼 수 있는 정보와 안내를 구성했습니다. 유료 데이터 제공 권한과 결제 처리는 서버의 책임으로 구분했습니다.",
      },
    ],
  },
];

export const supportingExperience = [
  { title: "공통 UI 컴포넌트", tech: "React · TypeScript · Portal · Context API", body: "Toast·Loading·Drawer를 공통 컴포넌트와 Hook으로 구축해 3개 서비스에 적용했습니다. 중첩 Drawer의 표시 순서와 최상단 Escape 종료 동작을 관리했습니다." },
  { title: "웹툰 운영 백오피스", tech: "React · Redux · Axios · Chart.js", body: "한글 초성·불완전 음절 검색과 미조회 작품 일괄 요청을 구현했습니다. 분석 정보를 도달·열람·참여·독자 특성 순으로 재구성하고 차트로 시각화했습니다." },
  { title: "2.5D 모바일 게임 출시", tech: "Unity · C# · JSON · iOS · Android", body: "JSON 기반 스토리·대사·캐릭터 연출과 주요 클라이언트 기능을 구현했습니다. 기기 테스트 및 App Store·Google Play 심사 대응부터 출시까지 담당했습니다." },
  { title: "코드 리뷰와 운영", tech: "Git · Amplitude · CloudWatch", body: "PR 리뷰와 인턴 개발자의 온보딩 문서·초기 과제·코드 리뷰를 지원했습니다. 사용자 행동 이벤트와 운영 로그를 분석해 서비스 오류 및 고객 문의의 원인을 추적했습니다." },
];
