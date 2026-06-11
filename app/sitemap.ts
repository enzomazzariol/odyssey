import type { MetadataRoute } from "next";
import { PLANETS, SUN } from "@/data/planets";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://solar-odyssey.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const bodies = [SUN, ...PLANETS].map((body) => ({
    url: `${BASE_URL}/explore/${body.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/explore`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/scale`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compare`, changeFrequency: "monthly", priority: 0.7 },
    ...bodies,
  ];
}
