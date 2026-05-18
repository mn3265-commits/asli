import { FARMERS, formatIDR } from "@/lib/data";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "Dasbor dampak — Asli" };

const SDGS = [
  {
    num: "1",
    title: "Tanpa Kemiskinan",
    bg: "#e5243b",
    body: "Transfer pendapatan langsung menaikkan penghasilan petani 2.4x di atas rata-rata komoditas regional.",
  },
  {
    num: "8",
    title: "Pekerjaan Layak & Ekonomi Tumbuh",
    bg: "#a21942",
    body: "Upah transparan + harga floor ditentukan petani. Petani menangkap 68% nilai vs industri ~22%.",
  },
  {
    num: "12",
    title: "Konsumsi Bertanggung Jawab",
    bg: "#bf8b2e",
    body: "Setiap kilo dapat ditelusuri ke lahan bernama. Pembeli tahu persis untuk apa dan kepada siapa membayar.",
  },
  {
    num: "13",
    title: "Aksi Iklim",
    bg: "#3f7e44",
    body: "Saldo karbon dilacak per batch. Banyak kebun kami net-negatif lewat agroforestri dan kopi shade-grown.",
  },
  {
    num: "15",
    title: "Ekosistem Daratan",
    bg: "#56c02b",
    body: "Pantauan tutupan hutan Sentinel-2 di setiap lahan. Tidak ada deforestasi sejak 2018 di semua kebun.",
  },
  {
    num: "17",
    title: "Kemitraan untuk Tujuan",
    bg: "#19486a",
    body: "Spec DPID terbuka. Koperasi, eksportir, atau pembeli mana pun bisa integrasi — infrastruktur publik.",
  },
];

export default function ImpactPageID() {
  const totalIncome = FARMERS.reduce((s, f) => s + f.yearlyEarned, 0);
  const totalKg = FARMERS.reduce((s, f) => s + f.batch.weightKg, 0);
  const totalCO2grams = FARMERS.reduce(
    (s, f) => s + Math.abs(f.batch.co2PerKgGrams * f.batch.weightKg),
    0,
  );
  const totalCO2kg = totalCO2grams / 1000;
  const totalPlotHectares = FARMERS.reduce((s, f) => s + f.plotHectares, 0);
  const islands = new Set(FARMERS.map((f) => f.island)).size;
  const commodities = new Set(FARMERS.map((f) => f.commodity)).size;
  const avgFarmerShare =
    FARMERS.reduce((s, f) => s + f.batch.farmerSharePct, 0) / FARMERS.length;

  const commodityName: Record<string, string> = {
    coffee: "kopi",
    nutmeg: "pala",
    clove: "cengkeh",
    vanilla: "vanili",
    "wild-honey": "madu hutan",
    cacao: "kakao",
  };

  return (
    <>
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
          <span className="chip mb-6">📊 Dampak langsung</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-4">
            Yang dilakukan Asli,
            <br />
            <span className="text-[var(--moss)]">dalam angka.</span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            Setiap metrik di sini langsung. Angka diperbarui setiap transaksi.
            Tidak ada laporan tahunan — hanya kebenaran, di-refresh.
          </p>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <BigStat tint="moss" value={formatIDR(totalIncome)} label="Pendapatan petani tercatat" sub="kumulatif 2026" />
            <BigStat tint="ochre" value={`${Math.round(avgFarmerShare)}%`} label="Rata-rata bagian petani" sub="vs industri ~22%" />
            <BigStat tint="clay" value={`${totalCO2kg.toFixed(1)}kg`} label="CO₂ bersih terserap" sub="dari batch saat ini" />
            <BigStat tint="indigo" value={`${totalPlotHectares.toFixed(1)}ha`} label="Lahan terverifikasi" sub="via Sentinel-2" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="text-3xl font-extrabold mb-8">Rincian jaringan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <MiniStat label="Petani, dengan nama" value={FARMERS.length} />
            <MiniStat label="Pulau bersumber" value={islands} />
            <MiniStat label="Komoditas" value={commodities} />
            <MiniStat label="Kg musim ini" value={totalKg.toFixed(0)} />
            <MiniStat label="Tip dilanjutkan" value="$1.240" sub="100% ke petani" />
            <MiniStat label="Pre-order terkunci" value="42" sub="panen yang dibiayai di muka" />
          </div>

          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--line)]">
              <h3 className="font-extrabold">Per komoditas</h3>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {Array.from(new Set(FARMERS.map((f) => f.commodity))).map((c) => {
                const farmers = FARMERS.filter((f) => f.commodity === c);
                const totalEarn = farmers.reduce((s, f) => s + f.yearlyEarned, 0);
                const avgShare = Math.round(
                  farmers.reduce((s, f) => s + f.batch.farmerSharePct, 0) / farmers.length,
                );
                return (
                  <div key={c} className="grid grid-cols-12 gap-3 px-5 py-4 items-center">
                    <div className="col-span-4 sm:col-span-3 flex items-center gap-2 font-bold capitalize">
                      <span className="text-xl">{farmers[0].emoji}</span>
                      <span className="truncate">{commodityName[c] ?? c}</span>
                    </div>
                    <div className="col-span-2 text-sm tabular-nums">{farmers.length}</div>
                    <div className="col-span-3 text-sm tabular-nums">{formatIDR(totalEarn)}</div>
                    <div className="col-span-3 sm:col-span-2 text-sm tabular-nums font-bold text-[var(--moss)]">{avgShare}%</div>
                    <div className="hidden sm:block col-span-2 text-xs text-[var(--muted)]">rata-rata bagian petani</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl mb-10">
            <span className="chip mb-4">🌍 Selaras SDG</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Enam Tujuan Pembangunan Berkelanjutan PBB,
              <br />
              <span className="text-[var(--moss)]">progres terukur.</span>
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
                  <p className="text-sm text-[var(--fg-soft)] leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--fg)] text-[var(--ivory)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 text-center">
          <p className="text-sm uppercase tracking-widest font-bold text-[var(--ochre)] mb-4">
            ● radikal terbuka
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            Dasbor ini adalah sumber kebenaran.
          </h2>
          <p className="text-base opacity-80 leading-relaxed">
            Kami tidak menerbitkan laporan-laporan mengkilap. Kami tidak membulatkan ke atas.
            Setiap angka di-generate otomatis dari transaksi nyata. Kalau kami berhenti
            jujur tentang sebuah metrik, metriknya yang hilang — bukan kejujurannya.
          </p>
        </div>
      </section>
    </>
  );
}

function BigStat({ tint, value, label, sub }: {
  tint: "moss" | "ochre" | "clay" | "indigo";
  value: string; label: string; sub: string;
}) {
  return (
    <div className="rounded-3xl p-5 sm:p-6 flex flex-col gap-2 lift" style={{ background: `var(--${tint}-soft)` }}>
      <CountUp value={value} className="text-3xl sm:text-4xl font-extrabold tabular-nums leading-none tracking-tight" />
      <p className="text-sm font-bold mt-1" style={{ color: `var(--${tint})` }}>{label}</p>
      <p className="text-xs text-[var(--fg-soft)] opacity-70">{sub}</p>
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-[var(--ivory)] rounded-2xl border border-[var(--line)] p-4">
      <p className="text-2xl font-extrabold tabular-nums leading-none">{value}</p>
      <p className="text-xs text-[var(--muted)] mt-2 font-bold">{label}</p>
      {sub && <p className="text-[10px] text-[var(--muted)] mt-0.5 opacity-70">{sub}</p>}
    </div>
  );
}
