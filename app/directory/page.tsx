import type { Metadata } from "next";
import { Directory } from "@/components/directory";
import { getRegions } from "@/lib/data";
import { getServerLanguage } from "@/lib/language-server";

export const metadata: Metadata = {
  title: "Browse by Region",
  description:
    "Browse Ethiopian postal codes by region. Find postal codes for all regions across Ethiopia.",
};

export default async function DirectoryPage() {
  const [regions, lang] = await Promise.all([
    getRegions(),
    getServerLanguage(),
  ]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        Browse by Region
      </h1>
      <Directory regions={regions} lang={lang} />
    </div>
  );
}
