"use client";

import { motion } from "framer-motion";
import { transition } from "@/app/utils/Animations";

export function DotGrid() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...transition, delay: 0.5 }}
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" fillOpacity="0.35" className="text-primary" />
        </pattern>
        <radialGradient id="dot-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="dot-mask">
          <rect width="100%" height="100%" fill="url(#dot-fade)" />
        </mask>
      </defs>
      <motion.rect
        width="100%"
        height="100%"
        fill="url(#dot-grid)"
        mask="url(#dot-mask)"
        animate={{ x: [0, 32] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />
    </motion.svg>
  );
}
