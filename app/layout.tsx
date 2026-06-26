import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const BASE_URL = "https://postalet.vercel.app";

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
    <html
      lang="en"
      className={`${figtree.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
