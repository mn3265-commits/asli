import Link from "next/link";
import {
  ArrowLeft,
  Map,
  Compass,
  Sprout,
  Users,
  FileCheck,
  Rocket,
  Globe2,
  Building2,
  CheckCircle2,
} from "lucide-react";

type Lang = "en" | "id";

type Milestone = {
  title: string;
  done: boolean;
  icon: React.ReactNode;
};

type Quarter = {
  label: string;
  range: string;
  status: "shipped" | "now" | "next" | "later";
  tint: "moss" | "ochre" | "clay" | "indigo";
  headline: string;
  body: string;
  milestones: Milestone[];
};

const QUARTERS_EN: Quarter[] = [
  {
    label: "Q1 2026",
    range: "Feb – Apr",
    status: "shipped",
    tint: "moss",
    headline: "Public prototype + strategy memo published.",
    body: "We built the working platform — DPID minting, satellite tiles, AI farmer voice, buyer dashboard, EUDR/FSMA paperwork generator — and published the strategy memo in the open. Goal: have a fully credible artifact before any conversation with a cooperative or buyer.",
    milestones: [
      { title: "Prototype shipped (asli-id.vercel.app)", done: true, icon: <Rocket size={14} /> },
      { title: "Strategy memo published (EN + ID)", done: true, icon: <FileCheck size={14} /> },
      { title: "Open DPID spec drafted", done: true, icon: <Globe2 size={14} /> },
    ],
  },
  {
    label: "Q2 2026",
    range: "May – Jul",
    status: "now",
    tint: "ochre",
    headline: "First cooperative LOI + buyer conversations.",
    body: "We are here. Goal is two signed letters of intent from Indonesian commodity cooperatives (coffee in Aceh + nutmeg in Banda are the leading candidates) and three serious buyer-side conversations in Europe and North America. Greater Good Challenge submission goes in this quarter.",
    milestones: [
      { title: "Greater Good Challenge 2026 submission", done: false, icon: <FileCheck size={14} /> },
      { title: "First cooperative LOI", done: false, icon: <Sprout size={14} /> },
      { title: "3 buyer-side discovery calls", done: false, icon: <Users size={14} /> },
      { title: "Indonesian co-founder hired", done: false, icon: <Users size={14} /> },
    ],
  },
  {
    label: "Q3 2026",
    range: "Aug – Oct",
    status: "next",
    tint: "indigo",
    headline: "First cohort live: 2 cooperatives, ~1,200 farmers.",
    body: "First real onboarding: two cooperatives, plot polygons captured, voice memos recorded, satellite history backfilled, DPIDs minted. EUDR doc-gen v1 ships and is tested with one EU importer. First $0-margin pilot transactions clear through the platform.",
    milestones: [
      { title: "2 cooperatives onboarded", done: false, icon: <Sprout size={14} /> },
      { title: "~1,200 farmer DPIDs minted", done: false, icon: <Users size={14} /> },
      { title: "EUDR due-diligence doc-gen v1", done: false, icon: <FileCheck size={14} /> },
      { title: "First paid pilot batch through platform", done: false, icon: <Building2 size={14} /> },
    ],
  },
  {
    label: "Q4 2026",
    range: "Nov – Jan 2027",
    status: "later",
    tint: "clay",
    headline: "Scale to 6 cooperatives + seed round.",
    body: "Six cooperatives, ~3,500 farmers (the break-even target from the strategy memo), three paying buyers. FSMA-204 doc-gen v1 ships ahead of the January 2026 US enforcement deadline. Seed round closes conditional on traction.",
    milestones: [
      { title: "6 cooperatives onboarded", done: false, icon: <Sprout size={14} /> },
      { title: "~3,500 active farmers (break-even threshold)", done: false, icon: <Users size={14} /> },
      { title: "3 paying buyers", done: false, icon: <Building2 size={14} /> },
      { title: "FSMA-204 doc-gen v1", done: false, icon: <FileCheck size={14} /> },
      { title: "Seed round closed", done: false, icon: <Rocket size={14} /> },
    ],
  },
];

const QUARTERS_ID: Quarter[] = [
  {
    label: "Q1 2026",
    range: "Feb – Apr",
    status: "shipped",
    tint: "moss",
    headline: "Prototype publik + memo strategi terbit.",
    body: "Kami membangun platform yang berfungsi — minting DPID, tile satelit, voice petani dengan AI, dasbor pembeli, generator dokumen EUDR/FSMA — dan menerbitkan memo strategi secara terbuka. Tujuan: punya artefak yang fully credible sebelum percakapan apa pun dengan koperasi atau pembeli.",
    milestones: [
      { title: "Prototype rilis (asli-id.vercel.app)", done: true, icon: <Rocket size={14} /> },
      { title: "Memo strategi terbit (EN + ID)", done: true, icon: <FileCheck size={14} /> },
      { title: "Spec DPID terbuka draft", done: true, icon: <Globe2 size={14} /> },
    ],
  },
  {
    label: "Q2 2026",
    range: "Mei – Jul",
    status: "now",
    tint: "ochre",
    headline: "LOI koperasi pertama + percakapan dengan pembeli.",
    body: "Kami di sini. Tujuannya dua letter of intent yang ditandatangani dari koperasi komoditas Indonesia (kopi di Aceh + pala di Banda adalah kandidat terdepan) dan tiga percakapan serius sisi pembeli di Eropa dan Amerika Utara. Submission Greater Good Challenge masuk kuartal ini.",
    milestones: [
      { title: "Submission Greater Good Challenge 2026", done: false, icon: <FileCheck size={14} /> },
      { title: "LOI koperasi pertama", done: false, icon: <Sprout size={14} /> },
      { title: "3 discovery call dari sisi pembeli", done: false, icon: <Users size={14} /> },
      { title: "Co-founder Indonesia direkrut", done: false, icon: <Users size={14} /> },
    ],
  },
  {
    label: "Q3 2026",
    range: "Agu – Okt",
    status: "next",
    tint: "indigo",
    headline: "Cohort pertama live: 2 koperasi, ~1,200 petani.",
    body: "Onboarding nyata pertama: dua koperasi, poligon lahan ditangkap, voice memo direkam, riwayat satelit di-backfill, DPID dicetak. EUDR doc-gen v1 rilis dan diuji dengan satu importir Uni Eropa. Transaksi pilot pertama dengan margin nol cleared lewat platform.",
    milestones: [
      { title: "2 koperasi onboard", done: false, icon: <Sprout size={14} /> },
      { title: "~1,200 DPID petani dicetak", done: false, icon: <Users size={14} /> },
      { title: "EUDR doc-gen v1", done: false, icon: <FileCheck size={14} /> },
      { title: "Batch pilot berbayar pertama lewat platform", done: false, icon: <Building2 size={14} /> },
    ],
  },
  {
    label: "Q4 2026",
    range: "Nov – Jan 2027",
    status: "later",
    tint: "clay",
    headline: "Scale ke 6 koperasi + seed round.",
    body: "Enam koperasi, ~3,500 petani (target break-even dari memo strategi), tiga pembeli yang membayar. FSMA-204 doc-gen v1 rilis menjelang deadline enforcement Amerika Januari 2026. Seed round closing bersyarat pada traksi.",
    milestones: [
      { title: "6 koperasi onboard", done: false, icon: <Sprout size={14} /> },
      { title: "~3,500 petani aktif (ambang break-even)", done: false, icon: <Users size={14} /> },
      { title: "3 pembeli yang membayar", done: false, icon: <Building2 size={14} /> },
      { title: "FSMA-204 doc-gen v1", done: false, icon: <FileCheck size={14} /> },
      { title: "Seed round closed", done: false, icon: <Rocket size={14} /> },
    ],
  },
];

const T = {
  en: {
    eyebrow: "Roadmap",
    title: "Where Asli is going, by quarter.",
    sub: "We publish the roadmap on the same page as the prototype. If we miss a milestone we will mark it missed; if we hit one we will mark it shipped.",
    back: "Back to Asli",
    shipped: "Shipped",
    now: "We are here",
    next: "Next",
    later: "Later",
  },
  id: {
    eyebrow: "Roadmap",
    title: "Ke mana Asli akan pergi, per kuartal.",
    sub: "Kami publikasikan roadmap di halaman yang sama dengan prototype-nya. Kalau kami melewatkan milestone, kami akan tandai missed; kalau kami mencapai satu, kami akan tandai shipped.",
    back: "Kembali ke Asli",
    shipped: "Selesai",
    now: "Posisi sekarang",
    next: "Berikutnya",
    later: "Lebih jauh",
  },
};

const STATUS_LABEL: Record<Quarter["status"], keyof typeof T.en> = {
  shipped: "shipped",
  now: "now",
  next: "next",
  later: "later",
};

export function RoadmapContent({ lang }: { lang: Lang }) {
  const quarters = lang === "id" ? QUARTERS_ID : QUARTERS_EN;
  const t = T[lang];
  const home = lang === "id" ? "/id" : "/";

  return (
    <main className="bg-[var(--bg)]">
      <section className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-6">
        <Link
          href={home}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--moss)] mb-8"
        >
          <ArrowLeft size={14} />
          {t.back}
        </Link>
        <div className="flex items-center gap-2 mb-4 text-[var(--ochre)]">
          <Map size={20} />
          <span className="text-xs uppercase tracking-widest font-bold">
            {t.eyebrow}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--fg-soft)] leading-relaxed">
          {t.sub}
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
        <div className="relative">
          <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-[var(--line)] hidden sm:block" />
          <div className="space-y-6 sm:space-y-8">
            {quarters.map((q, i) => (
              <div key={i} className="relative">
                <div className="flex gap-4">
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs border-2 ${
                        q.status === "shipped"
                          ? "bg-[var(--moss)] text-[var(--ivory)] border-[var(--moss)]"
                          : q.status === "now"
                            ? "bg-[var(--ochre)] text-[var(--fg)] border-[var(--ochre)] animate-pulse"
                            : "bg-[var(--bg)] text-[var(--muted)] border-[var(--line)]"
                      }`}
                    >
                      {q.status === "shipped" ? (
                        <CheckCircle2 size={16} />
                      ) : q.status === "now" ? (
                        <Compass size={15} />
                      ) : (
                        i + 1
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`rounded-2xl border p-6 sm:p-7 ${
                        q.status === "now"
                          ? "bg-[var(--ochre-soft)] border-[var(--ochre)]"
                          : "bg-[var(--ivory)] border-[var(--line)]"
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                        <span className="text-xs uppercase tracking-widest font-extrabold text-[var(--clay)]">
                          {t[STATUS_LABEL[q.status]]}
                        </span>
                        <span className="text-[var(--muted)] text-xs">·</span>
                        <span className="text-lg font-extrabold tracking-tight">
                          {q.label}
                        </span>
                        <span className="text-sm text-[var(--muted)]">
                          {q.range}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                        {q.headline}
                      </h2>
                      <p className="mt-3 text-[15px] text-[var(--fg-soft)] leading-relaxed">
                        {q.body}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {q.milestones.map((m, mi) => (
                          <li
                            key={mi}
                            className={`flex items-center gap-2.5 text-sm ${
                              m.done
                                ? "text-[var(--moss)] line-through opacity-70"
                                : "text-[var(--fg-soft)]"
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                m.done
                                  ? "bg-[var(--moss)] text-[var(--ivory)]"
                                  : "bg-[var(--bg-deep)] text-[var(--muted)] border border-[var(--line)]"
                              }`}
                            >
                              {m.done ? <CheckCircle2 size={11} /> : m.icon}
                            </span>
                            <span>{m.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
