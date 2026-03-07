import type { Transition } from "framer-motion";
const transition: Transition = {
  duration: 0.8,
  ease: [0.4, -0.05, 0.1, 1.1],
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const fadeInDown = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { ...transition, duration: 1 },
};

const fadeInUp = {
  initial: { y: 150, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 150, opacity: 0 },
  transition: { ...transition, duration: 1 },
};

const fadeInLeft = {
  initial: { x: 120, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 120, opacity: 0, transition: { ...transition, delay: 0 } },
  transition: { ...transition, duration: 1 },
};

const scaleUp = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { ...transition },
};

const fadeInUpBlur = {
  initial: { y: 60, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: 60, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] as const },
};

// Entra pela direita (x: 60 → 0) com blur
const fadeInLeftBlur = {
  initial: { x: 60, opacity: 0, filter: "blur(10px)" },
  animate: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: { x: 60, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
};

// Entra pela esquerda (x: -60 → 0) com blur
const fadeInRightBlur = {
  initial: { x: -60, opacity: 0, filter: "blur(10px)" },
  animate: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: { x: -60, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
};

// Scale suave + blur
const scaleUpBlur = {
  initial: { scale: 0.88, opacity: 0, filter: "blur(14px)" },
  animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
  exit: { scale: 0.88, opacity: 0, filter: "blur(14px)" },
  transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
};

// Stagger Animations

// Se algum dia o stagger nao funcionar, olhar se ele nao esta chegando vazio e depois preenchendo
// Se entre o elemento pai e filho houver alguma outra coisa, não irá funcionar

const StaggerContainer = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { y: 200, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "anticipate" as const,
      duration: 2,
    },
  },
  exit: { opacity: 0, transition: { ...transition } },
};

const StaggerText = {
  animate: {
    y: 0,
    transition: {
      delayChildren: 1.2,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letterAnimation = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { ...transition, type: "spring", duration: 1.5 },
  },
};

export {
  fadeIn,
  fadeInDown,
  fadeInUp,
  fadeInUpBlur,
  fadeInLeft,
  fadeInLeftBlur,
  fadeInRightBlur,
  scaleUp,
  scaleUpBlur,
  StaggerContainer,
  itemAnimation,
  StaggerText,
  letterAnimation,
  transition,
};
