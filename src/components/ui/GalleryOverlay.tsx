"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PlanetData } from "@/data/types";
import { GALLERY } from "@/data/gallery";
import { useLang, useT, localizedCaption } from "@/i18n";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function GalleryOverlay({
  planet,
  open,
  onClose,
}: {
  planet: PlanetData;
  open: boolean;
  onClose: () => void;
}) {
  const images = GALLERY[planet.id] ?? [];
  const [index, setIndex] = useState(0);
  const lang = useLang();
  const t = useT();

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, planet.id]);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  const image = images[index];

  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-40 flex flex-col bg-space-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 shrink-0">
            <div className="flex flex-col gap-1">
              <span
                className="text-[11px] uppercase tracking-[0.4em]"
                style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
              >
                {t("missionArchive")}
              </span>
              <h2
                className="text-2xl font-light tracking-[0.2em] uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {planet.name}
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <span
                className="text-[12px] tracking-[0.3em] text-white/55"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {index + 1} / {images.length}
              </span>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
                aria-label="Close gallery"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image stage */}
          <div
            className="relative flex-1 flex items-center justify-center px-20 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => step(-1)}
              className="absolute left-6 z-10 flex items-center justify-center w-12 h-12 border border-white/10 bg-space-black/40 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="relative w-full h-full"
              >
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => step(1)}
              className="absolute right-6 z-10 flex items-center justify-center w-12 h-12 border border-white/10 bg-space-black/40 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>

          {/* Caption + thumbnails */}
          <div className="shrink-0 px-8 pb-6 pt-4" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <p
                  className="text-[15px] text-white/85 font-light max-w-2xl"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {localizedCaption(image, lang)}
                </p>
                <span
                  className="text-[11px] tracking-[0.2em] uppercase text-white/45"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {image.credit}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex justify-center gap-3">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setIndex(i)}
                  className="relative w-20 h-12 overflow-hidden border transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: i === index ? planet.accentColor : "rgba(255,255,255,0.12)",
                    opacity: i === index ? 1 : 0.45,
                  }}
                  aria-label={`Photo ${i + 1}`}
                >
                  <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
