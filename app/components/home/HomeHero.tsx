"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/app/components/ui/button";
import { WordsStagger } from "@/app/components/ui/words-stagger";
import Portrait from "@/public/images/portrait.jpg";
import { getIntroDelay } from "./Preloader";

const ease = [0.16, 1, 0.3, 1] as const;

/** The two lines of the name. Rendered twice: dark on the page, light inside the photo. */
function NameLines({ delay }: { delay: number }) {
  const line = (order: number) => ({
    initial: { y: "60%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: { duration: 1.1, ease, delay: delay + order * 0.12 },
  });
  return (
    <span className="flex h-full w-full flex-col justify-end pb-[3%] font-Wulkan text-[clamp(4rem,15.2vw,14.5rem)] leading-[0.84] tracking-[-0.02em]">
      <motion.span {...line(0)} className="block self-start">
        Nícolas
      </motion.span>
      <motion.span {...line(1)} className="block self-end">
        Malachias
      </motion.span>
    </span>
  );
}

export function HomeHero() {
  const t = useTranslations("home");
  const [delay] = useState(getIntroDelay);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const rise = (order: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay: delay + 0.5 + order * 0.1 },
  });

  return (
    <section className="container mx-auto px-6 lg:px-8">
      <div className="flex min-h-[calc(100svh-5rem)] flex-col pb-10 md:pb-14">
        {/* Stage: the name runs edge to edge and changes colour where it crosses the photo */}
        <div
          ref={stageRef}
          style={
            {
              "--stage-h": "max(24rem, calc(100svh - 16.5rem))",
            } as React.CSSProperties
          }
          className="relative h-[var(--stage-h)] shrink-0 [container-type:inline-size]"
        >
          {/* Ornaments */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[72%] w-[min(60%,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
          />

          <h1 className="absolute inset-0 z-0 text-foreground">
            <NameLines delay={delay} />
          </h1>

          <motion.div
            initial={{
              opacity: 0,
              clipPath: "inset(18% 18% 18% 18% round 999px)",
            }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 999px)" }}
            transition={{ duration: 1.3, ease, delay: delay + 0.1 }}
            style={{
              height: "min(calc(var(--stage-h) - 1rem), 46rem, 132cqw)",
            }}
            className="absolute left-1/2 top-1/2 z-10 aspect-[5/8] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
          >
            <motion.div
              style={{ y: photoY }}
              className="absolute inset-x-0 top-[-18%] h-[120%]"
            >
              <Image
                src={Portrait}
                alt={t("photoAlt")}
                priority
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 34vw, 72vw"
                className="object-cover object-[52%_50%]"
              />
            </motion.div>
            {/* Same name, same position, light: only visible inside the photo */}
            <span
              aria-hidden="true"
              style={{ width: "100cqw", height: "var(--stage-h)" }}
              className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 text-[#F6F1EB] [text-shadow:0_2px_30px_rgb(0_0_0/0.35)]"
            >
              <NameLines delay={delay} />
            </span>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[26ch] text-xl leading-snug md:text-2xl">
            <WordsStagger delay={delay + 0.5} stagger={0.06} speed={0.6}>
              {t("role")}
            </WordsStagger>
          </div>
          <motion.div
            {...rise(1)}
            className="flex flex-wrap items-center gap-3"
          >
            <Button asChild size="pill">
              <a href="#projetos">
                {t("seeProjects")}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
