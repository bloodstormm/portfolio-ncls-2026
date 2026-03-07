import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Providers } from "./providers";

const odasans = localFont({
  src: "./fonts/Odasans/Odasans-Semibold.ttf",
  variable: "--font-Odasans",
});

const wulkan = localFont({
  src: "./fonts/Wulkan/WulkanDisplayRegular.ttf",
  variable: "--font-Wulkan",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-Poppins",
});

export const metadata: Metadata = {
  title: "Portfólio NCLS",
  description: "Portfólio de Nicolas Malachias",
  openGraph: {
    images: "/images/og-image.jpg", // Relative URL from public directory
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${odasans.variable} ${wulkan.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
