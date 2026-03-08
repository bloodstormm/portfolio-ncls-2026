"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, title, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl transition-colors z-10"
        onClick={onClose}
      >
        ✕
      </button>

      {currentIndex > 0 && (
        <button
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all z-10"
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
        >
          <BsArrowLeft className="h-4 w-4" />
        </button>
      )}

      <div
        className="relative max-w-5xl w-full max-h-[85vh] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          width={1400}
          height={900}
          className="object-contain w-full h-full max-h-[85vh]"
        />
      </div>

      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all z-10"
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
        >
          <BsArrowRight className="h-4 w-4" />
        </button>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white w-4" : "bg-white/40 w-1.5"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
