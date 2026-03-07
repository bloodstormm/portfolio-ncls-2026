"use client";

const companies = [
  { key: "cit", src: "/companies-logo/cit-logo.png", alt: "CI&T", className: "h-16 w-auto object-contain" },
  { key: "jj",  src: "/companies-logo/johnson-logo.svg", alt: "Johnson & Johnson", className: "h-7 w-auto object-contain" },
];

// Triplicado para o loop contínuo nunca mostrar borda
const items = [...companies, ...companies, ...companies, ...companies];

export function CompaniesCarousel() {
  return (
    <div className="w-full overflow-hidden py-8">
      <p className="text-center text-xs uppercase tracking-widest text-muted/50 mb-8 font-Odasans">
        Empresas onde trabalhei
      </p>
      <div className="flex animate-[scroll_20s_linear_infinite] gap-20 items-center w-max">
        {items.map((company, i) => (
          <div
            key={`${company.key}-${i}`}
            className="flex items-center px-8 py-4 rounded-xl border border-primary/15 bg-background/40 backdrop-blur-sm opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            <img
              src={company.src}
              alt={company.alt}
              className={company.className}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
