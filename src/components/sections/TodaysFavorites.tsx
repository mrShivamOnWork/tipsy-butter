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
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

const FEATURED = [
  {
    title: "RUBY CROISSANT",
    desc: "Raspberry glaze, light and flaky.",
    price: "₱155",
    image: "/images/menu/croissants/croissants-1.jpg",
    span: "large",
  },
  {
    title: "YOUR COZY CORNER",
    desc: "A quiet, sunlit sanctuary for your slow mornings.",
    image: "/images/cafe/cafe_experience-1.jpg",
    span: "small",
  },
  {
    title: "HAND-DIPPED POUR",
    desc: "Single-origin beans, brewed with care.",
    price: "₱195",
    image: "/images/menu/coffee_drinks/coffee_drinks-1.jpg",
    span: "small",
  },
] as const;

export function TodaysFavorites() {
  const reduced = useReducedMotion();

  return (
    <section className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto bg-surface" aria-labelledby="selection-heading">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <motion.div {...fadeUp(0, reduced)}>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-label-caps text-secondary uppercase font-bold text-[10px] tracking-[0.3em]">
              ON THE COUNTER
            </span>
          </div>
          <SplitHeading
            as="h2"
            id="selection-heading"
            className="font-headline-xl font-extrabold text-primary text-4xl md:text-5xl uppercase tracking-[-0.02em]"
            delay={0.1}
            stagger={0.07}
          >
            TODAY&apos;S SELECTION
          </SplitHeading>
        </motion.div>

        <motion.p
          {...fadeUp(0.1, reduced)}
          className="font-body-md text-on-surface-variant max-w-xs text-right hidden md:block italic opacity-80 text-[15px]"
        >
          Fresh bakes made every morning in small batches. Once they&apos;re gone, they&apos;re gone until tomorrow.
        </motion.p>
      </div>

      {/* Asymmetric 12-col editorial grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Large item — 7 cols */}
        <motion.div
          {...fadeUp(0, reduced)}
          className="md:col-span-7 group cursor-default"
          data-cursor="taste"
        >
          <RevealImage className="rounded-lg" delay={0.05}>
            <Image
              src={FEATURED[0].image}
              alt={FEATURED[0].title}
              width={800}
              height={1000}
              className="w-full object-cover staggered-image"
              style={{ aspectRatio: "4/5" }}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </RevealImage>
          <div className="mt-5 flex justify-between items-start">
            <div>
              <h3 className="font-headline-xl font-bold text-2xl uppercase text-primary tracking-[-0.02em]">
                {FEATURED[0].title}
              </h3>
              <p className="font-body-md text-on-surface-variant mt-1 text-sm">
                {FEATURED[0].desc}
              </p>
            </div>
            {FEATURED[0].price && (
              <span className="font-headline-xl font-bold text-xl text-primary ml-4">
                {FEATURED[0].price}
              </span>
            )}
          </div>
        </motion.div>

        {/* Two stacked items — 5 cols */}
        <div className="md:col-span-5 flex flex-col gap-16 md:mt-16">

          <motion.div {...fadeUp(0.12, reduced)} className="group cursor-default" data-cursor="taste">
            <RevealImage className="rounded-lg border-r-[6px] border-surface-container-high" delay={0.18}>
              <Image
                src={FEATURED[1].image}
                alt={FEATURED[1].title}
                width={600}
                height={600}
                className="w-full object-cover staggered-image"
                style={{ aspectRatio: "1/1" }}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </RevealImage>
            <div className="mt-5">
              <h3 className="font-headline-xl font-bold text-2xl uppercase text-primary tracking-[-0.02em]">
                {FEATURED[1].title}
              </h3>
              <p className="font-body-md text-on-surface-variant mt-1 text-sm">
                {FEATURED[1].desc}
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.22, reduced)} className="group cursor-default self-end w-4/5" data-cursor="taste">
            <RevealImage className="rounded-lg" delay={0.28}>
              <Image
                src={FEATURED[2].image}
                alt={FEATURED[2].title}
                width={500}
                height={667}
                className="w-full object-cover staggered-image"
                style={{ aspectRatio: "3/4" }}
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </RevealImage>
            <div className="mt-4">
              <h3 className="font-headline-xl font-bold text-2xl uppercase text-primary tracking-[-0.02em]">
                {FEATURED[2].title}
              </h3>
              <p className="font-body-md text-on-surface-variant mt-1 text-sm">
                {FEATURED[2].desc}
              </p>
              {FEATURED[2].price && (
                <span className="font-headline-xl font-bold text-xl text-primary block mt-1">
                  {FEATURED[2].price}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
