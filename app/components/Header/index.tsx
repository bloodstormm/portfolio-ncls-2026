"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { MenuModal } from "../MenuModal";
import { useTheme } from "@/app/hooks/useTheme";

import { MdOpenInNew } from "react-icons/md";
import { BsMoon, BsStars } from "react-icons/bs";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { transition } from "@/app/utils/Animations";

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const darkHeroPages = /^\/projects\/.+/;
  const hasDarkHero = darkHeroPages.test(pathname) && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.1, 0.9] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      {/* Background: sempre blur leve, mais sólido após scroll */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-background/80"
            : "backdrop-blur-none bg-transparent"
        }`}
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
                <span className="text-primary dark:text-secondary transition-colors duration-300">NCLS</span>
              </span>

              {/* Underline effect */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-secondary group-hover:w-full transition-all duration-300 ease-out"></div>
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
                      : "text-foreground/80 hover:text-primary dark:hover:text-secondary"
                  }`}
                >
                  Sobre mim
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300 ease-out"></div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{...transition, duration: 0.2 }}>
                <Link
                  href="/projects"
                  className={`relative text-base font-medium transition-colors duration-300 group ${
                    hasDarkHero
                      ? "text-white/90 hover:text-white"
                      : "text-foreground/80 hover:text-primary dark:hover:text-secondary"
                  }`}
                >
                  Projetos
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300 ease-out"></div>
                </Link>
              </motion.div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">

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
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{...transition, duration: 0.6}}
              href="https://drive.google.com/file/d/1XvHqOCw8e2B5hcoC4BdM8CrgqI9XcDNa/view?usp=sharing"
              target="_blank"
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-medium text-sm hover:shadow-lg transition-colors duration-300"
            >
              <span>Currículo</span>
              <MdOpenInNew className="h-4 w-4" />
            </motion.a>

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
