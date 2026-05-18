import { ScanWidget } from "@/components/scan-widget";

export const metadata = {
  title: "Scan a DPID — Asli",
};

export default function ScanPage() {
  return (
    <section className="paper">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
        <span className="chip mb-6">📷 Scan</span>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
          Got a QR code?
          <br />
          <span className="text-[var(--moss)]">Point and scan.</span>
        </h1>
        <p className="text-lg text-[var(--fg-soft)] max-w-xl leading-relaxed mb-10">
          Every Asli-verified product has a DPID — printed as a QR. Scan it
          to meet the farmer who grew it.
        </p>

        <ScanWidget />
      </div>
    </section>
  );
}
