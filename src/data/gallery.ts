export interface GalleryImage {
  src: string;
  caption: string;
  credit: string;
}

/** Real mission photography per body. Sources: NASA / ESA via Wikimedia Commons. */
export const GALLERY: Record<string, GalleryImage[]> = {
  sun: [
    {
      src: "/gallery/sun/1.webp",
      caption: "The Sun in extreme ultraviolet — glowing plasma traces magnetic field lines across the corona.",
      credit: "NASA / SDO / AIA",
    },
    {
      src: "/gallery/sun/2.webp",
      caption: "A magnificent coronal mass ejection hurls billions of tons of plasma into space, August 2012.",
      credit: "NASA / GSFC / SDO",
    },
    {
      src: "/gallery/sun/3.webp",
      caption: "A solar flare erupts at the Sun's limb, photographed in January 2007.",
      credit: "Hinode / JAXA / NASA",
    },
  ],
  mercury: [
    {
      src: "/gallery/mercury/1.webp",
      caption: "Humanity's first look at Mercury's unseen side — MESSENGER flyby, January 2008.",
      credit: "NASA / JHUAPL / Carnegie",
    },
    {
      src: "/gallery/mercury/2.webp",
      caption: "Mercury in true color: an airless, cratered world baked by the nearby Sun.",
      credit: "NASA / JHUAPL / Carnegie",
    },
    {
      src: "/gallery/mercury/3.webp",
      caption: "Enhanced color reveals the mineral diversity of Mercury's ancient lava plains.",
      credit: "NASA / JHUAPL / Carnegie",
    },
  ],
  venus: [
    {
      src: "/gallery/venus/1.webp",
      caption: "Venus without its clouds — a global radar map of the volcanic surface by Magellan.",
      credit: "NASA / JPL / Magellan",
    },
    {
      src: "/gallery/venus/2.webp",
      caption: "The dense sulfuric acid cloud deck of Venus, captured by Mariner 10 in 1974.",
      credit: "NASA / JPL-Caltech",
    },
    {
      src: "/gallery/venus/3.webp",
      caption: "Swirling cloud patterns in ultraviolet light, seen by Pioneer Venus Orbiter.",
      credit: "NASA / Pioneer Venus Orbiter",
    },
  ],
  earth: [
    {
      src: "/gallery/earth/1.webp",
      caption: "The Blue Marble — the iconic full-disk portrait taken by the crew of Apollo 17, 1972.",
      credit: "NASA / Apollo 17",
    },
    {
      src: "/gallery/earth/2.webp",
      caption: "Earthrise: our world rising over the lunar horizon, photographed from Apollo 8, 1968.",
      credit: "NASA / Bill Anders, Apollo 8",
    },
    {
      src: "/gallery/earth/3.webp",
      caption: "Earth's Eastern Hemisphere — Africa and Asia under swirling weather systems.",
      credit: "NASA",
    },
  ],
  mars: [
    {
      src: "/gallery/mars/1.webp",
      caption: "Valles Marineris — a canyon system 4,000 km long, slicing across the face of Mars.",
      credit: "NASA / JPL-Caltech / USGS",
    },
    {
      src: "/gallery/mars/2.webp",
      caption: "Mars in true color, photographed during ESA Rosetta's flyby in 2007.",
      credit: "ESA / MPS / OSIRIS Team",
    },
    {
      src: "/gallery/mars/3.webp",
      caption: "Curiosity's self-portrait at the 'Big Sky' drilling site in Gale Crater, 2015.",
      credit: "NASA / JPL-Caltech / MSSS",
    },
  ],
  jupiter: [
    {
      src: "/gallery/jupiter/1.webp",
      caption: "Jupiter and its Great Red Spot — a storm that has raged for centuries, seen by Hubble.",
      credit: "NASA / ESA / Hubble",
    },
    {
      src: "/gallery/jupiter/2.webp",
      caption: "The Great Red Spot up close, photographed by Voyager 1 in 1979.",
      credit: "NASA / JPL",
    },
    {
      src: "/gallery/jupiter/3.webp",
      caption: "A true-color portrait by Cassini — the dark dot is the shadow of the moon Europa.",
      credit: "NASA / JPL / University of Arizona",
    },
  ],
  saturn: [
    {
      src: "/gallery/saturn/1.webp",
      caption: "Saturn at equinox — sunlight strikes the rings edge-on in this Cassini mosaic, 2009.",
      credit: "NASA / JPL / Space Science Institute",
    },
    {
      src: "/gallery/saturn/2.webp",
      caption: "'The Day the Earth Smiled' — Saturn backlit by the Sun; Earth is a pale dot below the rings.",
      credit: "NASA / JPL-Caltech / SSI",
    },
    {
      src: "/gallery/saturn/3.webp",
      caption: "Saturn and its rings in natural color, imaged by the Hubble Space Telescope.",
      credit: "NASA / ESA / Hubble",
    },
  ],
  uranus: [
    {
      src: "/gallery/uranus/1.webp",
      caption: "Uranus as Voyager 2 saw it in 1986 — a serene, featureless blue-green globe.",
      credit: "NASA / JPL",
    },
    {
      src: "/gallery/uranus/2.webp",
      caption: "Hubble reveals Uranus's faint rings and bright clouds — the planet orbits tipped on its side.",
      credit: "NASA / ESA / Hubble",
    },
    {
      src: "/gallery/uranus/3.webp",
      caption: "A remastered Voyager 2 view of the seventh planet.",
      credit: "NASA / JPL-Caltech",
    },
  ],
  pluto: [
    {
      src: "/gallery/pluto/1.webp",
      caption: "Pluto in true color by New Horizons, 2015 — its heart-shaped glacier is Sputnik Planitia.",
      credit: "NASA / JHUAPL / SwRI",
    },
  ],
  neptune: [
    {
      src: "/gallery/neptune/1.webp",
      caption: "Neptune's Great Dark Spot — a storm the size of Earth, imaged by Voyager 2 in 1989.",
      credit: "NASA / JPL",
    },
    {
      src: "/gallery/neptune/2.webp",
      caption: "Bright methane cirrus clouds streak high above Neptune's blue atmosphere.",
      credit: "NASA / JPL",
    },
    {
      src: "/gallery/neptune/3.webp",
      caption: "The full disk of Neptune — humanity's only close-up visit, Voyager 2, 1989.",
      credit: "NASA / JPL",
    },
  ],
};
