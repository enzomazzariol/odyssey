"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

const INTRO_LINES = [
  "Some journeys are measured in miles.",
  "Ours is measured in billions of kilometers.",
];

type Phase = "black" | "lines" | "title" | "ready";

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("black");
  const [lineIndex, setLineIndex] = useState(0);
  const router = useRouter();
  const setScene = useStore((s) => s.setScene);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("lines"), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "lines") return;

    if (lineIndex < INTRO_LINES.length - 1) {
      const timer = setTimeout(() => setLineIndex((i) => i + 1), 3500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setPhase("title"), 3500);
    return () => clearTimeout(timer);
  }, [phase, lineIndex]);

  useEffect(() => {
    if (phase !== "title") return;
    const timer = setTimeout(() => setPhase("ready"), 2000);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleBeginMission = useCallback(() => {
    setScene("solar-system");
    router.push("/explore");
  }, [setScene, router]);

  useEffect(() => {
    if (phase !== "ready") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleBeginMission();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleBeginMission]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {phase === "lines" && (
          <motion.p
            key={`line-${lineIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center px-8 max-w-2xl text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {INTRO_LINES[lineIndex]}
          </motion.p>
        )}

        {(phase === "title" || phase === "ready") && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-16"
          >
            {/* Title block */}
            <div className="flex flex-col items-center gap-4">
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 0.7, letterSpacing: "0.6em" }}
                transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-xs sm:text-sm uppercase text-white/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Welcome to
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.15em" }}
                animate={{ opacity: 1, letterSpacing: "0.25em" }}
                transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[2.5rem] sm:text-6xl md:text-8xl font-light text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                SOLAR ODYSSEY
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>

            {/* CTA button */}
            <AnimatePresence>
              {phase === "ready" && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="pointer-events-auto flex flex-col items-center gap-6"
                >
                  <button
                    onClick={handleBeginMission}
                    className="group relative cursor-pointer px-14 py-5 bg-transparent"
                    style={{ animation: "button-breathe 3s ease-in-out infinite" }}
                  >
                    {/* Ambient glow behind button */}
                    <div
                      className="absolute -inset-4 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(74, 158, 255, 0.08) 0%, transparent 70%)",
                      }}
                    />

                    {/* Outer border with glow */}
                    <div
                      className="absolute inset-0 border border-white/20 transition-all duration-700 group-hover:border-accent-blue/50"
                      style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
                    />

                    {/* Corner brackets — always visible, brighter on hover */}
                    <div className="absolute -inset-2 pointer-events-none transition-opacity duration-500">
                      <svg className="absolute top-0 left-0 w-3.5 h-3.5 text-white/20 group-hover:text-accent-blue/70 transition-colors duration-500" viewBox="0 0 12 12">
                        <path d="M0 4V0h4" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <svg className="absolute top-0 right-0 w-3.5 h-3.5 text-white/20 group-hover:text-accent-blue/70 transition-colors duration-500" viewBox="0 0 12 12">
                        <path d="M12 4V0H8" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <svg className="absolute bottom-0 left-0 w-3.5 h-3.5 text-white/20 group-hover:text-accent-blue/70 transition-colors duration-500" viewBox="0 0 12 12">
                        <path d="M0 8v4h4" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <svg className="absolute bottom-0 right-0 w-3.5 h-3.5 text-white/20 group-hover:text-accent-blue/70 transition-colors duration-500" viewBox="0 0 12 12">
                        <path d="M12 8v4H8" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>

                    {/* Scan line on hover */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent"
                        style={{ animation: "scan-line 2.5s ease-in-out infinite" }}
                      />
                    </div>

                    {/* Inner fill on hover */}
                    <div className="absolute inset-0 bg-accent-blue/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Text */}
                    <span
                      className="relative z-10 flex items-center gap-4 text-sm sm:text-base tracking-[0.35em] uppercase text-white/80 transition-colors duration-500 group-hover:text-white"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Begin Mission
                      <svg
                        className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-80 group-hover:translate-x-0 transition-all duration-500"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </button>

                  {/* Spacebar hint */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="text-[10px] tracking-[0.3em] uppercase text-white/35"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Press Space
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
