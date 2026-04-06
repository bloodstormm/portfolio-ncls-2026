const timelinePt = [
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
        period: "Jun 2024 — Dez 2024 · 6 meses",
        bullets: [
          "Atuação no rebranding do Janssen Pro, portal voltado para profissionais da saúde, adaptando-o à nova identidade visual.",
          "Desenvolvimento das mudanças de layout e apoio à equipe de UX/UI na implementação, utilizando Drupal, Site Studio e PHP.",
        ],
      },
      {
        title: "UX/UI",
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

const timelineEn = [
  {
    company: "CI&T",
    role: "Junior Designer · Remote",
    period: "Mar 2025 — Present",
    color: "#FF6B00",
    description: null,
    subroles: [
      {
        title: "Junior Designer",
        period: "Mar 2025 — Present · 1 year",
        bullets: [
          "Working with one of the largest players in the global automotive sector, with exclusive focus on the North American market.",
          "Developing high-performance landing pages for global product launches, prioritizing aesthetics and conversion through strategic layouts.",
          "Responsible for the redesign of the product portfolio page (Lineup), directly impacting over 300,000 users annually.",
          "Working in Design Ops, organizing libraries and structuring Figma files to optimize collaborative work between designers and developers.",
          "Technical communication and alignment conducted entirely in English, working with US-based teams.",
        ],
      },
    ],
  },
  {
    company: "Johnson & Johnson Innovative Medicine",
    role: "Internship · Hybrid",
    period: "Jan 2023 — Dec 2024",
    color: "#D0021B",
    description: null,
    subroles: [
      {
        title: "Front-End Developer",
        period: "Jun 2024 — Dec 2024 · 6 months",
        bullets: [
          "Worked on the rebranding of Janssen Pro, a portal for healthcare professionals, adapting it to the new visual identity.",
          "Developed layout changes and supported the UX/UI team in implementation using Drupal, Site Studio, and PHP.",
        ],
      },
      {
        title: "UX/UI Designer",
        period: "Jan 2024 — Jun 2024 · 6 months",
        bullets: [
          "Participated in the Grow Program as a UX/UI Designer in the Total Experience team — redesigning an internal communication platform with a focus on accessibility.",
          "Led UX/UI training for junior talents in the JEDI program.",
          "Managed a UX Research project with interviews with over 7 MSLs and 3 field visits, proposing more than 5 product improvements.",
        ],
      },
      {
        title: "Content Manager",
        period: "Jan 2023 — Dec 2023 · 1 year",
        bullets: [
          "Led integration between development, UX/UI teams and business partners in Latin America, increasing website audience retention by over 20%.",
        ],
      },
    ],
  },
];

export function getTimeline(locale: string) {
  return locale === "en" ? timelineEn : timelinePt;
}

export const socials = [
  { href: "https://wa.me/5512988770308", label: "WhatsApp" },
  { href: "https://www.linkedin.com/in/nicolas-malachias/", label: "LinkedIn" },
  { href: "mailto:nicolasmalaquias2015@gmail.com", label: "E-mail" },
  { href: "https://github.com/bloodstormm", label: "GitHub" },
];

export const stats = [
  { value: "3", key: "experience" },
  { value: "3+", key: "projects" },
  { value: "2", key: "companies" },
];

export const ease = [0.16, 1, 0.3, 1] as const;
