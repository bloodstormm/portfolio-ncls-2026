"use client";

import { motion } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { fadeInUpBlur } from "@/app/utils/Animations";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/nicolas-malachias/",
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
  },
  {
    href: "mailto:nicolasmalaquias2015@gmail.com",
    icon: <HiOutlineMail />,
    label: "Email",
  },
  {
    href: "https://github.com/bloodstormm",
    icon: <BsGithub />,
    label: "GitHub",
  },
];

export function SocialLinks() {
  return (
    <motion.div
      {...fadeInUpBlur}
      transition={{ ...fadeInUpBlur.transition, delay: 0.8 }}
      className="flex justify-center gap-10 pb-4 text-3xl sm:justify-start sm:pt-6"
    >
      {socialLinks.map(({ href, icon, label }) => (
        <motion.a
          key={label}
          whileHover={{ scale: 1.1, y: -2 }}
          href={href}
          aria-label={label}
          className="transition-colors duration-300 hover:text-primary"
          target="_blank"
          rel="noreferrer"
        >
          {icon}
        </motion.a>
      ))}
    </motion.div>
  );
}
