"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import StarField from "@/components/three/StarField";
import { SaturnRings } from "@/components/three/Planet";
import { makeGlowTexture } from "@/components/three/Sun";
import { usePlanetTexture } from "@/hooks/usePlanetTexture";
import { SCALE_BODIES, scaleCameraFor, type ScaleBodyLayout } from "@/lib/scaleLayout";
import { useStore } from "@/store";

const DEG = Math.PI / 180;

function ScaleBody({ layout }: { layout: ScaleBodyLayout }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isSun = layout.body.id === "sun";
  const texture = usePlanetTexture(layout.body.id, "2k.webp");
  const glowTexture = useMemo(() => (isSun ? makeGlowTexture() : null), [isSun]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={[layout.x, 0, 0]} rotation={[0, 0, -layout.body.axialTilt * DEG]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[layout.radius, 64, 64]} />
        {isSun ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial map={texture} roughness={0.92} metalness={0} />
        )}
      </mesh>
      {glowTexture && (
        <sprite scale={[layout.radius * 3.2, layout.radius * 3.2, 1]}>
          <spriteMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      )}
      {layout.body.hasRings && <SaturnRings planetRadius={layout.radius} />}
    </group>
  );
}

export default function ScaleScene() {
  const camera = useThree((s) => s.camera);
  const scaleIndex = useStore((s) => s.scaleIndex);
  const setIsAnimating = useStore((s) => s.setIsAnimating);
  const lookTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    const layout = SCALE_BODIES[Math.min(scaleIndex, SCALE_BODIES.length - 1)];
    const { position, target } = scaleCameraFor(layout);

    setIsAnimating(true);
    const from = lookTarget.current.clone();
    const to = new THREE.Vector3(...target);
    const progress = { t: 0 };

    const tween = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });
    tween.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1.6,
      ease: "power3.inOut",
    });
    tween.to(
      progress,
      {
        t: 1,
        duration: 1.6,
        ease: "power3.inOut",
        onUpdate: () => {
          lookTarget.current.lerpVectors(from, to, progress.t);
          camera.lookAt(lookTarget.current);
        },
      },
      0
    );

    return () => {
      tween.kill();
      setIsAnimating(false);
    };
  }, [camera, scaleIndex, setIsAnimating]);

  return (
    <group>
      <StarField />
      <ambientLight intensity={0.15} />
      <hemisphereLight args={["#1a2a4a", "#050508", 0.3]} />
      <directionalLight position={[-30, 10, 40]} intensity={2.5} color="#fff4e0" />

      {SCALE_BODIES.map((layout) => (
        <ScaleBody key={layout.body.id} layout={layout} />
      ))}
    </group>
  );
}
