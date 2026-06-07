"use client";

import { type ElementType } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

type Props = {
  as?: ElementType;
  children: string;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
};

const containerVariants = (delay: number, stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  id,
  delay = 0,
  stagger = 0.08,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag id={id} className={className}>{children}</Tag>;
  }

  const words = children.split(" ");

  return (
    <Tag id={id} className={className}>
      <motion.span
        variants={containerVariants(delay, stagger)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ display: "block" }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            style={{ display: "inline-block" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
