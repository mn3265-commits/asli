import Link from "next/link";
import { ArrowRight, Sprout, MapPin, Mic, Coins, Heart, ScanLine } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Cara kerja Asli — untuk petani, eksportir, pembeli",
};

export default function HowPageID() {
  return (
    <>
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-14">
          <span className="chip mb-6">📖 Manifesto Asli</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
            Buat rantai pasok jadi{" "}
            <span className="text-[var(--moss)]">personal lagi.</span>
          </h1>
          <p className="text-xl text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            Komoditas dijual per ton. Petani dibayar dengan remah-remah. Pembeli
            tidak tahu tangan siapa yang memetik kopinya. Kami bangun ulang
            relasinya — lewat satu primitif digital terbuka: DPID.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <PartyCard
                icon={<Sprout size={22} />}
                tint="moss"
                title="Untuk petani"
                tagline="Nama Anda. Wajah Anda. Pendapatan Anda."
                points={[
                  "Onboard sekali. Pin lahanmu di peta.",
                  "Rekam memo suara 30 detik dalam dialekmu.",
                  "Setiap kilo terjual masuk ke rekeningmu. Kamu lihat langsung.",
                  "Pembeli bisa kasih tip langsung — 100% lewat ke kamu.",
                  "Penghasilan pre-order bantu kamu lepas dari rentenir.",
                ]}
              />
            </Reveal>
            <Reveal delay={120}>
              <PartyCard
                icon={<Coins size={22} />}
                tint="ochre"
                title="Untuk eksportir & koperasi"
                tagline="Cetak DPID. Jual lebih mahal. Bayar petani lebih besar."
                points={[
                  "Onboard petani <5 menit via WhatsApp.",
                  "Cetak DPID per batch via API terbuka kami.",
                  "Kode QR langsung dicetak ke kemasan.",
                  "Kepatuhan EUDR built-in (diverifikasi satelit).",
                  "Premium pricing — pembeli bayar lebih untuk bukti.",
                ]}
              />
            </Reveal>
            <Reveal delay={240}>
              <PartyCard
                icon={<ScanLine size={22} />}
                tint="indigo"
                title="Untuk pembeli"
                tagline="Pindai. Lihat. Kirim. Tidur nyenyak."
                points={[
                  "Pindai QR di kemasan Asli mana pun pakai HP.",
                  "Lihat wajah petaninya, dengar suaranya dalam bahasamu.",
                  "Lihat kebunnya dari satelit — bukti tidak ada deforestasi.",
                  "Kirim tip langsung. Pre-order panen berikutnya.",
                  "Pensiunkan kredit karbon saat checkout.",
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <span className="chip mb-4">🔄 Siklus satu kilogram</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight mb-12">
            Dari kebun ke dapur, dalam enam momen.
          </h2>

          <ol className="flex flex-col gap-6">
            <Step
              num="01"
              tint="moss"
              icon={<Sprout size={18} />}
              title="Panen"
              body="Pak Karim petik cherry antara fajar dan jam 10 pagi. Ditimbang di processing house lokal — 24 kg hari ini. Koperasinya input ke Asli."
            />
            <Step
              num="02"
              tint="ochre"
              icon={<MapPin size={18} />}
              title="Verifikasi"
              body="Asli tarik citra Sentinel-2 terbaru dari ESA. Tutupan hutan dibandingkan baseline 2018. Tidak ada kehilangan = ✓ EUDR-compliant."
            />
            <Step
              num="03"
              tint="indigo"
              icon={<Mic size={18} />}
              title="Suara"
              body="Pak Karim rekam 30 detik di HP-nya dalam bahasa Aceh. Claude transkripsi, terjemahkan, dan resynth dalam 5 bahasa pembeli — timbre suara Pak Karim tetap terjaga."
            />
            <Step
              num="04"
              tint="clay"
              icon={<ScanLine size={18} />}
              title="DPID"
              body="DPID unik dicetak: ASLI-GYO-2026-K048. Kode QR ke setiap kemasan. Buka spec-nya — siapa pun bisa baca kode ini. Kami infrastruktur."
            />
            <Step
              num="05"
              tint="moss"
              icon={<Coins size={18} />}
              title="Penjualan"
              body="Roaster di Berlin beli dengan harga $18.40/kg. 68% — Rp 1.840.000 — masuk rekening Pak Karim seketika. 32% sisanya dibagi transparan: koperasi, logistik, Asli (4%), retailer."
            />
            <Step
              num="06"
              tint="ochre"
              icon={<Heart size={18} />}
              title="Relasi"
              body="Pelanggan roaster scan QR di rumah. Dengar suara Pak Karim. Lihat kebunnya dari satelit. Kirim tip $10. Pre-order panen berikutnya. Rantai pasok berubah jadi lingkaran."
            />
          </ol>
        </div>
      </section>

      <section className="bg-[var(--moss)] text-[var(--ivory)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight mb-10">
            Kenapa Asli, kalau traceability sudah ada?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-base sm:text-lg leading-relaxed">
            <div>
              <p className="font-bold opacity-70 mb-2">Yang dilakukan platform lain</p>
              <ul className="flex flex-col gap-2 opacity-85">
                <li>→ Lacak kakao ke daerah.</li>
                <li>→ Cetak &ldquo;origin: Indonesia&rdquo; saja.</li>
                <li>→ Ceritakan cerita di website brand.</li>
                <li>→ Jual sebagai brand mereka sendiri.</li>
                <li>→ Beli offset karbon terpisah.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold opacity-70 mb-2">Yang Asli lakukan</p>
              <ul className="flex flex-col gap-2 font-semibold">
                <li>✓ Lacak setiap kilo ke lahan satu petani.</li>
                <li>✓ Cetak nama petani lebih besar dari nama kami.</li>
                <li>✓ Cerita datang dari petaninya, dalam suaranya.</li>
                <li>✓ Petani-sebagai-brand. Kami platform.</li>
                <li>✓ Saldo karbon per batch, pensiunkan saat checkout.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Pilih pintu masukmu.
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Link
              href="/id/farmers"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap chunky-shadow-soft"
            >
              Lihat petani <ArrowRight size={18} />
            </Link>
            <Link
              href="/onboard"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ochre)] text-[var(--fg)] font-bold tap chunky-shadow-soft"
            >
              Saya koperasi / eksportir <ArrowRight size={18} />
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--ivory)] text-[var(--fg)] font-bold border border-[var(--line)] tap"
            >
              Pindai DPID <ScanLine size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PartyCard({
  icon, tint, title, tagline, points,
}: {
  icon: React.ReactNode;
  tint: "moss" | "ochre" | "clay" | "indigo";
  title: string; tagline: string; points: string[];
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-7 flex flex-col gap-4 lift">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: `var(--${tint}-soft)`, color: `var(--${tint})` }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-extrabold leading-tight">{title}</h3>
        <p className="text-sm font-bold mt-1" style={{ color: `var(--${tint})` }}>
          {tagline}
        </p>
      </div>
      <ul className="flex flex-col gap-2 text-sm text-[var(--fg-soft)] leading-relaxed">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span style={{ color: `var(--${tint})` }} className="font-bold">●</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({
  num, tint, icon, title, body,
}: {
  num: string;
  tint: "moss" | "ochre" | "clay" | "indigo";
  icon: React.ReactNode;
  title: string; body: string;
}) {
  return (
    <li className="flex gap-4 bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: `var(--${tint}-soft)`, color: `var(--${tint})` }}
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
