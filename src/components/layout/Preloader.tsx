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
const EXIT_MS  = 1300;

type Phase = "greet" | "brand" | "choice" | "exit" | "done";

type Props = {
  onDone: () => void;
  onChoice: (yes: boolean) => void;
};

export function Preloader({ onDone, onChoice }: Props) {
  const [idx, setIdx]     = useState(0);
  const [phase, setPhase] = useState<Phase>("greet");
  const onDoneRef   = useRef(onDone);
  const onChoiceRef = useRef(onChoice);
  onDoneRef.current   = onDone;
  onChoiceRef.current = onChoice;

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
      t = setTimeout(() => setPhase("choice"), 950);
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

  function handleChoice(yes: boolean) {
    onChoiceRef.current(yes);
    setPhase("exit");
  }

  const exiting    = phase === "exit";
  const isMabuhay  = idx === GREETINGS.length - 1;
  const showBrand  = phase === "brand";
  const showChoice = phase === "choice" || phase === "exit";

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden" aria-hidden="true">

      {/* Back layer — caramel gold, exits last */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#a27e43" }}
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={
          exiting
            ? { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.18 }
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
            ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
      >
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <div className="relative w-full" style={{ height: "320px" }}>

            {/* STAGE 1 — Greeting cycle */}
            <AnimatePresence>
              {phase === "greet" && (
                <motion.div
                  key="stage-greet"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-8"
                  exit={{
                    opacity: 0,
                    y: -80,
                    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
                  }}
                >
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

                  <div className="flex gap-2" aria-hidden="true">
                    {GREETINGS.map((_, i) => (
                      <motion.span
                        key={i}
                        className="block rounded-full"
                        animate={{
                          opacity: i === idx ? 0.55 : 0.10,
                          scale:   i === idx ? 1.4  : 1,
                        }}
                        transition={{ duration: 0.18 }}
                        style={{ width: 4, height: 4, backgroundColor: "#fff8f6" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 2 — Brand reveal */}
            <AnimatePresence>
              {showBrand && (
                <motion.div
                  key="stage-brand"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
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

            {/* STAGE 3 — Ambience choice */}
            <AnimatePresence>
              {showChoice && (
                <motion.div
                  key="stage-choice"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-7"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Label */}
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-px" style={{ backgroundColor: "#a27e43" }} />
                    <span
                      className="font-label-caps text-[8px] uppercase tracking-[0.45em]"
                      style={{ color: "rgba(255,248,246,0.35)" }}
                    >
                      One more thing
                    </span>
                    <div className="w-5 h-px" style={{ backgroundColor: "#a27e43" }} />
                  </div>

                  {/* Question */}
                  <p
                    className="font-headline-md uppercase tracking-[0.06em] text-center leading-snug"
                    style={{ fontSize: "clamp(18px, 2.8vw, 30px)", color: "rgba(255,248,246,0.88)" }}
                  >
                    Step inside<br />with cafe ambience?
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 w-full max-w-[300px]">
                    <button
                      aria-hidden="false"
                      onClick={() => handleChoice(true)}
                      className="w-full py-4 px-6 font-label-caps text-[9px] uppercase tracking-[0.22em] text-left transition-opacity hover:opacity-85"
                      style={{ backgroundColor: "rgba(255,248,246,0.92)", color: "#1B0F0A" }}
                    >
                      Enter With Ambience
                    </button>
                    <button
                      aria-hidden="false"
                      onClick={() => handleChoice(false)}
                      className="w-full py-4 px-6 font-label-caps text-[9px] uppercase tracking-[0.22em] text-left transition-colors hover:border-white/40"
                      style={{ border: "1px solid rgba(255,248,246,0.18)", color: "rgba(255,248,246,0.45)" }}
                    >
                      Continue Silent
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
