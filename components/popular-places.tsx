import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Place } from "@/lib/types";

export function PopularPlaces({ places }: { places: Place[] }) {
  if (places.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Popular Places</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <Link
            key={place.id}
            href={`/place/${place.slug}`}
            className="group flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
          >
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium group-hover:text-foreground">
                  {place.name}
                </span>
                <Badge variant="secondary" className="capitalize">
                  {place.place_type}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground truncate">
                {place.region}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
