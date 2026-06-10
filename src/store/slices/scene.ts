import type { StateCreator } from "zustand";

export type SceneId = "intro" | "solar-system" | "planet-detail" | "scale" | "compare";
export type TransitionState = "idle" | "transitioning" | "approaching";

export interface SceneSlice {
  currentScene: SceneId;
  previousScene: SceneId | null;
  transitionState: TransitionState;
  activePlanet: string | null;
  setScene: (scene: SceneId) => void;
  setActivePlanet: (planet: string | null) => void;
  setTransitionState: (state: TransitionState) => void;
}

export const createSceneSlice: StateCreator<SceneSlice> = (set, get) => ({
  currentScene: "intro",
  previousScene: null,
  transitionState: "idle",
  activePlanet: null,
  setScene: (scene) =>
    set({
      previousScene: get().currentScene,
      currentScene: scene,
      transitionState: "idle",
    }),
  setActivePlanet: (planet) => set({ activePlanet: planet }),
  setTransitionState: (state) => set({ transitionState: state }),
});
