"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "./LanguageProvider";
import { localizedPath } from "./translate";

export default function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { locale } = useLanguage();
  return <NextLink {...props} href={typeof href === "string" ? localizedPath(href, locale) : href} />;
}
