"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLenis } from "@/app/components/SmoothScrollProvider";
import HeroImage from "@/public/images/homepage.webp";

const MARQUEE_ITEMS = 6;
const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const t = useTranslations("home");
  const sectionRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis();

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenisRef]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={sectionRef} className="relative min-h-screen -mt-20 flex flex-col justify-end overflow-hidden">

      {/* Parallax (scroll) — isolado da entrada para não disputar o mesmo transform */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        {/* Zoom + fade de entrada */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
          className="relative h-full w-full"
        >
          <Image
            src={HeroImage}
            alt="Nícolas Malachias"
            fill
            sizes="(max-width: 768px) 300vw, 100vw"
            quality={90}
            className="object-cover object-top"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.3 }}
        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/0"
      />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.7 }}
        className="relative z-10 text-white/60 text-xs uppercase tracking-[0.25em] font-Odasans px-6 lg:px-8 mb-4 container mx-auto w-full"
      >
        {t("heroSubtitle")}
      </motion.p>

      {/* Marquee name */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.9 }}
        className="relative z-10 w-full overflow-hidden pb-36 md:pb-24"
      >
        <div className="flex w-max animate-[marquee_40s_linear_infinite]">
          {Array.from({ length: MARQUEE_ITEMS }).map((_, i) => (
            <span
              key={i}
              className="font-poppins tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[13rem] text-white whitespace-nowrap pr-16 md:pr-24"
            >
              Nícolas Malachias –
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-3 z-10"
      >
        <div className="h-12 w-px bg-white/20" />
        <span className="text-white/30 text-[10px] uppercase tracking-widest">scroll</span>
      </motion.div>
    </section>
  );
}
