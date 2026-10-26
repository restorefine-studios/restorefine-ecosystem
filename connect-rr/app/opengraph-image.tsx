import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business, services } from "@/lib/business";

// Link preview card (WhatsApp, iMessage, LinkedIn…), rendered once at build time.
// Centred layout so it still reads when WhatsApp crops it to a square thumbnail.

export const alt = `${business.name} · ${business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs TTF/OTF; Google Fonts serves TrueType when no browser user agent is sent
async function loadInter(weight: number) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null; // fall back to the built-in font rather than fail the build
  }
}

// Faint street-like strokes, echoing the map cover on the page
const streets = [
  { top: 90, left: -100, width: 760, rotate: -14 },
  { top: 210, left: 620, width: 820, rotate: 22 },
  { top: 470, left: -60, width: 900, rotate: 8 },
  { top: 40, left: 820, width: 520, rotate: -38 },
  { top: 560, left: 700, width: 700, rotate: -12 },
  { top: 300, left: -180, width: 520, rotate: 64 },
];

export default async function OpengraphImage() {
  const [logoSvg, semibold, bold] = await Promise.all([
    readFile(join(process.cwd(), "public/restorefine-logowhite.svg"), "utf8"),
    loadInter(500),
    loadInter(700),
  ]);
  const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;
  const fonts = [
    semibold && { name: "Inter", data: semibold, weight: 500 as const, style: "normal" as const },
    bold && { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
  ].filter((f) => !!f);

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
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0b0b0c",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(239,68,68,0.28) 0%, rgba(239,68,68,0) 55%), radial-gradient(circle at 50% 120%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
          fontFamily: "Inter",
          color: "#fff",
        }}
      >
        {streets.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.width,
              height: 3,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.05)",
              transform: `rotate(${s.rotate}deg)`,
            }}
          />
        ))}

        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow: "0 30px 60px -20px rgba(239,68,68,0.55)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={60} height={62} alt="" />
        </div>

        <div style={{ display: "flex", marginTop: 36, fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          {business.name}
          <span style={{ color: "#ef4444" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            maxWidth: 820,
            textAlign: "center",
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.3,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {business.tagline}
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
          {services.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 999,
                fontSize: 26,
                fontWeight: 500,
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {s.name}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            fontWeight: 500,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#ef4444" }} />
          connect.restorefine.co.uk · Glasgow
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
