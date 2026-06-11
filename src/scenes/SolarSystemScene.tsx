"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import StarField from "@/components/three/StarField";
import Sun from "@/components/three/Sun";
import Planet from "@/components/three/Planet";
import OrbitRing from "@/components/three/OrbitRing";
import AsteroidBelt from "@/components/three/AsteroidBelt";
import Comet from "@/components/three/Comet";
import { PLANETS, PLUTO } from "@/data/planets";
import { CAMERA, TIMING } from "@/lib/constants";
import { useStore } from "@/store";

export default function SolarSystemScene() {
  const camera = useThree((s) => s.camera);
  const isAnimating = useStore((s) => s.isAnimating);
  const setIsAnimating = useStore((s) => s.setIsAnimating);
  const hoveredPlanet = useStore((s) => s.hoveredPlanet);

  useEffect(() => {
    setIsAnimating(true);
    const target = CAMERA.solarSystemPosition;
    const tween = gsap.to(camera.position, {
      x: target[0],
      y: target[1],
      z: target[2],
      duration: TIMING.cameraFlightDuration,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(0, 0, 0),
      onComplete: () => setIsAnimating(false),
    });
    return () => {
      tween.kill();
      setIsAnimating(false);
    };
  }, [camera, setIsAnimating]);

  return (
    <group>
      <StarField />
      {/* Ambient + faint cool hemisphere fill so planets' night sides stay readable */}
      <ambientLight intensity={0.15} />
      <hemisphereLight args={["#1a2a4a", "#050508", 0.4]} />
      <Sun interactive />
      <AsteroidBelt />

      {PLANETS.map((planet) => (
        <group key={planet.id}>
          <OrbitRing radius={planet.orbitRadius} highlighted={hoveredPlanet === planet.id} />
          <Planet data={planet} />
        </group>
      ))}

      {/* Easter eggs: Pluto on its inclined orbit, and a wandering comet */}
      <group rotation={[0.3, 0, 0.1]}>
        <OrbitRing radius={PLUTO.orbitRadius} highlighted={hoveredPlanet === "pluto"} />
        <Planet data={PLUTO} />
      </group>
      <Comet />

      <OrbitControls
        enabled={!isAnimating}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={170}
        maxPolarAngle={Math.PI * 0.85}
        target={[0, 0, 0]}
      />
    </group>
  );
}
