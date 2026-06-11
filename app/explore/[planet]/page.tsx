"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store";
import { CELESTIAL_MAP } from "@/data/planets";
import PlanetDetailDashboard from "@/components/ui/PlanetDetailDashboard";
import { useBodyShortcuts } from "@/hooks/useBodyShortcuts";

export default function PlanetDetailPage() {
  const { planet: planetId } = useParams<{ planet: string }>();
  const router = useRouter();
  const setScene = useStore((s) => s.setScene);
  const setActivePlanet = useStore((s) => s.setActivePlanet);

  const planet = planetId ? CELESTIAL_MAP.get(planetId) : undefined;

  useBodyShortcuts();

  useEffect(() => {
    if (!planet) {
      router.replace("/explore");
      return;
    }
    setActivePlanet(planet.id);
    setScene("planet-detail");
    return () => useStore.getState().setActiveMoon(null);
  }, [planet, router, setActivePlanet, setScene]);

  if (!planet) return null;

  return <PlanetDetailDashboard planet={planet} />;
}
