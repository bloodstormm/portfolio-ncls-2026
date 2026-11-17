"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/app/components/SmoothScrollProvider";

// Plays once per full page load; coming back to the home page by link skips it.
let played = false;

const HOLD_MS = 1900;
const COLUMNS = 5;
const ease = [0.76, 0, 0.24, 1] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Seconds the hero should wait before animating in. */
export function getIntroDelay() {
  return played ? 0.1 : HOLD_MS / 1000 + 0.45;
}

export function Preloader() {
  const [show, setShow] = useState(!played);
  const lenisRef = useLenis();

  useEffect(() => {
    if (played) return;

    // With reduced motion the curtain is dropped at once and the page is never locked.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = lenisRef?.current;
    if (!reduced) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
    const release = () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };

    const timer = window.setTimeout(
      () => {
        played = true;
        setShow(false);
        release();
      },
      reduced ? 0 : HOLD_MS,
    );
    return () => {
      window.clearTimeout(timer);
      release();
    };
  }, [lenisRef]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Carregando"
          className="fixed inset-0 z-[100] text-[#F4EEE6]"
          initial="hidden"
          animate="shown"
          exit="leave"
          variants={{ leave: { transition: { when: "afterChildren" } } }}
        >
          {/* Curtain: columns that lift one after the other */}
          <div aria-hidden="true" className="absolute inset-0 flex">
            {Array.from({ length: COLUMNS }, (_, index) => (
              <motion.span
                key={index}
                className="-mr-px h-full flex-1 bg-espresso"
                variants={{
                  leave: {
                    y: "-101%",
                    transition: {
                      duration: 0.8,
                      ease,
                      delay: 0.2 + index * 0.07,
                    },
                  },
                }}
              />
            ))}
          </div>

          {/* Logo, letter by letter, with a line that fills while the page gets ready */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            variants={{
              leave: {
                opacity: 0,
                y: -40,
                transition: { duration: 0.35, ease: "easeIn" },
              },
            }}
          >
            <p
              aria-hidden="true"
              className="flex overflow-hidden font-Odasans text-[clamp(4.5rem,17vw,13rem)] leading-none text-[#CCA37D]"
            >
              {"NCLS".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%" },
                    shown: {
                      y: "0%",
                      transition: {
                        duration: 0.9,
                        ease: easeOut,
                        delay: 0.2 + index * 0.09,
                      },
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </p>

            <span className="mt-8 block h-px w-[min(60vw,22rem)] overflow-hidden bg-[#F4EEE6]/15">
              <motion.span
                className="block h-full origin-left bg-[#CCA37D]"
                variants={{
                  hidden: { scaleX: 0 },
                  shown: {
                    scaleX: 1,
                    transition: {
                      duration: HOLD_MS / 1000 - 0.3,
                      ease: [0.65, 0, 0.35, 1],
                      delay: 0.2,
                    },
                  },
                }}
              />
            </span>

            <motion.p
              className="mt-6 text-sm tracking-[0.08em] text-[#F4EEE6]/60"
              variants={{
                hidden: { opacity: 0, y: 10 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: easeOut, delay: 0.7 },
                },
              }}
            >
              Design &amp; Front-end
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
