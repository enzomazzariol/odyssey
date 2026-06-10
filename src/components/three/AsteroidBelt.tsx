"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2200;
const INNER = 27;
const OUTER = 30.5;

export default function AsteroidBelt() {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Bias density toward the middle of the belt
      const t = (Math.random() + Math.random()) / 2;
      const r = INNER + t * (OUTER - INNER);

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.9;
      positions[i * 3 + 2] = Math.sin(angle) * r;
      sizes[i] = Math.random() * 1.2 + 0.3;
    }

    return { positions, sizes };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          attribute float aSize;
          uniform float uPixelRatio;
          varying float vSize;

          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            vSize = aSize;
            gl_PointSize = aSize * uPixelRatio * (90.0 / -mvPosition.z);
            gl_PointSize = max(gl_PointSize, 0.4);
          }
        `,
        fragmentShader: `
          varying float vSize;

          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.15, d) * 0.45;
            gl_FragColor = vec4(0.62, 0.58, 0.52, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.0045;
    }
  });

  return (
    <group ref={groupRef}>
      <points material={material}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        </bufferGeometry>
      </points>
    </group>
  );
}
