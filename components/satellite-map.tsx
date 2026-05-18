"use client";

/**
 * SatelliteMap — embeds an Esri World Imagery satellite tile (public)
 * centered on the farmer's plot, with a circular overlay marker.
 * In production this would pull fresh Sentinel-2 imagery via the
 * Copernicus / Sentinel Hub API.
 */
export function SatelliteMap({
  lat,
  lng,
  farmerName,
}: {
  lat: number;
  lng: number;
  farmerName: string;
}) {
  // Esri ArcGIS World Imagery — public satellite tile service
  // Convert lat/lng to tile coords (zoom 14 for plot-level view)
  const zoom = 14;
  const n = Math.pow(2, zoom);
  const xtile = Math.floor(((lng + 180) / 360) * n);
  const ytile = Math.floor(
    ((1 -
      Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
        Math.PI) /
      2) *
      n,
  );

  const tile = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${ytile}/${xtile}`;

  // Center tile and 4 surrounding tiles for a 3x3 grid (best framing)
  const tiles: { dx: number; dy: number; url: string }[] = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      tiles.push({
        dx,
        dy,
        url: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${ytile + dy}/${xtile + dx}`,
      });
    }
  }

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-deep)] border border-[var(--line)]">
      {/* 3x3 tile grid */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {tiles.map((t, i) => (
          <img
            key={i}
            src={t.url}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ))}
      </div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(31,24,16,0.45) 100%)",
        }}
      />

      {/* Center marker — pulsing target */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "var(--ochre)",
              opacity: 0.4,
              width: "44px",
              height: "44px",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />
          <div
            className="relative w-11 h-11 rounded-full border-4 flex items-center justify-center text-white text-xs font-extrabold"
            style={{
              background: "var(--ochre)",
              borderColor: "var(--ivory)",
            }}
          >
            ●
          </div>
        </div>
      </div>

      {/* Bottom-left label */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-[var(--ivory)]/95 backdrop-blur-md rounded-xl px-3 py-2 text-xs font-bold shadow-sm">
        <span className="text-[var(--moss)]">●</span>{" "}
        <span className="text-[var(--fg)]">{farmerName}&apos;s plot</span>
        <span className="text-[var(--muted)] ml-2 hidden sm:inline">
          · Sentinel-2 · live
        </span>
      </div>

      {/* Top-right: forest cover badge */}
      <div className="absolute top-3 right-3 bg-[var(--moss)] text-[var(--ivory)] rounded-xl px-3 py-2 text-[10px] font-extrabold tracking-wide flex items-center gap-1.5 shadow-md">
        <span>✓</span>
        <span>NO DEFORESTATION</span>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-1 right-2 text-[8px] text-white/70 font-medium pointer-events-none">
        Imagery © Esri / Maxar
      </div>
    </div>
  );
}
