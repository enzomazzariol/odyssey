"use client";

import { useStore } from "@/store";
import IntroScene from "@/scenes/IntroScene";
import SolarSystemScene from "@/scenes/SolarSystemScene";

export default function SceneRouter() {
  const currentScene = useStore((s) => s.currentScene);

  switch (currentScene) {
    case "intro":
      return <IntroScene />;
    case "solar-system":
      return <SolarSystemScene />;
    default:
      return <IntroScene />;
  }
}
