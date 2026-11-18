"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const FADE_OUT_MS = 280;
const FADE_IN_MS = 500;

/**
 * Fades the page out before an internal navigation and fades the next one in.
 * The App Router swaps pages instantly, so the exit is done by holding the
 * navigation until the fade-out has finished.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Leave: intercept clicks on internal links
  useEffect(() => {
    let pending: ReturnType<typeof setTimeout> | undefined;
    let failsafe: ReturnType<typeof setTimeout> | undefined;

    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (including #anchors): nothing to transition
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      clearTimeout(pending);
      clearTimeout(failsafe);
      wrapper.style.transition = `opacity ${FADE_OUT_MS}ms ease-in`;
      wrapper.style.opacity = "0";
      pending = setTimeout(() => {
        router.push(url.pathname + url.search + url.hash);
      }, FADE_OUT_MS);
      // Never leave the page hidden if the navigation does not happen
      failsafe = setTimeout(() => {
        wrapper.style.opacity = "1";
      }, 5000);
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(pending);
      clearTimeout(failsafe);
    };
  }, [router]);

  // Enter: the new page is in place, fade it in
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    // First load: the page is already on screen, no fade
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    wrapper.style.transition = "none";
    wrapper.style.opacity = "0";
    const frame = requestAnimationFrame(() => {
      wrapper.style.transition = `opacity ${FADE_IN_MS}ms ease-out`;
      wrapper.style.opacity = "1";
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <div ref={wrapperRef}>{children}</div>;
}
