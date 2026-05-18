import Link from "next/link";
import { ArrowRight, MapPin, Mic, Sprout, ScanLine } from "lucide-react";
import { FARMERS, formatIDR, portraitUrl } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { PulauRunStory } from "@/components/pulau-run-story";

export const metadata = {
  title: "Asli — Komoditas Indonesia, dengan nama",
  description:
    "Platform jejak rantai pasok untuk ekspor komoditas Indonesia. Setiap produk membawa Digital Product ID — wajah, suara, koordinat satelit, dan bagi hasil yang jujur untuk petaninya.",
};

export default function HomePageID() {
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
              🌿 Ekspor komoditas Indonesia — dibayangkan ulang
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              Komoditas Indonesia,{" "}
              <span className="text-[var(--moss)]">dengan nama.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--fg-soft)] max-w-xl leading-relaxed">
              Setiap kilogram kopi, rempah, vanili, atau madu membawa Digital
              Product ID. Pindai QR-nya — lihat wajah petaninya. Dengarkan
              suaranya. Lihat kebunnya dari satelit. Kirim tip langsung.
              Rantai pasok, jadi personal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/id/farmers"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--fg)] text-[var(--ivory)] font-bold tap chunky-shadow-soft"
              >
                Kenalan dengan petani
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/id/how"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ivory)] text-[var(--fg)] font-bold border border-[var(--line)] tap"
              >
                Cara kerjanya
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
                <span className="text-[var(--moss)]">● terverifikasi</span>
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
                  <span className="absolute -bottom-0.5 -right-0.5 text-lg">☕</span>
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
                &ldquo;Saya mulai memetik cherry waktu umur dua belas. Ayah
                saya juga, dan kakek saya sebelumnya. Sekarang Anda bisa lihat
                saya, dan saya bisa lihat Anda.&rdquo;
              </p>
              <div className="mt-5 pt-5 border-t border-[var(--line)] grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-extrabold tabular-nums">68%</p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    Ke Pak Karim
                  </p>
                </div>
                <div>
                  <p className="text-lg font-extrabold tabular-nums">1.24</p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    kg CO₂ diserap
                  </p>
                </div>
                <div>
                  <p className="text-lg font-extrabold tabular-nums">24kg</p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] mt-0.5">
                    Batch ini
                  </p>
                </div>
              </div>
              <Link
                href="/farmers/karim-aceh"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
              >
                <ScanLine size={16} />
                Buka DPID ini
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
            label="petani, dengan nama"
            sub="Orang nyata. Lahan nyata. Rupiah nyata."
          />
          <Stat
            value={islands.toString()}
            label="pulau sumber"
            sub="Sumatra sampai Papua. Diverifikasi satelit."
          />
          <Stat
            value={formatIDR(yearlyFarmerIncome)}
            label="pendapatan petani tercatat"
            sub="Terlihat oleh setiap pembeli. Selalu."
          />
        </div>
      </section>

      {/* ── THE PROBLEM ───────────────────────────────────────────── */}
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <span className="chip mb-6">📍 Masalah yang sedang kami pecahkan</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Indonesia adalah lumbung dunia.
            <br />
            <span className="text-[var(--clay)]">
              Dan dunia tidak tahu namanya.
            </span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <ProblemCard
              big="3rd"
              label="produsen kakao dunia"
              tail="tapi petaninya $2/hari"
            />
            <ProblemCard
              big="2nd"
              label="produsen kopi dunia"
              tail="tapi 80% nilai keluar dari negeri"
            />
            <ProblemCard
              big="500"
              label="tahun sejak Spice Islands"
              tail="dan petani pala Maluku masih dapat remah"
            />
          </div>
          <p className="text-lg text-[var(--fg-soft)] mt-12 leading-relaxed max-w-2xl">
            Indonesia mengekspor kopi, rempah, vanili, madu, dan kakao yang
            mendunia. Tapi petani di balik setiap kilo nyaris tak terlihat —
            dan dibayar seolah-olah memang demikian. Asli membangun ulang
            rantai pasok agar setiap produk membawa satu wajah. Bukan
            anonim. Bukan dapat ditukar-tukar. Dengan nama.
          </p>
        </div>
      </section>

      {/* ── PULAU RUN STORY ───────────────────────────────────────── */}
      <PulauRunStory lang="id" />

      {/* ── THE TECH (4-layer stack) ──────────────────────────────── */}
      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl mb-12">
            <span className="chip mb-4">🛠 Yang baru</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Satu QR. Empat jenis sihir.
            </h2>
            <p className="text-lg text-[var(--fg-soft)] mt-4 leading-relaxed">
              Setiap DPID Asli menggabungkan empat teknologi terbuka. Tidak
              ada yang pernah menumpuknya seperti ini untuk ekspor Indonesia —
              sampai sekarang.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Reveal delay={0}>
              <TechCard
                tint="moss"
                icon={<MapPin size={20} />}
                num="01"
                title="Asal-usul diverifikasi satelit"
                body="Setiap lahan petani digeofence dan diambil baru dari Sentinel-2 setiap 5 hari. Pembeli melihat kebun aslinya dari satelit — plus bukti tidak ada deforestasi. Otomatis generate dokumen EUDR (Uni Eropa) dan FDA FSMA 204 (Amerika Serikat) dari data yang sama."
                chip="EUDR + FDA FSMA-204 siap"
              />
            </Reveal>
            <Reveal delay={120}>
              <TechCard
                tint="ochre"
                icon={<Mic size={20} />}
                num="02"
                title="Suara petani via AI"
                body="Petani rekam memo suara 30 detik dalam Bahasa Indonesia atau dialek lokal. AI menerjemahkan dan menyuarakannya dalam bahasa pembeli — sambil mempertahankan timbre suara petani itu sendiri. Otentik, dalam skala."
                chip="Claude · Sonnet"
              />
            </Reveal>
            <Reveal delay={240}>
              <TechCard
                tint="clay"
                icon={<Sprout size={20} />}
                num="03"
                title="Buku besar karbon per kilo"
                body="Indeks keanekaragaman dari satelit + survei praktik → saldo CO₂ langsung per batch. Banyak kebun kami net-negatif. Pembeli bisa pensiunkan offset saat checkout, di atas komoditasnya."
                chip="net-negatif terlacak"
              />
            </Reveal>
            <Reveal delay={360}>
              <TechCard
                tint="indigo"
                icon={<ScanLine size={20} />}
                num="04"
                title="Spesifikasi DPID terbuka"
                body="Standar DPID adalah publik. Koperasi, eksportir, dan komoditas mana pun bisa membuat dan membaca DPID. Kami jadi infrastruktur, bukan penjaga gerbang. Stripe untuk fair trade."
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
              <span className="chip mb-4">👋 Kenalan dulu</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
                Nama nyata. Kebun nyata.
              </h2>
            </div>
            <Link
              href="/id/farmers"
              className="text-[var(--moss)] font-bold inline-flex items-center gap-1 tap"
            >
              Lihat semua <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FARMERS.slice(0, 6).map((f) => (
              <Link
                key={f.slug}
                href={`/farmers/${f.slug}`}
                className="group bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 tap lift flex flex-col gap-3"
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
                    {f.batch.farmerSharePct}% ke petani
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
            Beli komoditas dengan wajah,
            <br />
            <span className="opacity-70">bukan satu ton tanpa nama.</span>
          </h2>
          <p className="text-lg opacity-80 max-w-xl leading-relaxed">
            Asli adalah lapisan kepercayaan digital untuk ekspor komoditas
            Indonesia. Petani didahulukan. Diverifikasi satelit. Spec terbuka.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link
              href="/id/farmers"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ochre)] text-[var(--fg)] font-bold tap"
            >
              Lihat petani
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/id/how"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-transparent text-[var(--ivory)] border border-[var(--ivory)]/30 font-bold tap"
            >
              Baca manifesto
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
            · Komoditas Indonesia, dengan nama. © 2026
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/spec" className="hover:text-[var(--ochre)]">
              Spec DPID terbuka
            </Link>
            <Link href="/strategy" className="hover:text-[var(--ochre)]">
              Studi strategis
            </Link>
            <Link href="/onboard" className="hover:text-[var(--ochre)]">
              Untuk eksportir
            </Link>
            <Link href="/dashboard" className="hover:text-[var(--ochre)]">
              Dasbor pembeli
            </Link>
            <Link href="/impact" className="hover:text-[var(--ochre)]">
              Dampak
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

function Stat({ value, label, sub }: { value: string; label: string; sub: string }) {
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

function ProblemCard({ big, label, tail }: { big: string; label: string; tail: string }) {
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
  tint, icon, num, title, body, chip,
}: {
  tint: "moss" | "ochre" | "clay" | "indigo";
  icon: React.ReactNode;
  num: string; title: string; body: string; chip: string;
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-7 flex flex-col gap-4 lift">
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: `var(--${tint}-soft)`, color: `var(--${tint})` }}
        >
          {icon}
        </div>
        <span className="text-xs font-bold tabular-nums text-[var(--muted)]">
          {num}
        </span>
      </div>
      <div>
        <h3 className="text-xl font-extrabold leading-tight">{title}</h3>
        <p className="text-sm text-[var(--fg-soft)] mt-2 leading-relaxed">{body}</p>
      </div>
      <span className="text-[10px] uppercase tracking-widest font-bold mt-auto" style={{ color: `var(--${tint})` }}>
        ● {chip}
      </span>
    </div>
  );
}
