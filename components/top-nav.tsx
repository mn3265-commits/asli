"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname() || "/";
  const isID = pathname === "/id" || pathname.startsWith("/id/");

  // Build EN/ID counterpart of current path
  const counterpart = isID
    ? pathname === "/id"
      ? "/"
      : pathname.replace(/^\/id/, "")
    : pathname === "/"
      ? "/id"
      : `/id${pathname}`;

  const labels = isID
    ? { farmers: "Petani", how: "Cara", impact: "Dampak", spec: "Spec", memo: "Studi", scan: "Pindai" }
    : { farmers: "Farmers", how: "How", impact: "Impact", spec: "Spec", memo: "Memo", scan: "Scan" };

  const links = {
    farmers: isID ? "/id/farmers" : "/farmers",
    how: isID ? "/id/how" : "/how",
    impact: isID ? "/id/impact" : "/impact",
    spec: isID ? "/id/spec" : "/spec",
    memo: isID ? "/id/strategy" : "/strategy",
    scan: isID ? "/id/scan" : "/scan",
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)]">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href={isID ? "/id" : "/"} className="flex items-baseline gap-1.5 tap">
          <span className="text-2xl font-extrabold tracking-tight text-[var(--moss)]">
            Asli
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--muted)] hidden sm:inline">
            Indonesia
          </span>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-2 text-sm font-semibold">
          <Link
            href={links.farmers}
            className="px-2.5 sm:px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap"
          >
            {labels.farmers}
          </Link>
          <Link
            href={links.how}
            className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden sm:inline-block"
          >
            {labels.how}
          </Link>
          <Link
            href={links.impact}
            className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden md:inline-block"
          >
            {labels.impact}
          </Link>
          <Link
            href={links.spec}
            className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden md:inline-block"
          >
            {labels.spec}
          </Link>
          <Link
            href={links.memo}
            className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden lg:inline-block"
          >
            {labels.memo}
          </Link>

          <Link
            href={counterpart}
            className="ml-2 px-2.5 py-1 rounded-full bg-[var(--bg-deep)] text-[var(--fg-soft)] text-xs font-bold tap border border-[var(--line)]"
            title={isID ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <span className={isID ? "opacity-40" : ""}>EN</span>
            <span className="mx-1 opacity-30">·</span>
            <span className={isID ? "" : "opacity-40"}>ID</span>
          </Link>

          <Link
            href={links.scan}
            className="ml-1 px-4 py-2 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            {labels.scan}
          </Link>
        </div>
      </nav>
    </header>
  );
}
