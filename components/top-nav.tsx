"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export function TopNav() {
  const pathname = usePathname() || "/";
  const isID = pathname === "/id" || pathname.startsWith("/id/");
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

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
        more: "Lainnya",
        switchTo: "Ganti ke English",
        menu: "Menu",
        close: "Tutup",
        primary: "Utama",
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
        more: "More",
        switchTo: "Switch to English",
        menu: "Menu",
        close: "Close",
        primary: "Main",
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

  // Same item structure used by both mobile overlay and desktop inline
  const primaryItems = [
    { href: links.farmers, label: labels.farmers },
    { href: links.how, label: labels.how },
    { href: links.impact, label: labels.impact },
    { href: links.spec, label: labels.spec },
    { href: links.memo, label: labels.memo },
  ];
  const moreItems = [
    { href: links.faq, label: labels.faq },
    { href: links.roadmap, label: labels.roadmap },
    { href: links.sources, label: labels.sources },
  ];

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
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

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    if (!moreOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [moreOpen]);

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

          {/* Inline nav — md and up. Below md uses the hamburger overlay so
              both surfaces show the same 5 primary + 3 "more" items. */}
          <div className="hidden lg:flex items-center gap-0.5 lg:gap-1 text-sm font-semibold">
            {primaryItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap"
              >
                {it.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((p) => !p)}
                className="px-3 py-2 rounded-full text-[var(--fg-soft)] hover:text-[var(--moss)] tap inline-flex items-center gap-1"
              >
                {labels.more}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              {moreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 min-w-[180px] bg-[var(--ivory)] border border-[var(--line)] rounded-2xl shadow-lg overflow-hidden animate-[fade-up_0.15s_ease-out]"
                >
                  {moreItems.map((it) => (
                    <Link
                      key={it.href}
                      role="menuitem"
                      href={it.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-[var(--fg)] hover:bg-[var(--moss-soft)] hover:text-[var(--moss)] tap"
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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

          {/* Mobile cluster — below md */}
          <div className="flex lg:hidden items-center gap-2">
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

      {/* Mobile overlay — same primary + more grouping as desktop */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[var(--bg)] flex flex-col animate-[fade-up_0.2s_ease-out]">
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
            <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mb-2 px-1">
              {labels.primary}
            </div>
            {primaryItems.map((it) => (
              <MenuLink key={it.href} href={it.href} label={it.label} />
            ))}

            <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mt-6 mb-2 px-1">
              {labels.more}
            </div>
            {moreItems.map((it) => (
              <MenuLink key={it.href} href={it.href} label={it.label} />
            ))}

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
