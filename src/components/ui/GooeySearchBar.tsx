"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface GooeyMenuItem {
  name: string;
  category: string;
  price: string;
}

interface Props {
  allItems: GooeyMenuItem[];
  onQueryChange: (q: string) => void;
  onOpenChange?: (open: boolean) => void;
}

function useDebounce<T>(value: T, delay: number): T {
  const [dv, setDv] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDv(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return dv;
}

function isBadBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  const safari =
    ua.includes("safari") &&
    !ua.includes("chrome") &&
    !ua.includes("chromium") &&
    !ua.includes("android") &&
    !ua.includes("firefox");
  return safari || ua.includes("crios");
}

function GooeyFilterDef() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id="tipsy-goo-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

export function GooeySearchBar({ allItems, onQueryChange, onOpenChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const noGoo = useMemo(() => isBadBrowser(), []);

  const [step, setStep] = useState<1 | 2>(1);
  const [localQ, setLocalQ] = useState("");
  const debouncedQ = useDebounce(localQ, 380);

  const open = () => { setStep(2); onOpenChange?.(true); };
  const close = () => { setStep(1); onOpenChange?.(false); };

  const results = useMemo(() => {
    const q = debouncedQ.toLowerCase().trim();
    if (!q) return [];
    return allItems
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [debouncedQ, allItems]);

  useEffect(() => {
    onQueryChange(localQ);
  }, [localQ, onQueryChange]);

  useEffect(() => {
    if (step === 2) {
      inputRef.current?.focus();
    } else {
      setLocalQ("");
    }
  }, [step]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="goo-wrapper">
      <GooeyFilterDef />

      <div className={noGoo ? "" : "goo-filter"}>
        <div className="goo-inner">

          {/* Results — absolute, animate downward from button */}
          <div className="goo-results-anchor">
            <AnimatePresence>
              {step === 2 &&
                results.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{
                      y: 0,
                      scale: 0.3,
                      filter: noGoo ? "none" : "blur(10px)",
                    }}
                    animate={{ y: (i + 1) * 52, scale: 1, filter: "blur(0px)" }}
                    exit={{
                      y: 0,
                      scale: 0.7,
                      opacity: 0,
                      filter: noGoo ? "none" : "blur(8px)",
                    }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.09,
                      type: "spring",
                      bounce: 0.3,
                    }}
                    className="goo-result-pill"
                    onClick={() => {
                      setLocalQ(item.name);
                      onQueryChange(item.name);
                      close();
                    }}
                  >
                    <div className="flex justify-between items-center w-full px-5">
                      <div className="text-left overflow-hidden pr-3">
                        <span
                          className="block font-headline-sm text-[11px] uppercase tracking-[-0.01em] truncate"
                          style={{ color: "rgba(255,255,255,0.90)" }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="block font-label-caps text-[8px] uppercase tracking-[0.14em]"
                          style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <span
                        className="font-headline-sm text-[12px] shrink-0"
                        style={{ color: "#BB9457" }}
                      >
                        {item.price}
                      </span>
                    </div>
                  </motion.button>
                ))}
            </AnimatePresence>
          </div>

          {/* Main pill button / input */}
          <motion.div
            className="goo-main-pill"
            initial={{ width: 160 }}
            animate={{ width: step === 1 ? 160 : 320 }}
            transition={{ duration: 0.75, type: "spring", bounce: 0.15 }}
            onClick={() => step === 1 && open()}
            role={step === 1 ? "button" : undefined}
            aria-label={step === 1 ? "Search menu" : undefined}
          >
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.span
                  key="label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-label-caps text-[10px] uppercase tracking-[0.22em] select-none"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  Search
                </motion.span>
              ) : (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  style={{ width: "100%" }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={localQ}
                    onChange={(e) => setLocalQ(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && close()}
                    placeholder="Search menu…"
                    className="goo-search-input"
                    aria-label="Search menu items"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Search icon pill — always in DOM, animate visibility to avoid DOM-removal flash */}
          <motion.button
            className="goo-icon-pill"
            onClick={step === 2 ? close : undefined}
            aria-label="Close search"
            aria-hidden={step !== 2}
            animate={
              step === 2
                ? { x: 16, opacity: 1 }
                : { x: -50, opacity: 0 }
            }
            transition={{
              delay: step === 2 ? 0.1 : 0,
              duration: 0.85,
              type: "spring",
              bounce: 0.15,
            }}
            style={{ pointerEvents: step === 2 ? "auto" : "none" }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
