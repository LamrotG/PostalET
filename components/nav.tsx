"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function Nav() {
  const { lang, setLang } = useLanguage();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-[1.125rem] font-semibold tracking-tight">
          Postal<span className="text-muted-foreground">Et</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-muted-foreground sm:gap-6">
          <Link href="/" className="transition-colors hover:text-foreground">
            Search
          </Link>
          <Link
            href="/directory"
            className="transition-colors hover:text-foreground"
          >
            Directory
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "am" : "en")}
            aria-label={lang === "en" ? "Switch to Amharic" : "Switch to English"}
            className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-muted"
          >
            {lang === "en" ? "አማ" : "En"}
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
