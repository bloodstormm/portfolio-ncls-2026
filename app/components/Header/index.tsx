"use client";

import { useEffect, useState } from "react";
import { usePathname as useRawPathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

import { Link, useRouter, usePathname } from "@/app/i18n/navigation";
import { MenuModal } from "../MenuModal";
import { Button } from "@/app/components/ui/button";
import { ProgressiveBlur } from "@/app/components/ui/skiper-ui/progressive-blur";
import { useTheme } from "@/app/hooks/useTheme";

import { ArrowUpRight } from "lucide-react";
import { BsMoon, BsStars } from "react-icons/bs";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { transition } from "@/app/utils/Animations";

export const Header = () => {
  const pathname = usePathname(); // sem prefixo de locale, para o toggle
  const rawPathname = useRawPathname(); // com prefixo, para checar dark hero
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // No page puts a dark image under the header any more; kept as a switch for the styles below.
  const hasDarkHero = false;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "pt" ? "en" : "pt";
    router.replace(pathname, { locale: next });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.1, 0.9] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      {/* Cor que se desfaz em transparente, com o blur sumindo junto (Skiper UI) */}
      <ProgressiveBlur
        position="top"
        height="8.5rem"
        blurAmount="10px"
        backgroundColor={hasDarkHero ? "rgba(0, 0, 0, 0.45)" : "rgb(var(--background))"}
      />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{...transition, duration: 0.6 }}
          >
            <Link
              href="/"
              className="relative group"
            >
              <span className="font-Odasans text-4xl lg:text-5xl font-bold">
                <span className="text-logo transition-colors duration-300">NCLS</span>
              </span>

              {/* Underline effect */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-logo group-hover:w-full transition-all duration-300 ease-out"></div>
            </Link>
          </motion.div>

          {/* Navigation - Centralizada */}
          <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-12">
              <motion.div whileHover={{ y: -2 }} transition={{...transition, duration: 0.2 }}>
                <Link
                  href="/about"
                  className={`relative text-base font-medium transition-colors duration-300 group ${
                    hasDarkHero
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {t("about")}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300 ease-out"></div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{...transition, duration: 0.2 }}>
                <Link
                  href="/projects"
                  className={`relative text-base font-medium transition-colors duration-300 group ${
                    hasDarkHero
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {t("projects")}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300 ease-out"></div>
                </Link>
              </motion.div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{...transition}}
              onClick={toggleLocale}
              className={`p-2 rounded-xl bg-beige/10 hover:bg-beige/20 transition-colors text-xs font-Odasans font-semibold tracking-widest ${
                hasDarkHero ? "text-white/80" : "text-foreground/70"
              }`}
            >
              {locale === "pt" ? "EN" : "PT"}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{...transition}}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-beige/10 hover:bg-beige/20 transition-colors"
            >
              {theme === "light" ? (
                <BsMoon className={`h-5 w-5 transition-colors duration-300 ${hasDarkHero ? "text-white/80" : "text-foreground/70"}`} />
              ) : (
                <BsStars className={`h-5 w-5 transition-colors duration-300 ${hasDarkHero ? "text-white/80" : "text-foreground/70"}`} />
              )}
            </motion.button>

            {/* Resume Button */}
            <Button asChild className="hidden h-10 rounded-full px-6 lg:inline-flex">
              <a
                href={locale == "pt" ? "https://drive.google.com/file/d/1ipSfPNCbf07TWmZltuGgU_CpUq9fhTng/view?usp=sharing" : "https://drive.google.com/file/d/1lS1TbVDD2WYQaw_0h043cMAw2gaMWo8Q/view?usp=sharing"}
                target="_blank"
                rel="noreferrer"
              >
                {t("resume")}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>

            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-beige/10 hover:bg-beige/20 transition-colors duration-300"
            >
              <HiOutlineMenuAlt4 className={`h-6 w-6 transition-colors duration-300 ${hasDarkHero ? "text-white/80" : "text-foreground/70"}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <MenuModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.header>
  );
};
