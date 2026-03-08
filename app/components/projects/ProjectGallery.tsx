"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import { Lightbox } from "./Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="container mx-auto px-6 pb-24 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-0.5 bg-primary rounded-full" />
          <span className="text-sm uppercase tracking-widest text-muted font-medium">Galeria</span>
        </div>

        {/* Primeira imagem — largura total */}
        <div
          className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
          style={{ aspectRatio: "16/7" }}
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={images[0]}
            alt={`${title} - 1`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
              <BsArrowUpRight className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Imagens restantes — grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.slice(1).map((imageUrl, i) => (
              <div
                key={imageUrl}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "4/3" }}
                onClick={() => setLightboxIndex(i + 1)}
              >
                <Image
                  src={imageUrl}
                  alt={`${title} - ${i + 2}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <BsArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
