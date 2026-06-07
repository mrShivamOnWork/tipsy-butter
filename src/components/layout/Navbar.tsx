"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "bg-surface/92 backdrop-blur-md border-b border-on-surface/5 py-3 shadow-sm"
          : "bg-surface/90 backdrop-blur-md border-b border-on-surface/5 py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between gap-8">

        {/* Brand mark */}
        <Link
          href="/"
          aria-label="The Tipsy Butter — home"
          className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity"
        >
          <div className="relative w-7 h-7 shrink-0">
            <Image
              src="/images/logo/clean-logo-concept.png"
              alt=""
              fill
              className="object-contain"
              sizes="28px"
              priority
            />
          </div>
          <span className="font-headline-xl font-extrabold text-[20px] md:text-[24px] text-primary uppercase tracking-[-0.02em] leading-none">
            THE TIPSY BUTTER
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {siteConfig.nav.slice(1).map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label-caps text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 relative group py-1 ${
                  active
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/visit"
          className="hidden md:inline-flex items-center px-6 py-2.5 font-label-caps text-[10px] uppercase tracking-[0.12em] bg-primary text-on-primary hover:opacity-80 transition-all duration-200 active:scale-95 rounded-full shrink-0"
        >
          Plan Your Visit
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden p-2 flex flex-col gap-[5px] text-on-surface hover:text-primary transition-colors"
        >
          <motion.span
            initial={{ rotate: 0, y: 0 }}
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="block w-5 h-[1.5px] bg-current"
          />
          <motion.span
            initial={{ opacity: 1 }}
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="block w-5 h-[1.5px] bg-current"
          />
          <motion.span
            initial={{ rotate: 0, y: 0 }}
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="block w-5 h-[1.5px] bg-current"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden bg-surface/98 backdrop-blur-md border-t border-on-surface/5 md:hidden"
          >
            <nav className="px-6 py-5 flex flex-col gap-1" aria-label="Mobile navigation">
              {siteConfig.nav.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-label-caps text-[11px] uppercase tracking-[0.1em] py-3.5 px-4 rounded transition-all ${
                      active
                        ? "text-primary bg-surface-container-low"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/visit"
                className="mt-3 bg-primary text-on-primary py-3.5 px-4 font-label-caps text-[11px] uppercase tracking-[0.12em] text-center hover:opacity-80 transition-all rounded-full"
              >
                Plan Your Visit
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
