"use client";

import dynamic from "next/dynamic";

const PulsingRings = dynamic(
  () => import("./PulsingRings").then((m) => m.PulsingRings),
  { ssr: false }
);

const DotGrid = dynamic(
  () => import("./DotGrid").then((m) => m.DotGrid),
  { ssr: false }
);

export function DesktopDecorations() {
  return (
    <div className="pointer-events-none hidden md:block">
      <PulsingRings />
      <DotGrid />
    </div>
  );
}
