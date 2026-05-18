import { ScanWidget } from "@/components/scan-widget";

export const metadata = { title: "Pindai DPID — Asli" };

export default function ScanPageID() {
  return (
    <section className="paper">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16">
        <span className="chip mb-6">📷 Pindai</span>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
          Punya kode QR?
          <br />
          <span className="text-[var(--moss)]">Arahkan dan pindai.</span>
        </h1>
        <p className="text-lg text-[var(--fg-soft)] max-w-xl leading-relaxed mb-10">
          Setiap produk yang diverifikasi Asli punya DPID — dicetak sebagai
          kode QR. Pindai untuk berkenalan dengan petani yang menumbuhkannya.
        </p>

        <ScanWidget lang="id" />
      </div>
    </section>
  );
}
