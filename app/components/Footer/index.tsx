import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/app/components/ui/button";
import { RESUME_URL, WHATSAPP_URL } from "@/app/components/home/links";
import { FooterDecoration } from "./FooterDecoration";
import { BackToTopButton } from "./BackToTopButton";

export const Footer = () => {
  const t = useTranslations("footer");
  const th = useTranslations("home");
  const locale = useLocale();

  return (
    <footer className="relative bg-espresso text-white overflow-hidden">
      <FooterDecoration />
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="border-b border-white/10 pb-14 mb-10">
          <h2 className="font-Wulkan text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.02em]">
            {t("cta")}
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-pretty text-white/60">
            {t("text")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="pill">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                {th("cta")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="pill"
              className="border-white/25 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white dark:border-white/25 dark:bg-transparent dark:hover:bg-white/10"
            >
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
          <div className="mt-10 flex items-center gap-6 text-2xl text-white/40">
            <a
              href="mailto:nicolasmalaquias2015@gmail.com"
              className="hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <HiOutlineMail />
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-malachias/"
              className="hover:text-primary transition-colors duration-300"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://twitter.com/nicmalachias"
              className="hover:text-primary transition-colors duration-300"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <BsTwitterX />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Nícolas Malachias. {t("rights")}
            </p>
            <Link
              href="/admin"
              className="text-[10px] text-white/10 hover:text-primary/40 transition-colors duration-300 select-none ml-2"
              title="Admin"
            >
              •
            </Link>
          </div>
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
};
