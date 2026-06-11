"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODULE_COUNT = 12;
const RING_RADIUS = 5;

/**
 * Procedural ring station (Endurance-style): boxy modules in a circle,
 * connected by trusses, with two crossing spokes and a docking hub.
 */
export default function SpaceStation(props: React.ComponentProps<"group">) {
  const ringRef = useRef<THREE.Group>(null);

  const { hull, dark, window: windowMat } = useMemo(
    () => ({
      hull: new THREE.MeshStandardMaterial({ color: "#b9bec7", roughness: 0.45, metalness: 0.75 }),
      dark: new THREE.MeshStandardMaterial({ color: "#3d424c", roughness: 0.6, metalness: 0.6 }),
      window: new THREE.MeshStandardMaterial({
        color: "#0a0f18",
        emissive: "#ffe9c4",
        emissiveIntensity: 1.6,
        roughness: 0.3,
        metalness: 0.2,
      }),
    }),
    []
  );

  const modules = useMemo(() => {
    return Array.from({ length: MODULE_COUNT }, (_, i) => {
      const angle = (i / MODULE_COUNT) * Math.PI * 2;
      return {
        angle,
        x: Math.cos(angle) * RING_RADIUS,
        y: Math.sin(angle) * RING_RADIUS,
        // Alternate long/short modules like the Endurance
        long: i % 3 === 0,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.055;
    }
  });

  return (
    <group {...props}>
      <group ref={ringRef}>
        {modules.map((m, i) => (
          <group key={i} position={[m.x, m.y, 0]} rotation={[0, 0, m.angle + Math.PI / 2]}>
            {/* Module body */}
            <mesh material={hull}>
              <boxGeometry args={[m.long ? 2.2 : 1.7, 1.05, 1.15]} />
            </mesh>
            {/* Equipment block */}
            <mesh material={dark} position={[0, 0, 0.62]}>
              <boxGeometry args={[m.long ? 1.5 : 1.1, 0.7, 0.18]} />
            </mesh>
            {/* Window strip — faces outward */}
            <mesh material={windowMat} position={[0, -0.55, 0]}>
              <boxGeometry args={[m.long ? 1.6 : 1.2, 0.06, 0.55]} />
            </mesh>
          </group>
        ))}

        {/* Truss segments between modules */}
        {modules.map((m, i) => {
          const next = modules[(i + 1) % MODULE_COUNT];
          const midAngle = m.angle + Math.PI / MODULE_COUNT;
          const mx = Math.cos(midAngle) * RING_RADIUS;
          const my = Math.sin(midAngle) * RING_RADIUS;
          void next;
          return (
            <mesh
              key={`truss-${i}`}
              material={dark}
              position={[mx, my, 0]}
              rotation={[0, 0, midAngle + Math.PI / 2]}
            >
              <boxGeometry args={[0.9, 0.34, 0.34]} />
            </mesh>
          );
        })}

        {/* Crossing spokes + hub */}
        {[0, Math.PI / 2].map((rot) => (
          <mesh key={rot} material={dark} rotation={[0, 0, rot]}>
            <cylinderGeometry args={[0.09, 0.09, RING_RADIUS * 2 - 1, 8]} />
          </mesh>
        ))}
        <mesh material={hull} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 1.4, 16]} />
        </mesh>
        <mesh material={dark} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.9]}>
          <cylinderGeometry args={[0.28, 0.4, 0.5, 12]} />
        </mesh>
      </group>
    </group>
  );
}
