import Link from "next/link";
import { Compass, ArrowLeft, MapPin } from "lucide-react";

export const metadata = {
  title: "Lost in the archipelago — Asli",
  description: "This page is off the map. Let's get you back.",
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-20 text-center bg-[var(--bg)]">
      <div className="max-w-md flex flex-col items-center gap-6">
        <div className="relative w-24 h-24 rounded-full bg-[var(--ochre-soft)] flex items-center justify-center">
          <Compass size={44} className="text-[var(--ochre)]" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[var(--clay)] text-[var(--ivory)] text-xs font-extrabold flex items-center justify-center">
            404
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Off the map.
          </h1>
          <p className="text-base text-[var(--fg-soft)] leading-relaxed">
            This page is somewhere between Sumatra and Papua — not where you
            meant to land. The Spice Islands are still here; you just took a
            wrong turn.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--moss)] text-[var(--ivory)] font-bold tap"
          >
            <ArrowLeft size={16} />
            Back to Asli
          </Link>
          <Link
            href="/farmers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--bg-deep)] text-[var(--fg)] font-bold tap border border-[var(--line)]"
          >
            <MapPin size={16} />
            Browse farmers
          </Link>
        </div>
      </div>
    </main>
  );
}
