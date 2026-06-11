"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeGlowTexture } from "@/components/three/Sun";
import { useStore } from "@/store";

// Eccentric orbit crossing the system: r = p / (1 + e·cos θ)
const ECCENTRICITY = 0.82;
const SEMI_LATUS = 14; // perihelion ≈ 7.7, aphelion ≈ 78

export default function Comet() {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Sprite>(null);
  const thetaRef = useRef(2.4);
  const glowTexture = useMemo(makeGlowTexture, []);

  const tailMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#9fd8ff",
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((_, delta) => {
    const timeScale = Math.max(useStore.getState().timeScale, 0.4);
    const theta = thetaRef.current;
    const r = SEMI_LATUS / (1 + ECCENTRICITY * Math.cos(theta));
    // Kepler's second law-ish: sweep faster near perihelion
    thetaRef.current -= (delta * timeScale * 1.6) / (r * r * 0.12 + 0.4);

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    if (groupRef.current) {
      groupRef.current.position.set(x, 1.5, z);
    }

    // Tail points away from the sun, longer & brighter near perihelion
    const closeness = THREE.MathUtils.clamp(1 - (r - 8) / 50, 0.1, 1);
    if (tailRef.current) {
      const dir = new THREE.Vector3(x, 0, z).normalize();
      const length = 2 + closeness * 7;
      tailRef.current.scale.set(0.35 + closeness * 0.3, length, 1);
      tailRef.current.position.copy(dir.clone().multiplyScalar(length / 2));
      tailRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      tailMaterial.opacity = 0.05 + closeness * 0.22;
    }
    if (headRef.current) {
      const s = 0.8 + closeness * 1.4;
      headRef.current.scale.set(s, s, 1);
      (headRef.current.material as THREE.SpriteMaterial).opacity = 0.35 + closeness * 0.55;
    }
  });

  return (
    <group rotation={[0.22, 0, 0.12]}>
      <group ref={groupRef}>
        <sprite ref={headRef} raycast={() => null}>
          <spriteMaterial
            map={glowTexture}
            color="#cfeaff"
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
        <mesh ref={tailRef} material={tailMaterial} raycast={() => null}>
          <coneGeometry args={[1, 1, 12, 1, true]} />
        </mesh>
      </group>
    </group>
  );
}
