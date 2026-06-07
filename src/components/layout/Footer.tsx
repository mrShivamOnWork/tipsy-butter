import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-primary-container relative overflow-hidden py-24">

      {/* BAKE THE WORLD A BUTTER PLACE — large watermark */}
      <div
        className="absolute bottom-8 right-0 left-0 pointer-events-none select-none overflow-hidden text-center"
        aria-hidden="true"
      >
        <div
          className="brand-watermark text-on-primary-container leading-none"
          style={{
            fontSize: "clamp(56px, 8vw, 130px)",
            opacity: 0.045,
            letterSpacing: "-0.02em",
          }}
        >
          BAKE THE WORLD<br />
          A BUTTER PLACE
        </div>
      </div>

      {/* Main grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-10 max-w-[1440px] mx-auto text-on-primary-container">

        {/* Brand column */}
        <div className="sm:col-span-2">
          <div
            className="font-headline-xl font-extrabold text-primary-fixed-dim uppercase mb-5 leading-none"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)", letterSpacing: "-0.02em" }}
          >
            THE TIPSY BUTTER
          </div>
          <p className="font-body-md text-[13px] leading-relaxed opacity-65 max-w-[280px] uppercase tracking-wider">
            Your neighborhood sanctuary for fresh bakes, warm coffee, and slow mornings.
          </p>

          {/* Socials */}
          <div className="flex gap-3 mt-8">
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow The Tipsy Butter on Facebook"
              className="w-10 h-10 border border-on-primary-container/20 rounded-full flex items-center justify-center hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-current opacity-60 hover:opacity-100" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Tipsy Butter on Instagram"
              className="w-10 h-10 border border-on-primary-container/20 rounded-full flex items-center justify-center hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-current opacity-60 hover:opacity-100" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227a3.6 3.6 0 01-.894 1.38 3.6 3.6 0 01-1.38.894c-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412a3.6 3.6 0 01-1.38-.894 3.6 3.6 0 01-.894-1.38C2.41 17.65 2.215 17.015 2.161 15.845 2.103 14.579 2.091 14.199 2.091 12s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227a3.6 3.6 0 01.894-1.38 3.6 3.6 0 011.38-.894C5.27 2.413 5.905 2.218 7.075 2.164 8.341 2.106 8.721 2.094 12 2.094l-.001.069zm0-2.163c-3.259 0-3.667.014-4.947.072C5.773.19 4.9.393 4.136.69a5.76 5.76 0 00-2.126 1.384A5.76 5.76 0 00.626 4.2C.329 4.964.126 5.837.069 7.114.011 8.394 0 8.802 0 12s.014 3.606.072 4.886c.057 1.277.26 2.15.557 2.914a5.76 5.76 0 001.384 2.126A5.76 5.76 0 004.2 23.31c.764.297 1.637.5 2.914.557C8.394 23.924 8.802 24 12 24s3.606-.014 4.886-.072c1.277-.057 2.15-.26 2.914-.557a5.76 5.76 0 002.126-1.384 5.76 5.76 0 001.384-2.126c.297-.764.5-1.637.557-2.914.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.26-2.15-.557-2.914a5.76 5.76 0 00-1.384-2.126A5.76 5.76 0 0019.8.69C19.036.393 18.163.19 16.886.133 15.606.075 15.198.061 12 .061zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-caps text-[11px] tracking-[0.2em] uppercase text-primary-fixed-dim/60 mb-2">EXPLORE</h4>
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label-caps text-[10px] uppercase tracking-wider text-on-primary-container/60 hover:text-primary-fixed-dim transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Find Us */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-caps text-[11px] tracking-[0.2em] uppercase text-primary-fixed-dim/60 mb-2">FIND US</h4>
          <address className="not-italic space-y-3">
            <p className="font-body-md text-sm text-on-primary-container/60 leading-relaxed">
              {siteConfig.address}
            </p>
            <a
              href={siteConfig.phoneHref}
              className="font-body-md text-sm text-on-primary-container/60 hover:text-primary-fixed-dim transition-colors block"
            >
              {siteConfig.phone}
            </a>
            <p className="font-body-md text-sm text-on-primary-container/60">
              {siteConfig.hours.weekdays}: {siteConfig.hours.weekdayTime}
            </p>
            <p className="font-body-md text-sm text-on-primary-container/40">
              {siteConfig.hours.monday}: {siteConfig.hours.mondayNote}
            </p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 mt-20 pt-8 border-t border-on-primary-container/10 flex justify-center">
        <div
          className="border px-8 py-3"
          style={{ borderColor: "rgba(148,127,120,0.18)" }}
        >
          <p className="font-label-caps text-[9px] uppercase tracking-[0.4em] text-center"
            style={{ color: "rgba(148,127,120,0.60)" }}>
            © 2024 THE TIPSY BUTTER · BAKE THE WORLD A BUTTER PLACE
          </p>
        </div>
      </div>
    </footer>
  );
}
