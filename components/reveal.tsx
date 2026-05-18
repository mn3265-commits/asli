"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps children with scroll-triggered fade-up reveal.
 * Uses IntersectionObserver, respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "h2" | "p";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => setSeen(true), delay);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, seen]);

  const Cls = `reveal-on-scroll ${seen ? "in-view" : ""} ${className}`;
  if (as === "section") return <section ref={ref} className={Cls}>{children}</section>;
  if (as === "h2") return <h2 ref={ref as never} className={Cls}>{children}</h2>;
  if (as === "p") return <p ref={ref as never} className={Cls}>{children}</p>;
  return <div ref={ref} className={Cls}>{children}</div>;
}
