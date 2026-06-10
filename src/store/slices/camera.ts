import type { StateCreator } from "zustand";
import { CAMERA } from "@/lib/constants";

export interface CameraSlice {
  cameraPosition: readonly [number, number, number];
  lookAtTarget: readonly [number, number, number];
  isAnimating: boolean;
  setCameraPosition: (pos: readonly [number, number, number]) => void;
  setLookAtTarget: (target: readonly [number, number, number]) => void;
  setIsAnimating: (animating: boolean) => void;
}

export const createCameraSlice: StateCreator<CameraSlice> = (set) => ({
  cameraPosition: CAMERA.introPosition,
  lookAtTarget: [0, 0, 0] as const,
  isAnimating: false,
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
  setLookAtTarget: (target) => set({ lookAtTarget: target }),
  setIsAnimating: (animating) => set({ isAnimating: animating }),
});
