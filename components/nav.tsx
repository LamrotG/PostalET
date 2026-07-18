"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Nav() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-[1.125rem] font-semibold tracking-tight">
          Postal<span className="text-muted-foreground">Et</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
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
        </nav>
      </div>
    </header>
  );
}
