"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { RevealImage } from "@/components/ui/RevealImage";
import { SplitHeading } from "@/components/ui/SplitHeading";

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.12 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

export function CafeExperience() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-24 bg-surface-container-low/50 overflow-hidden" aria-labelledby="story-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-20">

        {/* Image — left column */}
        <motion.div
          {...fadeUp(0, reduced)}
          className="relative order-2 md:order-1"
          data-cursor="view"
        >
          <RevealImage className="rounded-lg shadow-xl">
            <Image
              src="/images/cafe/cafe_experience-3.jpg"
              alt="The Tipsy Butter warm cafe interior"
              width={700}
              height={875}
              className="w-full object-cover"
              style={{ aspectRatio: "4/5" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </RevealImage>
          {/* Floating stamp */}
          <div className="absolute -bottom-5 -right-5 bg-primary p-5 hidden md:flex flex-col items-center shadow-xl rotate-2 rounded-sm z-20">
            <span className="font-label-caps text-on-primary uppercase text-[9px] font-bold tracking-[0.2em] whitespace-nowrap">
              FRESH BAKED DAILY
            </span>
          </div>
        </motion.div>

        {/* Text card — right column */}
        <motion.div
          {...fadeUp(0.15, reduced)}
          className="order-1 md:order-2"
        >
          <div className="md:-ml-12 bg-white p-10 md:p-14 shadow-xl rounded-lg relative border border-on-surface/5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-label-caps text-secondary uppercase tracking-[0.3em] font-bold text-[10px]">
                SLOW MORNINGS
              </span>
            </div>
            <SplitHeading
              as="h2"
              id="story-heading"
              className="font-headline-xl font-extrabold text-primary mb-8 text-4xl md:text-5xl uppercase leading-tight tracking-[-0.02em]"
              delay={0.2}
              stagger={0.06}
            >
              A WARMER WAY TO START YOUR DAY
            </SplitHeading>
            <p className="font-body-lg text-on-surface-variant leading-relaxed mb-10 opacity-90 text-[16px]">
              The best things take time. Our bakehouse starts early so you can take it slow.
              Here, the aroma of fresh bakes and warm coffee is the feeling of home.
              Come as you are, stay as long as you like.
            </p>
            <Link
              href="/our-cafe"
              className="inline-flex items-center gap-2 font-label-caps uppercase text-[11px] font-bold border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all group text-primary"
              data-cursor="go"
            >
              LEARN MORE ABOUT US
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
