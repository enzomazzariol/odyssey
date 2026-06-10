export const COLORS = {
  spaceBlack: "#020308",
  spaceDark: "#070b1a",
  spaceBlue: "#0a1628",
  accentBlue: "#4a9eff",
  accentOrange: "#ff6b35",
  accentCyan: "#00d4ff",
} as const;

export const TIMING = {
  introBlackDuration: 1.5,
  introLineDuration: 1.2,
  introLineHold: 2,
  introFadeOut: 0.8,
  cameraFlightDuration: 2,
  approachOverlayDelay: 0.5,
  dashboardSlideIn: 0.6,
} as const;

export const CAMERA = {
  defaultFov: 45,
  defaultPosition: [0, 5, 50] as const,
  introPosition: [0, 0, 80] as const,
  solarSystemPosition: [0, 30, 60] as const,
} as const;

export const SCENE = {
  starCount: 8000,
  starFieldRadius: 300,
} as const;
