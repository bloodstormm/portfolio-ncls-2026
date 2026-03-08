"use client";

import dynamic from "next/dynamic";

const AboutRings = dynamic(
  () => import("./AboutRings").then((m) => m.AboutRings),
  { ssr: false }
);

export function AboutDecorations() {
  return (
    <div className="pointer-events-none hidden md:block">
      <AboutRings />
    </div>
  );
}
