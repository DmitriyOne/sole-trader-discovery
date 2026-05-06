import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/shared/lib/loadGoogleFont";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "What actually slows down UK sole traders.";

const HEADLINE_NORMAL = "What  slows down UK sole traders.";
const HEADLINE_ITALIC = "actually";
const MASTHEAD_LEFT = "DISCOVERY № 001 · 2026";
const MASTHEAD_RIGHT = "· OPEN ·";
const SIGNATURE = "— Dmitry Fenko · UK sole trader";
const STATUS = "Research in progress";

export default async function OpenGraphImage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host
    : "[PLACEHOLDER: site URL]";

  const monoText = `${MASTHEAD_LEFT}${MASTHEAD_RIGHT}${STATUS}${siteUrl}`;

  const [frauncesRegular, frauncesItalic, jetbrainsMono, caveat] =
    await Promise.all([
      loadGoogleFont({
        family: "Fraunces",
        weight: 600,
        italic: false,
        text: HEADLINE_NORMAL,
      }),
      loadGoogleFont({
        family: "Fraunces",
        weight: 600,
        italic: true,
        text: HEADLINE_ITALIC,
      }),
      loadGoogleFont({
        family: "JetBrains Mono",
        weight: 700,
        text: monoText,
      }),
      loadGoogleFont({
        family: "Caveat",
        weight: 500,
        text: SIGNATURE,
      }),
    ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#f4f0e8",
          position: "relative",
          display: "flex",
          fontFamily: "Fraunces",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 0,
            right: 0,
            borderTop: "1px solid #b8482a",
            borderBottom: "1px solid #b8482a",
            padding: "18px 64px",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "JetBrains Mono",
            fontWeight: 700,
            fontSize: 14,
            color: "#1a1815",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <div style={{ display: "flex" }}>{MASTHEAD_LEFT}</div>
          <div style={{ display: "flex", color: "#b8482a" }}>
            {MASTHEAD_RIGHT}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            top: 200,
            display: "flex",
            flexDirection: "column",
            color: "#1a1815",
            fontFamily: "Fraunces",
            fontWeight: 600,
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <div style={{ display: "flex" }}>
            <span>What&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#8a3520" }}>
              actually
            </span>
            <span>&nbsp;slows down</span>
          </div>
          <div style={{ display: "flex" }}>UK sole traders.</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 86,
            display: "flex",
            fontFamily: "Caveat",
            fontWeight: 500,
            fontSize: 36,
            color: "#8a3520",
            lineHeight: 1,
          }}
        >
          {SIGNATURE}
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 36,
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontWeight: 700,
            fontSize: 14,
            color: "#4a463e",
            letterSpacing: "0.05em",
          }}
        >
          {siteUrl}
        </div>

        <div
          style={{
            position: "absolute",
            right: 64,
            bottom: 48,
            display: "flex",
            alignItems: "center",
            fontFamily: "JetBrains Mono",
            fontWeight: 700,
            fontSize: 12,
            color: "#4a463e",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#b8482a",
              marginRight: 12,
              display: "flex",
            }}
          />
          <div style={{ display: "flex" }}>{STATUS}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: frauncesRegular,
          weight: 600,
          style: "normal",
        },
        {
          name: "Fraunces",
          data: frauncesItalic,
          weight: 600,
          style: "italic",
        },
        {
          name: "JetBrains Mono",
          data: jetbrainsMono,
          weight: 700,
          style: "normal",
        },
        { name: "Caveat", data: caveat, weight: 500, style: "normal" },
      ],
    }
  );
}
