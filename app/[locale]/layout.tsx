import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Providers } from "../providers";
import { HtmlLang } from "../components/HtmlLang";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "../i18n/routing";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: "/images/og-image.jpg",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang locale={locale} />
      <Providers>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
      </Providers>
      <Analytics />
    </NextIntlClientProvider>
  );
}
