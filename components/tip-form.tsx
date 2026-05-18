"use client";

import { useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";

const PRESETS = [5, 10, 25, 50];

export function TipForm({
  farmerName,
  tint,
}: {
  farmerName: string;
  tint: "moss" | "ochre" | "clay" | "indigo";
}) {
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState("");
  const [sent, setSent] = useState(false);

  const finalAmount = custom ? Number(custom) || 0 : amount;
  const firstName = farmerName.split(" ").slice(-1)[0];

  const send = () => {
    if (finalAmount < 1) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div
        className="rounded-3xl p-8 border-2 flex flex-col items-center text-center gap-4"
        style={{
          background: `var(--${tint}-soft)`,
          borderColor: `var(--${tint})`,
        }}
      >
        <CheckCircle2
          size={48}
          style={{ color: `var(--${tint})` }}
        />
        <h2 className="text-2xl font-extrabold">Tip on its way</h2>
        <p className="text-sm leading-relaxed max-w-sm">
          ${finalAmount} sent to {firstName}. 100% goes through — no platform
          cut, no payment fees deducted. We cover it.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-sm font-semibold underline-offset-2 hover:underline tap mt-2 opacity-70"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Heart size={18} className="text-[var(--clay)]" />
        <h2 className="text-xl font-extrabold">Tip {firstName} directly</h2>
      </div>
      <p className="text-sm text-[var(--fg-soft)] mb-5 leading-relaxed">
        100% goes through. Beyond the commodity price. No platform fee, no
        payment processor cut — we cover those.
      </p>

      <div className="grid grid-cols-4 gap-2 mb-3">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => {
              setAmount(p);
              setCustom("");
            }}
            className={`py-3 rounded-2xl font-extrabold tabular-nums tap border ${
              !custom && amount === p
                ? "bg-[var(--fg)] text-[var(--ivory)] border-[var(--fg)]"
                : "bg-[var(--bg-deep)] text-[var(--fg-soft)] border-[var(--line)]"
            }`}
          >
            ${p}
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] font-bold">
          $
        </span>
        <input
          type="number"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          min={1}
          step={1}
          placeholder="other amount"
          className="w-full pl-8 pr-4 py-3 rounded-2xl bg-[var(--bg-deep)] border border-[var(--line)] outline-none focus:border-[var(--ochre)] font-bold tabular-nums"
        />
      </div>

      <button
        onClick={send}
        disabled={finalAmount < 1}
        className="w-full py-3.5 rounded-full bg-[var(--clay)] text-[var(--ivory)] font-bold tap disabled:opacity-40"
      >
        Send ${finalAmount} to {firstName}
      </button>

      <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mt-3 text-center">
        ● demo · payments via Asli wallet (Xendit + Stripe in prod)
      </p>
    </div>
  );
}
