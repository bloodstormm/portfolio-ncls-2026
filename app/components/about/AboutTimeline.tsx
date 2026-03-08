"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ease, timeline } from "./data";

export function AboutTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section className="container mx-auto px-6 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease }}
        className="mb-14"
      >
        <span className="text-xs uppercase tracking-widest text-primary font-Odasans">Experiência</span>
        <h2 className="font-Wulkan text-4xl uppercase mt-2">Trajetória</h2>
      </motion.div>

      <div ref={timelineRef} className="relative">
        {/* Trilho estático */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/10" />
        {/* Linha animada com scroll */}
        <motion.div
          className="absolute left-4 top-0 w-px bg-primary/50 origin-top"
          style={{ scaleY: lineScaleY, height: "100%" }}
        />

        <div className="flex flex-col gap-12">
          {timeline.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
              className="relative pl-14"
            >
              <motion.span
                className="absolute left-[11px] top-1.5 w-3 h-3 rounded-full border-2 border-background"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "backOut" }}
                style={{ backgroundColor: item.color, boxShadow: `0 0 0 3px ${item.color}33` }}
              />

              <div className="rounded-2xl border border-primary/15 bg-background/60 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-Odasans text-lg" style={{ color: item.color }}>{item.company}</h3>
                    <p className="text-sm font-medium text-foreground/90">{item.role}</p>
                  </div>
                  <span className="text-xs text-muted border border-primary/15 px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                )}

                {item.subroles && (
                  <div className="flex flex-col gap-5">
                    {item.subroles.map((sub, j) => (
                      <div key={sub.title}>
                        {j > 0 && <div className="h-px bg-primary/10 mb-5" />}
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                          <p className="text-sm font-medium text-foreground/90">{sub.title}</p>
                          <span className="text-[10px] text-muted/60 font-Odasans uppercase tracking-wide">
                            {sub.period}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-1.5">
                          {sub.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2 text-sm text-muted leading-relaxed">
                              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
