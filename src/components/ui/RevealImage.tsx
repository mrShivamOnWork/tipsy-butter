"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { ImageGrain } from "./ImageGrain";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  curtainColor?: string;
};

export function RevealImage({
  children,
  className = "",
  delay = 0,
  curtainColor = "#BB9457",
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Image scale: starts slightly zoomed, normalizes as curtain lifts */}
      <motion.div
        initial={{ scale: 1.07 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: 1.3,
          ease: [0.22, 1, 0.36, 1],
          delay: delay + 0.08,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Warm grain + vignette — z-5, below the curtain at z-10 */}
      <ImageGrain />

      {/* Warm curtain — wipes from right to left (collapses rightward) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: curtainColor,
          transformOrigin: "right center",
        }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: 0.88,
          ease: [0.76, 0, 0.24, 1],
          delay,
        }}
      />
    </div>
  );
}
