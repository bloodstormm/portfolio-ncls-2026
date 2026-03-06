"use client";

import { useEffect } from "react";

export default function SobreMim() {
  // Garante que a página sempre inicie no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container h-200 flex justify-center items-center mx-auto">
      <h1>Sobre Mim</h1>
    </div>
  );
}
