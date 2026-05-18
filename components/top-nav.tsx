"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function TopNav() {
  const pathname = usePathname() || "/";
  const isID = pathname === "/id" || pathname.startsWith("/id/");
  const [open, setOpen] = useState(false);

  const counterpart = isID
    ? pathname === "/id"
      ? "/"
      : pathname.replace(/^\/id/, "")
    : pathname === "/"
      ? "/id"
      : `/id${pathname}`;

  const labels = isID
    ? {
        farmers: "Petani",
        how: "Cara",
        impact: "Dampak",
        spec: "Spec",
        memo: "Studi",
        scan: "Pindai",
        faq: "FAQ",
        roadmap: "Roadmap",
        sources: "Sumber",
        switchTo: "Ganti ke English",
        menu: "Menu",
        close: "Tutup",
      }
    : {
        farmers: "Farmers",
        how: "How",
        impact: "Impact",
        spec: "Spec",
        memo: "Memo",
        scan: "Scan",
        faq: "FAQ",
        roadmap: "Roadmap",
        sources: "Sources",
        switchTo: "Switch to English",
        menu: "Menu",
        close: "Close",
      };

  const prefix = isID ? "/id" : "";
  const links = {
    farmers: `${prefix}/farmers`,
    how: `${prefix}/how`,
    impact: `${prefix}/impact`,
    spec: `${prefix}/spec`,
    memo: `${prefix}/strategy`,
    scan: `${prefix}/scan`,
    faq: `${prefix}/faq`,
    roadmap: `${prefix}/roadmap`,
    sources: `${prefix}/sources`,
  };

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)]">
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link
            href={isID ? "/id" : "/"}
            className="flex items-baseline gap-1.5 tap"
          >
            <span className="text-2xl font-extrabold tracking-tight text-[var(--moss)]">
              Asli
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--muted)] hidden sm:inline">
              Indonesia
            </span>
          </Link>

          {/* Inline links — sm and up */}
          <div className="hidden sm:flex items-center gap-0.5 sm:gap-2 text-sm font-semibold">
            <Link
              href={links.farmers}
              className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap"
            >
              {labels.farmers}
            </Link>
            <Link
              href={links.how}
              className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap"
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
              href={links.faq}
              className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap hidden lg:inline-block"
            >
              {labels.faq}
            </Link>

            <Link
              href={counterpart}
              className="ml-2 px-2.5 py-1 rounded-full bg-[var(--bg-deep)] text-[var(--fg-soft)] text-xs font-bold tap border border-[var(--line)]"
              title={labels.switchTo}
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

          {/* Hamburger — mobile only */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href={counterpart}
              className="px-2.5 py-1 rounded-full bg-[var(--bg-deep)] text-[var(--fg-soft)] text-xs font-bold tap border border-[var(--line)]"
              title={labels.switchTo}
            >
              <span className={isID ? "opacity-40" : ""}>EN</span>
              <span className="mx-1 opacity-30">·</span>
              <span className={isID ? "" : "opacity-40"}>ID</span>
            </Link>
            <button
              aria-label={open ? labels.close : labels.menu}
              aria-expanded={open}
              onClick={() => setOpen((p) => !p)}
              className="w-10 h-10 rounded-full bg-[var(--moss)] text-[var(--ivory)] flex items-center justify-center tap"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50 sm:hidden bg-[var(--bg)] flex flex-col animate-[fade-up_0.2s_ease-out]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
            <Link
              href={isID ? "/id" : "/"}
              className="flex items-baseline gap-1.5"
              onClick={() => setOpen(false)}
            >
              <span className="text-2xl font-extrabold tracking-tight text-[var(--moss)]">
                Asli
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--muted)]">
                Indonesia
              </span>
            </Link>
            <button
              aria-label={labels.close}
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-[var(--bg-deep)] text-[var(--fg)] flex items-center justify-center tap border border-[var(--line)]"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col">
            <MenuLink href={links.farmers} label={labels.farmers} />
            <MenuLink href={links.how} label={labels.how} />
            <MenuLink href={links.impact} label={labels.impact} />
            <MenuLink href={links.spec} label={labels.spec} />
            <MenuLink href={links.memo} label={labels.memo} />

            <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mt-6 mb-2 px-1">
              {isID ? "Lainnya" : "More"}
            </div>
            <MenuLink href={links.faq} label={labels.faq} />
            <MenuLink href={links.roadmap} label={labels.roadmap} />
            <MenuLink href={links.sources} label={labels.sources} />

            <div className="mt-auto pt-6">
              <Link
                href={links.scan}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-extrabold text-base tap"
              >
                {labels.scan} →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="py-3.5 px-2 text-xl font-extrabold tracking-tight text-[var(--fg)] border-b border-[var(--line)] hover:text-[var(--moss)] tap"
    >
      {label}
    </Link>
  );
}
