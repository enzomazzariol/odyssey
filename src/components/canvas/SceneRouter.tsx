"use client";

import { useStore } from "@/store";
import IntroScene from "@/scenes/IntroScene";
import SolarSystemScene from "@/scenes/SolarSystemScene";
import PlanetDetailScene from "@/scenes/PlanetDetailScene";
import ScaleScene from "@/scenes/ScaleScene";
import CompareScene from "@/scenes/CompareScene";

export default function SceneRouter() {
  const currentScene = useStore((s) => s.currentScene);

  switch (currentScene) {
    case "intro":
      return <IntroScene />;
    case "solar-system":
      return <SolarSystemScene />;
    case "planet-detail":
      return <PlanetDetailScene />;
    case "scale":
      return <ScaleScene />;
    case "compare":
      return <CompareScene />;
    default:
      return <IntroScene />;
  }
}
