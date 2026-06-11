"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { useT } from "@/i18n";

export default function LoadingOverlay() {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);
  const t = useT();

  useEffect(() => {
    if (hidden) return;
    // Done loading (or nothing queued) — hold briefly so the bar reads 100%
    if (!active && progress >= 100) {
      const t = setTimeout(() => setHidden(true), 650);
      return () => clearTimeout(t);
    }
    // Nothing ever started loading (fully cached) — don't trap the user
    if (!active && progress === 0) {
      const t = setTimeout(() => setHidden(true), 1800);
      return () => clearTimeout(t);
    }
  }, [active, progress, hidden]);

  // Absolute safety net
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-black"
        >
          <span
            className="text-[11px] tracking-[0.5em] uppercase text-white/55"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Solar Odyssey
          </span>

          <div className="mt-6 w-56 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-blue/60 to-accent-blue"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <span
            className="mt-4 text-[10px] tracking-[0.35em] uppercase text-white/35 tabular-nums"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("initializing")} · {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
