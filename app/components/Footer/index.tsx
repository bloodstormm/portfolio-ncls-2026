import { BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FooterDecoration } from "./FooterDecoration";
import { BackToTopButton } from "./BackToTopButton";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="relative bg-[#111111] text-white overflow-hidden">
      <FooterDecoration />
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="border-b border-white/10 pb-14 mb-10 space-y-6">
          <p className="text-primary text-xs uppercase tracking-widest font-Odasans">
            {t("available")}
          </p>
          <h2 className="font-Wulkan text-5xl md:text-7xl lg:text-8xl uppercase leading-tight max-w-4xl">
            {t("cta")}
          </h2>
          <div className="flex items-center gap-6 text-2xl text-white/40">
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
              href="https://wa.me/5512988770308"
              className="hover:text-primary transition-colors duration-300"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <BsWhatsapp />
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
