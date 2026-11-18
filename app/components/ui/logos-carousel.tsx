"use client";

/**
 * Spell UI "logos-carousel" (https://spell.sh). Groups of logos swap in and out forever.
 * Only change: the two keyframes live in globals.css instead of a styled-jsx block.
 */
import * as React from "react";
import { cn } from "@/app/lib/utils";

export interface LogosCarouselProps {
  children: React.ReactNode;
  stagger?: number;
  count?: number;
  className?: string;
  duration?: number;
  interval?: number;
  initialDelay?: number;
}

export function LogosCarousel({
  children,
  stagger = 0.14,
  count,
  className,
  duration = 600,
  interval = 2500,
  initialDelay = 500,
}: LogosCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(false);
  const [nextIndex, setNextIndex] = React.useState(1);

  const childrenArray = React.Children.toArray(children);
  const logosPerGroup = count || childrenArray.length;
  const groups: React.ReactNode[][] = [];

  for (let i = 0; i < childrenArray.length; i += logosPerGroup) {
    groups.push(childrenArray.slice(i, i + logosPerGroup));
  }

  const groupsLength = groups.length;

  React.useEffect(() => {
    const id = setTimeout(() => setAnimate(true), initialDelay);
    return () => clearTimeout(id);
  }, [initialDelay]);

  React.useEffect(() => {
    if (!animate || groupsLength === 0) return;

    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % groupsLength;
        setNextIndex((newIndex + 1) % groupsLength);
        return newIndex;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [animate, interval, groupsLength]);

  if (groupsLength === 0) return null;

  return (
    <div className="grid w-full place-items-center">
      {groups.map((group, groupIndex) => {
        const isCurrent = groupIndex === index;
        const isNext = groupIndex === nextIndex && animate;
        const isVisible = isCurrent || isNext;

        return (
          <div
            key={groupIndex}
            aria-hidden={!isVisible}
            className={cn("flex w-full justify-center gap-10", className)}
            style={{ gridArea: "1 / 1", pointerEvents: isVisible ? "auto" : "none" }}
          >
            {group.map((logo, logoIndex) => (
              <Logo
                key={logoIndex}
                state={isCurrent ? "exit" : "enter"}
                animate={animate && isVisible}
                index={logoIndex}
                stagger={stagger}
                duration={duration}
              >
                {logo}
              </Logo>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Logo({
  children,
  animate,
  index,
  state = "enter",
  stagger = 0.14,
  duration = 500,
}: {
  children: React.ReactNode;
  animate?: boolean;
  index: number;
  state?: "enter" | "exit";
  stagger?: number;
  duration?: number;
}) {
  const animationStyles: React.CSSProperties = {
    animationDelay: `${index * stagger}s`,
    animationDuration: `${duration}ms`,
    animationFillMode: "both",
  };

  if (!animate) {
    return (
      <div className={state === "enter" ? "opacity-0" : "opacity-100"} style={animationStyles}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        ...animationStyles,
        animationName: state === "enter" ? "logos-enter" : "logos-exit",
        animationTimingFunction: "ease",
      }}
    >
      {children}
    </div>
  );
}

export default LogosCarousel;
