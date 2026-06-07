"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { menuCategories } from "@/data/menu";

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.08 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

const BOARD_CONFIG = [
  {
    id: "coffee_drinks",
    image: "/images/cafe/cafe_experience-11.jpg",
    imageAlt: "The Tipsy Butter cafe interior — where slow mornings begin",
  },
  {
    id: "croissants",
    image: "/images/menu/croissants/croissants-2.jpg",
    imageAlt: "Freshly baked almond croissant",
  },
  {
    id: "desserts",
    image: "/images/menu/desserts/desserts-1.jpg",
    imageAlt: "Basque burnt cheesecake slice",
  },
] as const;

export function MenuBoard() {
  const reduced = useReducedMotion();

  const panels = BOARD_CONFIG.map((config) => ({
    ...config,
    category: menuCategories.find((c) => c.id === config.id)!,
  }));

  return (
    <section
      className="menu-board-texture text-white py-20 px-6 md:px-10"
      aria-labelledby="daily-board-heading"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0, reduced)} className="text-center mb-14">
          <span className="font-label-caps text-white/25 text-[9px] tracking-[0.55em] uppercase block mb-4">
            Your Morning Favorites
          </span>
          <h2
            id="daily-board-heading"
            className="font-headline-xl font-extrabold uppercase tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(30px, 5.5vw, 68px)" }}
          >
            The Daily Board
          </h2>
          <div className="w-14 h-px mx-auto mt-6" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
        </motion.div>

        {/* Three category panels */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {panels.map((panel, idx) => (
            <motion.div
              key={panel.id}
              {...fadeUp(0.08 + idx * 0.1, reduced)}
              className={`flex flex-col py-8 md:py-0 ${
                idx > 0
                  ? "border-t md:border-t-0 md:border-l md:pl-10 lg:pl-14"
                  : "md:pr-10 lg:pr-14"
              } ${idx === 1 ? "md:pr-10 lg:pr-14" : ""}`}
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Product photo */}
              <div className="relative aspect-square overflow-hidden mb-8 group">
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Bottom vignette so text would sit cleanly if needed */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(27,15,10,0.55) 0%, transparent 50%)" }}
                />
              </div>

              {/* Category name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-px shrink-0" style={{ backgroundColor: "#a27e43" }} />
                <span
                  className="font-label-caps text-[9px] tracking-[0.44em] uppercase shrink-0"
                  style={{ color: "rgba(162,126,67,0.9)" }}
                >
                  {panel.category.label}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
              </div>

              {/* Items with dotted leaders */}
              <div className="space-y-[14px] flex-1">
                {panel.category.items.slice(0, 4).map((item) => (
                  <div key={item.name} className="flex items-baseline gap-2">
                    <span className="font-body-md text-white/80 text-[14px] shrink-0 leading-snug">
                      {item.name}
                    </span>
                    <span
                      className="flex-1 mx-1"
                      style={{
                        height: "1px",
                        position: "relative",
                        bottom: "4px",
                        background: "repeating-linear-gradient(to right, rgba(255,255,255,0.32) 0px, rgba(255,255,255,0.32) 3px, transparent 3px, transparent 8px)",
                      }}
                    />
                    <span
                      className="font-label-caps text-[12px] whitespace-nowrap shrink-0 tracking-[0.05em]"
                      style={{ color: "rgba(255,255,255,0.48)" }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.38, reduced)}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-[4px] font-label-caps uppercase text-[10px] tracking-[0.14em] hover:bg-tertiary-fixed transition-colors active:scale-95"
          >
            View Full Menu
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p
            className="font-label-caps text-[8.5px] tracking-[0.38em] uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Fresh bakes daily · Menu changes seasonally
          </p>
        </motion.div>

      </div>
    </section>
  );
}
