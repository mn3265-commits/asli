import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Calendar,
  Leaf,
  Heart,
  Clock,
  Mic,
  Sparkles,
  Satellite,
} from "lucide-react";
import { FARMERS, getFarmer, formatIDR, formatUSD } from "@/lib/data";
import { SatelliteMap } from "@/components/satellite-map";
import { VoiceCard } from "@/components/voice-card";
import { TipForm } from "@/components/tip-form";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return FARMERS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const f = getFarmer(slug);
  if (!f) return { title: "Asli" };
  return {
    title: `${f.name} — ${f.commodityLabel} | Asli`,
    description: f.story.slice(0, 140),
  };
}

export default async function FarmerDPIDPage({ params }: PageProps) {
  const { slug } = await params;
  const f = getFarmer(slug);
  if (!f) notFound();

  const co2Kg = Math.abs(f.batch.co2PerKgGrams * f.batch.weightKg) / 1000;

  return (
    <>
      {/* Back nav */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-6">
        <Link
          href="/farmers"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--moss)] tap"
        >
          <ArrowLeft size={16} />
          All farmers
        </Link>
      </div>

      {/* ── HERO BLOCK ────────────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-6 pb-12">
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 sm:p-10 chunky-shadow flex flex-col lg:flex-row gap-10 fade-up">
            {/* Left: identity */}
            <div className="flex flex-col gap-5 lg:max-w-sm">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-[var(--moss)]">
                <CheckCircle2 size={12} />
                Asli-verified · DPID · {f.batch.id}
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0"
                  style={{ background: `var(--${f.tint}-soft)` }}
                >
                  {f.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold mb-1"
                    style={{ color: `var(--${f.tint})` }}
                  >
                    {f.commodityLabel}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold leading-[1.05] tracking-tight">
                    {f.name}
                  </h1>
                  <p className="text-sm text-[var(--muted)] mt-1.5 inline-flex items-center gap-1.5">
                    <MapPin size={12} />
                    {f.village}, {f.region}, {f.island}
                  </p>
                </div>
              </div>

              <blockquote className="text-base sm:text-lg text-[var(--fg-soft)] italic leading-relaxed border-l-2 border-[var(--ochre)] pl-4">
                &ldquo;{f.story}&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-1.5 mt-1">
                {f.practices.map((p) => (
                  <span key={p} className="chip">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: live earnings panel */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <div
                className="rounded-2xl p-6"
                style={{ background: `var(--${f.tint}-soft)` }}
              >
                <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-1">
                  This batch · {f.batch.weightKg}kg
                </p>
                <p className="text-4xl sm:text-5xl font-extrabold tabular-nums leading-none mt-2">
                  {formatIDR(f.thisBatchEarned)}
                </p>
                <p className="text-sm font-medium mt-2 opacity-80">
                  Direct to {f.name.split(" ").slice(-1)[0]} this batch
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--fg)]/10 flex items-center justify-between text-xs font-semibold">
                  <span className="opacity-70">2026 income so far</span>
                  <span className="tabular-nums opacity-90">
                    {formatIDR(f.yearlyEarned)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <KeyStat
                  icon={<Heart size={14} />}
                  value={`${f.batch.farmerSharePct}%`}
                  label="to farmer"
                />
                <KeyStat
                  icon={<Leaf size={14} />}
                  value={`${co2Kg.toFixed(1)}kg`}
                  label="CO₂ removed"
                />
                <KeyStat
                  icon={<Calendar size={14} />}
                  value={daysAgo(f.batch.harvestedAt)}
                  label="harvested"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE BREAKDOWN ───────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 sm:p-8">
            <h2 className="text-xl font-extrabold mb-1">
              Where every dollar goes
            </h2>
            <p className="text-sm text-[var(--muted)] mb-6">
              Wholesale price: {formatUSD(f.batch.pricePerKgUsd)}/kg · batch
              of {f.batch.weightKg}kg
            </p>

            <PriceBar
              tint={f.tint}
              farmerPct={f.batch.farmerSharePct}
            />

            <p className="text-xs text-[var(--muted)] mt-6 leading-relaxed">
              Industry average farmer share for {f.commodity === "wild-honey" ? "honey" : f.commodity}: roughly 22–30%.
              Asli rebuilds this from scratch — farmer-set floor pricing, transparent margins, no hidden middlemen.
            </p>
          </div>
        </div>
      </section>

      {/* ── SATELLITE MAP ─────────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-1">
              <Satellite size={18} className="text-[var(--indigo)]" />
              <h2 className="text-xl font-extrabold">
                The farm — from space
              </h2>
            </div>
            <p className="text-sm text-[var(--muted)] mb-5">
              Coordinates: {f.lat.toFixed(4)}°, {f.lng.toFixed(4)}° ·
              Sentinel-2 · refreshed every 5 days · No deforestation
              detected since 2018
            </p>
            <SatelliteMap lat={f.lat} lng={f.lng} farmerName={f.name} />
          </div>
        </div>
      </section>

      {/* ── AI VOICE ──────────────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
          <VoiceCard farmerName={f.name} villageName={f.village} />
        </div>
      </section>

      {/* ── TIP + PRE-ORDER ──────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12 grid lg:grid-cols-2 gap-5">
          <TipForm farmerName={f.name} tint={f.tint} />

          <div
            className="rounded-3xl p-6 sm:p-8 border border-[var(--line)]"
            style={{ background: "var(--bg-deep)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-[var(--clay)]" />
              <h2 className="text-xl font-extrabold">Pre-order next harvest</h2>
            </div>
            <p className="text-sm text-[var(--fg-soft)] mb-5 leading-relaxed">
              Fund {f.name.split(" ").slice(-1)[0]}&apos;s next batch ahead of
              cherry-season. Locked at today&apos;s price.
              Delivered when ready.
            </p>
            <div className="bg-[var(--ivory)] rounded-2xl p-5 border border-[var(--line)] mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Next harvest window
                </span>
                <span className="text-xs font-bold tabular-nums text-[var(--clay)]">
                  Sept – Dec 2026
                </span>
              </div>
              <p className="text-3xl font-extrabold tabular-nums">
                {formatUSD(f.batch.pricePerKgUsd)}
                <span className="text-base font-bold text-[var(--muted)] ml-1">
                  /kg locked
                </span>
              </p>
            </div>
            <button className="w-full py-3.5 rounded-full bg-[var(--clay)] text-[var(--ivory)] font-bold tap">
              Pre-order this farm
            </button>
          </div>
        </div>
      </section>

      {/* ── CERTS BAND ────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-wrap items-center gap-2 justify-center">
          <Sparkles size={16} className="text-[var(--moss)]" />
          <span className="text-sm font-bold text-[var(--fg-soft)] mr-2">
            Verified:
          </span>
          {f.certs.map((c) => (
            <span key={c} className="chip">
              ✓ {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center flex flex-col items-center gap-5">
          <Mic size={32} className="text-[var(--ochre)]" />
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {f.name} is one of {FARMERS.length} farmers on Asli.
          </h2>
          <p className="text-base text-[var(--fg-soft)] max-w-lg leading-relaxed">
            Every one has a Digital Product ID. Every one is satellite-verified.
            Every one is paid transparently. Browse them all.
          </p>
          <Link
            href="/farmers"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--fg)] text-[var(--ivory)] font-bold tap chunky-shadow-soft mt-2"
          >
            See all farmers
          </Link>
        </div>
      </section>
    </>
  );
}

function KeyStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-2xl border border-[var(--line)] p-3 flex flex-col gap-1">
      <div className="text-[var(--muted)]">{icon}</div>
      <p className="text-lg font-extrabold tabular-nums leading-none">
        {value}
      </p>
      <p className="text-[9px] uppercase tracking-wider text-[var(--muted)] font-bold leading-tight">
        {label}
      </p>
    </div>
  );
}

function PriceBar({
  tint,
  farmerPct,
}: {
  tint: "moss" | "ochre" | "clay" | "indigo";
  farmerPct: number;
}) {
  // Remaining split: processing 12%, logistics 8%, asli platform 4%, retailer rest
  const processingPct = 12;
  const logisticsPct = 8;
  const platformPct = 4;
  const retailerPct = 100 - farmerPct - processingPct - logisticsPct - platformPct;

  const rows = [
    { label: "Farmer", pct: farmerPct, color: `var(--${tint})` },
    { label: "Processing co-op", pct: processingPct, color: "var(--ochre)" },
    { label: "Logistics", pct: logisticsPct, color: "var(--clay)" },
    { label: "Asli platform", pct: platformPct, color: "var(--indigo)" },
    { label: "Retailer margin", pct: retailerPct, color: "var(--muted)" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-9 rounded-full overflow-hidden border border-[var(--line)]">
        {rows.map((r) => (
          <div
            key={r.label}
            style={{ width: `${r.pct}%`, background: r.color }}
            className="flex items-center justify-center text-[10px] font-bold text-[var(--ivory)]"
          >
            {r.pct >= 10 ? `${r.pct}%` : ""}
          </div>
        ))}
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2 text-xs">
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ background: r.color }}
            />
            <div className="min-w-0">
              <p className="font-bold leading-tight">{r.pct}%</p>
              <p className="text-[var(--muted)] truncate">{r.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function daysAgo(iso: string) {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
