import { BuyerDashboard } from "@/components/buyer-dashboard";
import { FARMERS } from "@/lib/data";

export const metadata = { title: "Dasbormu — Asli" };

export default function DashboardPageID() {
  const lookup = Object.fromEntries(
    FARMERS.map((f) => [
      f.slug,
      {
        name: f.name,
        commodity: f.commodityLabel.split(",")[0],
        emoji: f.emoji,
        tint: f.tint,
        region: `${f.region}, ${f.island}`,
      },
    ]),
  );

  return (
    <section className="paper">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-20">
        <span className="chip mb-6">👤 Akunmu</span>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-4">
          Rantai pasokmu,
          <br />
          <span className="text-[var(--moss)]">dengan nama.</span>
        </h1>
        <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed mb-10">
          Setiap petani yang pernah kamu beli, setiap tip yang kamu kirim,
          setiap panen yang kamu pre-order. Semua di satu tempat.
        </p>
        <BuyerDashboard farmerLookup={lookup} lang="id" />
      </div>
    </section>
  );
}
