"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

/**
 * Progressive texture loading: suspends on the tiny 256px placeholder,
 * then silently swaps in the 2K texture once it arrives.
 */
export function usePlanetTexture(planetId: string, file = "2k.webp"): THREE.Texture {
  const placeholder = useTexture(`/textures/planets/${planetId}/placeholder.webp`);
  const [hiRes, setHiRes] = useState<THREE.Texture | null>(null);

  useMemo(() => {
    placeholder.colorSpace = THREE.SRGBColorSpace;
  }, [placeholder]);

  useEffect(() => {
    let cancelled = false;
    new THREE.TextureLoader()
      .loadAsync(`/textures/planets/${planetId}/${file}`)
      .then((tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        setHiRes(tex);
      })
      .catch(() => {
        // Keep showing the placeholder if the hi-res fetch fails
      });
    return () => {
      cancelled = true;
    };
  }, [planetId, file]);

  return hiRes ?? placeholder;
}
