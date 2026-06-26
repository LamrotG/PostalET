import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ExternalLink, Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CopyPostalCode } from "@/components/copy-postal-code";
import { SourceAttribution } from "@/components/source-attribution";
import { isGenericSourceUrl, getDirectoryUrl } from "@/lib/sources";
import {
  getPlaceBySlug,
  getRelatedPlaces,
  resolvePostalCode,
  getConfidenceLabel,
} from "@/lib/data";
import type { ConfidenceLevel } from "@/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) {
    return { title: "Place Not Found" };
  }

  const resolved = resolvePostalCode(place.postal_code_claims);
  const postalPart = resolved.postal_code
    ? ` — Postal Code ${resolved.postal_code}`
    : "";

  return {
    title: `${place.full_name}${postalPart}`,
    description: `Find the postal code for ${place.full_name}, ${place.region}, Ethiopia. ${resolved.claim_count} source${resolved.claim_count !== 1 ? "s" : ""} verified.`,
  };
}

const confidenceColor: Record<ConfidenceLevel, string> = {
  high: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-orange-100 text-orange-800",
  unverified: "bg-zinc-100 text-zinc-600",
};

export default async function PlacePage({ params }: Props) {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) notFound();

  const resolved = resolvePostalCode(place.postal_code_claims);
  const relatedPlaces = await getRelatedPlaces(place);

  const BASE_URL = "https://postal-et.vercel.app";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: place.region,
        item: `${BASE_URL}/directory/${encodeURIComponent(place.region)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: place.name,
        item: `${BASE_URL}/place/${place.slug}`,
      },
    ],
  };

  const placeLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: place.full_name,
    address: {
      "@type": "PostalAddress",
      addressRegion: place.region,
      addressCountry: "ET",
      ...(resolved.postal_code && { postalCode: resolved.postal_code }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbLd, placeLd]),
        }}
      />
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/directory/${encodeURIComponent(place.region)}`}
          className="hover:text-foreground"
        >
          {place.region}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{place.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {place.name}
          </h1>
          <Badge variant="secondary" className="capitalize">
            {place.place_type}
          </Badge>
        </div>
        <p className="mt-1 text-muted-foreground">{place.full_name}</p>
      </div>

      {/* Postal Code Card */}
      <div className="mb-8 rounded-lg border border-border p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Postal Code
            </p>
            <div className="mt-1">
              {resolved.postal_code ? (
                <CopyPostalCode code={resolved.postal_code} />
              ) : (
                <p className="text-3xl font-semibold tracking-tight text-muted-foreground/60">
                  Unknown
                </p>
              )}
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-sm font-medium text-muted-foreground">
              Confidence
            </p>
            <span
              className={`mt-1 inline-block rounded-md px-3 py-1 text-sm font-medium capitalize ${confidenceColor[resolved.confidence]}`}
            >
              {resolved.confidence}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>{getConfidenceLabel(resolved.confidence)}</span>
        </div>
      </div>

      {/* Place Details */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <DetailRow label="Region" value={place.region} />
        {place.zone && <DetailRow label="Zone" value={place.zone} />}
        <DetailRow label="Type" value={place.place_type} />
        <DetailRow
          label="Sources"
          value={`${resolved.claim_count} source${resolved.claim_count !== 1 ? "s" : ""}`}
        />
      </div>

      {/* Sources */}
      {place.postal_code_claims.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Sources</h2>
          <div className="space-y-3">
            {place.postal_code_claims.map((claim) => (
              <div
                key={claim.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{claim.source_name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Postal code:{" "}
                      <span className="font-mono font-medium text-foreground">
                        {claim.postal_code}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="capitalize">
                      {claim.source_tier}
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {claim.source_independence}
                    </Badge>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {claim.source_url && !isGenericSourceUrl(claim.source_url) && (
                    <a
                      href={claim.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      <ExternalLink className="size-3" />
                      View source
                    </a>
                  )}
                  {claim.source_url && isGenericSourceUrl(claim.source_url) && (
                    <a
                      href={getDirectoryUrl(claim.source_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      <ExternalLink className="size-3" />
                      View source directory
                    </a>
                  )}
                  {!claim.source_url && (
                    <span className="inline-flex items-center gap-1 text-muted-foreground/60">
                      Direct link not available for this location
                    </span>
                  )}
                  {claim.verified_at && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3" />
                      Verified{" "}
                      {new Date(claim.verified_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
                {claim.notes && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {claim.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Sources — Place exists but postal code unknown */}
      {place.postal_code_claims.length === 0 && (
        <section className="mb-8">
          <div className="rounded-lg border border-dashed border-border p-6">
            <h2 className="font-semibold">Postal code unavailable</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We found the location &ldquo;{place.full_name}&rdquo;, but we
              don&apos;t currently have a verified postal code available for it.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We could not verify an official postal code for this location
              using our available references. This does not mean the location
              is invalid — many Ethiopian locations do not yet have publicly
              documented postal codes.
            </p>
            <div className="mt-4 rounded-md bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                What can you do?
              </p>
              <ul className="mt-1.5 list-inside list-disc space-y-1">
                <li>
                  Check with the Ethiopian Postal Service directly for the most
                  accurate information.
                </li>
                <li>
                  If an international service requires a postal code, placeholder
                  values such as{" "}
                  <span className="font-mono font-medium text-foreground">
                    1000
                  </span>{" "}
                  or{" "}
                  <span className="font-mono font-medium text-foreground">
                    0000
                  </span>{" "}
                  are sometimes used. These are{" "}
                  <strong>not official postal codes</strong>.
                </li>
                <li>
                  If you know a reliable source for this postal code, we would
                  appreciate hearing about it.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Data References */}
      <section className="mb-8">
        <SourceAttribution />
      </section>

      {/* Related Places */}
      {relatedPlaces.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            Other places in {place.region}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {relatedPlaces.map((related) => (
              <Link
                key={related.id}
                href={`/place/${related.slug}`}
                className="group flex items-center gap-2 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <MapPin className="size-4 text-muted-foreground" />
                <div className="min-w-0">
                  <span className="font-medium">{related.name}</span>
                  {related.zone && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {related.zone}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/30 px-4 py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium capitalize">{value}</p>
    </div>
  );
}
