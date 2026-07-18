"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type Language = "en" | "am";

const COOKIE_NAME = "lang";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookie(): Language | null {
  const match = document.cookie.match(/(?:^|; )lang=(en|am)/);
  return match ? (match[1] as Language) : null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const router = useRouter();

  useEffect(() => {
    // Cookie isn't available during SSR, so the stored language is applied
    // after mount rather than as the initial state (avoids a hydration mismatch).
    const stored = readCookie();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setLangState(stored);
  }, []);

  function setLang(next: Language) {
    setLangState(next);
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=31536000`;
    // Server components read the language from this same cookie, so a
    // refresh is needed for them to re-render in the new language.
    router.refresh();
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
