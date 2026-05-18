import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)]">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5 tap">
          <span className="text-2xl font-extrabold tracking-tight text-[var(--moss)]">
            Asli
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--muted)] hidden sm:inline">
            Indonesia
          </span>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-2 text-sm font-semibold">
          <Link
            href="/farmers"
            className="px-2.5 sm:px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap"
          >
            Farmers
          </Link>
          <Link
            href="/how"
            className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden sm:inline-block"
          >
            How
          </Link>
          <Link
            href="/impact"
            className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden md:inline-block"
          >
            Impact
          </Link>
          <Link
            href="/spec"
            className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden md:inline-block"
          >
            Spec
          </Link>
          <Link
            href="/scan"
            className="ml-1 px-4 py-2 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            Scan
          </Link>
        </div>
      </nav>
    </header>
  );
}
