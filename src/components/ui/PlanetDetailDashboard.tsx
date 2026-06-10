"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { PlanetData } from "@/data/types";
import { PLANETS, getBodyStats } from "@/data/planets";
import { useStore } from "@/store";

const ease = [0.25, 0.1, 0.25, 1] as const;

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-[9px] uppercase tracking-[0.25em] text-white/35"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
      <span className="text-base text-white/90 font-light" style={{ fontFamily: "var(--font-body)" }}>
        {value}
      </span>
    </div>
  );
}

export default function PlanetDetailDashboard({ planet }: { planet: PlanetData }) {
  const router = useRouter();
  const isAnimating = useStore((s) => s.isAnimating);

  // The Sun sits before Mercury in the journey: prev wraps to Neptune, next is Mercury
  const index = PLANETS.findIndex((p) => p.id === planet.id);
  const prev = index === -1 ? PLANETS[PLANETS.length - 1] : PLANETS[(index - 1 + PLANETS.length) % PLANETS.length];
  const next = index === -1 ? PLANETS[0] : PLANETS[(index + 1) % PLANETS.length];
  const stats = getBodyStats(planet);

  return (
    <>
      {/* Back to overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-6 left-8 z-20"
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
          <span className="text-[10px] uppercase tracking-[0.3em]">System Overview</span>
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        {isAnimating ? (
          /* Approach phase */
          <motion.div
            key={`approach-${planet.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-16 inset-x-0 z-20 flex flex-col items-center gap-3 pointer-events-none"
          >
            <span
              className="text-[10px] uppercase tracking-[0.45em] animate-pulse"
              style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
            >
              Approaching
            </span>
            <span
              className="text-2xl font-light tracking-[0.35em] uppercase text-white/90"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {planet.name}
            </span>
          </motion.div>
        ) : (
          /* Dashboard */
          <motion.div
            key={`dash-${planet.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
            className="pointer-events-none"
          >
            {/* Left panel — identity & description */}
            <motion.section
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
              className="fixed left-8 top-1/2 -translate-y-1/2 z-20 w-[320px] max-w-[38vw] hidden md:block"
            >
              <span
                className="text-[10px] uppercase tracking-[0.4em]"
                style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
              >
                {planet.classification}
              </span>
              <h1
                className="mt-3 text-5xl lg:text-6xl font-light tracking-[0.12em] uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {planet.name}
              </h1>
              <div className="mt-5 h-px w-24 bg-gradient-to-r from-white/30 to-transparent" />
              <p
                className="mt-5 text-sm leading-relaxed text-white/55 font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {planet.facts.description}
              </p>
            </motion.section>

            {/* Right panel — did you know */}
            <motion.section
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-20 w-[280px] hidden lg:block"
            >
              <span
                className="text-[9px] uppercase tracking-[0.35em]"
                style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
              >
                Did you know
              </span>
              <ul className="mt-4 flex flex-col gap-5">
                {planet.funFacts.map((fact, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 + i * 0.18, ease }}
                    className="flex gap-3"
                  >
                    <span
                      className="mt-[7px] w-1 h-1 shrink-0 rounded-full"
                      style={{ background: planet.accentColor }}
                    />
                    <p
                      className="text-[13px] leading-relaxed text-white/55 font-light"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {fact}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Bottom telemetry bar — stats */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="fixed bottom-0 inset-x-0 z-20 px-8 pb-6"
            >
              {/* Mobile: name above the bar */}
              <div className="md:hidden mb-4">
                <span
                  className="text-[9px] uppercase tracking-[0.4em]"
                  style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
                >
                  {planet.classification}
                </span>
                <h1
                  className="text-3xl font-light tracking-[0.15em] uppercase text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {planet.name}
                </h1>
              </div>

              <div className="border-t border-white/10 pt-5 flex items-end justify-between gap-6">
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {stats.map((stat) => (
                    <Stat key={stat.label} label={stat.label} value={stat.value} />
                  ))}
                </div>

                {/* Prev / next navigation */}
                <div className="pointer-events-auto flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => router.push(`/explore/${prev.id}`)}
                    className="group flex items-center gap-2 px-3 py-2 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
                    style={{ fontFamily: "var(--font-mono)" }}
                    aria-label={`Previous: ${prev.name}`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M10 3L5 8l5 5" />
                    </svg>
                    <span className="hidden lg:inline text-[9px] uppercase tracking-[0.25em]">{prev.name}</span>
                  </button>
                  <div className="h-4 w-px bg-white/15" />
                  <button
                    onClick={() => router.push(`/explore/${next.id}`)}
                    className="group flex items-center gap-2 px-3 py-2 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
                    style={{ fontFamily: "var(--font-mono)" }}
                    aria-label={`Next: ${next.name}`}
                  >
                    <span className="hidden lg:inline text-[9px] uppercase tracking-[0.25em]">{next.name}</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
