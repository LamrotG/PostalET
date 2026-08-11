"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { localePath } from "@/lib/locale";
import { t } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-muted-foreground">
        {lang === "am" ? (
          <p>
            PostalEt በግልጽነት የተመሠረተ የኢትዮጵያ የፖስታል ኮድ መዝገብ ነው።
            ውሂቡ {" "}
            <a
              href="https://en.youbianku.com/Ethiopia"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/70 underline underline-offset-4 hover:text-foreground"
            >
              ከተረጋገጡ የህዝብ ምንጮች
            </a>{" "}
            ይሰበሰባል፤ መረጃው ከየት እንደመጣ ሁልጊዜ በግልጽ እንያሳይ እንጥራለን።
          </p>
        ) : (
          <>
            <p>PostalEt is a transparency-first Ethiopian postal code directory.</p>
            <p>
              Data is sourced from{" "}
              <a
                href="https://en.youbianku.com/Ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/70 underline underline-offset-4 hover:text-foreground"
              >
                verified public references
              </a>
              . We always show where information comes from.
            </p>
          </>
        )}
        <div className="flex items-center gap-4 text-xs">
          <Link
            href={localePath("/about", lang)}
            className="underline underline-offset-4 hover:text-foreground"
          >
            {t("about", lang)} & Help
          </Link>
          <span className="text-border">|</span>
          <Link
            href={`${localePath("/about", lang)}#sources`}
            className="underline underline-offset-4 hover:text-foreground"
          >
            {t("sources", lang)}
          </Link>
        </div>
      </div>
    </footer>
  );
}
