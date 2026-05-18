import { OnboardWizard } from "@/components/onboard-wizard";

export const metadata = { title: "Onboard koperasi — Asli" };

export default function OnboardPageID() {
  return (
    <>
      <section className="paper">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
          <span className="chip mb-6">🤝 Untuk koperasi & eksportir</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
            Onboard petanimu
            <br />
            <span className="text-[var(--moss)]">dalam &lt;5 menit.</span>
          </h1>
          <p className="text-lg text-[var(--fg-soft)] max-w-2xl leading-relaxed">
            Koperasi, eksportir, dan brand — kasih petani identitas digital,
            cetak DPID per batch, dan dapat harga premium dari pasar yang
            membutuhkan traceability.
          </p>
        </div>
      </section>

      <section className="paper">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
          <OnboardWizard lang="id" />
        </div>
      </section>
    </>
  );
}
