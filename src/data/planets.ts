import type { PlanetData } from "./types";

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    classification: "Terrestrial",
    name: "Mercury",
    radius: 0.38,
    orbitRadius: 10,
    orbitSpeed: 0.235,
    rotationSpeed: 0.004,
    axialTilt: 0.03,
    initialAngle: 0.8,
    accentColor: "#b5a89b",
    hasRings: false,
    facts: {
      radiusKm: 2440,
      distanceFromSunMkm: 57.9,
      dayLength: "58.6 Earth days",
      yearLength: "88 Earth days",
      avgTemp: "-173°C to 427°C",
      moons: 0,
      gravity: 3.7,
      description:
        "The smallest planet and closest to the Sun. Its cratered surface endures the most extreme temperature swings in the Solar System.",
    },
    funFacts: [
      "A single Mercury day (sunrise to sunrise) lasts two of its years.",
      "It is shrinking — the planet has contracted ~7 km as its core cools.",
      "Despite being closest to the Sun, it is not the hottest planet — Venus is.",
    ],
  },
  {
    id: "venus",
    classification: "Terrestrial",
    name: "Venus",
    radius: 0.95,
    orbitRadius: 14,
    orbitSpeed: 0.134,
    rotationSpeed: -0.002,
    axialTilt: 177.4,
    initialAngle: 2.3,
    accentColor: "#e8c79a",
    hasRings: false,
    facts: {
      radiusKm: 6052,
      distanceFromSunMkm: 108.2,
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      avgTemp: "464°C",
      moons: 0,
      gravity: 8.87,
      description:
        "A runaway greenhouse world wrapped in sulfuric acid clouds. It spins backwards, and its day is longer than its year.",
    },
    funFacts: [
      "The hottest planet — hot enough to melt lead, day or night.",
      "It rains sulfuric acid, but the drops evaporate before touching ground.",
      "Venus outshines every star in Earth's night sky.",
    ],
  },
  {
    id: "earth",
    classification: "Terrestrial",
    name: "Earth",
    radius: 1,
    orbitRadius: 19,
    orbitSpeed: 0.1,
    rotationSpeed: 0.05,
    axialTilt: 23.4,
    initialAngle: 4.1,
    accentColor: "#4a9eff",
    hasRings: false,
    facts: {
      radiusKm: 6371,
      distanceFromSunMkm: 149.6,
      dayLength: "24 hours",
      yearLength: "365.25 days",
      avgTemp: "15°C",
      moons: 1,
      gravity: 9.81,
      description:
        "The only known world to harbor life. Liquid oceans cover 71% of its surface beneath a thin, protective atmosphere.",
    },
    funFacts: [
      "The densest planet in the Solar System.",
      "Earth's rotation slows ~1.7 ms per century — days keep getting longer.",
      "Over 70% of its volcanic activity happens underwater.",
    ],
  },
  {
    id: "mars",
    classification: "Terrestrial",
    name: "Mars",
    radius: 0.53,
    orbitRadius: 24,
    orbitSpeed: 0.068,
    rotationSpeed: 0.048,
    axialTilt: 25.2,
    initialAngle: 5.6,
    accentColor: "#ff6b35",
    hasRings: false,
    facts: {
      radiusKm: 3390,
      distanceFromSunMkm: 227.9,
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      avgTemp: "-65°C",
      moons: 2,
      gravity: 3.71,
      description:
        "The red planet, stained by iron oxide dust. Home to Olympus Mons, the largest volcano in the Solar System.",
    },
    funFacts: [
      "Olympus Mons rises ~22 km — nearly 3× the height of Everest.",
      "Dust storms can engulf the entire planet for weeks.",
      "Sunsets on Mars are blue.",
    ],
  },
  {
    id: "jupiter",
    classification: "Gas Giant",
    name: "Jupiter",
    radius: 3.5,
    orbitRadius: 33,
    orbitSpeed: 0.023,
    rotationSpeed: 0.12,
    axialTilt: 3.1,
    initialAngle: 1.5,
    accentColor: "#d8a878",
    hasRings: false,
    facts: {
      radiusKm: 69911,
      distanceFromSunMkm: 778.5,
      dayLength: "9.9 hours",
      yearLength: "11.9 Earth years",
      avgTemp: "-110°C",
      moons: 95,
      gravity: 24.79,
      description:
        "A gas giant more massive than all other planets combined. Its Great Red Spot is a storm larger than Earth, raging for centuries.",
    },
    funFacts: [
      "Its magnetic field is the strongest of any planet — 20,000× Earth's.",
      "Jupiter deflects comets and asteroids like a cosmic shield.",
      "The fastest spinner: a full day lasts under 10 hours.",
    ],
  },
  {
    id: "saturn",
    classification: "Gas Giant",
    name: "Saturn",
    radius: 3,
    orbitRadius: 43,
    orbitSpeed: 0.013,
    rotationSpeed: 0.11,
    axialTilt: 26.7,
    initialAngle: 3.4,
    accentColor: "#e3d3a3",
    hasRings: true,
    facts: {
      radiusKm: 58232,
      distanceFromSunMkm: 1434,
      dayLength: "10.7 hours",
      yearLength: "29.4 Earth years",
      avgTemp: "-140°C",
      moons: 146,
      gravity: 10.44,
      description:
        "Crowned by a vast system of icy rings only ~10 meters thick. Less dense than water — it would float in a big enough ocean.",
    },
    funFacts: [
      "Its rings span 282,000 km yet are only about 10 meters thick.",
      "A hexagonal storm wider than Earth sits at its north pole.",
      "Its moon Titan has rivers and lakes of liquid methane.",
    ],
  },
  {
    id: "uranus",
    classification: "Ice Giant",
    name: "Uranus",
    radius: 1.6,
    orbitRadius: 52,
    orbitSpeed: 0.007,
    rotationSpeed: -0.07,
    axialTilt: 97.8,
    initialAngle: 0.2,
    accentColor: "#9fe3e3",
    hasRings: false,
    facts: {
      radiusKm: 25362,
      distanceFromSunMkm: 2871,
      dayLength: "17.2 hours",
      yearLength: "84 Earth years",
      avgTemp: "-195°C",
      moons: 28,
      gravity: 8.87,
      description:
        "An ice giant tipped on its side, rolling around the Sun. Each pole gets 42 years of sunlight followed by 42 years of darkness.",
    },
    funFacts: [
      "It rolls around the Sun on its side — likely knocked over by a giant impact.",
      "The coldest planetary atmosphere ever measured: −224°C.",
      "First planet found with a telescope, by William Herschel in 1781.",
    ],
  },
  {
    id: "neptune",
    classification: "Ice Giant",
    name: "Neptune",
    radius: 1.55,
    orbitRadius: 60,
    orbitSpeed: 0.0047,
    rotationSpeed: 0.075,
    axialTilt: 28.3,
    initialAngle: 2.9,
    accentColor: "#5a8cff",
    hasRings: false,
    facts: {
      radiusKm: 24622,
      distanceFromSunMkm: 4495,
      dayLength: "16.1 hours",
      yearLength: "164.8 Earth years",
      avgTemp: "-200°C",
      moons: 16,
      gravity: 11.15,
      description:
        "The windiest world known — supersonic gusts reach 2,100 km/h. Discovered by mathematics before it was ever seen.",
    },
    funFacts: [
      "Its winds reach 2,100 km/h — faster than the speed of sound on Earth.",
      "It has completed just one orbit since its discovery in 1846.",
      "Deep inside, it likely rains diamonds.",
    ],
  },
];

export const PLANET_MAP = new Map(PLANETS.map((p) => [p.id, p]));

export const SUN: PlanetData = {
  id: "sun",
  classification: "Star",
  name: "The Sun",
  radius: 5,
  orbitRadius: 0,
  orbitSpeed: 0,
  rotationSpeed: 0.015,
  axialTilt: 7.25,
  initialAngle: 0,
  accentColor: "#ffb347",
  hasRings: false,
  facts: {
    radiusKm: 696340,
    distanceFromSunMkm: 0,
    dayLength: "25 Earth days",
    yearLength: "230M years*",
    avgTemp: "5,505°C surface",
    moons: 0,
    gravity: 274,
    description:
      "A G-type yellow dwarf star, 4.6 billion years old. Every second it fuses 600 million tons of hydrogen, powering all life on Earth.",
  },
  funFacts: [
    "The Sun holds 99.86% of all the mass in the Solar System.",
    "About one million Earths could fit inside it.",
    "Light from its core takes ~100,000 years to escape to the surface — then just 8 minutes to reach Earth.",
  ],
};

/** All explorable bodies: the Sun + 8 planets */
export const CELESTIAL_MAP = new Map([[SUN.id, SUN], ...PLANET_MAP]);

export interface BodyStat {
  label: string;
  value: string;
}

/** Display stats — the Sun gets star-specific labels instead of planet ones */
export function getBodyStats(body: PlanetData): BodyStat[] {
  if (body.id === "sun") {
    return [
      { label: "Radius", value: `${body.facts.radiusKm.toLocaleString()} km` },
      { label: "Light to Earth", value: "8 min 20 s" },
      { label: "Rotation", value: body.facts.dayLength },
      { label: "Galactic Orbit", value: body.facts.yearLength.replace("*", "") },
      { label: "Surface Temp", value: body.facts.avgTemp.replace(" surface", "") },
      { label: "Gravity", value: `${body.facts.gravity} m/s²` },
    ];
  }
  return [
    { label: "Radius", value: `${body.facts.radiusKm.toLocaleString()} km` },
    { label: "From Sun", value: `${body.facts.distanceFromSunMkm.toLocaleString()} M km` },
    { label: "Day", value: body.facts.dayLength },
    { label: "Year", value: body.facts.yearLength },
    { label: "Avg Temp", value: body.facts.avgTemp },
    { label: "Gravity", value: `${body.facts.gravity} m/s²` },
    { label: "Moons", value: String(body.facts.moons) },
  ];
}
