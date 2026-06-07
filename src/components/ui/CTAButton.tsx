"use client";

import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";
import { useIsDesktop } from "@/lib/hooks";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-label-accent text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-chalk-white px-10 py-4 rounded-lg hover:bg-on-primary-fixed shadow-lg hover:shadow-xl",
  secondary:
    "border border-primary text-primary bg-transparent px-10 py-4 rounded-lg hover:bg-primary hover:text-chalk-white",
  ghost:
    "border border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-lg hover:bg-white hover:text-primary",
};

function MagneticWrapper({ children, className }: { children: ReactNode; className?: string }) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (!isDesktop) {
    return <span className={className}>{children}</span>;
  }

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setPos({ x: dx * 7, y: dy * 7 });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </span>
  );
}

export function CTAButton({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  external = false,
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const el = external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
    return <MagneticWrapper>{el}</MagneticWrapper>;
  }

  return (
    <MagneticWrapper>
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    </MagneticWrapper>
  );
}
