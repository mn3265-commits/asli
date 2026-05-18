"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Play, Pause, Languages } from "lucide-react";

const LANGUAGES = [
  { id: "id", label: "Bahasa Indonesia (original)" },
  { id: "en", label: "English" },
  { id: "nl", label: "Nederlands" },
  { id: "de", label: "Deutsch" },
  { id: "ja", label: "日本語" },
];

/**
 * VoiceCard — mock of the AI farmer voice translation feature.
 * In production: farmer records a 30-sec memo in their local dialect.
 * AI transcribes, translates, and resynthesizes in buyer's language
 * keeping the farmer's voice timbre.
 *
 * Here: simulates the player UX with a pulsing waveform.
 */
export function VoiceCard({
  farmerName,
  villageName,
}: {
  farmerName: string;
  villageName: string;
}) {
  const [lang, setLang] = useState("en");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const start = Date.now() - progress * 30_000;
    const tick = () => {
      const elapsed = (Date.now() - start) / 30_000;
      if (elapsed >= 1) {
        setProgress(1);
        setPlaying(false);
        return;
      }
      setProgress(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, progress]);

  const toggle = () => {
    if (progress >= 1) setProgress(0);
    setPlaying((p) => !p);
  };

  // Generate fake waveform bar heights (deterministic by index)
  const bars = Array.from({ length: 60 }, (_, i) => {
    const seed = Math.sin(i * 17.32) * 0.5 + 0.5;
    return 0.3 + seed * 0.7;
  });

  return (
    <div className="bg-[var(--ivory)] rounded-3xl border border-[var(--line)] p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Mic size={18} className="text-[var(--ochre)]" />
        <h2 className="text-xl font-extrabold">A message from the farm</h2>
      </div>
      <p className="text-sm text-[var(--muted)] mb-6">
        30-second voice memo from {farmerName.split(" ").slice(-1)[0]} in{" "}
        {villageName}. AI-translated, original timbre preserved.
      </p>

      {/* Language selector */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto -mx-1 px-1 pb-1">
        <Languages
          size={14}
          className="text-[var(--muted)] flex-shrink-0 mr-1"
        />
        {LANGUAGES.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              setLang(l.id);
              setProgress(0);
              setPlaying(false);
            }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold tap ${
              lang === l.id
                ? "bg-[var(--fg)] text-[var(--ivory)]"
                : "bg-[var(--bg-deep)] text-[var(--fg-soft)] border border-[var(--line)]"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Player */}
      <div className="bg-[var(--bg-deep)] rounded-2xl border border-[var(--line)] p-5 flex items-center gap-5">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="w-14 h-14 rounded-full bg-[var(--ochre)] text-white flex items-center justify-center flex-shrink-0 tap"
        >
          {playing ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" className="ml-1" />
          )}
        </button>

        {/* Waveform */}
        <div className="flex-1 flex items-center gap-0.5 h-12 min-w-0">
          {bars.map((h, i) => {
            const isPlayed = i / bars.length < progress;
            return (
              <div
                key={i}
                className="flex-1 rounded-sm transition-colors duration-150"
                style={{
                  height: `${h * 100}%`,
                  background: isPlayed
                    ? "var(--ochre)"
                    : "var(--line)",
                }}
              />
            );
          })}
        </div>

        <div className="text-xs font-bold tabular-nums text-[var(--muted)] flex-shrink-0 w-12 text-right">
          0:{Math.floor(30 * (1 - progress))
            .toString()
            .padStart(2, "0")}
        </div>
      </div>

      <p className="mt-5 text-sm text-[var(--fg-soft)] italic leading-relaxed">
        {lang === "id" && (
          <>
            &ldquo;Halo dari {villageName}. Saya {farmerName.split(" ").slice(-1)[0]}.
            Terima kasih sudah membeli hasil kebun saya hari ini…&rdquo;
          </>
        )}
        {lang === "en" && (
          <>
            &ldquo;Hello from {villageName}. I&apos;m {farmerName.split(" ").slice(-1)[0]}.
            Thank you for buying from my farm today. This batch came from
            the same trees my grandfather planted…&rdquo;
          </>
        )}
        {lang === "nl" && (
          <>
            &ldquo;Hallo vanuit {villageName}. Ik ben {farmerName.split(" ").slice(-1)[0]}.
            Dank je dat je vandaag van mijn boerderij koopt…&rdquo;
          </>
        )}
        {lang === "de" && (
          <>
            &ldquo;Hallo aus {villageName}. Ich bin {farmerName.split(" ").slice(-1)[0]}.
            Danke, dass Sie heute von meinem Hof kaufen…&rdquo;
          </>
        )}
        {lang === "ja" && (
          <>
            &ldquo;{villageName}からこんにちは。{farmerName.split(" ").slice(-1)[0]}です。
            今日、私の農場から購入してくださってありがとうございます…&rdquo;
          </>
        )}
      </p>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mt-3">
        ● Powered by Claude · voice cloning preserves farmer&apos;s timbre
      </p>
    </div>
  );
}
