import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

type Lang = "en" | "id";

type Source = {
  claim: string;
  source: string;
  url: string;
  note?: string;
};

const SOURCES_EN: { section: string; items: Source[] }[] = [
  {
    section: "Indonesia's commodity rank",
    items: [
      {
        claim: "Indonesia is the world's 2nd-largest coffee producer.",
        source: "USDA Foreign Agricultural Service, Coffee: World Markets and Trade (Dec 2024)",
        url: "https://www.fas.usda.gov/data/coffee-world-markets-and-trade",
        note: "Ranked behind Brazil; production estimate ~10.9 million 60-kg bags in MY 2024/25.",
      },
      {
        claim: "Indonesia is the world's 3rd-largest cocoa producer.",
        source: "ICCO Quarterly Bulletin of Cocoa Statistics, Vol. L No. 4 (2024)",
        url: "https://www.icco.org/statistics/",
        note: "Behind Côte d'Ivoire and Ghana.",
      },
      {
        claim: "Indonesia supplies ~80% of global patchouli essential oil.",
        source: "Indonesian Ministry of Trade + IFEAT industry estimates",
        url: "https://ifeat.org/socio-economic-reports/",
      },
      {
        claim: "Indonesia is the only meaningful global origin for nutmeg and mace at scale.",
        source: "FAOSTAT, Crops and livestock products (Maluku + North Maluku data)",
        url: "https://www.fao.org/faostat/",
        note: "Banda Islands historically the only nutmeg source pre-1850.",
      },
      {
        claim: "Indonesia exported ~USD 3.2B of coffee and cocoa in 2024.",
        source: "Statistics Indonesia (BPS), Foreign Trade Statistics, 2024",
        url: "https://www.bps.go.id/en/",
      },
    ],
  },
  {
    section: "Smallholder economics",
    items: [
      {
        claim: "Indonesian smallholder commodity farmers earn ~USD 2/day (range USD 1.50–4.00).",
        source: "IFAD Rural Development Report 2024; World Bank Indonesia Economic Quarterly",
        url: "https://www.ifad.org/en/rural-development-report",
        note: "Median figure varies by commodity, region, and harvest cycle. We use USD 2/day as the headline; the range is documented.",
      },
      {
        claim: "Farmer share of wholesale price averages ~22% for commodity exports.",
        source: "Fairtrade International, Cocoa Farmer Income Study (2023); Specialty Coffee Association annual price reports",
        url: "https://www.fairtrade.net/library",
        note: "Median calculated across coffee, cocoa, vanilla. Range is 16–34% depending on commodity, certification, and origin.",
      },
      {
        claim: "Indonesia has 4M+ smallholder commodity farmers.",
        source: "Ministry of Agriculture Republic of Indonesia, Agricultural Census 2023",
        url: "https://www.pertanian.go.id/",
      },
    ],
  },
  {
    section: "Regulation",
    items: [
      {
        claim: "EUDR (EU Regulation 2023/1115) requires plot-level traceability for cocoa, coffee, palm oil, rubber, soy, beef, and wood.",
        source: "European Commission, Regulation (EU) 2023/1115 on deforestation-free products",
        url: "https://eur-lex.europa.eu/eli/reg/2023/1115/oj",
        note: "Enforcement: 30 December 2025 (large operators) / 30 June 2026 (SMEs).",
      },
      {
        claim: "FSMA Section 204 (US FDA) requires lot-level food traceability records.",
        source: "US FDA, Food Traceability Final Rule (21 CFR 1.1310 et seq.)",
        url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods",
        note: "Enforcement: 20 January 2026.",
      },
    ],
  },
  {
    section: "Technology stack",
    items: [
      {
        claim: "Sentinel-2 provides 10 m ground resolution multispectral imagery every 5 days.",
        source: "European Space Agency, Copernicus Sentinel-2 mission documentation",
        url: "https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-2",
        note: "Imagery is open data under Copernicus license. Asli uses Esri ArcGIS World Imagery as a tile substitute in the public demo.",
      },
      {
        claim: "Claude is used for AI translation of farmer voice memos.",
        source: "Anthropic, Claude API (Haiku 4.5 for production translation)",
        url: "https://www.anthropic.com/claude",
      },
    ],
  },
  {
    section: "History",
    items: [
      {
        claim: "Treaty of Breda (1667) traded Pulau Run for New Amsterdam (now New York).",
        source: "Verenigde Oost-Indische Compagnie (VOC) archive; English Royal Society negotiations record",
        url: "https://en.wikipedia.org/wiki/Treaty_of_Breda_(1667)",
        note: "Signed 31 July 1667. Pulau Run, ~3 km², was the last English nutmeg-island holdout in the Banda Sea.",
      },
      {
        claim: "Pulau Run has ~380 active nutmeg farmer households today.",
        source: "Maluku Provincial Statistics Agency, 2023 village census of Banda Subdistrict",
        url: "https://maluku.bps.go.id/",
      },
    ],
  },
  {
    section: "Methodology disclosures",
    items: [
      {
        claim: "Carbon balance per batch uses IPCC emission factors + declared farm practice + canopy density.",
        source: "IPCC AR6 WGIII (Chapter 7 — Agriculture, Forestry, and Other Land Uses)",
        url: "https://www.ipcc.ch/report/ar6/wg3/",
      },
      {
        claim: "Farmer share % shown on each DPID is derived from the per-batch ledger field farmerSharePct.",
        source: "Asli platform data model (open spec at /spec)",
        url: "/spec",
        note: "Demo platform uses seeded data for 8 representative farmers. Production data would come from cooperative onboarding.",
      },
    ],
  },
];

const SOURCES_ID: { section: string; items: Source[] }[] = [
  {
    section: "Peringkat komoditas Indonesia",
    items: [
      {
        claim: "Indonesia adalah produsen kopi terbesar ke-2 dunia.",
        source: "USDA Foreign Agricultural Service, Coffee: World Markets and Trade (Des 2024)",
        url: "https://www.fas.usda.gov/data/coffee-world-markets-and-trade",
        note: "Di belakang Brasil; estimasi produksi ~10,9 juta karung 60-kg di MY 2024/25.",
      },
      {
        claim: "Indonesia adalah produsen kakao terbesar ke-3 dunia.",
        source: "ICCO Quarterly Bulletin of Cocoa Statistics, Vol. L No. 4 (2024)",
        url: "https://www.icco.org/statistics/",
        note: "Di belakang Côte d'Ivoire dan Ghana.",
      },
      {
        claim: "Indonesia memasok ~80% minyak atsiri nilam global.",
        source: "Kementerian Perdagangan + estimasi industri IFEAT",
        url: "https://ifeat.org/socio-economic-reports/",
      },
      {
        claim: "Indonesia adalah satu-satunya asal global signifikan untuk pala dan fuli dalam skala.",
        source: "FAOSTAT, data Crops and livestock products (Maluku + Maluku Utara)",
        url: "https://www.fao.org/faostat/",
        note: "Kepulauan Banda secara historis satu-satunya sumber pala sebelum 1850.",
      },
      {
        claim: "Indonesia mengekspor ~USD 3,2 miliar kopi dan kakao di 2024.",
        source: "Badan Pusat Statistik (BPS), Statistik Perdagangan Luar Negeri, 2024",
        url: "https://www.bps.go.id/",
      },
    ],
  },
  {
    section: "Ekonomi petani kecil",
    items: [
      {
        claim: "Petani kecil komoditas Indonesia berpenghasilan ~USD 2/hari (rentang USD 1,50–4,00).",
        source: "IFAD Rural Development Report 2024; World Bank Indonesia Economic Quarterly",
        url: "https://www.ifad.org/en/rural-development-report",
        note: "Angka median bervariasi per komoditas, wilayah, dan siklus panen. Kami menggunakan USD 2/hari sebagai headline; rentangnya didokumentasikan.",
      },
      {
        claim: "Bagian petani dari harga grosir rata-rata ~22% untuk ekspor komoditas.",
        source: "Fairtrade International, Cocoa Farmer Income Study (2023); SCA annual price reports",
        url: "https://www.fairtrade.net/library",
        note: "Median dihitung lintas kopi, kakao, vanila. Rentang 16–34% tergantung komoditas, sertifikasi, dan asal.",
      },
      {
        claim: "Indonesia punya 4 juta+ petani kecil komoditas.",
        source: "Kementerian Pertanian RI, Sensus Pertanian 2023",
        url: "https://www.pertanian.go.id/",
      },
    ],
  },
  {
    section: "Regulasi",
    items: [
      {
        claim: "EUDR (Regulasi UE 2023/1115) mewajibkan traceability tingkat lahan untuk kakao, kopi, sawit, karet, kedelai, sapi, dan kayu.",
        source: "Komisi Eropa, Regulasi (UE) 2023/1115 produk bebas deforestasi",
        url: "https://eur-lex.europa.eu/eli/reg/2023/1115/oj",
        note: "Enforcement: 30 Desember 2025 (operator besar) / 30 Juni 2026 (UKM).",
      },
      {
        claim: "FSMA Bagian 204 (FDA Amerika) mewajibkan rekam jejak makanan tingkat lot.",
        source: "FDA Amerika, Food Traceability Final Rule (21 CFR 1.1310 dst.)",
        url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods",
        note: "Enforcement: 20 Januari 2026.",
      },
    ],
  },
  {
    section: "Stack teknologi",
    items: [
      {
        claim: "Sentinel-2 menyediakan citra multispektral resolusi 10 m setiap 5 hari.",
        source: "European Space Agency, dokumentasi misi Copernicus Sentinel-2",
        url: "https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-2",
        note: "Citra adalah open data di bawah lisensi Copernicus. Asli menggunakan Esri ArcGIS World Imagery sebagai tile substitusi di demo publik.",
      },
      {
        claim: "Claude digunakan untuk terjemahan AI voice memo petani.",
        source: "Anthropic, Claude API (Haiku 4.5 untuk terjemahan production)",
        url: "https://www.anthropic.com/claude",
      },
    ],
  },
  {
    section: "Sejarah",
    items: [
      {
        claim: "Perjanjian Breda (1667) menukar Pulau Run dengan New Amsterdam (sekarang New York).",
        source: "Arsip Verenigde Oost-Indische Compagnie (VOC); catatan negosiasi Royal Society Inggris",
        url: "https://en.wikipedia.org/wiki/Treaty_of_Breda_(1667)",
        note: "Ditandatangani 31 Juli 1667. Pulau Run, ~3 km², adalah pulau pala terakhir di tangan Inggris di Laut Banda.",
      },
      {
        claim: "Pulau Run hari ini memiliki ~380 rumah tangga petani pala aktif.",
        source: "BPS Provinsi Maluku, sensus desa Kecamatan Banda 2023",
        url: "https://maluku.bps.go.id/",
      },
    ],
  },
  {
    section: "Pengungkapan metodologi",
    items: [
      {
        claim: "Saldo karbon per batch menggunakan faktor emisi IPCC + praktik tani yang dideklarasikan + kepadatan kanopi.",
        source: "IPCC AR6 WGIII (Bab 7 — Pertanian, Kehutanan, dan Penggunaan Lahan Lain)",
        url: "https://www.ipcc.ch/report/ar6/wg3/",
      },
      {
        claim: "Persentase bagian petani di setiap DPID berasal dari field ledger per-batch farmerSharePct.",
        source: "Model data platform Asli (spec terbuka di /spec)",
        url: "/spec",
        note: "Platform demo menggunakan data seeded untuk 8 petani representatif. Data production akan datang dari onboarding koperasi.",
      },
    ],
  },
];

const T = {
  en: {
    eyebrow: "Sources",
    title: "Every number on this site, with a citation.",
    sub: "If you spot a stat we cannot back up, email hello@asli.id — we will either find the source or remove the claim.",
    back: "Back to Asli",
    source: "Source",
    note: "Note",
  },
  id: {
    eyebrow: "Sumber",
    title: "Setiap angka di situs ini, dengan sitasinya.",
    sub: "Kalau Anda menemukan statistik yang tidak bisa kami dukung, email hello@asli.id — kami akan mencari sumbernya atau menghapus klaimnya.",
    back: "Kembali ke Asli",
    source: "Sumber",
    note: "Catatan",
  },
};

export function SourcesContent({ lang }: { lang: Lang }) {
  const sources = lang === "id" ? SOURCES_ID : SOURCES_EN;
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
          <BookOpen size={20} />
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

      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28 space-y-10">
        {sources.map((group, gi) => (
          <div key={gi}>
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-[var(--clay)] mb-4">
              {group.section}
            </h2>
            <div className="space-y-3">
              {group.items.map((s, si) => (
                <article
                  key={si}
                  className="bg-[var(--ivory)] border border-[var(--line)] rounded-2xl p-5 sm:p-6"
                >
                  <p className="text-[15px] font-semibold text-[var(--fg)] leading-snug">
                    {s.claim}
                  </p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs">
                    <span className="text-[var(--muted)] uppercase tracking-widest font-bold">
                      {t.source}:
                    </span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--moss)] underline font-semibold hover:text-[var(--ochre)]"
                    >
                      {s.source}
                      <ExternalLink size={11} />
                    </a>
                  </div>
                  {s.note && (
                    <p className="mt-2 text-xs text-[var(--muted)] italic">
                      {t.note}: {s.note}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
