"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import SceneRouter from "./SceneRouter";
import { CAMERA } from "@/lib/constants";

export default function CanvasWrapper() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [...CAMERA.introPosition],
          fov: CAMERA.defaultFov,
          near: 0.1,
          far: 2000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneRouter />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
