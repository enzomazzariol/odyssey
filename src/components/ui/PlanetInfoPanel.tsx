"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { PLANET_MAP } from "@/data/planets";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[9px] uppercase tracking-[0.25em] text-white/35"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
      <span className="text-sm text-white/85 font-light" style={{ fontFamily: "var(--font-body)" }}>
        {value}
      </span>
    </div>
  );
}

export default function PlanetInfoPanel() {
  const activePlanet = useStore((s) => s.activePlanet);
  const setActivePlanet = useStore((s) => s.setActivePlanet);
  const planet = activePlanet ? PLANET_MAP.get(activePlanet) : undefined;

  return (
    <AnimatePresence>
      {planet && (
        <motion.aside
          key={planet.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto fixed right-6 top-1/2 -translate-y-1/2 z-20 w-[320px] max-w-[calc(100vw-3rem)]"
        >
          <div className="relative border border-white/10 bg-space-black/70 backdrop-blur-md p-7">
            {/* Corner accents */}
            <div
              className="absolute top-0 left-0 w-3 h-3 border-t border-l"
              style={{ borderColor: planet.accentColor }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 border-b border-r"
              style={{ borderColor: planet.accentColor }}
            />

            <button
              onClick={() => setActivePlanet(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            <span
              className="text-[10px] uppercase tracking-[0.35em]"
              style={{ fontFamily: "var(--font-mono)", color: planet.accentColor }}
            >
              Planetary Database
            </span>

            <h2
              className="mt-2 text-3xl font-light tracking-[0.15em] text-white uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {planet.name}
            </h2>

            <p
              className="mt-4 text-sm leading-relaxed text-white/60 font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {planet.facts.description}
            </p>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-white/15 to-transparent" />

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
              <Stat label="Radius" value={`${planet.facts.radiusKm.toLocaleString()} km`} />
              <Stat label="From Sun" value={`${planet.facts.distanceFromSunMkm.toLocaleString()} M km`} />
              <Stat label="Day" value={planet.facts.dayLength} />
              <Stat label="Year" value={planet.facts.yearLength} />
              <Stat label="Avg Temp" value={planet.facts.avgTemp} />
              <Stat label="Moons" value={String(planet.facts.moons)} />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
