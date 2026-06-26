import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center text-sm text-muted-foreground">
        <p>
          PostalEt is a transparency-first Ethiopian postal code directory.
        </p>
        <p>
          Data is sourced from{" "}
          <a
            href="https://en.youbianku.com/Ethiopia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            verified public references
          </a>
          . We always show where information comes from.
        </p>
        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/about"
            className="underline underline-offset-4 hover:text-foreground"
          >
            About & Help
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/about#sources"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Data Sources
          </Link>
        </div>
      </div>
    </footer>
  );
}
