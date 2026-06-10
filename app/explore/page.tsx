"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { CELESTIAL_MAP } from "@/data/planets";
import PlanetInfoPanel from "@/components/ui/PlanetInfoPanel";

export default function ExplorePage() {
  const setScene = useStore((s) => s.setScene);
  const setActivePlanet = useStore((s) => s.setActivePlanet);
  const hoveredPlanet = useStore((s) => s.hoveredPlanet);
  const activePlanet = useStore((s) => s.activePlanet);
  const hovered = hoveredPlanet ? CELESTIAL_MAP.get(hoveredPlanet) : undefined;

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
            Solar Odyssey
          </span>
          <h1
            className="text-lg font-light tracking-[0.25em] uppercase text-white/90"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            System Overview
          </h1>
        </div>
        <nav className="pointer-events-auto flex items-center gap-6 mt-1">
          <Link
            href="/scale"
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Scale
          </Link>
          <Link
            href="/compare"
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Compare
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
                className="text-[10px] uppercase tracking-[0.3em] text-white/40"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Click to scan
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
              className="text-[10px] uppercase tracking-[0.35em] text-white/30"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Drag to orbit · Scroll to zoom · Click a planet
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <PlanetInfoPanel />
    </>
  );
}
