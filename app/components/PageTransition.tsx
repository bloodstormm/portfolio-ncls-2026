"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isVisible, setIsVisible] = useState(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsVisible(true);
        prevPathname.current = pathname;
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 150ms ease-in-out",
      }}
    >
      {displayChildren}
    </div>
  );
}
