"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { useReducedMotion } from "@/lib/hooks";
import { ImageGrain } from "@/components/ui/ImageGrain";

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.12 },
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

const HOURS = [
  { days: "Tue — Thu", hours: "8:00 am — 7:00 pm" },
  { days: "Fri — Sat", hours: "8:00 am — 8:00 pm", highlight: true },
  { days: "Sunday", hours: "9:00 am — 6:00 pm" },
  { days: "Monday", hours: "Closed — Rest & Prep", closed: true },
];


export function VisitContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        {/* Wrap image in its own stacking context so grain blends with the photo, not the overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-5.jpg"
            alt="The Tipsy Butter — find us where the butter melts"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <ImageGrain grainOpacity={0.30} vignetteOpacity={0.18} />
        </div>
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16 md:pt-20 z-20">
          <motion.span
            {...fadeUp(0.1, reduced)}
            className="font-label-caps text-white mb-4 tracking-[0.4em] uppercase"
          >
            YOUR DAILY SANCTUARY
          </motion.span>
          <motion.h1
            {...fadeUp(0.2, reduced)}
            className="font-headline-xl font-extrabold text-white mb-6 max-w-4xl uppercase tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 7vw, 72px)" }}
          >
            Find us where the butter melts
          </motion.h1>
          <motion.div {...fadeUp(0.35, reduced)} className="flex flex-col items-center gap-4">
            <Link
              href="#location"
              className="bg-white text-primary font-label-caps px-10 py-4 rounded-full hover:bg-surface-container-low transition-all shadow-lg hover:shadow-xl active:scale-95 uppercase text-[11px] tracking-[0.12em]"
            >
              Explore the Space
            </Link>
            <p className="font-body-md text-white/90 italic text-lg">
              Warm croissants waiting for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Portal */}
      <section id="location" className="px-6 md:px-10 py-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

          {/* Left — Info & Hours */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div {...fadeUp(0, reduced)}>
              <div className="flex items-center gap-4 mb-3">
                <span className="font-label-caps text-on-tertiary-container uppercase text-[10px] tracking-wider">Digos City</span>
                <span className="w-1 h-1 bg-outline rounded-full" />
                <span className="font-label-caps text-on-tertiary-container uppercase text-[10px] tracking-wider">Est. 2024</span>
              </div>
              <span className="font-label-caps text-secondary mb-2 block uppercase tracking-[0.2em] text-[10px]">OUR FLAGSHIP SPACE</span>
              <h2 className="font-headline-xl font-extrabold text-on-surface mb-6 uppercase tracking-[-0.02em] text-3xl md:text-4xl">
                Digos City, Philippines
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
                A quiet corner in the heart of Digos. We&apos;ve created a warm, sun-drenched space where you
                can pause, breathe, and enjoy the simple pleasure of artisanal baking.
              </p>

              {/* Address details */}
              <div className="flex flex-col gap-4 py-6 border-t border-outline-variant/30">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-secondary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="font-body-md text-sm">{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-secondary shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <a href={siteConfig.phoneHref} className="font-body-md text-sm hover:text-secondary transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Hours card */}
            <motion.div
              {...fadeUp(0.12, reduced)}
              className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/20"
            >
              <h3 className="font-label-caps mb-6 text-on-surface-variant uppercase tracking-[0.2em] text-[10px]">OPENING TIMES</h3>
              <div className="space-y-4">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex justify-between pb-3 border-b border-outline-variant/20">
                    <span className={`font-body-md font-medium ${h.highlight ? "text-secondary" : ""} ${h.closed ? "opacity-50" : ""}`}>
                      {h.days}
                    </span>
                    <span className={`font-body-md ${h.closed ? "opacity-40" : ""}`}>{h.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary font-label-caps py-3.5 px-4 transition-all active:scale-95 flex items-center justify-center gap-2 rounded-full text-[10px] uppercase tracking-wider hover:opacity-80"
                >
                  Open Google Maps
                </a>
                <Link
                  href="/contact"
                  className="border border-primary/20 text-primary font-label-caps py-3.5 px-4 transition-all hover:bg-primary/5 active:scale-95 flex items-center justify-center gap-2 rounded-full text-[10px] uppercase tracking-wider"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — Map embed */}
          <motion.div
            {...fadeUp(0.15, reduced)}
            className="lg:col-span-7 h-[50vw] min-h-[380px] max-h-[700px] bg-surface-container rounded-2xl overflow-hidden relative shadow-2xl border border-outline-variant/20"
          >
            <iframe
              src={siteConfig.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.15) contrast(1.02)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Tipsy Butter location map"
            />
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-5 top-5 z-20 bg-surface/95 px-5 py-3 font-label-caps text-[9px] uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-sm transition-colors hover:bg-tertiary-fixed"
              data-cursor="go"
            >
              Open Google Maps
            </a>
            {/* Map pin overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
              <div className="bg-primary text-on-primary py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2">
                <span className="font-label-caps tracking-widest text-[10px] uppercase">THE TIPSY BUTTER</span>
              </div>
              <div className="w-3 h-3 bg-primary rotate-45 -mt-1.5 mx-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scrolling atmosphere banner */}
      <section className="bg-primary py-6 overflow-hidden border-y border-outline-variant/10 marquee-container">
        <div className="marquee-track" style={{ animationDuration: "30s" }}>
          {["ARTISANAL HERITAGE", "FRESHLY BAKED DAILY", "MINIMALIST CURIOSITY", "DIGOS CITY EST 2024"].map((text, i) => (
            <span key={i} className="font-headline-xl font-extrabold text-[18px] text-white/35 uppercase whitespace-nowrap tracking-[0.02em]">
              {text} <span className="text-white/20 mx-2">—</span>
            </span>
          ))}
        </div>
        <div className="marquee-track" style={{ animationDuration: "30s" }} aria-hidden="true">
          {["ARTISANAL HERITAGE", "FRESHLY BAKED DAILY", "MINIMALIST CURIOSITY", "DIGOS CITY EST 2024"].map((text, i) => (
            <span key={i} className="font-headline-xl font-extrabold text-[18px] text-white/35 uppercase whitespace-nowrap tracking-[0.02em]">
              {text} <span className="text-white/20 mx-2">—</span>
            </span>
          ))}
        </div>
      </section>

      {/* Nearby section */}
      <section className="px-6 md:px-10 py-24 max-w-[1440px] mx-auto">
        <motion.div {...fadeUp(0, reduced)} className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
          <div>
            <span className="font-label-caps text-secondary mb-2 block uppercase tracking-[0.2em] text-[10px]">STROLL THROUGH DIGOS</span>
            <h2 className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em] text-3xl">
              A Perfect Afternoon Nearby
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-sm md:text-right leading-relaxed text-sm">
            Discover our favorite neighborhood spots around Digos City.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Large image — 2 cols */}
          <motion.div
            {...fadeUp(0, reduced)}
            className="md:col-span-2 group overflow-hidden relative rounded-2xl border border-outline-variant/10 shadow-sm min-h-[280px] md:h-[clamp(380px,40vw,580px)]"
          >
            <Image
              src="/images/gallery/gallery-8.jpg"
              alt="The Tipsy Butter neighborhood"
              fill
              className="object-cover staggered-image"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <ImageGrain />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 z-20">
              <span className="font-label-caps text-white/90 mb-2 uppercase text-[10px]">CULTURE</span>
              <h4 className="font-headline-sm font-bold text-white mb-2 uppercase">The Tipsy Butter Neighborhood</h4>
              <p className="font-body-md text-white/80 max-w-xs text-sm">Your daily destination for warm bakes and slow pours.</p>
            </div>
          </motion.div>

          {/* Right small cards */}
          <div className="flex flex-col gap-8 md:h-[clamp(380px,40vw,580px)]">
            <motion.div
              {...fadeUp(0.12, reduced)}
              className="flex-1 min-h-[160px] group overflow-hidden relative rounded-2xl border border-outline-variant/10 shadow-sm"
            >
              <Image
                src="/images/gallery/gallery-12.jpg"
                alt="Nearby Digos City"
                fill
                className="object-cover staggered-image"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <ImageGrain vignetteOpacity={0.22} />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] z-20">
                <span className="font-label-caps text-white border border-white/50 px-6 py-2.5 uppercase text-[11px] rounded-full">Explore</span>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.2, reduced)}
              className="flex-1 min-h-[160px] group overflow-hidden relative rounded-2xl bg-secondary-container p-8 flex flex-col justify-center border border-outline-variant/10"
            >
              <h4 className="font-headline-sm font-bold text-on-secondary-container mb-4 uppercase tracking-[-0.02em] text-lg">
                Finding us elsewhere
              </h4>
              <p className="font-body-md text-on-secondary-container/80 mb-6 text-sm leading-relaxed">
                Our second sanctuary is currently taking shape. We&apos;ll announce when it&apos;s ready.
              </p>
              <span className="font-label-caps text-on-secondary-container border-b border-on-secondary-container/30 w-fit uppercase text-[11px] hover:border-on-secondary-container transition-colors">
                COMING SOON
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
