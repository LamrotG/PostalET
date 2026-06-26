import { Search } from "@/components/search";
import { PopularPlaces } from "@/components/popular-places";
import { Directory } from "@/components/directory";
import { getPopularPlaces, getRegions } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PostalEt",
  url: "https://postal-et.vercel.app",
  description:
    "The most transparent Ethiopian postal code directory. Search verified postal codes with source attribution and confidence ratings.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://postal-et.vercel.app/api/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  const [popularPlaces, regions] = await Promise.all([
    getPopularPlaces(),
    getRegions(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-5xl px-4">
        <section className="flex flex-col items-center gap-4 py-16 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Find Ethiopian Postal Codes
          </h1>
          <p className="max-w-md text-muted-foreground">
            Search by place name, city, zone, region, or postal code. Every
            result shows where the data comes from.
          </p>
          <Search />
        </section>

        <div className="space-y-12 pb-16">
          <PopularPlaces places={popularPlaces} />
          <Directory regions={regions} />
        </div>
      </div>
    </>
  );
}
