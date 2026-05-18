import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Asli — Indonesian commodities, by name";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#faf5e8",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "#d4831a",
            opacity: 0.15,
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "100px",
            width: "400px",
            height: "400px",
            background: "#2f5d3a",
            opacity: 0.18,
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            fontSize: "44px",
            fontWeight: 800,
            color: "#2f5d3a",
          }}
        >
          <span>Asli</span>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8a7858",
              fontWeight: 600,
            }}
          >
            Indonesia
          </span>
        </div>

        {/* Main copy */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            color: "#1f1810",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
          }}
        >
          <div style={{ fontSize: "120px" }}>Indonesian</div>
          <div style={{ fontSize: "120px" }}>commodities,</div>
          <div style={{ fontSize: "120px", color: "#2f5d3a" }}>by name.</div>
        </div>

        {/* Footer chips */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            right: "80px",
            display: "flex",
            gap: "16px",
            fontSize: "20px",
            color: "#3d2f20",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              background: "#fff8e8",
              border: "1px solid #e3d6b9",
            }}
          >
            ☕ Coffee
          </span>
          <span
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              background: "#fff8e8",
              border: "1px solid #e3d6b9",
            }}
          >
            🌰 Spice
          </span>
          <span
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              background: "#fff8e8",
              border: "1px solid #e3d6b9",
            }}
          >
            🌸 Vanilla
          </span>
          <span
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              background: "#fff8e8",
              border: "1px solid #e3d6b9",
            }}
          >
            🍯 Honey
          </span>
        </div>
      </div>
    ),
    size,
  );
}
