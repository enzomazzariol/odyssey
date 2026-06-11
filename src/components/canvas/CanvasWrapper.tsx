"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import SceneRouter from "./SceneRouter";
import Effects from "./Effects";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { CAMERA } from "@/lib/constants";
import { useStore } from "@/store";

/** Brief black crossfade on every scene swap so transitions feel cut together */
function SceneFade() {
  const currentScene = useStore((s) => s.currentScene);
  const isFirst = useRef(true);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={currentScene}
        initial={{ opacity: isFirst.current ? 0 : 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="pointer-events-none fixed inset-0 z-[5] bg-space-black"
      />
    </AnimatePresence>
  );
}

export default function CanvasWrapper() {
  // Postprocessing and full dpr are skipped on coarse-pointer / small devices,
  // and dropped dynamically if the frame rate declines.
  const [isLowPower, setIsLowPower] = useState(false);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    setIsLowPower(query.matches);
    const onChange = (e: MediaQueryListEvent) => setIsLowPower(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

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
        dpr={degraded ? [1, 1.25] : isLowPower ? [1, 1.5] : [1, 2]}
        style={{ background: "transparent" }}
        onCreated={(state) => {
          if (process.env.NODE_ENV === "development") {
            (window as unknown as { __r3f?: unknown }).__r3f = state;
          }
        }}
      >
        <PerformanceMonitor onDecline={() => setDegraded(true)} />
        <Suspense fallback={null}>
          <SceneRouter />
          <Preload all />
        </Suspense>
        <Effects enabled={!isLowPower && !degraded} />
      </Canvas>
      <SceneFade />
      <LoadingOverlay />
    </div>
  );
}
