import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "A.R. Local Growth – Google Maps & Local SEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#4285F4",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "420px",
            height: "100%",
            background: "linear-gradient(135deg, #EBF2FF 0%, #F8F9FA 100%)",
            opacity: 0.5,
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", zIndex: 1 }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#4285F4" }}>A.R.</span>
            <span style={{ fontSize: "28px", fontWeight: 600, color: "#202124" }}>Local Growth</span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#202124",
              lineHeight: 1.15,
              marginBottom: "24px",
              maxWidth: "780px",
            }}
          >
            Google Maps Optimierung
            <br />
            <span style={{ color: "#4285F4" }}>& Local SEO</span> für
            <br />
            lokale Unternehmen
          </div>

          {/* Subline */}
          <div
            style={{
              fontSize: "22px",
              color: "#5F6368",
              marginBottom: "40px",
              maxWidth: "680px",
              lineHeight: 1.5,
            }}
          >
            Individuell. Persönlich. Ohne Schablone.
          </div>

          {/* CTA badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#4285F4",
              color: "white",
              padding: "16px 32px",
              borderRadius: "12px",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            ✓ Kostenloses Google Maps Audit anfordern
          </div>

          {/* Domain */}
          <div style={{ marginTop: "32px", fontSize: "18px", color: "#9AA0A6" }}>
            arlocalgrowth.de
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
