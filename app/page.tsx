"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { fadeInUp, fadeInLeft, scaleUp, fadeIn, transition } from "./utils/Animations";


import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import HomeImage from "@/public/images/home-image.jpg";
import { ProjectsList } from "./components/ProjectsList";

export default function Home() {
  // Garante que a página sempre inicie no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden pb-10">

      <section className="container relative z-20 mx-auto w-full min-h-screen sm:mt-4 flex flex-col items-center justify-center">
        <motion.div
          {...fadeInUp}
          transition={{ ...transition, delay: 0.2 }}
          className="mx-auto grid items-center gap-4 p-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-14"
        >
          <motion.div
            {...fadeInLeft}
            transition={{ ...transition, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-center font-Wulkan text-4xl lg:text-5xl font-medium uppercase lg:text-left xl:text-5xl">
              Ux/UI &
              <br className="hidden lg:block" /> Front-End DEV
            </h1>

            <p className="text-sm xl:text-base">
              Olá, seja bem-vindo(a) ao meu portfólio! <br></br> Aqui você
              encontrará meus projetos que venho feito ultimamente. Logo abaixo
              está algumas das minhas redes, sinta-se à vontade de entrar em
              contato! 🤠
            </p>
            {/* Redes sociais */}
            <motion.div
              {...fadeIn}
              transition={{ ...transition, delay: 0.8 }}
              className="flex justify-center gap-10 pb-4 text-3xl sm:justify-start sm:pt-6"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.linkedin.com/in/nicolas-malachias/"
                className="transition-colors duration-300 hover:text-primary"
                target="_blank"
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="mailto:nicolasmalaquias2015@gmail.com"
                className="transition-colors duration-300 hover:text-primary"
                target="_blank"
              >
                <HiOutlineMail />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://github.com/bloodstormm"
                className="transition-colors duration-300 hover:text-primary"
                target="_blank"
              >
                <BsGithub />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            {...scaleUp}
            transition={{ ...transition, duration: 1.3, delay: 0.7 }}
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
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...transition, delay: 0.5 }}
            className="relative h-2/3"
          >
            <h1 className="text-center font-Wulkan text-4xl lg:text-5xl uppercase md:hidden lg:block sm:text-left xl:text-6xl">
              Nícolas Malachias
            </h1>

              <Link
                href="/projects"
                className="absolute group -bottom-4 left-6 hidden h-32 w-32 items-center justify-center rounded-full border border-brown dark:border-beige sm:flex lg:left-14 lg:h-40 lg:w-40 xl:bottom-0 hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute top-2 right-1 h-6 w-6 rounded-full group-hover:animate-pulse transition bg-primary lg:top-1 lg:right-5"></div>
                <p className="w-20">Ver meus Projetos</p>
                <BsArrowUpRight className="h-5 w-5" />
              </Link>
          </motion.div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ ...transition, delay: 1.0 }}
          className="flex mx-auto rounded-3xl overflow-x-auto w-full justify-center items-center gap-6 pt-4 pb-10 lg:gap-14 2xl:gap-20 sm:p-6"
        >
          {/* <CompaniesCarousel /> */}
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ ...transition, delay: 1.2 }}
        >
          <ProjectsList />
        </motion.div>
      </section>

      {/* Anéis pulsantes — canto inferior esquerdo */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`bl-${i}`}
          className="pointer-events-none absolute rounded-full border border-primary/30"
          style={{
            width: 200 + i * 100,
            height: 200 + i * 100,
            bottom: -(100 + i * 50),
            left: -(100 + i * 50),
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ repeat: Infinity, duration: 4 + i * 0.8, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}
      {/* Anéis pulsantes — canto superior direito */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`tr-${i}`}
          className="pointer-events-none absolute rounded-full border border-primary/25"
          style={{
            width: 180 + i * 90,
            height: 180 + i * 90,
            top: -(90 + i * 45),
            right: -(90 + i * 45),
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ repeat: Infinity, duration: 5 + i * 0.7, delay: 0.4 + i * 0.5, ease: "easeInOut" }}
        />
      ))}

      {/* Grade de pontos animada */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...transition, delay: 0.5 }}
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" fillOpacity="0.35" className="text-primary" />
          </pattern>
          <radialGradient id="dot-fade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-mask">
            <rect width="100%" height="100%" fill="url(#dot-fade)" />
          </mask>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          mask="url(#dot-mask)"
          animate={{ x: [0, 32] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
};
