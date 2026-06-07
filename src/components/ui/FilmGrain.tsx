"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

const W = 250;
const H = 250;

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let last = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      // ~15fps — film-like cadence
      if (t - last < 66) return;
      last = t;

      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        // Per-pixel alpha: bright pixels are more visible, dark ones near-transparent
        d[i + 3] = (v * 0.25) | 0;
      }
      ctx.putImageData(img, 0, 0);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9994,
        pointerEvents: "none",
        opacity: 0.12,
      }}
    />
  );
}
