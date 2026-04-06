"use client";

import { useEffect } from "react";

export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);
  return null;
}
