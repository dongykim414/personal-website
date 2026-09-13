import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Dongyoung Kim | Frontend Developer",
  description: "Frontend developer with experience building and operating webtoon platforms and B2B data products using React and TypeScript.",
  openGraph: { title: "Dongyoung Kim | Frontend Developer", description: "Experience, selected projects, and interactive implementation examples.", locale: "en_US", type: "website" },
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><LanguageProvider locale="en">{children}</LanguageProvider></body></html>;
}
