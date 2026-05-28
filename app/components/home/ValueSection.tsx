"use client";

import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";

const services = ["design", "dev", "strategy"] as const;

export function ValueSection() {
  const t = useTranslations("home");

  return (
    <section className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-16 xl:gap-24 items-start">

        {/* Left — statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7 md:sticky md:top-32"
        >
          <span className="text-primary text-xs uppercase tracking-widest font-Odasans">
            {t("valueSectionLabel")}
          </span>
          <h2 className="font-Wulkan text-4xl md:text-5xl uppercase leading-tight">
            {t("valueSectionTitle")}
          </h2>
          <p className="text-foreground/60 text-base md:text-lg leading-relaxed">
            {t("valueSectionDesc")}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            {t("valueCta")}
            <BsArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Right — numbered service list */}
        <div className="divide-y divide-foreground/10 border-t border-foreground/10">
          {services.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="py-8 flex gap-6 items-start group"
            >
              <span className="font-Odasans text-xs text-primary tabular-nums mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="space-y-2">
                <h3 className="font-medium text-base">{t(`services.${key}`)}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">
                  {t(`services.${key}Desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
