/** Spanish translations for data content (English lives in src/data) */

export const ES_BODY: Record<string, { description: string; funFacts: string[] }> = {
  sun: {
    description:
      "Una estrella enana amarilla de tipo G, con 4.600 millones de años. Cada segundo fusiona 600 millones de toneladas de hidrógeno, alimentando toda la vida en la Tierra.",
    funFacts: [
      "El Sol concentra el 99,86% de toda la masa del Sistema Solar.",
      "Dentro de él cabrían alrededor de un millón de Tierras.",
      "La luz de su núcleo tarda ~100.000 años en escapar a la superficie — y luego solo 8 minutos en llegar a la Tierra.",
    ],
  },
  mercury: {
    description:
      "El planeta más pequeño y el más cercano al Sol. Su superficie craterizada soporta los cambios de temperatura más extremos del Sistema Solar.",
    funFacts: [
      "Un día completo en Mercurio (de amanecer a amanecer) dura dos de sus años.",
      "Se está encogiendo — el planeta se ha contraído ~7 km al enfriarse su núcleo.",
      "Pese a ser el más cercano al Sol, no es el más caliente — ese es Venus.",
    ],
  },
  venus: {
    description:
      "Un mundo de efecto invernadero desbocado envuelto en nubes de ácido sulfúrico. Gira al revés, y su día es más largo que su año.",
    funFacts: [
      "El planeta más caliente — capaz de fundir plomo, de día o de noche.",
      "Llueve ácido sulfúrico, pero las gotas se evaporan antes de tocar el suelo.",
      "Venus brilla más que cualquier estrella del cielo nocturno terrestre.",
    ],
  },
  earth: {
    description:
      "El único mundo conocido que alberga vida. Océanos líquidos cubren el 71% de su superficie bajo una atmósfera fina y protectora.",
    funFacts: [
      "El planeta más denso del Sistema Solar.",
      "Su rotación se frena ~1,7 ms por siglo — los días se alargan poco a poco.",
      "Más del 70% de su actividad volcánica ocurre bajo el agua.",
    ],
  },
  mars: {
    description:
      "El planeta rojo, teñido por polvo de óxido de hierro. Hogar del Monte Olimpo, el mayor volcán del Sistema Solar.",
    funFacts: [
      "El Monte Olimpo se eleva ~22 km — casi 3 veces el Everest.",
      "Las tormentas de polvo pueden envolver el planeta entero durante semanas.",
      "Los atardeceres en Marte son azules.",
    ],
  },
  jupiter: {
    description:
      "Un gigante gaseoso con más masa que todos los demás planetas juntos. Su Gran Mancha Roja es una tormenta mayor que la Tierra, activa desde hace siglos.",
    funFacts: [
      "Su campo magnético es el más fuerte de todos los planetas — 20.000 veces el terrestre.",
      "Júpiter desvía cometas y asteroides como un escudo cósmico.",
      "El que más rápido gira: su día dura menos de 10 horas.",
    ],
  },
  saturn: {
    description:
      "Coronado por un vasto sistema de anillos helados de solo ~10 metros de grosor. Menos denso que el agua — flotaría en un océano lo bastante grande.",
    funFacts: [
      "Sus anillos abarcan 282.000 km pero tienen solo unos 10 metros de grosor.",
      "Una tormenta hexagonal más ancha que la Tierra corona su polo norte.",
      "Su luna Titán tiene ríos y lagos de metano líquido.",
    ],
  },
  uranus: {
    description:
      "Un gigante de hielo volcado de lado, rodando alrededor del Sol. Cada polo recibe 42 años de luz seguidos de 42 años de oscuridad.",
    funFacts: [
      "Rueda de lado alrededor del Sol — probablemente lo volcó un impacto gigante.",
      "La atmósfera planetaria más fría jamás medida: −224 °C.",
      "Primer planeta descubierto con telescopio, por William Herschel en 1781.",
    ],
  },
  neptune: {
    description:
      "El mundo más ventoso conocido — ráfagas supersónicas de 2.100 km/h. Descubierto por las matemáticas antes de ser visto.",
    funFacts: [
      "Sus vientos alcanzan 2.100 km/h — más rápidos que el sonido en la Tierra.",
      "Solo ha completado una órbita desde su descubrimiento en 1846.",
      "En sus profundidades, probablemente llueven diamantes.",
    ],
  },
  pluto: {
    description:
      "El planeta enano más famoso, reclasificado en 2006. Un mundo helado de montañas de agua congelada y un corazón de nitrógeno: la llanura Sputnik.",
    funFacts: [
      "Un año en Plutón dura 248 años terrestres — no ha completado ni uno desde su descubrimiento en 1930.",
      "Su luna Caronte es tan grande que ambos orbitan un punto fuera de Plutón.",
      "Tiene un glaciar con forma de corazón del tamaño de Texas.",
    ],
  },
};

export const ES_CLASSIFICATION: Record<string, string> = {
  Terrestrial: "Terrestre",
  "Gas Giant": "Gigante gaseoso",
  "Ice Giant": "Gigante de hielo",
  Star: "Estrella",
  "Dwarf Planet": "Planeta enano",
};

export const ES_MOON: Record<string, { description: string; funFact: string }> = {
  moon: {
    description:
      "El único satélite natural de la Tierra, formado hace 4.500 millones de años tras un impacto colosal. Estabiliza el eje terrestre y mueve las mareas.",
    funFact: "Se aleja de la Tierra 3,8 cm cada año.",
  },
  io: {
    description:
      "El cuerpo con más actividad volcánica del Sistema Solar — cientos de volcanes activos alimentados por la marea gravitatoria de Júpiter.",
    funFact: "Sus volcanes lanzan azufre hasta 500 km de altura.",
  },
  europa: {
    description:
      "Una corteza de hielo agrietada cubre un océano global de agua líquida con el doble de agua que todos los océanos terrestres.",
    funFact: "Es uno de los lugares más prometedores para buscar vida fuera de la Tierra.",
  },
  titan: {
    description:
      "La única luna con atmósfera densa, y el único mundo aparte de la Tierra con ríos, lagos y lluvia — de metano líquido a −179 °C.",
    funFact: "Con tan poca gravedad y aire tan denso, un humano podría volar batiendo alas artificiales.",
  },
  enceladus: {
    description:
      "Una pequeña luna helada que dispara géiseres de agua desde un océano subterráneo a través de grietas en su polo sur.",
    funFact: "Sus géiseres alimentan uno de los anillos de Saturno: el anillo E.",
  },
};

/** Gallery captions keyed by image src */
export const ES_CAPTION: Record<string, string> = {
  "/gallery/sun/1.webp":
    "El Sol en ultravioleta extremo — el plasma incandescente dibuja las líneas del campo magnético en la corona.",
  "/gallery/sun/2.webp":
    "Una magnífica eyección de masa coronal lanza miles de millones de toneladas de plasma al espacio, agosto de 2012.",
  "/gallery/sun/3.webp": "Una llamarada solar estalla en el limbo del Sol, enero de 2007.",
  "/gallery/mercury/1.webp":
    "La primera mirada de la humanidad al lado oculto de Mercurio — sobrevuelo de MESSENGER, enero de 2008.",
  "/gallery/mercury/2.webp":
    "Mercurio en color real: un mundo sin aire, craterizado y abrasado por el Sol cercano.",
  "/gallery/mercury/3.webp":
    "El color realzado revela la diversidad mineral de las antiguas llanuras de lava de Mercurio.",
  "/gallery/venus/1.webp":
    "Venus sin sus nubes — un mapa global por radar de su superficie volcánica, por Magallanes.",
  "/gallery/venus/2.webp":
    "La densa capa de nubes de ácido sulfúrico de Venus, captada por Mariner 10 en 1974.",
  "/gallery/venus/3.webp":
    "Patrones de nubes en luz ultravioleta, vistos por el orbitador Pioneer Venus.",
  "/gallery/earth/1.webp":
    "La Canica Azul — el icónico retrato tomado por la tripulación del Apollo 17, 1972.",
  "/gallery/earth/2.webp":
    "Earthrise: nuestro mundo asomando sobre el horizonte lunar, fotografiado desde el Apollo 8, 1968.",
  "/gallery/earth/3.webp":
    "El hemisferio oriental de la Tierra — África y Asia bajo sistemas de nubes en remolino.",
  "/gallery/mars/1.webp":
    "Valles Marineris — un sistema de cañones de 4.000 km que atraviesa la cara de Marte.",
  "/gallery/mars/2.webp":
    "Marte en color real, fotografiado durante el sobrevuelo de la sonda Rosetta de la ESA en 2007.",
  "/gallery/mars/3.webp":
    "El autorretrato de Curiosity en el punto de perforación 'Big Sky', cráter Gale, 2015.",
  "/gallery/jupiter/1.webp":
    "Júpiter y su Gran Mancha Roja — una tormenta activa desde hace siglos, vista por el Hubble.",
  "/gallery/jupiter/2.webp":
    "La Gran Mancha Roja de cerca, fotografiada por la Voyager 1 en 1979.",
  "/gallery/jupiter/3.webp":
    "Un retrato en color real por Cassini — el punto oscuro es la sombra de la luna Europa.",
  "/gallery/saturn/1.webp":
    "Saturno en el equinoccio — la luz roza los anillos de canto en este mosaico de Cassini, 2009.",
  "/gallery/saturn/2.webp":
    "'El día que la Tierra sonrió' — Saturno a contraluz; la Tierra es un punto pálido bajo los anillos.",
  "/gallery/saturn/3.webp":
    "Saturno y sus anillos en color natural, fotografiados por el telescopio espacial Hubble.",
  "/gallery/uranus/1.webp":
    "Urano como lo vio la Voyager 2 en 1986 — un sereno globo azul verdoso sin rasgos.",
  "/gallery/uranus/2.webp":
    "El Hubble revela los tenues anillos de Urano y nubes brillantes — el planeta orbita volcado de lado.",
  "/gallery/uranus/3.webp": "Una vista remasterizada del séptimo planeta por la Voyager 2.",
  "/gallery/neptune/1.webp":
    "La Gran Mancha Oscura de Neptuno — una tormenta del tamaño de la Tierra, por la Voyager 2 en 1989.",
  "/gallery/neptune/2.webp":
    "Nubes cirro de metano brillan en lo alto de la atmósfera azul de Neptuno.",
  "/gallery/neptune/3.webp":
    "El disco completo de Neptuno — la única visita cercana de la humanidad, Voyager 2, 1989.",
  "/gallery/pluto/1.webp":
    "Plutón en color real por New Horizons, 2015 — con su glaciar en forma de corazón, la llanura Sputnik.",
};
