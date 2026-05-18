"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { addPreorder, cancelPreorder, hasPreorder, onChange } from "@/lib/store";

export function PreorderForm({
  farmerName,
  farmerSlug,
  pricePerKgUsd,
}: {
  farmerName: string;
  farmerSlug: string;
  pricePerKgUsd: number;
}) {
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
          <h2 className="text-xl font-extrabold">Pre-order locked</h2>
        </div>
        <p className="text-sm leading-relaxed">
          {firstName}'s next harvest is reserved for you at{" "}
          <span className="font-extrabold tabular-nums">
            ${pricePerKgUsd.toFixed(2)}/kg
          </span>
          . Window: <span className="font-bold">Sept–Dec 2026</span>. We'll
          notify you when it ships.
        </p>
        <button
          onClick={cancel}
          disabled={pending}
          className="self-start text-xs font-semibold underline-offset-2 hover:underline tap mt-1 opacity-70 disabled:opacity-30"
        >
          {pending ? "Cancelling…" : "Cancel pre-order"}
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
        <h2 className="text-xl font-extrabold">Pre-order next harvest</h2>
      </div>
      <p className="text-sm text-[var(--fg-soft)] mb-5 leading-relaxed">
        Fund {firstName}'s next batch ahead of harvest season. Locked at
        today's price. Delivered when ready.
      </p>
      <div className="bg-[var(--ivory)] rounded-2xl p-5 border border-[var(--line)] mb-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            Next harvest window
          </span>
          <span className="text-xs font-bold tabular-nums text-[var(--clay)]">
            Sept – Dec 2026
          </span>
        </div>
        <p className="text-3xl font-extrabold tabular-nums">
          ${pricePerKgUsd.toFixed(2)}
          <span className="text-base font-bold text-[var(--muted)] ml-1">
            /kg locked
          </span>
        </p>
      </div>
      <button
        onClick={commit}
        disabled={pending}
        className="w-full py-3.5 rounded-full bg-[var(--clay)] text-[var(--ivory)] font-bold tap disabled:opacity-50"
      >
        {pending ? "Locking…" : "Pre-order this farm"}
      </button>
    </div>
  );
}
