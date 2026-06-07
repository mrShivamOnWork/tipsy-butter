"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { ImageGrain } from "@/components/ui/ImageGrain";

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.12 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

const RITUALS = [
  {
    num: "01",
    title: "The Pour Over",
    desc: "Clean, tea-like extractions of single-origin seasonal beans.",
  },
  {
    num: "02",
    title: "The Shokupan Toast",
    desc: "Thick-cut milk bread served with our signature whipped heritage butter.",
  },
];

const SPACES = [
  {
    title: "The Open Bar",
    desc: "Watch the ritual of the slow pour. Minimalist concrete meets warm oak.",
    image: "/images/cafe/cafe_experience-1.jpg",
  },
  {
    title: "Quiet Corners",
    desc: "Nooks designed for focused work or a quiet moment with a ceramic mug.",
    image: "/images/cafe/cafe_experience-5.jpg",
  },
  {
    title: "Natural Glow",
    desc: "Soft morning light filtering through wide glass windows.",
    image: "/images/cafe/cafe_experience-9.jpg",
  },
];

export function OurCafeContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero — The Sanctuary */}
      <header className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cafe/cafe_experience-4.jpg"
            alt="The Tipsy Butter cafe sanctuary"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <ImageGrain grainOpacity={0.30} vignetteOpacity={0.2} />
        </div>

        <div className="relative z-10 px-6 md:px-10 max-w-[1440px] mx-auto w-full pt-24">
          <motion.div
            {...fadeUp(0.1, reduced)}
            className="max-w-2xl bg-surface/90 backdrop-blur-sm p-10 md:p-12 border border-outline-variant/30 rounded-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-label-caps text-on-tertiary-container bg-tertiary-fixed px-3 py-1 rounded-sm text-[10px] uppercase tracking-wider">
                SINCE DAY ONE
              </span>
              <span className="font-label-caps text-on-surface-variant tracking-[0.2em] text-[10px] uppercase">
                DIGOS CITY, PH
              </span>
            </div>
            <h1
              className="font-headline-xl font-extrabold text-primary uppercase leading-[0.92] tracking-[-0.03em] mb-8"
              style={{ fontSize: "clamp(52px, 9vw, 100px)" }}
            >
              The<br />Sanctuary
            </h1>
            <p className="font-body-lg text-on-surface max-w-lg border-l-2 border-primary pl-6 text-[15px] leading-relaxed">
              A warm space where modern minimalism meets the craft of fresh bakes.
              Your neighborhood corner for slow pours and quiet mornings.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Rituals of Coffee */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-8 items-center">

            {/* Image */}
            <motion.div
              {...fadeUp(0, reduced)}
              className="col-span-12 md:col-span-6 lg:col-span-5 order-2 md:order-1"
            >
              <div className="relative overflow-hidden shadow-2xl rounded-lg" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="/images/cafe/cafe_experience-6.jpg"
                  alt="The Tipsy Butter coffee ritual"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <ImageGrain />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              {...fadeUp(0.15, reduced)}
              className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7 order-1 md:order-2 mb-12 md:mb-0"
            >
              <span className="font-label-caps text-secondary mb-4 block text-[12px] uppercase tracking-[0.2em]">
                01 / MORNINGS
              </span>
              <h2
                className="font-headline-xl font-extrabold text-primary mb-8 uppercase leading-tight tracking-[-0.02em]"
                style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
              >
                The Slow Morning Ritual
              </h2>
              <p className="font-body-lg mb-10 text-on-surface-variant leading-relaxed text-[16px]">
                Inspired by the balanced simplicity of modern East Asian cafes, our space is designed
                for the community. We focus on the harmony of light-roast beans and the buttery layers
                of our signature heritage bakes.
              </p>
              <div className="space-y-8">
                {RITUALS.map((r, i) => (
                  <div
                    key={r.num}
                    className={`flex items-start gap-4 ${i < RITUALS.length - 1 ? "pb-6 border-b border-outline-variant" : ""}`}
                  >
                    <span className="font-headline-sm text-secondary font-bold text-lg shrink-0">{r.num}</span>
                    <div>
                      <h4 className="font-headline-sm font-bold uppercase text-[17px] text-primary mb-1">{r.title}</h4>
                      <p className="font-body-md text-on-surface-variant">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slow Mornings editorial — dark section */}
      <section className="bg-primary-container py-24 text-on-primary-container relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">

          {/* Quote header */}
          <motion.div {...fadeUp(0, reduced)} className="mb-24 text-center max-w-3xl mx-auto">
            <h2
              className="font-headline-xl font-extrabold leading-none mb-8 uppercase tracking-widest text-primary-fixed-dim"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
            >
              Slow Mornings
            </h2>
            <div className="h-px w-24 bg-outline-variant mx-auto mb-8 opacity-30" />
            <p className="font-body-lg opacity-75 italic text-[16px] leading-relaxed">
              &ldquo;The light here moves slowly, as if respecting the rising dough. A neighborhood nook
              defined by the warmth of natural wood and the quiet between conversations.&rdquo;
            </p>
          </motion.div>

          {/* 3-col editorial photo grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPACES.map((space, i) => (
              <motion.div
                key={space.title}
                {...fadeUp(i * 0.12, reduced)}
                className={`group ${i === 1 ? "md:mt-20" : ""}`}
              >
                <div className="relative overflow-hidden mb-6 aspect-square rounded-lg border border-outline-variant/20">
                  <Image
                    src={space.image}
                    alt={space.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover staggered-image"
                    style={{ filter: "sepia(0.32) saturate(0.82) contrast(0.97) brightness(1.03)" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <ImageGrain />
                </div>
                <h3 className="font-headline-sm font-bold uppercase mb-2 text-[15px] text-primary-fixed">
                  {space.title}
                </h3>
                <p className="font-body-md opacity-60 text-sm">{space.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
