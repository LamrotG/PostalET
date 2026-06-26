import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Directory({ regions }: { regions: string[] }) {
  if (regions.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Browse by Region</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <Link
            key={region}
            href={`/directory/${encodeURIComponent(region)}`}
            className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50"
          >
            <span className="font-medium">{region}</span>
            <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
