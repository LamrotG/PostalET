import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const BASE_URL = "https://postal-et.vercel.app";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PostalEt — Ethiopian Postal Code Directory",
    template: "%s | PostalEt",
  },
  description:
    "The most transparent Ethiopian postal code directory. Search verified postal codes with source attribution and confidence ratings.",
  keywords: [
    "Ethiopian postal code",
    "Ethiopia zip code",
    "Addis Ababa postal code",
    "Ethiopia postcode",
    "Ethiopian postal directory",
  ],
  authors: [{ name: "PostalEt" }],
  creator: "PostalEt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "PostalEt",
    title: "PostalEt — Ethiopian Postal Code Directory",
    description:
      "Search verified Ethiopian postal codes with source attribution and confidence ratings. Transparency before certainty.",
  },
  twitter: {
    card: "summary",
    title: "PostalEt — Ethiopian Postal Code Directory",
    description:
      "Search verified Ethiopian postal codes with source attribution and confidence ratings.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${figtree.variable} ${geistMono.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
