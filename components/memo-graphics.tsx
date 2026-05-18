/**
 * Editorial-style infographics for the strategic memo (/strategy).
 * Pure SVG, print-safe, no external deps.
 */

import { MapPin, Mic, Sprout, ScanLine } from "lucide-react";

/* ───── 4-LAYER TECH STACK ───── */
export function TechStackDiagram() {
  const layers = [
    {
      n: "01",
      title: "Satellite-Verified Origin",
      sub: "ESA Sentinel-2 · free public",
      tint: "moss",
      icon: <MapPin size={16} />,
    },
    {
      n: "02",
      title: "AI Farmer Voice",
      sub: "Claude · timbre-preserving",
      tint: "ochre",
      icon: <Mic size={16} />,
    },
    {
      n: "03",
      title: "Carbon Ledger / Kilo",
      sub: "biodiversity + practice survey",
      tint: "clay",
      icon: <Sprout size={16} />,
    },
    {
      n: "04",
      title: "Open DPID Spec",
      sub: "MIT-licensed schema + API",
      tint: "indigo",
      icon: <ScanLine size={16} />,
    },
  ] as const;

  return (
    <div className="my-10 not-prose">
      <div className="rounded-3xl border border-[var(--line)] p-6 bg-[var(--ivory)]">
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--muted)] mb-4">
          ◇ Figure 1 · the DPID stack
        </p>
        <div className="space-y-2">
          {layers.map((l, i) => (
            <div
              key={l.n}
              className="flex items-center gap-4 px-4 py-3 rounded-2xl border border-[var(--line)] relative"
              style={{ background: `var(--${l.tint}-soft)` }}
            >
              <span
                className="text-xs font-extrabold tabular-nums"
                style={{ color: `var(--${l.tint})` }}
              >
                {l.n}
              </span>
              <span style={{ color: `var(--${l.tint})` }}>{l.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-tight">{l.title}</p>
                <p className="text-xs opacity-60 leading-tight mt-0.5">
                  {l.sub}
                </p>
              </div>
              {i < layers.length - 1 && (
                <span className="absolute left-7 -bottom-2 text-xs text-[var(--muted)]/40">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs italic text-[var(--muted)] mt-4 text-center">
          One QR · four open technologies · zero proprietary lock-in
        </p>
      </div>
    </div>
  );
}

/* ───── INNOVATOR'S DILEMMA SIDE-BY-SIDE ───── */
export function ComparisonDiagram() {
  const rows = [
    {
      q: "Whose name is on the package?",
      a: "The brand's",
      b: "The farmer's",
    },
    {
      q: "Whose bank receives payment?",
      a: "The brand's, on the farmer's behalf",
      b: "The farmer's, directly",
    },
    { q: "Is the standard open?", a: "No (proprietary)", b: "Yes (MIT)" },
    {
      q: "Buyer-to-farmer payment one-way?",
      a: "Yes",
      b: "No — tips + pre-orders flow back",
    },
  ];

  return (
    <div className="my-10 not-prose">
      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--muted)] mb-3">
        ◇ Figure 2 · the four design commitments
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--bg-deep)] p-5">
          <p className="text-[10px] uppercase tracking-widest font-extrabold text-[var(--muted)] mb-3">
            Incumbents
          </p>
          <ul className="flex flex-col gap-3 text-sm text-[var(--fg-soft)]">
            {rows.map((r) => (
              <li key={r.q} className="flex flex-col gap-1">
                <span className="text-xs opacity-60">{r.q}</span>
                <span className="font-medium">{r.a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border-2 border-[var(--moss)] bg-[var(--moss-soft)] p-5">
          <p className="text-[10px] uppercase tracking-widest font-extrabold text-[var(--moss)] mb-3">
            Asli
          </p>
          <ul className="flex flex-col gap-3 text-sm text-[var(--fg)]">
            {rows.map((r) => (
              <li key={r.q} className="flex flex-col gap-1">
                <span className="text-xs opacity-60">{r.q}</span>
                <span className="font-extrabold">✓ {r.b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───── LIFECYCLE: 6 MOMENTS ───── */
export function LifecycleDiagram() {
  const steps = [
    { n: "01", t: "Harvest", icon: "🌱", tint: "moss" },
    { n: "02", t: "Satellite verify", icon: "🛰", tint: "ochre" },
    { n: "03", t: "Voice memo", icon: "🎙", tint: "indigo" },
    { n: "04", t: "DPID minted", icon: "🔖", tint: "clay" },
    { n: "05", t: "Sale + split", icon: "💸", tint: "moss" },
    { n: "06", t: "Relationship", icon: "🤝", tint: "ochre" },
  ] as const;

  return (
    <div className="my-10 not-prose">
      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--muted)] mb-4">
        ◇ Figure 3 · lifecycle of one kilo
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {steps.map((s, i) => (
          <div key={s.n} className="flex flex-col items-center gap-1 text-center relative">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: `var(--${s.tint}-soft)`,
                color: `var(--${s.tint})`,
              }}
            >
              {s.icon}
            </div>
            <span
              className="text-[10px] tabular-nums font-extrabold mt-1"
              style={{ color: `var(--${s.tint})` }}
            >
              {s.n}
            </span>
            <span className="text-[11px] font-bold leading-tight">{s.t}</span>
            {i < steps.length - 1 && (
              <span className="hidden sm:block absolute top-6 -right-2 text-[var(--muted)] opacity-50 text-xs">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── UNIT ECONOMICS BAR ───── */
export function PriceShareDiagram() {
  const rows = [
    {
      label: "Industry average",
      farmer: 22,
      others: 78,
      color: "var(--muted)",
    },
    {
      label: "Fair Trade certified",
      farmer: 38,
      others: 62,
      color: "var(--ochre)",
    },
    {
      label: "Asli (current)",
      farmer: 68,
      others: 32,
      color: "var(--moss)",
    },
  ];

  return (
    <div className="my-10 not-prose">
      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--muted)] mb-4">
        ◇ Figure 4 · share of wholesale price going to farmer
      </p>
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--ivory)] p-6">
        <div className="flex flex-col gap-4">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold">{r.label}</span>
                <span
                  className="font-extrabold tabular-nums text-lg"
                  style={{ color: r.color }}
                >
                  {r.farmer}%
                </span>
              </div>
              <div className="flex h-7 rounded-full overflow-hidden border border-[var(--line)]">
                <div
                  style={{ width: `${r.farmer}%`, background: r.color }}
                  className="flex items-center pl-2 text-[10px] font-bold text-[var(--ivory)]"
                >
                  farmer
                </div>
                <div
                  style={{ width: `${r.others}%` }}
                  className="bg-[var(--bg-deep)] flex items-center justify-end pr-2 text-[10px] font-bold text-[var(--muted)]"
                >
                  everyone else
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs italic text-[var(--muted)] mt-4 text-center">
          The farmer's share triples when we redesign the unit of trust
        </p>
      </div>
    </div>
  );
}

/* ───── 18-MONTH DASHBOARD ───── */
export function TargetsDashboard() {
  const cells = [
    { k: "Active farmers", v: "3,500", tint: "moss" },
    { k: "Cooperatives", v: "6–10", tint: "ochre" },
    { k: "Commodities live", v: "8", tint: "clay" },
    { k: "Income paid", v: "USD 2.4M", tint: "moss" },
    { k: "Avg farmer share", v: "≥ 60%", tint: "indigo" },
    { k: "CO₂ retired", v: "18,000t", tint: "moss" },
    { k: "EUDR statements", v: "10,000", tint: "ochre" },
    { k: "Buyer NPS", v: "≥ 65", tint: "clay" },
  ] as const;

  return (
    <div className="my-10 not-prose">
      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--muted)] mb-4">
        ◇ Figure 5 · 18-month targets (Dec 2026)
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cells.map((c) => (
          <div
            key={c.k}
            className="rounded-2xl p-4 flex flex-col gap-1"
            style={{ background: `var(--${c.tint}-soft)` }}
          >
            <p
              className="text-2xl font-extrabold tabular-nums leading-none"
              style={{ color: `var(--${c.tint})` }}
            >
              {c.v}
            </p>
            <p className="text-xs font-bold mt-1 leading-tight">{c.k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
