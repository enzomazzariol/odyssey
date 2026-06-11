"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface AtmosphereProps {
  radius: number;
  color: string;
  intensity?: number;
}

/** Additive fresnel halo rendered on an inflated back-side sphere */
export default function Atmosphere({ radius, color, intensity = 1 }: AtmosphereProps) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewPos;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPos = mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uIntensity;
          varying vec3 vNormal;
          varying vec3 vViewPos;

          void main() {
            // Epsilon + clamps: a single NaN here poisons the bloom mip chain
            vec3 viewDir = -vViewPos / max(length(vViewPos), 0.0001);
            vec3 normal = vNormal / max(length(vNormal), 0.0001);
            float facing = clamp(1.0 - abs(dot(normal, viewDir)), 0.0, 1.0);
            float rim = pow(facing, 2.6);
            gl_FragColor = vec4(uColor, clamp(rim * uIntensity, 0.0, 1.0));
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      }),
    [color, intensity]
  );

  return (
    <mesh material={material} scale={1.12} raycast={() => null}>
      <sphereGeometry args={[radius, 64, 64]} />
    </mesh>
  );
}
