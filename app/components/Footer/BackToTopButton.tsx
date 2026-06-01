"use client";

import { motion } from "framer-motion";
import { BsArrowUp } from "react-icons/bs";
import { useLenis } from "@/app/components/SmoothScrollProvider";

export function BackToTopButton() {
  const lenisRef = useLenis();

  function scrollToTop() {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <motion.button
      onClick={scrollToTop}
      className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 group"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      aria-label="Voltar ao topo"
    >
      <span className="text-xs uppercase tracking-widest font-Odasans">
        Topo
      </span>
      <div className="w-7 h-7 rounded-full border border-white/20 group-hover:border-white/50 flex items-center justify-center transition-colors duration-300">
        <BsArrowUp className="h-3 w-3" />
      </div>
    </motion.button>
  );
}
