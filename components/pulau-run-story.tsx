"use client";

import { Reveal } from "@/components/reveal";

type Lang = "en" | "id";

const TEXT = {
  en: {
    chip: "🌶 1667 · Treaty of Breda",
    title: (
      <>
        The world once traded
        <br />
        <span className="text-[var(--clay)]">Manhattan for nutmeg.</span>
      </>
    ),
    p1: (
      <>
        On 31 July 1667, the Dutch and the English signed the Treaty of Breda.
        The English ceded <strong>Pulau Run</strong> — a 3-kilometer-wide nutmeg
        island in Maluku — to the Dutch. In exchange, the Dutch handed over
        <strong> New Amsterdam</strong>, a small Dutch settlement on the other
        side of the world.
      </>
    ),
    p2: (
      <>
        New Amsterdam was renamed <strong>New York</strong>.
      </>
    ),
    p3: (
      <>
        Nutmeg, at the time, was worth more than gold in Europe — used as
        medicine, preservative, and aphrodisiac. The Banda Islands were the
        only place on Earth it grew. Empires fought wars for them, depopulated
        villages, redrew maps. The trade route that fed those wars passed
        directly through Pulau Run.
      </>
    ),
    p4: (
      <>
        Today, the descendants of those nutmeg growers earn USD 2 a day.
        The world that once traded a future Manhattan for their spice
        no longer knows their names. <strong>Asli is correcting the asymmetry.</strong>
      </>
    ),
    leftLabel: "Pulau Run",
    leftSub: "3 km², 380 nutmeg farmers",
    rightLabel: "Manhattan",
    rightSub: "59 km², 1.6 million people",
    swapNote: "≈ even trade, 1667",
  },
  id: {
    chip: "🌶 1667 · Perjanjian Breda",
    title: (
      <>
        Dunia pernah menukar
        <br />
        <span className="text-[var(--clay)]">Manhattan dengan pala.</span>
      </>
    ),
    p1: (
      <>
        Pada 31 Juli 1667, Belanda dan Inggris menandatangani Perjanjian Breda.
        Inggris menyerahkan <strong>Pulau Run</strong> — pulau pala selebar 3
        kilometer di Maluku — kepada Belanda. Sebagai gantinya, Belanda menyerahkan
        <strong> New Amsterdam</strong>, sebuah pemukiman Belanda kecil di sisi
        lain dunia.
      </>
    ),
    p2: (
      <>
        New Amsterdam berganti nama menjadi <strong>New York</strong>.
      </>
    ),
    p3: (
      <>
        Pala, di masa itu, lebih berharga daripada emas di Eropa — dipakai sebagai
        obat, pengawet, dan afrodisiak. Kepulauan Banda adalah satu-satunya tempat
        di Bumi tempat tumbuhnya. Imperium berperang demi pulau-pulau itu,
        mengosongkan kampung, menggambar ulang peta. Jalur dagang yang memberi
        makan perang-perang itu lewat langsung melalui Pulau Run.
      </>
    ),
    p4: (
      <>
        Hari ini, keturunan petani pala itu berpenghasilan USD 2 per hari.
        Dunia yang dulu menukar calon Manhattan demi rempah mereka tidak lagi
        tahu nama mereka. <strong>Asli memperbaiki asimetri itu.</strong>
      </>
    ),
    leftLabel: "Pulau Run",
    leftSub: "3 km², 380 petani pala",
    rightLabel: "Manhattan",
    rightSub: "59 km², 1.6 juta orang",
    swapNote: "≈ pertukaran setara, 1667",
  },
};

export function PulauRunStory({ lang = "en" }: { lang?: Lang } = {}) {
  const t = TEXT[lang];
  return (
    <section className="bg-[var(--bg-deep)] relative overflow-hidden">
      {/* Soft accent blob */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 drift-blob"
        style={{ background: "var(--clay)", filter: "blur(100px)" }}
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 relative">
        <Reveal>
          <span className="chip self-start mb-6">{t.chip}</span>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight mb-10 max-w-3xl">
            {t.title}
          </h2>
        </Reveal>

        {/* The swap visual */}
        <Reveal delay={240}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6 my-12 sm:my-16">
            {/* LEFT — Pulau Run */}
            <div className="rounded-3xl bg-[var(--ivory)] border border-[var(--line)] p-6 sm:p-7 chunky-shadow-soft flex flex-col items-center text-center gap-3">
              <PulauRunIllustration />
              <div className="mt-2">
                <p className="text-xs uppercase tracking-widest font-bold text-[var(--moss)]">
                  {t.leftLabel}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">{t.leftSub}</p>
              </div>
            </div>

            {/* CENTER — swap arrows */}
            <div className="flex md:flex-col items-center justify-center gap-2 py-2">
              <SwapArrows />
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] whitespace-nowrap">
                {t.swapNote}
              </span>
            </div>

            {/* RIGHT — Manhattan */}
            <div className="rounded-3xl bg-[var(--ivory)] border border-[var(--line)] p-6 sm:p-7 chunky-shadow-soft flex flex-col items-center text-center gap-3">
              <ManhattanIllustration />
              <div className="mt-2">
                <p className="text-xs uppercase tracking-widest font-bold text-[var(--indigo)]">
                  {t.rightLabel}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">{t.rightSub}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto flex flex-col gap-5 text-base sm:text-lg text-[var(--fg-soft)] leading-relaxed">
          <Reveal delay={120}>
            <p>{t.p1}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-xl sm:text-2xl font-extrabold text-[var(--fg)]">
              {t.p2}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p>{t.p3}</p>
          </Reveal>
          <Reveal delay={480}>
            <p className="border-l-4 border-[var(--ochre)] pl-5 italic">
              {t.p4}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PulauRunIllustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-[220px] aspect-[5/3]"
      aria-hidden
    >
      <defs>
        <linearGradient id="pr-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cdd6e6" />
          <stop offset="100%" stopColor="#a4b3c8" />
        </linearGradient>
        <linearGradient id="pr-land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a8542" />
          <stop offset="100%" stopColor="#3a5a2a" />
        </linearGradient>
      </defs>
      {/* sea */}
      <rect width="200" height="120" fill="url(#pr-sea)" />
      {/* gentle waves */}
      <path d="M0 90 Q 50 88 100 92 T 200 90" stroke="#fff" strokeWidth="0.5" fill="none" opacity="0.4" />
      <path d="M0 100 Q 50 102 100 99 T 200 101" stroke="#fff" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M0 110 Q 50 109 100 112 T 200 110" stroke="#fff" strokeWidth="0.4" fill="none" opacity="0.3" />
      {/* island */}
      <ellipse cx="100" cy="78" rx="60" ry="14" fill="url(#pr-land)" />
      <ellipse cx="100" cy="76" rx="58" ry="12" fill="#6b9550" />
      {/* nutmeg trees */}
      <g>
        {[40, 60, 80, 100, 120, 140].map((x, i) => (
          <g key={i} transform={`translate(${x},${68 + (i % 2) * 2})`}>
            <rect x="-1" y="0" width="2" height="8" fill="#4a3520" />
            <circle cx="0" cy="-3" r="6" fill="#2f5d3a" />
            <circle cx="-2" cy="-5" r="4" fill="#4a7a35" />
            <circle cx="2" cy="-4" r="4" fill="#4a7a35" />
            {/* tiny nutmeg fruit */}
            <circle cx="0" cy="-2" r="1.2" fill="#d4831a" />
          </g>
        ))}
      </g>
      {/* small mountain on left */}
      <path d="M30 78 L 50 60 L 70 78 Z" fill="#3a5a2a" />
    </svg>
  );
}

function ManhattanIllustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-[220px] aspect-[5/3]"
      aria-hidden
    >
      <defs>
        <linearGradient id="mh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcd1e6" />
          <stop offset="100%" stopColor="#b8a8cf" />
        </linearGradient>
        <linearGradient id="mh-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7d8da6" />
          <stop offset="100%" stopColor="#576985" />
        </linearGradient>
      </defs>
      {/* sky */}
      <rect width="200" height="100" fill="url(#mh-sky)" />
      {/* water */}
      <rect y="100" width="200" height="20" fill="url(#mh-water)" />
      {/* skyline (silhouette) */}
      <g fill="#2c3e6f">
        {/* buildings */}
        <rect x="10" y="60" width="10" height="40" />
        <rect x="22" y="50" width="14" height="50" />
        <rect x="38" y="35" width="12" height="65" />
        <rect x="52" y="55" width="10" height="45" />
        <rect x="64" y="42" width="14" height="58" />
        <rect x="80" y="20" width="10" height="80" /> {/* tall one */}
        <polygon points="80,20 85,12 90,20" />
        <rect x="92" y="30" width="14" height="70" />
        <rect x="108" y="55" width="10" height="45" />
        <rect x="120" y="38" width="14" height="62" />
        <rect x="136" y="48" width="12" height="52" />
        <rect x="150" y="32" width="14" height="68" />
        <rect x="166" y="58" width="10" height="42" />
        <rect x="178" y="45" width="14" height="55" />
      </g>
      {/* lit windows (warm sparks) */}
      <g fill="#fde7a8" opacity="0.9">
        <rect x="40" y="42" width="2" height="2" />
        <rect x="44" y="48" width="2" height="2" />
        <rect x="82" y="28" width="2" height="2" />
        <rect x="84" y="36" width="2" height="2" />
        <rect x="82" y="44" width="2" height="2" />
        <rect x="96" y="35" width="2" height="2" />
        <rect x="100" y="42" width="2" height="2" />
        <rect x="122" y="46" width="2" height="2" />
        <rect x="153" y="40" width="2" height="2" />
        <rect x="156" y="48" width="2" height="2" />
        <rect x="182" y="52" width="2" height="2" />
      </g>
      {/* water reflection lines */}
      <g stroke="#fff" strokeWidth="0.4" opacity="0.4">
        <line x1="0" y1="106" x2="200" y2="106" />
        <line x1="0" y1="112" x2="200" y2="112" />
        <line x1="0" y1="116" x2="200" y2="116" />
      </g>
    </svg>
  );
}

function SwapArrows() {
  return (
    <svg
      viewBox="0 0 60 40"
      className="w-12 sm:w-14 h-auto rotate-90 md:rotate-0"
      aria-hidden
    >
      <defs>
        <marker id="swap-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill="#d4831a" />
        </marker>
      </defs>
      <line x1="10" y1="14" x2="50" y2="14" stroke="#d4831a" strokeWidth="2.5" markerEnd="url(#swap-arrow)" />
      <line x1="50" y1="28" x2="10" y2="28" stroke="#2c3e6f" strokeWidth="2.5" markerEnd="url(#swap-arrow)" />
    </svg>
  );
}
