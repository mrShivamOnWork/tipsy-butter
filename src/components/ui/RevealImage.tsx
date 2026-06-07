"use client";

import { type ReactNode } from "react";
import { ImageGrain } from "./ImageGrain";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;       // kept for API compat — unused
  curtainColor?: string; // kept for API compat — unused
};

// Phase 4.2: curtain+zoom removed — scroll lag fix.
// Parent motion.div fadeUp (opacity 0→1, y 20→0) provides the lightweight entrance.
// This wrapper only supplies overflow-hidden + film grain.
export function RevealImage({ children, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <ImageGrain />
    </div>
  );
}
