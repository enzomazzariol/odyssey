import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const melodrama = localFont({
  src: [
    { path: "../src/fonts/melodrama-400.woff2", weight: "400" },
    { path: "../src/fonts/melodrama-500.woff2", weight: "500" },
    { path: "../src/fonts/melodrama-600.woff2", weight: "600" },
    { path: "../src/fonts/melodrama-700.woff2", weight: "700" },
  ],
  variable: "--font-melodrama",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solar Odyssey",
  description:
    "A premium interactive 3D journey through the Solar System. Explore planets, discover real scientific data, and experience the scale of space.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable} ${melodrama.variable}`}
    >
      <body className="bg-space-black text-white antialiased font-[family-name:var(--font-body)]">
        <CanvasWrapper />
        {children}
      </body>
    </html>
  );
}
