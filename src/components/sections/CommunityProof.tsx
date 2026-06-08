"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

const proofCards = [
  {
    label: "Local ritual",
    text: "A warm stop for fresh bakes, coffee, and slow mornings in Digos City.",
  },
  {
    label: "Review slot",
    text: "Verified guest reviews can be featured here once collected from public channels.",
  },
  {
    label: "What to expect",
    text: "Small-batch pastries, cozy tables, and a neighborhood cafe pace.",
  },
];

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.15 },
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

export function CommunityProof() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-surface-container-low/60 px-6 py-16 md:px-10 md:py-20" aria-labelledby="community-proof-heading">
      <div className="mx-auto max-w-[1440px]">
        <motion.div {...fadeUp(0, reduced)} className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-label-caps text-[10px] uppercase tracking-[0.28em] text-secondary">
              Community proof
            </span>
            <h2
              id="community-proof-heading"
              className="mt-3 font-headline-xl text-3xl font-extrabold uppercase tracking-[-0.02em] text-primary md:text-4xl"
            >
              Loved by our Digos community
            </h2>
          </div>
          <p className="max-w-sm font-body-md text-sm leading-relaxed text-on-surface-variant md:text-right">
            A quiet review space for real guest words, kept ready without inventing names or praise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-outline-variant/30 bg-outline-variant/30 md:grid-cols-3">
          {proofCards.map((card, index) => (
            <motion.article
              key={card.label}
              {...fadeUp(index * 0.08, reduced)}
              className="bg-surface px-7 py-8 md:px-8 md:py-10"
            >
              <span className="font-label-caps text-[8px] uppercase tracking-[0.26em] text-tertiary">
                {card.label}
              </span>
              <p className="mt-5 font-body-md text-[14px] leading-relaxed text-on-surface-variant">
                {card.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
