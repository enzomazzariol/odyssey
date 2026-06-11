"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/** Postprocessing — toggled off on low-power devices or after FPS decline */
export default function Effects({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;

  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} luminanceSmoothing={0.4} intensity={0.85} mipmapBlur />
    </EffectComposer>
  );
}
