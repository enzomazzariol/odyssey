"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import StarField from "@/components/three/StarField";
import { SaturnRings } from "@/components/three/Planet";
import Atmosphere from "@/components/three/Atmosphere";
import { makeGlowTexture, SUN_BLOOM_COLOR } from "@/components/three/Sun";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { CELESTIAL_MAP } from "@/data/planets";
import type { PlanetData } from "@/data/types";
import { PLANET_DETAIL } from "@/lib/constants";
import { audio } from "@/lib/audio";
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

interface MoonSpec {
  id: string;
  name: string;
  /** Radius as a fraction of the hero planet radius */
  radiusF: number;
  /** Orbit radius as a multiple of the hero planet radius */
  orbitF: number;
  /** Orbit speed, rad/s */
  speed: number;
  /** Tint over the shared cratered moon texture */
  color: string;
  initialAngle: number;
}

/** Famous moons shown while orbiting their planet in detail view */
const DETAIL_MOONS: Record<string, MoonSpec[]> = {
  earth: [
    { id: "moon", name: "Moon", radiusF: 0.27, orbitF: 1.65, speed: 0.12, color: "#ffffff", initialAngle: 0 },
  ],
  jupiter: [
    { id: "io", name: "Io", radiusF: 0.1, orbitF: 1.5, speed: 0.22, color: "#e8cf7a", initialAngle: 0.8 },
    { id: "europa", name: "Europa", radiusF: 0.088, orbitF: 1.95, speed: 0.15, color: "#d9c6ad", initialAngle: 3.6 },
  ],
  saturn: [
    { id: "enceladus", name: "Enceladus", radiusF: 0.06, orbitF: 2.45, speed: 0.16, color: "#f4f4f4", initialAngle: 2.2 },
    { id: "titan", name: "Titan", radiusF: 0.145, orbitF: 2.8, speed: 0.1, color: "#e0a04f", initialAngle: 5 },
  ],
};

function MoonBody({ spec, planetRadius }: { spec: MoonSpec; planetRadius: number }) {
  const orbitRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = usePlanetTexture("moon", "2k.webp");
  const orbitRadius = planetRadius * spec.orbitF;
  const radius = planetRadius * spec.radiusF;
  const angleRef = useRef(spec.initialAngle);
  const setActiveMoon = useStore((s) => s.setActiveMoon);

  useFrame((_, delta) => {
    angleRef.current += delta * spec.speed;
    const angle = angleRef.current;
    if (orbitRef.current) {
      orbitRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle * 0.4) * 0.4,
        Math.sin(angle) * orbitRadius
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          audio.click();
          setActiveMoon(spec.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          audio.hover();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial map={texture} color={spec.color} roughness={0.95} metalness={0} />
      </mesh>
      <Html
        center
        position={[0, -(radius + 0.3), 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
        zIndexRange={[5, 0]}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            whiteSpace: "nowrap",
          }}
        >
          {spec.name}
        </span>
      </Html>
    </group>
  );
}

/** Day texture + city lights on the night side (emissive map) */
function EarthMaterial({ map }: { map: THREE.Texture }) {
  const night = usePlanetTexture("earth", "night.webp");
  return (
    <meshStandardMaterial
      map={map}
      roughness={0.92}
      metalness={0}
      emissiveMap={night}
      emissive="#ffd9a0"
      emissiveIntensity={0.7}
    />
  );
}

/** Fresnel halo color/strength per body — omitted bodies have no atmosphere */
const ATMOSPHERES: Record<string, { color: string; intensity: number }> = {
  earth: { color: "#4a9eff", intensity: 0.6 },
  venus: { color: "#e8a35f", intensity: 0.55 },
  mars: { color: "#d27750", intensity: 0.35 },
  jupiter: { color: "#d8a878", intensity: 0.4 },
  saturn: { color: "#e3d3a3", intensity: 0.35 },
  uranus: { color: "#9fe3e3", intensity: 0.5 },
  neptune: { color: "#5a8cff", intensity: 0.55 },
};

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
          <meshBasicMaterial map={texture} color={SUN_BLOOM_COLOR} toneMapped={false} />
        ) : planet.id === "earth" ? (
          <EarthMaterial map={texture} />
        ) : (
          <meshStandardMaterial
            map={texture}
            color={planet.tint ?? "#ffffff"}
            roughness={0.92}
            metalness={0}
          />
        )}
      </mesh>
      {glowTexture && (
        <sprite scale={[radius * 5.5, radius * 5.5, 1]} raycast={() => null}>
          <spriteMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      )}
      {planet.id === "earth" && <EarthClouds radius={radius} />}
      {ATMOSPHERES[planet.id] && (
        <Atmosphere
          radius={radius}
          color={ATMOSPHERES[planet.id].color}
          intensity={ATMOSPHERES[planet.id].intensity}
        />
      )}
      {(DETAIL_MOONS[planet.id] ?? []).map((spec) => (
        <MoonBody key={spec.name} spec={spec} planetRadius={radius} />
      ))}
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
    audio.whoosh();
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
