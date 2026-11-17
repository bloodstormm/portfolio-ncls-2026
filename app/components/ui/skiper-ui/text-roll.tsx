"use client";

/**
 * Adapted from Skiper UI "skiper58" (TextRoll), https://skiper-ui.com, by @gurvinder-singh02.
 * Each letter rolls up and its copy rolls in from below. Changed for this site: it does not
 * listen to hover itself — it reacts to the "hovered" variant of a motion parent, so a whole
 * row can trigger it — and it stays on one line.
 */
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

export function TextRoll({
  children,
  className,
  stagger = 0.012,
}: {
  children: string;
  className?: string;
  stagger?: number;
}) {
  const letters = children.split("");
  const transition = (index: number) => ({
    duration: 0.45,
    ease: [0.65, 0, 0.35, 1] as const,
    delay: stagger * index,
  });

  return (
    <span
      className={cn("relative block overflow-hidden whitespace-pre", className)}
    >
      <span className="block">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={transition(index)}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={transition(index)}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
