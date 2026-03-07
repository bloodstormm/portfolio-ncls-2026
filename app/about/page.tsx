"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsGithub, BsWhatsapp } from "react-icons/bs";
import AboutImage from "@/public/images/about-imager.jpg";
import { CompaniesCarousel } from "../components/CompaniesCarousel";

const timeline = [
  {
    company: "CI&T",
    role: "Designer Jr · Remota",
    period: "Mar 2025 — Atual",
    color: "#FF6B00",
    description: null,
    subroles: [
      {
        title: "Designer Jr",
        period: "Mar 2025 — Atual · 1 ano",
        bullets: [
          "Atuação em um dos maiores players do setor automotivo global, com foco exclusivo no mercado norte-americano.",
          "Desenvolvimento de landing pages de alta performance para lançamentos globais de produtos, priorizando estética e conversão através de layouts estratégicos.",
          "Responsável pelo redesign da página de portfólio de produtos (Lineup), impactando diretamente mais de 300 mil usuários anualmente.",
          "Atuação em Design Ops, organizando bibliotecas e estruturando arquivos no Figma para otimizar o trabalho colaborativo entre designers e desenvolvedores.",
          "Comunicação e alinhamento técnico realizados inteiramente em inglês, trabalhando com times sediados nos EUA.",
        ],
      },
    ],
  },
  {
    company: "Johnson & Johnson Innovative Medicine",
    role: "Estágio · Híbrida",
    period: "Jan 2023 — Dez 2024",
    color: "#D0021B",
    description: null,
    subroles: [
      {
        title: "Desenvolvedor Front-End",
        period: "Jan 2023 — Dez 2024 · 2 anos",
        bullets: [
          "Atuação no rebranding do Janssen Pro, portal voltado para profissionais da saúde, adaptando-o à nova identidade visual.",
          "Desenvolvimento das mudanças de layout e apoio à equipe de UX/UI na implementação, utilizando Drupal, Site Studio e PHP.",
        ],
      },
      {
        title: "UX/UI & Developer",
        period: "Jan 2024 — Jun 2024 · 6 meses",
        bullets: [
          "Participação no Grow Program, atuando como UX/UI Designer na equipe de Total Experience — redesign de uma plataforma de comunicação interna com foco em acessibilidade.",
          "Condução de treinamento de UX/UI para jovens talentos no programa JEDI.",
          "Gestão de projeto de UX Research com entrevistas com mais de 7 MSLs e 3 saídas a campo, propondo mais de 5 melhorias para o produto.",
        ],
      },
      {
        title: "Gerenciador de Conteúdo",
        period: "Jan 2023 — Dez 2023 · 1 ano",
        bullets: [
          "Liderança na integração entre times de desenvolvimento, UX/UI e parceiros de negócios na América Latina, aumentando a retenção de público no site em mais de 20%.",
        ],
      },
    ],
  },
];

const socials = [
  { icon: <BsWhatsapp />, href: "https://wa.me/5512988770308", label: "WhatsApp" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/nicolas-malachias/", label: "LinkedIn" },
  { icon: <HiOutlineMail />, href: "mailto:nicolasmalaquias2015@gmail.com", label: "E-mail" },
  { icon: <BsGithub />, href: "https://github.com/bloodstormm", label: "GitHub" },
];

const stats = [
  { value: "2+", label: "Anos de experiência" },
  { value: "3+", label: "Projetos entregues" },
  { value: "2", label: "Empresas" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function SobreMim() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Parallax do hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.65], [1, 0]);

  // Linha da timeline que cresce com o scroll
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });
  const lineScaleY = useSpring(timelineProgress, { stiffness: 80, damping: 25 });

  return (
    <div className="relative overflow-hidden">

      {/* ── Hero — Tipografia solta + foto direita ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">

        {/* ══ Grid: texto à esquerda, foto à direita ══ */}
        <div className="container mx-auto px-8 pb-24 w-full grid grid-cols-12 gap-10 items-center">

          {/* ── Coluna esquerda: tipografia solta ── */}
          <div className="col-span-6 flex flex-col">

            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.4em] text-primary/50 font-Odasans mb-6"
            >
              UX/UI &amp; Front-End Dev
            </motion.span>

            {/* Nome */}
            <motion.h1
              initial={{ opacity: 0, x: -50, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, ease, delay: 0.35 }}
              className="font-Wulkan uppercase leading-none text-6xl xl:text-7xl"
            >
              Nícolas
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -50, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, ease, delay: 0.45 }}
              className="font-Wulkan uppercase leading-none text-6xl xl:text-7xl text-primary"
            >
              Malachias
            </motion.h1>

            {/* Linha divisória */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, ease, delay: 0.7 }}
              className="h-px bg-gradient-to-r from-primary/40 via-primary/15 to-transparent origin-left mt-8 mb-7"
            />

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease, delay: 0.8 }}
              className="text-sm leading-relaxed text-muted/70 max-w-sm"
            >
              Comecei pelo front-end, aprendi a pensar em design
              e hoje transito pelos dois mundos com fluência —
              inclusive em inglês. Passagem por CI&amp;T e J&amp;J.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
                  <span className="font-Wulkan text-4xl text-primary leading-none">{s.value}</span>
                  <span className="text-[9px] text-muted/50 uppercase tracking-widest font-Odasans mt-1">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Socials + disponível */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease, delay: 1.15 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <div className="flex items-center gap-2 mr-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-muted/60 font-Odasans uppercase tracking-wide">Disponível</span>
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
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Foto estilo polaroid ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 0, filter: "blur(14px)" }}
            animate={{ opacity: 1, x: 0, rotate: 2, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease, delay: 0.3 }}
            whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4 } }}
            className="col-span-6 relative cursor-pointer"
            style={{
              background: "#fff",
              padding: "12px 12px 48px 12px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.16)",
              borderRadius: "4px",
            }}
          >
            <div className="overflow-hidden" style={{ height: "68vh" }}>
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

        {/* ── Indicador de scroll ── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-50"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-transparent via-primary/50 to-primary origin-top"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
          <span className="text-[7px] uppercase tracking-[0.3em] text-muted/40 font-Odasans">scroll</span>
        </motion.div>
      </section>

      {/* ── Carrossel de empresas ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="border-y border-primary/10 bg-primary/5"
      >
        <CompaniesCarousel />
      </motion.div>

      {/* ── Timeline ── */}
      <section className="container mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease }}
          className="mb-14"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-Odasans">
            Experiência
          </span>
          <h2 className="font-Wulkan text-4xl uppercase mt-2">Trajetória</h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Trilho da linha */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/10" />
          {/* Linha animada que cresce com o scroll */}
          <motion.div
            className="absolute left-4 top-0 w-px bg-primary/50 origin-top"
            style={{ scaleY: lineScaleY, height: "100%" }}
          />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -80, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, ease, delay: i * 0.1 }}
                className="relative pl-14"
              >
                <motion.span
                  className="absolute left-[11px] top-1.5 w-3 h-3 rounded-full border-2 border-background"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "backOut" }}
                  style={{ backgroundColor: item.color, boxShadow: `0 0 0 3px ${item.color}33` }}
                />
                <div className="rounded-2xl border border-primary/15 bg-background/60 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-Odasans text-lg" style={{ color: item.color }}>
                        {item.company}
                      </h3>
                      <p className="text-sm font-medium text-foreground/90">{item.role}</p>
                    </div>
                    <span className="text-xs text-muted border border-primary/15 px-3 py-1 rounded-full">
                      {item.period}
                    </span>
                  </div>

                  {/* Descrição simples */}
                  {item.description && (
                    <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                  )}

                  {/* Sub-roles (ex: J&J) */}
                  {item.subroles && (
                    <div className="flex flex-col gap-5">
                      {item.subroles.map((sub, j) => (
                        <div key={sub.title}>
                          {j > 0 && <div className="h-px bg-primary/10 mb-5" />}
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                            <p className="text-sm font-medium text-foreground/90">{sub.title}</p>
                            <span className="text-[10px] text-muted/60 font-Odasans uppercase tracking-wide">
                              {sub.period}
                            </span>
                          </div>
                          <ul className="flex flex-col gap-1.5">
                            {sub.bullets.map((bullet, k) => (
                              <li key={k} className="flex gap-2 text-sm text-muted leading-relaxed">
                                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <motion.section
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease }}
        className="container mx-auto px-8 pb-24 text-center"
      >
        <div className="rounded-3xl border border-primary/20 bg-primary/5 px-8 py-14 flex flex-col items-center gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="font-Wulkan text-4xl uppercase"
          >
            Vamos conversar?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="text-sm text-muted max-w-sm"
          >
            Estou disponível para novos projetos e colaborações. Entre em contato!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="mailto:nicolasmalaquias2015@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background text-sm font-medium hover:bg-primary-hover transition-colors duration-300"
            >
              <HiOutlineMail className="text-lg" />
              Enviar e-mail
            </Link>
            <a
              href="https://wa.me/5512988770308"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <BsWhatsapp className="text-lg" />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Decorativos ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`about-bl-${i}`}
          className="pointer-events-none absolute rounded-full border border-primary/20"
          style={{ width: 180 + i * 90, height: 180 + i * 90, bottom: -(90 + i * 45), left: -(90 + i * 45) }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.12, 0.4] }}
          transition={{ repeat: Infinity, duration: 5 + i * 0.9, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`about-tr-${i}`}
          className="pointer-events-none absolute rounded-full border border-primary/15"
          style={{ width: 160 + i * 80, height: 160 + i * 80, top: -(80 + i * 40), right: -(80 + i * 40) }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.1, 0.35] }}
          transition={{ repeat: Infinity, duration: 6 + i * 0.7, delay: 0.3 + i * 0.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
