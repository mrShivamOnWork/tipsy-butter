"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.2 },
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

export function QuoteSection() {
  const reduced = useReducedMotion();

  return (
    <section className="py-14 bg-surface flex flex-col items-center text-center px-6 relative overflow-hidden">
      {/* Faint coffee icon watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{ opacity: 0.025, fontSize: "18vw", lineHeight: 1 }}
      >
        ☕
      </div>

      <motion.blockquote
        {...fadeUp(0, reduced)}
        className="font-headline-xl font-extrabold text-primary max-w-3xl text-3xl md:text-4xl uppercase leading-tight px-4 tracking-[-0.02em]"
      >
        &ldquo;A cozy place where time slows down, just for a little while.&rdquo;
      </motion.blockquote>

      <motion.cite
        {...fadeUp(0.2, reduced)}
        className="mt-10 font-label-caps text-on-surface-variant not-italic tracking-[0.4em] uppercase text-[10px] font-bold"
      >
        — YOUR LOCAL NEIGHBORHOOD CAFE
      </motion.cite>
    </section>
  );
}

export function VisitSection() {
  return <QuoteSection />;
}
