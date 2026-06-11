"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { SUN, PLANETS, PLUTO, CELESTIAL_MAP, localizeFactValue } from "@/data/planets";
import type { PlanetData } from "@/data/types";
import { useLang, useT } from "@/i18n";
import { UI, type Lang } from "@/i18n/ui";

const ease = [0.25, 0.1, 0.25, 1] as const;
const ALL_BODIES = [SUN, ...PLANETS, PLUTO];

function BodySelect({
  value,
  onChange,
  exclude,
  accent,
}: {
  value: string;
  onChange: (id: string) => void;
  exclude: string;
  accent: string;
}) {
  return (
    <div className="relative pointer-events-auto">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-space-black/70 backdrop-blur-md border px-5 py-2.5 pr-10 text-[13px] uppercase tracking-[0.3em] text-white/90 cursor-pointer outline-none transition-colors duration-300 hover:border-white/40"
        style={{ fontFamily: "var(--font-mono)", borderColor: `${accent}40` }}
      >
        {ALL_BODIES.map((b) => (
          <option key={b.id} value={b.id} disabled={b.id === exclude} className="bg-space-dark">
            {b.name}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
        style={{ color: accent }}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </div>
  );
}

interface CompareRow {
  label: string;
  a: string;
  b: string;
  /** 1 = A wins, -1 = B wins, 0 = tie/non-comparable */
  winner: -1 | 0 | 1;
}

function buildRows(a: PlanetData, b: PlanetData, lang: Lang): CompareRow[] {
  const num = (x: number, y: number): -1 | 0 | 1 => (x === y ? 0 : x > y ? 1 : -1);
  const t = UI[lang];
  const v = (x: string) => localizeFactValue(x, lang);
  return [
    {
      label: t.rowRadius,
      a: `${a.facts.radiusKm.toLocaleString()} km`,
      b: `${b.facts.radiusKm.toLocaleString()} km`,
      winner: num(a.facts.radiusKm, b.facts.radiusKm),
    },
    {
      label: t.rowDistance,
      a: a.facts.distanceFromSunMkm ? `${a.facts.distanceFromSunMkm.toLocaleString()} M km` : "—",
      b: b.facts.distanceFromSunMkm ? `${b.facts.distanceFromSunMkm.toLocaleString()} M km` : "—",
      winner: num(a.facts.distanceFromSunMkm, b.facts.distanceFromSunMkm),
    },
    { label: t.rowDay, a: v(a.facts.dayLength), b: v(b.facts.dayLength), winner: 0 },
    { label: t.rowYear, a: v(a.facts.yearLength), b: v(b.facts.yearLength), winner: 0 },
    { label: t.rowTemp, a: v(a.facts.avgTemp), b: v(b.facts.avgTemp), winner: 0 },
    {
      label: t.rowGravity,
      a: `${a.facts.gravity} m/s²`,
      b: `${b.facts.gravity} m/s²`,
      winner: num(a.facts.gravity, b.facts.gravity),
    },
    {
      label: t.rowMoons,
      a: String(a.facts.moons),
      b: String(b.facts.moons),
      winner: num(a.facts.moons, b.facts.moons),
    },
  ];
}

export default function ComparePage() {
  const setScene = useStore((s) => s.setScene);
  const compareA = useStore((s) => s.compareA);
  const compareB = useStore((s) => s.compareB);
  const setCompareA = useStore((s) => s.setCompareA);
  const setCompareB = useStore((s) => s.setCompareB);
  const lang = useLang();
  const t = useT();

  useEffect(() => {
    setScene("compare");
  }, [setScene]);

  const a = CELESTIAL_MAP.get(compareA);
  const b = CELESTIAL_MAP.get(compareB);
  if (!a || !b) return null;

  const ratio = a.facts.radiusKm / b.facts.radiusKm;
  const bigger = ratio >= 1 ? a : b;
  const smaller = ratio >= 1 ? b : a;
  const factor = bigger.facts.radiusKm / smaller.facts.radiusKm;

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="fixed top-0 inset-x-0 z-20 flex items-start justify-between px-8 py-6 pointer-events-none"
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
          <span className="text-[11px] uppercase tracking-[0.3em]">{t("systemOverview")}</span>
        </Link>
        <div className="flex flex-col items-end gap-1">
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
            {t("compare")}
          </h1>
        </div>
      </motion.header>

      {/* Selectors */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease }}
        className="fixed top-24 inset-x-0 z-20 flex items-center justify-center gap-5 pointer-events-none px-6"
      >
        <BodySelect value={compareA} onChange={setCompareA} exclude={compareB} accent={a.accentColor} />
        <span
          className="text-[12px] uppercase tracking-[0.3em] text-white/50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("vs")}
        </span>
        <BodySelect value={compareB} onChange={setCompareB} exclude={compareA} accent={b.accentColor} />
      </motion.div>

      {/* Ratio headline */}
      <div className="fixed top-[9.5rem] inset-x-0 z-20 flex justify-center pointer-events-none px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${compareA}-${compareB}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[13px] tracking-[0.2em] text-white/60 uppercase text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {factor < 1.05 ? (
              <>{t("nearlyIdentical")}</>
            ) : (
              <>
                <span style={{ color: bigger.accentColor }}>{bigger.name}</span>
                {` ${t("isWord")} `}
                <span className="text-white/80">{factor >= 10 ? factor.toFixed(0) : factor.toFixed(1)}×</span>
                {` ${t("widerThan")} `}
                <span style={{ color: smaller.accentColor }}>{smaller.name}</span>
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Body name labels over each half */}
      <div className="fixed inset-x-0 top-1/2 z-20 hidden md:flex justify-between px-[12%] pointer-events-none -translate-y-[7.5rem]">
        {[{ body: a }, { body: b }].map(({ body }, i) => (
          <AnimatePresence mode="wait" key={i}>
            <motion.span
              key={body.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-light tracking-[0.3em] uppercase text-white/70"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {body.name}
            </motion.span>
          </AnimatePresence>
        ))}
      </div>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1, ease }}
        className="fixed bottom-0 inset-x-0 z-20 px-6 pb-6 flex justify-center pointer-events-none"
      >
        <div className="w-full max-w-3xl border-t border-white/10 pt-4 bg-gradient-to-t from-space-black/60 to-transparent">
          {buildRows(a, b, lang).map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-6 py-2"
            >
              <span
                className="text-right text-[15px] font-light transition-colors duration-500"
                style={{
                  fontFamily: "var(--font-body)",
                  color: row.winner === 1 ? a.accentColor : "rgba(255,255,255,0.75)",
                }}
              >
                {row.a}
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.3em] text-white/55 w-44 text-center"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {row.label}
              </span>
              <span
                className="text-left text-[15px] font-light transition-colors duration-500"
                style={{
                  fontFamily: "var(--font-body)",
                  color: row.winner === -1 ? b.accentColor : "rgba(255,255,255,0.75)",
                }}
              >
                {row.b}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
