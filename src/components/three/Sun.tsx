"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { audio } from "@/lib/audio";
import { SOLAR_SYSTEM } from "@/lib/constants";
import { useStore } from "@/store";

/** HDR-ish boost pushes the sun past the bloom luminance threshold */
export const SUN_BLOOM_COLOR = new THREE.Color(2.2, 2.0, 1.7);

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

function makeStreakTexture(): THREE.Texture {
  const w = 512;
  const h = 64;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, w, 0);
  gradient.addColorStop(0, "rgba(255,220,180,0)");
  gradient.addColorStop(0.5, "rgba(255,235,210,0.9)");
  gradient.addColorStop(1, "rgba(255,220,180,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, h * 0.42, w, h * 0.16);
  const soft = ctx.createLinearGradient(0, 0, w, 0);
  soft.addColorStop(0, "rgba(255,200,150,0)");
  soft.addColorStop(0.5, "rgba(255,210,170,0.25)");
  soft.addColorStop(1, "rgba(255,200,150,0)");
  ctx.fillStyle = soft;
  ctx.fillRect(0, 0, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Anamorphic streak that brightens as the camera looks straight at the sun */
function LensFlare() {
  const streakRef = useRef<THREE.Sprite>(null);
  const streakTexture = useMemo(makeStreakTexture, []);
  const sunWorld = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const toSun = useMemo(() => new THREE.Vector3(), []);
  const forward = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    if (!streakRef.current) return;
    toSun.copy(sunWorld).sub(camera.position).normalize();
    camera.getWorldDirection(forward);
    const facing = forward.dot(toSun);
    const intensity = THREE.MathUtils.smoothstep(facing, 0.88, 0.995);
    (streakRef.current.material as THREE.SpriteMaterial).opacity = intensity * 0.55;
  });

  return (
    <sprite ref={streakRef} scale={[42, 5, 1]} raycast={() => null}>
      <spriteMaterial
        map={streakTexture}
        transparent
        opacity={0}
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
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
    audio.click();
    setActivePlanet("sun");
  };

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    audio.hover();
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
        <meshBasicMaterial map={texture} color={SUN_BLOOM_COLOR} toneMapped={false} />
      </mesh>

      {/* Soft corona halo */}
      <sprite scale={[SOLAR_SYSTEM.sunRadius * 6, SOLAR_SYSTEM.sunRadius * 6, 1]} raycast={() => null}>
        <spriteMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <LensFlare />

      {/* decay=1 keeps outer planets readable — physical falloff is too harsh at stylized distances */}
      <pointLight intensity={40} decay={1} color="#fff4e0" />
    </group>
  );
}
