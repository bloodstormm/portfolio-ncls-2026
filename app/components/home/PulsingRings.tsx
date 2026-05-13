"use client";

import { motion } from "framer-motion";

export function PulsingRings() {
  return (
    <>
      {[0, 1].map((ringIndex) => (
        <motion.div
          key={`bl-${ringIndex}`}
          className="pointer-events-none absolute rounded-full border border-primary/30"
          style={{
            width: 200 + ringIndex * 130,
            height: 200 + ringIndex * 130,
            bottom: -(100 + ringIndex * 65),
            left: -(100 + ringIndex * 65),
            willChange: "opacity",
          }}
          animate={{ opacity: [0.5, 0.15, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 5 + ringIndex,
            delay: ringIndex * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
      {[0, 1].map((ringIndex) => (
        <motion.div
          key={`tr-${ringIndex}`}
          className="pointer-events-none absolute rounded-full border border-primary/25"
          style={{
            width: 180 + ringIndex * 120,
            height: 180 + ringIndex * 120,
            top: -(90 + ringIndex * 60),
            right: -(90 + ringIndex * 60),
            willChange: "opacity",
          }}
          animate={{ opacity: [0.4, 0.1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 6 + ringIndex,
            delay: 0.4 + ringIndex * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
