# 김동영 · Frontend Developer

이력서와 프로젝트 사례를 연결하는 개인 웹사이트입니다. 기존 Next.js App Router와 React·TypeScript 구성을 유지하며 프로덕션 의존성을 추가하지 않았습니다.

## 페이지

- `/`: 프로필, 경력 요약, 대표 프로젝트, 추가 경험, 연락처
- `/resume`: 문서형 이력서, PDF 다운로드, 인쇄
- `/projects/challenge-today`: 원고 편집, 모바일 피드, 공통 데이터 조회 사례
- `/projects/webtoon-metric`: 차트, 고객 시연용 데모, 리포트 상태 사례
- `/resume-b`: 기존 경로 유지, 메인으로 이동

## 개발

```bash
npm run dev
```

기존 개발 서버와 Vercel의 Next.js 배포 구성을 그대로 사용할 수 있습니다. 별도 환경 변수나 데이터베이스가 필요하지 않습니다.

PR 준비 과정에서 ESLint는 오류 없이 통과했고 로컬 이미지 미리보기의 `<img>` 경고 2건이 남았습니다. `npx tsc --noEmit`은 통과했습니다. 프로덕션 빌드는 컴파일에 성공했으나 이후 Windows 샌드박스의 하위 프로세스 생성 제한(`spawn EPERM`)으로 완료되지 않았습니다. 브라우저 검증은 실행하지 않았습니다.

## 내용 수정

- `components/portfolio/content.ts`: 프로필, 프로젝트 개요, 상세 사례, 추가 경험
- `components/resume/data-current.ts`: 같은 프로젝트 데이터에 기반한 웹 이력서
- `components/portfolio/site.module.css`: 메인·상세·데모의 반응형 및 인쇄 스타일
- `app/globals.css`: 기존 문서형 이력서의 스타일과 공통 기본값
- `public/projects/`: 기존 포트폴리오에서 가져온 서비스 화면
- `public/documents/resume.pdf`: 다운로드용 이력서. 메트릭 기간 2023.10–2024.09 반영
- `public/documents/portfolio.pdf`: 가로형 포트폴리오

기존 `data.ts`, `data-resume-b.ts`는 이전 문구의 기록으로 남겨 두었습니다. 현재 화면은 최신 대화 자료를 반영한 `content.ts`와 `data-current.ts`를 사용합니다. PDF는 정적 파일이므로 내용을 바꿀 때 별도로 교체해야 합니다.

## 체험용 데모

### 원고 편집

샘플 4장으로 시작합니다. 손잡이의 마우스·터치 드래그, 앞·뒤 버튼, 손잡이의 방향키로 순서를 바꿀 수 있습니다. JPG·PNG·WebP를 파일당 8MB, 최대 8장까지 로컬로 추가할 수 있습니다. 파일은 서버에 업로드하지 않으며 삭제·초기화·컴포넌트 해제 시 Object URL을 정리합니다. ZIP·서버 업로드·Canvas 규격 변환은 실제 제품의 경험 설명에 포함되어 있으며 이 데모의 기능은 아닙니다.

### 지표 차트

React와 SVG로 재구성한 예시입니다. 기간 요약, 매출·순위 전환, 순위 역축, 장르 평균 비교, 차트 포인터 탐색과 정렬 가능한 일별 표를 제공합니다. D3를 사용한 실제 제품 구현과 구분하며 모든 데이터는 가상입니다.

원고 드래그와 지표 차트 데모의 구조 및 유지보수 방법은 [`docs/interactive-demos.md`](docs/interactive-demos.md)에 정리했습니다.

## 사실관계

웹툰 메트릭 기간은 사용자가 정정한 **2023.10–2024.09**, 오늘의웹툰은 **2022.08–2023.09**입니다. 담당 범위는 최신 첨부 문서에 맞췄습니다. 제공되지 않은 GitHub 주소나 성능·테스트 결과를 추가하지 않았습니다.
