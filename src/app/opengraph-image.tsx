import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt   = "The Tipsy Butter — Cafe & Bakehouse in Digos City";
export const size  = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Resolve base URL: Vercel injects VERCEL_URL automatically
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://tipsybutter.vercel.app";

  // Attempt to load Josefin Sans Bold for brand typography
  let fontBold: ArrayBuffer | null = null;
  try {
    const res = await fetch(
      "https://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_LjRXMFrLgTsQV0.woff2"
    );
    fontBold = await res.arrayBuffer();
  } catch {
    /* falls back to system sans-serif */
  }

  const font = fontBold ? "JosefinSans" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#1B0F0A",
          overflow: "hidden",
        }}
      >
        {/* Cafe background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${baseUrl}/images/hero/hero-1.jpg`}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.38,
          }}
        />

        {/* Left-heavy gradient — keeps text readable */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(105deg, rgba(27,15,10,0.97) 0%, rgba(27,15,10,0.88) 50%, rgba(27,15,10,0.55) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 96px",
          }}
        >
          {/* Eyebrow with gold accent line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <div
              style={{ width: 40, height: 1, backgroundColor: "#BB9457" }}
            />
            <div
              style={{
                fontSize: 13,
                fontFamily: font,
                fontWeight: 700,
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
              }}
            >
              EST. 2024 · DIGOS CITY, PHILIPPINES
            </div>
          </div>

          {/* Brand name — two-line for impact */}
          <div
            style={{
              fontSize: 102,
              fontFamily: font,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              lineHeight: 0.86,
              marginBottom: 12,
            }}
          >
            THE TIPSY
          </div>
          <div
            style={{
              fontSize: 102,
              fontFamily: font,
              fontWeight: 700,
              color: "#ffdeae",
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              lineHeight: 0.86,
              marginBottom: 44,
            }}
          >
            BUTTER
          </div>

          {/* Gold rule */}
          <div
            style={{
              width: 60,
              height: 2,
              backgroundColor: "#BB9457",
              marginBottom: 28,
            }}
          />

          {/* Descriptor row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontFamily: font,
                fontWeight: 700,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              CAFE &amp; BAKEHOUSE
            </div>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "#BB9457",
              }}
            />
            <div
              style={{
                fontSize: 17,
                fontFamily: font,
                fontWeight: 700,
                color: "rgba(255,218,174,0.45)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              FRESH BAKES · WARM COFFEE
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontBold
        ? {
            fonts: [
              {
                name: "JosefinSans",
                data: fontBold,
                style: "normal" as const,
                weight: 700,
              },
            ],
          }
        : {}),
    }
  );
}
