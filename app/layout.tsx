import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "김동영 | Frontend Developer",
  description: "김동영 프론트엔드 개발자의 이력서와 포트폴리오. React·TypeScript 기반 웹툰 플랫폼, 데이터 시각화와 제품 출시·운영 경험을 소개합니다.",
  openGraph: {
    title: "김동영 | Frontend Developer",
    description: "사용자 경험을 구현하고, 데이터의 흐름을 설계합니다. 경력과 대표 프로젝트, 직접 체험하는 구현 사례를 만나보세요.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
