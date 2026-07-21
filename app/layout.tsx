import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "김동영 | Frontend Developer",
  description: "김동영 프론트엔드 개발자 웹 이력서",
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
