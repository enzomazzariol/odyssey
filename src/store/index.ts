import { create } from "zustand";
import { createSceneSlice, type SceneSlice } from "./slices/scene";
import { createCameraSlice, type CameraSlice } from "./slices/camera";
import { createLoadingSlice, type LoadingSlice } from "./slices/loading";

export type AppStore = SceneSlice & CameraSlice & LoadingSlice;

export const useStore = create<AppStore>()((...a) => ({
  ...createSceneSlice(...a),
  ...createCameraSlice(...a),
  ...createLoadingSlice(...a),
}));

// Dev-only: expose store for debugging
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as unknown as { __store?: typeof useStore }).__store = useStore;
}
