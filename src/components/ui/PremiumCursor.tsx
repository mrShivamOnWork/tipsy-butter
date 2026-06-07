"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useReducedMotion, useIsDesktop } from "@/lib/hooks";

export function PremiumCursor() {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  // useRef avoids a re-render on first mouse move (visible only ever goes false→true once)
  const hasAppeared = useRef(false);
  const opacity = useMotionValue(0);

  // Raw position updated immediately
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Spring-lagged position — slight easing behind the real cursor
  const x = useSpring(rawX, { stiffness: 480, damping: 38, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 480, damping: 38, mass: 0.4 });

  useEffect(() => {
    if (!isDesktop || reduced) return;

    // Hide native cursor on desktop
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!hasAppeared.current) {
        hasAppeared.current = true;
        opacity.set(1);
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      const hit = el.closest("a, button, [role='button'], [data-cursor]");
      if (hit) {
        const attr = hit.getAttribute("data-cursor");
        setLabel(attr ? attr.toUpperCase() : "GO");
        setExpanded(true);
      } else {
        setExpanded(false);
        setLabel("");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isDesktop, reduced, rawX, rawY, opacity]);

  if (!isDesktop || reduced) return null;

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
          width: expanded ? 54 : 10,
          height: expanded ? 54 : 10,
          backgroundColor: expanded ? "#1B0F0A" : "transparent",
          borderColor: "#1B0F0A",
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{
          opacity,
          borderRadius: "50%",
          border: "1.5px solid #1B0F0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {expanded && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.16 }}
              style={{
                fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "7px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#ffffff",
                whiteSpace: "nowrap",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
