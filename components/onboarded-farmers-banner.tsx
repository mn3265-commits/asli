"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { listOnboarded, onChange, type OnboardedFarmer } from "@/lib/store";

export function OnboardedFarmersBanner() {
  const [onboarded, setOnboarded] = useState<OnboardedFarmer[]>([]);

  useEffect(() => {
    setOnboarded(listOnboarded());
    return onChange(() => setOnboarded(listOnboarded()));
  }, []);

  if (onboarded.length === 0) return null;

  return (
    <div className="rounded-3xl border-2 border-dashed border-[var(--moss)]/40 p-5 mb-8 bg-[var(--moss-soft)]/50">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-[var(--moss)]" />
        <span className="text-xs uppercase tracking-widest font-extrabold text-[var(--moss)]">
          Onboarded via wizard ({onboarded.length})
        </span>
      </div>
      <p className="text-xs text-[var(--fg-soft)] mb-4 leading-relaxed">
        These farmers were just added through your /onboard flow. In production
        they'd appear here permanently with full profiles. (Local demo
        storage.)
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {onboarded.map((f) => (
          <div
            key={f.slug}
            className="bg-[var(--ivory)] rounded-2xl border border-[var(--line)] p-4 flex flex-col gap-2"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-extrabold text-sm leading-tight truncate">
                {f.name}
              </p>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--moss)]">
                {f.commodity}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)] truncate">
              {f.village} · via {f.orgName}
            </p>
            <p className="font-mono text-[10px] font-extrabold text-[var(--moss)] mt-1">
              {f.dpid}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-[var(--muted)]">
        <Link
          href="/onboard"
          className="hover:text-[var(--moss)]"
        >
          → Onboard another
        </Link>
      </div>
    </div>
  );
}
