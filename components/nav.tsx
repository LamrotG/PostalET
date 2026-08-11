"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { localePath } from "@/lib/locale";
import { t } from "@/lib/i18n";

export function Nav() {
  const { lang, setLang } = useLanguage();
  const [isDark, setIsDark] = useState(() => {
    try {
      const storedTheme = window.localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return storedTheme === "dark" || (!storedTheme && prefersDark);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      window.localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href={localePath("/", lang)} className="text-[1.125rem] font-semibold tracking-tight">
          Postal<span className="text-muted-foreground">Et</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-muted-foreground sm:gap-6">
          <Link href={localePath("/", lang)} className="transition-colors hover:text-foreground">
            {t("search", lang)}
          </Link>
          <Link
            href={localePath("/directory", lang)}
            className="transition-colors hover:text-foreground"
          >
            {t("directory", lang)}
          </Link>
          <Link
            href={localePath("/about", lang)}
            className="transition-colors hover:text-foreground"
          >
            {t("about", lang)}
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "am" : "en")}
            aria-label={t(lang === "en" ? "switch_to_amharic" : "switch_to_english", lang)}
            className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-muted"
          >
            {lang === "en" ? t("language_am", lang) : t("language_en", lang)}
          </button>
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-foreground/40 hover:bg-muted"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
