import type { Metadata } from "next";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

import "../globals.css";

export const metadata: Metadata = {
  title: "김동영 | Frontend Developer",
  description: "김동영 프론트엔드 개발자의 이력서. React·TypeScript 기반 웹툰 플랫폼, 데이터 시각화와 제품 출시·운영 경험을 소개합니다.",
  openGraph: {
    title: "김동영 | Frontend Developer",
    description: "오늘의웹툰의 첫 프론트엔드 개발자로 참여한 제품 개발과 운영 경험을 소개합니다.",
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
      <body><LanguageProvider locale="ko">{children}</LanguageProvider></body>
    </html>
  );
}
