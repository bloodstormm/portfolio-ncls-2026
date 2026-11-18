"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/app/components/ui/button";
import { WordsStagger } from "@/app/components/ui/words-stagger";
import { DotGrid, Rings } from "./Decor";

export function HomeIntro() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden">
      <Rings className="absolute left-1/2 top-1/2 h-[min(100vw,40rem)] w-[min(100vw,40rem)] -translate-x-1/2 -translate-y-1/2 text-primary/30 [mask-image:radial-gradient(closest-side,black_35%,transparent_98%)]" />
      <DotGrid className="absolute -left-10 top-10 hidden h-64 w-64 text-primary/50 md:block" />
      <DotGrid className="absolute -right-10 bottom-10 hidden h-64 w-64 text-primary/50 md:block" />
      <div className="container relative mx-auto flex flex-col items-center px-6 py-24 text-center md:py-40 lg:px-8">
        <h2 className="max-w-[16ch] font-Wulkan text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          <WordsStagger
            inView
            stagger={0.06}
            speed={0.6}
            className="justify-center"
          >
            {t("introTitle")}
          </WordsStagger>
        </h2>
        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground text-pretty md:mt-10 md:text-xl">
          {t("introText")}
        </p>
        <Button
          asChild
          variant="outline"
          size="pill"
          className="mt-10 md:mt-12"
        >
          <Link href="/about">
            {t("introCta")}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
