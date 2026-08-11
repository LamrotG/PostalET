import type { Language } from "@/lib/language-context";

export function getServerLanguage(lang?: string): Language {
  if (lang === "am") return "am";
  return "en";
}
