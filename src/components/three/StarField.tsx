"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SCENE } from "@/lib/constants";

export default function StarField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, opacities } = useMemo(() => {
    const count = SCENE.starCount;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SCENE.starFieldRadius * (0.4 + Math.random() * 0.6);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 1.5 + 0.3;
      opacities[i] = Math.random();
    }

    return { positions, sizes, opacities };
  }, []);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          attribute float aSize;
          attribute float aOpacity;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vOpacity;

          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float twinkle = sin(uTime * (0.5 + aOpacity * 2.0) + aOpacity * 6.28) * 0.3 + 0.7;
            vOpacity = aOpacity * twinkle;

            gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z);
            gl_PointSize = max(gl_PointSize, 0.5);
          }
        `,
        fragmentShader: `
          varying float vOpacity;

          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;

            float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
            gl_FragColor = vec4(0.85, 0.9, 1.0, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ clock }) => {
    shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aOpacity" args={[opacities, 1]} />
      </bufferGeometry>
    </points>
  );
}
