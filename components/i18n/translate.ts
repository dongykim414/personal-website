import content from "./en.json";
import ui from "./ui.en.json";

export type Locale = "ko" | "en";
const english: Record<string, string> = { ...content, ...ui };

export function translate(locale: Locale, key: string, ...values: (string | number)[]): string {
  const template = locale === "en" ? english[key] ?? key : key;
  return template.replace(/\{(\d+)\}/g, (match, index: string) => String(values[Number(index)] ?? match));
}

// Content is plain serializable data. IDs, URLs, dates and technology names
// remain unchanged; only explicitly translated strings are replaced.
export function translateContent<T>(value: T, locale: Locale): T {
  if (locale === "ko") return value;
  if (typeof value === "string") {
    return (english[value] ?? value.split(" · ").map((part) => english[part] ?? part).join(" · ")) as T;
  }
  if (Array.isArray(value)) return value.map((item) => translateContent(item, locale)) as T;
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateContent(item, locale)])) as T;
  }
  return value;
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/documents/") || path.startsWith("/en")) return path;
  return locale === "en" ? `/en${path === "/" ? "" : path.startsWith("/#") ? path.slice(1) : path}` : path;
}
