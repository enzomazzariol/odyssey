export interface MoonData {
  id: string;
  name: string;
  planetId: string;
  radiusKm: number;
  /** Mean distance to its planet */
  distanceKm: number;
  orbitalPeriod: string;
  description: string;
  funFact: string;
  accentColor: string;
}

export const MOONS: Record<string, MoonData> = {
  moon: {
    id: "moon",
    name: "The Moon",
    planetId: "earth",
    radiusKm: 1737,
    distanceKm: 384400,
    orbitalPeriod: "27.3 days",
    description:
      "Earth's only natural satellite, born 4.5 billion years ago from a colossal impact. It steadies Earth's axis and drives the tides.",
    funFact: "It drifts away from Earth by 3.8 cm every year.",
    accentColor: "#cfcfcf",
  },
  io: {
    id: "io",
    name: "Io",
    planetId: "jupiter",
    radiusKm: 1822,
    distanceKm: 421700,
    orbitalPeriod: "1.8 days",
    description:
      "The most volcanically active body in the Solar System — hundreds of active volcanoes powered by Jupiter's gravitational tides.",
    funFact: "Its volcanoes blast sulfur up to 500 km high.",
    accentColor: "#e8cf7a",
  },
  europa: {
    id: "europa",
    name: "Europa",
    planetId: "jupiter",
    radiusKm: 1561,
    distanceKm: 670900,
    orbitalPeriod: "3.6 days",
    description:
      "A cracked shell of ice covers a global ocean of liquid water holding twice as much water as all of Earth's oceans combined.",
    funFact: "One of the most promising places to search for life beyond Earth.",
    accentColor: "#d9c6ad",
  },
  titan: {
    id: "titan",
    name: "Titan",
    planetId: "saturn",
    radiusKm: 2575,
    distanceKm: 1221870,
    orbitalPeriod: "16 days",
    description:
      "The only moon with a thick atmosphere, and the only world besides Earth with rivers, lakes and rain — of liquid methane at −179°C.",
    funFact: "With its low gravity and dense air, a human could fly by flapping artificial wings.",
    accentColor: "#e0a04f",
  },
  enceladus: {
    id: "enceladus",
    name: "Enceladus",
    planetId: "saturn",
    radiusKm: 252,
    distanceKm: 238000,
    orbitalPeriod: "1.4 days",
    description:
      "A small icy moon firing geysers of water from a subsurface ocean through cracks at its south pole.",
    funFact: "Its geysers feed one of Saturn's rings — the E ring.",
    accentColor: "#f4f4f4",
  },
};
