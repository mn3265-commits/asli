import { Code, Terminal, FileCode, Workflow } from "lucide-react";

export const metadata = {
  title: "Open DPID Spec — Asli",
};

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

const CURL_EXAMPLE = `# Resolve a DPID to its full record
curl https://api.asli.id/v1/dpid/ASLI-GYO-2026-K048

# Mint a new DPID (exporters/coops only)
curl -X POST https://api.asli.id/v1/dpid \\
  -H "Authorization: Bearer \$ASLI_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d @batch.json

# Stream the satellite imagery of a farmer's plot
curl https://api.asli.id/v1/farmer/karim-aceh/satellite \\
  -o farm.jpg`;

const JS_EXAMPLE = `import { Asli } from "@asli/sdk";

const asli = new Asli({ apiKey: process.env.ASLI_TOKEN });

// Resolve any DPID to its full provenance record
const record = await asli.dpid.get("ASLI-GYO-2026-K048");
console.log(record.farmer.name);         // "Pak Karim Yusuf"
console.log(record.batch.farmer_share_pct); // 68
console.log(record.carbon.co2_per_kg_grams); // -1240 (net-removed)

// Generate a fresh QR code for a batch
const qr = await asli.dpid.qr("ASLI-GYO-2026-K048", { format: "svg" });`;

export default function SpecPage() {
  return (
    <>
      {/* HERO */}
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-14">
          <span className="chip mb-6">📜 Open spec · v1.0</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
            One QR.
            <br />
            <span className="text-[var(--moss)]">Any commodity.</span>
            <br />
            <span className="text-[var(--ochre)]">Open standard.</span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            The Digital Product ID (DPID) is a public specification. Any
            cooperative, exporter, brand, or buyer can read or write DPIDs —
            with or without Asli&apos;s platform. We&apos;re infrastructure,
            not gatekeeper.
          </p>
          <p className="text-sm text-[var(--muted)] mt-6 font-mono">
            DPID v1.0 · MIT licensed · ratified 2026-05
          </p>
        </div>
      </section>

      {/* 4 PRINCIPLES */}
      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="text-3xl font-extrabold mb-8">Four principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Principle
              tint="moss"
              num="01"
              title="Farmer-first"
              body="Every DPID names the person, not the corporation. The farmer field is required."
            />
            <Principle
              tint="ochre"
              num="02"
              title="Verifiable"
              body="Satellite-anchored origin. Public ledger of mints. Anyone can audit."
            />
            <Principle
              tint="clay"
              num="03"
              title="Carbon-aware"
              body="Every batch carries a CO₂ balance. Net-negative practices visible by default."
            />
            <Principle
              tint="indigo"
              num="04"
              title="Open"
              body="MIT-licensed schema. No vendor lock-in. Build your own resolver if you want."
            />
          </div>
        </div>
      </section>

      {/* SCHEMA */}
      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-2 mb-3">
            <FileCode size={20} className="text-[var(--indigo)]" />
            <h2 className="text-3xl font-extrabold">DPID Record schema</h2>
          </div>
          <p className="text-[var(--fg-soft)] mb-6 max-w-2xl leading-relaxed">
            A DPID resolves to a JSON record like this. Every field is
            optional except <code className="font-mono text-sm">dpid</code>,{" "}
            <code className="font-mono text-sm">farmer</code>, and{" "}
            <code className="font-mono text-sm">plot</code>.
          </p>
          <pre className="bg-[var(--fg)] text-[#86c587] p-5 sm:p-7 rounded-3xl overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
            <code>{SCHEMA_EXAMPLE}</code>
          </pre>
        </div>
      </section>

      {/* API EXAMPLES */}
      <section className="bg-[var(--bg-deep)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={20} className="text-[var(--ochre)]" />
            <h2 className="text-3xl font-extrabold">Quick start</h2>
          </div>
          <p className="text-[var(--fg-soft)] mb-8 max-w-2xl leading-relaxed">
            Three endpoints handle 90% of use cases. SDK auto-generated for
            JavaScript, Python, Go, Ruby — or just curl.
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

      {/* ENDPOINTS TABLE */}
      <section className="paper">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
          <div className="flex items-center gap-2 mb-6">
            <Workflow size={20} className="text-[var(--moss)]" />
            <h2 className="text-3xl font-extrabold">Endpoints</h2>
          </div>
          <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] overflow-hidden divide-y divide-[var(--line)] text-sm">
            <Endpoint
              method="GET"
              path="/v1/dpid/:id"
              auth="public"
              desc="Resolve a DPID to its full provenance record"
            />
            <Endpoint
              method="POST"
              path="/v1/dpid"
              auth="bearer"
              desc="Mint a new DPID for a batch (coops/exporters only)"
            />
            <Endpoint
              method="GET"
              path="/v1/farmer/:slug"
              auth="public"
              desc="Get farmer profile, voice memo, recent batches"
            />
            <Endpoint
              method="GET"
              path="/v1/farmer/:slug/satellite"
              auth="public"
              desc="Latest Sentinel-2 imagery + EUDR proof"
            />
            <Endpoint
              method="POST"
              path="/v1/tip"
              auth="user"
              desc="Send a direct tip to a farmer (passes through 100%)"
            />
            <Endpoint
              method="POST"
              path="/v1/preorder"
              auth="user"
              desc="Reserve a farmer's next harvest at locked price"
            />
            <Endpoint
              method="GET"
              path="/v1/impact"
              auth="public"
              desc="Network-wide aggregate impact metrics"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--fg)] text-[var(--ivory)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center flex flex-col items-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Build on Asli. Or fork it.
          </h2>
          <p className="text-base opacity-80 max-w-xl leading-relaxed">
            DPID is MIT-licensed. The reference resolver is open source. If
            you can route a payment, you can issue DPIDs. The point is the
            spec, not us.
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="#"
              className="px-6 py-3 rounded-full bg-[var(--ochre)] text-[var(--fg)] font-bold tap"
            >
              GitHub · @asli-id/spec
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-full bg-transparent text-[var(--ivory)] border border-[var(--ivory)]/30 font-bold tap"
            >
              Get an API key
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Principle({
  tint,
  num,
  title,
  body,
}: {
  tint: "moss" | "ochre" | "clay" | "indigo";
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm"
          style={{
            background: `var(--${tint}-soft)`,
            color: `var(--${tint})`,
          }}
        >
          {num}
        </div>
      </div>
      <h3 className="text-base font-extrabold leading-tight">{title}</h3>
      <p className="text-sm text-[var(--fg-soft)] leading-relaxed">{body}</p>
    </div>
  );
}

function Endpoint({
  method,
  path,
  auth,
  desc,
}: {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  auth: string;
  desc: string;
}) {
  const methodColor =
    method === "GET"
      ? "var(--moss)"
      : method === "POST"
        ? "var(--ochre)"
        : "var(--clay)";
  return (
    <div className="grid grid-cols-12 gap-3 px-5 py-4 items-center">
      <span
        className="col-span-2 sm:col-span-1 font-mono font-extrabold text-xs"
        style={{ color: methodColor }}
      >
        {method}
      </span>
      <code className="col-span-10 sm:col-span-5 font-mono text-xs sm:text-sm text-[var(--fg)] truncate">
        {path}
      </code>
      <span className="col-span-3 sm:col-span-2 text-[10px] uppercase tracking-wider font-bold text-[var(--muted)]">
        {auth}
      </span>
      <span className="col-span-9 sm:col-span-4 text-xs text-[var(--fg-soft)]">
        {desc}
      </span>
    </div>
  );
}
