"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { MOONS } from "@/data/moons";
import { CELESTIAL_MAP } from "@/data/planets";
import { useLang, useT, localizedMoon } from "@/i18n";
import { audio } from "@/lib/audio";

export default function MoonInfoPanel() {
  const activeMoon = useStore((s) => s.activeMoon);
  const setActiveMoon = useStore((s) => s.setActiveMoon);
  const lang = useLang();
  const t = useT();

  const moon = activeMoon ? MOONS[activeMoon] : undefined;
  const planet = moon ? CELESTIAL_MAP.get(moon.planetId) : undefined;
  const text = moon ? localizedMoon(moon, lang) : undefined;

  const close = () => {
    audio.click();
    setActiveMoon(null);
  };

  return (
    <AnimatePresence>
      {moon && planet && text && (
        <motion.aside
          key={moon.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto fixed left-1/2 -translate-x-1/2 bottom-36 z-30 w-[420px] max-w-[calc(100vw-3rem)]"
        >
          <div className="relative border border-white/10 bg-space-black/80 backdrop-blur-xl px-7 py-6">
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${moon.accentColor}, transparent)`,
              }}
            />

            <button
              onClick={close}
              className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            <span
              className="text-[10px] uppercase tracking-[0.35em]"
              style={{ fontFamily: "var(--font-mono)", color: moon.accentColor }}
            >
              {t("moonOf")} {planet.name}
            </span>
            <h3
              className="mt-1 text-3xl font-medium tracking-[0.12em] uppercase text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {moon.name}
            </h3>

            <p
              className="mt-3 text-[14px] leading-relaxed text-white/60 font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {text.description}
            </p>

            <div className="mt-4 flex gap-8">
              {[
                [t("statRadius"), `${moon.radiusKm.toLocaleString()} km`],
                [t("distance"), `${(moon.distanceKm / 1000).toFixed(0)}k km`],
                [t("orbitalPeriod"), moon.orbitalPeriod],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span
                    className="text-[10px] uppercase tracking-[0.25em] text-white/40"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {label}
                  </span>
                  <span className="text-[14px] text-white/85 font-light" style={{ fontFamily: "var(--font-body)" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="mt-4 text-[13px] leading-relaxed font-light border-l-2 pl-3"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.6)",
                borderColor: moon.accentColor,
              }}
            >
              {text.funFact}
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
