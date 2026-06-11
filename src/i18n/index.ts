"use client";

import { useStore } from "@/store";
import { UI, type UIKey, type Lang } from "./ui";
import { ES_BODY, ES_CLASSIFICATION, ES_MOON, ES_CAPTION } from "./content-es";
import type { PlanetData } from "@/data/types";
import type { MoonData } from "@/data/moons";
import type { GalleryImage } from "@/data/gallery";

export function useLang(): Lang {
  return useStore((s) => s.lang);
}

/** UI string translator */
export function useT() {
  const lang = useLang();
  return (key: UIKey) => UI[lang][key];
}

export function localizedDescription(body: PlanetData, lang: Lang): string {
  return lang === "es" ? (ES_BODY[body.id]?.description ?? body.facts.description) : body.facts.description;
}

export function localizedFunFacts(body: PlanetData, lang: Lang): string[] {
  return lang === "es" ? (ES_BODY[body.id]?.funFacts ?? body.funFacts) : body.funFacts;
}

export function localizedClassification(body: PlanetData, lang: Lang): string {
  return lang === "es" ? (ES_CLASSIFICATION[body.classification] ?? body.classification) : body.classification;
}

export function localizedMoon(moon: MoonData, lang: Lang): { description: string; funFact: string } {
  if (lang === "es" && ES_MOON[moon.id]) return ES_MOON[moon.id];
  return { description: moon.description, funFact: moon.funFact };
}

export function localizedCaption(image: GalleryImage, lang: Lang): string {
  return lang === "es" ? (ES_CAPTION[image.src] ?? image.caption) : image.caption;
}
