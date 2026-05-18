# Asli: Selling Indonesia's Commodities by Name

### How a digital trust layer can unlock premium markets for the world's most invisible farmers

*A strategic case study*
*Mei 2026*

---

## The Idea in Brief

> **The Problem.**
> Indonesia is the world's second-largest coffee producer, third-largest cocoa producer, and the historic origin of the global spice trade. Yet the smallholder farmers who grow these commodities capture a median of 22% of the wholesale price and are functionally anonymous to the buyers who consume their work. Existing traceability platforms describe regions; none describe people.
>
> **The Insight.**
> The unit of trust in commodity exports has always been the *brand*. We propose inverting it: the unit of trust becomes the *farmer*. Every kilo of Indonesian commodity shipped abroad should carry a Digital Product ID (DPID) — a single QR that resolves to one named person, one satellite-verified plot, one carbon ledger, and one transparent share of the wholesale price.
>
> **The Bet.**
> Premium buyers in Europe, North America, and East Asia will pay a defensible 15–30% premium for commodities that come with verifiable, personal provenance — particularly under the EU Deforestation Regulation (EUDR) taking full effect in 2026. The farmer captures most of that premium. The platform captures a 4% transaction fee. Everyone else (cooperative, logistics, retailer) is paid visibly.

---

## I. Why Indonesia, why now

Indonesia produces commodities the world cannot replace. It supplies roughly **8% of global coffee**, **17% of global cocoa**, **80% of global patchouli essential oil**, and remains the only meaningful origin of nutmeg and mace at scale — a 500-year-old supply line that helped fund the Dutch East India Company. The country exported an estimated **USD 3.2 billion of coffee and cocoa alone in 2024**.

And yet — by every available study — the typical Indonesian smallholder commodity farmer earns roughly **USD 2 a day** (with reported ranges of USD 1.50 to USD 4.00 across commodities and regions). A coffee farmer in Aceh Tengah and a coffee farmer in Antioquia, Colombia produce roughly comparable cup quality. The Colombian captures four to six times more of the retail price.

Three forces are converging in 2026 that make this an unusually good moment to act:

1. **EUDR (EU Deforestation Regulation)** takes full enforcement effect in December 2025 for "operator" companies and June 2026 for SMEs. Any cocoa, coffee, palm oil, rubber, soy, beef, or wood imported into the EU must be traceable to a specific geolocated plot of land and proven not to have caused deforestation since December 2020. **Compliance has become a market access requirement, not a marketing claim.** Indonesian exporters who cannot prove plot-level traceability lose the EU market.

2. **Commodity authenticity scandals** — the 2023 vanilla adulteration crisis, the recurring olive oil substitution scandals, and the steady investor pressure for verified ESG metrics — have made **provenance worth paying for** in a way it was not five years ago. The premium for "single-origin, named-farmer" coffee is no longer ideological. It is measurable.

3. **The cost of provenance has collapsed.** Sentinel-2 satellite imagery is free. Large language models can translate a farmer's dialect into 30 buyer languages for less than a cent per request. Generative voice cloning can preserve a farmer's timbre at scale. Five years ago the infrastructure to do what Asli does would have cost millions. Today it costs hundreds of dollars per month.

The convergence is the opportunity. Indonesian commodities are valuable, traceability is mandatory, and the technology is suddenly affordable. The market is not waiting.

---

## II. The thesis: invert the unit of trust

Most ethical commodity brands position themselves as a benevolent intermediary. The buyer trusts *the brand*; the brand vouches for the farmer; the farmer is rendered as a character in the brand's narrative. This model has produced real progress — but it has structural ceilings.

The ceiling is that the farmer remains a *story* told by the brand. The story is one-directional. The farmer cannot directly receive a buyer's gratitude or money. The brand owns the relationship; the brand owns the margin. When the brand pivots, the farmer is unprotected. We have decades of evidence that this model improves farmer outcomes more slowly than the urgency requires.

**The Asli thesis is to invert the unit of trust.** Every Asli product is sold not as our coffee but as *Pak Karim Yusuf's coffee, from Lampegajah village in Aceh Tengah, processed by Koperasi Gayo Sejahtera.* Pak Karim's name is larger on the packaging than Asli's. The DPID resolves to his page, not ours. The voice memo on the page is his, in his own dialect, AI-translated. The bank account credited at purchase is his. The tip jar deposits to him directly with zero platform fee.

This is more than positioning. It rewires the unit of marketing — and therefore the unit of pricing power. **A faceless commodity competes on price. A named individual competes on relationship.**

> *Asli is to commodity exports what Etsy was to home crafts: a marketplace whose central design choice is that the maker is the brand.*

---

## III. The technology stack

Four open technologies combine in every DPID. None of them are individually novel. The combination is.

### Layer 1 — Satellite-verified origin

Every farmer's plot is registered as a polygon of GPS coordinates. The platform pulls **Sentinel-2 imagery from the European Space Agency's Copernicus programme every five days** — the satellite has a 10-meter ground resolution, which is sufficient to see individual smallholder plots and to detect forest-cover change.

This solves two problems simultaneously:

- **Buyer trust.** A QR code that resolves to "this farm, this week, from space" is qualitatively different from a paper certificate. It is, in a real sense, unforgeable.
- **EUDR compliance.** The EU's deforestation regulation requires plot-level geolocation and proof of no forest loss since December 2020. Asli generates the due-diligence statement automatically from satellite data. **EUDR compliance becomes a free byproduct of the buyer experience, not a separate workflow.**

Cost to platform: effectively zero. Sentinel-2 is open public infrastructure.

### Layer 2 — AI farmer voice

The farmer records a 30-second voice memo in their native language or dialect — Acehnese, Toraja, Manado Malay, Sundanese, Papuan Indonesian, etc. A large language model transcribes the memo and translates it. A voice-cloning model resynthesizes the translated text in the buyer's language **while preserving the timbre and emotional cadence of the original speaker.**

The buyer hears Pak Karim, in English, telling them about his grandmother's coffee trees. The voice is identifiably his. The words are in the listener's language.

This solves the historical chicken-and-egg of farmer storytelling: farmers do not speak the buyer's language, and brand-written stories are obviously brand-written. AI-mediated voice closes the gap without flattening it.

### Layer 3 — Carbon ledger per kilo

Every batch carries a CO₂ balance, calculated as the difference between the satellite-derived biodiversity index of the plot, the farmer's declared practices (shade-grown coffee, agroforestry, no-till), and the IPCC emission factors for processing and logistics.

Many smallholder Indonesian commodities — particularly shade-grown coffee, agroforestry cacao, and wild forest honey — are **net-negative carbon**. The carbon ledger is, in our farms' case, often a *credit* on the buyer's side of the ledger. Asli enables buyers to retire that offset at checkout, alongside their purchase, as a single transaction.

### Layer 4 — Open DPID specification

The DPID schema is **MIT-licensed**. Any cooperative, exporter, or buyer can mint or read DPIDs, with or without Asli as a counterparty. The platform's defensibility comes not from a closed standard but from being the reference implementation, payment processor, and best-known network of farmers and buyers.

This is the Stripe pattern applied to fair trade. The protocol is open. The reliability of the network is the product.

---

## IV. The business model

Asli charges:

- **USD 0.04 per DPID minted** to the cooperative or exporter (after the first 100, which are free during onboarding).
- **4% transaction fee** on commodity sales settled through the platform — paid by the buyer, transparently shown on the DPID page.
- **Zero fee on direct tips and pre-orders.** 100% of these pass through to the farmer; payment processor fees are absorbed by Asli as a customer-acquisition cost.
- **Future:** a *Verified by Asli* badge license for brands that source >50% of their commodity through Asli DPIDs. (Akin to Fair Trade certification, but tied to live data, not paper audits.)

We estimate the **average revenue per active farmer at USD 28–42 per year** in steady state — derived from minting volume plus transaction fees on their typical annual harvest. The platform reaches break-even at approximately **3,500 active farmers**. Indonesia has more than four million smallholder commodity farmers; we need roughly one in a thousand.

For context: a single mid-sized Indonesian coffee cooperative routinely services 800–2,000 farmers. Six well-onboarded coops put us into profitability.

---

## V. Why this isn't another traceability startup

Traceability is a crowded space. Existing entrants include IBM Food Trust, Provenance, AgriDigital, GrainChain, and the implicit traceability sold by every large commodity trader (Olam, Cargill, ED&F Man) at premium grades. We are aware of the noise.

Asli's defensibility is not the *traceability claim*. It is the **combination of four design choices** that we believe no incumbent will make:

| Design choice | Incumbents | Asli |
|---|---|---|
| Whose name is on the package? | The brand's | The farmer's |
| Whose bank account receives payment? | The brand's, on the farmer's behalf | The farmer's, directly |
| Is the standard open? | No (proprietary) | Yes (MIT) |
| Is the buyer-to-farmer payment one-way? | Yes | No — tips and pre-orders flow back |

These are not technical choices. They are commitments. An IBM or an Olam *could* implement any one of them tomorrow. They will not implement all four because doing so requires giving up the most valuable corner of their existing business: ownership of the buyer relationship.

This is the **innovator's dilemma applied to commodity supply chains.** We do not have a buyer relationship to protect. The farmer is our customer.

---

## VI. Risks and what could kill us

A strategic memo that does not name its existential risks is not honest. We see four:

**1. Farmer onboarding velocity.** The platform's network effect depends on having enough named farmers across enough commodities that buyers feel they're shopping a real catalog, not a charity. Onboarding farmers in remote areas with limited connectivity is the single hardest operational problem we face. Our hedge is to onboard *cooperatives* rather than individual farmers — a single coop-level relationship adds 500–2,000 farmers at once.

**2. Payment infrastructure.** Indonesian rural banking is improving rapidly (BRI agen, e-wallets, BI-FAST) but is not yet uniform. A farmer in Kalimantan's interior may not have a bank account. Our solution is to integrate with Indonesian fintechs (Xendit, Midtrans, OVO) and to allow cash-out via local agent networks where digital fails. Pre-financing of harvests via Asli wallet helps farmers without breaking the model.

**3. Buyer willingness to pay the premium.** We assume premium buyers will pay 15–30% more for verified personal provenance. The risk is that the premium evaporates under economic pressure. Our hedge is the EUDR effect — a price premium becomes a *market access* requirement, not a discretionary one.

**4. The trust shock.** A single scandal — a farmer whose voice was synthesized without consent, a satellite verification that was wrong, a corrupt cooperative skimming farmer payments — could damage the platform irreparably. The mitigation is structural: open spec, public audit logs, irrevocable farmer consent for voice cloning, and conservative accounting (we under-promise CO₂ removed, we report platform errors publicly).

---

## VII. What success looks like in 18 months

By **December 2026**, we aim to demonstrate:

| Metric | Target |
|---|---|
| Active farmers on platform | 3,500 |
| Cooperatives onboarded | 6–10 |
| Commodities live | 8 (coffee, cocoa, nutmeg, clove, vanilla, wild honey, black pepper, patchouli) |
| Cumulative farmer income paid through platform | USD 2.4M |
| Average farmer share of wholesale | ≥ 60% (vs industry ~22%) |
| Carbon credits retired at checkout | 18,000 tonnes CO₂e |
| EUDR due-diligence statements generated | 10,000 |
| Average buyer NPS | ≥ 65 |

These targets are deliberately calibrated to be defensible at a *Greater Good Challenge* presentation in 2026 and a Series A in mid-2027.

---

## VIII. Why this matters beyond economics

We will conclude with a paragraph not normally found in a strategic memo, because the work is not normally found in a strategic memo.

Indonesia's smallholder commodity farmers grow products consumed by hundreds of millions of people every day. Most consumers in Berlin and Brooklyn and Tokyo will never meet any of them. The default state of this relationship is profound asymmetry: the farmer is essential, exhausted, and invisible; the buyer is privileged, distracted, and ignorant of the role they play in the farmer's life.

Asli is a wager that this asymmetry is **technologically obsolete.** A free satellite already watches the farmer's plot. A free language model can carry the farmer's voice. An open payment rail can deliver the buyer's payment, instantly, without skimming. We do not need new science. We need only the discipline to combine what already exists, on the side of the farmer.

If we are right, the cost of "knowing where your coffee comes from" falls to zero. If we are wrong, we have at least named — by name — every farmer we worked with.

That is, by itself, a kind of progress.

---

*Asli is in production at **[asli-id.vercel.app](https://asli-id.vercel.app)**. The platform supports 8 seeded farmers across Sumatra, Sulawesi, Maluku, Papua, Kalimantan, Flores, and Bali; six commodity categories; satellite imagery for every plot; an open DPID API specification; and a buyer dashboard for tracking provenance, tips, and pre-orders. The team is preparing to enter the Greater Good Challenge 2026.*

*Contact: hello@asli.id*
