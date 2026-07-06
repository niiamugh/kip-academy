import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F1A33",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 10,
            color: "#C9A23E",
            fontWeight: 700,
          }}
        >
          KIP ACADEMY
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            fontWeight: 800,
            color: "#F7F5F0",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#C9A23E",
            letterSpacing: 4,
          }}
        >
          Own Both.
        </div>
      </div>
    ),
    { ...size }
  );
}
