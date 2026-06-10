import type { StateCreator } from "zustand";

export interface LoadingSlice {
  isLoaded: boolean;
  loadingProgress: number;
  setIsLoaded: (loaded: boolean) => void;
  setLoadingProgress: (progress: number) => void;
}

export const createLoadingSlice: StateCreator<LoadingSlice> = (set) => ({
  isLoaded: false,
  loadingProgress: 0,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
});
