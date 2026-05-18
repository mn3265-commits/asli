type CommodityArtProps = {
  commodity:
    | "coffee"
    | "nutmeg"
    | "clove"
    | "vanilla"
    | "wild-honey"
    | "cacao";
  seed?: string;
  className?: string;
  variant?: "card" | "hero";
};

const PALETTES: Record<
  CommodityArtProps["commodity"],
  { primary: string; secondary: string; accent: string }
> = {
  coffee: {
    primary: "#3d4a2a",
    secondary: "#6b5034",
    accent: "#c4711e",
  },
  nutmeg: {
    primary: "#a04826",
    secondary: "#d68b3e",
    accent: "#f4d29c",
  },
  clove: {
    primary: "#4a2419",
    secondary: "#8b3a26",
    accent: "#c97550",
  },
  vanilla: {
    primary: "#5c4226",
    secondary: "#a87a4a",
    accent: "#f1e0c4",
  },
  "wild-honey": {
    primary: "#b8741d",
    secondary: "#e5a141",
    accent: "#ffd87a",
  },
  cacao: {
    primary: "#3f2418",
    secondary: "#7a4528",
    accent: "#d4956a",
  },
};

function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return Math.abs(h);
}

/**
 * Generates a unique organic SVG composition per (commodity, seed).
 * Looks intentional & branded, no external dependencies, infinitely scalable.
 */
export function CommodityArt({
  commodity,
  seed = "default",
  className = "",
  variant = "card",
}: CommodityArtProps) {
  const palette = PALETTES[commodity];
  const h = hashStr(seed);

  const blobs = Array.from({ length: 6 }, (_, i) => {
    const s = h + i * 7919;
    const cx = 50 + ((s * 17) % 200);
    const cy = 50 + ((s * 31) % 200);
    const r = 30 + ((s * 13) % 60);
    const opacity = 0.4 + ((s * 11) % 40) / 100;
    const color =
      i % 3 === 0
        ? palette.primary
        : i % 3 === 1
          ? palette.secondary
          : palette.accent;
    return { cx, cy, r, opacity, color };
  });

  const isHero = variant === "hero";
  const aspectClass = isHero ? "aspect-[16/9]" : "aspect-[5/3]";

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      <svg
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`bg-${commodity}-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.primary} />
            <stop offset="100%" stopColor={palette.secondary} />
          </linearGradient>
          <filter id={`blur-${commodity}-${seed}`}>
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <rect
          width="300"
          height="200"
          fill={`url(#bg-${commodity}-${seed})`}
        />
        <g filter={`url(#blur-${commodity}-${seed})`}>
          {blobs.map((b, i) => (
            <circle
              key={i}
              cx={b.cx}
              cy={b.cy}
              r={b.r}
              fill={b.color}
              opacity={b.opacity}
            />
          ))}
        </g>
        {/* Subtle grain via small circles */}
        {Array.from({ length: 40 }, (_, i) => {
          const x = (hashStr(seed + "g" + i) * 7) % 300;
          const y = (hashStr(seed + "g" + i + "y") * 11) % 200;
          return (
            <circle
              key={`g${i}`}
              cx={x}
              cy={y}
              r="0.7"
              fill="white"
              opacity="0.12"
            />
          );
        })}
      </svg>
    </div>
  );
}
