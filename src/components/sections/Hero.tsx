"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { ImageGrain } from "@/components/ui/ImageGrain";

export function Hero() {
  const reduced = useReducedMotion();

  const fadeIn = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section
      className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center"
      aria-label="Hero"
    >
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 hero-breathe">
          <Image
            src="/images/hero/hero-9.jpg"
            alt="The Tipsy Butter — outdoor seating, fresh bakes and warm coffee in Digos City"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
            quality={92}
          />
        </div>
        {/* Grain blends with the photo inside this stacking context — not with the dark overlay above */}
        <ImageGrain grainOpacity={0.32} vignetteOpacity={0.2} />
      </div>

      {/* Overlay — slightly stronger since hero-9 is a bright outdoor shot */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Hero content — centered, padded to clear fixed navbar */}
      <div className="relative z-20 text-center px-6 flex flex-col items-center pt-16 md:pt-20">

        {/* Eyebrow */}
        <motion.div
          {...fadeIn(0.1)}
          className="font-label-caps text-white/80 text-[10px] tracking-[0.4em] uppercase mb-4"
        >
          EST. 2024 • DIGOS CITY
        </motion.div>

        {/* Display headline */}
        <motion.h1
          {...fadeIn(0.2)}
          className="font-headline-xl font-bold uppercase leading-[0.88] tracking-[0.06em] text-white select-none mb-4"
          style={{ fontSize: "clamp(44px, 9vw, 112px)" }}
        >
          <span className="block">THE TIPSY</span>
          <span className="block" style={{ color: "#ffdeae" }}>BUTTER</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeIn(0.4)}
          className="font-label-caps uppercase tracking-[0.22em] text-white/80 text-[11px] mb-6"
        >
          Coffee • Croissants • Cakes
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeIn(0.55)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/menu"
            className="bg-white text-primary px-8 py-4 rounded-[4px] font-label-caps uppercase text-[11px] tracking-[0.12em] hover:bg-tertiary-fixed transition-colors min-w-[180px] text-center active:scale-95"
          >
            View Menu
          </Link>
          <Link
            href="/visit"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-[4px] font-label-caps uppercase text-[11px] tracking-[0.12em] hover:bg-white/10 transition-colors min-w-[180px] text-center active:scale-95"
          >
            Visit Cafe
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
