import Link from "next/link";
import { FARMERS, formatIDR } from "@/lib/data";
import { Search } from "lucide-react";

export const metadata = {
  title: "Farmers — Asli",
};

const COMMODITY_FILTERS = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "nutmeg", label: "Nutmeg", emoji: "🌰" },
  { id: "clove", label: "Clove", emoji: "🌿" },
  { id: "vanilla", label: "Vanilla", emoji: "🌸" },
  { id: "wild-honey", label: "Wild honey", emoji: "🍯" },
  { id: "cacao", label: "Cacao", emoji: "🍫" },
];

export default function FarmersPage() {
  return (
    <section className="paper flex-1">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-20">
        <div className="flex flex-col gap-3 mb-10 fade-up">
          <span className="chip self-start">🌿 The Asli network</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight">
            {FARMERS.length} farmers.
            <br />
            <span className="text-[var(--moss)]">
              {new Set(FARMERS.map((f) => f.island)).size} islands.
            </span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl mt-2 leading-relaxed">
            Every farmer here owns their own micro-storefront. Pick a story.
            Scan a DPID. Tip directly. Pre-order their next harvest.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto -mx-1 px-1 pb-2">
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-[var(--muted)] mr-2 flex-shrink-0">
            <Search size={14} />
            Filter
          </div>
          {COMMODITY_FILTERS.map((c) => (
            <button
              key={c.id}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold tap ${
                c.id === "all"
                  ? "bg-[var(--fg)] text-[var(--ivory)]"
                  : "bg-[var(--ivory)] text-[var(--fg-soft)] border border-[var(--line)] hover:border-[var(--moss)]"
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FARMERS.map((f, i) => (
            <Link
              key={f.slug}
              href={`/farmers/${f.slug}`}
              className="group bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 tap flex flex-col gap-4 fade-up"
              style={{ animationDelay: `${60 + i * 50}ms` }}
            >
              {/* Big tinted header strip with emoji */}
              <div
                className="rounded-2xl h-24 flex items-center justify-center text-5xl"
                style={{ background: `var(--${f.tint}-soft)` }}
              >
                {f.emoji}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-extrabold leading-tight truncate">
                    {f.name}
                  </p>
                  <span
                    className="text-[10px] uppercase tracking-widest font-bold flex-shrink-0"
                    style={{ color: `var(--${f.tint})` }}
                  >
                    {f.commodity === "wild-honey" ? "honey" : f.commodity}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  {f.village}, {f.region} · {f.island}
                </p>
              </div>

              <p className="text-sm text-[var(--fg-soft)] line-clamp-3 leading-relaxed">
                &ldquo;{f.story}&rdquo;
              </p>

              <div className="mt-auto pt-4 border-t border-[var(--line)] grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-extrabold tabular-nums">
                    {f.batch.farmerSharePct}%
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    to farmer
                  </p>
                </div>
                <div>
                  <p className="text-sm font-extrabold tabular-nums">
                    {(Math.abs(f.batch.co2PerKgGrams) / 1000).toFixed(1)}kg
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    CO₂ removed
                  </p>
                </div>
                <div>
                  <p className="text-sm font-extrabold tabular-nums">
                    {formatIDR(f.yearlyEarned).replace("Rp ", "")}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    this year
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
