"use client";

import { useEffect } from "react";
import type { Language } from "@/lib/language-context";

export function DocumentLanguage({ locale }: { locale: Language }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
