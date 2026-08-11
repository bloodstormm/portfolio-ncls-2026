import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${odasans.variable} ${wulkan.variable} ${poppins.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" expand={true} closeButton />
      </body>
    </html>
  );
}
