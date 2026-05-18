import { Code, Terminal, FileCode, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata = { title: "Spec DPID Terbuka — Asli" };

const SCHEMA_EXAMPLE = `{
  "dpid": "ASLI-GYO-2026-K048",
  "version": "1.0",
  "issued_at": "2026-04-12T07:14:00Z",
  "commodity": {
    "type": "coffee",
    "variety": "arabica",
    "grade": "SCA-Q86",
    "process": "wet-hulled"
  },
  "farmer": {
    "id": "karim-aceh",
    "name": "Pak Karim Yusuf",
    "village": "Lampegajah",
    "region": "Aceh Tengah",
    "island": "Sumatra",
    "voice_url": "https://asli.id/voice/karim-aceh-001"
  },
  "plot": {
    "lat": 4.6248,
    "lng": 96.8347,
    "hectares": 1.3,
    "satellite_verified_at": "2026-04-10T00:00:00Z",
    "deforestation_baseline": "2018-01-01",
    "eudr_compliant": true
  },
  "batch": {
    "weight_kg": 24,
    "harvested_at": "2026-04-12",
    "price_per_kg_usd": 18.4,
    "farmer_share_pct": 68
  },
  "carbon": {
    "co2_per_kg_grams": -1240,
    "method": "satellite_biodiversity_index_v2"
  },
  "certs": ["SCA Q-grade 86", "USDA Organic"],
  "signature": "0xa3f4...c91d"
}`;

const CURL_EXAMPLE = `# Resolve DPID ke catatan lengkap
curl https://api.asli.id/v1/dpid/ASLI-GYO-2026-K048

# Cetak DPID baru (khusus eksportir/koperasi)
curl -X POST https://api.asli.id/v1/dpid \\
  -H "Authorization: Bearer \$ASLI_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d @batch.json

# Stream citra satelit lahan petani
curl https://api.asli.id/v1/farmer/karim-aceh/satellite \\
  -o farm.jpg`;

const JS_EXAMPLE = `import { Asli } from "@asli/sdk";

const asli = new Asli({ apiKey: process.env.ASLI_TOKEN });

// Resolve DPID mana saja ke catatan provenance penuh
const record = await asli.dpid.get("ASLI-GYO-2026-K048");
console.log(record.farmer.name);
console.log(record.batch.farmer_share_pct);
console.log(record.carbon.co2_per_kg_grams);

// Generate QR baru untuk batch
const qr = await asli.dpid.qr("ASLI-GYO-2026-K048", { format: "svg" });`;

export default function SpecPageID() {
  return (
    <>
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-14">
          <span className="chip mb-6">📜 Spec terbuka · v1.0</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
            Satu QR.
            <br />
            <span className="text-[var(--moss)]">Komoditas apa saja.</span>
            <br />
            <span className="text-[var(--ochre)]">Standar terbuka.</span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            Digital Product ID (DPID) adalah spesifikasi publik. Koperasi,
            eksportir, brand, atau pembeli mana pun bisa membaca atau menulis
            DPID — dengan atau tanpa platform Asli. Kami infrastruktur, bukan penjaga gerbang.
          </p>
          <p className="text-sm text-[var(--muted)] mt-6 font-mono">
            DPID v1.0 · lisensi MIT · diratifikasi 2026-05
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="text-3xl font-extrabold mb-8">Empat prinsip</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Reveal delay={0}>
              <Principle tint="moss" num="01" title="Petani dulu" body="Setiap DPID menyebut nama orangnya, bukan perusahaan. Field farmer wajib." />
            </Reveal>
            <Reveal delay={120}>
              <Principle tint="ochre" num="02" title="Dapat diverifikasi" body="Asal-usul ditambatkan satelit. Buku mint publik. Siapa saja bisa audit." />
            </Reveal>
            <Reveal delay={240}>
              <Principle tint="clay" num="03" title="Sadar karbon" body="Setiap batch membawa saldo CO₂. Praktik net-negatif terlihat by default." />
            </Reveal>
            <Reveal delay={360}>
              <Principle tint="indigo" num="04" title="Terbuka" body="Skema lisensi MIT. Tidak ada vendor lock-in. Bangun resolver-mu sendiri jika mau." />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-2 mb-3">
            <FileCode size={20} className="text-[var(--indigo)]" />
            <h2 className="text-3xl font-extrabold">Skema catatan DPID</h2>
          </div>
          <p className="text-[var(--fg-soft)] mb-6 max-w-2xl leading-relaxed">
            DPID resolve ke catatan JSON seperti ini. Semua field opsional kecuali{" "}
            <code className="font-mono text-sm">dpid</code>,{" "}
            <code className="font-mono text-sm">farmer</code>, dan{" "}
            <code className="font-mono text-sm">plot</code>.
          </p>
          <pre className="bg-[var(--fg)] text-[#86c587] p-5 sm:p-7 rounded-3xl overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
            <code>{SCHEMA_EXAMPLE}</code>
          </pre>
        </div>
      </section>

      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={20} className="text-[var(--ochre)]" />
            <h2 className="text-3xl font-extrabold">Mulai cepat</h2>
          </div>
          <p className="text-[var(--fg-soft)] mb-8 max-w-2xl leading-relaxed">
            Tiga endpoint menangani 90% kasus penggunaan. SDK auto-generated untuk JavaScript, Python, Go, Ruby — atau pakai curl saja.
          </p>

          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--line)] text-sm font-bold">
              <Terminal size={14} />
              <span>cURL</span>
            </div>
            <pre className="p-5 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-[var(--fg-soft)] leading-relaxed">
              <code>{CURL_EXAMPLE}</code>
            </pre>
          </div>

          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--line)] text-sm font-bold">
              <Code size={14} />
              <span>JavaScript / TypeScript</span>
            </div>
            <pre className="p-5 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-[var(--fg-soft)] leading-relaxed">
              <code>{JS_EXAMPLE}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
          <div className="flex items-center gap-2 mb-6">
            <Workflow size={20} className="text-[var(--moss)]" />
            <h2 className="text-3xl font-extrabold">Endpoint</h2>
          </div>
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden divide-y divide-[var(--line)] text-sm">
            <Endpoint method="GET" path="/v1/dpid/:id" auth="publik" desc="Resolve DPID ke catatan provenance penuh" />
            <Endpoint method="POST" path="/v1/dpid" auth="bearer" desc="Cetak DPID baru untuk batch (khusus koperasi/eksportir)" />
            <Endpoint method="GET" path="/v1/farmer/:slug" auth="publik" desc="Profil petani, memo suara, batch terbaru" />
            <Endpoint method="GET" path="/v1/farmer/:slug/satellite" auth="publik" desc="Citra Sentinel-2 terbaru + bukti EUDR" />
            <Endpoint method="POST" path="/v1/tip" auth="user" desc="Kirim tip langsung ke petani (lewat 100%)" />
            <Endpoint method="POST" path="/v1/preorder" auth="user" desc="Reservasi panen petani berikutnya di harga terkunci" />
            <Endpoint method="GET" path="/v1/impact" auth="publik" desc="Metrik dampak agregat seluruh jaringan" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--fg)] text-[var(--ivory)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Bangun di atas Asli. Atau fork.
          </h2>
          <p className="text-base opacity-80 max-w-xl leading-relaxed">
            DPID berlisensi MIT. Reference resolver-nya open source. Kalau kamu
            bisa rute pembayaran, kamu bisa cetak DPID. Yang penting spec-nya, bukan kami.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="px-6 py-3 rounded-full bg-[var(--ochre)] text-[var(--fg)] font-bold tap">
              GitHub · @asli-id/spec
            </a>
            <a href="#" className="px-6 py-3 rounded-full bg-transparent text-[var(--ivory)] border border-[var(--ivory)]/30 font-bold tap">
              Minta API key
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Principle({ tint, num, title, body }: {
  tint: "moss" | "ochre" | "clay" | "indigo"; num: string; title: string; body: string;
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 flex flex-col gap-3 lift">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm"
          style={{ background: `var(--${tint}-soft)`, color: `var(--${tint})` }}>
          {num}
        </div>
      </div>
      <h3 className="text-base font-extrabold leading-tight">{title}</h3>
      <p className="text-sm text-[var(--fg-soft)] leading-relaxed">{body}</p>
    </div>
  );
}

function Endpoint({ method, path, auth, desc }: {
  method: "GET" | "POST" | "PATCH" | "DELETE"; path: string; auth: string; desc: string;
}) {
  const methodColor =
    method === "GET" ? "var(--moss)" : method === "POST" ? "var(--ochre)" : "var(--clay)";
  return (
    <div className="grid grid-cols-12 gap-3 px-5 py-4 items-center">
      <span className="col-span-2 sm:col-span-1 font-mono font-extrabold text-xs" style={{ color: methodColor }}>
        {method}
      </span>
      <code className="col-span-10 sm:col-span-5 font-mono text-xs sm:text-sm text-[var(--fg)] truncate">{path}</code>
      <span className="col-span-3 sm:col-span-2 text-[10px] uppercase tracking-wider font-bold text-[var(--muted)]">{auth}</span>
      <span className="col-span-9 sm:col-span-4 text-xs text-[var(--fg-soft)]">{desc}</span>
    </div>
  );
}
