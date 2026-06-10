"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

/**
 * Progressive texture loading: suspends on the tiny 256px placeholder,
 * then upgrades through the given files in order as each one arrives
 * (e.g. ["2k.webp", "8k.webp"] shows 2K quickly, swaps to 8K silently).
 */
export function usePlanetTexture(
  planetId: string,
  files: string | string[] = "2k.webp"
): THREE.Texture {
  const fileList = useMemo(
    () => (Array.isArray(files) ? files : [files]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Array.isArray(files) ? files.join(",") : files]
  );

  const placeholder = useTexture(`/textures/planets/${planetId}/placeholder.webp`);
  const [best, setBest] = useState<THREE.Texture | null>(null);

  useMemo(() => {
    placeholder.colorSpace = THREE.SRGBColorSpace;
  }, [placeholder]);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();

    (async () => {
      for (const file of fileList) {
        try {
          const tex = await loader.loadAsync(`/textures/planets/${planetId}/${file}`);
          if (cancelled) {
            tex.dispose();
            return;
          }
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          setBest(tex);
        } catch {
          // Missing resolution tier — keep the best texture loaded so far
        }
      }
    })();

    return () => {
      cancelled = true;
      setBest(null);
    };
  }, [planetId, fileList]);

  return best ?? placeholder;
}
