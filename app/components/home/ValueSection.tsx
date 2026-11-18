"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";

export function ValueSection() {
  const t = useTranslations("home");

  return (
    <section className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8"
      >
        {/* Currently at badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-foreground/10 bg-foreground/3">
          <span className="text-xs text-foreground/50 font-Odasans uppercase tracking-widest">
            {t("currentlyAt")}
          </span>
          <Image
            src="/companies-logo/cit-logo.png"
            alt="CI&T"
            width={78}
            height={48}
            className="object-contain opacity-70"
          />
        </div>

        {/* Main statement */}
        <h2 className="font-Wulkan text-4xl md:text-5xl lg:text-6xl leading-tight">
          {t("valueSectionTitle")}
        </h2>

        {/* Description */}
        <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-xl">
          {t("valueSectionDesc")}
        </p>

        {/* CTA */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors duration-200"
        >
          {t("valueCta")}
          <BsArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </section>
  );
}
