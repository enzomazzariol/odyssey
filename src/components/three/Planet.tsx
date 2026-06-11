"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { PlanetData } from "@/data/types";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { sceneAngleFor } from "@/lib/ephemeris";
import { audio } from "@/lib/audio";
import { useStore } from "@/store";

const DEG = Math.PI / 180;
const TRAIL_POINTS = 90;

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

/** Fading orbit trail, visible when the simulation runs fast */
function useTrail(accentColor: string) {
  const lineRef = useRef<THREE.Line | null>(null);
  const countRef = useRef(0);

  const { geometry, material, line } = useMemo(() => {
    const positions = new Float32Array(TRAIL_POINTS * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setDrawRange(0, 0);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const line = new THREE.Line(geometry, material);
    line.frustumCulled = false;
    return { geometry, material, line };
  }, [accentColor]);

  lineRef.current = line;

  const push = (x: number, y: number, z: number, active: boolean) => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    if (active) {
      // Shift back, append head
      for (let i = TRAIL_POINTS - 1; i > 0; i--) {
        pos.setXYZ(i, pos.getX(i - 1), pos.getY(i - 1), pos.getZ(i - 1));
      }
      pos.setXYZ(0, x, y, z);
      countRef.current = Math.min(countRef.current + 1, TRAIL_POINTS);
      geometry.setDrawRange(0, countRef.current);
      pos.needsUpdate = true;
      material.opacity = Math.min(material.opacity + 0.04, 0.3);
    } else {
      material.opacity *= 0.92;
      if (material.opacity < 0.01) {
        countRef.current = 0;
        geometry.setDrawRange(0, 0);
      }
    }
  };

  return { line, push };
}

export default function Planet({ data }: { data: PlanetData }) {
  const orbitRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(data.initialAngle);
  const texture = usePlanetTexture(data.id);
  const { line: trailLine, push: pushTrail } = useTrail(data.accentColor);

  const setActivePlanet = useStore((s) => s.setActivePlanet);
  const setHoveredPlanet = useStore((s) => s.setHoveredPlanet);
  const todayTick = useStore((s) => s.todayTick);

  // Snap to the real heliocentric longitude for today
  useEffect(() => {
    if (!todayTick) return;
    const angle = sceneAngleFor(data.id, new Date(todayTick));
    if (angle !== null) angleRef.current = angle;
  }, [todayTick, data.id]);

  useFrame((_, delta) => {
    // Imperative read keeps per-frame updates out of React's render cycle.
    // Angle decreases: prograde (counter-clockwise from north) in our mapping.
    const timeScale = useStore.getState().timeScale;
    angleRef.current -= delta * data.orbitSpeed * timeScale;
    const angle = angleRef.current;
    const x = Math.cos(angle) * data.orbitRadius;
    const z = Math.sin(angle) * data.orbitRadius;
    if (orbitRef.current) {
      orbitRef.current.position.set(x, 0, z);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * data.rotationSpeed * timeScale;
    }
    pushTrail(x, 0, z, timeScale >= 10);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    audio.click();
    setActivePlanet(data.id);
  };

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    audio.hover();
    setHoveredPlanet(data.id);
    document.body.style.cursor = "pointer";
  };

  const handleOut = () => {
    setHoveredPlanet(null);
    document.body.style.cursor = "auto";
  };

  return (
    <>
      <primitive object={trailLine} />
      <group ref={orbitRef}>
        <group rotation={[0, 0, -data.axialTilt * DEG]}>
          <mesh
            ref={meshRef}
            onClick={handleClick}
            onPointerOver={handleOver}
            onPointerOut={handleOut}
          >
            <sphereGeometry args={[data.radius, 48, 48]} />
            <meshStandardMaterial
              map={texture}
              color={data.tint ?? "#ffffff"}
              roughness={0.9}
              metalness={0}
            />
          </mesh>
          {data.hasRings && <SaturnRings planetRadius={data.radius} />}
        </group>
      </group>
    </>
  );
}
