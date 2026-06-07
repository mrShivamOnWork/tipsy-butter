"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { useReducedMotion } from "@/lib/hooks";
import { ImageGrain } from "@/components/ui/ImageGrain";

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.08 },
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

const FEATURED = [
  { src: "/images/gallery/gallery-1.jpg", label: "01 — INTERIOR", title: "The Morning Glow", span: "large" },
  { src: "/images/gallery/gallery-3.jpg", label: "02 — BAKE DETAIL", title: "Fresh Pastry", span: "small" },
  { src: "/images/gallery/gallery-5.jpg", label: "03 — ARTISAN MIX", title: "Artisan Bakes", span: "small" },
  { src: "/images/gallery/gallery-7.jpg", label: "04 — THE RITUAL", title: "Coffee Ceremony", span: "medium" },
  { src: "/images/gallery/gallery-9.jpg", label: "05 — PERFECT PAIRING", title: "Latte & Pastry", span: "wide" },
];

export function GalleryContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Fixed rotating label */}
      <div
        className="fixed top-24 right-8 z-[60] opacity-20 pointer-events-none select-none hidden lg:block font-label-caps text-[10px] uppercase tracking-[0.2em] -rotate-90 origin-right text-on-surface"
        aria-hidden="true"
      >
        Visual Musings — Est. 2024
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 py-20 max-w-[1440px] mx-auto">
        <motion.div {...fadeUp(0, reduced)} className="border-l-4 border-primary pl-6 mb-10">
          <p className="font-label-caps text-secondary mb-2 text-[11px] tracking-[0.2em] uppercase">Heritage & Craft</p>
          <h1
            className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em]"
            style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
          >
            Visual Musings
          </h1>
        </motion.div>

        <motion.div {...fadeUp(0.1, reduced)} className="flex justify-between items-end gap-10 mb-16">
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-[16px] leading-relaxed">
            Pull up a chair and stay a while. We&apos;ve collected these small glimpses of our daily life—
            the warmth of the morning sun, the simple joy of a fresh bake, and the quiet moments shared over coffee.
          </p>
          <span className="hidden md:block font-label-caps text-[10px] text-outline opacity-50 mb-1 uppercase tracking-widest whitespace-nowrap">
            CAPTURED MOMENTS — EST. 2024
          </span>
        </motion.div>

        {/* Main asymmetric grid */}
        <div className="grid grid-cols-12 gap-6">

          {/* Large vertical — 7 cols */}
          <motion.div
            {...fadeUp(0, reduced)}
            className="col-span-12 md:col-span-7 relative group overflow-hidden"
            data-cursor="memory"
          >
            <Image
              src={FEATURED[0].src}
              alt={FEATURED[0].title}
              width={900}
              height={900}
              className="w-full object-cover staggered-image"
              style={{ aspectRatio: '1/1' }}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            <ImageGrain />
            <div className="absolute bottom-8 left-8 glass-effect p-6 border border-outline/10 flex flex-col gap-2 z-20">
              <span className="font-label-caps text-primary/40 text-[10px] block">{FEATURED[0].label}</span>
              <h3 className="font-headline-sm font-bold uppercase text-primary">{FEATURED[0].title}</h3>
            </div>
          </motion.div>

          {/* Two small — 5 cols stacked */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
            {FEATURED.slice(1, 3).map((img, i) => (
              <motion.div
                key={img.label}
                {...fadeUp(0.1 + i * 0.08, reduced)}
                className="relative group overflow-hidden aspect-[16/10]"
              data-cursor="memory"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover staggered-image"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <ImageGrain />
                <div className="absolute top-4 right-4 bg-surface p-3 border border-outline/10 z-20">
                  <span className="font-label-caps text-primary text-[10px]">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Medium — 4 cols */}
          <motion.div
            {...fadeUp(0.15, reduced)}
            className="col-span-12 md:col-span-4 relative group overflow-hidden aspect-[9/10]"
            data-cursor="memory"
          >
            <Image
              src={FEATURED[3].src}
              alt={FEATURED[3].title}
              fill
              className="object-cover staggered-image"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <ImageGrain />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 backdrop-blur-sm z-20">
              <p className="font-headline-sm text-surface uppercase tracking-widest font-bold">The Ritual</p>
            </div>
            <div className="absolute top-4 left-4 bg-surface/80 p-2">
              <span className="font-label-caps text-[10px] text-primary">VISUAL MUSINGS — {FEATURED[3].label.split("—")[0].trim()}</span>
            </div>
          </motion.div>

          {/* Wide — 8 cols */}
          <motion.div
            {...fadeUp(0.2, reduced)}
            className="col-span-12 md:col-span-8 relative group overflow-hidden aspect-video"
            data-cursor="memory"
          >
            <Image
              src={FEATURED[4].src}
              alt={FEATURED[4].title}
              fill
              className="object-cover staggered-image"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <ImageGrain />
            <div className="absolute top-0 left-0 w-full h-full border-[24px] border-surface/15 pointer-events-none z-20" />
            <div className="absolute bottom-6 right-6 bg-primary text-on-primary p-4">
              <span className="font-label-caps uppercase text-[10px] tracking-wider">Perfect Pairing</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Atmosphere break — full width */}
      <section className="w-full relative h-[60vh] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/images/gallery/gallery-11.jpg"
            alt="Tipsy Butter cafe atmosphere"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <ImageGrain grainOpacity={0.22} vignetteOpacity={0.15} />
        <div className="relative px-6 md:px-10 z-10 w-full max-w-[1440px] mx-auto">
          <div className="max-w-3xl">
            <span className="font-label-caps text-secondary-fixed mb-4 block uppercase tracking-[0.2em]">ATMOSPHERE</span>
            <h2
              className="font-headline-xl font-extrabold text-surface-bright mb-6 uppercase tracking-[-0.02em]"
              style={{ fontSize: "clamp(24px, 4vw, 48px)" }}
            >
              &ldquo;The scent of rising dough is the only clock we follow.&rdquo;
            </h2>
            <div className="w-24 h-px bg-secondary-fixed" />
          </div>
        </div>
      </section>

      {/* Final 3-col grid */}
      <section className="px-6 md:px-10 py-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card with text + image */}
          <motion.div
            {...fadeUp(0, reduced)}
            className="bg-surface-container-high p-8 flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="font-label-caps text-primary/40 block mb-2 text-[10px]">05 — BEVERAGE</span>
                <span className="font-label-caps text-[10px] text-outline uppercase">Est. 2024</span>
              </div>
              <h4 className="font-headline-sm font-bold uppercase mb-4 text-primary">The Espresso Roast</h4>
              <p className="font-body-md text-on-surface-variant text-sm">
                Our signature blend, balanced specifically to cut through the richness of high-fat butter pastry.
              </p>
            </div>
            <div className="relative h-48 overflow-hidden rounded mt-8">
              <Image
                src="/images/gallery/gallery-13.jpg"
                alt="Espresso roast"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <ImageGrain vignetteOpacity={0.18} />
            </div>
          </motion.div>

          {/* Wide image — 2 cols */}
          <motion.div
            {...fadeUp(0.12, reduced)}
            className="md:col-span-2 relative overflow-hidden group"
            data-cursor="memory"
          >
            <Image
              src="/images/gallery/gallery-15.jpg"
              alt="Captured moment"
              width={1200}
              height={600}
              className="w-full object-cover staggered-image"
              style={{ aspectRatio: '2/1' }}
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <ImageGrain />
            <div className="absolute bottom-0 right-0 bg-primary text-on-primary p-8 z-20">
              <span className="font-label-caps uppercase text-[10px] tracking-wider">CAPTURED MOMENT — 06</span>
            </div>
            <div className="absolute top-4 right-4 text-surface-bright/50 font-label-caps text-[10px] uppercase">
              VISUAL MUSINGS GALLERY
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full gallery grid */}
      <section className="px-6 md:px-10 pb-20 max-w-[1440px] mx-auto">
        <motion.div {...fadeUp(0, reduced)} className="mb-12">
          <h2 className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em] text-3xl">
            All Moments
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              {...fadeUp(Math.min(i * 0.04, 0.3), reduced)}
              className="relative overflow-hidden group aspect-square"
            data-cursor="memory"
            >
              <Image
                src={img.src}
                alt={img.alt || "Gallery image"}
                fill
                className="object-cover staggered-image"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <ImageGrain grainOpacity={0.22} vignetteOpacity={0.22} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}


