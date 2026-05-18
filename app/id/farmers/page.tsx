import Link from "next/link";
import { FARMERS, formatIDR, portraitUrl } from "@/lib/data";
import { Search } from "lucide-react";
import { CommodityArt } from "@/components/commodity-art";
import { OnboardedFarmersBanner } from "@/components/onboarded-farmers-banner";

export const metadata = {
  title: "Petani — Asli",
};

const COMMODITY_FILTERS = [
  { id: "all", label: "Semua", emoji: "✨" },
  { id: "coffee", label: "Kopi", emoji: "☕" },
  { id: "nutmeg", label: "Pala", emoji: "🌰" },
  { id: "clove", label: "Cengkeh", emoji: "🌿" },
  { id: "vanilla", label: "Vanili", emoji: "🌸" },
  { id: "wild-honey", label: "Madu hutan", emoji: "🍯" },
  { id: "cacao", label: "Kakao", emoji: "🍫" },
];

const COMMODITY_LABEL_ID: Record<string, string> = {
  coffee: "kopi",
  nutmeg: "pala",
  clove: "cengkeh",
  vanilla: "vanili",
  "wild-honey": "madu",
  cacao: "kakao",
};

export default function FarmersPageID() {
  return (
    <section className="paper flex-1">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-20">
        <div className="flex flex-col gap-3 mb-10 fade-up">
          <span className="chip self-start">🌿 Jaringan Asli</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight">
            {FARMERS.length} petani.
            <br />
            <span className="text-[var(--moss)]">
              {new Set(FARMERS.map((f) => f.island)).size} pulau.
            </span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl mt-2 leading-relaxed">
            Setiap petani di sini punya toko mikro-nya sendiri. Pilih cerita.
            Pindai DPID. Beri tip langsung. Pre-order panen berikutnya.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-10 overflow-x-auto -mx-1 px-1 pb-2">
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-[var(--muted)] mr-2 flex-shrink-0">
            <Search size={14} />
            Saring
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

        <OnboardedFarmersBanner />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FARMERS.map((f, i) => (
            <Link
              key={f.slug}
              href={`/farmers/${f.slug}`}
              className="group bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 tap lift flex flex-col gap-4 fade-up"
              style={{ animationDelay: `${60 + i * 50}ms` }}
            >
              <div className="rounded-2xl overflow-hidden relative">
                <CommodityArt commodity={f.commodity} seed={f.slug} />
                <span className="absolute top-3 right-3 text-2xl drop-shadow-lg">
                  {f.emoji}
                </span>
                <div className="absolute -bottom-5 left-4 w-16 h-16 rounded-full bg-[var(--ivory)] p-0.5 ring-2 ring-[var(--ivory)] shadow-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={portraitUrl(f.slug, 120)}
                    alt={f.name}
                    className="w-full h-full rounded-full object-cover bg-[var(--bg-deep)]"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="h-3" />

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-extrabold leading-tight truncate">
                    {f.name}
                  </p>
                  <span
                    className="text-[10px] uppercase tracking-widest font-bold flex-shrink-0"
                    style={{ color: `var(--${f.tint})` }}
                  >
                    {COMMODITY_LABEL_ID[f.commodity] ?? f.commodity}
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
                    ke petani
                  </p>
                </div>
                <div>
                  <p className="text-sm font-extrabold tabular-nums">
                    {(Math.abs(f.batch.co2PerKgGrams) / 1000).toFixed(1)}kg
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    CO₂ diserap
                  </p>
                </div>
                <div>
                  <p className="text-sm font-extrabold tabular-nums">
                    {formatIDR(f.yearlyEarned).replace("Rp ", "")}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    tahun ini
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
