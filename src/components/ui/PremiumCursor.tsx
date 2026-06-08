"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useReducedMotion, useIsDesktop } from "@/lib/hooks";

const DARK_CLASS_HINTS = [
  "bg-primary",
  "bg-primary-container",
  "menu-board-texture",
  "text-white",
];

function labelFor(element: Element | null) {
  const hit = element?.closest("a, button, [role='button'], [data-cursor]");
  if (!hit) return "";

  const explicit = hit.getAttribute("data-cursor");
  if (explicit) return explicit.toUpperCase();

  if (hit.matches("a, button, [role='button']")) return "GO";
  return "";
}

function isDarkContext(element: Element | null) {
  let node: Element | null = element;

  while (node && node !== document.documentElement) {
    const className = typeof node.className === "string" ? node.className : "";
    if (DARK_CLASS_HINTS.some((hint) => className.includes(hint))) return true;

    const style = window.getComputedStyle(node);
    const bg = style.backgroundColor;
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (alpha > 0.25) {
        const r = Number(match[1]);
        const g = Number(match[2]);
        const b = Number(match[3]);
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        return luminance < 0.42;
      }
    }

    node = node.parentElement;
  }

  return false;
}

export function PremiumCursor() {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [darkContext, setDarkContext] = useState(false);
  const hasAppeared = useRef(false);
  const lastTheme = useRef(false);
  const lastLabel = useRef("");

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const opacity = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 620, damping: 44, mass: 0.28 });
  const y = useSpring(rawY, { stiffness: 620, damping: 44, mass: 0.28 });

  useEffect(() => {
    if (!isDesktop || reduced) return;

    document.documentElement.classList.add("custom-cursor");

    const updateTarget = (target: Element | null) => {
      const nextLabel = labelFor(target);
      if (nextLabel !== lastLabel.current) {
        lastLabel.current = nextLabel;
        setLabel(nextLabel);
        setExpanded(Boolean(nextLabel));
      }

      const nextTheme = isDarkContext(target);
      if (nextTheme !== lastTheme.current) {
        lastTheme.current = nextTheme;
        setDarkContext(nextTheme);
      }
    };

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!hasAppeared.current) {
        hasAppeared.current = true;
        opacity.set(1);
      }
    };

    const onOver = (e: MouseEvent) => {
      updateTarget(e.target as Element | null);
    };

    const onLeave = () => {
      opacity.set(0);
      hasAppeared.current = false;
    };

    const onEnter = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      opacity.set(1);
      hasAppeared.current = true;
      updateTarget(e.target as Element | null);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isDesktop, reduced, rawX, rawY, opacity]);

  if (!isDesktop || reduced) return null;

  const dotColor = darkContext ? "#FAF3E6" : "#1B0F0A";
  const ringColor = darkContext ? "rgba(250,243,230,0.82)" : "rgba(27,15,10,0.72)";
  const labelColor = darkContext ? "#1B0F0A" : "#FAF3E6";

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <motion.div
        animate={{
          width: expanded ? 46 : 24,
          height: expanded ? 46 : 24,
          borderColor: ringColor,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          opacity,
          borderRadius: "50%",
          border: "1px solid",
          mixBlendMode: "difference",
          boxShadow: darkContext
            ? "0 0 0 1px rgba(27,15,10,0.10)"
            : "0 0 0 1px rgba(250,243,230,0.18)",
        }}
      />

      <motion.div
        animate={{
          width: expanded ? 28 : 7,
          height: expanded ? 28 : 7,
          backgroundColor: dotColor,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          opacity,
          position: "absolute",
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          boxShadow: "0 1px 10px rgba(0,0,0,0.16)",
        }}
      />

      <AnimatePresence mode="wait">
        {expanded && label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.14 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "6.5px",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: labelColor,
              whiteSpace: "nowrap",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
