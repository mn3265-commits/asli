"use client";

import { useEffect, useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";
import { addTip, totalTipsForFarmer, onChange } from "@/lib/store";

const PRESETS = [5, 10, 25, 50];

type Lang = "en" | "id";
const T = {
  en: {
    sent: "Sent.",
    tipOnWay: (amt: number, name: string) =>
      <><span className="font-extrabold">${amt}</span> on its way to {name}. 100% goes through — no platform cut, no payment fees deducted. We cover it.</>,
    totalTipped: (total: number, name: string) =>
      `You've tipped ${name} $${total} total.`,
    sendAnother: "Send another",
    tipDirect: (name: string) => `Tip ${name} directly`,
    blurb:
      "100% goes through. Beyond the commodity price. No platform fee, no payment processor cut — we cover those.",
    otherAmount: "other amount",
    sending: "Sending…",
    sendBtn: (amt: number, name: string) => `Send $${amt} to ${name}`,
    alreadyTipped: (total: number, name: string) =>
      `You've already tipped ${name} $${total}`,
    footnote: "● demo · payments via Asli wallet (Xendit + Stripe in prod)",
  },
  id: {
    sent: "Terkirim.",
    tipOnWay: (amt: number, name: string) =>
      <><span className="font-extrabold">${amt}</span> dalam perjalanan ke {name}. 100% lewat — tidak ada potongan platform, tidak ada biaya. Kami yang tanggung.</>,
    totalTipped: (total: number, name: string) =>
      `Kamu sudah memberi tip total $${total} ke ${name}.`,
    sendAnother: "Kirim lagi",
    tipDirect: (name: string) => `Beri tip langsung ke ${name}`,
    blurb:
      "100% lewat. Di luar harga komoditas. Tidak ada biaya platform, tidak ada potongan payment processor — kami yang tanggung.",
    otherAmount: "jumlah lain",
    sending: "Mengirim…",
    sendBtn: (amt: number, name: string) => `Kirim $${amt} ke ${name}`,
    alreadyTipped: (total: number, name: string) =>
      `Kamu sudah memberi tip $${total} ke ${name}`,
    footnote:
      "● demo · pembayaran via Asli wallet (Xendit + Stripe di production)",
  },
};

export function TipForm({
  farmerName,
  farmerSlug,
  tint,
  lang = "en",
}: {
  farmerName: string;
  farmerSlug: string;
  tint: "moss" | "ochre" | "clay" | "indigo";
  lang?: Lang;
}) {
  const t = T[lang];
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [previousTotal, setPreviousTotal] = useState(0);

  useEffect(() => {
    setPreviousTotal(totalTipsForFarmer(farmerSlug));
    return onChange(() => setPreviousTotal(totalTipsForFarmer(farmerSlug)));
  }, [farmerSlug]);

  const finalAmount = custom ? Number(custom) || 0 : amount;
  const firstName = farmerName.split(" ").slice(-1)[0];

  const send = () => {
    if (finalAmount < 1) return;
    setPending(true);
    setTimeout(() => {
      addTip(farmerSlug, finalAmount);
      setSent(true);
      setPending(false);
    }, 600);
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
        <CheckCircle2 size={48} style={{ color: `var(--${tint})` }} />
        <h2 className="text-2xl font-extrabold">{t.sent}</h2>
        <p className="text-sm leading-relaxed max-w-sm">
          {t.tipOnWay(finalAmount, firstName)}
        </p>
        {previousTotal + finalAmount > finalAmount && (
          <p className="text-xs font-bold opacity-70">
            {t.totalTipped(previousTotal + finalAmount, firstName)}
          </p>
        )}
        <button
          onClick={() => setSent(false)}
          className="text-sm font-semibold underline-offset-2 hover:underline tap mt-2 opacity-70"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Heart size={18} className="text-[var(--clay)]" />
        <h2 className="text-xl font-extrabold">{t.tipDirect(firstName)}</h2>
      </div>
      <p className="text-sm text-[var(--fg-soft)] mb-5 leading-relaxed">
        {t.blurb}
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
          placeholder={t.otherAmount}
          className="w-full pl-8 pr-4 py-3 rounded-2xl bg-[var(--bg-deep)] border border-[var(--line)] outline-none focus:border-[var(--ochre)] font-bold tabular-nums"
        />
      </div>

      <button
        onClick={send}
        disabled={finalAmount < 1 || pending}
        className="w-full py-3.5 rounded-full bg-[var(--clay)] text-[var(--ivory)] font-bold tap disabled:opacity-40"
      >
        {pending ? t.sending : t.sendBtn(finalAmount, firstName)}
      </button>

      {previousTotal > 0 && (
        <p className="text-xs font-semibold text-[var(--muted)] mt-3 text-center">
          {t.alreadyTipped(previousTotal, firstName)}
        </p>
      )}

      <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mt-3 text-center">
        {t.footnote}
      </p>
    </div>
  );
}
