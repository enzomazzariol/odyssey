"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { SOLAR_SYSTEM } from "@/lib/constants";
import { useStore } from "@/store";

export function makeGlowTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255, 200, 120, 0.55)");
  gradient.addColorStop(0.3, "rgba(255, 150, 60, 0.18)");
  gradient.addColorStop(0.7, "rgba(255, 110, 40, 0.04)");
  gradient.addColorStop(1, "rgba(255, 100, 30, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function Sun({ interactive = false }: { interactive?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = usePlanetTexture("sun");
  const glowTexture = useMemo(makeGlowTexture, []);
  const setActivePlanet = useStore((s) => s.setActivePlanet);
  const setHoveredPlanet = useStore((s) => s.setHoveredPlanet);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setActivePlanet("sun");
  };

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHoveredPlanet("sun");
    document.body.style.cursor = "pointer";
  };

  const handleOut = () => {
    if (!interactive) return;
    setHoveredPlanet(null);
    document.body.style.cursor = "auto";
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      >
        <sphereGeometry args={[SOLAR_SYSTEM.sunRadius, 64, 64]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Soft corona halo */}
      <sprite scale={[SOLAR_SYSTEM.sunRadius * 6, SOLAR_SYSTEM.sunRadius * 6, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* decay=1 keeps outer planets readable — physical falloff is too harsh at stylized distances */}
      <pointLight intensity={40} decay={1} color="#fff4e0" />
    </group>
  );
}
