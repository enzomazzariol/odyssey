"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Streak {
  line: THREE.Line;
  material: THREE.LineBasicMaterial;
  origin: THREE.Vector3;
  direction: THREE.Vector3;
  duration: number;
  t: number;
  delay: number;
}

const STREAK_LENGTH = 18;
const TRAVEL_DISTANCE = 90;

function randomize(streak: Streak, initial = false) {
  streak.origin.set(
    THREE.MathUtils.randFloatSpread(280),
    THREE.MathUtils.randFloat(-10, 120),
    THREE.MathUtils.randFloat(-220, -60)
  );
  streak.direction
    .set(THREE.MathUtils.randFloat(-1, -0.5), THREE.MathUtils.randFloat(-0.5, -0.2), 0)
    .normalize();
  streak.duration = THREE.MathUtils.randFloat(0.5, 0.9);
  streak.t = 0;
  streak.delay = initial ? THREE.MathUtils.randFloat(2, 10) : THREE.MathUtils.randFloat(4, 12);
}

export default function ShootingStars({ count = 3 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const streaks = useMemo<Streak[]>(() => {
    return Array.from({ length: count }, () => {
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(0.85, 0.9, 1),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      const streak: Streak = {
        line: new THREE.Line(geometry, material),
        material,
        origin: new THREE.Vector3(),
        direction: new THREE.Vector3(),
        duration: 1,
        t: 0,
        delay: 0,
      };
      randomize(streak, true);
      return streak;
    });
  }, [count]);

  useFrame((_, delta) => {
    for (const streak of streaks) {
      if (streak.delay > 0) {
        streak.delay -= delta;
        streak.material.opacity = 0;
        continue;
      }

      streak.t += delta / streak.duration;
      if (streak.t >= 1) {
        randomize(streak);
        continue;
      }

      const head = streak.origin
        .clone()
        .addScaledVector(streak.direction, streak.t * TRAVEL_DISTANCE);
      const tail = head.clone().addScaledVector(streak.direction, -STREAK_LENGTH);

      const pos = streak.line.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, tail.x, tail.y, tail.z);
      pos.setXYZ(1, head.x, head.y, head.z);
      pos.needsUpdate = true;

      // Fade in fast, fade out toward the end of the run
      streak.material.opacity = Math.sin(streak.t * Math.PI) * 0.7;
    }
  });

  return (
    <group ref={groupRef}>
      {streaks.map((streak, i) => (
        <primitive key={i} object={streak.line} />
      ))}
    </group>
  );
}
