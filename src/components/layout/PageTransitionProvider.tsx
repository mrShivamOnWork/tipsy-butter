"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const COVER_MS = 400;

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayKey, setOverlayKey] = useState(0);
  const navigating = useRef(false);
  const pendingHref = useRef<string | null>(null);

  // Close overlay as soon as the new route is confirmed in the pathname.
  // No "covered" gate — that gate caused a race where fast Turbopack navigations
  // updated pathname before covered=true, making setShowOverlay(false) never fire.
  useEffect(() => {
    if (!pendingHref.current) return;
    if (pathname !== pendingHref.current) return;

    pendingHref.current = null;
    const t = setTimeout(() => {
      setShowOverlay(false);
      navigating.current = false;
    }, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;

    const handleClick = (e: MouseEvent) => {
      if (navigating.current) return;

      const anchor = (e.target as Element)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        anchor.target === "_blank" ||
        e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
      ) return;

      if (href === pathname) return;

      e.preventDefault();
      e.stopPropagation();

      navigating.current = true;
      pendingHref.current = href;
      setOverlayKey((k) => k + 1);
      setShowOverlay(true);

      setTimeout(() => {
        router.push(href);
      }, COVER_MS);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router, reduced, pathname]);

  return (
    <>
      {children}

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key={overlayKey}
            className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            {/* Espresso curtain — drops from top */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "#1B0F0A" }}
              initial={{ y: "-100%" }}
              animate={{
                y: "0%",
                transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] },
              }}
              exit={{
                y: "-105%",
                borderBottomLeftRadius: "50vw",
                borderBottomRightRadius: "50vw",
                transition: { duration: 0.52, ease: [0.24, 1, 0.76, 0], delay: 0.04 },
              }}
            />

            {/* Brand mark — appears once curtain is fully down */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.30, duration: 0.16 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.10 },
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-5 h-px" style={{ backgroundColor: "#a27e43" }} />
                  <span
                    className="font-label-caps text-[7px] uppercase tracking-[0.52em]"
                    style={{ color: "rgba(255,248,246,0.3)" }}
                  >
                    Est. 2024
                  </span>
                  <div className="w-5 h-px" style={{ backgroundColor: "#a27e43" }} />
                </div>
                <span
                  className="font-headline-xl font-extrabold uppercase tracking-[-0.03em] leading-none"
                  style={{ fontSize: "clamp(28px, 4.5vw, 52px)", color: "rgba(255,248,246,0.88)" }}
                >
                  The Tipsy Butter
                </span>
                <span
                  className="font-label-caps text-[7px] uppercase tracking-[0.45em]"
                  style={{ color: "rgba(255,248,246,0.25)" }}
                >
                  Cafe & Bakehouse · Digos City
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
