"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { CELESTIAL_MAP, getBodyStats } from "@/data/planets";

const EARTH_RADIUS_KM = 6371;

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex flex-col gap-1.5 border-l pl-4" style={{ borderColor: `${accent}33` }}>
      <span
        className="text-[11px] uppercase tracking-[0.25em] text-white/55"
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

export default function PlanetInfoPanel() {
  const router = useRouter();
  const activePlanet = useStore((s) => s.activePlanet);
  const setActivePlanet = useStore((s) => s.setActivePlanet);
  const planet = activePlanet ? CELESTIAL_MAP.get(activePlanet) : undefined;

  const sizeRatio = planet ? planet.facts.radiusKm / EARTH_RADIUS_KM : 1;
  // Log-ish bar so the Sun (109×) doesn't flatten everything
  const barWidth = planet
    ? Math.min(100, Math.max(4, (Math.log10(sizeRatio * 10) / Math.log10(1100)) * 100))
    : 0;

  return (
    <AnimatePresence>
      {planet && (
        <motion.aside
          key={planet.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto fixed right-6 top-1/2 -translate-y-1/2 z-20 w-[440px] max-w-[calc(100vw-3rem)]"
        >
          <div className="relative overflow-hidden border border-white/10 bg-space-black/75 backdrop-blur-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Accent top line */}
            <div
              className="absolute top-0 inset-x-0 h-px z-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${planet.accentColor}, transparent)`,
              }}
            />

            {/* Texture hero strip */}
            <div className="relative h-36 overflow-hidden">
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(/textures/planets/${planet.id}/2k.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 35%",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-space-black/30 via-space-black/40 to-space-black" />
              {/* Scanline texture */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)",
                }}
              />

              <button
                onClick={() => setActivePlanet(null)}
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 border border-white/15 bg-space-black/50 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>

              {/* Name over hero */}
              <div className="absolute bottom-0 left-8 right-8 pb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1 h-1 rounded-full animate-pulse"
                    style={{ background: planet.accentColor }}
                  />
                  <span
                    className="text-[11px] uppercase tracking-[0.4em]"
                    style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
                  >
                    {planet.classification}
                  </span>
                </div>
                <h2
                  className="mt-1.5 text-5xl font-medium tracking-[0.12em] text-white uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {planet.name}
                </h2>
              </div>
            </div>

            <div className="px-8 pt-6 pb-8">
              <p
                className="text-[15px] leading-relaxed text-white/60 font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {planet.facts.description}
              </p>

              {/* Size vs Earth */}
              <div className="mt-7">
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[11px] uppercase tracking-[0.25em] text-white/55"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Size vs Earth
                  </span>
                  <span
                    className="text-xs tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
                  >
                    {sizeRatio >= 10 ? sizeRatio.toFixed(0) : sizeRatio.toFixed(2)}×
                  </span>
                </div>
                <div className="mt-2.5 h-[3px] w-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="h-full"
                    style={{
                      background: `linear-gradient(90deg, ${planet.accentColor}66, ${planet.accentColor})`,
                    }}
                  />
                </div>
              </div>

              {/* Stats grid */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
                {getBodyStats(planet)
                  .slice(0, 6)
                  .map((stat) => (
                    <Stat
                      key={stat.label}
                      label={stat.label}
                      value={stat.value}
                      accent={planet.accentColor}
                    />
                  ))}
              </div>

              {/* Did you know */}
              <div
                className="mt-8 border px-5 py-4"
                style={{ borderColor: `${planet.accentColor}26`, background: `${planet.accentColor}0a` }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
                >
                  Did you know
                </span>
                <p
                  className="mt-2 text-[15px] leading-relaxed text-white/75 font-light"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {planet.funFacts[0]}
                </p>
              </div>

              <button
                onClick={() => router.push(`/explore/${planet.id}`)}
                className="group mt-7 w-full relative flex items-center justify-center gap-3 py-4 cursor-pointer overflow-hidden border transition-all duration-500"
                style={{ borderColor: `${planet.accentColor}40` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${planet.accentColor}1f, transparent)` }}
                />
                <span
                  className="relative text-xs uppercase tracking-[0.35em] text-white/75 group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Initiate Approach
                </span>
                <svg
                  className="relative w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
                  style={{ color: planet.accentColor }}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
