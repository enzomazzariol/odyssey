"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import StarField from "@/components/three/StarField";
import ShootingStars from "@/components/three/ShootingStars";
import SpaceStation from "@/components/three/SpaceStation";
import GalaxyNebula from "@/components/three/GalaxyNebula";

export default function IntroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const viewportWidth = useThree((s) => s.size.width);
  const isDesktop = viewportWidth >= 1024;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.004;
      groupRef.current.rotation.x = Math.sin(t * 0.003) * 0.015;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <StarField />
        <ShootingStars />
        <GalaxyNebula />
      </group>

      {/* Station sits in the left column on desktop, behind the copy on mobile */}
      <SpaceStation
        position={isDesktop ? [-10.5, -0.5, 52] : [0, 5, 44]}
        rotation={[0.5, 0.55, 0.1]}
        scale={isDesktop ? 1.05 : 0.8}
      />

      {/* Key warm light + cool fill for the station */}
      <ambientLight intensity={0.12} />
      <directionalLight position={[18, 6, 70]} intensity={2.2} color="#ffe2c0" />
      <directionalLight position={[-30, -4, 40]} intensity={0.5} color="#4a9eff" />
    </group>
  );
}
