"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { ease } from "./data";

export function AboutCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease }}
      className="container mx-auto px-6 md:px-8 pb-16 md:pb-24 text-center"
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
  );
}
