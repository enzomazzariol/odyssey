import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
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
      className={`${outfit.variable} ${spaceMono.variable}`}
    >
      <body className="bg-space-black text-white antialiased font-[family-name:var(--font-body)]">
        <CanvasWrapper />
        {children}
      </body>
    </html>
  );
}
