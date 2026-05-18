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
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [aiSource, setAiSource] = useState<"claude" | "fallback" | null>(
    null,
  );
  const rafRef = useRef<number | null>(null);

  // Fetch translation whenever language changes
  useEffect(() => {
    let cancelled = false;
    setTranslating(true);
    setTranslatedText(null);
    setAiSource(null);
    fetch("/api/translate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        farmerName,
        villageName,
        targetLang: lang,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) {
          setTranslatedText(data.text);
          setAiSource(data.source);
        }
      })
      .catch(() => {
        // Silent fallback
      })
      .finally(() => {
        if (!cancelled) setTranslating(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lang, farmerName, villageName]);

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

      <div className="mt-5 min-h-[4rem]">
        {translating && (
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] italic">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ochre)] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ochre)] animate-pulse [animation-delay:120ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ochre)] animate-pulse [animation-delay:240ms]" />
            <span className="ml-1">Translating…</span>
          </div>
        )}
        {!translating && translatedText && (
          <p className="text-sm text-[var(--fg-soft)] italic leading-relaxed">
            &ldquo;{translatedText}&rdquo;
          </p>
        )}
      </div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mt-3">
        ● {aiSource === "claude"
          ? "Live · Powered by Claude Haiku 4.5"
          : aiSource === "fallback"
            ? "Demo · seeded translation (live Claude when API key set)"
            : "Loading translator…"}
      </p>
      <div className="mt-4 pt-4 border-t border-[var(--line)] flex items-start gap-2 text-[11px] text-[var(--muted)] leading-relaxed">
        <span className="flex-shrink-0 mt-0.5">⚠</span>
        <span>
          <strong className="text-[var(--fg-soft)]">Translated by AI.</strong>{" "}
          Source audio in the farmer&apos;s dialect is preserved and available
          on request. Translation may carry small drift; buyers should treat
          this as a faithful paraphrase, not a verbatim transcript.
        </span>
      </div>
    </div>
  );
}
