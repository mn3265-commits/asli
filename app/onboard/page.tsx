import { OnboardWizard } from "@/components/onboard-wizard";

export const metadata = {
  title: "Onboard your cooperative — Asli",
};

export default function OnboardPage() {
  return (
    <>
      {/* HERO */}
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
          <span className="chip mb-6">🤝 For coops & exporters</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
            Onboard your farmers
            <br />
            <span className="text-[var(--moss)]">in under 5 minutes.</span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            Coops, exporters, and brands — get your farmers digital identities,
            mint DPIDs per batch, and price for premium markets that demand
            traceability.
          </p>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <OnboardWizard />
        </div>
      </section>
    </>
  );
}
