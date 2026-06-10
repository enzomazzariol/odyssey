"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import StarField from "@/components/three/StarField";

export default function IntroScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.005;
      groupRef.current.rotation.x = Math.sin(t * 0.003) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <StarField />
      <ambientLight intensity={0.1} />
    </group>
  );
}
