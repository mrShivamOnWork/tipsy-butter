"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAmbience } from "@/lib/ambience-context";

const BAR_HEIGHTS = [3, 6, 4, 7, 3];
const MOUNT_DELAY_MS = 5000;

export function AudioToggle() {
  const { enabled, hasChoice, toggle } = useAmbience();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay appearance until after preloader + prompt have had space
    const t = setTimeout(() => setMounted(true), MOUNT_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Don't render until hasChoice is made (avoids competing with the prompt)
  if (!mounted || !hasChoice) return null;

  return (
    <AnimatePresence>
      <motion.button
        key="audio-toggle"
        onClick={toggle}
        aria-label={enabled ? "Mute cafe ambience" : "Enable cafe ambience"}
        title={enabled ? "Ambience on — click to mute" : "Ambience off — click to enable"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 left-6 z-[100] flex items-center gap-2.5 bg-surface/92 backdrop-blur-sm border border-outline/20 px-3.5 py-2.5 shadow-sm hover:border-outline/50 hover:shadow-md transition-all group"
      >
        {/* Animated sound-wave bars */}
        <div className="flex items-end gap-[2.5px] h-[10px]" aria-hidden="true">
          {BAR_HEIGHTS.map((resting, i) => (
            <motion.span
              key={i}
              animate={
                enabled
                  ? {
                      height: [`${resting}px`, `${resting + 5}px`, `${resting}px`],
                      opacity: 1,
                    }
                  : { height: `${resting}px`, opacity: 0.35 }
              }
              transition={
                enabled
                  ? {
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.11,
                      ease: "easeInOut",
                    }
                  : { duration: 0.3 }
              }
              style={{
                display: "block",
                width: "2px",
                height: `${resting}px`,
                backgroundColor: "#1B0F0A",
                borderRadius: "1px",
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>

        {/* Label */}
        <span className="font-label-caps text-primary text-[9px] uppercase tracking-[0.15em] leading-none">
          {enabled ? "Ambience" : "Silent"}
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
