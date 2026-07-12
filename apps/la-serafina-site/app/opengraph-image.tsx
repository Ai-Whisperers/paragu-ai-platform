import { ImageResponse } from "next/og";

export const alt = "La Serafina — La casa más sáfica de Paraguay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #F5F0FF 0%, #FFFFFF 100%)",
          fontFamily: "serif",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#7A7494",
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          ASUNCIÓN · DESDE 2005
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 900,
            color: "#1A0033",
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          La Serafina
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontStyle: "italic",
            color: "#3C096C",
            marginBottom: 36,
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          La casa más sáfica de Paraguay
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#4A4458",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Espacio cultural feminista · Sede de AIREANA · Eligio Ayala 907
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "linear-gradient(90deg,#7B2CBF 0%,#3C096C 50%,#7B2CBF 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "linear-gradient(90deg,#7B2CBF 0%,#3C096C 50%,#7B2CBF 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
