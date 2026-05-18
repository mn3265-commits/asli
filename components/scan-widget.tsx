"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Sparkles, X } from "lucide-react";
import { FARMERS } from "@/lib/data";

const SAMPLE_DPIDS = FARMERS.map((f) => ({
  id: f.batch.id,
  slug: f.slug,
  farmer: f.name,
  commodity: f.commodityLabel.split(",")[0],
}));

type Lang = "en" | "id";
const ST = {
  en: {
    cameraTitle: "Camera scan",
    cameraSub: "Point your phone at any Asli QR.",
    tap: "Tap to open camera",
    cameraDenied: "Camera access denied or unavailable. Try entering a DPID manually below.",
    alignFrame: "Align QR within the frame",
    manualTitle: "Or enter a DPID",
    manualSub: "Format: ASLI-XXX-YYYY-NNNN",
    open: "Open",
    sampleTitle: "Try a sample DPID",
    sampleSub: "Don't have a real QR? Open one of these.",
  },
  id: {
    cameraTitle: "Pindai kamera",
    cameraSub: "Arahkan ponsel ke QR Asli mana pun.",
    tap: "Tap untuk buka kamera",
    cameraDenied: "Akses kamera ditolak atau tidak tersedia. Coba masukkan DPID manual di bawah.",
    alignFrame: "Sejajarkan QR dalam frame",
    manualTitle: "Atau masukkan DPID",
    manualSub: "Format: ASLI-XXX-YYYY-NNNN",
    open: "Buka",
    sampleTitle: "Coba sample DPID",
    sampleSub: "Tidak punya QR asli? Buka salah satu di bawah.",
  },
};

export function ScanWidget({ lang = "en" }: { lang?: Lang } = {}) {
  const t = ST[lang];
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualId, setManualId] = useState("");

  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopCamera = () => {
    const v = videoRef.current;
    if (!v) return;
    const stream = v.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    v.srcObject = null;
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      const v = videoRef.current;
      if (v) {
        v.srcObject = stream;
        await v.play();
        setCameraOn(true);
      }
    } catch {
      setCameraError(t.cameraDenied);
    }
  };

  const closeCamera = () => {
    stopCamera();
    setCameraOn(false);
  };

  const submitManual = () => {
    const id = manualId.trim().toUpperCase();
    // Find matching sample
    const match = SAMPLE_DPIDS.find((s) => s.id === id);
    if (match) {
      router.push(`/farmers/${match.slug}`);
    } else if (id.startsWith("ASLI-")) {
      // Pretend resolver — pick a random farmer for demo
      router.push(`/farmers/${SAMPLE_DPIDS[0].slug}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Camera section */}
      <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 sm:p-6 chunky-shadow-soft">
        <div className="flex items-center gap-2 mb-1">
          <Camera size={18} className="text-[var(--moss)]" />
          <h2 className="text-xl font-extrabold">{t.cameraTitle}</h2>
        </div>
        <p className="text-sm text-[var(--muted)] mb-4">
          {t.cameraSub}
        </p>

        {!cameraOn && (
          <button
            onClick={startCamera}
            className="w-full aspect-[4/3] rounded-2xl bg-[var(--bg-deep)] border-2 border-dashed border-[var(--line)] flex flex-col items-center justify-center gap-3 tap hover:border-[var(--moss)] hover:bg-[var(--moss-soft)]"
          >
            <Camera size={32} className="text-[var(--muted)]" />
            <span className="text-sm font-bold text-[var(--fg-soft)]">
              {t.tap}
            </span>
            {cameraError && (
              <span className="text-xs text-[var(--clay)] max-w-[18rem] text-center px-4">
                {cameraError}
              </span>
            )}
          </button>
        )}

        {cameraOn && (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Scanner overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 aspect-square rounded-3xl border-4 border-[var(--ochre)] shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 m-4 border-t-2 border-l-2 border-[var(--ivory)] rounded-tl-xl" />
                <div className="absolute inset-0 m-4 border-t-2 border-r-2 border-[var(--ivory)] rounded-tr-xl" />
                <div className="absolute inset-0 m-4 border-b-2 border-l-2 border-[var(--ivory)] rounded-bl-xl" />
                <div className="absolute inset-0 m-4 border-b-2 border-r-2 border-[var(--ivory)] rounded-br-xl" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <span className="bg-[var(--ivory)] rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-[var(--fg)]">
                  {t.alignFrame}
                </span>
              </div>
            </div>
            <button
              onClick={closeCamera}
              aria-label="Close camera"
              className="absolute top-3 right-3 bg-[var(--ivory)] text-[var(--fg)] rounded-full w-10 h-10 flex items-center justify-center font-bold tap"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Manual entry */}
      <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-5 sm:p-6">
        <h2 className="text-xl font-extrabold mb-1">{t.manualTitle}</h2>
        <p className="text-sm text-[var(--muted)] mb-4">{t.manualSub}</p>
        <div className="flex gap-2">
          <input
            value={manualId}
            onChange={(e) => setManualId(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && submitManual()}
            placeholder="ASLI-GYO-2026-K048"
            className="flex-1 px-4 py-3 rounded-2xl bg-[var(--bg-deep)] border border-[var(--line)] outline-none focus:border-[var(--moss)] font-mono font-bold uppercase"
          />
          <button
            onClick={submitManual}
            disabled={!manualId}
            className="px-5 py-3 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap disabled:opacity-40"
          >
            {t.open}
          </button>
        </div>
      </div>

      {/* Sample DPIDs for demo */}
      <div className="bg-[var(--bg-deep)] rounded-3xl border border-[var(--line)] p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} className="text-[var(--ochre)]" />
          <h2 className="text-base font-extrabold">{t.sampleTitle}</h2>
        </div>
        <p className="text-xs text-[var(--muted)] mb-4">{t.sampleSub}</p>
        <ul className="flex flex-col gap-2">
          {SAMPLE_DPIDS.slice(0, 4).map((s) => (
            <li key={s.id}>
              <button
                onClick={() => router.push(`/farmers/${s.slug}`)}
                className="w-full bg-[var(--ivory)] rounded-xl border border-[var(--line)] px-4 py-3 flex items-center justify-between gap-3 tap text-left hover:border-[var(--moss)]"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs font-extrabold text-[var(--moss)]">
                    {s.id}
                  </p>
                  <p className="text-xs text-[var(--muted)] truncate">
                    {s.farmer} · {s.commodity}
                  </p>
                </div>
                <span className="text-[var(--muted)]">→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
