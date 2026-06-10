"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface OrbitRingProps {
  radius: number;
  highlighted?: boolean;
}

export default function OrbitRing({ radius, highlighted = false }: OrbitRingProps) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial
        color={highlighted ? "#4a9eff" : "#8fa8c8"}
        transparent
        opacity={highlighted ? 0.65 : 0.28}
      />
    </lineLoop>
  );
}
