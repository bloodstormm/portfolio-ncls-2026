"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export function FooterDecoration() {
  const { scrollYProgress } = useScroll();
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.82) setTriggered(true);
    });
  }, [scrollYProgress]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <motion.div
        className="absolute left-0 right-0 -bottom-50 text-center font-Odasans leading-none"
        style={{
          fontSize: "clamp(10rem, 38vw, 36rem)",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          color: "transparent",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={triggered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        NCLS
      </motion.div>
    </div>
  );
}
