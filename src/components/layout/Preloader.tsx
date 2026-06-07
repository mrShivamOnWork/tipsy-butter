"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Hola",
  "やあ",
  "Hallå",
  "Guten Tag",
  "Mabuhay",
] as const;

const CYCLE_MS = 500;  // each greeting stays long enough to read
const HOLD_MS  = 1400; // extra hold on "Mabuhay"
const EXIT_MS  = 1400;

type Phase = "greet" | "brand" | "exit" | "done";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("greet");
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === "greet") {
      if (idx < GREETINGS.length - 1) {
        t = setTimeout(() => setIdx((i) => i + 1), CYCLE_MS);
      } else {
        t = setTimeout(() => setPhase("brand"), HOLD_MS);
      }
    }

    if (phase === "brand") {
      t = setTimeout(() => setPhase("exit"), 1100);
    }

    if (phase === "exit") {
      t = setTimeout(() => {
        setPhase("done");
        onDoneRef.current();
      }, EXIT_MS);
    }

    return () => clearTimeout(t);
  }, [idx, phase]);

  if (phase === "done") return null;

  const exiting = phase === "exit";
  const isMabuhay = idx === GREETINGS.length - 1;
  const showBrand = phase === "brand" || phase === "exit";

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden" aria-hidden="true">

      {/* Back layer — caramel gold, exits last */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#a27e43" }}
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={
          exiting
            ? { duration: 0.92, ease: [0.76, 0, 0.24, 1], delay: 0.18 }
            : { duration: 0 }
        }
      />

      {/* Front layer — espresso dark, exits first with curved bottom */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#1B0F0A" }}
        animate={
          exiting
            ? { y: "-100%", borderBottomLeftRadius: "55vw", borderBottomRightRadius: "55vw" }
            : { y: 0, borderBottomLeftRadius: "0%", borderBottomRightRadius: "0%" }
        }
        transition={
          exiting
            ? { duration: 0.92, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
      >
        {/* Fixed-height container — prevents layout shifts when stages swap */}
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <div className="relative w-full" style={{ height: "260px" }}>

            {/* STAGE 1: All greeting content grouped — exits as one unit */}
            <AnimatePresence>
              {!showBrand && (
                <motion.div
                  key="stage-greet"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-8"
                  exit={{
                    opacity: 0,
                    y: -80,
                    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
                  }}
                >
                  {/* Cycling greeting text */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18, transition: { duration: 0.18, ease: "easeOut" } }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="font-headline-xl font-extrabold uppercase tracking-[-0.04em] leading-none text-center select-none"
                      style={{ fontSize: "clamp(52px, 10vw, 112px)", color: "#fff8f6" }}
                    >
                      {GREETINGS[idx]}
                    </motion.span>
                  </AnimatePresence>

                  {/* Mabuhay accent — fades in on last greeting, exits with parent */}
                  <motion.div
                    className="flex items-center gap-4"
                    animate={{ opacity: isMabuhay ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <motion.div
                      className="h-px"
                      style={{ backgroundColor: "#a27e43" }}
                      animate={{ width: isMabuhay ? 28 : 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                    <span
                      className="font-label-caps text-[9px] uppercase tracking-[0.55em] whitespace-nowrap"
                      style={{ color: "rgba(255,248,246,0.3)" }}
                    >
                      The Tipsy Butter
                    </span>
                    <motion.div
                      className="h-px"
                      style={{ backgroundColor: "#a27e43" }}
                      animate={{ width: isMabuhay ? 28 : 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </motion.div>

                  {/* Progress dots — exits with parent */}
                  <div className="flex gap-2" aria-hidden="true">
                    {GREETINGS.map((_, i) => (
                      <motion.span
                        key={i}
                        className="block rounded-full"
                        animate={{
                          opacity: i === idx ? 0.55 : 0.10,
                          scale: i === idx ? 1.4 : 1,
                        }}
                        transition={{ duration: 0.18 }}
                        style={{ width: 4, height: 4, backgroundColor: "#fff8f6" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 2: Brand reveal — slides up from below */}
            <AnimatePresence>
              {showBrand && (
                <motion.div
                  key="stage-brand"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="h-px"
                      style={{ backgroundColor: "#a27e43" }}
                      initial={{ width: 0 }}
                      animate={{ width: 32 }}
                      transition={{ duration: 0.5 }}
                    />
                    <span
                      className="font-label-caps uppercase tracking-[0.55em] text-[9px]"
                      style={{ color: "rgba(255,248,246,0.4)" }}
                    >
                      Digos City · Est. 2024
                    </span>
                    <motion.div
                      className="h-px"
                      style={{ backgroundColor: "#a27e43" }}
                      initial={{ width: 0 }}
                      animate={{ width: 32 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span
                    className="font-headline-xl font-extrabold uppercase tracking-[-0.03em] leading-none"
                    style={{ fontSize: "clamp(28px, 5vw, 56px)", color: "rgba(255,248,246,0.9)" }}
                  >
                    The Tipsy Butter
                  </span>
                  <span
                    className="font-label-caps text-[9px] uppercase tracking-[0.45em]"
                    style={{ color: "rgba(255,248,246,0.28)" }}
                  >
                    Cafe &amp; Bakehouse
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
