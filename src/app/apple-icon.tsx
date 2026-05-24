import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#03547D",
          borderRadius: 40,
          position: "relative",
        }}
      >
        {/* M letter */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 44 44"
          style={{ position: "absolute" }}
        >
          <path
            d="M8 34L8 12L21 26L33 12L33 34"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        {/* Accent circle */}
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 44,
            height: 44,
            borderRadius: 22,
            background: "#05BFDB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          +
        </div>
      </div>
    ),
    { ...size }
  );
}
