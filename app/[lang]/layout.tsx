import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/lib/language-context";
import { DocumentLanguage } from "@/components/document-language";
import { notFound } from "next/navigation";

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  return <LangShell params={params}>{children}</LangShell>;
}

async function LangShell({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "am") notFound();
  const locale = lang;
  return (
    <LanguageProvider key={locale} initialLang={locale}>
      <DocumentLanguage locale={locale} />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
