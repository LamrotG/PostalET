import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PopularPlaceCode } from "@/components/popular-place-code";
import { resolvePostalCode } from "@/lib/data";
import type { PlaceWithClaims } from "@/lib/types";
import type { Language } from "@/lib/language-context";
import { localizePlace } from "@/lib/localize";

export function PopularPlaces({
  places,
  lang,
}: {
  places: PlaceWithClaims[];
  lang: Language;
}) {
  if (places.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Popular Places</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => {
          const localized = localizePlace(place, lang);
          const resolved = resolvePostalCode(place.postal_code_claims);
          return (
            <Link
              key={place.id}
              href={`/place/${place.slug}`}
              className="group flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium group-hover:text-foreground">
                      {localized.name}
                    </span>
                    {place.place_type !== "Locality" && (
                      <Badge variant="secondary" className="capitalize">
                        {place.place_type}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground truncate">
                    {localized.region}
                  </p>
                </div>
                {resolved.postal_code && (
                  <PopularPlaceCode code={resolved.postal_code} />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}