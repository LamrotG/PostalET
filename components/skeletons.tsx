function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-muted ${className ?? ""}`}
    />
  );
}

export function SearchSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="flex flex-col items-center gap-4 py-16">
        <Shimmer className="h-9 w-72" />
        <Shimmer className="h-5 w-96" />
        <Shimmer className="h-12 w-full max-w-xl rounded-xl" />
      </div>
      <div className="space-y-12 pb-16">
        <section>
          <Shimmer className="mb-4 h-6 w-36" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="flex items-start gap-3">
                  <Shimmer className="mt-0.5 size-4 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Shimmer className="h-4 w-3/5" />
                    <Shimmer className="h-3 w-2/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <Shimmer className="mb-4 h-6 w-40" />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border px-4 py-3">
                <Shimmer className="h-5 w-2/3" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function PlaceSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Shimmer className="mb-6 h-4 w-48" />
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Shimmer className="h-8 w-48" />
          <Shimmer className="h-5 w-16 rounded-full" />
        </div>
        <Shimmer className="mt-2 h-4 w-64" />
      </div>
      <div className="mb-8 rounded-lg border border-border p-6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-9 w-28" />
          </div>
          <div className="space-y-2 text-right">
            <Shimmer className="ml-auto h-4 w-20" />
            <Shimmer className="ml-auto h-7 w-16 rounded-md" />
          </div>
        </div>
        <Shimmer className="mt-4 h-10 w-full rounded-md" />
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-muted/30 px-4 py-3">
            <Shimmer className="h-3 w-16" />
            <Shimmer className="mt-2 h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DirectorySkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <Shimmer className="mb-6 h-8 w-48" />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border px-4 py-3">
            <Shimmer className="h-5 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RegionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <Shimmer className="mb-6 h-4 w-48" />
      <Shimmer className="mb-2 h-8 w-36" />
      <Shimmer className="mb-8 h-4 w-52" />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-4">
            <div className="flex items-start gap-3">
              <Shimmer className="mt-0.5 size-4 rounded-full" />
              <div className="flex-1 space-y-2">
                <Shimmer className="h-4 w-3/5" />
                <Shimmer className="h-3 w-2/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
