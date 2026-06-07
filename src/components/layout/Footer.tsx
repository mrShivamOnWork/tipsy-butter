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
            © {new Date().getFullYear()} THE TIPSY BUTTER · BAKE THE WORLD A BUTTER PLACE
          </p>
        </div>
      </div>
    </footer>
  );
}
