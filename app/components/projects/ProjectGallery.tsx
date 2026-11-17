"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/app/lib/utils";
import { Lightbox } from "./Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const t = useTranslations("projectDetail");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="container mx-auto px-6 pb-20 md:pb-28 lg:px-8">
      <div className="flex items-baseline justify-between border-t border-border pt-8">
        <h2 className="font-Wulkan text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]">
          {t("gallery")}
        </h2>
        <span className="text-sm tabular-nums text-muted-foreground">
          {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {/* First image runs the full width; the rest go in pairs */}
      <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
        {images.map((imageUrl, index) => {
          const wide =
            index === 0 || (index === images.length - 1 && index % 2 === 1);
          return (
            <motion.button
              key={imageUrl}
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`${title} - ${index + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{
                duration: 0.8,
                ease,
                delay: wide ? 0 : (index % 2) * 0.08,
              }}
              className={cn(
                "group relative block aspect-[4/3] cursor-zoom-in overflow-hidden rounded-[1.5rem] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                wide && "md:col-span-2 md:aspect-[16/8] md:rounded-[2rem]",
              )}
            >
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes={
                  wide
                    ? "(min-width: 768px) 90vw, 100vw"
                    : "(min-width: 768px) 45vw, 100vw"
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 aria-hidden="true" className="size-4" />
              </span>
            </motion.button>
          );
        })}
      </div>

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
