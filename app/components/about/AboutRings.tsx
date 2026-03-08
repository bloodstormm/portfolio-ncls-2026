"use client";

import { motion } from "framer-motion";

export function AboutRings() {
  return (
    <>
      {[0, 1, 2].map((ringIndex) => (
        <motion.div
          key={`about-bl-${ringIndex}`}
          className="pointer-events-none absolute rounded-full border border-primary/20"
          style={{
            width: 180 + ringIndex * 90,
            height: 180 + ringIndex * 90,
            bottom: -(90 + ringIndex * 45),
            left: -(90 + ringIndex * 45),
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.12, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 5 + ringIndex * 0.9,
            delay: ringIndex * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}
      {[0, 1, 2].map((ringIndex) => (
        <motion.div
          key={`about-tr-${ringIndex}`}
          className="pointer-events-none absolute rounded-full border border-primary/15"
          style={{
            width: 160 + ringIndex * 80,
            height: 160 + ringIndex * 80,
            top: -(80 + ringIndex * 40),
            right: -(80 + ringIndex * 40),
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.1, 0.35] }}
          transition={{
            repeat: Infinity,
            duration: 6 + ringIndex * 0.7,
            delay: 0.3 + ringIndex * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
