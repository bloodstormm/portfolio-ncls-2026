"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BsX, BsArrowUpRight, BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";

type MenuModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Sobre mim" },
  { href: "/projects", label: "Projetos" },
];

export const MenuModal = ({ isOpen, setIsOpen }: MenuModalProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,100vw)] bg-background border-l border-beige/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-beige/20">
              <span className="font-Wulkan text-2xl uppercase text-primary tracking-wide">
                NCLS
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-beige/30 text-muted hover:text-primary hover:border-primary/40 transition-all duration-300"
              >
                <BsX className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-4 pt-8 flex-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/70 hover:bg-beige/20 hover:text-foreground"
                      }`}
                    >
                      <span className="font-Wulkan text-3xl uppercase tracking-wide leading-none">
                        {link.label}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* CV */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 + navLinks.length * 0.07 }}
                className="mt-4"
              >
                <a
                  href="https://drive.google.com/file/d/1XvHqOCw8e2B5hcoC4BdM8CrgqI9XcDNa/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-4 rounded-xl border border-beige/30 text-foreground/60 hover:border-primary/40 hover:text-primary transition-all duration-300"
                >
                  <span className="font-Wulkan text-3xl uppercase tracking-wide leading-none">
                    Currículo
                  </span>
                  <MdOpenInNew className="h-5 w-5 shrink-0" />
                </a>
              </motion.div>
            </nav>

            {/* Footer social */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="px-6 py-8 border-t border-beige/20 flex items-center gap-5"
            >
              <a
                href="https://www.linkedin.com/in/nicolas-malachias/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-300"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a
                href="mailto:nicolasmalaquias2015@gmail.com"
                className="text-muted hover:text-primary transition-colors duration-300"
              >
                <HiOutlineMail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/bloodstormm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-300"
              >
                <BsGithub className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
