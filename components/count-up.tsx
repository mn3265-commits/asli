"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated number counter that starts when scrolled into view.
 * Supports numeric ending or prefixed strings (e.g. "Rp 47.2M" — we parse).
 */
export function CountUp({
  value,
  durationMs = 1400,
  className = "",
}: {
  value: string;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>("0");
  const triggered = useRef(false);

  // Parse target — extract number and surrounding prefix/suffix
  const match = value.match(/^([^\d-]*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numericStr = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const targetNum = Number(numericStr.replace(/,/g, "")) || 0;
  const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !triggered.current) {
            triggered.current = true;
            obs.disconnect();
            const start = Date.now();
            const tick = () => {
              const elapsed = Date.now() - start;
              const t = Math.min(1, elapsed / durationMs);
              const eased = 1 - Math.pow(1 - t, 3);
              const cur = targetNum * eased;
              setDisplay(
                prefix +
                  cur.toLocaleString(undefined, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  }) +
                  suffix,
              );
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, durationMs, prefix, suffix, targetNum, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
