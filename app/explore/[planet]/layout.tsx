import type { Metadata } from "next";
import { CELESTIAL_MAP, PLANETS, SUN } from "@/data/planets";

export function generateStaticParams() {
  return [SUN, ...PLANETS].map((body) => ({ planet: body.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ planet: string }>;
}): Promise<Metadata> {
  const { planet } = await params;
  const body = CELESTIAL_MAP.get(planet);
  if (!body) return { title: "Solar Odyssey" };

  return {
    title: `${body.name} — Solar Odyssey`,
    description: body.facts.description,
    openGraph: {
      title: `${body.name} — Solar Odyssey`,
      description: body.facts.description,
      images: [`/gallery/${body.id}/1.webp`],
    },
  };
}

export default function PlanetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
