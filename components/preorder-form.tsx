"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { addPreorder, cancelPreorder, hasPreorder, onChange } from "@/lib/store";

type Lang = "en" | "id";
const T = {
  en: {
    locked: "Pre-order locked",
    lockedBody: (name: string, price: string) =>
      <>{name}&apos;s next harvest is reserved for you at <span className="font-extrabold tabular-nums">${price}/kg</span>. Window: <span className="font-bold">Sept–Dec 2026</span>. We&apos;ll notify you when it ships.</>,
    cancel: "Cancel pre-order",
    cancelling: "Cancelling…",
    title: "Pre-order next harvest",
    blurb: (name: string) => `Fund ${name}'s next batch ahead of harvest season. Locked at today's price. Delivered when ready.`,
    nextWindow: "Next harvest window",
    season: "Sept – Dec 2026",
    locked2: "/kg locked",
    locking: "Locking…",
    preorderBtn: "Pre-order this farm",
  },
  id: {
    locked: "Pre-order terkunci",
    lockedBody: (name: string, price: string) =>
      <>Panen berikutnya {name} dipesan untukmu di <span className="font-extrabold tabular-nums">${price}/kg</span>. Periode: <span className="font-bold">Sept–Des 2026</span>. Kami beri tahu saat siap kirim.</>,
    cancel: "Batalkan pre-order",
    cancelling: "Membatalkan…",
    title: "Pre-order panen berikutnya",
    blurb: (name: string) => `Danai batch berikutnya ${name} sebelum musim panen. Dikunci di harga hari ini. Dikirim saat siap.`,
    nextWindow: "Periode panen berikutnya",
    season: "Sept – Des 2026",
    locked2: "/kg terkunci",
    locking: "Mengunci…",
    preorderBtn: "Pre-order kebun ini",
  },
};

export function PreorderForm({
  farmerName,
  farmerSlug,
  pricePerKgUsd,
  lang = "en",
}: {
  farmerName: string;
  farmerSlug: string;
  pricePerKgUsd: number;
  lang?: Lang;
}) {
  const t = T[lang];
  const [committed, setCommitted] = useState(false);
  const [pending, setPending] = useState(false);
  const firstName = farmerName.split(" ").slice(-1)[0];

  useEffect(() => {
    setCommitted(hasPreorder(farmerSlug));
    return onChange(() => setCommitted(hasPreorder(farmerSlug)));
  }, [farmerSlug]);

  const commit = () => {
    setPending(true);
    setTimeout(() => {
      addPreorder(farmerSlug);
      setCommitted(true);
      setPending(false);
    }, 600);
  };

  const cancel = () => {
    setPending(true);
    setTimeout(() => {
      cancelPreorder(farmerSlug);
      setCommitted(false);
      setPending(false);
    }, 400);
  };

  if (committed) {
    return (
      <div
        className="rounded-3xl p-6 sm:p-8 border-2 flex flex-col gap-3"
        style={{
          background: "var(--clay-soft)",
          borderColor: "var(--clay)",
        }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 size={20} className="text-[var(--clay)]" />
          <h2 className="text-xl font-extrabold">{t.locked}</h2>
        </div>
        <p className="text-sm leading-relaxed">
          {t.lockedBody(firstName, pricePerKgUsd.toFixed(2))}
        </p>
        <button
          onClick={cancel}
          disabled={pending}
          className="self-start text-xs font-semibold underline-offset-2 hover:underline tap mt-1 opacity-70 disabled:opacity-30"
        >
          {pending ? t.cancelling : t.cancel}
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 border border-[var(--line)]"
      style={{ background: "var(--bg-deep)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Clock size={18} className="text-[var(--clay)]" />
        <h2 className="text-xl font-extrabold">{t.title}</h2>
      </div>
      <p className="text-sm text-[var(--fg-soft)] mb-5 leading-relaxed">
        {t.blurb(firstName)}
      </p>
      <div className="bg-[var(--ivory)] rounded-2xl p-5 border border-[var(--line)] mb-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            {t.nextWindow}
          </span>
          <span className="text-xs font-bold tabular-nums text-[var(--clay)]">
            {t.season}
          </span>
        </div>
        <p className="text-3xl font-extrabold tabular-nums">
          ${pricePerKgUsd.toFixed(2)}
          <span className="text-base font-bold text-[var(--muted)] ml-1">
            {t.locked2}
          </span>
        </p>
      </div>
      <button
        onClick={commit}
        disabled={pending}
        className="w-full py-3.5 rounded-full bg-[var(--clay)] text-[var(--ivory)] font-bold tap disabled:opacity-50"
      >
        {pending ? t.locking : t.preorderBtn}
      </button>
    </div>
  );
}
