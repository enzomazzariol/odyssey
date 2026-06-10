export interface PlanetFacts {
  radiusKm: number;
  distanceFromSunMkm: number;
  dayLength: string;
  yearLength: string;
  avgTemp: string;
  moons: number;
  description: string;
}

export interface PlanetData {
  id: string;
  name: string;
  /** Scene radius in world units (stylized, not to scale) */
  radius: number;
  /** Orbit radius in world units (stylized, not to scale) */
  orbitRadius: number;
  /** Angular orbit speed in rad/s (compressed from real periods) */
  orbitSpeed: number;
  /** Self-rotation speed in rad/s */
  rotationSpeed: number;
  /** Axial tilt in degrees */
  axialTilt: number;
  /** Starting orbit angle in radians, deterministic for SSR consistency */
  initialAngle: number;
  /** Accent color used for UI highlights and orbit hover */
  accentColor: string;
  hasRings: boolean;
  facts: PlanetFacts;
}
