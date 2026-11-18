"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { RESUME_URL } from "@/app/components/home/links";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import { ease, getTimeline } from "./data";

export function AboutTimeline() {
  const t = useTranslations("about");
  const th = useTranslations("home");
  const locale = useLocale();

  // One row per role, newest first
  const roles = getTimeline(locale).flatMap((item) =>
    item.subroles.map((sub) => ({
      id: `${item.company}-${sub.title}`,
      company: item.company,
      title: sub.title,
      period: sub.period.split(" · ")[0],
      bullets: sub.bullets,
    })),
  );

  return (
    <section className="container mx-auto px-6 py-20 md:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease }}
        className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
      >
        {/* Side column: stays in view while the list scrolls */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-medium text-primary md:text-base">
            {t("timelineLabel")}
          </p>
          <h2 className="mt-3 font-Wulkan text-[clamp(2.25rem,4.2vw,3.75rem)] leading-none">
            {t("timelineTitle")}
          </h2>
          <Button asChild size="pill" className="mt-8">
            <a
              href={RESUME_URL[locale === "en" ? "en" : "pt"]}
              target="_blank"
              rel="noreferrer"
            >
              {th("card2Cta")}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue={roles[0]?.id}
          className="border-t border-border"
        >
          {roles.map((role) => (
            <AccordionItem
              key={role.id}
              value={role.id}
              className="border-b border-border last:border-b"
            >
              <AccordionTrigger className="group items-center gap-6 rounded-none py-6 hover:no-underline md:py-8 [&>svg]:size-5">
                <span className="flex flex-1 flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
                  <span>
                    <span className="block font-Wulkan text-2xl leading-tight transition-colors group-hover:text-primary md:text-[2rem]">
                      {role.title}
                    </span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground md:text-base">
                      {role.company}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-normal tabular-nums text-muted-foreground">
                    {role.period}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ul className="flex max-w-[68ch] flex-col gap-3 text-base leading-relaxed text-foreground/80">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
