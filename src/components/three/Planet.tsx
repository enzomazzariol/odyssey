"use client";

import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { PlanetData } from "@/data/types";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { useStore } from "@/store";

const DEG = Math.PI / 180;

export function SaturnRings({ planetRadius }: { planetRadius: number }) {
  const texture = usePlanetTexture("saturn", "ring.webp");

  const geometry = useMemo(() => {
    const inner = planetRadius * 1.25;
    const outer = planetRadius * 2.3;
    const geo = new THREE.RingGeometry(inner, outer, 128);
    // Remap UVs radially so the ring strip texture wraps correctly
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = (v.length() - inner) / (outer - inner);
      uv.setXY(i, t, 1);
    }
    return geo;
  }, [planetRadius]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Planet({ data }: { data: PlanetData }) {
  const orbitRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = usePlanetTexture(data.id);

  const setActivePlanet = useStore((s) => s.setActivePlanet);
  const setHoveredPlanet = useStore((s) => s.setHoveredPlanet);

  useFrame(({ clock }, delta) => {
    const angle = data.initialAngle + clock.getElapsedTime() * data.orbitSpeed;
    if (orbitRef.current) {
      orbitRef.current.position.set(
        Math.cos(angle) * data.orbitRadius,
        0,
        Math.sin(angle) * data.orbitRadius
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * data.rotationSpeed;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActivePlanet(data.id);
  };

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredPlanet(data.id);
    document.body.style.cursor = "pointer";
  };

  const handleOut = () => {
    setHoveredPlanet(null);
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={orbitRef}>
      <group rotation={[0, 0, -data.axialTilt * DEG]}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
        >
          <sphereGeometry args={[data.radius, 48, 48]} />
          <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
        </mesh>
        {data.hasRings && <SaturnRings planetRadius={data.radius} />}
      </group>
    </group>
  );
}
