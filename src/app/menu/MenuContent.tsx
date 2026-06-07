"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuCategories } from "@/data/menu";
import { useReducedMotion } from "@/lib/hooks";
import { GooeySearchBar } from "@/components/ui/GooeySearchBar";

type SortKey = "default" | "price-asc" | "price-desc" | "az";

function parsePHP(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
}

const CATEGORY_NUMS = ["01", "02", "03", "04"];

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

export function MenuContent() {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchOpen, setSearchOpen] = useState(false);

  const allSearchItems = useMemo(
    () =>
      menuCategories.flatMap((cat) =>
        cat.items.map((item) => ({
          name: item.name,
          category: cat.label,
          price: item.price,
        }))
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return menuCategories
      .filter((cat) =>
        activeCategory === "all" ? true : cat.id === activeCategory
      )
      .map((cat) => {
        let items = cat.items.filter(
          (item) =>
            !q ||
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        );
        if (sort === "price-asc") items = [...items].sort((a, b) => parsePHP(a.price) - parsePHP(b.price));
        if (sort === "price-desc") items = [...items].sort((a, b) => parsePHP(b.price) - parsePHP(a.price));
        if (sort === "az") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [query, sort, activeCategory]);

  const totalVisible = filtered.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <>
      {/* Page header */}
      <section className="px-6 md:px-10 pt-20 pb-10 max-w-[1440px] mx-auto">
        <motion.div {...(reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } })}>
          <span className="font-label-caps text-secondary text-[10px] tracking-[0.3em] uppercase block mb-4">
            Your morning favorites
          </span>
          <h1
            className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em]"
            style={{ fontSize: "clamp(48px, 9vw, 96px)" }}
          >
            The Menu
          </h1>
        </motion.div>
      </section>

      {/* Sticky controls bar — single row */}
      <div className="sticky top-[64px] z-40 bg-background/95 backdrop-blur-md border-b border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex items-center gap-4">

          {/* Gooey search — leftmost */}
          <GooeySearchBar allItems={allSearchItems} onQueryChange={setQuery} onOpenChange={setSearchOpen} />

          {/* Category pills — fade when search is open */}
          <motion.div
            className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 min-w-0"
            animate={{ opacity: searchOpen ? 0.4 : 1 }}
            transition={{ duration: 0.25 }}
          >
            {[{ id: "all", label: "All" }, ...menuCategories.map((c) => ({ id: c.id, label: c.label }))].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 font-label-caps text-[9px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-on-primary border-primary"
                    : "border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Sort — slides left when search opens */}
          <motion.div
            className="shrink-0"
            animate={{ x: searchOpen ? -14 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-outline-variant/30 bg-surface-container-low rounded-lg px-4 py-2.5 font-label-caps text-[9px] uppercase tracking-[0.12em] text-on-surface focus:outline-none focus:border-primary/40 transition-all appearance-none cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="az">A → Z</option>
            </select>
          </motion.div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 flex flex-col items-center gap-4 text-center"
            >
              <span className="font-headline-xl font-extrabold text-primary/10 text-[80px] uppercase tracking-[-0.03em]">?</span>
              <p className="font-body-md text-on-surface-variant text-sm">Nothing matches &ldquo;{query}&rdquo;</p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("all"); }}
                className="font-label-caps text-[10px] uppercase tracking-wider text-primary border-b border-primary pb-px hover:opacity-60 transition-opacity mt-2"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {filtered.map((cat, sectionIdx) => {
                const originalIdx = menuCategories.findIndex((c) => c.id === cat.id);
                const num = CATEGORY_NUMS[originalIdx] ?? "0" + (originalIdx + 1);
                return (
                  <section key={cat.id} className={sectionIdx > 0 ? "mt-20 pt-20 border-t border-outline-variant/15" : ""}>

                    {/* Category heading */}
                    <motion.div
                      {...(reduced ? {} : {
                        initial: { opacity: 0, y: 16 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.1 },
                        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                      })}
                      className="flex items-baseline gap-5 mb-12"
                    >
                      <span
                        className="font-headline-xl font-extrabold text-primary/8 uppercase tracking-[-0.02em] select-none"
                        style={{ fontSize: "clamp(48px, 7vw, 80px)" }}
                        aria-hidden="true"
                      >
                        {num}
                      </span>
                      <div>
                        <h2
                          className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em]"
                          style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
                        >
                          {cat.label}
                        </h2>
                        <span className="font-label-caps text-outline/50 text-[9px] uppercase tracking-[0.22em] mt-1 block">
                          {cat.items.length} item{cat.items.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </motion.div>

                    {/* Item grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                      {cat.items.map((item, i) => (
                        <motion.div
                          key={item.name}
                          {...(reduced ? {} : {
                            initial: { opacity: 0, y: 20 },
                            whileInView: { opacity: 1, y: 0 },
                            viewport: { once: true, amount: 0.08 },
                            transition: {
                              duration: 0.65,
                              ease: [0.22, 1, 0.36, 1],
                              delay: Math.min(i * 0.06, 0.3),
                            },
                          })}
                          className="group flex flex-col"
                        >
                          {/* Image */}
                          <div className="relative overflow-hidden mb-4 rounded-sm" style={{ aspectRatio: "3/4" }}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            {item.tag && (
                              <span className="absolute top-3 left-3 font-label-caps text-[8px] uppercase tracking-[0.15em] bg-primary text-on-primary px-2.5 py-1">
                                {item.tag}
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col gap-1.5">
                            <h3 className="font-headline-sm font-bold text-primary uppercase tracking-[-0.01em] text-[14px] leading-snug">
                              {item.name}
                            </h3>
                            <p className="font-body-md text-on-surface-variant text-[12px] leading-relaxed line-clamp-2 flex-1">
                              {item.description}
                            </p>
                            <span className="font-headline-sm text-primary text-[15px] mt-1">
                              {item.price}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        {query && filtered.length > 0 && (
          <p className="font-label-caps text-[9px] uppercase tracking-[0.2em] text-outline/40 mt-16 text-center">
            {totalVisible} result{totalVisible !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Bottom quote break */}
      <section className="bg-background py-20 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="border border-outline-variant/40 px-12 py-14 text-center w-full">
            <p
              className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 4.5vw, 60px)" }}
            >
              &ldquo;Baked fresh. Every morning. No exceptions.&rdquo;
            </p>
            <span className="font-label-caps text-on-surface-variant/60 text-[9px] uppercase tracking-[0.3em] mt-5 block">
              The Tipsy Butter — Digos City
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
