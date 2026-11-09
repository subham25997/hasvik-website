import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Poppins (OFL) includes Latin + Devanagari, so Hindi titles render correctly.
const fontDir = join(process.cwd(), "src/assets/fonts");
const assets = Promise.all([
  readFile(join(fontDir, "Poppins-Bold.ttf")),
  readFile(join(fontDir, "Poppins-Medium.ttf")),
  readFile(join(process.cwd(), "public/images/logo.png")),
]);

/** Branded 1200×630 social card: navy gradient, grid, logo pill, title with green highlight. */
export async function renderOg({
  eyebrow,
  title,
  highlight,
  footer,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  footer?: string;
}) {
  const [bold, medium, logo] = await assets;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "linear-gradient(135deg, #003770 0%, #004C9A 50%, #015BB5 100%)",
        fontFamily: "Poppins",
        color: "white",
        position: "relative",
      }}
    >
      {/* glow + grid */}
      <div
        style={{
          position: "absolute",
          left: -160,
          top: -160,
          width: 560,
          height: 560,
          borderRadius: 9999,
          background: "rgba(113,197,84,0.35)",
          filter: "blur(120px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -120,
          bottom: -200,
          width: 520,
          height: 520,
          borderRadius: 9999,
          background: "rgba(47,163,255,0.35)",
          filter: "blur(120px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", background: "white", borderRadius: 9999, padding: "12px 26px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img */}
          <img src={logoSrc} width={182} height={62} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            fontWeight: 500,
            padding: "10px 20px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#71C554", display: "flex" }} />
          {site.legalStatus}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Letter-spacing breaks Devanagari conjuncts, so it is applied to Latin text only. */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 500,
            color: "#9BE47F",
            ...(/^[\x00-\x7F·]*$/.test(eyebrow) ? { letterSpacing: 3, textTransform: "uppercase" as const } : {}),
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: title.length > 40 ? 64 : 76,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          <span>{title}</span>
          {highlight ? <span style={{ color: "#71C554", marginLeft: 20 }}>{highlight}</span> : null}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          fontWeight: 500,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <span>{footer ?? "Innovate. Automate. Grow"}</span>
        <span>{site.domain}</span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
