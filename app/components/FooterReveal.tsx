"use client";

import { useEffect, useRef, useState } from "react";

export function FooterReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Spacer that pushes content tall enough to scroll past the footer */}
      <div style={{ height }} aria-hidden="true" />
      {/* Footer pinned at bottom, behind the content layer */}
      <div ref={ref} className="fixed bottom-0 left-0 right-0 z-0">
        {children}
      </div>
    </>
  );
}
