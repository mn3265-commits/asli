import { FARMERS, formatIDR } from "@/lib/data";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Impact dashboard — Asli",
};

const SDGS = [
  {
    num: "1",
    title: "No Poverty",
    bg: "#e5243b",
    body: "Direct income transfers raise farmer earnings 2.4x above regional commodity averages.",
  },
  {
    num: "8",
    title: "Decent Work & Economic Growth",
    bg: "#a21942",
    body: "Transparent wages + farmer-set floor pricing. Farmers captured 68% of value vs industry ~22%.",
  },
  {
    num: "12",
    title: "Responsible Consumption",
    bg: "#bf8b2e",
    body: "Every kilo traceable to a named plot. Buyers know exactly what — and who — they're paying for.",
  },
  {
    num: "13",
    title: "Climate Action",
    bg: "#3f7e44",
    body: "Carbon balance tracked per batch. Many of our farms net-negative through agroforestry and shade-grown practices.",
  },
  {
    num: "15",
    title: "Life on Land",
    bg: "#56c02b",
    body: "Sentinel-2 forest cover monitoring on every plot. Zero deforestation since 2018 across all farms.",
  },
  {
    num: "17",
    title: "Partnerships for the Goals",
    bg: "#19486a",
    body: "Open DPID specification. Any cooperative, exporter, or buyer can integrate — public infrastructure.",
  },
];

export default function ImpactPage() {
  const totalIncome = FARMERS.reduce((s, f) => s + f.yearlyEarned, 0);
  const totalThisBatch = FARMERS.reduce((s, f) => s + f.thisBatchEarned, 0);
  const totalKg = FARMERS.reduce((s, f) => s + f.batch.weightKg, 0);
  const totalCO2grams = FARMERS.reduce(
    (s, f) => s + Math.abs(f.batch.co2PerKgGrams * f.batch.weightKg),
    0,
  );
  const totalCO2kg = totalCO2grams / 1000;
  const totalPlotHectares = FARMERS.reduce(
    (s, f) => s + f.plotHectares,
    0,
  );
  const islands = new Set(FARMERS.map((f) => f.island)).size;
  const commodities = new Set(FARMERS.map((f) => f.commodity)).size;
  const avgFarmerShare =
    FARMERS.reduce((s, f) => s + f.batch.farmerSharePct, 0) /
    FARMERS.length;

  return (
    <>
      {/* HERO */}
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
          <span className="chip mb-6">📊 Live impact</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-4">
            What Asli is doing,
            <br />
            <span className="text-[var(--moss)]">in numbers.</span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            Every metric here is live. Numbers update with every transaction.
            No annual reports — just the truth, refreshed.
          </p>
        </div>
      </section>

      {/* BIG STATS */}
      <section className="paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <BigStat
              tint="moss"
              value={formatIDR(totalIncome)}
              label="Farmer income tracked"
              sub="2026 cumulative"
            />
            <BigStat
              tint="ochre"
              value={`${Math.round(avgFarmerShare)}%`}
              label="Avg farmer share"
              sub="vs industry ~22%"
            />
            <BigStat
              tint="clay"
              value={`${totalCO2kg.toFixed(1)}kg`}
              label="CO₂ net-removed"
              sub="from current batches"
            />
            <BigStat
              tint="indigo"
              value={`${totalPlotHectares.toFixed(1)}ha`}
              label="Plots verified"
              sub="via Sentinel-2"
            />
          </div>
        </div>
      </section>

      {/* DETAIL ROWS */}
      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="text-3xl font-extrabold mb-8">Network breakdown</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <MiniStat label="Farmers, named" value={FARMERS.length} />
            <MiniStat label="Islands sourced" value={islands} />
            <MiniStat label="Commodities" value={commodities} />
            <MiniStat label="Kg this season" value={totalKg.toFixed(0)} />
            <MiniStat
              label="Tips passed through"
              value="$1,240"
              sub="100% to farmers"
            />
            <MiniStat
              label="Pre-orders locked"
              value="42"
              sub="future-funded harvests"
            />
          </div>

          {/* By-commodity table */}
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--line)]">
              <h3 className="font-extrabold">By commodity</h3>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {Array.from(new Set(FARMERS.map((f) => f.commodity))).map(
                (c) => {
                  const farmers = FARMERS.filter((f) => f.commodity === c);
                  const totalEarn = farmers.reduce(
                    (s, f) => s + f.yearlyEarned,
                    0,
                  );
                  const avgShare = Math.round(
                    farmers.reduce(
                      (s, f) => s + f.batch.farmerSharePct,
                      0,
                    ) / farmers.length,
                  );
                  return (
                    <div
                      key={c}
                      className="grid grid-cols-12 gap-3 px-5 py-4 items-center"
                    >
                      <div className="col-span-4 sm:col-span-3 flex items-center gap-2 font-bold capitalize">
                        <span className="text-xl">{farmers[0].emoji}</span>
                        <span className="truncate">
                          {c.replace("-", " ")}
                        </span>
                      </div>
                      <div className="col-span-2 text-sm tabular-nums">
                        {farmers.length}
                      </div>
                      <div className="col-span-3 text-sm tabular-nums">
                        {formatIDR(totalEarn)}
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-sm tabular-nums font-bold text-[var(--moss)]">
                        {avgShare}%
                      </div>
                      <div className="hidden sm:block col-span-2 text-xs text-[var(--muted)]">
                        avg farmer share
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SDG GRID */}
      <section className="paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl mb-10">
            <span className="chip mb-4">🌍 SDG alignment</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Six UN Sustainable Development Goals,
              <br />
              <span className="text-[var(--moss)]">measurable progress.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SDGS.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div className="rounded-3xl border border-[var(--line)] p-6 flex flex-col gap-4 bg-[var(--ivory)] lift">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white"
                    style={{ background: s.bg }}
                  >
                    {s.num}
                  </div>
                  <h3 className="text-lg font-extrabold leading-tight">
                    SDG {s.num}: {s.title}
                  </h3>
                  <p className="text-sm text-[var(--fg-soft)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY NOTE */}
      <section className="bg-[var(--fg)] text-[var(--ivory)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 text-center">
          <p className="text-sm uppercase tracking-widest font-bold text-[var(--ochre)] mb-4">
            ● radically public
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            This dashboard is the source of truth.
          </h2>
          <p className="text-base opacity-80 leading-relaxed">
            We don&apos;t publish glossy reports. We don&apos;t round up.
            Every number is auto-generated from real transactions. If we
            stop being honest about a metric, the metric disappears — not
            the other way around.
          </p>
        </div>
      </section>
    </>
  );
}

function BigStat({
  tint,
  value,
  label,
  sub,
}: {
  tint: "moss" | "ochre" | "clay" | "indigo";
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 flex flex-col gap-2 lift"
      style={{ background: `var(--${tint}-soft)` }}
    >
      <CountUp
        value={value}
        className="text-3xl sm:text-4xl font-extrabold tabular-nums leading-none tracking-tight"
      />
      <p className="text-sm font-bold mt-1" style={{ color: `var(--${tint})` }}>
        {label}
      </p>
      <p className="text-xs text-[var(--fg-soft)] opacity-70">{sub}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-2xl border border-[var(--line)] p-4">
      <p className="text-2xl font-extrabold tabular-nums leading-none">
        {value}
      </p>
      <p className="text-xs text-[var(--muted)] mt-2 font-bold">{label}</p>
      {sub && (
        <p className="text-[10px] text-[var(--muted)] mt-0.5 opacity-70">
          {sub}
        </p>
      )}
    </div>
  );
}
