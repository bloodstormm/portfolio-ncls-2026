"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/app/components/ui/button";
import { DotGrid, Rings } from "./Decor";
import { RESUME_URL, WHATSAPP_URL } from "./links";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
});

export function HomeCards() {
  const t = useTranslations("home");
  const locale = useLocale();
  const title = "font-Wulkan text-[clamp(2.25rem,4.2vw,3.75rem)] leading-none";

  return (
    <section className="container mx-auto grid gap-6 px-6 pb-24 md:grid-cols-2 md:pb-40 lg:px-8">
      <motion.div
        {...reveal(0)}
        className="relative flex min-h-[19rem] flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-espresso p-8 text-[#F4EEE6] md:p-11"
      >
        <Rings className="absolute -bottom-28 -right-24 h-80 w-80 text-[#CCA37D]/40" />
        <div className="relative">
          <h2 className={title}>{t("card1Title")}</h2>
          <p className="mt-4 max-w-[34ch] text-lg text-pretty text-[#F4EEE6]/70">
            {t("card1Text")}
          </p>
        </div>
        <Button asChild size="pill" className="relative self-start">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            {t("cta")}
          </a>
        </Button>
      </motion.div>

      <motion.div
        {...reveal(0.1)}
        className="relative flex min-h-[19rem] flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-secondary p-8 md:p-11"
      >
        <DotGrid className="absolute -bottom-16 -right-16 h-72 w-72 text-primary/60" />
        <div className="relative">
          <h2 className={title}>{t("card2Title")}</h2>
          <p className="mt-4 max-w-[36ch] text-lg text-pretty text-muted-foreground">
            {t("card2Text")}
          </p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <Button asChild size="pill">
            <a
              href={RESUME_URL[locale === "en" ? "en" : "pt"]}
              target="_blank"
              rel="noreferrer"
            >
              {t("card2Cta")}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="pill">
            <Link href="/about">{t("about")}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
