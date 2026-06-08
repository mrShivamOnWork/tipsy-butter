"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

// 100×100 tile — tiled via CSS background-repeat.
// Small tile = denser, more uniform grain coverage across any image size.
const TILE = 100;

// 8 discrete position jumps in 0.5s = ~16 grain changes per second.
// steps() timing = no tweening, each jump is instant — exactly like film advancing.
const STEPS = 5;
const DURATION = "0.85s";

type Props = {
  grainOpacity?: number;
  vignetteOpacity?: number;
};

export function ImageGrain({
  grainOpacity = 0.26,
  vignetteOpacity = 0.28,
}: Props) {
  const grainRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Unique keyframe name per instance — prevents conflicts across multiple images
  const animId = useRef(`tbg-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    if (reduced) return;

    const id = animId.current;
    const el = grainRef.current;
    if (!el) return;

    // ── Step 1: draw warm noise to an off-screen canvas — ONE TIME, not per frame ──
    const canvas = document.createElement("canvas");
    canvas.width = TILE;
    canvas.height = TILE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(TILE, TILE);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      // Warm caramel tint — reads like analog film, not cold digital noise
      d[i]     = Math.min(255, (v * 1.09) | 0); // R: warm push
      d[i + 1] = (v * 0.97) | 0;                 // G: near-neutral
      d[i + 2] = (v * 0.79) | 0;                 // B: pull back blue
      d[i + 3] = 255;                             // Full alpha — intensity controlled by CSS opacity
    }
    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");

    // ── Step 2: generate random translate keyframes ──
    // Each step moves the tiled pattern to a new offset — looks like a new frame of grain.
    // Translate range ±TILE: pattern tiles every 100px so any offset gives a unique look.
    let kf = `@keyframes ${id}{`;
    for (let s = 0; s <= STEPS; s++) {
      const pct = Math.round((s / STEPS) * 100);
      const tx = (((Math.random() - 0.5) * 2) * TILE) | 0;
      const ty = (((Math.random() - 0.5) * 2) * TILE) | 0;
      kf += `${pct}%{transform:translate(${tx}px,${ty}px);}`;
    }
    kf += "}";

    // ── Step 3: inject keyframes ──
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-grain", id);
    styleEl.textContent = kf;
    document.head.appendChild(styleEl);

    // ── Step 4: apply tiling pattern + CSS animation ──
    el.style.backgroundImage = `url(${dataUrl})`;
    el.style.backgroundRepeat = "repeat";
    el.style.backgroundSize = `${TILE}px ${TILE}px`;
    // steps(STEPS) = discrete jumps, zero interpolation — each position is a hard cut
    el.style.animation = `${id} ${DURATION} steps(${STEPS}) infinite`;

    // ── Step 5: pause when not visible — keeps 20+ grain instances cost-free off-screen ──
    const io = new IntersectionObserver(
      ([entry]) => {
        if (el) el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0.01 }
    );
    io.observe(el);

    return () => {
      styleEl.remove();
      io.disconnect();
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      {/* Vignette — subtle dark edges pull the eye inward */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at center, transparent 34%, rgba(0,0,0,${vignetteOpacity}) 100%)`,
        }}
      />

      {/* Grain overlay — 300% size so translate never reveals a bare edge.
          Positioned at -100% top/left to center the buffer around the image. */}
      <div
        ref={grainRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100%",
          left: "-100%",
          width: "300%",
          height: "300%",
          zIndex: 5,
          pointerEvents: "none",
          opacity: grainOpacity,
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}
