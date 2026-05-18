"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--ochre)] text-[var(--fg)] text-xs font-bold tap"
    >
      <Printer size={12} />
      {label}
    </button>
  );
}
