"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building,
  User,
  MapPin,
  QrCode,
  Sparkles,
} from "lucide-react";
import { addOnboarded } from "@/lib/store";

type Lang = "en" | "id";

const STEP_LABELS = {
  en: ["Org", "Farmer", "Plot", "Mint"],
  id: ["Org", "Petani", "Lahan", "Cetak"],
};

const COMMODITIES = {
  en: ["Coffee", "Cacao", "Nutmeg", "Clove", "Vanilla", "Wild honey", "Black pepper", "Patchouli", "Other"],
  id: ["Kopi", "Kakao", "Pala", "Cengkeh", "Vanili", "Madu hutan", "Lada hitam", "Nilam", "Lainnya"],
};

const T = {
  en: {
    welcome: (org: string) => `Welcome to Asli, ${org || "the network"}.`,
    welcomeBody: (farmer: string, dpid: string) => <>{farmer || "Your first farmer"} is onboarded. DPID <code className="font-mono font-bold">{dpid}</code> is minted. Your QR codes are generating. We&apos;ll email you a kit within 5 minutes.</>,
    firstDPID: "Your first DPID",
    seeInList: "See in farmers list →",
    onboardAnother: "Onboard another",
    step0: { title: "Tell us about your organization", sub: "Coop, exporter, or brand — we onboard all.", orgName: "Organization name", orgPh: "e.g. Koperasi Gayo Sejahtera", kind: "Kind", coop: "Coop", exp: "Exporter", brand: "Brand" },
    step1: { title: "Add your first farmer", sub: "You can bulk-import the rest via CSV or WhatsApp later.", farmer: "Farmer name", farmerPh: "e.g. Pak Joko Susanto", village: "Village / Kampung", villagePh: "e.g. Pondok Bambu", commodity: "Primary commodity" },
    step2: { title: "Pin the plot", sub: "Sentinel-2 needs coordinates to fetch satellite imagery. We can also grab from a Google Maps link or geotagged photo.", lat: "Latitude", lng: "Longitude", hectares: "Plot size (hectares)", hint: "On submit, we'll pull baseline forest cover from Sentinel-2 (2018) and the latest imagery — generating an EUDR-compliant due-diligence statement automatically." },
    step3: { title: "Mint the first DPID", sub: "Review and confirm. We'll generate the QR codes after.", rowOrg: "Organization", rowKind: "Kind", rowFarmer: "Farmer", rowVillage: "Village", rowCommodity: "Commodity", rowPlot: "Plot", rowCoords: "Coordinates", rowDpid: "Generated DPID", hint: "The first DPID is on us. After that, $0.04 per mint — no subscription, no minimum. Buyer-facing pages are always free." },
    back: "Back", continue: "Continue", mint: "Mint DPID",
  },
  id: {
    welcome: (org: string) => `Selamat datang di Asli, ${org || "jaringan"}.`,
    welcomeBody: (farmer: string, dpid: string) => <>{farmer || "Petani pertamamu"} sudah ter-onboard. DPID <code className="font-mono font-bold">{dpid}</code> sudah dicetak. Kode QR-mu sedang di-generate. Kami kirim kit ke email dalam 5 menit.</>,
    firstDPID: "DPID pertamamu",
    seeInList: "Lihat di daftar petani →",
    onboardAnother: "Onboard lagi",
    step0: { title: "Ceritakan tentang organisasimu", sub: "Koperasi, eksportir, atau brand — semua kami onboard.", orgName: "Nama organisasi", orgPh: "cth. Koperasi Gayo Sejahtera", kind: "Jenis", coop: "Koperasi", exp: "Eksportir", brand: "Brand" },
    step1: { title: "Tambah petani pertama", sub: "Yang lain bisa di-import via CSV atau WhatsApp nanti.", farmer: "Nama petani", farmerPh: "cth. Pak Joko Susanto", village: "Desa / Kampung", villagePh: "cth. Pondok Bambu", commodity: "Komoditas utama" },
    step2: { title: "Pin lahan", sub: "Sentinel-2 butuh koordinat untuk tarik citra satelit. Bisa juga dari link Google Maps atau foto geotagged.", lat: "Lintang", lng: "Bujur", hectares: "Luas lahan (hektar)", hint: "Saat submit, kami tarik baseline tutupan hutan dari Sentinel-2 (2018) dan citra terbaru — pernyataan due-diligence EUDR di-generate otomatis." },
    step3: { title: "Cetak DPID pertama", sub: "Review dan konfirmasi. Kami generate kode QR setelahnya.", rowOrg: "Organisasi", rowKind: "Jenis", rowFarmer: "Petani", rowVillage: "Desa", rowCommodity: "Komoditas", rowPlot: "Lahan", rowCoords: "Koordinat", rowDpid: "DPID di-generate", hint: "DPID pertama gratis. Setelah itu $0.04 per mint — tidak ada langganan, tidak ada minimum. Halaman pembeli selalu gratis." },
    back: "Kembali", continue: "Lanjut", mint: "Cetak DPID",
  },
};

export function OnboardWizard({ lang = "en" }: { lang?: Lang } = {}) {
  const t = T[lang];
  const STEPS = STEP_LABELS[lang].map((label, i) => ({
    id: i,
    icon: [Building, User, MapPin, QrCode][i],
    label,
  }));
  const commodityList = COMMODITIES[lang];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [orgName, setOrgName] = useState("");
  const [orgKind, setOrgKind] = useState("coop");
  const [farmerName, setFarmerName] = useState("");
  const [village, setVillage] = useState("");
  const [commodity, setCommodity] = useState(commodityList[0]);
  const [hectares, setHectares] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const dpid = `ASLI-${commodity.slice(0, 3).toUpperCase()}-2026-${Math.random()
    .toString(36)
    .slice(2, 5)
    .toUpperCase()}`;

  if (done) {
    return (
      <div className="bg-[var(--moss-soft)] border-2 border-[var(--moss)] rounded-3xl p-8 sm:p-12 flex flex-col items-center text-center gap-5 chunky-shadow-soft">
        <CheckCircle2 size={64} className="text-[var(--moss)]" />
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          {t.welcome(orgName)}
        </h2>
        <p className="text-base text-[var(--fg-soft)] max-w-md leading-relaxed">
          {t.welcomeBody(farmerName, dpid)}
        </p>
        <div className="bg-[var(--ivory)] rounded-2xl border border-[var(--moss)] p-5 w-full max-w-sm mt-2">
          <p className="text-xs uppercase tracking-widest font-bold text-[var(--muted)] mb-2">
            {t.firstDPID}
          </p>
          <p className="font-mono text-lg font-extrabold text-[var(--moss)]">
            {dpid}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <Link
            href={lang === "id" ? "/id/farmers" : "/farmers"}
            className="px-5 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            {t.seeInList}
          </Link>
          <button
            onClick={() => {
              setDone(false);
              setStep(0);
            }}
            className="px-5 py-3 rounded-full bg-[var(--ivory)] border border-[var(--line)] text-[var(--fg)] font-bold tap"
          >
            {t.onboardAnother}
          </button>
        </div>
      </div>
    );
  }

  const canNext = (() => {
    if (step === 0) return orgName.trim().length > 1;
    if (step === 1) return farmerName.trim().length > 1 && village.trim().length > 0;
    if (step === 2) return Number(hectares) > 0;
    return true;
  })();

  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 sm:p-10 chunky-shadow">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = step === s.id;
          const passed = step > s.id;
          return (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  passed || active
                    ? "bg-[var(--moss)] text-[var(--ivory)]"
                    : "bg-[var(--bg-deep)] text-[var(--muted)]"
                }`}
              >
                {passed ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Icon size={16} />
                )}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wider hidden sm:inline ${
                  active
                    ? "text-[var(--fg)]"
                    : passed
                      ? "text-[var(--moss)]"
                      : "text-[var(--muted)]"
                }`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-[var(--line)] mx-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold mb-1">{t.step0.title}</h2>
              <p className="text-sm text-[var(--muted)]">{t.step0.sub}</p>
            </div>
            <Field label={t.step0.orgName}>
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder={t.step0.orgPh}
                className="input"
                autoFocus
              />
            </Field>
            <Field label={t.step0.kind}>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "coop", label: t.step0.coop },
                  { id: "exporter", label: t.step0.exp },
                  { id: "brand", label: t.step0.brand },
                ].map((k) => (
                  <button
                    key={k.id}
                    onClick={() => setOrgKind(k.id)}
                    className={`py-3 rounded-2xl font-bold tap border ${
                      orgKind === k.id
                        ? "bg-[var(--moss)] text-[var(--ivory)] border-[var(--moss)]"
                        : "bg-[var(--bg-deep)] text-[var(--fg-soft)] border-[var(--line)]"
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold mb-1">{t.step1.title}</h2>
              <p className="text-sm text-[var(--muted)]">{t.step1.sub}</p>
            </div>
            <Field label={t.step1.farmer}>
              <input
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder={t.step1.farmerPh}
                className="input"
                autoFocus
              />
            </Field>
            <Field label={t.step1.village}>
              <input
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder={t.step1.villagePh}
                className="input"
              />
            </Field>
            <Field label={t.step1.commodity}>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="input"
              >
                {commodityList.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold mb-1">{t.step2.title}</h2>
              <p className="text-sm text-[var(--muted)]">{t.step2.sub}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t.step2.lat}>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="-6.2088"
                  className="input"
                />
              </Field>
              <Field label={t.step2.lng}>
                <input
                  type="number"
                  step="0.0001"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="106.8456"
                  className="input"
                />
              </Field>
            </div>
            <Field label={t.step2.hectares}>
              <input
                type="number"
                step="0.1"
                value={hectares}
                onChange={(e) => setHectares(e.target.value)}
                placeholder="1.2"
                className="input"
              />
            </Field>
            <div className="bg-[var(--moss-soft)] rounded-2xl p-4 flex gap-3 items-start">
              <Sparkles size={16} className="text-[var(--moss)] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--fg-soft)] leading-relaxed">{t.step2.hint}</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold mb-1">{t.step3.title}</h2>
              <p className="text-sm text-[var(--muted)]">{t.step3.sub}</p>
            </div>
            <div className="bg-[var(--bg-deep)] rounded-2xl p-5 flex flex-col gap-2 text-sm">
              <Row k={t.step3.rowOrg} v={orgName || "—"} />
              <Row k={t.step3.rowKind} v={orgKind} />
              <Row k={t.step3.rowFarmer} v={farmerName || "—"} />
              <Row k={t.step3.rowVillage} v={village || "—"} />
              <Row k={t.step3.rowCommodity} v={commodity} />
              <Row k={t.step3.rowPlot} v={`${hectares || "?"} ha`} />
              {lat && lng && <Row k={t.step3.rowCoords} v={`${lat}, ${lng}`} />}
              <Row k={t.step3.rowDpid} v={dpid} mono />
            </div>
            <div className="bg-[var(--ochre-soft)] rounded-2xl p-4 flex gap-3 items-start">
              <Sparkles size={16} className="text-[var(--ochre)] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--fg-soft)] leading-relaxed">{t.step3.hint}</p>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[var(--muted)] disabled:opacity-30 tap"
        >
          <ArrowLeft size={16} /> {t.back}
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap disabled:opacity-40"
          >
            {t.continue} <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => {
              // Persist the onboarded farmer
              const slug = `${farmerName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")}-${dpid.split("-").pop()?.toLowerCase()}`;
              addOnboarded({
                slug,
                name: farmerName || "(no name)",
                village: village || "(no village)",
                region: village,
                commodity: commodity.toLowerCase(),
                hectares: Number(hectares) || 0,
                lat: lat ? Number(lat) : undefined,
                lng: lng ? Number(lng) : undefined,
                dpid,
                orgName: orgName || "(no org)",
              });
              setDone(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ochre)] text-[var(--fg)] font-bold tap"
          >
            {t.mint} <Sparkles size={16} />
          </button>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          background: var(--bg-deep);
          border: 1px solid var(--line);
          outline: none;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .input:focus {
          border-color: var(--moss);
          background: var(--ivory);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest font-bold text-[var(--muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span className="text-[var(--muted)]">{k}</span>
      <span
        className={`font-bold text-right ${mono ? "font-mono text-[var(--moss)]" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}
