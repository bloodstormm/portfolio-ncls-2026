import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion, Transition } from "framer-motion";

import { MdOpenInNew } from "react-icons/md";

import {
  fadeIn,
  fadeInDown,
  scaleUp,
  transition,
} from "../../utils/Animations";
import { StaggerContainer, itemAnimation } from "../../utils/Animations";

type MenuModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuModal = ({ isOpen, setIsOpen }: MenuModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-30"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel StaggerContainer */}
          <motion.div
            {...fadeIn}
            transition={{ ...transition, duration: 0.7 }}
            className="fixed inset-0 bg-brown/30 dark:bg-beige/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen scrollable StaggerContainer */}
          <div className="fixed inset-0 overflow-y-auto">
            {/* StaggerContainer to center the panel */}
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="relative mx-auto flex h-128 w-[90%] overflow-hidden rounded-2xl bg-offWhite dark:bg-background p-4">
                <motion.div
                  {...scaleUp}
                  className="flex h-full w-full flex-col items-center"
                >
                  <DialogTitle
                    as={motion.h1}
                    {...fadeInDown}
                    transition={{ ...fadeInDown.transition, duration: 0.8 }}
                    className="font-Odasans text-5xl font-semibold text-primary dark:text-secondary"
                  >
                    NCLS
                  </DialogTitle>

                  <motion.div
                    variants={StaggerContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mt-8 flex w-full flex-col items-center gap-2 font-medium"
                  >
                    <motion.div
                      variants={itemAnimation}
                      className="w-full rounded-lg bg-primary/40 dark:bg-secondary/40 p-3"
                    >
                      <Link
                        href="/"
                        className="bottomLine w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={itemAnimation}
                      className="w-full rounded-lg bg-primary/40 dark:bg-secondary/40 p-3"
                    >
                      <Link
                        href="#about"
                        className="bottomLine w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Sobre Mim
                      </Link>
                    </motion.div>
                    <motion.div
                      transition={{ duration: 1.3 }}
                      variants={itemAnimation}
                      className="w-full rounded-lg bg-primary/40 dark:bg-secondary/40 p-3"
                    >
                      <Link
                        href="#projects"
                        className="bottomLine w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Projetos
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={itemAnimation}
                      className="w-full rounded-lg bg-primary/40 dark:bg-secondary/40 p-3"
                    >
                      <Link
                        href="#career"
                        className="bottomLine w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Carreira
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={itemAnimation}
                      className="w-full rounded-lg bg-primary/40 dark:bg-secondary/40 p-3"
                    >
                      <Link
                        href="#contact"
                        className="bottomLine w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Contato
                      </Link>
                    </motion.div>

                    <motion.a
                      variants={itemAnimation}
                      href="https://drive.google.com/file/d/1XvHqOCw8e2B5hcoC4BdM8CrgqI9XcDNa/view?usp=sharing"
                      download
                      target="_blank"
                      className="mt-8 flex items-center gap-3 rounded-xl bg-primary dark:bg-secondary py-4 px-6 text-white"
                    >
                      Ver Currículo
                      <MdOpenInNew />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
