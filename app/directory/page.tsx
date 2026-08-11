import type { Metadata } from "next";
import { Directory } from "@/components/directory";
import { getRegions } from "@/lib/data";
import { getServerLanguage } from "@/lib/language-server";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
  const lang = await getServerLanguage((await params).lang);
  return { title: t("directory_title", lang), description: t("directory_description", lang) };
}

export default async function DirectoryPage({ params }: { params?: Promise<{ lang?: string }> }) {
  const lang = await getServerLanguage((await params)?.lang);
  const regions = await getRegions(lang);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        {t("directory_title", lang)}
      </h1>
      <Directory regions={regions} lang={lang} />
    </div>
  );
}
