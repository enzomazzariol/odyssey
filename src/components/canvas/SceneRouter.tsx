"use client";

import { useStore } from "@/store";
import IntroScene from "@/scenes/IntroScene";

export default function SceneRouter() {
  const currentScene = useStore((s) => s.currentScene);

  switch (currentScene) {
    case "intro":
      return <IntroScene />;
    default:
      return <IntroScene />;
  }
}
