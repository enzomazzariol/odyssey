"use client";

import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { useT } from "@/i18n";
import { audio } from "@/lib/audio";

const ease = [0.25, 0.1, 0.25, 1] as const;
const TITLE = "SOLAR ODYSSEY";

function CornerLabel({
  position,
  delay,
  align = "left",
  children,
}: {
  position: string;
  delay: number;
  align?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay, ease }}
      className={`fixed ${position} z-10 flex flex-col gap-1 ${align === "right" ? "items-end text-right" : "items-start"}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </motion.div>
  );
}

export default function IntroOverlay() {
  const router = useRouter();
  const setScene = useStore((s) => s.setScene);
  const t = useT();

  const handleBeginMission = useCallback(() => {
    audio.whoosh();
    setScene("solar-system");
    router.push("/explore");
  }, [setScene, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleBeginMission();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleBeginMission]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Cinematic frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease }}
        className="absolute inset-5 sm:inset-7 border border-white/[0.07]"
      />
      {[
        "top-5 left-5 sm:top-7 sm:left-7 border-t border-l",
        "top-5 right-5 sm:top-7 sm:right-7 border-t border-r",
        "bottom-5 left-5 sm:bottom-7 sm:left-7 border-b border-l",
        "bottom-5 right-5 sm:bottom-7 sm:right-7 border-b border-r",
      ].map((pos) => (
        <motion.div
          key={pos}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease }}
          className={`absolute w-5 h-5 border-white/30 ${pos}`}
        />
      ))}

      {/* ───────── Corner HUD ───────── */}
      <CornerLabel position="top-10 left-10 sm:top-12 sm:left-12" delay={2.6}>
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/55">{t("cornerSystem")}</span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{t("cornerArm")}</span>
      </CornerLabel>

      <CornerLabel position="top-10 right-10 sm:top-12 sm:right-12" delay={2.8} align="right">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/55">{t("cornerVoyage")}</span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{t("cornerRange")}</span>
      </CornerLabel>

      <CornerLabel position="bottom-10 left-10 sm:bottom-12 sm:left-12" delay={3}>
        <span className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-white/55">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-accent-blue"
          />
          {t("cornerDeck")}
        </span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{t("cornerFeed")}</span>
      </CornerLabel>

      <CornerLabel position="bottom-10 right-10 sm:bottom-12 sm:right-12" delay={3.2} align="right">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/55">{t("cornerImagery")}</span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{t("cornerTextures")}</span>
      </CornerLabel>

      {/* Vertical side label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 3.4, ease }}
        className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[9px] tracking-[0.5em] uppercase text-white/25"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {t("sideProgram")}
      </motion.span>

      {/* ───────── Split composition: station left, copy right ───────── */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        {/* Left column: the 3D station shows through */}
        <div className="hidden lg:block" />

        {/* Right column: copy */}
        <div className="flex flex-col items-center lg:items-start justify-center px-8 sm:px-14 lg:pr-24">
          {/* Soft vignette for readability over the nebula */}
          <div
            className="absolute inset-y-0 right-0 w-full lg:w-[58%] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 65% 50%, rgba(2,3,8,0.55) 0%, rgba(2,3,8,0.15) 60%, transparent 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease }}
            className="relative flex items-center gap-4"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/40" />
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-white/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("heroEyebrow")}
            </span>
          </motion.div>

          {/* Title — single element so the animated cosmic fill flows across all letters */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(14px)", letterSpacing: "0.3em" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px) drop-shadow(0 0 22px rgba(140, 175, 255, 0.35))",
              letterSpacing: "0.12em",
            }}
            transition={{ duration: 2.4, delay: 0.8, ease }}
            className="title-cosmic relative mt-6 text-center lg:text-left text-[2.6rem] sm:text-6xl xl:text-7xl font-bold leading-[1.05]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {TITLE}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 1.9, ease }}
            className="relative mt-7 h-px w-44 sm:w-60 origin-left bg-gradient-to-r from-white/35 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 2.1, ease }}
            className="relative mt-6 max-w-lg text-center lg:text-left text-[15px] sm:text-base font-light leading-relaxed text-white/65"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t("heroTagline")}
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 2.4, ease }}
            className="relative mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/45"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>{t("statStar")}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/30" />
            <span>{t("statPlanets")}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/30" />
            <span>{t("statMoons")}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/30" />
            <span>{t("statYears")}</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 2.8, ease }}
            className="pointer-events-auto relative mt-10 flex flex-col items-center lg:items-start gap-4"
          >
            <button
              onClick={handleBeginMission}
              className="group relative cursor-pointer px-12 py-[18px] bg-transparent"
              style={{ animation: "button-breathe 3s ease-in-out infinite" }}
            >
              <div
                className="absolute -inset-4 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(74, 158, 255, 0.08) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute inset-0 border border-white/20 transition-all duration-700 group-hover:border-accent-blue/50"
                style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
              />
              <div className="absolute -inset-2 pointer-events-none">
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
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent"
                  style={{ animation: "scan-line 2.5s ease-in-out infinite" }}
                />
              </div>
              <div className="absolute inset-0 bg-accent-blue/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span
                className="relative z-10 flex items-center gap-4 text-sm tracking-[0.35em] uppercase text-white/80 transition-colors duration-500 group-hover:text-white"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("beginMission")}
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

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 1.5, delay: 3.6 }}
              className="text-[10px] tracking-[0.3em] uppercase text-white/45"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("pressSpace")}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
