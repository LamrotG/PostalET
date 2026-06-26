import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPlacesByRegion, getRegions } from "@/lib/data";

type Props = {
  params: Promise<{ region: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const decoded = decodeURIComponent(region);

  return {
    title: `${decoded} — Places & Postal Codes`,
    description: `Browse all places and postal codes in ${decoded}, Ethiopia. Find verified postal codes with source information.`,
  };
}

export default async function RegionPage({ params }: Props) {
  const { region } = await params;
  const decoded = decodeURIComponent(region);

  const regions = await getRegions();
  if (!regions.includes(decoded)) notFound();

  const places = await getPlacesByRegion(decoded);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/directory" className="hover:text-foreground">
          Directory
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{decoded}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-semibold tracking-tight">{decoded}</h1>
      <p className="mb-8 text-muted-foreground">
        {places.length} place{places.length !== 1 ? "s" : ""} found in this
        region.
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <Link
            key={place.id}
            href={`/place/${place.slug}`}
            className="group flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
          >
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{place.name}</span>
                <Badge variant="secondary" className="capitalize">
                  {place.place_type}
                </Badge>
              </div>
              {place.zone && (
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {place.zone}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
