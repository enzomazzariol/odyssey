"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store";
import { audio } from "@/lib/audio";
import { useT } from "@/i18n";

/** Persistent bottom-right cluster: language toggle + sound toggle */
export default function GlobalControls() {
  const audioMuted = useStore((s) => s.audioMuted);
  const setAudioMuted = useStore((s) => s.setAudioMuted);
  const lang = useStore((s) => s.lang);
  const setLang = useStore((s) => s.setLang);
  const t = useT();

  // Restore persisted prefs
  useEffect(() => {
    const savedLang = localStorage.getItem("odyssey-lang");
    if (savedLang === "es" || savedLang === "en") setLang(savedLang);
    const savedMuted = localStorage.getItem("odyssey-muted");
    if (savedMuted === "1") {
      setAudioMuted(true);
      audio.setMuted(true);
    }
  }, [setLang, setAudioMuted]);

  // Audio needs a user gesture to start
  useEffect(() => {
    const start = () => audio.init();
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const toggleMute = () => {
    const next = !audioMuted;
    setAudioMuted(next);
    audio.setMuted(next);
    localStorage.setItem("odyssey-muted", next ? "1" : "0");
  };

  const toggleLang = (next: "en" | "es") => {
    setLang(next);
    localStorage.setItem("odyssey-lang", next);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-3"
    >
      {/* Language toggle */}
      <div
        className="flex items-center border border-white/10 bg-space-black/50 backdrop-blur-md"
        style={{ fontFamily: "var(--font-mono)" }}
        role="group"
        aria-label="Language"
      >
        {(["en", "es"] as const).map((code) => (
          <button
            key={code}
            onClick={() => toggleLang(code)}
            aria-pressed={lang === code}
            className="px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-colors duration-300"
            style={{
              color: lang === code ? "#4a9eff" : "rgba(255,255,255,0.4)",
              background: lang === code ? "rgba(74,158,255,0.08)" : "transparent",
            }}
          >
            {code}
          </button>
        ))}
      </div>

      {/* Mute */}
      <button
        onClick={toggleMute}
        aria-label={audioMuted ? t("unmute") : t("mute")}
        className="flex items-center justify-center w-8 h-8 border border-white/10 bg-space-black/50 backdrop-blur-md text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 cursor-pointer"
      >
        {audioMuted ? (
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 6v4h2.5L8 13V3L4.5 6H2z" fill="currentColor" stroke="none" />
            <path d="M11 6l4 4M15 6l-4 4" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 6v4h2.5L8 13V3L4.5 6H2z" fill="currentColor" stroke="none" />
            <path d="M10.5 5.5a3.5 3.5 0 010 5M12.5 3.5a6 6 0 010 9" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}
