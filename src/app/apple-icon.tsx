import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/shared/lib/loadGoogleFont";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fraunces = await loadGoogleFont({
    family: "Fraunces",
    weight: 600,
    text: "№",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f4f0e8",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Fraunces",
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: 600,
            fontSize: 140,
            color: "#1a1815",
            lineHeight: 1,
            transform: "translateY(-6px)",
          }}
        >
          №
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: 18,
            right: 18,
            height: 8,
            background: "#b8482a",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      ],
    }
  );
}
