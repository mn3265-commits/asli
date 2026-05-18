import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

type Lang = "en" | "id";

type QA = { q: string; a: string | React.ReactNode };

const QA_EN: QA[] = [
  {
    q: "What is Asli, in one sentence?",
    a: "Asli is open infrastructure that lets Indonesian commodity exports carry the name, face, voice, and verified plot of the farmer who grew them — and the regulatory paperwork that comes with it.",
  },
  {
    q: "Who actually pays you?",
    a: "Exporters and importers, not farmers. The EU's EUDR (enforcement late 2025) and the US FDA's FSMA-204 (enforcement Jan 2026) make plot-level traceability a market-access requirement. Asli generates the due-diligence documents from the same data that powers the farmer-as-brand product. Fair farmer pay is a downstream effect of the compliance product, not a charity grant.",
  },
  {
    q: "What does \"satellite-verified\" actually verify?",
    a: "Land cover, not batch identity. Sentinel-2 imagery (free, 10 m resolution, every 5 days) tells us whether a registered plot was deforested, whether the canopy is consistent with shade-grown coffee or agroforestry cacao, and whether the polygon the cooperative declared exists. It cannot prove a specific bag of beans came from that plot — that part still rides on cooperative attestation. We say so on the homepage and the strategy memo.",
  },
  {
    q: "Is the AI translation trustworthy?",
    a: "We use Claude to translate farmer voice memos. Every voice card on Asli has a disclosure: the buyer is reading a faithful paraphrase, not a verbatim transcript. The original audio in the farmer's dialect is preserved and available on request. Translation drift is real; pretending otherwise would be the failure mode that ends our credibility.",
  },
  {
    q: "What's a DPID?",
    a: "Digital Product ID — a public, open-spec identifier that points to a single record containing the farmer's name and photo, the plot polygon, the harvest batch, satellite history, certifications, and audit trail. Anyone can mint one; anyone can read one. The spec is at /spec.",
  },
  {
    q: "Why open-source the spec? Doesn't that destroy your moat?",
    a: "Yes. Asli's defensibility is distribution and trust (which cooperatives we work with, which buyers route through us, which regulators recognize our paperwork), not protocol ownership. We're betting that open infrastructure compounds faster than closed silos in this market. If we're wrong, we lose — but if we're right, every Indonesian commodity exporter eventually uses the spec, and Asli is the largest network operator on it.",
  },
  {
    q: "What if a cooperative falsifies a farmer's identity or batch?",
    a: "It can happen and it's our biggest residual risk. Mitigations: random Sentinel-2 plot cross-checks; batch-level sample testing for vanilla/coffee adulteration; buyer-side reputation scoring; and the open audit trail in the DPID. None of this is a guarantee — it's a probabilistic trust layer, not a deterministic one.",
  },
  {
    q: "How does the carbon math work?",
    a: "We compute a per-batch CO₂ balance from declared farming practice (shade-grown, agroforestry, no-till), satellite-derived canopy density, and IPCC emission factors for processing and logistics. We publish balances. We do not sell \"carbon-neutral\" claims — the voluntary carbon market is in a credibility crisis and we are not contributing to it.",
  },
  {
    q: "How are farmers selected?",
    a: "Through cooperatives, not individually. A cooperative onboards 800–2,000 of its member farmers in one engagement, registers each plot, captures a portrait and 30-second voice memo, and signs the data-use agreement on behalf of its members. We need 6–10 good cooperatives to reach break-even, not 6,000 individual farmers.",
  },
  {
    q: "Why hasn't anyone done this before?",
    a: "Three pieces only became cheap recently: free 10 m satellite imagery (Sentinel-2 went fully operational in 2017), high-quality multilingual LLMs (Claude / GPT-class, 2024), and EUDR/FSMA-204 (2025–2026 enforcement). The combination is new even though each piece individually is not.",
  },
  {
    q: "How is this different from Tony's Chocolonely?",
    a: "Tony's is a vertically integrated CPG brand that owns the chocolate bar from cocoa to retail shelf. Asli is open infrastructure / a protocol — any commodity, any cooperative, any buyer. Different business model, different distribution, different exit. We borrow the moral seriousness; we do not borrow the org chart.",
  },
  {
    q: "Where are you in the journey?",
    a: "Pre-seed. Zero cooperatives signed, zero paying buyers, one person on the founding team. The Greater Good Challenge 2026 submission is in progress. Everything on this site is a working prototype and a published plan, not a track record. The strategy memo lists ten things we don't claim.",
  },
  {
    q: "How is the company funded?",
    a: "Currently bootstrapped. We are entering the Greater Good Challenge 2026; if we win the grant tier, that funds the first cooperative onboarding cohort. A small seed round in late 2026 is the planned next step, conditional on signed cooperative LOIs.",
  },
  {
    q: "How can I help?",
    a: (
      <>
        Three concrete asks: (1) if you run or have ties to an Indonesian
        commodity cooperative, email{" "}
        <a className="underline" href="mailto:hello@asli.id">
          hello@asli.id
        </a>{" "}
        — we are looking for the first 6 partners. (2) If you are a roastery,
        chocolatier, or essential-oil house in Europe or North America with
        EUDR/FSMA exposure, we want to talk. (3) If you write about impact
        infrastructure or fair-trade markets, our strategy memo is at{" "}
        <Link className="underline" href="/strategy">
          /strategy
        </Link>{" "}
        with citations at{" "}
        <Link className="underline" href="/sources">
          /sources
        </Link>
        .
      </>
    ),
  },
];

const QA_ID: QA[] = [
  {
    q: "Apa itu Asli, dalam satu kalimat?",
    a: "Asli adalah infrastruktur terbuka yang memungkinkan ekspor komoditas Indonesia membawa nama, wajah, suara, dan koordinat lahan terverifikasi dari petani yang menanamnya — beserta dokumen regulasi yang menyertainya.",
  },
  {
    q: "Siapa yang sebenarnya membayar kami?",
    a: "Eksportir dan importir, bukan petani. EUDR Uni Eropa (enforcement akhir 2025) dan FDA FSMA-204 Amerika (enforcement Januari 2026) menjadikan traceability tingkat lahan sebagai syarat akses pasar. Asli menghasilkan dokumen due-diligence dari data yang sama yang menggerakkan produk petani-sebagai-brand. Upah petani yang adil adalah efek hilir dari produk compliance, bukan hibah amal.",
  },
  {
    q: "Apa yang sebenarnya diverifikasi oleh \"satelit\"?",
    a: "Tutupan lahan, bukan identitas batch. Citra Sentinel-2 (gratis, resolusi 10 m, setiap 5 hari) memberi tahu apakah lahan terdaftar mengalami deforestasi, apakah kanopinya konsisten dengan kopi shade-grown atau kakao agroforestri, dan apakah poligon yang dideklarasikan koperasi memang ada. Ia tidak bisa membuktikan bahwa karung tertentu berasal dari lahan tersebut — bagian itu masih bergantung pada atestasi koperasi. Kami menyatakan ini di homepage dan memo strategi.",
  },
  {
    q: "Apakah terjemahan AI bisa dipercaya?",
    a: "Kami menggunakan Claude untuk menerjemahkan voice memo petani. Setiap voice card di Asli memuat pemberitahuan: pembeli membaca parafrase yang setia, bukan transkrip kata-per-kata. Audio asli dalam dialek petani disimpan dan tersedia atas permintaan. Drift terjemahan itu nyata; berpura-pura sebaliknya adalah mode kegagalan yang akan mengakhiri kredibilitas kami.",
  },
  {
    q: "Apa itu DPID?",
    a: "Digital Product ID — pengenal publik dengan spec terbuka yang menunjuk ke satu rekaman berisi nama dan foto petani, poligon lahan, batch panen, riwayat satelit, sertifikasi, dan jejak audit. Siapa pun bisa membuatnya; siapa pun bisa membacanya. Spec ada di /spec.",
  },
  {
    q: "Kenapa spec dibuat open-source? Bukankah itu menghancurkan moat?",
    a: "Ya. Ketahanan Asli adalah distribusi dan kepercayaan (koperasi mana yang bekerja dengan kami, pembeli mana yang routing lewat kami, regulator mana yang mengakui dokumen kami), bukan kepemilikan protokol. Kami bertaruh infrastruktur terbuka bertumbuh lebih cepat dari silo tertutup di pasar ini. Kalau kami salah, kami kalah — tapi kalau kami benar, setiap eksportir komoditas Indonesia pada akhirnya menggunakan spec ini, dan Asli adalah operator jaringan terbesar di atasnya.",
  },
  {
    q: "Bagaimana kalau koperasi memalsukan identitas petani atau batch?",
    a: "Bisa terjadi dan itu risiko residual terbesar kami. Mitigasi: cross-check satelit Sentinel-2 acak; sample testing tingkat batch untuk adulterasi vanila/kopi; reputation scoring sisi pembeli; dan jejak audit terbuka di DPID. Tidak ada satupun yang memberi jaminan — ini lapisan kepercayaan probabilistik, bukan deterministik.",
  },
  {
    q: "Bagaimana matematika karbonnya bekerja?",
    a: "Kami menghitung saldo CO₂ per batch dari praktik bertani yang dideklarasikan (shade-grown, agroforestri, no-till), kepadatan kanopi yang diturunkan dari satelit, dan faktor emisi IPCC untuk pengolahan dan logistik. Kami mempublikasikan saldonya. Kami tidak menjual klaim \"carbon-neutral\" — pasar karbon sukarela sedang dalam krisis kredibilitas dan kami tidak ikut menambah masalahnya.",
  },
  {
    q: "Bagaimana petani dipilih?",
    a: "Lewat koperasi, bukan individual. Satu koperasi onboard 800–2,000 petani anggotanya dalam satu engagement, mendaftarkan setiap lahan, menangkap potret dan voice memo 30-detik, dan menandatangani data-use agreement atas nama anggotanya. Kami butuh 6–10 koperasi yang baik untuk mencapai break-even, bukan 6,000 petani individual.",
  },
  {
    q: "Kenapa belum ada yang melakukan ini sebelumnya?",
    a: "Tiga potongan baru menjadi murah belakangan ini: citra satelit 10 m gratis (Sentinel-2 fully operational 2017), LLM multilingual berkualitas tinggi (Claude / kelas GPT, 2024), dan EUDR/FSMA-204 (enforcement 2025–2026). Kombinasinya baru meskipun masing-masing potongan secara individual tidak.",
  },
  {
    q: "Apa bedanya dengan Tony's Chocolonely?",
    a: "Tony's adalah brand CPG terintegrasi vertikal yang memiliki chocolate bar dari kakao sampai rak retail. Asli adalah infrastruktur terbuka / sebuah protokol — komoditas apa pun, koperasi mana pun, pembeli mana pun. Model bisnis berbeda, distribusi berbeda, exit berbeda. Kami meminjam keseriusan moralnya; kami tidak meminjam org chart-nya.",
  },
  {
    q: "Di mana posisi kalian sekarang?",
    a: "Pre-seed. Nol koperasi yang ditandatangani, nol pembeli yang membayar, satu orang di tim pendiri. Submission Greater Good Challenge 2026 sedang berlangsung. Semua yang ada di situs ini adalah prototype yang berfungsi dan rencana yang dipublikasikan, bukan track record. Memo strategi mendaftar sepuluh hal yang tidak kami klaim.",
  },
  {
    q: "Bagaimana perusahaan didanai?",
    a: "Saat ini bootstrapped. Kami masuk ke Greater Good Challenge 2026; kalau kami menang tier grant, itu mendanai cohort onboarding koperasi pertama. Seed round kecil di akhir 2026 adalah langkah berikutnya yang direncanakan, bersyarat pada LOI koperasi yang ditandatangani.",
  },
  {
    q: "Bagaimana saya bisa membantu?",
    a: (
      <>
        Tiga permintaan konkret: (1) kalau Anda menjalankan atau punya koneksi
        ke koperasi komoditas Indonesia, email{" "}
        <a className="underline" href="mailto:hello@asli.id">
          hello@asli.id
        </a>{" "}
        — kami mencari 6 mitra pertama. (2) Kalau Anda adalah roastery,
        chocolatier, atau essential-oil house di Eropa atau Amerika Utara
        dengan eksposur EUDR/FSMA, kami ingin bicara. (3) Kalau Anda menulis
        tentang infrastruktur impact atau pasar fair-trade, memo strategi kami
        di{" "}
        <Link className="underline" href="/id/strategy">
          /id/strategy
        </Link>{" "}
        dengan sitasi di{" "}
        <Link className="underline" href="/id/sources">
          /id/sources
        </Link>
        .
      </>
    ),
  },
];

const T = {
  en: {
    eyebrow: "Frequently asked",
    title: "Questions, asked and answered.",
    sub: "If a question isn't here that should be, email hello@asli.id and we'll add it.",
    back: "Back to Asli",
    contact: "Have another question? ",
    contactLink: "hello@asli.id",
  },
  id: {
    eyebrow: "Sering ditanya",
    title: "Pertanyaan, ditanya dan dijawab.",
    sub: "Kalau ada pertanyaan yang seharusnya di sini tapi tidak ada, email hello@asli.id dan akan kami tambah.",
    back: "Kembali ke Asli",
    contact: "Punya pertanyaan lain? ",
    contactLink: "hello@asli.id",
  },
};

export function FAQContent({ lang }: { lang: Lang }) {
  const qa = lang === "id" ? QA_ID : QA_EN;
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
          <HelpCircle size={20} />
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
        <ol className="space-y-4 sm:space-y-5">
          {qa.map((item, i) => (
            <li
              key={i}
              className="bg-[var(--ivory)] border border-[var(--line)] rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--moss-soft)] text-[var(--moss)] text-xs font-extrabold flex items-center justify-center tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--fg)] leading-snug">
                    {item.q}
                  </h2>
                  <div className="mt-2 text-[15px] text-[var(--fg-soft)] leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center text-sm text-[var(--muted)]">
          {t.contact}
          <a href="mailto:hello@asli.id" className="underline font-semibold text-[var(--moss)]">
            {t.contactLink}
          </a>
        </div>
      </section>
    </main>
  );
}
