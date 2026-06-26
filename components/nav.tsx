import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-[1.125rem] font-semibold tracking-tight">
          Postal<span className="text-muted-foreground">Et</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Search
          </Link>
          <Link
            href="/directory"
            className="transition-colors hover:text-foreground"
          >
            Directory
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
