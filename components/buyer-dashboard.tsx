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

type StoredActivity = {
  // recent farmer slugs viewed
  recent: string[];
  // tips: array of { slug, amount, ts }
  tips: { slug: string; amount: number; ts: number }[];
  // preorders: array of { slug, season, ts }
  preorders: { slug: string; ts: number }[];
};

const KEY = "asli_user_v1";

function readActivity(): StoredActivity {
  if (typeof window === "undefined")
    return { recent: [], tips: [], preorders: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { recent: [], tips: [], preorders: [] };
    const parsed = JSON.parse(raw);
    return {
      recent: parsed.recent ?? [],
      tips: parsed.tips ?? [],
      preorders: parsed.preorders ?? [],
    };
  } catch {
    return { recent: [], tips: [], preorders: [] };
  }
}

function writeActivity(a: StoredActivity) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(a));
}

export function BuyerDashboard({
  farmerLookup,
}: {
  farmerLookup: FarmerLookup;
}) {
  const [activity, setActivity] = useState<StoredActivity>({
    recent: [],
    tips: [],
    preorders: [],
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setActivity(readActivity());
    setReady(true);
  }, []);

  const totalTipped = activity.tips.reduce((s, t) => s + t.amount, 0);
  const uniqueFarmers = new Set([
    ...activity.recent,
    ...activity.tips.map((t) => t.slug),
    ...activity.preorders.map((p) => p.slug),
  ]).size;

  const seedDemo = () => {
    const sample = Object.keys(farmerLookup).slice(0, 4);
    const a: StoredActivity = {
      recent: sample,
      tips: [
        { slug: sample[0], amount: 10, ts: Date.now() - 86_400_000 * 2 },
        { slug: sample[1], amount: 25, ts: Date.now() - 86_400_000 * 5 },
      ],
      preorders: [
        { slug: sample[2], ts: Date.now() - 86_400_000 * 3 },
      ],
    };
    writeActivity(a);
    setActivity(a);
  };

  const clear = () => {
    const empty = { recent: [], tips: [], preorders: [] };
    writeActivity(empty);
    setActivity(empty);
  };

  if (!ready) {
    return (
      <div className="h-64 bg-[var(--ivory)] rounded-3xl animate-pulse" />
    );
  }

  const isEmpty =
    activity.recent.length === 0 &&
    activity.tips.length === 0 &&
    activity.preorders.length === 0;

  if (isEmpty) {
    return (
      <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-10 sm:p-14 text-center flex flex-col items-center gap-4 chunky-shadow-soft">
        <History size={48} className="text-[var(--muted)]" />
        <h2 className="text-2xl font-extrabold">Your dashboard is empty</h2>
        <p className="text-sm text-[var(--fg-soft)] max-w-md leading-relaxed">
          Scan your first DPID, send a tip, or pre-order a harvest — and
          everything will live here.
        </p>
        <div className="flex flex-wrap gap-3 mt-3 justify-center">
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            <ScanLine size={16} /> Scan a DPID
          </Link>
          <button
            onClick={seedDemo}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--ivory)] text-[var(--fg)] border border-[var(--line)] font-bold tap"
          >
            <Sparkles size={16} /> Seed demo data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox
          tint="moss"
          icon={<Heart size={16} />}
          value={`$${totalTipped}`}
          label="Tipped direct"
        />
        <StatBox
          tint="ochre"
          icon={<Clock size={16} />}
          value={activity.preorders.length.toString()}
          label="Pre-orders"
        />
        <StatBox
          tint="indigo"
          icon={<Leaf size={16} />}
          value={`${uniqueFarmers}`}
          label="Farmers helped"
        />
        <StatBox
          tint="clay"
          icon={<ScanLine size={16} />}
          value={activity.recent.length.toString()}
          label="DPIDs scanned"
        />
      </div>

      {/* Recent */}
      {activity.recent.length > 0 && (
        <Section title="Recently viewed">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activity.recent.map((slug) => {
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

      {/* Tips */}
      {activity.tips.length > 0 && (
        <Section title="Tips sent">
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden divide-y divide-[var(--line)]">
            {activity.tips.map((t, i) => {
              const f = farmerLookup[t.slug];
              if (!f) return null;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-3"
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
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Preorders */}
      {activity.preorders.length > 0 && (
        <Section title="Pre-orders locked">
          <div className="flex flex-col gap-3">
            {activity.preorders.map((p, i) => {
              const f = farmerLookup[p.slug];
              if (!f) return null;
              return (
                <Link
                  key={i}
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
                        Next harvest · Sept–Dec 2026
                      </p>
                    </div>
                  </div>
                  <span className="chip flex-shrink-0">locked</span>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {/* Footer actions */}
      <div className="flex justify-end">
        <button
          onClick={clear}
          className="text-xs font-bold text-[var(--muted)] hover:text-[var(--clay)] underline-offset-2 hover:underline"
        >
          Clear demo data
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
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
