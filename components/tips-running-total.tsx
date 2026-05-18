"use client";

import { useEffect, useState } from "react";
import { totalTipsForFarmer, onChange } from "@/lib/store";

export function TipsRunningTotal({
  slug,
  firstName: _firstName,
  lang = "en",
}: {
  slug: string;
  firstName: string;
  lang?: "en" | "id";
}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(totalTipsForFarmer(slug));
    return onChange(() => setTotal(totalTipsForFarmer(slug)));
  }, [slug]);

  if (total === 0) return null;

  const label =
    lang === "id" ? "+ tip langsung dari kamu" : "+ direct tips from you";

  return (
    <div className="mt-3 pt-3 border-t border-[var(--fg)]/10 flex items-center justify-between text-xs font-semibold">
      <span className="opacity-70">{label}</span>
      <span className="tabular-nums font-extrabold text-[var(--clay)]">
        +${total}
      </span>
    </div>
  );
}
