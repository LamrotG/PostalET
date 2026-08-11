import type { Language } from "@/lib/language-context";

export const SUPPORTED_LOCALES: Language[] = ["en", "am"];

export function isLanguage(value: string | string[] | undefined): value is Language {
  return value === "en" || value === "am";
}

export function stripLocaleFromPath(path: string): string {
  const match = path.match(/^\/(en|am)(\/|$)(.*)$/);
  if (!match) return path;
  const remainder = path.slice(match[1].length + 1);
  return remainder === "" ? "/" : remainder;
}

export function localePath(path: string, locale: Language): string {
  const normalized = stripLocaleFromPath(path);
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
