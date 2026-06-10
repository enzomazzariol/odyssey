"use client";

import { useEffect } from "react";
import { useStore } from "@/store";
import IntroOverlay from "@/components/ui/IntroOverlay";
import Galaxy from "@/components/ui/Galaxy";

export default function HomePage() {
  const setScene = useStore((s) => s.setScene);

  useEffect(() => {
    setScene("intro");
  }, [setScene]);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Galaxy
          speed={0.3}
          rotationSpeed={0.03}
          glowIntensity={0.4}
          density={1.2}
          hueShift={200}
          saturation={0.2}
          twinkleIntensity={0.4}
          transparent={false}
          mouseRepulsion={false}
          repulsionStrength={0.3}
        />
      </div>
      <IntroOverlay />
    </>
  );
}
