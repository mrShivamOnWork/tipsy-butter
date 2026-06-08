"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { useReducedMotion } from "@/lib/hooks";
import { ImageGrain } from "@/components/ui/ImageGrain";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "craft" | "space" | "details";

type WallItem = {
  imgIdx: number;
  title: string;
  caption: string;
  category: Category;
  width: string;
  mt: string;
  rotation: number;
  aspect: string;
};

// ─── Memory Wall Data ─────────────────────────────────────────────────────────
// Rows: each inner array is one visual row on desktop.
// width  = percentage of the row container this item occupies
// mt     = margin-top offset to create the staggered "photos on a table" feel
// rotation = degrees; max ±1.2 — enough to feel organic, not chaotic

const WALL_ROWS: WallItem[][] = [
  [
    { imgIdx: 0,  title: "FIRST LIGHT",   caption: "Before the doors open,\nthe first trays leave the oven.",  category: "craft",   width: "57%", mt: "0px",  rotation: -0.8, aspect: "4/3"  },
    { imgIdx: 2,  title: "GOLDEN HOUR",   caption: "Still warm. Still perfect.",                                category: "craft",   width: "40%", mt: "72px", rotation:  1.2, aspect: "3/4"  },
  ],
  [
    { imgIdx: 3,  title: "A QUIET TABLE", caption: "Find your corner.\nStay awhile.",                          category: "space",   width: "42%", mt: "80px", rotation: -1.0, aspect: "4/3"  },
    { imgIdx: 6,  title: "SOFT MORNING",  caption: "Light through the windows.\nCoffee getting cold.",         category: "space",   width: "54%", mt: "16px", rotation:  0.6, aspect: "4/3"  },
  ],
  [
    { imgIdx: 7,  title: "FRESH BAKE",    caption: "From the oven to your hands.",                              category: "craft",   width: "72%", mt: "0px",  rotation: -0.5, aspect: "16/9" },
  ],
  [
    { imgIdx: 5,  title: "THE RITUAL",    caption: "Every cup, a little ceremony.",                             category: "details", width: "46%", mt: "48px", rotation:  1.0, aspect: "4/5"  },
    { imgIdx: 9,  title: "THE USUAL",     caption: "Two favorites. Every time.",                                category: "details", width: "48%", mt: "16px", rotation: -0.7, aspect: "4/3"  },
  ],
  [
    { imgIdx: 12, title: "OUR CORNER",    caption: "A piece of Digos\nworth visiting.",                        category: "space",   width: "62%", mt: "0px",  rotation:  0.8, aspect: "16/9" },
    { imgIdx: 8,  title: "SWEET THINGS",  caption: "Small indulgences\nthat make a day.",                     category: "details", width: "32%", mt: "64px", rotation: -1.2, aspect: "3/4"  },
  ],
  [
    { imgIdx: 13, title: "SLOW SIP",      caption: "Take your time.",                                          category: "details", width: "44%", mt: "24px", rotation:  0.5, aspect: "4/3"  },
    { imgIdx: 16, title: "THE DETAILS",   caption: "It's in the details.\nAlways.",                           category: "craft",   width: "48%", mt: "40px", rotation: -0.9, aspect: "4/5"  },
  ],
  [
    { imgIdx: 17, title: "FIND US",       caption: "Our little corner\nof Digos City.",                       category: "space",   width: "58%", mt: "24px", rotation:  1.1, aspect: "4/3"  },
  ],
];

const FLAT_WALL: WallItem[] = WALL_ROWS.flat();

// ─── Chapter Data ─────────────────────────────────────────────────────────────

const CHAPTERS: { number: string; title: string; description: string; category: Category }[] = [
  { number: "01", title: "THE CRAFT",   description: "Fresh pastries, careful hands,\ndaily baking rituals.",          category: "craft"   },
  { number: "02", title: "THE SPACE",   description: "Quiet tables,\nwarm corners,\nslow mornings.",                    category: "space"   },
  { number: "03", title: "THE DETAILS", description: "Small things that make\nordinary days special.",                 category: "details" },
];

// ─── Archive Layout ───────────────────────────────────────────────────────────
// Each entry maps 1:1 to galleryImages[i].
// colSpan + aspects are arranged so each desktop row sums to exactly 3 columns:
//   Row 1  [2+1]   Row 2  [1+1+1]   Row 3  [1+2]   Row 4  [1+1+1]
//   Row 5  [2+1]   Row 6  [1+1+1]   Row 7  [1+2]   Row 8  [3] full-width

const ARCHIVE_LAYOUT: { colSpan: 1 | 2 | 3; aspect: string }[] = [
  { colSpan: 2, aspect: "16/9" }, // 0  wide opener
  { colSpan: 1, aspect: "3/4"  }, // 1  portrait
  { colSpan: 1, aspect: "4/5"  }, // 2  portrait
  { colSpan: 1, aspect: "4/3"  }, // 3  landscape
  { colSpan: 1, aspect: "4/5"  }, // 4  portrait
  { colSpan: 1, aspect: "4/3"  }, // 5  landscape
  { colSpan: 2, aspect: "4/3"  }, // 6  wide landscape
  { colSpan: 1, aspect: "3/4"  }, // 7  portrait
  { colSpan: 1, aspect: "1/1"  }, // 8  square
  { colSpan: 1, aspect: "3/4"  }, // 9  portrait
  { colSpan: 2, aspect: "16/9" }, // 10 wide
  { colSpan: 1, aspect: "1/1"  }, // 11 square
  { colSpan: 1, aspect: "4/3"  }, // 12 landscape
  { colSpan: 1, aspect: "3/4"  }, // 13 portrait
  { colSpan: 1, aspect: "4/3"  }, // 14 landscape
  { colSpan: 1, aspect: "3/4"  }, // 15 portrait
  { colSpan: 2, aspect: "4/3"  }, // 16 wide
  { colSpan: 3, aspect: "21/9" }, // 17 full-width cinematic close
];

// Alternating aspects for the 2-column mobile archive grid (18 images)
const MOBILE_ARCHIVE_ASPECTS = [
  "4/5","4/3", "4/3","4/5", "4/5","1/1",
  "1/1","4/5", "4/3","4/5", "4/5","4/3",
  "4/3","4/5", "4/5","4/3", "1/1","4/5",
];

// Alternating aspects for the 2-column mobile memory wall grid (12 images)
const MOBILE_WALL_ASPECTS = [
  "4/5","4/3", "4/3","4/5", "4/5","1/1",
  "4/3","4/5", "4/5","4/3", "1/1","4/5",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fadeUp(delay = 0, reduced = false) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const, amount: 0.08 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
  };
}

function fadeIn(delay = 0, reduced = false) {
  if (reduced) return {};
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true as const, amount: 0.05 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  };
}

// ─── Memory Viewer ────────────────────────────────────────────────────────────
// Elevated lightbox: shows editorial context (label, title, caption) alongside
// the photograph. Opened from the Memory Wall only.

function MemoryViewer({
  idx,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  idx: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const card = FLAT_WALL[idx];
  const img = galleryImages[card.imgIdx];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handle);
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-6 md:p-12"
      style={{ background: "rgba(14,8,5,0.96)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.36, ease: "easeInOut" }}
      onClick={onClose}
    >
      {/* Counter */}
      <span
        className="absolute top-6 left-7 z-20 font-label-caps text-[8px] text-white/25 tracking-[0.26em] uppercase select-none pointer-events-none"
        aria-hidden="true"
      >
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close viewer"
        className="absolute top-6 right-7 z-20 font-label-caps text-[8px] text-white/30 hover:text-white/70 tracking-[0.22em] uppercase transition-colors duration-200"
      >
        ESC
      </button>

      {/* Animated content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={idx}
          className="absolute inset-0 flex items-center justify-center px-6 py-20 md:px-20 md:py-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Editorial label */}
          <span className="absolute top-12 left-1/2 -translate-x-1/2 font-label-caps text-[7px] tracking-[0.34em] text-white/25 uppercase">
            EST. 2024 — DIGOS CITY
          </span>

          {/* Photograph */}
          <div
            className="relative h-[min(62dvh,620px)] w-[min(88vw,760px)] overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 88vw, 760px"
              priority
            />
            <ImageGrain grainOpacity={0.15} vignetteOpacity={0.10} />
          </div>

          {/* Title + caption */}
          <div className="absolute bottom-8 left-1/2 z-20 flex w-[min(86vw,560px)] -translate-x-1/2 flex-col gap-2 text-center md:bottom-9">
            <h2 className="font-headline-sm text-white tracking-[0.20em] uppercase text-[15px] md:text-base">
              {card.title}
            </h2>
            <p className="font-body-sm text-white/40 text-[11px] leading-relaxed whitespace-pre-line">
              {card.caption}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev */}
      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous memory"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 flex items-center justify-center text-white/20 hover:text-white/55 transition-colors duration-200"
        >
          ←
        </button>
      )}

      {/* Next */}
      {idx < total - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next memory"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 flex items-center justify-center text-white/20 hover:text-white/55 transition-colors duration-200"
        >
          →
        </button>
      )}
    </motion.div>
    ),
    document.body
  );
}

// ─── Archive Lightbox ─────────────────────────────────────────────────────────
// Pure image-only lightbox for the Photo Archive. No editorial context — just
// the photograph at full size. Keeps browsing fast and clean.

function ArchiveLightbox({
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = galleryImages[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handle);
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${img.alt} — ${index + 1} of ${total}`}
      className="fixed inset-0 z-[10000] bg-[#0e0805]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClose}
    >
      <span
        className="absolute top-6 left-7 z-20 font-label-caps text-[8px] text-white/25 tracking-[0.26em] uppercase select-none pointer-events-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-6 right-7 z-20 font-label-caps text-[8px] text-white/30 hover:text-white/70 tracking-[0.22em] uppercase transition-colors duration-200"
      >
        ESC
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center px-5 py-16 md:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-[min(78dvh,760px)] w-[min(92vw,1180px)]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 92vw, 1180px"
              priority
            />
            <ImageGrain grainOpacity={0.12} vignetteOpacity={0} />
          </div>
        </motion.div>
      </AnimatePresence>

      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 flex items-center justify-center text-white/25 hover:text-white/65 transition-colors duration-200"
        >
          ←
        </button>
      )}
      {index < total - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 flex items-center justify-center text-white/25 hover:text-white/65 transition-colors duration-200"
        >
          →
        </button>
      )}
    </motion.div>
    ),
    document.body
  );
}

// ─── Gallery Content ──────────────────────────────────────────────────────────

export function GalleryContent() {
  const reduced = useReducedMotion();
  const archiveTotal = galleryImages.length;
  const wallTotal    = FLAT_WALL.length;

  const [viewerIdx,  setViewerIdx]  = useState<number | null>(null);
  const [archiveIdx, setArchiveIdx] = useState<number | null>(null);

  const openViewer  = useCallback((i: number) => setViewerIdx(i), []);
  const closeViewer = useCallback(() => setViewerIdx(null), []);
  const prevViewer  = useCallback(() => setViewerIdx((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextViewer  = useCallback(() => setViewerIdx((i) => (i !== null && i < wallTotal - 1 ? i + 1 : i)), []);

  const openArchive  = useCallback((i: number) => setArchiveIdx(i), []);
  const closeArchive = useCallback(() => setArchiveIdx(null), []);
  const prevArchive  = useCallback(() => setArchiveIdx((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextArchive  = useCallback(() => setArchiveIdx((i) => (i !== null && i < archiveTotal - 1 ? i + 1 : i)), []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Atmospheric full-bleed opener. Warm overlay + slow breathing image.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
        {/* Background image with the global hero-breathe animation */}
        <div className="absolute inset-0 hero-breathe">
          <Image
            src="/images/gallery/gallery-7.jpg"
            alt="Warm morning light inside The Tipsy Butter"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Warm dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/65" />
        <div className="absolute inset-0" style={{ background: "rgba(27,15,10,0.18)" }} />

        {/* Text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span
            className="font-label-caps text-[8px] tracking-[0.34em] text-white/35 uppercase mb-5"
            {...(!reduced ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.9, delay: 0.2 } } : {})}
          >
            EST. 2024 — DIGOS CITY
          </motion.span>

          <motion.h1
            className="font-headline-xl text-white uppercase leading-none tracking-[0.07em]"
            style={{ fontSize: "clamp(48px,10vw,116px)" }}
            {...(!reduced ? { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.35 } } : {})}
          >
            THE JOURNAL
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-col items-center gap-1"
            {...(!reduced ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.9, delay: 0.68 } } : {})}
          >
            <p className="font-body-md text-white/50 text-[13px] md:text-sm tracking-[0.05em]">
              Little moments from our corner of Digos.
            </p>
            <div className="mt-3 flex flex-col items-center gap-[3px]">
              {["Fresh bakes.", "Quiet tables.", "Warm coffee."].map((line) => (
                <span key={line} className="font-label-caps text-white/28 text-[9px] tracking-[0.22em] uppercase">
                  {line}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <ImageGrain grainOpacity={0.13} vignetteOpacity={0.10} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — MEMORY WALL
          Desktop: organic editorial layout — rows of images with staggered
          vertical offsets and subtle rotations. Like photos on a table.
          Mobile: simple 2-column grid, no rotation.
      ══════════════════════════════════════════════════════════════════════ */}

      {/* Desktop memory wall */}
      <section className="hidden md:block px-10 lg:px-16 xl:px-24 py-24 md:py-32 bg-[#FAF3E6]">
        <motion.div className="mb-16 flex items-center gap-4" {...fadeUp(0, reduced)}>
          <div className="w-8 h-px bg-[#BB9457]" />
          <span className="font-label-caps text-[8px] tracking-[0.30em] text-[#4f4541] uppercase">
            Memories — Vol. I
          </span>
        </motion.div>

        <div className="flex flex-col gap-14 xl:gap-16">
          {WALL_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-start gap-6 md:gap-8">
              {row.map((item, itemIdx) => {
                const flatIdx = FLAT_WALL.indexOf(item);
                const img = galleryImages[item.imgIdx];
                return (
                  <motion.div
                    key={item.imgIdx}
                    className="flex-shrink-0"
                    style={{
                      width: item.width,
                      marginTop: item.mt,
                      transform: `rotate(${item.rotation}deg)`,
                    }}
                    {...(!reduced ? {
                      initial: { opacity: 0, y: 22 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.08 },
                      transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1], delay: itemIdx * 0.12 },
                    } : {})}
                  >
                    <button
                      type="button"
                      onClick={() => openViewer(flatIdx)}
                      data-cursor="view"
                      className="relative block w-full overflow-hidden group focus-visible:outline-2 focus-visible:outline-[#1B0F0A]"
                      style={{ aspectRatio: item.aspect }}
                      aria-label={`Open memory: ${item.title}`}
                    >
                      {/* Image */}
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="(min-width: 1280px) 55vw, 65vw"
                        priority={rowIdx === 0}
                      />
                      <ImageGrain grainOpacity={0.20} vignetteOpacity={0.14} />

                      {/* Hover: gradient reveal */}
                      <div className="absolute inset-0 z-[6] bg-gradient-to-t from-black/62 via-black/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[700ms] ease-out" />

                      {/* Hover: text */}
                      <div className="absolute bottom-0 left-0 right-0 z-[7] p-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <span className="block font-label-caps text-[7px] tracking-[0.28em] text-white/40 uppercase mb-1.5">
                          {String(flatIdx + 1).padStart(2, "0")}
                        </span>
                        <span className="block font-headline-sm text-white text-[13px] tracking-[0.14em] uppercase">
                          {item.title}
                        </span>
                        <span className="block font-body-sm text-white/48 text-[10px] mt-1 leading-relaxed whitespace-pre-line">
                          {item.caption}
                        </span>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Mobile memory wall — CSS columns masonry, varied heights, true collage */}
      <section className="md:hidden" style={{ columns: 2, columnGap: "1px", background: "#1B0F0A" }}>
        {FLAT_WALL.map((item, i) => {
          const img = galleryImages[item.imgIdx];
          return (
            <button
              key={item.imgIdx}
              type="button"
              onClick={() => openViewer(i)}
              className="relative overflow-hidden block w-full focus-visible:outline-2 focus-visible:outline-[#1B0F0A]"
              style={{ aspectRatio: MOBILE_WALL_ASPECTS[i] ?? "4/3", breakInside: "avoid", marginBottom: "1px" }}
              aria-label={`Open memory: ${item.title}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="50vw"
                priority={i < 4}
              />
              <ImageGrain grainOpacity={0.18} vignetteOpacity={0.12} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent z-[6]" />
              <span className="absolute bottom-3 left-3 z-[7] font-label-caps text-[7px] tracking-[0.22em] text-white/55 uppercase">
                {item.title}
              </span>
            </button>
          );
        })}
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — MEMORY CHAPTERS
          Three editorial story categories. Minimal, no images.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 xl:px-24 py-20 md:py-28 bg-[#FAF3E6]">
        <motion.div className="mb-12 flex items-center gap-4" {...fadeUp(0, reduced)}>
          <div className="w-8 h-px bg-[#BB9457]" />
          <span className="font-label-caps text-[8px] tracking-[0.30em] text-[#4f4541] uppercase">
            Stories from the cafe
          </span>
        </motion.div>

        <div className="divide-y divide-[#d2c3be]">
          {CHAPTERS.map((ch, i) => (
            <motion.div
              key={ch.number}
              className="py-9 md:py-11 flex flex-col md:flex-row md:items-start gap-4 md:gap-14"
              {...fadeUp(i * 0.09, reduced)}
            >
              <span className="font-label-caps text-[8px] tracking-[0.28em] text-[#BB9457] uppercase md:w-12 flex-shrink-0 pt-0.5">
                {ch.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-headline-md text-[#1B0F0A] text-xl md:text-2xl tracking-[0.10em] uppercase">
                  {ch.title}
                </h3>
                <p className="font-body-md text-[#4f4541] text-sm leading-relaxed whitespace-pre-line">
                  {ch.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — PHOTO ARCHIVE
          All 18 images. Clean, simple. No hover effects. Fast.
          Purpose: visitors who just want to browse the full photo set.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 xl:px-24 py-16 md:py-24 bg-[#f4ede0]">
        <motion.div className="mb-10 flex items-center gap-4" {...fadeUp(0, reduced)}>
          <div className="w-8 h-px bg-[#BB9457]" />
          <span className="font-label-caps text-[8px] tracking-[0.30em] text-[#4f4541] uppercase">
            The full collection
          </span>
        </motion.div>

        {/* Desktop: magazine collage — varied column spans + smooth hover */}
        <div className="hidden md:grid grid-cols-3 gap-[2px]">
          {ARCHIVE_LAYOUT.map(({ colSpan, aspect }, i) => {
            const img = galleryImages[i];
            return (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => openArchive(i)}
                data-cursor="view"
                className="relative overflow-hidden group focus-visible:outline-2 focus-visible:outline-[#1B0F0A]"
                style={{ gridColumn: `span ${colSpan}`, aspectRatio: aspect }}
                aria-label={img.alt}
                {...fadeIn(Math.min(i * 0.04, 0.24), reduced)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes={colSpan === 3 ? "100vw" : colSpan === 2 ? "66vw" : "33vw"}
                  priority={i < 6}
                />
                <ImageGrain grainOpacity={0.16} vignetteOpacity={0.08} />
                <div className="absolute inset-0 z-[6] bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[700ms] ease-out" />
              </motion.button>
            );
          })}
        </div>

        {/* Mobile: CSS columns masonry — images flow naturally at their own heights */}
        <div className="md:hidden" style={{ columns: 2, columnGap: "1px" }}>
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => openArchive(i)}
              className="relative overflow-hidden block w-full focus-visible:outline-2 focus-visible:outline-[#1B0F0A]"
              style={{ aspectRatio: MOBILE_ARCHIVE_ASPECTS[i] ?? "4/3", breakInside: "avoid", marginBottom: "1px" }}
              aria-label={img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="50vw"
                priority={i < 4}
              />
              <ImageGrain grainOpacity={0.14} vignetteOpacity={0} />
            </button>
          ))}
        </div>
      </section>

      <section className="bg-primary-container px-6 py-20 text-center md:px-16 md:py-24">
        <motion.div {...fadeUp(0, reduced)} className="mx-auto max-w-3xl">
          <span className="font-label-caps text-[9px] uppercase tracking-[0.34em] text-primary-fixed-dim/45">
            Your table is waiting
          </span>
          <h2
            className="mt-5 font-headline-xl font-extrabold uppercase leading-tight tracking-[-0.02em] text-primary-fixed-dim"
            style={{ fontSize: "clamp(30px, 5vw, 58px)" }}
          >
            Create your own slow morning.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/visit"
              className="inline-flex min-w-[160px] items-center justify-center bg-primary-fixed-dim px-7 py-3.5 font-label-caps text-[10px] uppercase tracking-[0.14em] text-primary transition-colors hover:bg-tertiary-fixed"
              data-cursor="go"
            >
              Visit Cafe
            </Link>
            <Link
              href="/menu"
              className="inline-flex min-w-[160px] items-center justify-center border border-primary-fixed-dim/25 px-7 py-3.5 font-label-caps text-[10px] uppercase tracking-[0.14em] text-primary-fixed-dim transition-colors hover:border-primary-fixed-dim/55"
              data-cursor="go"
            >
              View Menu
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Memory Viewer (wall images) ── */}
      <AnimatePresence>
        {viewerIdx !== null && (
          <MemoryViewer
            idx={viewerIdx}
            total={wallTotal}
            onClose={closeViewer}
            onPrev={prevViewer}
            onNext={nextViewer}
          />
        )}
      </AnimatePresence>

      {/* ── Archive Lightbox (full collection) ── */}
      <AnimatePresence>
        {archiveIdx !== null && (
          <ArchiveLightbox
            index={archiveIdx}
            total={archiveTotal}
            onClose={closeArchive}
            onPrev={prevArchive}
            onNext={nextArchive}
          />
        )}
      </AnimatePresence>
    </>
  );
}
