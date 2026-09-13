"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { translate, translateContent } from "./translate";
import type { Locale } from "./translate";

function languageValue(locale: Locale) {
  return {
    locale,
    t: (key: string, ...values: (string | number)[]) => translate(locale, key, ...values),
    content: <T,>(value: T) => translateContent(value, locale),
  };
}
const LanguageContext = createContext(languageValue("ko"));

export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const value = useMemo(() => languageValue(locale), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
