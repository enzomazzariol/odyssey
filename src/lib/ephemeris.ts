/**
 * Approximate mean heliocentric longitudes (J2000 mean elements).
 * Good to a few degrees — perfect for visualization, not navigation.
 */
const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);

/** [mean longitude at J2000 (deg), daily motion (deg/day)] */
const MEAN_ELEMENTS: Record<string, [number, number]> = {
  mercury: [252.25084, 4.09233445],
  venus: [181.97973, 1.60213034],
  earth: [100.46435, 0.98560912],
  mars: [355.45332, 0.52402068],
  jupiter: [34.40438, 0.08308529],
  saturn: [49.94432, 0.03344414],
  uranus: [313.23218, 0.01172834],
  neptune: [304.88003, 0.00598103],
  pluto: [238.92881, 0.00397557],
};

const DEG = Math.PI / 180;

/**
 * Scene orbit angle for a body at a date. Scene convention: planets sit at
 * (cos a, 0, sin a) and the simulation decreases `a` over time, so real
 * prograde motion (increasing longitude) maps to a = −L.
 */
export function sceneAngleFor(bodyId: string, date: Date): number | null {
  const elements = MEAN_ELEMENTS[bodyId];
  if (!elements) return null;
  const [L0, n] = elements;
  const days = (date.getTime() - J2000) / 86400000;
  const L = (((L0 + n * days) % 360) + 360) % 360;
  return -L * DEG;
}
