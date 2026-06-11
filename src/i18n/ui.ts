export type Lang = "en" | "es";

const en = {
  // Hero
  heroEyebrow: "A voyage through the Solar System",
  heroTagline:
    "Board the observation deck and drift past every world we have ever known — from the fire of the Sun to the silence beyond Neptune.",
  beginMission: "Begin Mission",
  pressSpace: "Press Space",
  statStar: "1 Star",
  statPlanets: "8 Planets",
  statMoons: "290 Moons",
  statYears: "4.6B Years",
  cornerSystem: "Sol System",
  cornerArm: "Orion Arm · Milky Way",
  cornerVoyage: "Voyage N° 001",
  cornerRange: "Range 4.5 × 10⁹ km",
  cornerDeck: "Observation Deck",
  cornerFeed: "Live starfield feed",
  cornerImagery: "Imagery · NASA Archives",
  cornerTextures: "Textures · Solar System Scope (CC BY 4.0)",
  sideProgram: "Exploration Program · MMXXVI",
  sideWorlds: "Eight worlds · One star",

  // Explore
  systemOverview: "System Overview",
  solarOdyssey: "Solar Odyssey",
  scale: "Scale",
  compare: "Compare",
  clickToScan: "Click to scan",
  exploreHint: "Drag to orbit · Scroll to zoom · Click a planet · Keys 1–9",
  time: "Time",
  today: "Today",

  // Detail
  approaching: "Approaching",
  didYouKnow: "Did you know",
  missionArchive: "Mission Archive",
  photos: "photos",

  // Panels
  planetaryDatabase: "Planetary Database",
  sizeVsEarth: "Size vs Earth",
  initiateApproach: "Initiate Approach",
  statRadius: "Radius",
  statFromSun: "From Sun",
  statDay: "Day",
  statYear: "Year",
  statAvgTemp: "Avg Temp",
  statGravity: "Gravity",
  statMoonsLabel: "Moons",
  statLightToEarth: "Light to Earth",
  statRotation: "Rotation",
  statGalacticOrbit: "Galactic Orbit",
  statSurfaceTemp: "Surface Temp",

  // Scale
  trueScale: "True Scale",
  referenceBody: "Reference body",
  earthRadiusSuffix: "× Earth's radius",
  smallerThanEarth: "× smaller than Earth",
  scrollToTravel: "Scroll to travel",

  // Compare
  vs: "vs",
  isWord: "is",
  widerThan: "wider than",
  nearlyIdentical: "Nearly identical in size",
  rowRadius: "Radius",
  rowDistance: "Distance from Sun",
  rowDay: "Day length",
  rowYear: "Year length",
  rowTemp: "Avg temperature",
  rowGravity: "Gravity",
  rowMoons: "Moons",

  // Moon panel
  moonOf: "Moon of",
  orbitalPeriod: "Orbital period",
  distance: "Distance",

  // Misc
  initializing: "Initializing",
  mute: "Mute sound",
  unmute: "Unmute sound",
} as const;

export type UIKey = keyof typeof en;

const es: Record<UIKey, string> = {
  heroEyebrow: "Un viaje a través del Sistema Solar",
  heroTagline:
    "Sube a la cubierta de observación y navega frente a cada mundo que hemos conocido — del fuego del Sol al silencio más allá de Neptuno.",
  beginMission: "Iniciar Misión",
  pressSpace: "Pulsa Espacio",
  statStar: "1 Estrella",
  statPlanets: "8 Planetas",
  statMoons: "290 Lunas",
  statYears: "4.6 mil M de años",
  cornerSystem: "Sistema Sol",
  cornerArm: "Brazo de Orión · Vía Láctea",
  cornerVoyage: "Travesía N° 001",
  cornerRange: "Alcance 4.5 × 10⁹ km",
  cornerDeck: "Cubierta de Observación",
  cornerFeed: "Señal estelar en directo",
  cornerImagery: "Imágenes · Archivos NASA",
  cornerTextures: "Texturas · Solar System Scope (CC BY 4.0)",
  sideProgram: "Programa de Exploración · MMXXVI",
  sideWorlds: "Ocho mundos · Una estrella",

  systemOverview: "Vista del Sistema",
  solarOdyssey: "Solar Odyssey",
  scale: "Escala",
  compare: "Comparar",
  clickToScan: "Click para escanear",
  exploreHint: "Arrastra para orbitar · Scroll para zoom · Click en un planeta · Teclas 1–9",
  time: "Tiempo",
  today: "Hoy",

  approaching: "Aproximándose a",
  didYouKnow: "¿Sabías que…?",
  missionArchive: "Archivo de Misión",
  photos: "fotos",

  planetaryDatabase: "Base de Datos Planetaria",
  sizeVsEarth: "Tamaño vs Tierra",
  initiateApproach: "Iniciar Aproximación",
  statRadius: "Radio",
  statFromSun: "Del Sol",
  statDay: "Día",
  statYear: "Año",
  statAvgTemp: "Temp. media",
  statGravity: "Gravedad",
  statMoonsLabel: "Lunas",
  statLightToEarth: "Luz a la Tierra",
  statRotation: "Rotación",
  statGalacticOrbit: "Órbita galáctica",
  statSurfaceTemp: "Temp. superficie",

  trueScale: "Escala Real",
  referenceBody: "Cuerpo de referencia",
  earthRadiusSuffix: "× el radio terrestre",
  smallerThanEarth: "× más pequeño que la Tierra",
  scrollToTravel: "Scroll para viajar",

  vs: "vs",
  isWord: "es",
  widerThan: "más ancho que",
  nearlyIdentical: "Tamaños casi idénticos",
  rowRadius: "Radio",
  rowDistance: "Distancia al Sol",
  rowDay: "Duración del día",
  rowYear: "Duración del año",
  rowTemp: "Temp. media",
  rowGravity: "Gravedad",
  rowMoons: "Lunas",

  moonOf: "Luna de",
  orbitalPeriod: "Período orbital",
  distance: "Distancia",

  initializing: "Inicializando",
  mute: "Silenciar sonido",
  unmute: "Activar sonido",
};

export const UI: Record<Lang, Record<UIKey, string>> = { en, es };
