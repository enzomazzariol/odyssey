import type { StateCreator } from "zustand";

export type SceneId = "intro" | "solar-system" | "planet-detail" | "scale" | "compare";
export type TransitionState = "idle" | "transitioning" | "approaching";

export interface SceneSlice {
  currentScene: SceneId;
  previousScene: SceneId | null;
  transitionState: TransitionState;
  activePlanet: string | null;
  hoveredPlanet: string | null;
  /** Focused body index in scale mode (0 = Sun) */
  scaleIndex: number;
  /** Body ids being compared in compare mode */
  compareA: string;
  compareB: string;
  setScene: (scene: SceneId) => void;
  setActivePlanet: (planet: string | null) => void;
  setHoveredPlanet: (planet: string | null) => void;
  setTransitionState: (state: TransitionState) => void;
  setScaleIndex: (index: number) => void;
  setCompareA: (id: string) => void;
  setCompareB: (id: string) => void;
}

export const createSceneSlice: StateCreator<SceneSlice> = (set, get) => ({
  currentScene: "intro",
  previousScene: null,
  transitionState: "idle",
  activePlanet: null,
  hoveredPlanet: null,
  setScene: (scene) =>
    set({
      previousScene: get().currentScene,
      currentScene: scene,
      transitionState: "idle",
    }),
  setActivePlanet: (planet) => set({ activePlanet: planet }),
  setHoveredPlanet: (planet) => set({ hoveredPlanet: planet }),
  setTransitionState: (state) => set({ transitionState: state }),
  scaleIndex: 0,
  compareA: "earth",
  compareB: "mars",
  setScaleIndex: (index) => set({ scaleIndex: index }),
  setCompareA: (id) => set({ compareA: id }),
  setCompareB: (id) => set({ compareB: id }),
});
