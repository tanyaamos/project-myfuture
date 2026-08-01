import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project MyFuture | Arizona State University",
  description:
    "An immersive admissions experience — imagine what's possible at ASU.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-asu-gold focus:px-4 focus:py-2 focus:text-charcoal focus:outline-none"
        >
          Skip to main content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
