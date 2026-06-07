"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAmbience } from "@/lib/ambience-context";

// Shows once after the preloader clears (3.5s delay).
// Preference is saved to localStorage — prompt never re-appears.
export function AmbiencePrompt() {
  const { hasChoice, choose } = useAmbience();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasChoice) {
      // Preloader runs ~6–7s. Setting 1s means the prompt is ready and waiting
      // behind the preloader, then appears the instant it slides away.
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, [hasChoice]);

  function handleChoose(yes: boolean) {
    setVisible(false);
    // Slight delay so exit animation plays before context updates
    setTimeout(() => choose(yes), 350);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Ambience preference"
          className="fixed bottom-6 right-6 z-[150] w-80 pointer-events-auto"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-surface border border-outline/20 shadow-2xl p-6">
            {/* Decorative accent line */}
            <div className="w-8 h-px bg-tertiary mb-4" />

            <p className="font-label-caps text-[9px] text-secondary uppercase tracking-[0.2em] mb-2">
              Experience
            </p>
            <h3 className="font-headline-sm text-primary uppercase text-lg mb-3 leading-tight">
              The Tipsy Butter
            </h3>
            <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed mb-5">
              Step inside with soft cafe ambience — the gentle hum of our kitchen,
              cups clinking, and quiet corners.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleChoose(true)}
                className="w-full bg-primary text-on-primary font-label-caps text-[9px] uppercase tracking-[0.18em] py-3 px-4 hover:opacity-90 transition-opacity text-left px-5"
              >
                Enter With Ambience
              </button>
              <button
                onClick={() => handleChoose(false)}
                className="w-full border border-outline/30 text-on-surface-variant font-label-caps text-[9px] uppercase tracking-[0.18em] py-3 px-5 hover:border-outline/60 transition-colors text-left"
              >
                Continue Silent
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
