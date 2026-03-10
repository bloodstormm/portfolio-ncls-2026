"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsWhatsapp, BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import AboutImage from "@/public/images/about-imager.jpg";
import { ease, stats, socials } from "./data";

const socialIcons: Record<string, React.ReactNode> = {
  WhatsApp: <BsWhatsapp />,
  LinkedIn: <FaLinkedinIn />,
  "E-mail": <HiOutlineMail />,
  GitHub: <BsGithub />,
};

export function AboutHero() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-6 md:px-8 pb-16 md:pb-24 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Coluna esquerda: tipografia + stats + socials */}
        <div className="flex flex-col">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-primary/50 font-Odasans mb-6"
          >
            UX/UI &amp; Front-End Dev
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.35 }}
            className="font-Wulkan uppercase leading-none text-5xl md:text-6xl xl:text-7xl"
          >
            Nícolas
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.45 }}
            className="font-Wulkan uppercase leading-none text-5xl md:text-6xl xl:text-7xl text-primary"
          >
            Malachias
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
            className="h-px bg-linear-to-r from-primary/40 via-primary/15 to-transparent origin-left mt-8 mb-7"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.8 }}
            className="text-sm leading-relaxed text-muted/80 max-w-sm"
          >
            Olá 👋, sou formado em Análise e
            Desenvolvimento de Sistemas e hoje atuo entre front-end e UX/UI. <br /> <br />
            <b className="text-primary">Faço sites como freelancer</b> e já entreguei mais de 3 projetos de
            ponta a ponta que aumentaram <b className="text-primary">retenção</b> e <b className="text-primary">credibilidade</b> dos meus
            clientes :)
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.95 }}
            className="flex gap-10 mt-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 1.0 + i * 0.08 }}
                className="flex flex-col gap-0.5"
              >
                <span className="font-Wulkan text-4xl text-primary leading-none">
                  {s.value}
                </span>
                <span className="text-[9px] text-muted/50 uppercase tracking-widest font-Odasans mt-1">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Socials + disponível */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.15 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            <div className="flex items-center gap-2 mr-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-muted/60 font-Odasans uppercase tracking-wide">
                Disponível
              </span>
            </div>
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease, delay: 1.2 + i * 0.06 }}
                whileHover={{ scale: 1.1, y: -2 }}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-primary transition-colors duration-200 text-lg"
                title={s.label}
              >
                {socialIcons[s.label]}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Coluna direita: foto estilo polaroid */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
          whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4 } }}
          className="relative cursor-pointer w-full max-w-sm mx-auto md:max-w-none"
          style={{
            background: "#fff",
            padding: "12px 12px 48px 12px",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.16)",
            borderRadius: "4px",
          }}
        >
          <div className="overflow-hidden aspect-[3/4] md:aspect-auto md:h-[68vh]">
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              style={{ y: photoY }}
              transition={{ duration: 2.2, ease }}
              src={AboutImage.src}
              alt="Nícolas Malachias"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-50"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-transparent via-primary/50 to-primary origin-top"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
        <span className="text-[7px] uppercase tracking-[0.3em] text-muted/40 font-Odasans">
          scroll
        </span>
      </motion.div>
    </section>
  );
}
