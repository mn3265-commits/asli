"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Clock,
  Leaf,
  Sparkles,
  ScanLine,
  History,
} from "lucide-react";
import {
  listTips,
  listPreorders,
  listRecent,
  addTip,
  addPreorder,
  trackRecentView,
  clearAll,
  onChange,
  type Tip,
  type Preorder,
} from "@/lib/store";

type FarmerLookup = Record<
  string,
  {
    name: string;
    commodity: string;
    emoji: string;
    tint: "moss" | "ochre" | "clay" | "indigo";
    region: string;
  }
>;

type Lang = "en" | "id";
const DT = {
  en: {
    empty: "Your dashboard is empty",
    emptySub: "Scan your first DPID, send a tip, or pre-order a harvest — and everything will live here.",
    scanBtn: "Scan a DPID",
    seedBtn: "Seed demo data",
    tipped: "Tipped direct",
    preorders: "Pre-orders",
    helped: "Farmers helped",
    scanned: "DPIDs scanned",
    recent: "Recently viewed",
    tipsSent: "Tips sent",
    locked: "Pre-orders locked",
    lockedChip: "locked",
    nextHarvest: "Next harvest · Sept–Dec 2026",
    clear: "Clear all activity",
  },
  id: {
    empty: "Dasbormu masih kosong",
    emptySub: "Pindai DPID pertamamu, kirim tip, atau pre-order panen — semuanya akan ada di sini.",
    scanBtn: "Pindai DPID",
    seedBtn: "Isi data demo",
    tipped: "Tip langsung",
    preorders: "Pre-order",
    helped: "Petani dibantu",
    scanned: "DPID terpindai",
    recent: "Baru dilihat",
    tipsSent: "Tip terkirim",
    locked: "Pre-order terkunci",
    lockedChip: "terkunci",
    nextHarvest: "Panen berikutnya · Sept–Des 2026",
    clear: "Hapus semua aktivitas",
  },
};

export function BuyerDashboard({
  farmerLookup,
  lang = "en",
}: {
  farmerLookup: FarmerLookup;
  lang?: Lang;
}) {
  const dt = DT[lang];
  const [tips, setTips] = useState<Tip[]>([]);
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = () => {
    setTips(listTips());
    setPreorders(listPreorders());
    setRecent(listRecent());
  };

  useEffect(() => {
    refresh();
    setReady(true);
    return onChange(refresh);
  }, []);

  const totalTipped = tips.reduce((s, t) => s + t.amount, 0);
  const uniqueFarmers = new Set([
    ...recent,
    ...tips.map((t) => t.slug),
    ...preorders.map((p) => p.slug),
  ]).size;

  const seedDemo = () => {
    const sample = Object.keys(farmerLookup).slice(0, 4);
    if (sample.length < 3) return;
    addTip(sample[0], 10);
    addTip(sample[1], 25);
    addPreorder(sample[2]);
    sample.forEach((s) => trackRecentView(s));
    refresh();
  };

  const clear = () => {
    clearAll();
    refresh();
  };

  if (!ready) {
    return (
      <div className="h-64 bg-[var(--ivory)] rounded-3xl animate-pulse" />
    );
  }

  const isEmpty =
    recent.length === 0 && tips.length === 0 && preorders.length === 0;

  if (isEmpty) {
    return (
      <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-10 sm:p-14 text-center flex flex-col items-center gap-4 chunky-shadow-soft">
        <History size={48} className="text-[var(--muted)]" />
        <h2 className="text-2xl font-extrabold">{dt.empty}</h2>
        <p className="text-sm text-[var(--fg-soft)] max-w-md leading-relaxed">
          {dt.emptySub}
        </p>
        <div className="flex flex-wrap gap-3 mt-3 justify-center">
          <Link
            href={lang === "id" ? "/id/scan" : "/scan"}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            <ScanLine size={16} /> {dt.scanBtn}
          </Link>
          <button
            onClick={seedDemo}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--ivory)] text-[var(--fg)] border border-[var(--line)] font-bold tap"
          >
            <Sparkles size={16} /> {dt.seedBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox tint="moss" icon={<Heart size={16} />} value={`$${totalTipped}`} label={dt.tipped} />
        <StatBox tint="ochre" icon={<Clock size={16} />} value={preorders.length.toString()} label={dt.preorders} />
        <StatBox tint="indigo" icon={<Leaf size={16} />} value={`${uniqueFarmers}`} label={dt.helped} />
        <StatBox tint="clay" icon={<ScanLine size={16} />} value={recent.length.toString()} label={dt.scanned} />
      </div>

      {recent.length > 0 && (
        <Section title={dt.recent}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recent.map((slug) => {
              const f = farmerLookup[slug];
              if (!f) return null;
              return (
                <Link
                  key={slug}
                  href={`/farmers/${slug}`}
                  className="bg-[var(--ivory)] rounded-2xl border border-[var(--line)] p-4 flex items-center gap-3 tap"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `var(--${f.tint}-soft)` }}
                  >
                    {f.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm leading-tight truncate">
                      {f.name}
                    </p>
                    <p className="text-xs text-[var(--muted)] truncate">
                      {f.commodity}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {tips.length > 0 && (
        <Section title={dt.tipsSent}>
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden divide-y divide-[var(--line)]">
            {tips.map((t) => {
              const f = farmerLookup[t.slug];
              if (!f) return null;
              return (
                <Link
                  key={t.id}
                  href={`/farmers/${t.slug}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 tap"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `var(--${f.tint}-soft)` }}
                    >
                      {f.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm leading-tight truncate">
                        {f.name}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {relativeDate(t.ts)}
                      </p>
                    </div>
                  </div>
                  <span className="text-base font-extrabold tabular-nums text-[var(--clay)] flex-shrink-0">
                    +${t.amount}
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {preorders.length > 0 && (
        <Section title={dt.locked}>
          <div className="flex flex-col gap-3">
            {preorders.map((p) => {
              const f = farmerLookup[p.slug];
              if (!f) return null;
              return (
                <Link
                  key={p.id}
                  href={`/farmers/${p.slug}`}
                  className="bg-[var(--ivory)] rounded-2xl border border-[var(--line)] p-4 flex items-center justify-between gap-3 tap"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `var(--${f.tint}-soft)` }}
                    >
                      {f.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold leading-tight truncate">
                        {f.name}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {dt.nextHarvest}
                      </p>
                    </div>
                  </div>
                  <span className="chip flex-shrink-0">{dt.lockedChip}</span>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      <div className="flex justify-end">
        <button
          onClick={clear}
          className="text-xs font-bold text-[var(--muted)] hover:text-[var(--clay)] underline-offset-2 hover:underline"
        >
          {dt.clear}
        </button>
      </div>
    </div>
  );
}

function StatBox({
  tint,
  icon,
  value,
  label,
}: {
  tint: "moss" | "ochre" | "clay" | "indigo";
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-1.5"
      style={{ background: `var(--${tint}-soft)` }}
    >
      <div style={{ color: `var(--${tint})` }}>{icon}</div>
      <p
        className="text-2xl font-extrabold tabular-nums leading-none"
        style={{ color: `var(--${tint})` }}
      >
        {value}
      </p>
      <p className="text-xs font-bold mt-1">{label}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-extrabold px-1">{title}</h2>
      {children}
    </section>
  );
}

function relativeDate(ts: number) {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) {
    const hours = Math.floor(diff / 3_600_000);
    if (hours < 1) return "just now";
    return `${hours}h ago`;
  }
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
