# Asli

**Indonesian commodities, by name.**

Asli is a traceability platform for Indonesian commodity exports. Every kilo of coffee, spice, vanilla, honey, or cacao carries a **Digital Product ID (DPID)** — a QR code that resolves to a farmer's face, voice, satellite-verified plot, and live earnings.

We're building the digital trust layer for ethical Indonesian exports. Farmer-first. Satellite-verified. Open spec.

→ **Live:** [asli-id.vercel.app](https://asli-id.vercel.app)

---

## The thesis in one paragraph

Indonesia is the world's 3rd-largest cocoa producer, 2nd-largest coffee producer, and originator of the global spice trade. Yet smallholder farmers — the people who actually grow these commodities — capture roughly 22% of the value and remain anonymous to the buyers who consume their work. Existing "traceability" platforms tell stories about regions; Asli tells the story of a person. Every DPID names the farmer first, the brand second.

---

## What's novel

The DPID combines four open technologies in one primitive — none of these are new on their own, but no one has stacked them for commodity exports:

| Layer | Stack | Why it matters |
|---|---|---|
| **Satellite-verified origin** | ESA Copernicus / Sentinel-2 | Free public satellite. EUDR-compliant proof of no deforestation. Buyers see the actual farm from space. |
| **AI farmer voice** | Claude (Anthropic) + ElevenLabs (planned) | Farmer records 30 sec in their dialect. AI translates and resynthesizes in buyer's language, preserving timbre. |
| **Carbon ledger** | Biodiversity-index + practice survey | Every batch carries a CO₂ balance. Many of our farms are net-negative. Retire offsets at checkout. |
| **Open DPID spec** | MIT-licensed schema + API | The DPID standard is public. Any cooperative, exporter, or buyer can read/write — with or without us. |

The novelty is the **combination**, the **farmer-as-brand inversion**, and the **open-infrastructure positioning**.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing — bold manifesto, featured farmers, 4-tech novelty grid |
| `/farmers` | Browse — 8 seeded farmers across 6 Indonesian islands & 6 commodities |
| `/farmers/[slug]` | The DPID page — hero card, price-share breakdown, satellite map, AI voice card, tip jar, pre-order |
| `/how` | Manifesto — 3-party guide (farmer / coop / buyer) + 6-step lifecycle |
| `/impact` | Live dashboard — aggregate metrics, by-commodity breakdown, SDG alignment |
| `/spec` | Open DPID API docs — JSON schema, curl + JS examples, 7 endpoints |
| `/onboard` | Coop onboarding — 4-step wizard ending with a minted DPID |
| `/scan` | QR scanner — real camera + manual entry + sample DPIDs |
| `/dashboard` | Buyer dashboard — tips sent, pre-orders, recently viewed (localStorage demo) |

---

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript 5.9**
- **Tailwind v4**
- **Plus Jakarta Sans** (Headspace-style rounded geometric)
- **Lucide** icons
- **`@anthropic-ai/sdk`** for AI translation
- **Esri ArcGIS** public satellite tiles (Sentinel-2 in production)
- **Deployed on Vercel** at `asli-id.vercel.app`

Mock data lives in `lib/data.ts` — 8 farmers with real Indonesian coordinates so the satellite imagery on each profile is genuinely from their plot.

---

## Brand

| Color | Hex | Used for |
|---|---|---|
| Background cream | `#faf5e8` | Warm paper feel |
| Foreground | `#1f1810` | Warm near-black |
| Moss | `#2f5d3a` | Primary — rainforest |
| Ochre | `#d4831a` | Accent — Indonesian earth |
| Clay | `#b84a2f` | Secondary accent — terracotta |
| Indigo | `#2c3e6f` | Tertiary — Indonesian textile |

Visual language: warm cream paper, chunky offset shadows on hero cards, pill buttons, tinted pastel backgrounds per commodity.

---

## Run it locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

For AI voice translation:

```bash
ANTHROPIC_API_KEY=sk-ant-... pnpm dev
```

---

## Roadmap

**v1 — shipped** (current)
- ✅ 9 routes, design system, mock data, satellite tiles, AI voice mock, tip/preorder UI

**v2 — next**
- [ ] Postgres + Drizzle for real persistence
- [ ] Real Sentinel-2 fetches via Copernicus API (replacing Esri demo tiles)
- [ ] Real Claude voice translation pipeline
- [ ] DPID minting API (`POST /v1/dpid`)
- [ ] Payment rails (Xendit for IDR farmer payouts, Stripe for buyer checkout)
- [ ] Auth (coop dashboard + buyer accounts)

**v3 — competition+**
- [ ] Bahasa / English language toggle
- [ ] Native iOS scanner via Expo
- [ ] Farmer WhatsApp bot for status updates
- [ ] On-chain DPID anchoring for batches >$10k

---

## License

[MIT](./LICENSE) — both the platform source and the DPID specification. Fork it, study it, build on it.

---

## Built for the Greater Good Challenge 2026

By [@mn3265](https://github.com/mn3265). Strategic doc → [`ASLI_STRATEGY.md`](./ASLI_STRATEGY.md).
