"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import StarField from "@/components/three/StarField";
import { SaturnRings } from "@/components/three/Planet";
import { makeGlowTexture, SUN_BLOOM_COLOR } from "@/components/three/Sun";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { CELESTIAL_MAP } from "@/data/planets";
import type { PlanetData } from "@/data/types";
import { useStore } from "@/store";

const DEG = Math.PI / 180;
/** The larger body of the pair renders at this radius */
const MAX_DISPLAY_RADIUS = 2.0;
/** Keep tiny bodies at least visible as a dot — the contrast is the lesson */
const MIN_DISPLAY_RADIUS = 0.03;
const BODY_OFFSET_X = 2.75;

function CompareBody({
  body,
  radius,
  x,
}: {
  body: PlanetData;
  radius: number;
  x: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isSun = body.id === "sun";
  const texture = usePlanetTexture(body.id, "2k.webp");
  const glowTexture = useMemo(() => (isSun ? makeGlowTexture() : null), [isSun]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group position={[x, 0, 0]} rotation={[0, 0, -body.axialTilt * DEG]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        {isSun ? (
          <meshBasicMaterial map={texture} color={SUN_BLOOM_COLOR} toneMapped={false} />
        ) : (
          <meshStandardMaterial map={texture} roughness={0.92} metalness={0} />
        )}
      </mesh>
      {glowTexture && (
        <sprite scale={[radius * 3, radius * 3, 1]}>
          <spriteMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      )}
      {body.hasRings && <SaturnRings planetRadius={radius} />}
    </group>
  );
}

export default function CompareScene() {
  const camera = useThree((s) => s.camera);
  const compareA = useStore((s) => s.compareA);
  const compareB = useStore((s) => s.compareB);
  const setIsAnimating = useStore((s) => s.setIsAnimating);

  const bodyA = CELESTIAL_MAP.get(compareA);
  const bodyB = CELESTIAL_MAP.get(compareB);

  useEffect(() => {
    setIsAnimating(true);
    const tween = gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 8.2,
      duration: 1.8,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(0, 0, 0),
      onComplete: () => setIsAnimating(false),
    });
    return () => {
      tween.kill();
      setIsAnimating(false);
    };
  }, [camera, setIsAnimating]);

  if (!bodyA || !bodyB) return null;

  const maxKm = Math.max(bodyA.facts.radiusKm, bodyB.facts.radiusKm);
  const radiusA = Math.max(MIN_DISPLAY_RADIUS, (bodyA.facts.radiusKm / maxKm) * MAX_DISPLAY_RADIUS);
  const radiusB = Math.max(MIN_DISPLAY_RADIUS, (bodyB.facts.radiusKm / maxKm) * MAX_DISPLAY_RADIUS);

  return (
    <group>
      <StarField />
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#1a2a4a", "#050508", 0.3]} />
      <directionalLight position={[-6, 4, 8]} intensity={2.6} color="#fff4e0" />

      <CompareBody key={`a-${bodyA.id}`} body={bodyA} radius={radiusA} x={-BODY_OFFSET_X} />
      <CompareBody key={`b-${bodyB.id}`} body={bodyB} radius={radiusB} x={BODY_OFFSET_X} />
    </group>
  );
}
