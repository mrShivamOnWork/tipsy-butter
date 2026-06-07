"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { useReducedMotion } from "@/lib/hooks";

const fadeUp = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, amount: 0.12 },
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay },
      };

const HOURS = [
  { days: "Tue — Thu", time: "8:00 am — 7:00 pm" },
  { days: "Fri — Sat", time: "8:00 am — 8:00 pm", highlight: true },
  { days: "Sunday",    time: "9:00 am — 6:00 pm" },
  { days: "Monday",   time: "Closed", closed: true },
];

type FormData = { name: string; email: string; subject: string; message: string };
type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactContent() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "inquiry", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      setForm({ name: "", email: "", subject: "inquiry", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Two-col layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[92vh]">

        {/* LEFT — Brown editorial panel */}
        <div className="lg:col-span-5 bg-primary flex flex-col justify-between min-h-[70vh] lg:min-h-full px-10 md:px-14 py-16 md:py-20">

          {/* Pull quote */}
          <motion.div {...fadeUp(0.05, reduced)}>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-5 h-px" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
              <span className="font-label-caps text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
                Est. 2024 — Digos City
              </span>
            </div>
            <blockquote
              className="font-headline-xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em]"
              style={{ fontSize: "clamp(30px, 3.8vw, 50px)", color: "rgba(255,255,255,0.88)" }}
            >
              Come as<br />you are.<br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>Stay for<br />the coffee.</span>
            </blockquote>
          </motion.div>

          {/* Hours */}
          <motion.div {...fadeUp(0.12, reduced)} className="my-10">
            <span className="font-label-caps text-[9px] tracking-[0.35em] uppercase block mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Opening Hours
            </span>
            <div>
              {HOURS.map((h) => (
                <div
                  key={h.days}
                  className="flex justify-between items-baseline py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="font-body-md text-[13px]"
                    style={{
                      color: h.closed
                        ? "rgba(255,255,255,0.22)"
                        : h.highlight
                        ? "rgba(255,255,255,0.90)"
                        : "rgba(255,255,255,0.60)",
                    }}
                  >
                    {h.days}
                  </span>
                  <span
                    className="font-label-caps text-[10px] tracking-[0.08em]"
                    style={{ color: h.closed ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.38)" }}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            {...fadeUp(0.18, reduced)}
            className="rounded-2xl p-8 border"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.10)" }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="font-label-caps text-[9px] tracking-[0.3em] uppercase block mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                  Find Us
                </span>
                <h3 className="font-headline-xl font-extrabold text-xl uppercase tracking-[-0.01em]" style={{ color: "rgba(255,255,255,0.90)" }}>
                  Visit the Cafe
                </h3>
              </div>
              <div className="stamp-circle w-[52px] h-[52px] shrink-0" style={{ opacity: 0.25 }}>
                <span className="font-label-caps text-[7px] leading-tight text-center" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Digos<br />City
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.28)" }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="font-body-md text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.48)" }}>
                  {siteConfig.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.28)" }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a
                  href={siteConfig.phoneHref}
                  className="font-body-md text-[12px] transition-colors"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.28)" }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body-md text-[12px] transition-colors"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                >
                  @thetipsybutter
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Contact form */}
        <div className="lg:col-span-7 bg-background flex items-center py-16 lg:py-0">
          <div className="w-full px-8 md:px-16 max-w-2xl mx-auto pt-0 lg:pt-20">
            <motion.div {...fadeUp(0.05, reduced)}>
              <span className="font-label-caps text-secondary mb-3 block uppercase tracking-[0.2em] text-[10px]">GET IN TOUCH</span>
              <h1
                className="font-headline-xl font-extrabold text-primary uppercase tracking-[-0.02em] mb-4"
                style={{ fontSize: "clamp(36px, 6vw, 64px)" }}
              >
                Let&apos;s Connect
              </h1>
              <p className="font-body-md text-on-surface-variant mb-10 text-[15px] leading-relaxed max-w-md">
                Whether you&apos;re planning a visit, have a question, or just want to say hello — we&apos;d love to hear from you.
              </p>
            </motion.div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-10 text-center"
              >
                <div className="text-3xl mb-4">☕</div>
                <h3 className="font-headline-xl font-bold text-primary uppercase text-2xl mb-3">Message Received!</h3>
                <p className="font-body-md text-on-surface-variant text-sm">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-label-caps text-[10px] uppercase tracking-wider text-primary border-b border-primary pb-px hover:opacity-60 transition-opacity"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                {...fadeUp(0.12, reduced)}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Your Name</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange} placeholder="Maria Santos"
                      className="w-full border border-outline-variant/30 bg-surface-container-low rounded-lg px-4 py-3.5 font-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Email Address</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange} placeholder="hello@email.com"
                      className="w-full border border-outline-variant/30 bg-surface-container-low rounded-lg px-4 py-3.5 font-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">How can we help?</label>
                  <select
                    id="subject" name="subject"
                    value={form.subject} onChange={handleChange}
                    className="w-full border border-outline-variant/30 bg-surface-container-low rounded-lg px-4 py-3.5 font-body-md text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="inquiry">General Inquiry</option>
                    <option value="event">Private Event</option>
                    <option value="catering">Catering Inquiry</option>
                    <option value="custom-order">Custom Pastry Order</option>
                    <option value="press">Press & Media</option>
                    <option value="feedback">Feedback / Compliments</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Your Message</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us what you have in mind..."
                    className="w-full border border-outline-variant/30 bg-surface-container-low rounded-lg px-4 py-3.5 font-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="font-body-md text-error text-sm">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-on-primary font-label-caps py-4 rounded-full uppercase tracking-[0.12em] text-[11px] hover:opacity-85 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === "loading" ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="font-body-md text-outline/60 text-xs text-center">
                  We typically respond within 24 hours. You can also reach us on{" "}
                  <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-secondary transition-colors">
                    Facebook
                  </a>.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* Quote break — solid brown, no image */}
      <section className="bg-primary py-24 px-6 text-center">
        <motion.blockquote
          {...fadeUp(0, reduced)}
          className="font-headline-xl font-extrabold max-w-3xl mx-auto uppercase tracking-[-0.02em]"
          style={{ fontSize: "clamp(22px, 4vw, 46px)", color: "rgba(255,255,255,0.88)" }}
        >
          &ldquo;Every visit is a small celebration of the simple things.&rdquo;
        </motion.blockquote>
        <motion.cite
          {...fadeUp(0.15, reduced)}
          className="not-italic font-label-caps text-[9px] uppercase tracking-[0.3em] block mt-5"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          The Tipsy Butter — Digos City
        </motion.cite>
      </section>
    </>
  );
}
