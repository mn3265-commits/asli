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

const STEPS = [
  { id: 0, icon: Building, label: "Org" },
  { id: 1, icon: User, label: "Farmer" },
  { id: 2, icon: MapPin, label: "Plot" },
  { id: 3, icon: QrCode, label: "Mint" },
];

const COMMODITIES = [
  "Coffee",
  "Cacao",
  "Nutmeg",
  "Clove",
  "Vanilla",
  "Wild honey",
  "Black pepper",
  "Patchouli",
  "Other",
];

export function OnboardWizard() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [orgName, setOrgName] = useState("");
  const [orgKind, setOrgKind] = useState("coop");
  const [farmerName, setFarmerName] = useState("");
  const [village, setVillage] = useState("");
  const [commodity, setCommodity] = useState("Coffee");
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
          Welcome to Asli, {orgName || "the network"}.
        </h2>
        <p className="text-base text-[var(--fg-soft)] max-w-md leading-relaxed">
          {farmerName || "Your first farmer"} is onboarded.
          DPID <code className="font-mono font-bold">{dpid}</code> is minted.
          Your QR codes are generating. We&apos;ll email you a kit within 5
          minutes.
        </p>
        <div className="bg-[var(--ivory)] rounded-2xl border border-[var(--moss)] p-5 w-full max-w-sm mt-2">
          <p className="text-xs uppercase tracking-widest font-bold text-[var(--muted)] mb-2">
            Your first DPID
          </p>
          <p className="font-mono text-lg font-extrabold text-[var(--moss)]">
            {dpid}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <Link
            href="/farmers"
            className="px-5 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            See in farmers list →
          </Link>
          <button
            onClick={() => {
              setDone(false);
              setStep(0);
            }}
            className="px-5 py-3 rounded-full bg-[var(--ivory)] border border-[var(--line)] text-[var(--fg)] font-bold tap"
          >
            Onboard another
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
              <h2 className="text-2xl font-extrabold mb-1">
                Tell us about your organization
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Coop, exporter, or brand — we onboard all.
              </p>
            </div>
            <Field label="Organization name">
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Koperasi Gayo Sejahtera"
                className="input"
                autoFocus
              />
            </Field>
            <Field label="Kind">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "coop", label: "Coop" },
                  { id: "exporter", label: "Exporter" },
                  { id: "brand", label: "Brand" },
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
              <h2 className="text-2xl font-extrabold mb-1">
                Add your first farmer
              </h2>
              <p className="text-sm text-[var(--muted)]">
                You can bulk-import the rest via CSV or WhatsApp later.
              </p>
            </div>
            <Field label="Farmer name">
              <input
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g. Pak Joko Susanto"
                className="input"
                autoFocus
              />
            </Field>
            <Field label="Village / Kampung">
              <input
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Pondok Bambu"
                className="input"
              />
            </Field>
            <Field label="Primary commodity">
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="input"
              >
                {COMMODITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold mb-1">
                Pin the plot
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Sentinel-2 needs coordinates to fetch satellite imagery. We can
                also grab from a Google Maps link or geotagged photo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Latitude">
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="-6.2088"
                  className="input"
                />
              </Field>
              <Field label="Longitude">
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
            <Field label="Plot size (hectares)">
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
              <Sparkles
                size={16}
                className="text-[var(--moss)] flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-[var(--fg-soft)] leading-relaxed">
                On submit, we&apos;ll pull baseline forest cover from
                Sentinel-2 (2018) and the latest imagery — generating an
                EUDR-compliant due-diligence statement automatically.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold mb-1">
                Mint the first DPID
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Review and confirm. We&apos;ll generate the QR codes after.
              </p>
            </div>
            <div className="bg-[var(--bg-deep)] rounded-2xl p-5 flex flex-col gap-2 text-sm">
              <Row k="Organization" v={orgName || "—"} />
              <Row k="Kind" v={orgKind} />
              <Row k="Farmer" v={farmerName || "—"} />
              <Row k="Village" v={village || "—"} />
              <Row k="Commodity" v={commodity} />
              <Row k="Plot" v={`${hectares || "?"} ha`} />
              {lat && lng && <Row k="Coordinates" v={`${lat}, ${lng}`} />}
              <Row k="Generated DPID" v={dpid} mono />
            </div>
            <div className="bg-[var(--ochre-soft)] rounded-2xl p-4 flex gap-3 items-start">
              <Sparkles
                size={16}
                className="text-[var(--ochre)] flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-[var(--fg-soft)] leading-relaxed">
                The first DPID is on us. After that, $0.04 per mint — no
                subscription, no minimum. Buyer-facing pages are always free.
              </p>
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
          <ArrowLeft size={16} /> Back
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap disabled:opacity-40"
          >
            Continue <ArrowRight size={16} />
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
            Mint DPID <Sparkles size={16} />
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
