"use client";

/**
 * Vertical reading progress: a line that fills as the text scrolls by, with the percentage
 * riding along it. Written for this site after the idea of Skiper UI's "Scroll progress 002"
 * (skiper94), which is a paid component and is not in the free registry.
 */
import { type RefObject } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/app/lib/utils";

export function ReadingProgress({
  target,
  className,
}: {
  /** The element whose reading progress is shown. */
  target: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.6", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });
  const top = useTransform(progress, (value) => `${value * 100}%`);
  const label = useTransform(
    progress,
    (value) => `${Math.round(value * 100)}%`,
  );
  // The percentage chip opens from the line outwards once reading starts
  const clipPath = useTransform(
    progress,
    [0, 0.04],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  return (
    <div
      aria-hidden="true"
      className={cn("relative h-48 w-px bg-border", className)}
    >
      <motion.span
        style={{ scaleY: progress }}
        className="absolute inset-0 block origin-top bg-primary"
      />
      <motion.span
        style={{ top }}
        className="absolute left-0 block -translate-y-1/2"
      >
        <span className="absolute left-0 top-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
        <motion.span
          style={{ clipPath }}
          className="ml-4 block rounded-full bg-primary px-2.5 py-1 text-xs font-medium tabular-nums text-primary-foreground"
        >
          <motion.span>{label}</motion.span>
        </motion.span>
      </motion.span>
    </div>
  );
}
