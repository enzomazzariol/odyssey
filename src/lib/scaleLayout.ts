import { SUN, PLANETS } from "@/data/planets";
import type { PlanetData } from "@/data/types";

const EARTH_RADIUS_KM = 6371;
/** Earth renders at this radius; everything else is proportional — true scale */
const EARTH_DISPLAY_RADIUS = 0.5;

export interface ScaleBodyLayout {
  body: PlanetData;
  radius: number;
  x: number;
}

export const SCALE_BODIES: ScaleBodyLayout[] = (() => {
  const bodies = [SUN, ...PLANETS];
  const layouts: ScaleBodyLayout[] = [];
  let cursor = 0;

  for (let i = 0; i < bodies.length; i++) {
    const body = bodies[i];
    const radius = (body.facts.radiusKm / EARTH_RADIUS_KM) * EARTH_DISPLAY_RADIUS;
    if (i === 0) {
      cursor = 0;
    } else {
      const prev = layouts[i - 1];
      // Edge-to-edge gap scaled to the smaller body so tiny planets sit close together
      const gap = Math.max(1.2, Math.min(prev.radius, radius) * 1.5 + 1.2);
      cursor = prev.x + prev.radius + gap + radius;
    }
    layouts.push({ body, radius, x: cursor });
  }
  return layouts;
})();

/** Camera framing for a focused body */
export function scaleCameraFor(layout: ScaleBodyLayout) {
  const ringFactor = layout.body.hasRings ? 1.6 : 1;
  const distance = (layout.radius * 3.4 + 1.6) * ringFactor;
  return {
    position: [layout.x, layout.radius * 0.3, distance] as const,
    target: [layout.x, 0, 0] as const,
  };
}
