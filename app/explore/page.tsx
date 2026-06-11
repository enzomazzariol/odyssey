"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { CELESTIAL_MAP } from "@/data/planets";
import PlanetInfoPanel from "@/components/ui/PlanetInfoPanel";
import { useBodyShortcuts } from "@/hooks/useBodyShortcuts";
import { useT } from "@/i18n";

const TIME_OPTIONS = [
  { label: "❚❚", value: 0 },
  { label: "1×", value: 1 },
  { label: "10×", value: 10 },
  { label: "50×", value: 50 },
];

export default function ExplorePage() {
  const setScene = useStore((s) => s.setScene);
  const timeScale = useStore((s) => s.timeScale);
  const setTimeScale = useStore((s) => s.setTimeScale);
  const triggerToday = useStore((s) => s.triggerToday);
  const t = useT();
  const setActivePlanet = useStore((s) => s.setActivePlanet);
  const hoveredPlanet = useStore((s) => s.hoveredPlanet);
  const activePlanet = useStore((s) => s.activePlanet);
  const hovered = hoveredPlanet ? CELESTIAL_MAP.get(hoveredPlanet) : undefined;

  useBodyShortcuts();

  useEffect(() => {
    setScene("solar-system");
    return () => setActivePlanet(null);
  }, [setScene, setActivePlanet]);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 inset-x-0 z-20 flex items-start justify-between px-8 py-6 pointer-events-none"
      >
        <div className="flex flex-col gap-1">
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
            {t("systemOverview")}
          </h1>
        </div>
        <nav className="pointer-events-auto flex items-center gap-6 mt-1">
          <Link
            href="/scale"
            className="text-[11px] uppercase tracking-[0.3em] text-white/55 hover:text-white transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("scale")}
          </Link>
          <Link
            href="/compare"
            className="text-[11px] uppercase tracking-[0.3em] text-white/55 hover:text-white transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("compare")}
          </Link>
        </nav>
      </motion.header>

      {/* Hovered planet label */}
      <div className="fixed bottom-10 inset-x-0 z-20 flex justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {hovered && !activePlanet && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span
                className="text-2xl font-light tracking-[0.3em] uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {hovered.name}
              </span>
              <span
                className="text-[12px] uppercase tracking-[0.3em] text-white/55"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("clickToScan")}
              </span>
            </motion.div>
          )}

          {!hovered && !activePlanet && (
            <motion.span
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 2 }}
              className="text-[11px] uppercase tracking-[0.35em] text-white/50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("exploreHint")}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Time control */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed bottom-8 left-8 z-20 flex items-center gap-4"
      >
        <span
          className="text-[10px] uppercase tracking-[0.35em] text-white/40"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("time")}
        </span>
        <div className="flex items-center border border-white/10">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTimeScale(opt.value)}
              className="pointer-events-auto px-3.5 py-2 text-[11px] tracking-[0.15em] cursor-pointer transition-all duration-300"
              style={{
                fontFamily: "var(--font-mono)",
                color: timeScale === opt.value ? "#4a9eff" : "rgba(255,255,255,0.4)",
                background: timeScale === opt.value ? "rgba(74,158,255,0.08)" : "transparent",
              }}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-4 bg-white/15 mx-1" />
          <button
            onClick={() => triggerToday()}
            className="pointer-events-auto px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-accent-blue cursor-pointer transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("today")}
          </button>
        </div>
      </motion.div>

      <PlanetInfoPanel />
    </>
  );
}
