"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { SCALE_BODIES } from "@/lib/scaleLayout";
import { useLang, useT, localizedClassification } from "@/i18n";

const ease = [0.25, 0.1, 0.25, 1] as const;
const EARTH_RADIUS_KM = 6371;

export default function ScalePage() {
  const setScene = useStore((s) => s.setScene);
  const scaleIndex = useStore((s) => s.scaleIndex);
  const setScaleIndex = useStore((s) => s.setScaleIndex);
  const isAnimating = useStore((s) => s.isAnimating);
  const wheelAccum = useRef(0);
  const lang = useLang();
  const t = useT();

  useEffect(() => {
    setScene("scale");
    setScaleIndex(0);
  }, [setScene, setScaleIndex]);

  const step = useCallback(
    (dir: 1 | -1) => {
      const next = Math.min(SCALE_BODIES.length - 1, Math.max(0, scaleIndex + dir));
      if (next !== scaleIndex) setScaleIndex(next);
    },
    [scaleIndex, setScaleIndex]
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) > 90) {
        step(wheelAccum.current > 0 ? 1 : -1);
        wheelAccum.current = 0;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") step(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") step(-1);
    };
    let touchX = 0;
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      const dx = e.changedTouches[0].clientX - touchX;
      const dy = e.changedTouches[0].clientY - touchY;
      const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(d) > 50) step(d < 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isAnimating, step]);

  const layout = SCALE_BODIES[scaleIndex];
  const body = layout.body;
  const ratio = body.facts.radiusKm / EARTH_RADIUS_KM;
  const ratioLabel =
    body.id === "earth"
      ? t("referenceBody")
      : ratio >= 1
        ? `${ratio >= 10 ? ratio.toFixed(0) : ratio.toFixed(1)}${t("earthRadiusSuffix")}`
        : `${(1 / ratio).toFixed(1)}${t("smallerThanEarth")}`;

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="fixed top-0 inset-x-0 z-20 flex items-start justify-between px-8 py-6 pointer-events-none"
      >
        <Link
          href="/explore"
          className="group pointer-events-auto flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M13 8H3M7 4L3 8l4 4" />
          </svg>
          <span className="text-[11px] uppercase tracking-[0.3em]">{t("systemOverview")}</span>
        </Link>
        <div className="flex flex-col items-end gap-1">
          <span
            className="text-[10px] uppercase tracking-[0.4em] text-white/40"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("solarOdyssey")}
          </span>
          <h1
            className="text-lg font-light tracking-[0.25em] uppercase text-white/90"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("trueScale")}
          </h1>
        </div>
      </motion.header>

      {/* Body info */}
      <div className="fixed bottom-24 inset-x-0 z-20 flex justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={body.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[11px] uppercase tracking-[0.4em]"
              style={{ fontFamily: "var(--font-mono)", color: body.accentColor }}
            >
              {localizedClassification(body, lang)}
            </span>
            <h2
              className="text-4xl font-light tracking-[0.25em] uppercase text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {body.name}
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span
                className="text-[13px] tracking-[0.15em] text-white/65"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                R = {body.facts.radiusKm.toLocaleString()} km
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span
                className="text-[13px] tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)", color: body.accentColor }}
              >
                {ratioLabel}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation: arrows + dots */}
      <div className="fixed bottom-8 inset-x-0 z-20 flex items-center justify-center gap-6">
        <button
          onClick={() => step(-1)}
          disabled={scaleIndex === 0}
          className="pointer-events-auto p-2 text-white/40 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-colors duration-300 cursor-pointer"
          aria-label="Previous body"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          {SCALE_BODIES.map((b, i) => (
            <button
              key={b.body.id}
              onClick={() => setScaleIndex(i)}
              className="pointer-events-auto group p-1 cursor-pointer"
              aria-label={b.body.name}
            >
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width: i === scaleIndex ? 8 : 5,
                  height: i === scaleIndex ? 8 : 5,
                  background: i === scaleIndex ? b.body.accentColor : "rgba(255,255,255,0.25)",
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => step(1)}
          disabled={scaleIndex === SCALE_BODIES.length - 1}
          className="pointer-events-auto p-2 text-white/40 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-colors duration-300 cursor-pointer"
          aria-label="Next body"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>

      {/* Scroll hint */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="fixed bottom-8 right-32 z-20 text-[11px] uppercase tracking-[0.3em] text-white/45 pointer-events-none hidden md:block"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {t("scrollToTravel")}
      </motion.span>
    </>
  );
}
