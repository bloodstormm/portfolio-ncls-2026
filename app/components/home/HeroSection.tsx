"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import HomeImage from "@/public/images/home-image.jpg";
import { fadeInUpBlur, fadeInLeftBlur, fadeInRightBlur, scaleUpBlur } from "@/app/utils/Animations";
import { SocialLinks } from "./SocialLinks";
import { ProjectsList } from "@/app/components/ProjectsList";

export function HeroSection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="container relative z-20 mx-auto w-full min-h-screen sm:mt-4 flex flex-col items-center justify-center">
      <motion.div
        {...fadeInUpBlur}
        transition={{ ...fadeInUpBlur.transition, delay: 0.2 }}
        className="mx-auto grid items-center gap-4 p-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-14"
      >
        {/* Coluna esquerda: título + bio + redes */}
        <motion.div
          {...fadeInLeftBlur}
          transition={{ ...fadeInLeftBlur.transition, delay: 0.4 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-center font-Wulkan text-4xl lg:text-5xl font-medium uppercase lg:text-left xl:text-5xl">
            Ux/UI &
            <br className="hidden lg:block" /> Front-End DEV
          </h1>
          <p className="text-sm xl:text-base">
            Olá, seja bem-vindo(a) ao meu portfólio! <br />
            Aqui você encontrará meus projetos que venho feito ultimamente.
            Logo abaixo está algumas das minhas redes, sinta-se à vontade de
            entrar em contato! 🤠
          </p>
          <SocialLinks />
        </motion.div>

        {/* Coluna central: foto de perfil */}
        <motion.div
          {...scaleUpBlur}
          transition={{ ...scaleUpBlur.transition, delay: 0.7 }}
          className="mx-auto w-[90%] shadow-2xl overflow-hidden rounded-full"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={HomeImage.src || undefined}
            className="mx-auto w-full"
            alt="Nicolas Malachias"
          />
        </motion.div>

        {/* Coluna direita: nome + botão de projetos */}
        <motion.div
          {...fadeInRightBlur}
          transition={{ ...fadeInRightBlur.transition, delay: 0.5 }}
          className="relative h-2/3"
        >
          <h1 className="text-center font-Wulkan text-4xl lg:text-5xl uppercase md:hidden lg:block sm:text-left xl:text-6xl">
            Nícolas Malachias
          </h1>
          <Link
            href="/projects"
            className="absolute group -bottom-4 left-6 hidden h-32 w-32 items-center justify-center rounded-full border border-brown dark:border-beige sm:flex lg:left-14 lg:h-40 lg:w-40 xl:bottom-0 hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute top-2 right-1 h-6 w-6 rounded-full group-hover:animate-pulse transition bg-primary lg:top-1 lg:right-5" />
            <p className="w-20">Ver meus Projetos</p>
            <BsArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        {...fadeInUpBlur}
        transition={{ ...fadeInUpBlur.transition, delay: 1.2 }}
      >
        <ProjectsList />
      </motion.div>
    </section>
  );
}
