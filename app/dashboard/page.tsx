import { BuyerDashboard } from "@/components/buyer-dashboard";
import { FARMERS } from "@/lib/data";

export const metadata = {
  title: "Your dashboard — Asli",
};

export default function DashboardPage() {
  // Pass minimal farmer data for the recent/tip preview
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
        <span className="chip mb-6">👤 Your account</span>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-4">
          Your supply chain,
          <br />
          <span className="text-[var(--moss)]">by name.</span>
        </h1>
        <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed mb-10">
          Every farmer you&apos;ve bought from, every tip you&apos;ve sent,
          every harvest you&apos;ve pre-ordered. All in one place.
        </p>
        <BuyerDashboard farmerLookup={lookup} />
      </div>
    </section>
  );
}
