import Link from "next/link";
import { ArrowRight, MapPin, Mic, Sprout, ScanLine } from "lucide-react";
import { FARMERS, formatIDR, portraitUrl } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";

export default function HomePage() {
  const farmers = FARMERS.length;
  const islands = new Set(FARMERS.map((f) => f.island)).size;
  const yearlyFarmerIncome = FARMERS.reduce(
    (s, f) => s + f.yearlyEarned,
    0,
  );

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="paper relative overflow-hidden">
        {/* Drifting blob backgrounds */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-16 w-96 h-96 rounded-full opacity-30 drift-blob"
          style={{ background: "var(--ochre)", filter: "blur(80px)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-0 w-[28rem] h-[28rem] rounded-full opacity-25 drift-blob"
          style={{ background: "var(--moss)", filter: "blur(80px)", animationDelay: "-6s" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-25 drift-blob"
          style={{ background: "var(--clay)", filter: "blur(80px)", animationDelay: "-12s" }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-20 sm:pt-20 sm:pb-32 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 fade-up flex flex-col gap-7">
            <span className="chip self-start">
              🌿 Indonesian commodity export — reimagined
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              Indonesian commodities,{" "}
              <span className="text-[var(--moss)]">by name.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--fg-soft)] max-w-xl leading-relaxed">
              Every kilo of coffee, spice, vanilla or honey carries a
              Digital Product ID. Scan it — see the farmer&apos;s face. Hear
              their voice. Watch their farm from space. Send them a tip.
              The supply chain, made personal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/farmers"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--fg)] text-[var(--ivory)] font-bold tap chunky-shadow-soft"
              >
                Meet the farmers
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/how"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ivory)] text-[var(--fg)] font-bold border border-[var(--line)] tap"
              >
                How it works
              </Link>
            </div>
          </div>

          <div
            className="lg:col-span-5 fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 chunky-shadow">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[var(--muted)] mb-3">
                <span>DPID · ASLI-GYO-2026-K048</span>
                <span className="text-[var(--moss)]">● verified</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative ring-2 ring-[var(--moss-soft)]"
                  style={{ background: "var(--moss-soft)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={portraitUrl("karim-aceh", 160)}
                    alt="Pak Karim Yusuf"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 text-lg">
                    ☕
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-extrabold leading-tight">
                    Pak Karim Yusuf
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Aceh Tengah, Sumatra
                  </p>
                </div>
              </div>
              <p className="text-sm text-[var(--fg-soft)] italic leading-relaxed">
                &quot;I started picking cherries when I was twelve. My
                father, his father before. Now you can see me, and I can
                see you.&quot;
              </p>
              <div className="mt-5 pt-5 border-t border-[var(--line)] grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-extrabold tabular-nums">68%</p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    To Pak Karim
                  </p>
                </div>
                <div>
                  <p className="text-lg font-extrabold tabular-nums">
                    1.24
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    kg CO₂ removed
                  </p>
                </div>
                <div>
                  <p className="text-lg font-extrabold tabular-nums">
                    24kg
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    This batch
                  </p>
                </div>
              </div>
              <Link
                href="/farmers/karim-aceh"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
              >
                <ScanLine size={16} />
                Open this DPID
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIG STATS BAND ────────────────────────────────────────── */}
      <section className="bg-[var(--fg)] text-[var(--ivory)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 grid sm:grid-cols-3 gap-8">
          <Stat
            value={farmers.toString()}
            label="farmers, named"
            sub="Real people. Real plots. Real Rupiah."
          />
          <Stat
            value={islands.toString()}
            label="islands sourced"
            sub="Sumatra to Papua. Verified by satellite."
          />
          <Stat
            value={formatIDR(yearlyFarmerIncome)}
            label="farmer income tracked"
            sub="Visible to every buyer. Always."
          />
        </div>
      </section>

      {/* ── THE PROBLEM ───────────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <span className="chip mb-6">📍 The problem we&apos;re solving</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Indonesia is the world&apos;s pantry.
            <br />
            <span className="text-[var(--clay)]">
              And the world doesn&apos;t know its name.
            </span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <ProblemCard
              big="3rd"
              label="largest cocoa producer"
              tail="but farmers earn $2/day"
            />
            <ProblemCard
              big="2nd"
              label="largest coffee producer"
              tail="but 80% of value leaves the country"
            />
            <ProblemCard
              big="500"
              label="years since Spice Islands"
              tail="and Maluku nutmeg farmers still get scraps"
            />
          </div>
          <p className="text-lg text-[var(--fg-soft)] mt-12 leading-relaxed max-w-2xl">
            Indonesia exports the world&apos;s coffee, spice, vanilla, honey,
            cacao. But the farmers behind every kilo are invisible — and
            paid like it. Asli rebuilds the supply chain so every product
            carries a face. Not anonymous. Not interchangeable. By name.
          </p>
        </div>
      </section>

      {/* ── THE TECH (4-layer stack) ──────────────────────────────── */}
      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl mb-12">
            <span className="chip mb-4">🛠 The novelty</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              One QR. Four kinds of magic.
            </h2>
            <p className="text-lg text-[var(--fg-soft)] mt-4 leading-relaxed">
              Every Asli DPID combines four open technologies. No one has
              stacked them like this for Indonesian exports — yet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Reveal delay={0}>
              <TechCard
                tint="moss"
                icon={<MapPin size={20} />}
                num="01"
                title="Satellite-verified origin"
                body="Each farmer's plot is geofenced and pulled fresh from Sentinel-2 every 5 days. Buyers see the actual farm from space — and proof of no deforestation. Built-in EUDR compliance from day one."
                chip="ESA Copernicus · free"
              />
            </Reveal>
            <Reveal delay={120}>
              <TechCard
                tint="ochre"
                icon={<Mic size={20} />}
                num="02"
                title="AI farmer voice"
                body="Farmer records 30-sec voice memo in Bahasa or local dialect. AI translates and speaks it in the buyer's language — keeping the farmer's own voice timbre. Authenticity, scaled."
                chip="Claude · Sonnet"
              />
            </Reveal>
            <Reveal delay={240}>
              <TechCard
                tint="clay"
                icon={<Sprout size={20} />}
                num="03"
                title="Carbon ledger per kilo"
                body="Satellite biodiversity index + practice survey → live CO₂ balance per batch. Many of our farms are net-negative. Buyers can retire offsets at checkout, on top of the commodity."
                chip="net-negative tracked"
              />
            </Reveal>
            <Reveal delay={360}>
              <TechCard
                tint="indigo"
                icon={<ScanLine size={20} />}
                num="04"
                title="Open DPID spec"
                body="The DPID standard is public. Any cooperative, any exporter, any commodity can mint and read DPIDs. We become infrastructure, not gatekeeper. Stripe-for-fair-trade."
                chip="open API"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FARMER PREVIEW ────────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <span className="chip mb-4">👋 Meet a few</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
                Real names. Real farms.
              </h2>
            </div>
            <Link
              href="/farmers"
              className="text-[var(--moss)] font-bold inline-flex items-center gap-1 tap"
            >
              See all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FARMERS.slice(0, 6).map((f) => (
              <Link
                key={f.slug}
                href={`/farmers/${f.slug}`}
                className="group bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 tap flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 relative"
                    style={{ background: `var(--${f.tint}-soft)` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={portraitUrl(f.slug, 120)}
                      alt={f.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 text-base">
                      {f.emoji}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold leading-tight truncate">
                      {f.name}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {f.region}, {f.island}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--fg-soft)] line-clamp-2 leading-relaxed">
                  &ldquo;{f.story}&rdquo;
                </p>
                <div className="mt-1 pt-3 border-t border-[var(--line)] flex items-center justify-between">
                  <span
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: `var(--${f.tint})` }}
                  >
                    {f.commodityLabel.split(",")[0]}
                  </span>
                  <span className="text-xs text-[var(--muted)] tabular-nums">
                    {f.batch.farmerSharePct}% to farmer
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ────────────────────────────────────────────── */}
      <section className="bg-[var(--moss)] text-[var(--ivory)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center flex flex-col items-center gap-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight max-w-2xl">
            Buy commodities by face,
            <br />
            <span className="opacity-70">not by faceless ton.</span>
          </h2>
          <p className="text-lg opacity-80 max-w-xl leading-relaxed">
            Asli is the digital trust layer for Indonesian commodity exports.
            Farmer-first. Satellite-verified. Open spec.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link
              href="/farmers"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ochre)] text-[var(--fg)] font-bold tap"
            >
              Browse farmers
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/how"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-transparent text-[var(--ivory)] border border-[var(--ivory)]/30 font-bold tap"
            >
              Read the manifesto
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--fg)] text-[var(--ivory)]/70 py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
          <div>
            <span className="text-[var(--ivory)] font-extrabold text-lg">
              Asli
            </span>{" "}
            · Indonesian commodities, by name. © 2026
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/spec" className="hover:text-[var(--ochre)]">
              Open DPID Spec
            </Link>
            <Link href="/strategy" className="hover:text-[var(--ochre)]">
              Strategic memo
            </Link>
            <Link href="/onboard" className="hover:text-[var(--ochre)]">
              For exporters
            </Link>
            <Link href="/dashboard" className="hover:text-[var(--ochre)]">
              Buyer dashboard
            </Link>
            <Link href="/impact" className="hover:text-[var(--ochre)]">
              Impact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <CountUp
        value={value}
        className="text-5xl sm:text-6xl font-extrabold leading-none tracking-tight tabular-nums text-[var(--ochre)]"
      />
      <p className="text-base font-bold mt-2">{label}</p>
      <p className="text-sm opacity-60 leading-snug">{sub}</p>
    </div>
  );
}

function ProblemCard({
  big,
  label,
  tail,
}: {
  big: string;
  label: string;
  tail: string;
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 flex flex-col gap-2 chunky-shadow-soft">
      <p className="text-5xl font-extrabold leading-none tracking-tight text-[var(--clay)]">
        {big}
      </p>
      <p className="text-base font-bold mt-3">{label}</p>
      <p className="text-sm text-[var(--muted)] leading-snug">{tail}</p>
    </div>
  );
}

function TechCard({
  tint,
  icon,
  num,
  title,
  body,
  chip,
}: {
  tint: "moss" | "ochre" | "clay" | "indigo";
  icon: React.ReactNode;
  num: string;
  title: string;
  body: string;
  chip: string;
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-7 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: `var(--${tint}-soft)`,
            color: `var(--${tint})`,
          }}
        >
          {icon}
        </div>
        <span className="text-xs font-bold tabular-nums text-[var(--muted)]">
          {num}
        </span>
      </div>
      <div>
        <h3 className="text-xl font-extrabold leading-tight">{title}</h3>
        <p className="text-sm text-[var(--fg-soft)] mt-2 leading-relaxed">
          {body}
        </p>
      </div>
      <span
        className="text-[10px] uppercase tracking-widest font-bold mt-auto"
        style={{ color: `var(--${tint})` }}
      >
        ● {chip}
      </span>
    </div>
  );
}
