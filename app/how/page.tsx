import Link from "next/link";
import { ArrowRight, Sprout, MapPin, Mic, Coins, Heart, ScanLine } from "lucide-react";

export const metadata = {
  title: "How Asli works — for farmers, exporters, buyers",
};

export default function HowPage() {
  return (
    <>
      {/* HERO */}
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-14">
          <span className="chip mb-6">📖 The Asli manifesto</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
            Make the supply chain{" "}
            <span className="text-[var(--moss)]">personal again.</span>
          </h1>
          <p className="text-xl text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            Commodities are sold by ton. Farmers are paid by scraps. Buyers don&apos;t
            know whose hands picked their coffee. We&apos;re rebuilding the
            relationship — through one open digital primitive: the DPID.
          </p>
        </div>
      </section>

      {/* THE 3 PARTIES */}
      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-3 gap-6">
            <PartyCard
              icon={<Sprout size={22} />}
              tint="moss"
              title="For farmers"
              tagline="Your name. Your face. Your earnings."
              points={[
                "Onboard once. Pin your plot on a map.",
                "Record a 30-second voice memo in your dialect.",
                "Every kilo sold pings your bank. You see it live.",
                "Buyers can tip you directly — 100% passes through.",
                "Pre-order income lets you skip the loan shark.",
              ]}
            />
            <PartyCard
              icon={<Coins size={22} />}
              tint="ochre"
              title="For exporters & coops"
              tagline="Mint DPIDs. Sell for more. Pay farmers more."
              points={[
                "Onboard farmers in <5 minutes via WhatsApp.",
                "Mint a DPID per batch via our open API.",
                "QR codes print straight onto packaging.",
                "EUDR compliance baked in (satellite verified).",
                "Premium pricing — buyers pay more for proof.",
              ]}
            />
            <PartyCard
              icon={<ScanLine size={22} />}
              tint="indigo"
              title="For buyers"
              tagline="Scan. See. Send. Sleep well."
              points={[
                "Scan the QR on any Asli pack with your phone.",
                "See the farmer&apos;s face, hear their voice in your language.",
                "See the farm from space — proof of no deforestation.",
                "Tip directly. Pre-order next harvest.",
                "Retire carbon credits at checkout.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP */}
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <span className="chip mb-4">🔄 The lifecycle of one kilo</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight mb-12">
            From kebun to kitchen, in six moments.
          </h2>

          <ol className="flex flex-col gap-6">
            <Step
              num="01"
              tint="moss"
              icon={<Sprout size={18} />}
              title="The harvest"
              body="Pak Karim picks cherries between sunrise and 10am. He weighs them at the local processing house — 24 kilos today. His co-op enters this into Asli."
            />
            <Step
              num="02"
              tint="ochre"
              icon={<MapPin size={18} />}
              title="The verification"
              body="Asli pulls the latest Sentinel-2 imagery of his plot from the European Space Agency. Forest cover compared to the 2018 baseline. No loss = ✓ EUDR-compliant."
            />
            <Step
              num="03"
              tint="indigo"
              icon={<Mic size={18} />}
              title="The voice"
              body="Pak Karim records 30 seconds on his phone in Acehnese. Claude transcribes, translates, and resynthesizes in 5 buyer languages — preserving his voice timbre."
            />
            <Step
              num="04"
              tint="clay"
              icon={<ScanLine size={18} />}
              title="The DPID"
              body="A unique DPID is minted: ASLI-GYO-2026-K048. QR code prints onto each pack. Open the spec — anyone can read this code. We&apos;re infrastructure."
            />
            <Step
              num="05"
              tint="moss"
              icon={<Coins size={18} />}
              title="The sale"
              body="A roaster in Berlin buys at $18.40/kg. 68% — Rp 1,840,000 — credits Pak Karim&apos;s account instantly. The remaining 32% is split visibly: co-op, logistics, Asli (4%), retailer."
            />
            <Step
              num="06"
              tint="ochre"
              icon={<Heart size={18} />}
              title="The relationship"
              body="The roaster&apos;s customer scans the QR at home. Hears Pak Karim&apos;s voice. Sees the farm from space. Sends a $10 tip. Pre-orders his next harvest. The supply chain becomes a circle."
            />
          </ol>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="bg-[var(--moss)] text-[var(--ivory)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight mb-10">
            Why Asli, when traceability already exists?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-base sm:text-lg leading-relaxed">
            <div>
              <p className="font-bold opacity-70 mb-2">What others do</p>
              <ul className="flex flex-col gap-2 opacity-85">
                <li>→ Trace cocoa to a region.</li>
                <li>→ Print a vague &ldquo;origin: Indonesia&rdquo;.</li>
                <li>→ Tell stories on the brand&apos;s website.</li>
                <li>→ Sell as their own brand.</li>
                <li>→ Buy carbon offsets separately.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold opacity-70 mb-2">What Asli does</p>
              <ul className="flex flex-col gap-2 font-semibold">
                <li>✓ Trace each kilo to one farmer&apos;s plot.</li>
                <li>✓ Print the farmer&apos;s name larger than ours.</li>
                <li>✓ Story comes from the farmer, in their voice.</li>
                <li>✓ Farmer-as-brand. We&apos;re the platform.</li>
                <li>✓ Carbon balance per batch, retire at checkout.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="paper">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Pick your starting door.
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Link
              href="/farmers"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap chunky-shadow-soft"
            >
              Browse farmers <ArrowRight size={18} />
            </Link>
            <Link
              href="/onboard"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ochre)] text-[var(--fg)] font-bold tap chunky-shadow-soft"
            >
              I&apos;m a coop / exporter <ArrowRight size={18} />
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ivory)] text-[var(--fg)] font-bold border border-[var(--line)] tap"
            >
              Scan a DPID <ScanLine size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PartyCard({
  icon,
  tint,
  title,
  tagline,
  points,
}: {
  icon: React.ReactNode;
  tint: "moss" | "ochre" | "clay" | "indigo";
  title: string;
  tagline: string;
  points: string[];
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-7 flex flex-col gap-4">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{
          background: `var(--${tint}-soft)`,
          color: `var(--${tint})`,
        }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-extrabold leading-tight">{title}</h3>
        <p
          className="text-sm font-bold mt-1"
          style={{ color: `var(--${tint})` }}
        >
          {tagline}
        </p>
      </div>
      <ul className="flex flex-col gap-2 text-sm text-[var(--fg-soft)] leading-relaxed">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span style={{ color: `var(--${tint})` }} className="font-bold">
              ●
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({
  num,
  tint,
  icon,
  title,
  body,
}: {
  num: string;
  tint: "moss" | "ochre" | "clay" | "indigo";
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4 bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{
          background: `var(--${tint}-soft)`,
          color: `var(--${tint})`,
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="text-lg font-extrabold leading-tight">{title}</h3>
          <span className="text-xs font-bold tabular-nums text-[var(--muted)]">
            {num}
          </span>
        </div>
        <p className="text-sm text-[var(--fg-soft)] leading-relaxed">{body}</p>
      </div>
    </li>
  );
}
