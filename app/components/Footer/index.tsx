import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export const Footer = () => (
  <footer className="mt-24 border-t border-beige/40 bg-brand/10 backdrop-blur-sm">
  <div className="container mx-auto flex min-h-[180px] flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Portfólio NCLS
        </p>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Nícolas Malachias. Todos os direitos reservados.
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
        <div className="flex items-center gap-4 text-sm text-muted">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>Disponível para novos projetos.</span>
        </div>

        <div className="flex gap-5 text-xl text-muted">
          <a
            href="https://www.instagram.com/_nicolasantoss/"
            className="transition-colors hover:text-primary"
            target="_blank"
          >
            <BsInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-malachias/"
            className="transition-colors hover:text-primary"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/bloodstormm"
            className="transition-colors hover:text-primary"
            target="_blank"
          >
            <BsGithub />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5512988770308"
            className="transition-colors hover:text-primary"
            target="_blank"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  </footer>
);