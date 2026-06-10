"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import StarField from "@/components/three/StarField";
import { SaturnRings } from "@/components/three/Planet";
import { makeGlowTexture } from "@/components/three/Sun";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { CELESTIAL_MAP } from "@/data/planets";
import type { PlanetData } from "@/data/types";
import { PLANET_DETAIL } from "@/lib/constants";
import { useStore } from "@/store";

const DEG = Math.PI / 180;

function EarthClouds({ radius }: { radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const clouds = usePlanetTexture("earth", "clouds.webp");

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.008;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * 1.015, 64, 64]} />
      <meshStandardMaterial
        color="#ffffff"
        alphaMap={clouds}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </mesh>
  );
}

function Moon({ planetRadius }: { planetRadius: number }) {
  const orbitRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = usePlanetTexture("moon", ["2k.webp", "8k.webp"]);
  // Tight enough to stay inside the detail camera frame
  const orbitRadius = planetRadius * 1.65;

  useFrame(({ clock }, delta) => {
    const angle = clock.getElapsedTime() * 0.12;
    if (orbitRef.current) {
      orbitRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle * 0.4) * 0.5,
        Math.sin(angle) * orbitRadius
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[planetRadius * 0.27, 48, 48]} />
        <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
      </mesh>
    </group>
  );
}

function DetailPlanet({ planet }: { planet: PlanetData }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isSun = planet.id === "sun";
  const texture = usePlanetTexture(planet.id, isSun ? "2k.webp" : ["2k.webp", "8k.webp"]);
  const glowTexture = useMemo(() => (isSun ? makeGlowTexture() : null), [isSun]);
  const radius = PLANET_DETAIL.heroRadius;

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Slowed relative to overview — close up, fast spin feels wrong
      meshRef.current.rotation.y += delta * planet.rotationSpeed * 0.4;
    }
  });

  return (
    <group rotation={[0, 0, -planet.axialTilt * DEG]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 96, 96]} />
        {isSun ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial map={texture} roughness={0.92} metalness={0} />
        )}
      </mesh>
      {glowTexture && (
        <sprite scale={[radius * 5.5, radius * 5.5, 1]}>
          <spriteMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      )}
      {planet.id === "earth" && <EarthClouds radius={radius} />}
      {planet.id === "earth" && <Moon planetRadius={radius} />}
      {planet.hasRings && <SaturnRings planetRadius={radius} />}
    </group>
  );
}

export default function PlanetDetailScene() {
  const camera = useThree((s) => s.camera);
  const viewportWidth = useThree((s) => s.size.width);
  const activePlanet = useStore((s) => s.activePlanet);
  const isAnimating = useStore((s) => s.isAnimating);
  const setIsAnimating = useStore((s) => s.setIsAnimating);
  const isFirstApproach = useRef(true);

  const planet = activePlanet ? CELESTIAL_MAP.get(activePlanet) : undefined;
  const planetId = planet?.id;

  // Aim left of the planet on desktop so it sits right of center,
  // clearing room for the identity panel; centered on mobile.
  const targetX = viewportWidth >= 768 ? -1.5 : 0;

  useEffect(() => {
    if (!planetId) return;

    // Switching planets within detail view: pull back for a mini-approach.
    // First entry keeps whatever distance the previous scene left the camera at.
    if (!isFirstApproach.current) {
      const [rx, ry, rz] = PLANET_DETAIL.reapproachPosition;
      camera.position.set(rx, ry, rz);
    }
    isFirstApproach.current = false;

    setIsAnimating(true);
    const [x, y, z] = PLANET_DETAIL.cameraPosition;
    // Ringed planets need extra distance — rings reach 2.3× the planet radius.
    // The Sun gets some too so its corona glow fits the frame.
    const body = CELESTIAL_MAP.get(planetId);
    const ringFactor = body?.hasRings ? 1.55 : body?.id === "sun" ? 1.35 : 1;
    const tween = gsap.to(camera.position, {
      x,
      y: y * ringFactor,
      z: z * ringFactor,
      duration: PLANET_DETAIL.approachDuration,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(targetX, 0, 0),
      onComplete: () => setIsAnimating(false),
    });

    return () => {
      tween.kill();
      setIsAnimating(false);
    };
  }, [camera, planetId, setIsAnimating, targetX]);

  if (!planet) return null;

  return (
    <group>
      <StarField />

      {/* Key sun light, soft cool fill, faint blue rim from behind */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[-8, 3, 5]} intensity={3} color="#fff4e0" />
      <directionalLight position={[6, -2, -6]} intensity={0.4} color="#4a9eff" />
      <hemisphereLight args={["#1a2a4a", "#050508", 0.25]} />

      <DetailPlanet key={planet.id} planet={planet} />

      <OrbitControls
        enabled={!isAnimating}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minDistance={4.5}
        maxDistance={18}
        target={[targetX, 0, 0]}
      />
    </group>
  );
}
