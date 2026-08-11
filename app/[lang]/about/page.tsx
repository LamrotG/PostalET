import type { Metadata } from "next";
import AboutPage from "@/app/about/page";
import { AmharicAboutPage } from "@/components/about-amharic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "am"
    ? {
        title: "ስለ PostalEt",
        description: "ስለ ኢትዮጵያ የፖስታ ኮዶች፣ PostalEt እንዴት እንደሚሰራ እና የፖስታ ኮድ በማይገኝበት ጊዜ ምን እንደሚደረግ ይወቁ።",
      }
    : {
        title: "About & Help",
        description: "Learn about Ethiopian postal codes, how PostalEt works, and what to do when a postal code is unavailable.",
      };
}

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return lang === "am" ? <AmharicAboutPage /> : <AboutPage />;
}
