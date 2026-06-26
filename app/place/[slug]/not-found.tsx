import Link from "next/link";

export default function PlaceNotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Place not found</h1>
      <p className="text-muted-foreground">
        We couldn&apos;t find a place matching this URL. It may have been removed
        or the link may be incorrect.
      </p>
      <Link
        href="/"
        className="mt-2 text-sm font-medium underline underline-offset-4 hover:text-foreground"
      >
        Back to search
      </Link>
    </div>
  );
}
