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
