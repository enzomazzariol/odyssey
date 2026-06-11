"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeSoftGlow(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.28)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.07)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface Puff {
  position: [number, number, number];
  scale: number;
  color: string;
  opacity: number;
}

/** A bright, colorful nebula cluster — large tinted additive sprites */
const PUFFS: Puff[] = [
  { position: [-30, 8, -160], scale: 150, color: "#6a4dff", opacity: 0.32 },
  { position: [10, -6, -180], scale: 170, color: "#2a7fff", opacity: 0.3 },
  { position: [-55, -14, -150], scale: 110, color: "#ff5f8f", opacity: 0.22 },
  { position: [35, 18, -170], scale: 120, color: "#00d4ff", opacity: 0.22 },
  { position: [-12, 26, -190], scale: 130, color: "#9a5cff", opacity: 0.25 },
  { position: [60, -20, -200], scale: 100, color: "#ff9a5c", opacity: 0.16 },
  // Bright core
  { position: [-22, 2, -140], scale: 55, color: "#ffffff", opacity: 0.5 },
  { position: [-22, 2, -140], scale: 26, color: "#fff6e8", opacity: 0.8 },
];

export default function GalaxyNebula() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(makeSoftGlow, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.z = time * 0.004;
      groupRef.current.position.x = Math.sin(time * 0.02) * 3;
    }
  });

  return (
    <group ref={groupRef}>
      {PUFFS.map((puff, i) => (
        <sprite key={i} position={puff.position} scale={[puff.scale, puff.scale * 0.62, 1]}>
          <spriteMaterial
            map={texture}
            color={puff.color}
            transparent
            opacity={puff.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
