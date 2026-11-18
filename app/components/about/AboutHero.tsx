"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsGithub, BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { DotGrid, Rings } from "@/app/components/home/Decor";
import { Button } from "@/app/components/ui/button";
import { WordsStagger } from "@/app/components/ui/words-stagger";
import AboutImage from "@/public/images/about.jpg";
import { ease, socials, stats } from "./data";

const socialIcons: Record<string, React.ReactNode> = {
  WhatsApp: <BsWhatsapp aria-hidden="true" />,
  LinkedIn: <FaLinkedinIn aria-hidden="true" />,
  "E-mail": <HiOutlineMail aria-hidden="true" />,
  GitHub: <BsGithub aria-hidden="true" />,
};

type StatKey = "stats.experience" | "stats.projects" | "stats.companies";

export function AboutHero() {
  const t = useTranslations("about");
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const titleLine = (order: number) => ({
    initial: { opacity: 0, y: "40%" },
    animate: { opacity: 1, y: "0%" },
    transition: { duration: 1, ease, delay: 0.05 + order * 0.1 },
  });

  return (
    <section className="relative overflow-hidden">
      <Rings className="absolute -right-40 -top-40 hidden h-[30rem] w-[30rem] text-primary/30 [mask-image:radial-gradient(closest-side,black_35%,transparent_98%)] md:block" />
      <DotGrid className="absolute -left-10 top-72 hidden h-64 w-64 text-primary/50 md:block" />

      <div className="container relative mx-auto px-6 pt-14 md:pt-24 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-sm font-medium text-primary md:text-base"
        >
          {t("subtitle")}
        </motion.p>

        <div className="mt-4 flex flex-col gap-8 md:mt-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <h1 className="font-Wulkan text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em]">
            <motion.span {...titleLine(0)} className="block">
              {t("aboutTitle")}
            </motion.span>
            <motion.span {...titleLine(1)} className="block text-primary">
              {t("aboutTitleName")}
            </motion.span>
          </h1>

          <div className="max-w-[46ch] lg:pt-4">
            <div className="text-base leading-relaxed text-muted-foreground md:text-lg">
              <WordsStagger delay={0.35} stagger={0.02} speed={0.5}>
                {`${t("bio")} ${t("bio2")}`}
              </WordsStagger>
            </div>
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.7 }}
              className="mt-6 flex gap-2"
            >
              {socials.map((social) => (
                <li key={social.label}>
                  <Button
                    asChild
                    variant="outline"
                    size="icon-lg"
                    className="rounded-full"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      {socialIcons[social.label]}
                    </a>
                  </Button>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <motion.div
          ref={photoRef}
          initial={{ opacity: 0, clipPath: "inset(8% 6% 8% 6% round 2rem)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
          transition={{ duration: 1.2, ease, delay: 0.35 }}
          className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[16/10] md:mt-14 lg:aspect-[16/8]"
        >
          <motion.div
            style={{ y: photoY }}
            className="absolute inset-x-0 -inset-y-[7%]"
          >
            <Image
              src={AboutImage}
              alt={t("photoAlt")}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover object-[50%_36%]"
            />
          </motion.div>
        </motion.div>

        <dl className="mt-10 grid grid-cols-3 gap-4 md:mt-14 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease, delay: index * 0.1 }}
              className="flex flex-col-reverse gap-2 border-t border-border pt-5 md:pt-6"
            >
              <dt className="text-sm text-muted-foreground md:text-base">
                {t(`stats.${stat.key}` as StatKey)}
              </dt>
              <dd className="font-Wulkan text-[clamp(2.5rem,6vw,5rem)] leading-none text-primary">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
