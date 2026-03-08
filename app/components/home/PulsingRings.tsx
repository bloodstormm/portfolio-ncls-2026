"use client";

import { motion } from "framer-motion";

export function PulsingRings() {
  return (
    <>
      {[0, 1, 2, 3].map((ringIndex) => (
        <motion.div
          key={`bl-${ringIndex}`}
          className="pointer-events-none absolute rounded-full border border-primary/30"
          style={{
            width: 200 + ringIndex * 100,
            height: 200 + ringIndex * 100,
            bottom: -(100 + ringIndex * 50),
            left: -(100 + ringIndex * 50),
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{
            repeat: Infinity,
            duration: 4 + ringIndex * 0.8,
            delay: ringIndex * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
      {[0, 1, 2, 3].map((ringIndex) => (
        <motion.div
          key={`tr-${ringIndex}`}
          className="pointer-events-none absolute rounded-full border border-primary/25"
          style={{
            width: 180 + ringIndex * 90,
            height: 180 + ringIndex * 90,
            top: -(90 + ringIndex * 45),
            right: -(90 + ringIndex * 45),
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 5 + ringIndex * 0.7,
            delay: 0.4 + ringIndex * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
