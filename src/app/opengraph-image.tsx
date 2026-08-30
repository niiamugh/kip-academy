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
          backgroundColor: "#ffffff",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            fontSize: 64,
            fontWeight: 700,
            color: "#101010",
          }}
        >
          KIP
          <span style={{ color: "#C40009" }}>Academy</span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 84,
            fontWeight: 700,
            color: "#101010",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 30,
            color: "#C40009",
            letterSpacing: 3,
            fontWeight: 700,
          }}
        >
          Own Both.
        </div>
        <div
          style={{
            marginTop: 48,
            width: 120,
            height: 8,
            backgroundColor: "#C40009",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
