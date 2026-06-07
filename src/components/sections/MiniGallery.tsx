"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { RevealImage } from "@/components/ui/RevealImage";
import { SplitHeading } from "@/components/ui/SplitHeading";

const IMAGES = [
  { src: "/images/gallery/gallery-1.jpg", label: "01 — INTERIOR", title: "The Morning Glow" },
  { src: "/images/gallery/gallery-3.jpg", label: "02 — BAKE DETAIL", title: "Fresh Pastry" },
  { src: "/images/gallery/gallery-5.jpg", label: "03 — ARTISAN MIX", title: "Artisan Bakes" },
  { src: "/images/gallery/gallery-7.jpg", label: "04 — THE RITUAL", title: "Coffee Ceremony" },
];

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.12 },
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

export function MiniGallery() {
  const reduced = useReducedMotion();

  return (
    <section className="px-6 md:px-10 py-20 max-w-[1440px] mx-auto" aria-labelledby="gallery-heading">

      {/* Header */}
      <motion.div {...fadeUp(0, reduced)} className="border-l-4 border-primary pl-6 mb-12">
        <p className="font-label-caps text-secondary mb-2 text-[11px] tracking-[0.2em] uppercase">Heritage & Craft</p>
        <SplitHeading
          as="h2"
          id="gallery-heading"
          className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em] text-4xl md:text-5xl"
          delay={0.1}
        >
          Visual Musings
        </SplitHeading>
      </motion.div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-12 gap-6">

        {/* Large — 7 cols */}
        <motion.div
          {...fadeUp(0, reduced)}
          className="col-span-12 md:col-span-7 relative group overflow-hidden"
          data-cursor="memory"
        >
          <RevealImage>
            <Image
              src={IMAGES[0].src}
              alt={IMAGES[0].title}
              width={900}
              height={900}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </RevealImage>
          <div className="absolute bottom-8 left-8 glass-effect p-5 border border-outline/10 z-20">
            <span className="font-label-caps text-primary/40 text-[10px] block mb-1">{IMAGES[0].label}</span>
            <h3 className="font-headline-sm font-bold uppercase text-primary">{IMAGES[0].title}</h3>
          </div>
        </motion.div>

        {/* Two stacked — 5 cols */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
          {IMAGES.slice(1, 3).map((img, i) => (
            <motion.div
              key={img.label}
              {...fadeUp(0.1 + i * 0.1, reduced)}
              className="relative group overflow-hidden aspect-[4/3]"
              data-cursor="memory"
            >
              <RevealImage className="w-full h-full">
                <Image
                  src={img.src}
                  alt={img.title}
                  width={600}
                  height={286}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </RevealImage>
              <div className="absolute top-4 right-4 bg-surface p-3 border border-outline/10 z-20">
                <span className="font-label-caps text-primary text-[10px]">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div {...fadeUp(0.2, reduced)} className="mt-12 text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 font-label-caps uppercase text-[11px] font-bold border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all text-primary"
          data-cursor="open"
        >
          VIEW FULL GALLERY
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
