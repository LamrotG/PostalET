import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { RegionInfo } from "@/lib/types";
import type { Language } from "@/lib/language-context";
import { localizeRegionName } from "@/lib/localize";
import { localePath } from "@/lib/locale";
import { t } from "@/lib/i18n";

export function Directory({
  regions,
  lang,
}: {
  regions: RegionInfo[];
  lang: Language;
}) {
  if (regions.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">{t("directory_title", lang)}</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((r) => (
          <Link
            key={r.region}
            href={localePath(`/directory/${encodeURIComponent(r.region)}`, lang)}
            className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50"
          >
            <span className="font-medium">
              {localizeRegionName(r.region, r.region_am, lang)}
            </span>
            <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
