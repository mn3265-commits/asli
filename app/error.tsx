"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this would go to telemetry. For now, console.
    console.error("Asli runtime error:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-20 text-center bg-[var(--bg)]">
      <div className="max-w-md flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[var(--clay)]/15 flex items-center justify-center">
          <AlertTriangle size={36} className="text-[var(--clay)]" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Something broke.
          </h1>
          <p className="text-base text-[var(--fg-soft)] leading-relaxed">
            An error reached the surface that we didn&apos;t plan for. Asli is
            still pre-seed — this is the kind of edge we&apos;re finding.
          </p>
          {error.digest && (
            <p className="text-[11px] text-[var(--muted)] font-mono mt-2">
              ref: {error.digest}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            <RefreshCw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--bg-deep)] text-[var(--fg)] font-bold tap border border-[var(--line)]"
          >
            <ArrowLeft size={16} />
            Back to Asli
          </Link>
        </div>
      </div>
    </main>
  );
}
