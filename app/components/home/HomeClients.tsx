"use client";

import { siAudi, siVolkswagen } from "simple-icons";
import { useTranslations } from "next-intl";
import { LogosCarousel } from "@/app/components/ui/logos-carousel";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8 shrink-0 fill-current md:h-12 md:w-12"
    >
      <path d={path} />
    </svg>
  );
}

function Client({
  name,
  via,
  children,
}: {
  name: string;
  via: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-16 items-center gap-3 md:gap-4">
      {children}
      <div className="leading-tight">
        <p className="font-Wulkan text-xl md:text-3xl">{name}</p>
        <p className="mt-1 text-xs text-muted-foreground">{via}</p>
      </div>
    </div>
  );
}

export function HomeClients() {
  const t = useTranslations("home");
  const via = t("viaCit");

  const logos = [
    <Client key="vw" name="Volkswagen" via={via}>
      <BrandIcon path={siVolkswagen.path} />
    </Client>,
    <Client key="audi" name="Audi" via={via}>
      <BrandIcon path={siAudi.path} />
    </Client>,
    <div key="cit" className="flex h-16 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/companies-logo/cit-logo-trim.png"
        alt="CI&T"
        width={1176}
        height={380}
        className="logo-mono h-8 w-auto max-w-none shrink-0 md:h-10"
      />
    </div>,
    <div key="jnj" className="flex h-16 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/companies-logo/johnson-logo.svg"
        alt="Johnson & Johnson"
        className="logo-mono h-[0.9rem] w-auto max-w-none shrink-0 md:h-7"
      />
    </div>,
  ];

  return (
    <section className="border-t border-border">
      <div className="container mx-auto flex items-center justify-center gap-4 px-6 py-6 md:gap-12 md:py-8 lg:px-8">
        <p className="shrink-0 text-sm text-muted-foreground md:text-base">
          {t("trusted")}:
        </p>
        <span aria-hidden="true" className="h-8 w-px shrink-0 bg-border" />
        {/* One logo at a time on phones, two from tablets up, so it always fits on the label's line */}
        <div className="w-[10rem] md:hidden">
          <LogosCarousel
            count={1}
            interval={2600}
            className="justify-start text-foreground"
          >
            {logos}
          </LogosCarousel>
        </div>
        <div className="hidden w-[30rem] md:block">
          <LogosCarousel
            count={2}
            interval={3200}
            className="justify-start gap-14 text-foreground"
          >
            {logos}
          </LogosCarousel>
        </div>
      </div>
    </section>
  );
}
