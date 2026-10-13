import {prepareResultNavigation} from './result-navigation.js?v=20261013-story-adapted-meanings-1';
import {selectReflections} from './result-reflections.js?v=20261013-story-adapted-meanings-1';
import {assignUniqueWords,normalizeWord} from './unique-labels.js?v=20261013-story-adapted-meanings-1';
import {POEM_EN} from './poem-translations.js?v=20261013-story-adapted-meanings-1';
import {createPoemReader} from './poem-reader.js?v=20261013-story-adapted-meanings-1';
import {createColorMotion} from './poem-color-motion.js?v=20261013-story-adapted-meanings-1';
import {prepareResultSharing} from './result-sharing.js?v=20261013-story-adapted-meanings-1';
import {createRecommender} from './recommendation.js?v=20261013-story-adapted-meanings-1';
import {EDITORIAL_VERSION,POEM_WORD_BANKS,WORD_CONTEXTS,THEME_LABELS_ES,THEME_LABELS_EN} from './poem-word-semantics.js?v=20261013-story-adapted-meanings-1';

(()=>{
  const stateHost={get widgetState(){try{return JSON.parse(sessionStorage.getItem('susidlc-bilingual-journey')||'null');}catch{return null;}},setWidgetState(state){try{sessionStorage.setItem('susidlc-bilingual-journey',JSON.stringify(state));}catch{}return Promise.resolve();}};
  const root=document.getElementById('susi-poems'),q=s=>root.querySelector(s),NS='http://www.w3.org/2000/svg';
  const PAGES=[
  {
    "title": "Corriente de colores (I)",
    "short": "Interactives",
    "kind": "umbral",
    "shape": "Umbral",
    "paletteName": "Paleta original",
    "palette": [
      "#33241e",
      "#a42b40",
      "#b82636",
      "#b23b70",
      "#cca227",
      "#e5ddcf"
    ],
    "photo": "El estudio · paleta conservada",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-589892",
    "theme": "Una fábula de heridas, cuidado y liberación: el vuelo hacia una corriente de colores enlaza fragilidad, tránsito y transformación.",
    "words": [
      {
        "text": "esquina",
        "dest": 11
      },
      {
        "text": "roca",
        "dest": 8
      },
      {
        "text": "lodo",
        "dest": 8
      },
      {
        "text": "plumas",
        "dest": 3
      },
      {
        "text": "corriente",
        "dest": 1
      },
      {
        "text": "vientos",
        "dest": 6
      },
      {
        "text": "estelas",
        "dest": 10
      },
      {
        "text": "vapor",
        "dest": 10
      },
      {
        "text": "espirales",
        "dest": 1
      },
      {
        "text": "colores",
        "dest": 4
      },
      {
        "text": "mundos",
        "dest": 2
      },
      {
        "text": "ligeros",
        "dest": 7
      },
      {
        "text": "alas",
        "dest": 3
      },
      {
        "text": "heridas",
        "dest": 9
      },
      {
        "text": "cuidado",
        "dest": 5
      },
      {
        "text": "onda",
        "dest": 10
      },
      {
        "text": "brillar",
        "dest": 7
      },
      {
        "text": "luces",
        "dest": 10
      },
      {
        "text": "vuelo",
        "dest": 4
      },
      {
        "text": "vapores",
        "dest": 2
      },
      {
        "text": "cielo",
        "dest": 7
      },
      {
        "text": "ventana abierta",
        "dest": 6
      },
      {
        "text": "volando",
        "dest": 3
      },
      {
        "text": "vapores coloridos",
        "dest": 6
      }
    ]
  },
  {
    "title": "Corriente de colores (II)",
    "short": "Corriente II",
    "kind": "fibonacci",
    "shape": "Fibonacci",
    "paletteName": "Luz ámbar",
    "palette": [
      "#634936",
      "#ae784a",
      "#ddb676",
      "#f4e3bd"
    ],
    "photo": "Lámpara y luz cálida",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-590025",
    "theme": "El impulso por alcanzar algo que se desvanece conduce a una caída y a un inesperado retorno del pulso vital.",
    "words": [
      {
        "text": "lejos",
        "dest": 2
      },
      {
        "text": "inalcanzable",
        "dest": 11
      },
      {
        "text": "mano",
        "dest": 5
      },
      {
        "text": "ojos",
        "dest": 7
      },
      {
        "text": "agua",
        "dest": 3
      },
      {
        "text": "sentidos",
        "dest": 4
      },
      {
        "text": "volando",
        "dest": 0
      },
      {
        "text": "corriente",
        "dest": 0
      },
      {
        "text": "alcanzar",
        "dest": 6
      },
      {
        "text": "frío",
        "dest": 7
      },
      {
        "text": "velocidad",
        "dest": 10
      },
      {
        "text": "piel",
        "dest": 9
      },
      {
        "text": "estirar",
        "dest": 6
      },
      {
        "text": "logrado",
        "dest": 2
      },
      {
        "text": "desvanece",
        "dest": 11
      },
      {
        "text": "vacío infinito",
        "dest": 11
      },
      {
        "text": "plumas",
        "dest": 0
      },
      {
        "text": "caída",
        "dest": 9
      },
      {
        "text": "fuerza",
        "dest": 10
      },
      {
        "text": "lágrimas",
        "dest": 9
      },
      {
        "text": "vida",
        "dest": 2
      },
      {
        "text": "pulso",
        "dest": 10
      },
      {
        "text": "abrir",
        "dest": 6
      },
      {
        "text": "otra vez",
        "dest": 0
      }
    ]
  },
  {
    "title": "Nuevo mundo (III)",
    "short": "Nuevo mundo",
    "kind": "orbitas",
    "shape": "Triangulación",
    "paletteName": "Ventana azul",
    "palette": [
      "#295b6f",
      "#4d8aa0",
      "#95bdc0",
      "#d9dacf"
    ],
    "photo": "Luz azul de la ventana",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-590104",
    "theme": "Un universo de tres capas —raíces, superficie y mar— une asombro, dolor y una nueva oportunidad vital.",
    "words": [
      {
        "text": "mundo",
        "dest": 0
      },
      {
        "text": "real",
        "dest": 4
      },
      {
        "text": "colorido",
        "dest": 0
      },
      {
        "text": "brillante",
        "dest": 10
      },
      {
        "text": "astros",
        "dest": 7
      },
      {
        "text": "noche",
        "dest": 7
      },
      {
        "text": "mar",
        "dest": 3
      },
      {
        "text": "olas",
        "dest": 1
      },
      {
        "text": "terrazas",
        "dest": 6
      },
      {
        "text": "rascacielos",
        "dest": 4
      },
      {
        "text": "árboles",
        "dest": 8
      },
      {
        "text": "tres capas",
        "dest": 5
      },
      {
        "text": "raíces",
        "dest": 8
      },
      {
        "text": "superficie",
        "dest": 4
      },
      {
        "text": "talentos",
        "dest": 5
      },
      {
        "text": "astros vivos",
        "dest": 7
      },
      {
        "text": "aire",
        "dest": 0
      },
      {
        "text": "diamantes",
        "dest": 10
      },
      {
        "text": "inhalo",
        "dest": 6
      },
      {
        "text": "exhalo",
        "dest": 6
      },
      {
        "text": "orgullo",
        "dest": 9
      },
      {
        "text": "nómada",
        "dest": 6
      },
      {
        "text": "alas",
        "dest": 0
      },
      {
        "text": "nueva oportunidad",
        "dest": 6
      }
    ]
  },
  {
    "title": "Primeros días en el Nuevo Mundo (IV)",
    "short": "Primeros días",
    "kind": "semillas",
    "shape": "Filotaxis",
    "paletteName": "Lienzo floral",
    "palette": [
      "#42534a",
      "#b14e74",
      "#d47c88",
      "#c5a33f"
    ],
    "photo": "Verdes y rosas de los lienzos",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-590444",
    "theme": "Desarraigo y reconstrucción: las alas dejan de servir, y una cueva con un piano se convierte en lugar de confianza y descanso.",
    "words": [
      {
        "text": "ojos",
        "dest": 4
      },
      {
        "text": "luz",
        "dest": 10
      },
      {
        "text": "rayos solares",
        "dest": 10
      },
      {
        "text": "piel",
        "dest": 9
      },
      {
        "text": "plumas",
        "dest": 0
      },
      {
        "text": "fuerza",
        "dest": 1
      },
      {
        "text": "agilidad",
        "dest": 1
      },
      {
        "text": "volar",
        "dest": 0
      },
      {
        "text": "cielo",
        "dest": 7
      },
      {
        "text": "mar",
        "dest": 2
      },
      {
        "text": "cueva",
        "dest": 5
      },
      {
        "text": "raíz",
        "dest": 8
      },
      {
        "text": "Ceiba",
        "dest": 8
      },
      {
        "text": "piano",
        "dest": 5
      },
      {
        "text": "teclas",
        "dest": 5
      },
      {
        "text": "pasión",
        "dest": 9
      },
      {
        "text": "preciosas alas",
        "dest": 0
      },
      {
        "text": "construir",
        "dest": 6
      },
      {
        "text": "aguas majestuosas",
        "dest": 2
      },
      {
        "text": "ruta",
        "dest": 11
      },
      {
        "text": "triste melodía",
        "dest": 5
      },
      {
        "text": "tres notas",
        "dest": 5
      },
      {
        "text": "alma",
        "dest": 5
      },
      {
        "text": "descansar",
        "dest": 7
      }
    ]
  },
  {
    "title": "Relatos del civil (V)",
    "short": "Relatos del civil",
    "kind": "prisma",
    "shape": "Prisma",
    "paletteName": "Nogal",
    "palette": [
      "#4e3429",
      "#855333",
      "#b6794e",
      "#d6ac7b"
    ],
    "photo": "Madera del estudio",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-590763",
    "theme": "Memoria y transformación después de una experiencia extraordinaria; el reflejo reúne identidad, añoranza y deseo de volver a ver el vuelo.",
    "words": [
      {
        "text": "delirios",
        "dest": 7
      },
      {
        "text": "huesos",
        "dest": 8
      },
      {
        "text": "historias",
        "dest": 6
      },
      {
        "text": "verdad",
        "dest": 5
      },
      {
        "text": "normalidad",
        "dest": 8
      },
      {
        "text": "percepción",
        "dest": 2
      },
      {
        "text": "oportunidades",
        "dest": 6
      },
      {
        "text": "cielo",
        "dest": 7
      },
      {
        "text": "vida",
        "dest": 10
      },
      {
        "text": "reflejo",
        "dest": 5
      },
      {
        "text": "espejo",
        "dest": 5
      },
      {
        "text": "melancolías",
        "dest": 11
      },
      {
        "text": "voz",
        "dest": 9
      },
      {
        "text": "fuego",
        "dest": 10
      },
      {
        "text": "recuerdos",
        "dest": 11
      },
      {
        "text": "amores pasados",
        "dest": 9
      },
      {
        "text": "piel",
        "dest": 9
      },
      {
        "text": "sangre",
        "dest": 10
      },
      {
        "text": "pupilas",
        "dest": 7
      },
      {
        "text": "despierto",
        "dest": 2
      },
      {
        "text": "aroma",
        "dest": 6
      },
      {
        "text": "volar",
        "dest": 0
      },
      {
        "text": "vientos",
        "dest": 0
      },
      {
        "text": "colores",
        "dest": 0
      }
    ]
  },
  {
    "title": "Pensamientos del alma (VI)",
    "short": "Pensamientos",
    "kind": "ondas",
    "shape": "Ondas armónicas",
    "paletteName": "Piano",
    "palette": [
      "#343739",
      "#777b79",
      "#bbbdb5",
      "#e6e1d1"
    ],
    "photo": "Teclas de marfil y negro",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-590891",
    "theme": "Introspección en un nuevo mundo, vulnerabilidad y búsqueda de ayuda; el piano y los tintes púrpuras dan cuerpo sensorial a la duda.",
    "words": [
      {
        "text": "suelo",
        "dest": 8
      },
      {
        "text": "mundos",
        "dest": 2
      },
      {
        "text": "pasiones",
        "dest": 9
      },
      {
        "text": "cueva",
        "dest": 3
      },
      {
        "text": "tintes púrpuras",
        "dest": 0
      },
      {
        "text": "manos",
        "dest": 10
      },
      {
        "text": "ayuda",
        "dest": 11
      },
      {
        "text": "piano",
        "dest": 3
      },
      {
        "text": "vida",
        "dest": 10
      },
      {
        "text": "especial",
        "dest": 6
      },
      {
        "text": "amor",
        "dest": 9
      },
      {
        "text": "piel",
        "dest": 9
      },
      {
        "text": "pasos",
        "dest": 6
      },
      {
        "text": "mar",
        "dest": 1
      },
      {
        "text": "ser vivo",
        "dest": 2
      },
      {
        "text": "atajo",
        "dest": 11
      },
      {
        "text": "cuerpo",
        "dest": 4
      },
      {
        "text": "fluidos",
        "dest": 1
      },
      {
        "text": "romanticismo",
        "dest": 9
      },
      {
        "text": "tristes melodías",
        "dest": 3
      },
      {
        "text": "salvar",
        "dest": 11
      },
      {
        "text": "verdad",
        "dest": 4
      }
    ]
  },
  {
    "title": "Querido diario,",
    "short": "Querido diario",
    "kind": "pliegues",
    "shape": "Pliegues en zigzag",
    "paletteName": "Lienzo pastel",
    "palette": [
      "#bd6f80",
      "#d99b87",
      "#c29c44",
      "#ecd4b0"
    ],
    "photo": "Coral y arena de la pintura",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-589513",
    "theme": "Comenzar una vocación artística entre el fracaso y la perseverancia, con memoria del padre y del paisaje de origen.",
    "words": [
      {
        "text": "comenzando",
        "dest": 10
      },
      {
        "text": "pintar",
        "dest": 0
      },
      {
        "text": "paraíso",
        "dest": 2
      },
      {
        "text": "viñedo",
        "dest": 8
      },
      {
        "text": "praderas",
        "dest": 8
      },
      {
        "text": "viento",
        "dest": 0
      },
      {
        "text": "esperanza",
        "dest": 10
      },
      {
        "text": "lienzo",
        "dest": 0
      },
      {
        "text": "dibujar",
        "dest": 5
      },
      {
        "text": "caída infinita",
        "dest": 1
      },
      {
        "text": "torbellino",
        "dest": 1
      },
      {
        "text": "lentamente",
        "dest": 7
      },
      {
        "text": "cielo",
        "dest": 7
      },
      {
        "text": "fuerzas",
        "dest": 10
      },
      {
        "text": "eucalipto",
        "dest": 8
      },
      {
        "text": "cielo celeste",
        "dest": 7
      },
      {
        "text": "nubes blancas",
        "dest": 7
      },
      {
        "text": "vueltas",
        "dest": 4
      },
      {
        "text": "empezar",
        "dest": 10
      },
      {
        "text": "nómada",
        "dest": 2
      },
      {
        "text": "vuelo",
        "dest": 0
      },
      {
        "text": "alas",
        "dest": 3
      },
      {
        "text": "volveré",
        "dest": 0
      },
      {
        "text": "triunfante",
        "dest": 10
      }
    ]
  },
  {
    "title": "La Noche",
    "short": "La Noche",
    "kind": "eclipse",
    "shape": "Eclipse",
    "paletteName": "Cuero y reflejos",
    "palette": [
      "#273b44",
      "#426170",
      "#7c9399",
      "#c9c7bd"
    ],
    "photo": "Azul petróleo sobre cuero",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-589263",
    "theme": "Un cielo personificado expresa el agotamiento del llanto: los astros se vuelven ojos y el alma busca despertar.",
    "words": [
      {
        "text": "cielo gris",
        "dest": 0
      },
      {
        "text": "acalla",
        "dest": 5
      },
      {
        "text": "despertar",
        "dest": 10
      },
      {
        "text": "noche desvelada",
        "dest": 11
      },
      {
        "text": "cansada",
        "dest": 11
      },
      {
        "text": "llorar",
        "dest": 9
      },
      {
        "text": "astros",
        "dest": 2
      },
      {
        "text": "hinchados",
        "dest": 9
      },
      {
        "text": "asemejan",
        "dest": 4
      },
      {
        "text": "ojos",
        "dest": 4
      },
      {
        "text": "alma",
        "dest": 5
      },
      {
        "text": "podido despertar",
        "dest": 10
      },
      {
        "text": "cielo",
        "dest": 2
      },
      {
        "text": "gris",
        "dest": 0
      },
      {
        "text": "noche",
        "dest": 10
      },
      {
        "text": "desvelada",
        "dest": 11
      },
      {
        "text": "astros hinchados",
        "dest": 2
      },
      {
        "text": "un alma",
        "dest": 5
      }
    ]
  },
  {
    "title": "La Tierra y la humanidad",
    "short": "La Tierra",
    "kind": "hexagonos",
    "shape": "Mosaico hexagonal",
    "paletteName": "Hojas",
    "palette": [
      "#273c1e",
      "#536c2c",
      "#889a44",
      "#d4d6a8"
    ],
    "photo": "Follaje junto a la lámpara",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-589355",
    "theme": "La Tierra y la humanidad se enfrentan y resultan heridas; la naturaleza responde con una sabiduría distinta a la rapidez humana.",
    "words": [
      {
        "text": "escucha",
        "dest": 5
      },
      {
        "text": "Tierra",
        "dest": 2
      },
      {
        "text": "manifestar",
        "dest": 4
      },
      {
        "text": "rebelión",
        "dest": 10
      },
      {
        "text": "vivos",
        "dest": 2
      },
      {
        "text": "razonar",
        "dest": 5
      },
      {
        "text": "naturaleza",
        "dest": 6
      },
      {
        "text": "cruel",
        "dest": 9
      },
      {
        "text": "destruyendo",
        "dest": 11
      },
      {
        "text": "paso",
        "dest": 1
      },
      {
        "text": "maravilla",
        "dest": 0
      },
      {
        "text": "defiende",
        "dest": 10
      },
      {
        "text": "autodestrucción",
        "dest": 9
      },
      {
        "text": "afectados",
        "dest": 11
      },
      {
        "text": "querellando",
        "dest": 4
      },
      {
        "text": "mayor",
        "dest": 3
      },
      {
        "text": "menor",
        "dest": 7
      },
      {
        "text": "ágil",
        "dest": 0
      },
      {
        "text": "sabiduría",
        "dest": 5
      },
      {
        "text": "reacciona",
        "dest": 10
      },
      {
        "text": "dolor",
        "dest": 9
      }
    ]
  },
  {
    "title": "Muerte a una pasión",
    "short": "Una pasión",
    "kind": "vortice",
    "shape": "Reloj de arena curvo",
    "paletteName": "Orquídea",
    "palette": [
      "#7c395c",
      "#a4597c",
      "#c292a1",
      "#596b4e"
    ],
    "photo": "Flores fucsias del estudio",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-589110",
    "theme": "El dolor de una vocación frustrada y una identidad puesta en duda se expresa mediante mar, fuego, papel y gotas de color.",
    "words": [
      {
        "text": "nombre",
        "dest": 4
      },
      {
        "text": "apellido",
        "dest": 4
      },
      {
        "text": "quise ser",
        "dest": 6
      },
      {
        "text": "camino",
        "dest": 11
      },
      {
        "text": "mar",
        "dest": 1
      },
      {
        "text": "abraza",
        "dest": 5
      },
      {
        "text": "cuerpo",
        "dest": 10
      },
      {
        "text": "fuego",
        "dest": 10
      },
      {
        "text": "quema",
        "dest": 10
      },
      {
        "text": "papel",
        "dest": 6
      },
      {
        "text": "rezumando",
        "dest": 11
      },
      {
        "text": "espinas",
        "dest": 8
      },
      {
        "text": "caen",
        "dest": 1
      },
      {
        "text": "gotas",
        "dest": 1
      },
      {
        "text": "color",
        "dest": 0
      },
      {
        "text": "pecho",
        "dest": 5
      },
      {
        "text": "algún día",
        "dest": 7
      },
      {
        "text": "quiso tener",
        "dest": 6
      },
      {
        "text": "reside",
        "dest": 7
      },
      {
        "text": "lecho",
        "dest": 7
      }
    ]
  },
  {
    "title": "Energética muerte",
    "short": "Energética",
    "kind": "roseta",
    "shape": "Roseta",
    "paletteName": "Rojo y cian",
    "palette": [
      "#a82c38",
      "#c64649",
      "#4596aa",
      "#d4c7ad"
    ],
    "photo": "La muñeca y su fondo",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-589027",
    "theme": "Cambiar de vida se vive como miedo, euforia y renovación. Amanecer y ocaso forman un ciclo de impulso, desgaste y recomienzo.",
    "words": [
      {
        "text": "corazón",
        "dest": 9
      },
      {
        "text": "muerte",
        "dest": 9
      },
      {
        "text": "manos",
        "dest": 5
      },
      {
        "text": "helada",
        "dest": 7
      },
      {
        "text": "sangre",
        "dest": 4
      },
      {
        "text": "pasión",
        "dest": 9
      },
      {
        "text": "miedo",
        "dest": 11
      },
      {
        "text": "noche",
        "dest": 7
      },
      {
        "text": "dormir",
        "dest": 7
      },
      {
        "text": "vivir",
        "dest": 2
      },
      {
        "text": "energía",
        "dest": 0
      },
      {
        "text": "amanecer",
        "dest": 3
      },
      {
        "text": "euforia",
        "dest": 6
      },
      {
        "text": "ocaso",
        "dest": 7
      },
      {
        "text": "piel",
        "dest": 4
      },
      {
        "text": "límites",
        "dest": 11
      },
      {
        "text": "lágrimas",
        "dest": 9
      },
      {
        "text": "fuego",
        "dest": 9
      },
      {
        "text": "tez",
        "dest": 3
      },
      {
        "text": "regresan",
        "dest": 0
      },
      {
        "text": "hogar",
        "dest": 6
      },
      {
        "text": "confortarme",
        "dest": 5
      },
      {
        "text": "empezar",
        "dest": 6
      },
      {
        "text": "día",
        "dest": 3
      }
    ]
  },
  {
    "title": "Sin salida",
    "short": "Sin salida",
    "kind": "laberinto",
    "shape": "Laberinto abierto",
    "paletteName": "Pared y sombra",
    "palette": [
      "#725c4b",
      "#96866f",
      "#b8a78c",
      "#d3c5ac"
    ],
    "photo": "Curvas y sombras de la pared",
    "url": "https://www.poemas-del-alma.com/blog/mostrar-poema-597995",
    "theme": "Encierro, agotamiento y deseo de libertad frente a barreras externas; la escritura aparece como un breve impulso vital.",
    "words": [
      {
        "text": "lágrimas",
        "dest": 9
      },
      {
        "text": "gotas",
        "dest": 1
      },
      {
        "text": "amor",
        "dest": 5
      },
      {
        "text": "camino",
        "dest": 6
      },
      {
        "text": "momento",
        "dest": 7
      },
      {
        "text": "vida",
        "dest": 10
      },
      {
        "text": "agonía",
        "dest": 9
      },
      {
        "text": "encierro",
        "dest": 7
      },
      {
        "text": "impotencia",
        "dest": 8
      },
      {
        "text": "ayudar",
        "dest": 5
      },
      {
        "text": "crear",
        "dest": 0
      },
      {
        "text": "corazón",
        "dest": 10
      },
      {
        "text": "herramientas",
        "dest": 6
      },
      {
        "text": "mundo",
        "dest": 2
      },
      {
        "text": "libre",
        "dest": 0
      },
      {
        "text": "miedo",
        "dest": 9
      },
      {
        "text": "escribo",
        "dest": 6
      },
      {
        "text": "libertad",
        "dest": 0
      },
      {
        "text": "altos",
        "dest": 3
      },
      {
        "text": "bajos",
        "dest": 1
      },
      {
        "text": "hirientes",
        "dest": 9
      },
      {
        "text": "sin salida",
        "dest": 7
      }
    ]
  }
];
  /* Twelve lightweight SVG geometries for the review prototype.
 * Pure data; no DOM, animation, network, fonts or website changes.
 * Native viewBox: 0 0 960 600. Every cell has a safe, horizontal text box.
 */
const GEOMETRIES={"umbral":{"wide":{"cells":[{"d":"M90,30L150,30L150,150L90,150Z","cx":120,"cy":90,"box":{"x":97,"y":36,"w":46,"h":108},"labelT":0.5},{"d":"M150,30L210,30L210,150L150,150Z","cx":180,"cy":90,"box":{"x":157,"y":36,"w":46,"h":108},"labelT":0.5},{"d":"M210,30L330,30L330,150L210,150Z","cx":270,"cy":90,"box":{"x":217,"y":36,"w":106,"h":108},"labelT":0.5},{"d":"M330,30L390,30L390,150L330,150Z","cx":360,"cy":90,"box":{"x":337,"y":36,"w":46,"h":108},"labelT":0.5},{"d":"M390,30L570,30L570,150L390,150Z","cx":480,"cy":90,"box":{"x":397,"y":36,"w":166,"h":108},"labelT":0.5},{"d":"M90,150L150,150L150,210L90,210Z","cx":120,"cy":180,"box":{"x":97,"y":156,"w":46,"h":48},"labelT":0.5},{"d":"M150,150L210,150L210,210L150,210Z","cx":180,"cy":180,"box":{"x":157,"y":156,"w":46,"h":48},"labelT":0.5},{"d":"M210,150L330,150L330,210L210,210Z","cx":270,"cy":180,"box":{"x":217,"y":156,"w":106,"h":48},"labelT":0.5},{"d":"M330,150L390,150L390,210L330,210Z","cx":360,"cy":180,"box":{"x":337,"y":156,"w":46,"h":48},"labelT":0.5},{"d":"M390,150L570,150L570,210L390,210Z","cx":480,"cy":180,"box":{"x":397,"y":156,"w":166,"h":48},"labelT":0.5},{"d":"M90,210L150,210L150,330L90,330Z","cx":120,"cy":270,"box":{"x":97,"y":216,"w":46,"h":108},"labelT":0.5},{"d":"M150,210L210,210L210,330L150,330Z","cx":180,"cy":270,"box":{"x":157,"y":216,"w":46,"h":108},"labelT":0.5},{"d":"M210,210L330,210L330,330L210,330Z","cx":270,"cy":270,"box":{"x":217,"y":216,"w":106,"h":108},"labelT":0.5},{"d":"M330,210L390,210L390,330L330,330Z","cx":360,"cy":270,"box":{"x":337,"y":216,"w":46,"h":108},"labelT":0.5},{"d":"M390,210L570,210L570,330L390,330Z","cx":480,"cy":270,"box":{"x":397,"y":216,"w":166,"h":108},"labelT":0.5},{"d":"M90,330L150,330L150,510L90,510Z","cx":120,"cy":420,"box":{"x":97,"y":336,"w":46,"h":168},"labelT":0.5},{"d":"M150,330L210,330L210,510L150,510Z","cx":180,"cy":420,"box":{"x":157,"y":336,"w":46,"h":168},"labelT":0.5},{"d":"M210,330L330,330L330,510L210,510Z","cx":270,"cy":420,"box":{"x":217,"y":336,"w":106,"h":168},"labelT":0.5},{"d":"M330,330L390,330L390,510L330,510Z","cx":360,"cy":420,"box":{"x":337,"y":336,"w":46,"h":168},"labelT":0.5},{"d":"M390,330L570,330L570,510L390,510Z","cx":480,"cy":420,"box":{"x":397,"y":336,"w":166,"h":168},"labelT":0.5},{"d":"M570,30L690,30L690,90L570,90Z","cx":630,"cy":60,"box":{"x":577,"y":36,"w":106,"h":48},"labelT":0.5},{"d":"M690,30L750,30L750,90L690,90Z","cx":720,"cy":60,"box":{"x":697,"y":36,"w":46,"h":48},"labelT":0.5},{"d":"M750,30L870,30L870,90L750,90Z","cx":810,"cy":60,"box":{"x":757,"y":36,"w":106,"h":48},"labelT":0.5},{"d":"M570,90L690,90L690,150L570,150Z","cx":630,"cy":120,"box":{"x":577,"y":96,"w":106,"h":48},"labelT":0.5},{"d":"M690,90L750,90L750,150L690,150Z","cx":720,"cy":120,"box":{"x":697,"y":96,"w":46,"h":48},"labelT":0.5},{"d":"M750,90L870,90L870,150L750,150Z","cx":810,"cy":120,"box":{"x":757,"y":96,"w":106,"h":48},"labelT":0.5},{"d":"M570,150L690,150L690,210L570,210Z","cx":630,"cy":180,"box":{"x":577,"y":156,"w":106,"h":48},"labelT":0.5},{"d":"M690,150L750,150L750,210L690,210Z","cx":720,"cy":180,"box":{"x":697,"y":156,"w":46,"h":48},"labelT":0.5},{"d":"M750,150L870,150L870,210L750,210Z","cx":810,"cy":180,"box":{"x":757,"y":156,"w":106,"h":48},"labelT":0.5},{"d":"M570,210L690,210L690,330L570,330Z","cx":630,"cy":270,"box":{"x":577,"y":216,"w":106,"h":108},"labelT":0.5},{"d":"M690,210L750,210L750,330L690,330Z","cx":720,"cy":270,"box":{"x":697,"y":216,"w":46,"h":108},"labelT":0.5},{"d":"M750,210L870,210L870,330L750,330Z","cx":810,"cy":270,"box":{"x":757,"y":216,"w":106,"h":108},"labelT":0.5},{"d":"M690,330L750,330L750,390L690,390Z","cx":720,"cy":360,"box":{"x":697,"y":336,"w":46,"h":48},"labelT":0.5},{"d":"M750,330L810,330L810,390L750,390Z","cx":780,"cy":360,"box":{"x":757,"y":336,"w":46,"h":48},"labelT":0.5},{"d":"M810,330L870,330L870,390L810,390Z","cx":840,"cy":360,"box":{"x":817,"y":336,"w":46,"h":48},"labelT":0.5},{"d":"M690,390L750,390L750,450L690,450Z","cx":720,"cy":420,"box":{"x":697,"y":396,"w":46,"h":48},"labelT":0.5},{"d":"M750,390L810,390L810,450L750,450Z","cx":780,"cy":420,"box":{"x":757,"y":396,"w":46,"h":48},"labelT":0.5},{"d":"M810,390L870,390L870,450L810,450Z","cx":840,"cy":420,"box":{"x":817,"y":396,"w":46,"h":48},"labelT":0.5},{"d":"M690,450L750,450L750,510L690,510Z","cx":720,"cy":480,"box":{"x":697,"y":456,"w":46,"h":48},"labelT":0.5},{"d":"M750,450L810,450L810,510L750,510Z","cx":780,"cy":480,"box":{"x":757,"y":456,"w":46,"h":48},"labelT":0.5},{"d":"M810,450L870,450L870,510L810,510Z","cx":840,"cy":480,"box":{"x":817,"y":456,"w":46,"h":48},"labelT":0.5},{"d":"M570,390L630,390L630,450L570,450Z","cx":600,"cy":420,"box":{"x":577,"y":396,"w":46,"h":48},"labelT":0.5},{"d":"M630,390L690,390L690,450L630,450Z","cx":660,"cy":420,"box":{"x":637,"y":396,"w":46,"h":48},"labelT":0.5},{"d":"M570,450L630,450L630,510L570,510Z","cx":600,"cy":480,"box":{"x":577,"y":456,"w":46,"h":48},"labelT":0.5},{"d":"M630,450L690,450L690,510L630,510Z","cx":660,"cy":480,"box":{"x":637,"y":456,"w":46,"h":48},"labelT":0.5},{"d":"M570,330L630,330L630,390L570,390Z","cx":600,"cy":360,"box":{"x":577,"y":336,"w":46,"h":48},"labelT":0.5},{"d":"M630,330L690,330L690,390L630,390Z","cx":660,"cy":360,"box":{"x":637,"y":336,"w":46,"h":48},"labelT":0.5}],"bounds":{"x":90,"y":30,"width":780,"height":480}},"compact":{"cells":[{"d":"M90,30L300,30L300,210L90,210Z","cx":195,"cy":120,"box":{"x":97,"y":36,"w":196,"h":168},"labelT":0.5},{"d":"M300,30L480,30L480,210L300,210Z","cx":390,"cy":120,"box":{"x":307,"y":36,"w":166,"h":168},"labelT":0.5},{"d":"M480,30L690,30L690,210L480,210Z","cx":585,"cy":120,"box":{"x":487,"y":36,"w":196,"h":168},"labelT":0.5},{"d":"M690,30L870,30L870,210L690,210Z","cx":780,"cy":120,"box":{"x":697,"y":36,"w":166,"h":168},"labelT":0.5},{"d":"M90,210L300,210L300,360L90,360Z","cx":195,"cy":285,"box":{"x":97,"y":216,"w":196,"h":138},"labelT":0.5},{"d":"M300,210L480,210L480,360L300,360Z","cx":390,"cy":285,"box":{"x":307,"y":216,"w":166,"h":138},"labelT":0.5},{"d":"M480,210L690,210L690,360L480,360Z","cx":585,"cy":285,"box":{"x":487,"y":216,"w":196,"h":138},"labelT":0.5},{"d":"M690,210L870,210L870,360L690,360Z","cx":780,"cy":285,"box":{"x":697,"y":216,"w":166,"h":138},"labelT":0.5},{"d":"M90,360L300,360L300,510L90,510Z","cx":195,"cy":435,"box":{"x":97,"y":366,"w":196,"h":138},"labelT":0.5},{"d":"M300,360L480,360L480,510L300,510Z","cx":390,"cy":435,"box":{"x":307,"y":366,"w":166,"h":138},"labelT":0.5},{"d":"M480,360L690,360L690,510L480,510Z","cx":585,"cy":435,"box":{"x":487,"y":366,"w":196,"h":138},"labelT":0.5},{"d":"M690,360L870,360L870,510L690,510Z","cx":780,"cy":435,"box":{"x":697,"y":366,"w":166,"h":138},"labelT":0.5}],"bounds":{"x":90,"y":30,"width":780,"height":480}}},"fibonacci":{"wide":{"cells":[{"d":"M397.2,510L397.41,501.52L398.03,493.06L399.07,484.64L400.52,476.29L402.38,468.01L404.64,459.84L407.3,451.79L410.35,443.87L413.79,436.12L417.6,428.54L421.78,421.16L426.32,414L431.21,407.06L436.42,400.38L441.96,393.95L447.81,387.81L570,510Z","cx":463.02,"cy":485,"box":{"x":410.04,"y":465,"w":105.96,"h":40},"labelT":0.588},{"d":"M447.81,387.81L453.95,381.96L460.38,376.42L467.06,371.21L474,366.32L481.16,361.78L488.54,357.6L496.12,353.79L503.87,350.35L511.79,347.3L519.84,344.64L528.01,342.38L536.29,340.52L544.64,339.07L553.06,338.03L561.52,337.41L570,337.2L570,510Z","cx":526.73,"cy":392.45,"box":{"x":489.45,"y":364.45,"w":74.55,"h":56},"labelT":0.483},{"d":"M243.6,510L243.7,501.99L243.99,493.98L244.48,485.99L245.17,478.01L246.05,470.05L247.13,462.11L248.41,454.2L249.87,446.32L251.53,438.49L253.38,430.69L255.42,422.94L257.65,415.25L260.07,407.61L262.68,400.04L265.47,392.53L268.45,385.09L410.35,443.87L408.78,447.81L407.3,451.79L405.92,455.8L404.64,459.84L403.46,463.91L402.38,468.01L401.4,472.14L400.52,476.29L399.74,480.46L399.07,484.64L398.5,488.85L398.03,493.06L397.67,497.29L397.41,501.52L397.25,505.76L397.2,510Z","cx":323.91,"cy":473,"box":{"x":257.65,"y":441,"w":132.53,"h":64},"labelT":0.593},{"d":"M268.45,385.09L271.6,377.73L274.94,370.45L278.45,363.25L282.14,356.14L286,349.12L290.04,342.2L294.24,335.38L298.61,328.66L303.14,322.06L307.83,315.56L312.68,309.19L317.69,302.93L322.85,296.8L328.15,290.8L333.61,284.93L339.2,279.2L447.81,387.81L444.85,390.85L441.96,393.95L439.15,397.13L436.42,400.38L433.77,403.69L431.21,407.06L428.72,410.5L426.32,414L424.01,417.55L421.78,421.16L419.65,424.83L417.6,428.54L415.65,432.31L413.79,436.12L412.02,439.97L410.35,443.87Z","cx":349.13,"cy":371.09,"box":{"x":296.17,"y":351.09,"w":105.92,"h":40},"labelT":0.504},{"d":"M339.2,279.2L344.93,273.61L350.8,268.15L356.8,262.85L362.93,257.69L369.19,252.68L375.56,247.83L382.06,243.14L388.66,238.61L395.38,234.24L402.2,230.04L409.12,226L416.14,222.14L423.25,218.45L430.45,214.94L437.73,211.6L445.09,208.45L503.87,350.35L499.97,352.02L496.12,353.79L492.31,355.65L488.54,357.6L484.83,359.65L481.16,361.78L477.55,364.01L474,366.32L470.5,368.72L467.06,371.21L463.69,373.77L460.38,376.42L457.13,379.15L453.95,381.96L450.85,384.85L447.81,387.81Z","cx":419.24,"cy":283.96,"box":{"x":380.96,"y":255.96,"w":76.57,"h":56},"labelT":0.454},{"d":"M445.09,208.45L452.53,205.47L460.04,202.68L467.61,200.07L475.25,197.65L482.94,195.42L490.69,193.38L498.49,191.53L506.32,189.87L514.2,188.41L522.11,187.13L530.05,186.05L538.01,185.17L545.99,184.48L553.98,183.99L561.99,183.7L570,183.6L570,337.2L565.76,337.25L561.52,337.41L557.29,337.67L553.06,338.03L548.85,338.5L544.64,339.07L540.46,339.74L536.29,340.52L532.14,341.4L528.01,342.38L523.91,343.46L519.84,344.64L515.8,345.92L511.79,347.3L507.81,348.78L503.87,350.35Z","cx":520.51,"cy":236.06,"box":{"x":477.03,"y":204.06,"w":86.97,"h":64},"labelT":0.459},{"d":"M90,510L90.09,500.58L90.37,491.16L90.83,481.74L91.48,472.34L92.31,462.95L93.33,453.58L94.53,444.23L95.91,434.91L97.48,425.62L99.22,416.36L101.15,407.13L103.26,397.95L105.55,388.8L108.02,379.71L110.67,370.66L113.49,361.67L259.58,409.14L257.65,415.25L255.85,421.4L254.18,427.59L252.62,433.8L251.18,440.05L249.87,446.32L248.68,452.62L247.62,458.94L246.68,465.28L245.86,471.64L245.17,478.01L244.61,484.39L244.17,490.78L243.85,497.19L243.66,503.59L243.6,510Z","cx":169.54,"cy":473,"box":{"x":101.45,"y":441,"w":136.17,"h":64},"labelT":0.61},{"d":"M113.49,361.67L116.49,352.74L119.67,343.86L123.02,335.05L126.54,326.31L130.23,317.64L134.09,309.04L138.12,300.52L142.32,292.08L146.68,283.73L151.2,275.46L155.89,267.28L160.73,259.2L165.74,251.21L170.89,243.33L176.21,235.54L181.67,227.86L305.94,318.15L302.22,323.37L298.61,328.66L295.1,334.03L291.7,339.46L288.4,344.95L285.22,350.51L282.14,356.14L279.18,361.82L276.32,367.56L273.58,373.35L270.96,379.2L268.45,385.09L266.05,391.04L263.77,397.03L261.62,403.06L259.58,409.14Z","cx":208.28,"cy":331.91,"box":{"x":145.92,"y":299.91,"w":124.73,"h":64},"labelT":0.533},{"d":"M181.67,227.86L187.29,220.29L193.05,212.83L198.95,205.49L205.01,198.26L211.2,191.16L217.53,184.18L223.99,177.32L230.59,170.59L237.32,163.99L244.18,157.53L251.16,151.2L258.26,145.01L265.49,138.95L272.83,133.05L280.29,127.29L287.86,121.67L378.15,245.94L373,249.75L367.93,253.67L362.93,257.69L358.02,261.8L353.19,266.01L348.44,270.32L343.78,274.71L339.2,279.2L334.71,283.78L330.32,288.44L326.01,293.19L321.8,298.02L317.69,302.93L313.67,307.93L309.75,313L305.94,318.15Z","cx":275.05,"cy":219.91,"box":{"x":219.39,"y":191.91,"w":111.32,"h":56},"labelT":0.488},{"d":"M287.86,121.67L295.54,116.21L303.33,110.89L311.21,105.74L319.2,100.73L327.28,95.89L335.46,91.2L343.73,86.68L352.08,82.32L360.52,78.12L369.04,74.09L377.64,70.23L386.31,66.54L395.05,63.02L403.86,59.67L412.74,56.49L421.67,53.49L469.14,199.58L463.06,201.62L457.03,203.77L451.04,206.05L445.09,208.45L439.2,210.96L433.35,213.58L427.56,216.32L421.82,219.18L416.14,222.14L410.51,225.22L404.95,228.4L399.46,231.7L394.03,235.1L388.66,238.61L383.37,242.22L378.15,245.94Z","cx":379.83,"cy":134.91,"box":{"x":328.91,"y":102.91,"w":101.84,"h":64},"labelT":0.465},{"d":"M421.67,53.49L430.66,50.67L439.71,48.02L448.8,45.55L457.95,43.26L467.13,41.15L476.36,39.22L485.62,37.48L494.91,35.91L504.23,34.53L513.58,33.33L522.95,32.31L532.34,31.48L541.74,30.83L551.16,30.37L560.58,30.09L570,30L570,183.6L563.59,183.66L557.19,183.85L550.78,184.17L544.39,184.61L538.01,185.17L531.64,185.86L525.28,186.68L518.94,187.62L512.62,188.68L506.32,189.87L500.05,191.18L493.8,192.62L487.59,194.18L481.4,195.85L475.25,197.65L469.14,199.58Z","cx":506.3,"cy":82.93,"box":{"x":448.61,"y":50.93,"w":115.39,"h":64},"labelT":0.441},{"d":"M90,510L91.03,478.61L94.11,447.35L99.22,416.36L106.36,385.77L115.47,355.71L126.54,326.31L139.5,297.7L154.31,270L170.89,243.33L189.19,217.79L209.12,193.51L230.59,170.59L253.51,149.12L277.79,129.19L303.33,110.89L330,94.31L357.7,79.5L386.31,66.54L415.71,55.47L445.77,46.36L476.36,39.22L507.35,34.11L538.61,31.03L570,30L90,30Z","cx":203.81,"cy":67,"box":{"x":96,"y":35,"w":215.63,"h":64},"labelT":0.157},{"d":"M570,186L577.07,186.17L584.11,186.69L591.13,187.56L598.09,188.77L604.99,190.32L611.8,192.2L618.51,194.42L625.11,196.96L631.57,199.83L637.88,203L644.03,206.49L650,210.27L655.78,214.34L661.35,218.69L666.7,223.3L671.82,228.18L570,330Z","cx":607.88,"cy":230.58,"box":{"x":576,"y":210.58,"w":63.76,"h":40},"labelT":0.341},{"d":"M671.82,228.18L676.7,233.3L681.31,238.65L685.66,244.22L689.73,250L693.51,255.97L697,262.12L700.17,268.43L703.04,274.89L705.58,281.49L707.8,288.2L709.68,295.01L711.23,301.91L712.44,308.87L713.31,315.89L713.83,322.93L714,330L570,330Z","cx":659.87,"cy":308,"box":{"x":618,"y":291,"w":83.73,"h":34},"labelT":0.704},{"d":"M570,30L575.89,30.06L581.78,30.23L587.66,30.52L593.54,30.92L599.41,31.44L605.26,32.08L611.1,32.83L616.93,33.69L622.74,34.67L628.53,35.76L634.29,36.97L640.03,38.29L645.75,39.72L651.43,41.26L657.09,42.92L662.71,44.68L614.5,193.05L611.8,192.2L609.09,191.41L606.36,190.67L603.62,189.98L600.86,189.35L598.09,188.77L595.31,188.24L592.53,187.77L589.73,187.36L586.93,187L584.11,186.69L581.3,186.44L578.48,186.25L575.65,186.11L572.83,186.03L570,186Z","cx":605.84,"cy":74.42,"box":{"x":576,"y":42.42,"w":59.67,"h":64},"labelT":0.33},{"d":"M662.71,44.68L668.29,46.56L673.84,48.54L679.34,50.64L684.81,52.84L690.22,55.14L695.6,57.56L700.92,60.08L706.2,62.7L711.42,65.42L716.59,68.25L721.7,71.18L726.75,74.21L731.74,77.33L736.67,80.56L741.54,83.88L746.34,87.29L654.64,213.5L652.34,211.86L650,210.27L647.64,208.72L645.24,207.22L642.81,205.77L640.36,204.36L637.88,203L635.37,201.7L632.84,200.44L630.29,199.23L627.71,198.07L625.11,196.96L622.48,195.91L619.84,194.9L617.18,193.95L614.5,193.05Z","cx":686.9,"cy":96.77,"box":{"x":660.55,"y":72.77,"w":52.68,"h":48},"labelT":0.429},{"d":"M746.34,87.29L751.07,90.8L755.73,94.4L760.32,98.1L764.83,101.88L769.28,105.75L773.64,109.7L777.93,113.74L782.13,117.87L786.26,122.07L790.3,126.36L794.25,130.72L798.12,135.17L801.9,139.68L805.6,144.27L809.2,148.93L812.71,153.66L686.5,245.36L684.81,243.09L683.09,240.85L681.31,238.65L679.5,236.48L677.64,234.35L675.74,232.25L673.8,230.2L671.82,228.18L669.8,226.2L667.75,224.26L665.65,222.36L663.52,220.5L661.35,218.69L659.15,216.91L656.91,215.19L654.64,213.5Z","cx":753.56,"cy":148.32,"box":{"x":724.71,"y":128.32,"w":57.7,"h":40},"labelT":0.506},{"d":"M812.71,153.66L816.12,158.46L819.44,163.33L822.67,168.26L825.79,173.25L828.82,178.3L831.75,183.41L834.58,188.58L837.3,193.8L839.92,199.08L842.44,204.4L844.86,209.78L847.16,215.19L849.36,220.66L851.46,226.16L853.44,231.71L855.32,237.29L706.95,285.5L706.05,282.82L705.1,280.16L704.09,277.52L703.04,274.89L701.93,272.29L700.77,269.71L699.56,267.16L698.3,264.63L697,262.12L695.64,259.64L694.23,257.19L692.78,254.76L691.28,252.36L689.73,250L688.14,247.66L686.5,245.36Z","cx":791.69,"cy":223.49,"box":{"x":745.99,"y":209.49,"w":91.39,"h":28},"labelT":0.576},{"d":"M855.32,237.29L857.08,242.91L858.74,248.57L860.28,254.25L861.71,259.97L863.03,265.71L864.24,271.47L865.33,277.26L866.31,283.07L867.17,288.9L867.92,294.74L868.56,300.59L869.08,306.46L869.48,312.34L869.77,318.22L869.94,324.11L870,330L714,330L713.97,327.17L713.89,324.35L713.75,321.52L713.56,318.7L713.31,315.89L713,313.07L712.64,310.27L712.23,307.47L711.76,304.69L711.23,301.91L710.65,299.14L710.02,296.38L709.33,293.64L708.59,290.91L707.8,288.2L706.95,285.5Z","cx":791.93,"cy":305,"box":{"x":723.73,"y":285,"w":136.4,"h":40},"labelT":0.626},{"d":"M570,30L589.62,30.64L609.16,32.57L628.53,35.76L647.65,40.22L666.43,45.92L684.81,52.84L702.69,60.94L720,70.19L736.67,80.56L752.63,91.99L767.8,104.45L782.13,117.87L795.55,132.2L808.01,147.37L819.44,163.33L829.81,180L839.06,197.31L847.16,215.19L854.08,233.57L859.78,252.35L864.24,271.47L867.43,290.84L869.36,310.38L870,330L870,30Z","cx":801.28,"cy":55,"box":{"x":738.56,"y":35,"w":125.44,"h":40},"labelT":0.427},{"d":"M690,330L870,330L870,420L690,420Z","cx":780,"cy":375,"box":{"x":697,"y":336,"w":166,"h":78},"labelT":0.5},{"d":"M690,420L870,420L870,510L690,510Z","cx":780,"cy":465,"box":{"x":697,"y":426,"w":166,"h":78},"labelT":0.5},{"d":"M570,330L690,330L690,420L570,420Z","cx":630,"cy":375,"box":{"x":577,"y":336,"w":106,"h":78},"labelT":0.5},{"d":"M570,420L690,420L690,510L570,510Z","cx":630,"cy":465,"box":{"x":577,"y":426,"w":106,"h":78},"labelT":0.5}],"bounds":{"x":90,"y":30,"width":780,"height":480}},"compact":{"cells":[{"d":"M339.6,510L339.88,498.69L340.71,487.42L342.09,476.19L344.03,465.05L346.5,454.02L349.52,443.12L353.07,432.38L357.14,421.83L361.72,411.49L366.81,401.39L372.38,391.55L378.43,382L384.94,372.75L391.9,363.84L399.28,355.27L407.08,347.08L570,510Z","cx":425.95,"cy":475,"box":{"x":355.89,"y":445,"w":140.11,"h":60},"labelT":0.58},{"d":"M407.08,347.08L415.27,339.28L423.84,331.9L432.75,324.94L442,318.43L451.55,312.38L461.39,306.81L471.49,301.72L481.83,297.14L492.38,293.07L503.12,289.52L514.02,286.5L525.05,284.03L536.19,282.09L547.42,280.71L558.69,279.88L570,279.6L570,510Z","cx":511.84,"cy":352.68,"box":{"x":459.68,"y":314.68,"w":104.32,"h":76},"labelT":0.48},{"d":"M90,510L90.26,494.29L91.03,478.61L92.31,462.95L94.11,447.35L96.41,431.81L99.22,416.36L102.54,401L106.36,385.77L110.67,370.66L115.47,355.71L120.77,340.92L126.54,326.31L132.79,311.9L139.5,297.7L146.68,283.73L154.31,270L370.47,394.8L366.81,401.39L363.36,408.1L360.14,414.91L357.14,421.83L354.37,428.84L351.83,435.94L349.52,443.12L347.45,450.37L345.62,457.68L344.03,465.05L342.68,472.47L341.57,479.93L340.71,487.42L340.09,494.93L339.72,502.46L339.6,510Z","cx":224.27,"cy":431.42,"box":{"x":112.74,"y":387.42,"w":223.05,"h":88},"labelT":0.576},{"d":"M154.31,270L162.38,256.53L170.89,243.33L179.83,230.41L189.19,217.79L198.95,205.49L209.12,193.51L219.67,181.88L230.59,170.59L241.88,159.67L253.51,149.12L265.49,138.95L277.79,129.19L290.41,119.83L303.33,110.89L316.53,102.38L330,94.31L454.8,310.47L448.33,314.34L442,318.43L435.8,322.72L429.74,327.21L423.84,331.9L418.09,336.78L412.5,341.84L407.08,347.08L401.84,352.5L396.78,358.09L391.9,363.84L387.21,369.74L382.72,375.8L378.43,382L374.34,388.33L370.47,394.8Z","cx":300.37,"cy":252.99,"box":{"x":212.25,"y":208.99,"w":176.23,"h":88},"labelT":0.507},{"d":"M330,94.31L343.73,86.68L357.7,79.5L371.9,72.79L386.31,66.54L400.92,60.77L415.71,55.47L430.66,50.67L445.77,46.36L461,42.54L476.36,39.22L491.81,36.41L507.35,34.11L522.95,32.31L538.61,31.03L554.29,30.26L570,30L570,279.6L562.46,279.72L554.93,280.09L547.42,280.71L539.93,281.57L532.47,282.68L525.05,284.03L517.68,285.62L510.37,287.45L503.12,289.52L495.94,291.83L488.84,294.37L481.83,297.14L474.91,300.14L468.1,303.36L461.39,306.81L454.8,310.47Z","cx":472.32,"cy":124.62,"box":{"x":380.63,"y":80.62,"w":183.37,"h":88},"labelT":0.465},{"d":"M90,510L91.03,478.61L94.11,447.35L99.22,416.36L106.36,385.77L115.47,355.71L126.54,326.31L139.5,297.7L154.31,270L170.89,243.33L189.19,217.79L209.12,193.51L230.59,170.59L253.51,149.12L277.79,129.19L303.33,110.89L330,94.31L357.7,79.5L386.31,66.54L415.71,55.47L445.77,46.36L476.36,39.22L507.35,34.11L538.61,31.03L570,30L90,30Z","cx":200.6,"cy":69,"box":{"x":96,"y":35,"w":209.2,"h":68},"labelT":0.156},{"d":"M570,30L720,30L720,180L570,180Z","cx":645,"cy":105,"box":{"x":577,"y":36,"w":136,"h":138},"labelT":0.5},{"d":"M720,30L870,30L870,180L720,180Z","cx":795,"cy":105,"box":{"x":727,"y":36,"w":136,"h":138},"labelT":0.5},{"d":"M570,180L720,180L720,330L570,330Z","cx":645,"cy":255,"box":{"x":577,"y":186,"w":136,"h":138},"labelT":0.5},{"d":"M720,180L870,180L870,330L720,330Z","cx":795,"cy":255,"box":{"x":727,"y":186,"w":136,"h":138},"labelT":0.5},{"d":"M570,330L720,330L720,510L570,510Z","cx":645,"cy":420,"box":{"x":577,"y":336,"w":136,"h":168},"labelT":0.5},{"d":"M720,330L870,330L870,510L720,510Z","cx":795,"cy":420,"box":{"x":727,"y":336,"w":136,"h":168},"labelT":0.5}],"bounds":{"x":90,"y":30,"width":780,"height":480}}},"roseta":{"wide":{"cells":[{"d":"M582.46,263.49L587.65,267.23L595.4,270.49L605.2,273.77L616.04,277.5L626.59,282L635.44,287.37L641.32,293.47L643.38,300L641.32,306.53L635.44,312.63L626.59,318L616.04,322.5L605.2,326.23L595.4,329.51L587.65,332.77L582.46,336.51L480,300Z","cx":576.23,"cy":300,"box":{"x":525.28,"y":289,"w":101.9,"h":22},"labelT":0.544},{"d":"M582.46,336.51L579.8,341.16L579.1,346.94L579.41,353.81L579.59,361.48L578.55,369.37L575.44,376.78L569.81,382.97L561.69,387.34L551.5,389.5L540,389.41L528.04,387.37L516.45,383.98L505.79,380.05L496.3,376.44L487.85,373.93L480,373.03L480,300Z","cx":525.36,"cy":352.33,"box":{"x":486,"y":335.33,"w":78.73,"h":34},"labelT":0.514},{"d":"M480,373.03L472.15,373.93L463.7,376.44L454.21,380.05L443.55,383.98L431.96,387.37L420,389.41L408.5,389.5L398.31,387.34L390.19,382.97L384.56,376.78L381.45,369.37L380.41,361.48L380.59,353.81L380.9,346.94L380.2,341.16L377.54,336.51L480,300Z","cx":434.64,"cy":352.33,"box":{"x":395.27,"y":335.33,"w":78.73,"h":34},"labelT":0.571},{"d":"M377.54,336.51L372.35,332.77L364.6,329.51L354.8,326.23L343.96,322.5L333.41,318L324.56,312.63L318.68,306.53L316.62,300L318.68,293.47L324.56,287.37L333.41,282L343.96,277.5L354.8,273.77L364.6,270.49L372.35,267.23L377.54,263.49L480,300Z","cx":383.77,"cy":300,"box":{"x":332.82,"y":289,"w":101.9,"h":22},"labelT":0.456},{"d":"M377.54,263.49L380.2,258.84L380.9,253.06L380.59,246.19L380.41,238.52L381.45,230.63L384.56,223.22L390.19,217.03L398.31,212.66L408.5,210.5L420,210.59L431.96,212.63L443.55,216.02L454.21,219.95L463.7,223.56L472.15,226.07L480,226.97L480,300Z","cx":434.64,"cy":247.67,"box":{"x":395.27,"y":230.67,"w":78.73,"h":34},"labelT":0.486},{"d":"M480,226.97L487.85,226.07L496.3,223.56L505.79,219.95L516.45,216.02L528.04,212.63L540,210.59L551.5,210.5L561.69,212.66L569.81,217.03L575.44,223.22L578.55,230.63L579.59,238.52L579.41,246.19L579.1,253.06L579.8,258.84L582.46,263.49L480,300Z","cx":525.36,"cy":247.67,"box":{"x":486,"y":230.67,"w":78.73,"h":34},"labelT":0.429},{"d":"M636.13,244.36L644.03,250.07L655.85,255.04L670.78,260.02L687.3,265.71L703.38,272.57L716.85,280.75L725.82,290.05L728.96,300L725.82,309.95L716.85,319.25L703.38,327.43L687.3,334.29L670.78,339.98L655.85,344.96L644.03,349.93L636.13,355.64L582.46,336.51L587.65,332.77L595.4,329.51L605.2,326.23L616.04,322.5L626.59,318L635.44,312.63L641.32,306.53L643.38,300L641.32,293.47L635.44,287.37L626.59,282L616.04,277.5L605.2,273.77L595.4,270.49L587.65,267.23L582.46,263.49Z","cx":679.5,"cy":300,"box":{"x":649.38,"y":283,"w":60.24,"h":34},"labelT":0.581},{"d":"M636.13,355.64L632.07,362.72L631,371.52L631.48,382L631.76,393.68L630.17,405.7L625.43,416.99L616.86,426.44L604.48,433.09L588.95,436.38L571.42,436.24L553.21,433.13L535.55,427.97L519.31,421.98L504.84,416.49L491.96,412.65L480,411.28L480,373.03L487.85,373.93L496.3,376.44L505.79,380.05L516.45,383.98L528.04,387.37L540,389.41L551.5,389.5L561.69,387.34L569.81,382.97L575.44,376.78L578.55,369.37L579.59,361.48L579.41,353.81L579.1,346.94L579.8,341.16L582.46,336.51Z","cx":568.61,"cy":406.24,"box":{"x":520.73,"y":395.24,"w":95.75,"h":22},"labelT":0.633},{"d":"M480,411.28L468.04,412.65L455.16,416.49L440.69,421.98L424.45,427.97L406.79,433.13L388.58,436.24L371.05,436.38L355.52,433.09L343.14,426.44L334.57,416.99L329.83,405.7L328.24,393.68L328.52,382L329,371.52L327.93,362.72L323.87,355.64L377.54,336.51L380.2,341.16L380.9,346.94L380.59,353.81L380.41,361.48L381.45,369.37L384.56,376.78L390.19,382.97L398.31,387.34L408.5,389.5L420,389.41L431.96,387.37L443.55,383.98L454.21,380.05L463.7,376.44L472.15,373.93L480,373.03Z","cx":391.39,"cy":406.24,"box":{"x":343.52,"y":395.24,"w":95.75,"h":22},"labelT":0.565},{"d":"M323.87,355.64L315.97,349.93L304.15,344.96L289.22,339.98L272.7,334.29L256.62,327.43L243.15,319.25L234.18,309.95L231.04,300L234.18,290.05L243.15,280.75L256.62,272.57L272.7,265.71L289.22,260.02L304.15,255.04L315.97,250.07L323.87,244.36L377.54,263.49L372.35,267.23L364.6,270.49L354.8,273.77L343.96,277.5L333.41,282L324.56,287.37L318.68,293.47L316.62,300L318.68,306.53L324.56,312.63L333.41,318L343.96,322.5L354.8,326.23L364.6,329.51L372.35,332.77L377.54,336.51Z","cx":280.5,"cy":300,"box":{"x":250.38,"y":283,"w":60.24,"h":34},"labelT":0.419},{"d":"M323.87,244.36L327.93,237.28L329,228.48L328.52,218L328.24,206.32L329.83,194.3L334.57,183.01L343.14,173.56L355.52,166.91L371.05,163.62L388.58,163.76L406.79,166.87L424.45,172.03L440.69,178.02L455.16,183.51L468.04,187.35L480,188.72L480,226.97L472.15,226.07L463.7,223.56L454.21,219.95L443.55,216.02L431.96,212.63L420,210.59L408.5,210.5L398.31,212.66L390.19,217.03L384.56,223.22L381.45,230.63L380.41,238.52L380.59,246.19L380.9,253.06L380.2,258.84L377.54,263.49Z","cx":391.39,"cy":193.76,"box":{"x":343.52,"y":182.76,"w":95.75,"h":22},"labelT":0.367},{"d":"M480,188.72L491.96,187.35L504.84,183.51L519.31,178.02L535.55,172.03L553.21,166.87L571.42,163.76L588.95,163.62L604.48,166.91L616.86,173.56L625.43,183.01L630.17,194.3L631.76,206.32L631.48,218L631,228.48L632.07,237.28L636.13,244.36L582.46,263.49L579.8,258.84L579.1,253.06L579.41,246.19L579.59,238.52L578.55,230.63L575.44,223.22L569.81,217.03L561.69,212.66L551.5,210.5L540,210.59L528.04,212.63L516.45,216.02L505.79,219.95L496.3,223.56L487.85,226.07L480,226.97Z","cx":568.61,"cy":193.76,"box":{"x":520.73,"y":182.76,"w":95.75,"h":22},"labelT":0.435},{"d":"M680.04,228.71L690.17,236.02L705.31,242.39L724.44,248.78L745.61,256.07L766.21,264.86L783.47,275.34L794.95,287.26L798.98,300L794.95,312.74L783.47,324.66L766.21,335.14L745.61,343.93L724.44,351.22L705.31,357.61L690.17,363.98L680.04,371.29L636.13,355.64L644.03,349.93L655.85,344.96L670.78,339.98L687.3,334.29L703.38,327.43L716.85,319.25L725.82,309.95L728.96,300L725.82,290.05L716.85,280.75L703.38,272.57L687.3,265.71L670.78,260.02L655.85,255.04L644.03,250.07L636.13,244.36Z","cx":757.01,"cy":300,"box":{"x":734.96,"y":280,"w":44.11,"h":40},"labelT":0.621},{"d":"M680.04,371.29L674.84,380.36L673.47,391.64L674.08,405.06L674.44,420.02L672.41,435.43L666.34,449.9L655.35,462L639.49,470.52L619.6,474.74L597.14,474.56L573.8,470.57L551.17,463.96L530.36,456.29L511.83,449.25L495.33,444.34L480,442.58L480,411.28L491.96,412.65L504.84,416.49L519.31,421.98L535.55,427.97L553.21,433.13L571.42,436.24L588.95,436.38L604.48,433.09L616.86,426.44L625.43,416.99L630.17,405.7L631.76,393.68L631.48,382L631,371.52L632.07,362.72L636.13,355.64Z","cx":602.62,"cy":451.48,"box":{"x":562.38,"y":440.48,"w":80.48,"h":22},"labelT":0.709},{"d":"M480,442.58L464.67,444.34L448.17,449.25L429.64,456.29L408.83,463.96L386.2,470.57L362.86,474.56L340.4,474.74L320.51,470.52L304.65,462L293.66,449.9L287.59,435.43L285.56,420.02L285.92,405.06L286.53,391.64L285.16,380.36L279.96,371.29L323.87,355.64L327.93,362.72L329,371.52L328.52,382L328.24,393.68L329.83,405.7L334.57,416.99L343.14,426.44L355.52,433.09L371.05,436.38L388.58,436.24L406.79,433.13L424.45,427.97L440.69,421.98L455.16,416.49L468.04,412.65L480,411.28Z","cx":357.38,"cy":451.48,"box":{"x":317.13,"y":440.48,"w":80.48,"h":22},"labelT":0.596},{"d":"M279.96,371.29L269.83,363.98L254.69,357.61L235.56,351.22L214.39,343.93L193.79,335.14L176.53,324.66L165.05,312.74L161.02,300L165.05,287.26L176.53,275.34L193.79,264.86L214.39,256.07L235.56,248.78L254.69,242.39L269.83,236.02L279.96,228.71L323.87,244.36L315.97,250.07L304.15,255.04L289.22,260.02L272.7,265.71L256.62,272.57L243.15,280.75L234.18,290.05L231.04,300L234.18,309.95L243.15,319.25L256.62,327.43L272.7,334.29L289.22,339.98L304.15,344.96L315.97,349.93L323.87,355.64Z","cx":202.99,"cy":300,"box":{"x":180.93,"y":280,"w":44.11,"h":40},"labelT":0.379},{"d":"M279.96,228.71L285.16,219.64L286.53,208.36L285.92,194.94L285.56,179.98L287.59,164.57L293.66,150.1L304.65,138L320.51,129.48L340.4,125.26L362.86,125.44L386.2,129.43L408.83,136.04L429.64,143.71L448.17,150.75L464.67,155.66L480,157.42L480,188.72L468.04,187.35L455.16,183.51L440.69,178.02L424.45,172.03L406.79,166.87L388.58,163.76L371.05,163.62L355.52,166.91L343.14,173.56L334.57,183.01L329.83,194.3L328.24,206.32L328.52,218L329,228.48L327.93,237.28L323.87,244.36Z","cx":357.38,"cy":148.52,"box":{"x":317.13,"y":137.52,"w":80.48,"h":22},"labelT":0.291},{"d":"M480,157.42L495.33,155.66L511.83,150.75L530.36,143.71L551.17,136.04L573.8,129.43L597.14,125.44L619.6,125.26L639.49,129.48L655.35,138L666.34,150.1L672.41,164.57L674.44,179.98L674.08,194.94L673.47,208.36L674.84,219.64L680.04,228.71L636.13,244.36L632.07,237.28L631,228.48L631.48,218L631.76,206.32L630.17,194.3L625.43,183.01L616.86,173.56L604.48,166.91L588.95,163.62L571.42,163.76L553.21,166.87L535.55,172.03L519.31,178.02L504.84,183.51L491.96,187.35L480,188.72Z","cx":602.62,"cy":148.52,"box":{"x":562.38,"y":137.52,"w":80.48,"h":22},"labelT":0.404},{"d":"M723.95,213.06L736.3,221.98L754.76,229.75L778.1,237.54L803.91,246.42L829.03,257.14L850.09,269.92L864.09,284.46L868.99,300L864.09,315.54L850.09,330.08L829.03,342.86L803.91,353.58L778.1,362.46L754.76,370.25L736.3,378.02L723.95,386.94L680.04,371.29L690.17,363.98L705.31,357.61L724.44,351.22L745.61,343.93L766.21,335.14L783.47,324.66L794.95,312.74L798.98,300L794.95,287.26L783.47,275.34L766.21,264.86L745.61,256.07L724.44,248.78L705.31,242.39L690.17,236.02L680.04,228.71Z","cx":826.01,"cy":300,"box":{"x":804.98,"y":276,"w":42.07,"h":48},"labelT":0.636},{"d":"M723.95,386.94L717.61,398L715.94,411.76L716.68,428.13L717.12,446.37L714.64,465.16L707.24,482.8L693.84,497.56L674.5,507.95L650.24,513.1L622.85,512.88L594.39,508.02L566.79,499.95L541.42,490.59L518.82,482.01L498.69,476.02L480,473.88L480,442.58L495.33,444.34L511.83,449.25L530.36,456.29L551.17,463.96L573.8,470.57L597.14,474.56L619.6,474.74L639.49,470.52L655.35,462L666.34,449.9L672.41,435.43L674.44,420.02L674.08,405.06L673.47,391.64L674.84,380.36L680.04,371.29Z","cx":633.22,"cy":492.52,"box":{"x":595.28,"y":481.52,"w":75.88,"h":22},"labelT":0.741},{"d":"M480,473.88L461.31,476.02L441.18,482.01L418.58,490.59L393.21,499.95L365.61,508.02L337.15,512.88L309.76,513.1L285.5,507.95L266.16,497.56L252.76,482.8L245.36,465.16L242.88,446.37L243.32,428.13L244.06,411.76L242.39,398L236.05,386.94L279.96,371.29L285.16,380.36L286.53,391.64L285.92,405.06L285.56,420.02L287.59,435.43L293.66,449.9L304.65,462L320.51,470.52L340.4,474.74L362.86,474.56L386.2,470.57L408.83,463.96L429.64,456.29L448.17,449.25L464.67,444.34L480,442.58Z","cx":326.78,"cy":492.52,"box":{"x":288.84,"y":481.52,"w":75.88,"h":22},"labelT":0.613},{"d":"M236.05,386.94L223.7,378.02L205.24,370.25L181.9,362.46L156.09,353.58L130.97,342.86L109.91,330.08L95.91,315.54L91.01,300L95.91,284.46L109.91,269.92L130.97,257.14L156.09,246.42L181.9,237.54L205.24,229.75L223.7,221.98L236.05,213.06L279.96,228.71L269.83,236.02L254.69,242.39L235.56,248.78L214.39,256.07L193.79,264.86L176.53,275.34L165.05,287.26L161.02,300L165.05,312.74L176.53,324.66L193.79,335.14L214.39,343.93L235.56,351.22L254.69,357.61L269.83,363.98L279.96,371.29Z","cx":133.99,"cy":300,"box":{"x":112.95,"y":276,"w":42.07,"h":48},"labelT":0.364},{"d":"M236.05,213.06L242.39,202L244.06,188.24L243.32,171.87L242.88,153.63L245.36,134.84L252.76,117.2L266.16,102.44L285.5,92.05L309.76,86.9L337.15,87.12L365.61,91.98L393.21,100.05L418.58,109.41L441.18,117.99L461.31,123.98L480,126.12L480,157.42L464.67,155.66L448.17,150.75L429.64,143.71L408.83,136.04L386.2,129.43L362.86,125.44L340.4,125.26L320.51,129.48L304.65,138L293.66,150.1L287.59,164.57L285.56,179.98L285.92,194.94L286.53,208.36L285.16,219.64L279.96,228.71Z","cx":326.78,"cy":107.48,"box":{"x":288.84,"y":96.48,"w":75.88,"h":22},"labelT":0.259},{"d":"M480,126.12L498.69,123.98L518.82,117.99L541.42,109.41L566.79,100.05L594.39,91.98L622.85,87.12L650.24,86.9L674.5,92.05L693.84,102.44L707.24,117.2L714.64,134.84L717.12,153.63L716.68,171.87L715.94,188.24L717.61,202L723.95,213.06L680.04,228.71L674.84,219.64L673.47,208.36L674.08,194.94L674.44,179.98L672.41,164.57L666.34,150.1L655.35,138L639.49,129.48L619.6,125.26L597.14,125.44L573.8,129.43L551.17,136.04L530.36,143.71L511.83,150.75L495.33,155.66L480,157.42Z","cx":633.22,"cy":107.48,"box":{"x":595.28,"y":96.48,"w":75.88,"h":22},"labelT":0.387}],"bounds":{"x":91.01,"y":86.9,"width":777.99,"height":426.19}},"compact":{"cells":[{"d":"M616.61,251.31L623.53,256.31L633.87,260.66L646.94,265.02L661.39,270L675.46,276L687.25,283.16L695.09,291.3L697.84,300L695.09,308.7L687.25,316.84L675.46,324L661.39,330L646.94,334.98L633.87,339.34L623.53,343.69L616.61,348.69L480,300Z","cx":612.56,"cy":300,"box":{"x":567.37,"y":274,"w":90.37,"h":52},"labelT":0.554},{"d":"M616.61,348.69L613.06,354.88L612.13,362.58L612.54,371.75L612.79,381.97L611.4,392.49L607.25,402.37L599.75,410.63L588.92,416.45L575.34,419.33L559.99,419.21L544.06,416.49L528.6,411.97L514.39,406.73L501.74,401.93L490.47,398.57L480,397.37L480,300Z","cx":533.08,"cy":366.83,"box":{"x":486,"y":340.83,"w":94.16,"h":52},"labelT":0.474},{"d":"M480,397.37L469.53,398.57L458.26,401.93L445.61,406.73L431.4,411.97L415.94,416.49L400.01,419.21L384.66,419.33L371.08,416.45L360.25,410.63L352.75,402.37L348.6,392.49L347.21,381.97L347.46,371.75L347.87,362.58L346.94,354.88L343.39,348.69L480,300Z","cx":426.92,"cy":366.83,"box":{"x":379.84,"y":340.83,"w":94.16,"h":52},"labelT":0.586},{"d":"M343.39,348.69L336.47,343.69L326.13,339.34L313.06,334.98L298.61,330L284.54,324L272.75,316.84L264.91,308.7L262.16,300L264.91,291.3L272.75,283.16L284.54,276L298.61,270L313.06,265.02L326.13,260.66L336.47,256.31L343.39,251.31L480,300Z","cx":347.44,"cy":300,"box":{"x":302.26,"y":274,"w":90.37,"h":52},"labelT":0.446},{"d":"M343.39,251.31L346.94,245.12L347.87,237.42L347.46,228.25L347.21,218.03L348.6,207.51L352.75,197.63L360.25,189.37L371.08,183.55L384.66,180.67L400.01,180.79L415.94,183.51L431.4,188.03L445.61,193.27L458.26,198.07L469.53,201.43L480,202.63L480,300Z","cx":426.92,"cy":233.17,"box":{"x":379.84,"y":207.17,"w":94.16,"h":52},"labelT":0.526},{"d":"M480,202.63L490.47,201.43L501.74,198.07L514.39,193.27L528.6,188.03L544.06,183.51L559.99,180.79L575.34,180.67L588.92,183.55L599.75,189.37L607.25,197.63L611.4,207.51L612.79,218.03L612.54,228.25L612.13,237.42L613.06,245.12L616.61,251.31L480,300Z","cx":533.08,"cy":233.17,"box":{"x":486,"y":207.17,"w":94.16,"h":52},"labelT":0.414},{"d":"M723.95,213.06L736.3,221.98L754.76,229.75L778.1,237.54L803.91,246.42L829.03,257.14L850.09,269.92L864.09,284.46L868.99,300L864.09,315.54L850.09,330.08L829.03,342.86L803.91,353.58L778.1,362.46L754.76,370.25L736.3,378.02L723.95,386.94L616.61,348.69L623.53,343.69L633.87,339.34L646.94,334.98L661.39,330L675.46,324L687.25,316.84L695.09,308.7L697.84,300L695.09,291.3L687.25,283.16L675.46,276L661.39,270L646.94,265.02L633.87,260.66L623.53,256.31L616.61,251.31Z","cx":764.96,"cy":300,"box":{"x":703.84,"y":262,"w":122.26,"h":76},"labelT":0.544},{"d":"M723.95,386.94L717.61,398L715.94,411.76L716.68,428.13L717.12,446.37L714.64,465.16L707.24,482.8L693.84,497.56L674.5,507.95L650.24,513.1L622.85,512.88L594.39,508.02L566.79,499.95L541.42,490.59L518.82,482.01L498.69,476.02L480,473.88L480,397.37L490.47,398.57L501.74,401.93L514.39,406.73L528.6,411.97L544.06,416.49L559.99,419.21L575.34,419.33L588.92,416.45L599.75,410.63L607.25,402.37L611.4,392.49L612.79,381.97L612.54,371.75L612.13,362.58L613.06,354.88L616.61,348.69Z","cx":612.04,"cy":452.23,"box":{"x":522.18,"y":426.23,"w":179.72,"h":52},"labelT":0.586},{"d":"M480,473.88L461.31,476.02L441.18,482.01L418.58,490.59L393.21,499.95L365.61,508.02L337.15,512.88L309.76,513.1L285.5,507.95L266.16,497.56L252.76,482.8L245.36,465.16L242.88,446.37L243.32,428.13L244.06,411.76L242.39,398L236.05,386.94L343.39,348.69L346.94,354.88L347.87,362.58L347.46,371.75L347.21,381.97L348.6,392.49L352.75,402.37L360.25,410.63L371.08,416.45L384.66,419.33L400.01,419.21L415.94,416.49L431.4,411.97L445.61,406.73L458.26,401.93L469.53,398.57L480,397.37Z","cx":347.96,"cy":452.23,"box":{"x":258.1,"y":426.23,"w":179.72,"h":52},"labelT":0.544},{"d":"M236.05,386.94L223.7,378.02L205.24,370.25L181.9,362.46L156.09,353.58L130.97,342.86L109.91,330.08L95.91,315.54L91.01,300L95.91,284.46L109.91,269.92L130.97,257.14L156.09,246.42L181.9,237.54L205.24,229.75L223.7,221.98L236.05,213.06L343.39,251.31L336.47,256.31L326.13,260.66L313.06,265.02L298.61,270L284.54,276L272.75,283.16L264.91,291.3L262.16,300L264.91,308.7L272.75,316.84L284.54,324L298.61,330L313.06,334.98L326.13,339.34L336.47,343.69L343.39,348.69Z","cx":195.04,"cy":300,"box":{"x":133.91,"y":262,"w":122.26,"h":76},"labelT":0.456},{"d":"M236.05,213.06L242.39,202L244.06,188.24L243.32,171.87L242.88,153.63L245.36,134.84L252.76,117.2L266.16,102.44L285.5,92.05L309.76,86.9L337.15,87.12L365.61,91.98L393.21,100.05L418.58,109.41L441.18,117.99L461.31,123.98L480,126.12L480,202.63L469.53,201.43L458.26,198.07L445.61,193.27L431.4,188.03L415.94,183.51L400.01,180.79L384.66,180.67L371.08,183.55L360.25,189.37L352.75,197.63L348.6,207.51L347.21,218.03L347.46,228.25L347.87,237.42L346.94,245.12L343.39,251.31Z","cx":347.96,"cy":147.77,"box":{"x":258.1,"y":121.77,"w":179.72,"h":52},"labelT":0.414},{"d":"M480,126.12L498.69,123.98L518.82,117.99L541.42,109.41L566.79,100.05L594.39,91.98L622.85,87.12L650.24,86.9L674.5,92.05L693.84,102.44L707.24,117.2L714.64,134.84L717.12,153.63L716.68,171.87L715.94,188.24L717.61,202L723.95,213.06L616.61,251.31L613.06,245.12L612.13,237.42L612.54,228.25L612.79,218.03L611.4,207.51L607.25,197.63L599.75,189.37L588.92,183.55L575.34,180.67L559.99,180.79L544.06,183.51L528.6,188.03L514.39,193.27L501.74,198.07L490.47,201.43L480,202.63Z","cx":612.04,"cy":147.77,"box":{"x":522.18,"y":121.77,"w":179.72,"h":52},"labelT":0.456}],"bounds":{"x":91.01,"y":86.9,"width":777.99,"height":426.19}}},"prisma":{"wide":{"cells":[{"d":"M480,300L614,300L547,379.1L413,379.1Z","cx":513.5,"cy":339.55,"box":{"x":475.37,"y":315.55,"w":76.26,"h":48},"labelT":0.5},{"d":"M413,379.1L547,379.1L480,458.19L346,458.19Z","cx":446.5,"cy":418.65,"box":{"x":408.37,"y":394.65,"w":76.26,"h":48},"labelT":0.5},{"d":"M346,458.19L480,458.19L413,537.29L279,537.29Z","cx":379.5,"cy":497.74,"box":{"x":341.37,"y":473.74,"w":76.26,"h":48},"labelT":0.5},{"d":"M614,300L748,300L681,379.1L547,379.1Z","cx":647.5,"cy":339.55,"box":{"x":609.37,"y":315.55,"w":76.26,"h":48},"labelT":0.5},{"d":"M547,379.1L681,379.1L614,458.19L480,458.19Z","cx":580.5,"cy":418.65,"box":{"x":542.37,"y":394.65,"w":76.26,"h":48},"labelT":0.5},{"d":"M480,458.19L614,458.19L547,537.29L413,537.29Z","cx":513.5,"cy":497.74,"box":{"x":475.37,"y":473.74,"w":76.26,"h":48},"labelT":0.5},{"d":"M748,300L882,300L815,379.1L681,379.1Z","cx":781.5,"cy":339.55,"box":{"x":743.37,"y":315.55,"w":76.26,"h":48},"labelT":0.5},{"d":"M681,379.1L815,379.1L748,458.19L614,458.19Z","cx":714.5,"cy":418.65,"box":{"x":676.37,"y":394.65,"w":76.26,"h":48},"labelT":0.5},{"d":"M614,458.19L748,458.19L681,537.29L547,537.29Z","cx":647.5,"cy":497.74,"box":{"x":609.37,"y":473.74,"w":76.26,"h":48},"labelT":0.5},{"d":"M480,300L413,379.1L346,300L413,220.9Z","cx":413,"cy":300,"box":{"x":374.87,"y":276,"w":76.26,"h":48},"labelT":0.5},{"d":"M413,220.9L346,300L279,220.9L346,141.81Z","cx":346,"cy":220.9,"box":{"x":307.87,"y":196.9,"w":76.26,"h":48},"labelT":0.5},{"d":"M346,141.81L279,220.9L212,141.81L279,62.71Z","cx":279,"cy":141.81,"box":{"x":240.87,"y":117.81,"w":76.26,"h":48},"labelT":0.5},{"d":"M413,379.1L346,458.19L279,379.1L346,300Z","cx":346,"cy":379.1,"box":{"x":307.87,"y":355.1,"w":76.26,"h":48},"labelT":0.5},{"d":"M346,300L279,379.1L212,300L279,220.9Z","cx":279,"cy":300,"box":{"x":240.87,"y":276,"w":76.26,"h":48},"labelT":0.5},{"d":"M279,220.9L212,300L145,220.9L212,141.81Z","cx":212,"cy":220.9,"box":{"x":173.87,"y":196.9,"w":76.26,"h":48},"labelT":0.5},{"d":"M346,458.19L279,537.29L212,458.19L279,379.1Z","cx":279,"cy":458.19,"box":{"x":240.87,"y":434.19,"w":76.26,"h":48},"labelT":0.5},{"d":"M279,379.1L212,458.19L145,379.1L212,300Z","cx":212,"cy":379.1,"box":{"x":173.87,"y":355.1,"w":76.26,"h":48},"labelT":0.5},{"d":"M212,300L145,379.1L78,300L145,220.9Z","cx":145,"cy":300,"box":{"x":106.87,"y":276,"w":76.26,"h":48},"labelT":0.5},{"d":"M480,300L413,220.9L547,220.9L614,300Z","cx":513.5,"cy":260.45,"box":{"x":475.37,"y":236.45,"w":76.26,"h":48},"labelT":0.5},{"d":"M614,300L547,220.9L681,220.9L748,300Z","cx":647.5,"cy":260.45,"box":{"x":609.37,"y":236.45,"w":76.26,"h":48},"labelT":0.5},{"d":"M748,300L681,220.9L815,220.9L882,300Z","cx":781.5,"cy":260.45,"box":{"x":743.37,"y":236.45,"w":76.26,"h":48},"labelT":0.5},{"d":"M413,220.9L346,141.81L480,141.81L547,220.9Z","cx":446.5,"cy":181.35,"box":{"x":408.37,"y":157.35,"w":76.26,"h":48},"labelT":0.5},{"d":"M547,220.9L480,141.81L614,141.81L681,220.9Z","cx":580.5,"cy":181.35,"box":{"x":542.37,"y":157.35,"w":76.26,"h":48},"labelT":0.5},{"d":"M681,220.9L614,141.81L748,141.81L815,220.9Z","cx":714.5,"cy":181.35,"box":{"x":676.37,"y":157.35,"w":76.26,"h":48},"labelT":0.5},{"d":"M346,141.81L279,62.71L413,62.71L480,141.81Z","cx":379.5,"cy":102.26,"box":{"x":341.37,"y":78.26,"w":76.26,"h":48},"labelT":0.5},{"d":"M480,141.81L413,62.71L547,62.71L614,141.81Z","cx":513.5,"cy":102.26,"box":{"x":475.37,"y":78.26,"w":76.26,"h":48},"labelT":0.5},{"d":"M614,141.81L547,62.71L681,62.71L748,141.81Z","cx":647.5,"cy":102.26,"box":{"x":609.37,"y":78.26,"w":76.26,"h":48},"labelT":0.5}],"bounds":{"x":78,"y":62.71,"width":804,"height":474.58}},"compact":{"cells":[{"d":"M480,300L681,300L580.5,418.65L379.5,418.65Z","cx":530.25,"cy":359.32,"box":{"x":470.48,"y":321.32,"w":119.54,"h":76},"labelT":0.5},{"d":"M379.5,418.65L580.5,418.65L480,537.29L279,537.29Z","cx":429.75,"cy":477.97,"box":{"x":369.98,"y":439.97,"w":119.54,"h":76},"labelT":0.5},{"d":"M681,300L882,300L781.5,418.65L580.5,418.65Z","cx":731.25,"cy":359.32,"box":{"x":671.48,"y":321.32,"w":119.54,"h":76},"labelT":0.5},{"d":"M580.5,418.65L781.5,418.65L681,537.29L480,537.29Z","cx":630.75,"cy":477.97,"box":{"x":570.98,"y":439.97,"w":119.54,"h":76},"labelT":0.5},{"d":"M480,300L379.5,418.65L279,300L379.5,181.35Z","cx":379.5,"cy":300,"box":{"x":319.73,"y":262,"w":119.54,"h":76},"labelT":0.5},{"d":"M379.5,181.35L279,300L178.5,181.35L279,62.71Z","cx":279,"cy":181.35,"box":{"x":219.23,"y":143.35,"w":119.54,"h":76},"labelT":0.5},{"d":"M379.5,418.65L279,537.29L178.5,418.65L279,300Z","cx":279,"cy":418.65,"box":{"x":219.23,"y":380.65,"w":119.54,"h":76},"labelT":0.5},{"d":"M279,300L178.5,418.65L78,300L178.5,181.35Z","cx":178.5,"cy":300,"box":{"x":118.73,"y":262,"w":119.54,"h":76},"labelT":0.5},{"d":"M480,300L379.5,181.35L580.5,181.35L681,300Z","cx":530.25,"cy":240.68,"box":{"x":470.48,"y":202.68,"w":119.54,"h":76},"labelT":0.5},{"d":"M681,300L580.5,181.35L781.5,181.35L882,300Z","cx":731.25,"cy":240.68,"box":{"x":671.48,"y":202.68,"w":119.54,"h":76},"labelT":0.5},{"d":"M379.5,181.35L279,62.71L480,62.71L580.5,181.35Z","cx":429.75,"cy":122.03,"box":{"x":369.98,"y":84.03,"w":119.54,"h":76},"labelT":0.5},{"d":"M580.5,181.35L480,62.71L681,62.71L781.5,181.35Z","cx":630.75,"cy":122.03,"box":{"x":570.98,"y":84.03,"w":119.54,"h":76},"labelT":0.5}],"bounds":{"x":78,"y":62.71,"width":804,"height":474.58}}},"orbitas":{"wide":{"cells":[{"d":"M480.00,50.00L396.00,150.00L564.00,150.00Z","cx":480.0,"cy":125.0,"box":{"x":442.0,"y":105.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M396.00,150.00L312.00,250.00L480.00,250.00Z","cx":396.0,"cy":225.0,"box":{"x":358.0,"y":205.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M396.00,150.00L564.00,150.00L480.00,250.00Z","cx":480.0,"cy":175.0,"box":{"x":442.0,"y":155.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M564.00,150.00L480.00,250.00L648.00,250.00Z","cx":564.0,"cy":225.0,"box":{"x":526.0,"y":205.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M312.00,250.00L228.00,350.00L396.00,350.00Z","cx":312.0,"cy":325.0,"box":{"x":274.0,"y":305.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M312.00,250.00L480.00,250.00L396.00,350.00Z","cx":396.0,"cy":275.0,"box":{"x":358.0,"y":255.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M480.00,250.00L396.00,350.00L564.00,350.00Z","cx":480.0,"cy":325.0,"box":{"x":442.0,"y":305.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M480.00,250.00L648.00,250.00L564.00,350.00Z","cx":564.0,"cy":275.0,"box":{"x":526.0,"y":255.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M648.00,250.00L564.00,350.00L732.00,350.00Z","cx":648.0,"cy":325.0,"box":{"x":610.0,"y":305.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M228.00,350.00L144.00,450.00L312.00,450.00Z","cx":228.0,"cy":425.0,"box":{"x":190.0,"y":405.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M228.00,350.00L396.00,350.00L312.00,450.00Z","cx":312.0,"cy":375.0,"box":{"x":274.0,"y":355.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M396.00,350.00L312.00,450.00L480.00,450.00Z","cx":396.0,"cy":425.0,"box":{"x":358.0,"y":405.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M396.00,350.00L564.00,350.00L480.00,450.00Z","cx":480.0,"cy":375.0,"box":{"x":442.0,"y":355.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M564.00,350.00L480.00,450.00L648.00,450.00Z","cx":564.0,"cy":425.0,"box":{"x":526.0,"y":405.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M564.00,350.00L732.00,350.00L648.00,450.00Z","cx":648.0,"cy":375.0,"box":{"x":610.0,"y":355.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M732.00,350.00L648.00,450.00L816.00,450.00Z","cx":732.0,"cy":425.0,"box":{"x":694.0,"y":405.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M144.00,450.00L60.00,550.00L228.00,550.00Z","cx":144.0,"cy":525.0,"box":{"x":106.0,"y":505.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M144.00,450.00L312.00,450.00L228.00,550.00Z","cx":228.0,"cy":475.0,"box":{"x":190.0,"y":455.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M312.00,450.00L228.00,550.00L396.00,550.00Z","cx":312.0,"cy":525.0,"box":{"x":274.0,"y":505.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M312.00,450.00L480.00,450.00L396.00,550.00Z","cx":396.0,"cy":475.0,"box":{"x":358.0,"y":455.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M480.00,450.00L396.00,550.00L564.00,550.00Z","cx":480.0,"cy":525.0,"box":{"x":442.0,"y":505.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M480.00,450.00L648.00,450.00L564.00,550.00Z","cx":564.0,"cy":475.0,"box":{"x":526.0,"y":455.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M648.00,450.00L564.00,550.00L732.00,550.00Z","cx":648.0,"cy":525.0,"box":{"x":610.0,"y":505.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M648.00,450.00L816.00,450.00L732.00,550.00Z","cx":732.0,"cy":475.0,"box":{"x":694.0,"y":455.5,"w":76.0,"h":39.0},"labelT":0.5},{"d":"M816.00,450.00L732.00,550.00L900.00,550.00Z","cx":816.0,"cy":525.0,"box":{"x":778.0,"y":505.5,"w":76.0,"h":39.0},"labelT":0.5}],"bounds":{"x":60.0,"y":50.0,"width":840.0,"height":500.0}},"compact":{"cells":[{"d":"M480.00,50.00L340.00,216.67L620.00,216.67Z","cx":480.0,"cy":175.0,"box":{"x":414.0,"y":140.5,"w":132.0,"h":69.0},"labelT":0.5},{"d":"M340.00,216.67L200.00,383.33L480.00,383.33Z","cx":340.0,"cy":341.67,"box":{"x":274.0,"y":307.17,"w":132.0,"h":69.0},"labelT":0.5},{"d":"M340.00,216.67L620.00,216.67L480.00,383.33Z","cx":480.0,"cy":258.33,"box":{"x":414.0,"y":223.83,"w":132.0,"h":69.0},"labelT":0.5},{"d":"M620.00,216.67L480.00,383.33L760.00,383.33Z","cx":620.0,"cy":341.67,"box":{"x":554.0,"y":307.17,"w":132.0,"h":69.0},"labelT":0.5},{"d":"M200.00,383.33L60.00,550.00L340.00,550.00Z","cx":200.0,"cy":508.33,"box":{"x":134.0,"y":473.83,"w":132.0,"h":69.0},"labelT":0.5},{"d":"M200.00,383.33L480.00,383.33L340.00,550.00Z","cx":340.0,"cy":416.66,"box":{"x":260.0,"y":386.33,"w":160.0,"h":60.67},"labelT":0.5},{"d":"M480.00,383.33L340.00,550.00L620.00,550.00Z","cx":480.0,"cy":508.33,"box":{"x":414.0,"y":473.83,"w":132.0,"h":69.0},"labelT":0.5},{"d":"M480.00,383.33L760.00,383.33L620.00,550.00Z","cx":620.0,"cy":425.0,"box":{"x":554.0,"y":390.5,"w":132.0,"h":69.0},"labelT":0.5},{"d":"M760.00,383.33L620.00,550.00L900.00,550.00Z","cx":760.0,"cy":508.33,"box":{"x":694.0,"y":473.83,"w":132.0,"h":69.0},"labelT":0.5}],"bounds":{"x":60.0,"y":50.0,"width":840.0,"height":500.0}}},"pliegues":{"wide":{"cells":[{"d":"M90.00,70.00L220.00,110.00L220.00,215.00L90.00,175.00Z","cx":155.0,"cy":142.5,"box":{"x":100.5,"y":112.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M220.00,110.00L350.00,70.00L350.00,175.00L220.00,215.00Z","cx":285.0,"cy":142.5,"box":{"x":230.5,"y":112.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M350.00,70.00L480.00,110.00L480.00,215.00L350.00,175.00Z","cx":415.0,"cy":142.5,"box":{"x":360.5,"y":112.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M480.00,110.00L610.00,70.00L610.00,175.00L480.00,215.00Z","cx":545.0,"cy":142.5,"box":{"x":490.5,"y":112.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M610.00,70.00L740.00,110.00L740.00,215.00L610.00,175.00Z","cx":675.0,"cy":142.5,"box":{"x":620.5,"y":112.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M740.00,110.00L870.00,70.00L870.00,175.00L740.00,215.00Z","cx":805.0,"cy":142.5,"box":{"x":750.5,"y":112.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M90.00,175.00L220.00,215.00L220.00,320.00L90.00,280.00Z","cx":155.0,"cy":247.5,"box":{"x":100.5,"y":217.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M220.00,215.00L350.00,175.00L350.00,280.00L220.00,320.00Z","cx":285.0,"cy":247.5,"box":{"x":230.5,"y":217.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M350.00,175.00L480.00,215.00L480.00,320.00L350.00,280.00Z","cx":415.0,"cy":247.5,"box":{"x":360.5,"y":217.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M480.00,215.00L610.00,175.00L610.00,280.00L480.00,320.00Z","cx":545.0,"cy":247.5,"box":{"x":490.5,"y":217.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M610.00,175.00L740.00,215.00L740.00,320.00L610.00,280.00Z","cx":675.0,"cy":247.5,"box":{"x":620.5,"y":217.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M740.00,215.00L870.00,175.00L870.00,280.00L740.00,320.00Z","cx":805.0,"cy":247.5,"box":{"x":750.5,"y":217.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M90.00,280.00L220.00,320.00L220.00,425.00L90.00,385.00Z","cx":155.0,"cy":352.5,"box":{"x":100.5,"y":322.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M220.00,320.00L350.00,280.00L350.00,385.00L220.00,425.00Z","cx":285.0,"cy":352.5,"box":{"x":230.5,"y":322.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M350.00,280.00L480.00,320.00L480.00,425.00L350.00,385.00Z","cx":415.0,"cy":352.5,"box":{"x":360.5,"y":322.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M480.00,320.00L610.00,280.00L610.00,385.00L480.00,425.00Z","cx":545.0,"cy":352.5,"box":{"x":490.5,"y":322.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M610.00,280.00L740.00,320.00L740.00,425.00L610.00,385.00Z","cx":675.0,"cy":352.5,"box":{"x":620.5,"y":322.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M740.00,320.00L870.00,280.00L870.00,385.00L740.00,425.00Z","cx":805.0,"cy":352.5,"box":{"x":750.5,"y":322.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M90.00,385.00L220.00,425.00L220.00,530.00L90.00,490.00Z","cx":155.0,"cy":457.5,"box":{"x":100.5,"y":427.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M220.00,425.00L350.00,385.00L350.00,490.00L220.00,530.00Z","cx":285.0,"cy":457.5,"box":{"x":230.5,"y":427.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M350.00,385.00L480.00,425.00L480.00,530.00L350.00,490.00Z","cx":415.0,"cy":457.5,"box":{"x":360.5,"y":427.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M480.00,425.00L610.00,385.00L610.00,490.00L480.00,530.00Z","cx":545.0,"cy":457.5,"box":{"x":490.5,"y":427.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M610.00,385.00L740.00,425.00L740.00,530.00L610.00,490.00Z","cx":675.0,"cy":457.5,"box":{"x":620.5,"y":427.88,"w":109.0,"h":59.25},"labelT":0.5},{"d":"M740.00,425.00L870.00,385.00L870.00,490.00L740.00,530.00Z","cx":805.0,"cy":457.5,"box":{"x":750.5,"y":427.88,"w":109.0,"h":59.25},"labelT":0.5}],"bounds":{"x":90.0,"y":70.0,"width":780.0,"height":460.0}},"compact":{"cells":[{"d":"M90.00,70.00L350.00,110.00L350.00,215.00L90.00,175.00Z","cx":220.0,"cy":142.5,"box":{"x":107.0,"y":112.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M350.00,110.00L610.00,70.00L610.00,175.00L350.00,215.00Z","cx":480.0,"cy":142.5,"box":{"x":367.0,"y":112.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M610.00,70.00L870.00,110.00L870.00,215.00L610.00,175.00Z","cx":740.0,"cy":142.5,"box":{"x":627.0,"y":112.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M90.00,175.00L350.00,215.00L350.00,320.00L90.00,280.00Z","cx":220.0,"cy":247.5,"box":{"x":107.0,"y":217.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M350.00,215.00L610.00,175.00L610.00,280.00L350.00,320.00Z","cx":480.0,"cy":247.5,"box":{"x":367.0,"y":217.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M610.00,175.00L870.00,215.00L870.00,320.00L610.00,280.00Z","cx":740.0,"cy":247.5,"box":{"x":627.0,"y":217.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M90.00,280.00L350.00,320.00L350.00,425.00L90.00,385.00Z","cx":220.0,"cy":352.5,"box":{"x":107.0,"y":322.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M350.00,320.00L610.00,280.00L610.00,385.00L350.00,425.00Z","cx":480.0,"cy":352.5,"box":{"x":367.0,"y":322.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M610.00,280.00L870.00,320.00L870.00,425.00L610.00,385.00Z","cx":740.0,"cy":352.5,"box":{"x":627.0,"y":322.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M90.00,385.00L350.00,425.00L350.00,530.00L90.00,490.00Z","cx":220.0,"cy":457.5,"box":{"x":107.0,"y":427.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M350.00,425.00L610.00,385.00L610.00,490.00L350.00,530.00Z","cx":480.0,"cy":457.5,"box":{"x":367.0,"y":427.88,"w":226.0,"h":59.25},"labelT":0.5},{"d":"M610.00,385.00L870.00,425.00L870.00,530.00L610.00,490.00Z","cx":740.0,"cy":457.5,"box":{"x":627.0,"y":427.88,"w":226.0,"h":59.25},"labelT":0.5}],"bounds":{"x":90.0,"y":70.0,"width":780.0,"height":460.0}}},"eclipse":{"wide":{"cells":[{"d":"M521.03,249.51L528.9,254.7L535.88,260.33L541.9,266.34L546.91,272.68L550.86,279.27L553.71,286.07L555.43,293L556,300L555.43,307L553.71,313.93L550.86,320.73L546.91,327.32L541.9,333.66L535.88,339.67L528.9,345.3L521.03,350.49L418,300Z","cx":504.99,"cy":300,"box":{"x":464.81,"y":283,"w":80.35,"h":34},"labelT":0.565},{"d":"M521.03,350.49L512.35,355.19L502.94,359.37L492.88,362.97L482.29,365.96L471.26,368.33L459.89,370.03L448.3,371.06L436.6,371.4L424.9,371.06L413.31,370.03L401.94,368.33L390.91,365.96L380.32,362.97L370.26,359.37L360.85,355.19L352.17,350.49L418,300Z","cx":430.54,"cy":347.19,"box":{"x":381.36,"y":336.19,"w":98.38,"h":22},"labelT":0.563},{"d":"M352.17,350.49L344.3,345.3L337.32,339.67L331.3,333.66L326.29,327.32L322.34,320.73L319.49,313.93L317.77,307L317.2,300L317.77,293L319.49,286.07L322.34,279.27L326.29,272.68L331.3,266.34L337.32,260.33L344.3,254.7L352.17,249.51L418,300Z","cx":356.98,"cy":300,"box":{"x":328.04,"y":283,"w":57.89,"h":34},"labelT":0.447},{"d":"M352.17,249.51L360.85,244.81L370.26,240.63L380.32,237.03L390.91,234.04L401.94,231.67L413.31,229.97L424.9,228.94L436.6,228.6L448.3,228.94L459.89,229.97L471.26,231.67L482.29,234.04L492.88,237.03L502.94,240.63L512.35,244.81L521.03,249.51L418,300Z","cx":430.54,"cy":252.81,"box":{"x":381.36,"y":241.81,"w":98.38,"h":22},"labelT":0.402},{"d":"M603.45,209.12L610.73,213.69L617.62,218.47L624.11,223.44L630.18,228.6L635.82,233.93L641.02,239.42L645.77,245.05L650.04,250.82L653.84,256.7L657.15,262.69L659.96,268.77L662.27,274.93L664.07,281.14L665.37,287.4L666.14,293.69L666.4,300L556,300L555.86,296.5L555.43,293L554.71,289.52L553.71,286.07L552.42,282.65L550.86,279.27L549.02,275.95L546.91,272.68L544.54,269.47L541.9,266.34L539.01,263.29L535.88,260.33L532.5,257.47L528.9,254.7L525.07,252.05L521.03,249.51Z","cx":600.4,"cy":271,"box":{"x":561.92,"y":247,"w":76.96,"h":48},"labelT":0.613},{"d":"M666.4,300L666.14,306.31L665.37,312.6L664.07,318.86L662.27,325.07L659.96,331.23L657.15,337.31L653.84,343.3L650.04,349.18L645.77,354.95L641.02,360.58L635.82,366.07L630.18,371.4L624.11,376.56L617.62,381.53L610.73,386.31L603.45,390.88L521.03,350.49L525.07,347.95L528.9,345.3L532.5,342.53L535.88,339.67L539.01,336.71L541.9,333.66L544.54,330.53L546.91,327.32L549.02,324.05L550.86,320.73L552.42,317.35L553.71,313.93L554.71,310.48L555.43,307L555.86,303.5L556,300Z","cx":600.4,"cy":329,"box":{"x":561.92,"y":305,"w":76.96,"h":48},"labelT":0.433},{"d":"M603.45,390.88L595.81,395.23L587.82,399.35L579.51,403.23L570.88,406.86L561.97,410.24L552.79,413.34L543.37,416.18L533.73,418.74L523.88,421.01L513.87,422.99L503.7,424.67L493.41,426.05L483.02,427.13L472.55,427.9L462.03,428.37L451.48,428.52L436.6,371.4L442.46,371.31L448.3,371.06L454.12,370.63L459.89,370.03L465.61,369.26L471.26,368.33L476.82,367.23L482.29,365.96L487.65,364.54L492.88,362.97L497.98,361.24L502.94,359.37L507.73,357.35L512.35,355.19L516.78,352.9L521.03,350.49Z","cx":506.8,"cy":391.17,"box":{"x":452.18,"y":377.17,"w":109.24,"h":28},"labelT":0.471},{"d":"M451.48,428.52L440.93,428.37L430.41,427.9L419.94,427.13L409.55,426.05L399.26,424.67L389.09,422.99L379.08,421.01L369.23,418.74L359.59,416.18L350.17,413.34L340.99,410.24L332.08,406.86L323.45,403.23L315.14,399.35L307.15,395.23L299.51,390.88L352.17,350.49L356.42,352.9L360.85,355.19L365.47,357.35L370.26,359.37L375.22,361.24L380.32,362.97L385.55,364.54L390.91,365.96L396.38,367.23L401.94,368.33L407.59,369.26L413.31,370.03L419.08,370.63L424.9,371.06L430.74,371.31L436.6,371.4Z","cx":384.06,"cy":389.5,"box":{"x":337.23,"y":375.5,"w":93.66,"h":28},"labelT":0.528},{"d":"M299.51,390.88L292.23,386.31L285.34,381.53L278.85,376.56L272.78,371.4L267.14,366.07L261.94,360.58L257.19,354.95L252.92,349.18L249.12,343.3L245.81,337.31L243,331.23L240.69,325.07L238.89,318.86L237.59,312.6L236.82,306.31L236.56,300L317.2,300L317.34,303.5L317.77,307L318.49,310.48L319.49,313.93L320.78,317.35L322.34,320.73L324.18,324.05L326.29,327.32L328.66,330.53L331.3,333.66L334.19,336.71L337.32,339.67L340.7,342.53L344.3,345.3L348.13,347.95L352.17,350.49Z","cx":284.72,"cy":325,"box":{"x":258.16,"y":305,"w":53.13,"h":40},"labelT":0.346},{"d":"M236.56,300L236.82,293.69L237.59,287.4L238.89,281.14L240.69,274.93L243,268.77L245.81,262.69L249.12,256.7L252.92,250.82L257.19,245.05L261.94,239.42L267.14,233.93L272.78,228.6L278.85,223.44L285.34,218.47L292.23,213.69L299.51,209.12L352.17,249.51L348.13,252.05L344.3,254.7L340.7,257.47L337.32,260.33L334.19,263.29L331.3,266.34L328.66,269.47L326.29,272.68L324.18,275.95L322.34,279.27L320.78,282.65L319.49,286.07L318.49,289.52L317.77,293L317.34,296.5L317.2,300Z","cx":284.72,"cy":275,"box":{"x":258.16,"y":255,"w":53.13,"h":40},"labelT":0.571},{"d":"M299.51,209.12L307.15,204.77L315.14,200.65L323.45,196.77L332.08,193.14L340.99,189.76L350.17,186.66L359.59,183.82L369.23,181.26L379.08,178.99L389.09,177.01L399.26,175.33L409.55,173.95L419.94,172.87L430.41,172.1L440.93,171.63L451.48,171.48L436.6,228.6L430.74,228.69L424.9,228.94L419.08,229.37L413.31,229.97L407.59,230.74L401.94,231.67L396.38,232.77L390.91,234.04L385.55,235.46L380.32,237.03L375.22,238.76L370.26,240.63L365.47,242.65L360.85,244.81L356.42,247.1L352.17,249.51Z","cx":384.06,"cy":210.5,"box":{"x":337.23,"y":196.5,"w":93.66,"h":28},"labelT":0.528},{"d":"M451.48,171.48L462.03,171.63L472.55,172.1L483.02,172.87L493.41,173.95L503.7,175.33L513.87,177.01L523.88,178.99L533.73,181.26L543.37,183.82L552.79,186.66L561.97,189.76L570.88,193.14L579.51,196.77L587.82,200.65L595.81,204.77L603.45,209.12L521.03,249.51L516.78,247.1L512.35,244.81L507.73,242.65L502.94,240.63L497.98,238.76L492.88,237.03L487.65,235.46L482.29,234.04L476.82,232.77L471.26,231.67L465.61,230.74L459.89,229.97L454.12,229.37L448.3,228.94L442.46,228.69L436.6,228.6Z","cx":506.8,"cy":208.83,"box":{"x":452.18,"y":194.83,"w":109.24,"h":28},"labelT":0.45},{"d":"M682.44,170.42L690.78,175.6L698.77,180.98L706.41,186.54L713.67,192.28L720.55,198.19L727.04,204.25L733.13,210.46L738.8,216.8L744.05,223.28L748.87,229.87L753.26,236.57L757.2,243.37L760.69,250.26L763.73,257.22L766.31,264.25L768.43,271.33L663.75,279.9L662.27,274.93L660.46,270L658.33,265.11L655.88,260.29L653.12,255.52L650.04,250.82L646.66,246.19L642.98,241.65L639,237.2L634.73,232.85L630.18,228.6L625.35,224.46L620.26,220.43L614.91,216.53L609.3,212.76L603.45,209.12Z","cx":701.21,"cy":246.61,"box":{"x":667.79,"y":222.61,"w":66.85,"h":48},"labelT":0.644},{"d":"M768.43,271.33L770.08,278.46L771.26,285.62L771.96,292.81L772.2,300L771.96,307.19L771.26,314.38L770.08,321.54L768.43,328.67L766.31,335.75L763.73,342.78L760.69,349.74L757.2,356.63L753.26,363.43L748.87,370.13L744.05,376.72L738.8,383.2L642.98,358.35L646.66,353.81L650.04,349.18L653.12,344.48L655.88,339.71L658.33,334.89L660.46,330L662.27,325.07L663.75,320.1L664.91,315.11L665.74,310.08L666.23,305.05L666.4,300L666.23,294.95L665.74,289.92L664.91,284.89L663.75,279.9Z","cx":713.79,"cy":314.64,"box":{"x":672.84,"y":282.64,"w":81.9,"h":64},"labelT":0.468},{"d":"M738.8,383.2L733.13,389.54L727.04,395.75L720.55,401.81L713.67,407.72L706.41,413.46L698.77,419.02L690.78,424.4L682.44,429.58L673.77,434.57L664.77,439.35L655.47,443.92L645.87,448.26L636,452.38L625.86,456.25L615.48,459.89L604.87,463.29L549.05,414.51L556.49,412.13L563.78,409.58L570.88,406.86L577.81,403.97L584.54,400.93L591.06,397.73L597.37,394.38L603.45,390.88L609.3,387.24L614.91,383.47L620.26,379.57L625.35,375.54L630.18,371.4L634.73,367.15L639,362.8L642.98,358.35Z","cx":623.99,"cy":419.93,"box":{"x":579.11,"y":408.93,"w":89.77,"h":22},"labelT":0.491},{"d":"M604.87,463.29L594.04,466.43L583.02,469.31L571.81,471.93L560.44,474.29L548.93,476.38L537.28,478.2L525.53,479.74L513.68,481L501.76,481.99L489.78,482.7L477.77,483.12L465.74,483.26L453.71,483.12L441.7,482.7L429.72,481.99L417.8,481L417.86,426.94L426.22,427.63L434.62,428.12L443.04,428.42L451.48,428.52L459.92,428.42L468.34,428.12L476.74,427.63L485.1,426.94L493.41,426.05L501.65,424.97L509.82,423.69L517.89,422.23L525.87,420.58L533.73,418.74L541.46,416.71L549.05,414.51Z","cx":493.45,"cy":451.98,"box":{"x":423.85,"y":434.98,"w":139.19,"h":34},"labelT":0.475},{"d":"M417.8,481L405.95,479.74L394.2,478.2L382.55,476.38L371.04,474.29L359.67,471.93L348.46,469.31L337.44,466.43L326.61,463.29L316,459.89L305.62,456.25L295.48,452.38L285.61,448.26L276.01,443.92L266.71,439.35L257.71,434.57L249.04,429.58L299.51,390.88L305.59,394.38L311.9,397.73L318.42,400.93L325.15,403.97L332.08,406.86L339.18,409.58L346.47,412.13L353.91,414.51L361.5,416.71L369.23,418.74L377.09,420.58L385.07,422.23L393.14,423.69L401.31,424.97L409.55,426.05L417.86,426.94Z","cx":359.1,"cy":440.78,"box":{"x":307.77,"y":429.78,"w":102.65,"h":22},"labelT":0.603},{"d":"M249.04,429.58L240.7,424.4L232.71,419.02L225.07,413.46L217.81,407.72L210.93,401.81L204.44,395.75L198.35,389.54L192.68,383.2L187.43,376.72L182.61,370.13L178.22,363.43L174.28,356.63L170.79,349.74L167.75,342.78L165.17,335.75L163.05,328.67L239.21,320.1L240.69,325.07L242.5,330L244.63,334.89L247.08,339.71L249.84,344.48L252.92,349.18L256.3,353.81L259.98,358.35L263.96,362.8L268.23,367.15L272.78,371.4L277.61,375.54L282.7,379.57L288.05,383.47L293.66,387.24L299.51,390.88Z","cx":211.26,"cy":347.56,"box":{"x":186.93,"y":330.56,"w":48.68,"h":34},"labelT":0.302},{"d":"M163.05,328.67L161.4,321.54L160.22,314.38L159.52,307.19L159.28,300L159.52,292.81L160.22,285.62L161.4,278.46L163.05,271.33L165.17,264.25L167.75,257.22L170.79,250.26L174.28,243.37L178.22,236.57L182.61,229.87L187.43,223.28L192.68,216.8L259.98,241.65L256.3,246.19L252.92,250.82L249.84,255.52L247.08,260.29L244.63,265.11L242.5,270L240.69,274.93L239.21,279.9L238.05,284.89L237.22,289.92L236.73,294.95L236.56,300L236.73,305.05L237.22,310.08L238.05,315.11L239.21,320.1Z","cx":203.65,"cy":285.36,"box":{"x":176.74,"y":253.36,"w":53.82,"h":64},"labelT":0.527},{"d":"M192.68,216.8L198.35,210.46L204.44,204.25L210.93,198.19L217.81,192.28L225.07,186.54L232.71,180.98L240.7,175.6L249.04,170.42L257.71,165.43L266.71,160.65L276.01,156.08L285.61,151.74L295.48,147.62L305.62,143.75L316,140.11L326.61,136.71L353.91,185.49L346.47,187.87L339.18,190.42L332.08,193.14L325.15,196.03L318.42,199.07L311.9,202.27L305.59,205.62L299.51,209.12L293.66,212.76L288.05,216.53L282.7,220.43L277.61,224.46L272.78,228.6L268.23,232.85L263.96,237.2L259.98,241.65Z","cx":299.91,"cy":177.03,"box":{"x":268.23,"y":166.03,"w":63.36,"h":22},"labelT":0.525},{"d":"M326.61,136.71L337.44,133.57L348.46,130.69L359.67,128.07L371.04,125.71L382.55,123.62L394.2,121.8L405.95,120.26L417.8,119L429.72,118.01L441.7,117.3L453.71,116.88L465.74,116.74L477.77,116.88L489.78,117.3L501.76,118.01L513.68,119L485.1,173.06L476.74,172.37L468.34,171.88L459.92,171.58L451.48,171.48L443.04,171.58L434.62,171.88L426.22,172.37L417.86,173.06L409.55,173.95L401.31,175.03L393.14,176.31L385.07,177.77L377.09,179.42L369.23,181.26L361.5,183.29L353.91,185.49Z","cx":416.49,"cy":151.11,"box":{"x":352.84,"y":134.11,"w":127.29,"h":34},"labelT":0.49},{"d":"M513.68,119L525.53,120.26L537.28,121.8L548.93,123.62L560.44,125.71L571.81,128.07L583.02,130.69L594.04,133.57L604.87,136.71L615.48,140.11L625.86,143.75L636,147.62L645.87,151.74L655.47,156.08L664.77,160.65L673.77,165.43L682.44,170.42L603.45,209.12L597.37,205.62L591.06,202.27L584.54,199.07L577.81,196.03L570.88,193.14L563.78,190.42L556.49,187.87L549.05,185.49L541.46,183.29L533.73,181.26L525.87,179.42L517.89,177.77L509.82,176.31L501.65,175.03L493.41,173.95L485.1,173.06Z","cx":570.78,"cy":161.64,"box":{"x":511.54,"y":150.64,"w":118.49,"h":22},"labelT":0.454},{"d":"M761.43,131.71L770.49,137.31L779.23,143.08L787.66,149.01L795.75,155.11L803.51,161.37L810.92,167.77L817.98,174.32L824.68,181L831,187.81L836.96,194.74L842.52,201.78L847.7,208.92L852.49,216.16L856.88,223.5L860.86,230.91L864.44,238.4L761.76,252.57L759,246.8L755.94,241.09L752.56,235.45L748.87,229.87L744.88,224.37L740.6,218.95L736.01,213.61L731.14,208.37L725.99,203.23L720.55,198.19L714.84,193.26L708.87,188.44L702.64,183.74L696.15,179.17L689.41,174.72L682.44,170.42Z","cx":797,"cy":218.71,"box":{"x":762.27,"y":198.71,"w":69.46,"h":40},"labelT":0.675},{"d":"M864.44,238.4L867.6,245.96L870.35,253.57L872.68,261.23L874.6,268.93L876.08,276.67L877.15,284.43L877.79,292.21L878,300L877.79,307.79L877.15,315.57L876.08,323.33L874.6,331.07L872.68,338.77L870.35,346.43L867.6,354.04L864.44,361.6L761.76,347.43L764.19,341.61L766.31,335.75L768.11,329.85L769.58,323.92L770.72,317.96L771.54,311.99L772.04,306L772.2,300L772.04,294L771.54,288.01L770.72,282.04L769.58,276.08L768.11,270.15L766.31,264.25L764.19,258.39L761.76,252.57Z","cx":822.91,"cy":300,"box":{"x":778.2,"y":268,"w":89.42,"h":64},"labelT":0.513},{"d":"M864.44,361.6L860.86,369.09L856.88,376.5L852.49,383.84L847.7,391.08L842.52,398.22L836.96,405.26L831,412.19L824.68,419L817.98,425.68L810.92,432.23L803.51,438.63L795.75,444.89L787.66,450.99L779.23,456.92L770.49,462.69L761.43,468.29L682.44,429.58L689.41,425.28L696.15,420.83L702.64,416.26L708.87,411.56L714.84,406.74L720.55,401.81L725.99,396.77L731.14,391.63L736.01,386.39L740.6,381.05L744.88,375.63L748.87,370.13L752.56,364.55L755.94,358.91L759,353.2L761.76,347.43Z","cx":797,"cy":381.29,"box":{"x":762.27,"y":361.29,"w":69.46,"h":40},"labelT":0.455},{"d":"M761.43,468.29L752.07,473.71L742.42,478.94L732.49,483.98L722.29,488.82L711.83,493.46L701.12,497.89L690.17,502.11L679,506.11L667.62,509.9L656.03,513.46L644.26,516.79L632.31,519.88L620.2,522.75L607.93,525.37L595.53,527.75L583.01,529.89L545.06,477.02L554.7,475.37L564.25,473.53L573.69,471.51L583.02,469.31L592.22,466.92L601.28,464.36L610.2,461.62L618.97,458.71L627.57,455.62L636,452.38L644.25,448.96L652.3,445.39L660.16,441.66L667.8,437.78L675.23,433.75L682.44,429.58Z","cx":626.45,"cy":488.28,"box":{"x":569.19,"y":477.28,"w":114.52,"h":22},"labelT":0.481},{"d":"M583.01,529.89L570.38,531.78L557.65,533.43L544.83,534.82L531.95,535.96L519.01,536.85L506.03,537.49L493.02,537.87L480,538L466.98,537.87L453.97,537.49L440.99,536.85L428.05,535.96L415.17,534.82L402.35,533.43L389.62,531.78L376.99,529.89L386.42,477.02L396.15,478.47L405.95,479.74L415.82,480.81L425.74,481.69L435.7,482.38L445.7,482.87L455.71,483.16L465.74,483.26L475.77,483.16L485.78,482.87L495.78,482.38L505.74,481.69L515.66,480.81L525.53,479.74L535.33,478.47L545.06,477.02Z","cx":467.88,"cy":507.97,"box":{"x":391,"y":487.97,"w":153.76,"h":40},"labelT":0.474},{"d":"M376.99,529.89L364.47,527.75L352.07,525.37L339.8,522.75L327.69,519.88L315.74,516.79L303.97,513.46L292.38,509.9L281,506.11L269.83,502.11L258.88,497.89L248.17,493.46L237.71,488.82L227.51,483.98L217.58,478.94L207.93,473.71L198.57,468.29L249.04,429.58L256.25,433.75L263.68,437.78L271.32,441.66L279.18,445.39L287.23,448.96L295.48,452.38L303.91,455.62L312.51,458.71L321.28,461.62L330.2,464.36L339.26,466.92L348.46,469.31L357.79,471.51L367.23,473.53L376.78,475.37L386.42,477.02Z","cx":329.82,"cy":491.12,"box":{"x":284.23,"y":480.12,"w":91.18,"h":22},"labelT":0.656},{"d":"M198.57,468.29L189.51,462.69L180.77,456.92L172.34,450.99L164.25,444.89L156.49,438.63L149.08,432.23L142.02,425.68L135.32,419L129,412.19L123.04,405.26L117.48,398.22L112.3,391.08L107.51,383.84L103.12,376.5L99.14,369.09L95.56,361.6L169.72,347.43L172.48,353.2L175.54,358.91L178.92,364.55L182.61,370.13L186.6,375.63L190.88,381.05L195.47,386.39L200.34,391.63L205.49,396.77L210.93,401.81L216.64,406.74L222.61,411.56L228.84,416.26L235.33,420.83L242.07,425.28L249.04,429.58Z","cx":146.87,"cy":379.04,"box":{"x":124.12,"y":362.04,"w":45.5,"h":34},"labelT":0.298},{"d":"M95.56,361.6L92.4,354.04L89.65,346.43L87.32,338.77L85.4,331.07L83.92,323.33L82.85,315.57L82.21,307.79L82,300L82.21,292.21L82.85,284.43L83.92,276.67L85.4,268.93L87.32,261.23L89.65,253.57L92.4,245.96L95.56,238.4L169.72,252.57L167.29,258.39L165.17,264.25L163.37,270.15L161.9,276.08L160.76,282.04L159.94,288.01L159.44,294L159.28,300L159.44,306L159.94,311.99L160.76,317.96L161.9,323.92L163.37,329.85L165.17,335.75L167.29,341.61L169.72,347.43Z","cx":122.83,"cy":300,"box":{"x":92.38,"y":268,"w":60.9,"h":64},"labelT":0.483},{"d":"M95.56,238.4L99.14,230.91L103.12,223.5L107.51,216.16L112.3,208.92L117.48,201.78L123.04,194.74L129,187.81L135.32,181L142.02,174.32L149.08,167.77L156.49,161.37L164.25,155.11L172.34,149.01L180.77,143.08L189.51,137.31L198.57,131.71L249.04,170.42L242.07,174.72L235.33,179.17L228.84,183.74L222.61,188.44L216.64,193.26L210.93,198.19L205.49,203.23L200.34,208.37L195.47,213.61L190.88,218.95L186.6,224.37L182.61,229.87L178.92,235.45L175.54,241.09L172.48,246.8L169.72,252.57Z","cx":146.87,"cy":220.96,"box":{"x":124.12,"y":203.96,"w":45.5,"h":34},"labelT":0.536},{"d":"M198.57,131.71L207.93,126.29L217.58,121.06L227.51,116.02L237.71,111.18L248.17,106.54L258.88,102.11L269.83,97.89L281,93.89L292.38,90.1L303.97,86.54L315.74,83.21L327.69,80.12L339.8,77.25L352.07,74.63L364.47,72.25L376.99,70.11L386.42,122.98L376.78,124.63L367.23,126.47L357.79,128.49L348.46,130.69L339.26,133.08L330.2,135.64L321.28,138.38L312.51,141.29L303.91,144.38L295.48,147.62L287.23,151.04L279.18,154.61L271.32,158.34L263.68,162.22L256.25,166.25L249.04,170.42Z","cx":329.82,"cy":108.88,"box":{"x":284.23,"y":97.88,"w":91.18,"h":22},"labelT":0.543},{"d":"M376.99,70.11L389.62,68.22L402.35,66.57L415.17,65.18L428.05,64.04L440.99,63.15L453.97,62.51L466.98,62.13L480,62L493.02,62.13L506.03,62.51L519.01,63.15L531.95,64.04L544.83,65.18L557.65,66.57L570.38,68.22L583.01,70.11L545.06,122.98L535.33,121.53L525.53,120.26L515.66,119.19L505.74,118.31L495.78,117.62L485.78,117.13L475.77,116.84L465.74,116.74L455.71,116.84L445.7,117.13L435.7,117.62L425.74,118.31L415.82,119.19L405.95,120.26L396.15,121.53L386.42,122.98Z","cx":467.88,"cy":92.03,"box":{"x":391,"y":72.03,"w":153.76,"h":40},"labelT":0.467},{"d":"M583.01,70.11L595.53,72.25L607.93,74.63L620.2,77.25L632.31,80.12L644.26,83.21L656.03,86.54L667.62,90.1L679,93.89L690.17,97.89L701.12,102.11L711.83,106.54L722.29,111.18L732.49,116.02L742.42,121.06L752.07,126.29L761.43,131.71L682.44,170.42L675.23,166.25L667.8,162.22L660.16,158.34L652.3,154.61L644.25,151.04L636,147.62L627.57,144.38L618.97,141.29L610.2,138.38L601.28,135.64L592.22,133.08L583.02,130.69L573.69,128.49L564.25,126.47L554.7,124.63L545.06,122.98Z","cx":626.45,"cy":111.72,"box":{"x":569.19,"y":100.72,"w":114.52,"h":22},"labelT":0.395}],"bounds":{"x":82,"y":62,"width":796,"height":476}},"compact":{"cells":[{"d":"M593.15,214.17L606.53,223L618.39,232.56L628.63,242.78L637.15,253.55L643.86,264.77L648.7,276.32L651.62,288.1L652.6,300L651.62,311.9L648.7,323.68L643.86,335.23L637.15,346.45L628.63,357.22L618.39,367.44L606.53,377L593.15,385.83L418,300Z","cx":565.07,"cy":300,"box":{"x":491.34,"y":270,"w":147.45,"h":60},"labelT":0.563},{"d":"M593.15,385.83L578.39,393.83L562.39,400.92L545.3,407.05L527.3,412.14L508.54,416.15L489.22,419.05L469.52,420.8L449.62,421.38L429.72,420.8L410.02,419.05L390.7,416.15L371.94,412.14L353.94,407.05L336.85,400.92L320.85,393.83L306.09,385.83L418,300Z","cx":436.06,"cy":378.01,"box":{"x":360.1,"y":352.01,"w":151.91,"h":52},"labelT":0.548},{"d":"M306.09,385.83L292.71,377L280.85,367.44L270.61,357.22L262.09,346.45L255.38,335.23L250.54,323.68L247.62,311.9L246.64,300L247.62,288.1L250.54,276.32L255.38,264.77L262.09,253.55L270.61,242.78L280.85,232.56L292.71,223L306.09,214.17L418,300Z","cx":314.71,"cy":300,"box":{"x":260.44,"y":270,"w":108.53,"h":60},"labelT":0.449},{"d":"M306.09,214.17L320.85,206.17L336.85,199.08L353.94,192.95L371.94,187.86L390.7,183.85L410.02,180.95L429.72,179.2L449.62,178.62L469.52,179.2L489.22,180.95L508.54,183.85L527.3,187.86L545.3,192.95L562.39,199.08L578.39,206.17L593.15,214.17L418,300Z","cx":436.06,"cy":221.99,"box":{"x":360.1,"y":195.99,"w":151.91,"h":52},"labelT":0.405},{"d":"M761.43,131.71L774.9,140.17L787.66,149.01L799.68,158.22L810.92,167.77L821.38,177.64L831,187.81L839.79,198.24L847.7,208.92L854.73,219.82L860.86,230.91L866.07,242.17L870.35,253.57L873.69,265.08L876.08,276.67L877.52,288.32L878,300L652.6,300L652.36,294.04L651.62,288.1L650.4,282.19L648.7,276.32L646.52,270.51L643.86,264.77L640.73,259.11L637.15,253.55L633.11,248.1L628.63,242.78L623.72,237.6L618.39,232.56L612.66,227.69L606.53,223L600.02,218.49L593.15,214.17Z","cx":748.29,"cy":251,"box":{"x":658.52,"y":207,"w":179.54,"h":88},"labelT":0.627},{"d":"M878,300L877.52,311.68L876.08,323.33L873.69,334.92L870.35,346.43L866.07,357.83L860.86,369.09L854.73,380.18L847.7,391.08L839.79,401.76L831,412.19L821.38,422.36L810.92,432.23L799.68,441.78L787.66,450.99L774.9,459.83L761.43,468.29L593.15,385.83L600.02,381.51L606.53,377L612.66,372.31L618.39,367.44L623.72,362.4L628.63,357.22L633.11,351.9L637.15,346.45L640.73,340.89L643.86,335.23L646.52,329.49L648.7,323.68L650.4,317.81L651.62,311.9L652.36,305.96L652.6,300Z","cx":748.29,"cy":349,"box":{"x":658.52,"y":305,"w":179.54,"h":88},"labelT":0.418},{"d":"M761.43,468.29L747.28,476.35L732.49,483.98L717.09,491.16L701.12,497.89L684.61,504.14L667.62,509.9L650.17,515.15L632.31,519.88L614.08,524.09L595.53,527.75L576.71,530.87L557.65,533.43L538.4,535.42L519.01,536.85L499.53,537.71L480,538L449.62,421.38L459.58,421.23L469.52,420.8L479.4,420.07L489.22,419.05L498.94,417.74L508.54,416.15L518,414.28L527.3,412.14L536.41,409.73L545.3,407.05L553.97,404.11L562.39,400.92L570.54,397.49L578.39,393.83L585.93,389.94L593.15,385.83Z","cx":576.61,"cy":468.1,"box":{"x":477.43,"y":434.1,"w":198.36,"h":68},"labelT":0.474},{"d":"M480,538L460.47,537.71L440.99,536.85L421.6,535.42L402.35,533.43L383.29,530.87L364.47,527.75L345.92,524.09L327.69,519.88L309.83,515.15L292.38,509.9L275.39,504.14L258.88,497.89L242.91,491.16L227.51,483.98L212.72,476.35L198.57,468.29L306.09,385.83L313.31,389.94L320.85,393.83L328.7,397.49L336.85,400.92L345.27,404.11L353.94,407.05L362.83,409.73L371.94,412.14L381.24,414.28L390.7,416.15L400.3,417.74L410.02,419.05L419.84,420.07L429.72,420.8L439.66,421.23L449.62,421.38Z","cx":355.11,"cy":461.25,"box":{"x":265.84,"y":427.25,"w":178.53,"h":68},"labelT":0.526},{"d":"M198.57,468.29L185.1,459.83L172.34,450.99L160.32,441.78L149.08,432.23L138.62,422.36L129,412.19L120.21,401.76L112.3,391.08L105.27,380.18L99.14,369.09L93.93,357.83L89.65,346.43L86.31,334.92L83.92,323.33L82.48,311.68L82,300L246.64,300L246.88,305.96L247.62,311.9L248.84,317.81L250.54,323.68L252.72,329.49L255.38,335.23L258.51,340.89L262.09,346.45L266.13,351.9L270.61,357.22L275.52,362.4L280.85,367.44L286.58,372.31L292.71,377L299.22,381.51L306.09,385.83Z","cx":181.33,"cy":349,"box":{"x":121.94,"y":305,"w":118.78,"h":88},"labelT":0.367},{"d":"M82,300L82.48,288.32L83.92,276.67L86.31,265.08L89.65,253.57L93.93,242.17L99.14,230.91L105.27,219.82L112.3,208.92L120.21,198.24L129,187.81L138.62,177.64L149.08,167.77L160.32,158.22L172.34,149.01L185.1,140.17L198.57,131.71L306.09,214.17L299.22,218.49L292.71,223L286.58,227.69L280.85,232.56L275.52,237.6L270.61,242.78L266.13,248.1L262.09,253.55L258.51,259.11L255.38,264.77L252.72,270.51L250.54,276.32L248.84,282.19L247.62,288.1L246.88,294.04L246.64,300Z","cx":181.33,"cy":251,"box":{"x":121.94,"y":207,"w":118.78,"h":88},"labelT":0.576},{"d":"M198.57,131.71L212.72,123.65L227.51,116.02L242.91,108.84L258.88,102.11L275.39,95.86L292.38,90.1L309.83,84.85L327.69,80.12L345.92,75.91L364.47,72.25L383.29,69.13L402.35,66.57L421.6,64.58L440.99,63.15L460.47,62.29L480,62L449.62,178.62L439.66,178.77L429.72,179.2L419.84,179.93L410.02,180.95L400.3,182.26L390.7,183.85L381.24,185.72L371.94,187.86L362.83,190.27L353.94,192.95L345.27,195.89L336.85,199.08L328.7,202.51L320.85,206.17L313.31,210.06L306.09,214.17Z","cx":355.11,"cy":138.75,"box":{"x":265.84,"y":104.75,"w":178.53,"h":68},"labelT":0.53},{"d":"M480,62L499.53,62.29L519.01,63.15L538.4,64.58L557.65,66.57L576.71,69.13L595.53,72.25L614.08,75.91L632.31,80.12L650.17,84.85L667.62,90.1L684.61,95.86L701.12,102.11L717.09,108.84L732.49,116.02L747.28,123.65L761.43,131.71L593.15,214.17L585.93,210.06L578.39,206.17L570.54,202.51L562.39,199.08L553.97,195.89L545.3,192.95L536.41,190.27L527.3,187.86L518,185.72L508.54,183.85L498.94,182.26L489.22,180.95L479.4,179.93L469.52,179.2L459.58,178.77L449.62,178.62Z","cx":576.61,"cy":131.9,"box":{"x":477.43,"y":97.9,"w":198.36,"h":68},"labelT":0.433}],"bounds":{"x":82,"y":62,"width":796,"height":476}}},"hexagonos":{"wide":{"cells":[{"d":"M233.25,194.78L198,229.85L127.5,229.85L92.25,194.78L127.5,159.7L198,159.7Z","cx":162.75,"cy":194.78,"box":{"x":121.37,"y":174.78,"w":82.77,"h":40},"labelT":0.5},{"d":"M233.25,264.93L198,300L127.5,300L92.25,264.93L127.5,229.85L198,229.85Z","cx":162.75,"cy":264.93,"box":{"x":121.37,"y":244.93,"w":82.77,"h":40},"labelT":0.5},{"d":"M233.25,335.07L198,370.15L127.5,370.15L92.25,335.07L127.5,300L198,300Z","cx":162.75,"cy":335.07,"box":{"x":121.37,"y":315.07,"w":82.77,"h":40},"labelT":0.5},{"d":"M233.25,405.22L198,440.3L127.5,440.3L92.25,405.22L127.5,370.15L198,370.15Z","cx":162.75,"cy":405.22,"box":{"x":121.37,"y":385.22,"w":82.77,"h":40},"labelT":0.5},{"d":"M339,159.7L303.75,194.78L233.25,194.78L198,159.7L233.25,124.63L303.75,124.63Z","cx":268.5,"cy":159.7,"box":{"x":227.12,"y":139.7,"w":82.77,"h":40},"labelT":0.5},{"d":"M339,229.85L303.75,264.93L233.25,264.93L198,229.85L233.25,194.78L303.75,194.78Z","cx":268.5,"cy":229.85,"box":{"x":227.12,"y":209.85,"w":82.77,"h":40},"labelT":0.5},{"d":"M339,300L303.75,335.07L233.25,335.07L198,300L233.25,264.93L303.75,264.93Z","cx":268.5,"cy":300,"box":{"x":227.12,"y":280,"w":82.77,"h":40},"labelT":0.5},{"d":"M339,370.15L303.75,405.22L233.25,405.22L198,370.15L233.25,335.07L303.75,335.07Z","cx":268.5,"cy":370.15,"box":{"x":227.12,"y":350.15,"w":82.77,"h":40},"labelT":0.5},{"d":"M339,440.3L303.75,475.37L233.25,475.37L198,440.3L233.25,405.22L303.75,405.22Z","cx":268.5,"cy":440.3,"box":{"x":227.12,"y":420.3,"w":82.77,"h":40},"labelT":0.5},{"d":"M444.75,124.63L409.5,159.7L339,159.7L303.75,124.63L339,89.56L409.5,89.56Z","cx":374.25,"cy":124.63,"box":{"x":332.87,"y":104.63,"w":82.77,"h":40},"labelT":0.5},{"d":"M444.75,194.78L409.5,229.85L339,229.85L303.75,194.78L339,159.7L409.5,159.7Z","cx":374.25,"cy":194.78,"box":{"x":332.87,"y":174.78,"w":82.77,"h":40},"labelT":0.5},{"d":"M444.75,264.93L409.5,300L339,300L303.75,264.93L339,229.85L409.5,229.85Z","cx":374.25,"cy":264.93,"box":{"x":332.87,"y":244.93,"w":82.77,"h":40},"labelT":0.5},{"d":"M444.75,335.07L409.5,370.15L339,370.15L303.75,335.07L339,300L409.5,300Z","cx":374.25,"cy":335.07,"box":{"x":332.87,"y":315.07,"w":82.77,"h":40},"labelT":0.5},{"d":"M444.75,405.22L409.5,440.3L339,440.3L303.75,405.22L339,370.15L409.5,370.15Z","cx":374.25,"cy":405.22,"box":{"x":332.87,"y":385.22,"w":82.77,"h":40},"labelT":0.5},{"d":"M444.75,475.37L409.5,510.44L339,510.44L303.75,475.37L339,440.3L409.5,440.3Z","cx":374.25,"cy":475.37,"box":{"x":332.87,"y":455.37,"w":82.77,"h":40},"labelT":0.5},{"d":"M550.5,89.56L515.25,124.63L444.75,124.63L409.5,89.56L444.75,54.48L515.25,54.48Z","cx":480,"cy":89.56,"box":{"x":438.62,"y":69.56,"w":82.77,"h":40},"labelT":0.5},{"d":"M550.5,159.7L515.25,194.78L444.75,194.78L409.5,159.7L444.75,124.63L515.25,124.63Z","cx":480,"cy":159.7,"box":{"x":438.62,"y":139.7,"w":82.77,"h":40},"labelT":0.5},{"d":"M550.5,229.85L515.25,264.93L444.75,264.93L409.5,229.85L444.75,194.78L515.25,194.78Z","cx":480,"cy":229.85,"box":{"x":438.62,"y":209.85,"w":82.77,"h":40},"labelT":0.5},{"d":"M550.5,300L515.25,335.07L444.75,335.07L409.5,300L444.75,264.93L515.25,264.93Z","cx":480,"cy":300,"box":{"x":438.62,"y":280,"w":82.77,"h":40},"labelT":0.5},{"d":"M550.5,370.15L515.25,405.22L444.75,405.22L409.5,370.15L444.75,335.07L515.25,335.07Z","cx":480,"cy":370.15,"box":{"x":438.62,"y":350.15,"w":82.77,"h":40},"labelT":0.5},{"d":"M550.5,440.3L515.25,475.37L444.75,475.37L409.5,440.3L444.75,405.22L515.25,405.22Z","cx":480,"cy":440.3,"box":{"x":438.62,"y":420.3,"w":82.77,"h":40},"labelT":0.5},{"d":"M550.5,510.44L515.25,545.52L444.75,545.52L409.5,510.44L444.75,475.37L515.25,475.37Z","cx":480,"cy":510.44,"box":{"x":438.62,"y":490.44,"w":82.77,"h":40},"labelT":0.5},{"d":"M656.25,124.63L621,159.7L550.5,159.7L515.25,124.63L550.5,89.56L621,89.56Z","cx":585.75,"cy":124.63,"box":{"x":544.37,"y":104.63,"w":82.77,"h":40},"labelT":0.5},{"d":"M656.25,194.78L621,229.85L550.5,229.85L515.25,194.78L550.5,159.7L621,159.7Z","cx":585.75,"cy":194.78,"box":{"x":544.37,"y":174.78,"w":82.77,"h":40},"labelT":0.5},{"d":"M656.25,264.93L621,300L550.5,300L515.25,264.93L550.5,229.85L621,229.85Z","cx":585.75,"cy":264.93,"box":{"x":544.37,"y":244.93,"w":82.77,"h":40},"labelT":0.5},{"d":"M656.25,335.07L621,370.15L550.5,370.15L515.25,335.07L550.5,300L621,300Z","cx":585.75,"cy":335.07,"box":{"x":544.37,"y":315.07,"w":82.77,"h":40},"labelT":0.5},{"d":"M656.25,405.22L621,440.3L550.5,440.3L515.25,405.22L550.5,370.15L621,370.15Z","cx":585.75,"cy":405.22,"box":{"x":544.37,"y":385.22,"w":82.77,"h":40},"labelT":0.5},{"d":"M656.25,475.37L621,510.44L550.5,510.44L515.25,475.37L550.5,440.3L621,440.3Z","cx":585.75,"cy":475.37,"box":{"x":544.37,"y":455.37,"w":82.77,"h":40},"labelT":0.5},{"d":"M762,159.7L726.75,194.78L656.25,194.78L621,159.7L656.25,124.63L726.75,124.63Z","cx":691.5,"cy":159.7,"box":{"x":650.12,"y":139.7,"w":82.77,"h":40},"labelT":0.5},{"d":"M762,229.85L726.75,264.93L656.25,264.93L621,229.85L656.25,194.78L726.75,194.78Z","cx":691.5,"cy":229.85,"box":{"x":650.12,"y":209.85,"w":82.77,"h":40},"labelT":0.5},{"d":"M762,300L726.75,335.07L656.25,335.07L621,300L656.25,264.93L726.75,264.93Z","cx":691.5,"cy":300,"box":{"x":650.12,"y":280,"w":82.77,"h":40},"labelT":0.5},{"d":"M762,370.15L726.75,405.22L656.25,405.22L621,370.15L656.25,335.07L726.75,335.07Z","cx":691.5,"cy":370.15,"box":{"x":650.12,"y":350.15,"w":82.77,"h":40},"labelT":0.5},{"d":"M762,440.3L726.75,475.37L656.25,475.37L621,440.3L656.25,405.22L726.75,405.22Z","cx":691.5,"cy":440.3,"box":{"x":650.12,"y":420.3,"w":82.77,"h":40},"labelT":0.5},{"d":"M867.75,194.78L832.5,229.85L762,229.85L726.75,194.78L762,159.7L832.5,159.7Z","cx":797.25,"cy":194.78,"box":{"x":755.87,"y":174.78,"w":82.77,"h":40},"labelT":0.5},{"d":"M867.75,264.93L832.5,300L762,300L726.75,264.93L762,229.85L832.5,229.85Z","cx":797.25,"cy":264.93,"box":{"x":755.87,"y":244.93,"w":82.77,"h":40},"labelT":0.5},{"d":"M867.75,335.07L832.5,370.15L762,370.15L726.75,335.07L762,300L832.5,300Z","cx":797.25,"cy":335.07,"box":{"x":755.87,"y":315.07,"w":82.77,"h":40},"labelT":0.5},{"d":"M867.75,405.22L832.5,440.3L762,440.3L726.75,405.22L762,370.15L832.5,370.15Z","cx":797.25,"cy":405.22,"box":{"x":755.87,"y":385.22,"w":82.77,"h":40},"labelT":0.5}],"bounds":{"x":92.25,"y":54.48,"width":775.5,"height":491.04}},"compact":{"cells":[{"d":"M402.5,223.79L325,300L170,300L92.5,223.79L170,147.58L325,147.58Z","cx":247.5,"cy":223.79,"box":{"x":146.3,"y":179.79,"w":202.41,"h":88},"labelT":0.5},{"d":"M402.5,376.21L325,452.42L170,452.42L92.5,376.21L170,300L325,300Z","cx":247.5,"cy":376.21,"box":{"x":146.3,"y":332.21,"w":202.41,"h":88},"labelT":0.5},{"d":"M635,147.58L557.5,223.79L402.5,223.79L325,147.58L402.5,71.37L557.5,71.37Z","cx":480,"cy":147.58,"box":{"x":378.8,"y":103.58,"w":202.41,"h":88},"labelT":0.5},{"d":"M635,300L557.5,376.21L402.5,376.21L325,300L402.5,223.79L557.5,223.79Z","cx":480,"cy":300,"box":{"x":378.8,"y":256,"w":202.41,"h":88},"labelT":0.5},{"d":"M635,452.42L557.5,528.63L402.5,528.63L325,452.42L402.5,376.21L557.5,376.21Z","cx":480,"cy":452.42,"box":{"x":378.8,"y":408.42,"w":202.41,"h":88},"labelT":0.5},{"d":"M867.5,223.79L790,300L635,300L557.5,223.79L635,147.58L790,147.58Z","cx":712.5,"cy":223.79,"box":{"x":611.3,"y":179.79,"w":202.41,"h":88},"labelT":0.5},{"d":"M867.5,376.21L790,452.42L635,452.42L557.5,376.21L635,300L790,300Z","cx":712.5,"cy":376.21,"box":{"x":611.3,"y":332.21,"w":202.41,"h":88},"labelT":0.5}],"bounds":{"x":92.5,"y":71.37,"width":775,"height":457.26}}},"vortice":{"wide":{"cells":[{"d":"M80.00,60.00L90.08,68.00L99.92,76.00L109.52,84.00L118.87,92.00L127.97,100.00L136.82,108.00L145.42,116.00L153.76,124.00L161.84,132.00L169.65,140.00L293.79,140.00L289.10,132.00L284.26,124.00L279.25,116.00L274.09,108.00L268.78,100.00L263.32,92.00L257.71,84.00L251.95,76.00L246.05,68.00L240.00,60.00Z","cx":186.89,"cy":84.0,"box":{"x":142.79,"y":63.0,"w":88.21,"h":42.0},"labelT":0.5},{"d":"M240.00,60.00L246.05,68.00L251.95,76.00L257.71,84.00L263.32,92.00L268.78,100.00L274.09,108.00L279.25,116.00L284.26,124.00L289.10,132.00L293.79,140.00L417.93,140.00L416.37,132.00L414.75,124.00L413.08,116.00L411.36,108.00L409.59,100.00L407.77,92.00L405.90,84.00L403.98,76.00L402.02,68.00L400.00,60.00Z","cx":328.96,"cy":88.0,"box":{"x":284.03,"y":63.0,"w":89.86,"h":50.0},"labelT":0.5},{"d":"M400.00,60.00L402.02,68.00L403.98,76.00L405.90,84.00L407.77,92.00L409.59,100.00L411.36,108.00L413.08,116.00L414.75,124.00L416.37,132.00L417.93,140.00L542.07,140.00L543.63,132.00L545.25,124.00L546.92,116.00L548.64,108.00L550.41,100.00L552.23,92.00L554.10,84.00L556.02,76.00L557.98,68.00L560.00,60.00Z","cx":480.0,"cy":92.0,"box":{"x":420.0,"y":65.0,"w":120.0,"h":54.0},"labelT":0.5},{"d":"M560.00,60.00L557.98,68.00L556.02,76.00L554.10,84.00L552.23,92.00L550.41,100.00L548.64,108.00L546.92,116.00L545.25,124.00L543.63,132.00L542.07,140.00L666.21,140.00L670.90,132.00L675.74,124.00L680.75,116.00L685.91,108.00L691.22,100.00L696.68,92.00L702.29,84.00L708.05,76.00L713.95,68.00L720.00,60.00Z","cx":631.03,"cy":88.0,"box":{"x":586.1,"y":63.0,"w":89.86,"h":50.0},"labelT":0.5},{"d":"M720.00,60.00L713.95,68.00L708.05,76.00L702.29,84.00L696.68,92.00L691.22,100.00L685.91,108.00L680.75,116.00L675.74,124.00L670.90,132.00L666.21,140.00L790.35,140.00L798.16,132.00L806.24,124.00L814.58,116.00L823.18,108.00L832.03,100.00L841.13,92.00L850.48,84.00L860.08,76.00L869.92,68.00L880.00,60.00Z","cx":773.11,"cy":84.0,"box":{"x":729.0,"y":63.0,"w":88.21,"h":42.0},"labelT":0.5},{"d":"M169.65,140.00L177.20,148.00L184.47,156.00L191.46,164.00L198.17,172.00L204.60,180.00L210.73,188.00L216.56,196.00L222.09,204.00L227.30,212.00L232.19,220.00L331.32,220.00L328.38,212.00L325.25,204.00L321.94,196.00L318.44,188.00L314.76,180.00L310.90,172.00L306.88,164.00L302.68,156.00L298.32,148.00L293.79,140.00Z","cx":250.49,"cy":168.0,"box":{"x":222.15,"y":143.0,"w":56.67,"h":50.0},"labelT":0.5},{"d":"M293.79,140.00L298.32,148.00L302.68,156.00L306.88,164.00L310.90,172.00L314.76,180.00L318.44,188.00L321.94,196.00L325.25,204.00L328.38,212.00L331.32,220.00L430.44,220.00L429.46,212.00L428.42,204.00L427.31,196.00L426.15,188.00L424.92,180.00L423.63,172.00L422.29,164.00L420.89,156.00L419.44,148.00L417.93,140.00Z","cx":362.12,"cy":172.0,"box":{"x":328.54,"y":145.0,"w":67.16,"h":54.0},"labelT":0.5},{"d":"M417.93,140.00L419.44,148.00L420.89,156.00L422.29,164.00L423.63,172.00L424.92,180.00L426.15,188.00L427.31,196.00L428.42,204.00L429.46,212.00L430.44,220.00L529.56,220.00L530.54,212.00L531.58,204.00L532.69,196.00L533.85,188.00L535.08,180.00L536.37,172.00L537.71,164.00L539.11,156.00L540.56,148.00L542.07,140.00Z","cx":480.0,"cy":172.0,"box":{"x":434.34,"y":145.0,"w":91.31,"h":54.0},"labelT":0.5},{"d":"M542.07,140.00L540.56,148.00L539.11,156.00L537.71,164.00L536.37,172.00L535.08,180.00L533.85,188.00L532.69,196.00L531.58,204.00L530.54,212.00L529.56,220.00L628.68,220.00L631.62,212.00L634.75,204.00L638.06,196.00L641.56,188.00L645.24,180.00L649.10,172.00L653.12,164.00L657.32,156.00L661.68,148.00L666.21,140.00Z","cx":597.89,"cy":172.0,"box":{"x":564.31,"y":145.0,"w":67.16,"h":54.0},"labelT":0.5},{"d":"M666.21,140.00L661.68,148.00L657.32,156.00L653.12,164.00L649.10,172.00L645.24,180.00L641.56,188.00L638.06,196.00L634.75,204.00L631.62,212.00L628.68,220.00L727.81,220.00L732.70,212.00L737.91,204.00L743.44,196.00L749.27,188.00L755.40,180.00L761.83,172.00L768.54,164.00L775.53,156.00L782.80,148.00L790.35,140.00Z","cx":709.51,"cy":168.0,"box":{"x":681.18,"y":143.0,"w":56.67,"h":50.0},"labelT":0.5},{"d":"M232.19,220.00L236.75,228.00L240.97,236.00L244.84,244.00L248.33,252.00L251.44,260.00L254.14,268.00L256.41,276.00L258.20,284.00L259.45,292.00L260.00,300.00L348.00,300.00L347.67,292.00L346.92,284.00L345.85,276.00L344.49,268.00L342.86,260.00L341.00,252.00L338.90,244.00L336.58,236.00L334.05,228.00L331.32,220.00Z","cx":290.1,"cy":252.0,"box":{"x":262.25,"y":225.0,"w":55.69,"h":54.0},"labelT":0.5},{"d":"M331.32,220.00L334.05,228.00L336.58,236.00L338.90,244.00L341.00,252.00L342.86,260.00L344.49,268.00L345.85,276.00L346.92,284.00L347.67,292.00L348.00,300.00L436.00,300.00L435.89,292.00L435.64,284.00L435.28,276.00L434.83,268.00L434.29,260.00L433.67,252.00L432.97,244.00L432.19,236.00L431.35,228.00L430.44,220.00Z","cx":383.66,"cy":252.0,"box":{"x":351.02,"y":225.0,"w":65.28,"h":54.0},"labelT":0.5},{"d":"M430.44,220.00L431.35,228.00L432.19,236.00L432.97,244.00L433.67,252.00L434.29,260.00L434.83,268.00L435.28,276.00L435.64,284.00L435.89,292.00L436.00,300.00L524.00,300.00L524.11,292.00L524.36,284.00L524.72,276.00L525.17,268.00L525.71,260.00L526.33,252.00L527.03,244.00L527.81,236.00L528.65,228.00L529.56,220.00Z","cx":480.0,"cy":252.0,"box":{"x":441.87,"y":225.0,"w":76.25,"h":54.0},"labelT":0.5},{"d":"M529.56,220.00L528.65,228.00L527.81,236.00L527.03,244.00L526.33,252.00L525.71,260.00L525.17,268.00L524.72,276.00L524.36,284.00L524.11,292.00L524.00,300.00L612.00,300.00L612.33,292.00L613.08,284.00L614.15,276.00L615.51,268.00L617.14,260.00L619.00,252.00L621.10,244.00L623.42,236.00L625.95,228.00L628.68,220.00Z","cx":576.34,"cy":252.0,"box":{"x":543.7,"y":225.0,"w":65.28,"h":54.0},"labelT":0.5},{"d":"M628.68,220.00L625.95,228.00L623.42,236.00L621.10,244.00L619.00,252.00L617.14,260.00L615.51,268.00L614.15,276.00L613.08,284.00L612.33,292.00L612.00,300.00L700.00,300.00L700.55,292.00L701.80,284.00L703.59,276.00L705.86,268.00L708.56,260.00L711.67,252.00L715.16,244.00L719.03,236.00L723.25,228.00L727.81,220.00Z","cx":669.9,"cy":252.0,"box":{"x":642.06,"y":225.0,"w":55.69,"h":54.0},"labelT":0.5},{"d":"M260.00,300.00L259.45,308.00L258.20,316.00L256.41,324.00L254.14,332.00L251.44,340.00L248.33,348.00L244.84,356.00L240.97,364.00L236.75,372.00L232.19,380.00L331.32,380.00L334.05,372.00L336.58,364.00L338.90,356.00L341.00,348.00L342.86,340.00L344.49,332.00L345.85,324.00L346.92,316.00L347.67,308.00L348.00,300.00Z","cx":290.1,"cy":348.0,"box":{"x":262.25,"y":321.0,"w":55.69,"h":54.0},"labelT":0.5},{"d":"M348.00,300.00L347.67,308.00L346.92,316.00L345.85,324.00L344.49,332.00L342.86,340.00L341.00,348.00L338.90,356.00L336.58,364.00L334.05,372.00L331.32,380.00L430.44,380.00L431.35,372.00L432.19,364.00L432.97,356.00L433.67,348.00L434.29,340.00L434.83,332.00L435.28,324.00L435.64,316.00L435.89,308.00L436.00,300.00Z","cx":383.66,"cy":348.0,"box":{"x":351.02,"y":321.0,"w":65.28,"h":54.0},"labelT":0.5},{"d":"M436.00,300.00L435.89,308.00L435.64,316.00L435.28,324.00L434.83,332.00L434.29,340.00L433.67,348.00L432.97,356.00L432.19,364.00L431.35,372.00L430.44,380.00L529.56,380.00L528.65,372.00L527.81,364.00L527.03,356.00L526.33,348.00L525.71,340.00L525.17,332.00L524.72,324.00L524.36,316.00L524.11,308.00L524.00,300.00Z","cx":480.0,"cy":332.0,"box":{"x":441.87,"y":305.0,"w":76.25,"h":54.0},"labelT":0.5},{"d":"M524.00,300.00L524.11,308.00L524.36,316.00L524.72,324.00L525.17,332.00L525.71,340.00L526.33,348.00L527.03,356.00L527.81,364.00L528.65,372.00L529.56,380.00L628.68,380.00L625.95,372.00L623.42,364.00L621.10,356.00L619.00,348.00L617.14,340.00L615.51,332.00L614.15,324.00L613.08,316.00L612.33,308.00L612.00,300.00Z","cx":576.34,"cy":348.0,"box":{"x":543.7,"y":321.0,"w":65.28,"h":54.0},"labelT":0.5},{"d":"M612.00,300.00L612.33,308.00L613.08,316.00L614.15,324.00L615.51,332.00L617.14,340.00L619.00,348.00L621.10,356.00L623.42,364.00L625.95,372.00L628.68,380.00L727.81,380.00L723.25,372.00L719.03,364.00L715.16,356.00L711.67,348.00L708.56,340.00L705.86,332.00L703.59,324.00L701.80,316.00L700.55,308.00L700.00,300.00Z","cx":669.9,"cy":348.0,"box":{"x":642.06,"y":321.0,"w":55.69,"h":54.0},"labelT":0.5},{"d":"M232.19,380.00L227.30,388.00L222.09,396.00L216.56,404.00L210.73,412.00L204.60,420.00L198.17,428.00L191.46,436.00L184.47,444.00L177.20,452.00L169.65,460.00L293.79,460.00L298.32,452.00L302.68,444.00L306.88,436.00L310.90,428.00L314.76,420.00L318.44,412.00L321.94,404.00L325.25,396.00L328.38,388.00L331.32,380.00Z","cx":250.48,"cy":436.0,"box":{"x":214.07,"y":417.0,"w":72.83,"h":38.0},"labelT":0.5},{"d":"M331.32,380.00L328.38,388.00L325.25,396.00L321.94,404.00L318.44,412.00L314.76,420.00L310.90,428.00L306.88,436.00L302.68,444.00L298.32,452.00L293.79,460.00L417.93,460.00L419.44,452.00L420.89,444.00L422.29,436.00L423.63,428.00L424.92,420.00L426.15,412.00L427.31,404.00L428.42,396.00L429.46,388.00L430.44,380.00Z","cx":362.12,"cy":428.0,"box":{"x":328.54,"y":401.0,"w":67.16,"h":54.0},"labelT":0.5},{"d":"M430.44,380.00L429.46,388.00L428.42,396.00L427.31,404.00L426.15,412.00L424.92,420.00L423.63,428.00L422.29,436.00L420.89,444.00L419.44,452.00L417.93,460.00L542.07,460.00L540.56,452.00L539.11,444.00L537.71,436.00L536.37,428.00L535.08,420.00L533.85,412.00L532.69,404.00L531.58,396.00L530.54,388.00L529.56,380.00Z","cx":480.0,"cy":412.0,"box":{"x":434.34,"y":385.0,"w":91.31,"h":54.0},"labelT":0.5},{"d":"M529.56,380.00L530.54,388.00L531.58,396.00L532.69,404.00L533.85,412.00L535.08,420.00L536.37,428.00L537.71,436.00L539.11,444.00L540.56,452.00L542.07,460.00L666.21,460.00L661.68,452.00L657.32,444.00L653.12,436.00L649.10,428.00L645.24,420.00L641.56,412.00L638.06,404.00L634.75,396.00L631.62,388.00L628.68,380.00Z","cx":597.89,"cy":428.0,"box":{"x":564.31,"y":401.0,"w":67.16,"h":54.0},"labelT":0.5},{"d":"M628.68,380.00L631.62,388.00L634.75,396.00L638.06,404.00L641.56,412.00L645.24,420.00L649.10,428.00L653.12,436.00L657.32,444.00L661.68,452.00L666.21,460.00L790.35,460.00L782.80,452.00L775.53,444.00L768.54,436.00L761.83,428.00L755.40,420.00L749.27,412.00L743.44,404.00L737.91,396.00L732.70,388.00L727.81,380.00Z","cx":709.51,"cy":436.0,"box":{"x":673.1,"y":417.0,"w":72.83,"h":38.0},"labelT":0.5},{"d":"M169.65,460.00L161.84,468.00L153.76,476.00L145.42,484.00L136.82,492.00L127.97,500.00L118.87,508.00L109.52,516.00L99.92,524.00L90.08,532.00L80.00,540.00L240.00,540.00L246.05,532.00L251.95,524.00L257.71,516.00L263.32,508.00L268.78,500.00L274.09,492.00L279.25,484.00L284.26,476.00L289.10,468.00L293.79,460.00Z","cx":186.9,"cy":512.0,"box":{"x":148.14,"y":489.0,"w":77.52,"h":46.0},"labelT":0.5},{"d":"M293.79,460.00L289.10,468.00L284.26,476.00L279.25,484.00L274.09,492.00L268.78,500.00L263.32,508.00L257.71,516.00L251.95,524.00L246.05,532.00L240.00,540.00L400.00,540.00L402.02,532.00L403.98,524.00L405.90,516.00L407.77,508.00L409.59,500.00L411.36,492.00L413.08,484.00L414.75,476.00L416.37,468.00L417.93,460.00Z","cx":328.97,"cy":508.0,"box":{"x":288.48,"y":481.0,"w":80.97,"h":54.0},"labelT":0.5},{"d":"M417.93,460.00L416.37,468.00L414.75,476.00L413.08,484.00L411.36,492.00L409.59,500.00L407.77,508.00L405.90,516.00L403.98,524.00L402.02,532.00L400.00,540.00L560.00,540.00L557.98,532.00L556.02,524.00L554.10,516.00L552.23,508.00L550.41,500.00L548.64,492.00L546.92,484.00L545.25,476.00L543.63,468.00L542.07,460.00Z","cx":480.0,"cy":500.0,"box":{"x":420.0,"y":473.0,"w":120.0,"h":54.0},"labelT":0.5},{"d":"M542.07,460.00L543.63,468.00L545.25,476.00L546.92,484.00L548.64,492.00L550.41,500.00L552.23,508.00L554.10,516.00L556.02,524.00L557.98,532.00L560.00,540.00L720.00,540.00L713.95,532.00L708.05,524.00L702.29,516.00L696.68,508.00L691.22,500.00L685.91,492.00L680.75,484.00L675.74,476.00L670.90,468.00L666.21,460.00Z","cx":631.03,"cy":508.0,"box":{"x":590.55,"y":481.0,"w":80.97,"h":54.0},"labelT":0.5},{"d":"M666.21,460.00L670.90,468.00L675.74,476.00L680.75,484.00L685.91,492.00L691.22,500.00L696.68,508.00L702.29,516.00L708.05,524.00L713.95,532.00L720.00,540.00L880.00,540.00L869.92,532.00L860.08,524.00L850.48,516.00L841.13,508.00L832.03,500.00L823.18,492.00L814.58,484.00L806.24,476.00L798.16,468.00L790.35,460.00Z","cx":773.11,"cy":512.0,"box":{"x":734.35,"y":489.0,"w":77.52,"h":46.0},"labelT":0.5}],"bounds":{"x":80.0,"y":60.0,"width":800.0,"height":480.0}},"compact":{"cells":[{"d":"M80.00,60.00L95.03,72.00L109.52,84.00L123.45,96.00L136.82,108.00L149.62,120.00L161.84,132.00L173.46,144.00L184.47,156.00L194.85,168.00L204.60,180.00L388.20,180.00L384.95,168.00L381.49,156.00L377.82,144.00L373.95,132.00L369.87,120.00L365.61,108.00L361.15,96.00L356.51,84.00L351.68,72.00L346.67,60.00Z","cx":234.09,"cy":96.0,"box":{"x":168.75,"y":63.0,"w":130.69,"h":66.0},"labelT":0.5},{"d":"M346.67,60.00L351.68,72.00L356.51,84.00L361.15,96.00L365.61,108.00L369.87,120.00L373.95,132.00L377.82,144.00L381.49,156.00L384.95,168.00L388.20,180.00L571.80,180.00L575.05,168.00L578.51,156.00L582.18,144.00L586.05,132.00L590.13,120.00L594.39,108.00L598.85,96.00L603.49,84.00L608.32,72.00L613.33,60.00Z","cx":480.0,"cy":108.0,"box":{"x":390.67,"y":66.0,"w":178.67,"h":84.0},"labelT":0.5},{"d":"M613.33,60.00L608.32,72.00L603.49,84.00L598.85,96.00L594.39,108.00L590.13,120.00L586.05,132.00L582.18,144.00L578.51,156.00L575.05,168.00L571.80,180.00L755.40,180.00L765.15,168.00L775.53,156.00L786.54,144.00L798.16,132.00L810.38,120.00L823.18,108.00L836.55,96.00L850.48,84.00L864.97,72.00L880.00,60.00Z","cx":725.9,"cy":96.0,"box":{"x":660.56,"y":63.0,"w":130.69,"h":66.0},"labelT":0.5},{"d":"M204.60,180.00L213.68,192.00L222.09,204.00L229.79,216.00L236.75,228.00L242.95,240.00L248.33,252.00L252.84,264.00L256.41,276.00L258.89,288.00L260.00,300.00L406.67,300.00L406.30,288.00L405.47,276.00L404.28,264.00L402.78,252.00L400.98,240.00L398.92,228.00L396.60,216.00L394.03,204.00L391.23,192.00L388.20,180.00Z","cx":305.63,"cy":222.0,"box":{"x":259.12,"y":183.0,"w":93.03,"h":78.0},"labelT":0.5},{"d":"M388.20,180.00L391.23,192.00L394.03,204.00L396.60,216.00L398.92,228.00L400.98,240.00L402.78,252.00L404.28,264.00L405.47,276.00L406.30,288.00L406.67,300.00L553.33,300.00L553.70,288.00L554.53,276.00L555.72,264.00L557.22,252.00L559.02,240.00L561.08,228.00L563.40,216.00L565.97,204.00L568.77,192.00L571.80,180.00Z","cx":480.0,"cy":228.0,"box":{"x":410.56,"y":186.0,"w":138.88,"h":84.0},"labelT":0.5},{"d":"M571.80,180.00L568.77,192.00L565.97,204.00L563.40,216.00L561.08,228.00L559.02,240.00L557.22,252.00L555.72,264.00L554.53,276.00L553.70,288.00L553.33,300.00L700.00,300.00L701.11,288.00L703.59,276.00L707.16,264.00L711.67,252.00L717.05,240.00L723.25,228.00L730.21,216.00L737.91,204.00L746.32,192.00L755.40,180.00Z","cx":654.37,"cy":222.0,"box":{"x":607.85,"y":183.0,"w":93.03,"h":78.0},"labelT":0.5},{"d":"M260.00,300.00L258.89,312.00L256.41,324.00L252.84,336.00L248.33,348.00L242.95,360.00L236.75,372.00L229.79,384.00L222.09,396.00L213.68,408.00L204.60,420.00L388.20,420.00L391.23,408.00L394.03,396.00L396.60,384.00L398.92,372.00L400.98,360.00L402.78,348.00L404.28,336.00L405.47,324.00L406.30,312.00L406.67,300.00Z","cx":305.63,"cy":372.0,"box":{"x":259.12,"y":333.0,"w":93.03,"h":78.0},"labelT":0.5},{"d":"M406.67,300.00L406.30,312.00L405.47,324.00L404.28,336.00L402.78,348.00L400.98,360.00L398.92,372.00L396.60,384.00L394.03,396.00L391.23,408.00L388.20,420.00L571.80,420.00L568.77,408.00L565.97,396.00L563.40,384.00L561.08,372.00L559.02,360.00L557.22,348.00L555.72,336.00L554.53,324.00L553.70,312.00L553.33,300.00Z","cx":480.0,"cy":354.0,"box":{"x":410.56,"y":312.0,"w":138.88,"h":84.0},"labelT":0.5},{"d":"M553.33,300.00L553.70,312.00L554.53,324.00L555.72,336.00L557.22,348.00L559.02,360.00L561.08,372.00L563.40,384.00L565.97,396.00L568.77,408.00L571.80,420.00L755.40,420.00L746.32,408.00L737.91,396.00L730.21,384.00L723.25,372.00L717.05,360.00L711.67,348.00L707.16,336.00L703.59,324.00L701.11,312.00L700.00,300.00Z","cx":654.37,"cy":372.0,"box":{"x":607.85,"y":333.0,"w":93.03,"h":78.0},"labelT":0.5},{"d":"M204.60,420.00L194.85,432.00L184.47,444.00L173.46,456.00L161.84,468.00L149.62,480.00L136.82,492.00L123.45,504.00L109.52,516.00L95.03,528.00L80.00,540.00L346.67,540.00L351.68,528.00L356.51,516.00L361.15,504.00L365.61,492.00L369.87,480.00L373.95,468.00L377.82,456.00L381.49,444.00L384.95,432.00L388.20,420.00Z","cx":234.1,"cy":498.0,"box":{"x":176.46,"y":462.0,"w":115.28,"h":72.0},"labelT":0.5},{"d":"M388.20,420.00L384.95,432.00L381.49,444.00L377.82,456.00L373.95,468.00L369.87,480.00L365.61,492.00L361.15,504.00L356.51,516.00L351.68,528.00L346.67,540.00L613.33,540.00L608.32,528.00L603.49,516.00L598.85,504.00L594.39,492.00L590.13,480.00L586.05,468.00L582.18,456.00L578.51,444.00L575.05,432.00L571.80,420.00Z","cx":480.0,"cy":474.0,"box":{"x":390.67,"y":432.0,"w":178.67,"h":84.0},"labelT":0.5},{"d":"M571.80,420.00L575.05,432.00L578.51,444.00L582.18,456.00L586.05,468.00L590.13,480.00L594.39,492.00L598.85,504.00L603.49,516.00L608.32,528.00L613.33,540.00L880.00,540.00L864.97,528.00L850.48,516.00L836.55,504.00L823.18,492.00L810.38,480.00L798.16,468.00L786.54,456.00L775.53,444.00L765.15,432.00L755.40,420.00Z","cx":725.9,"cy":498.0,"box":{"x":668.26,"y":462.0,"w":115.28,"h":72.0},"labelT":0.5}],"bounds":{"x":80.0,"y":60.0,"width":800.0,"height":480.0}}},"ondas":{"wide":{"cells":[{"d":"M90,70L96.21,70L102.41,70L108.62,70L114.83,70L121.03,70L127.24,70L133.45,70L139.66,70L145.86,70L152.07,70L158.28,70L164.48,70L170.69,70L176.9,70L183.1,70L189.31,70L189.31,190.68L183.1,190.51L176.9,190.23L170.69,189.84L164.48,189.32L158.28,188.7L152.07,187.98L145.86,187.15L139.66,186.23L133.45,185.23L127.24,184.15L121.03,183L114.83,181.78L108.62,180.51L102.41,179.2L96.21,177.84L90,176.46Z","cx":139.66,"cy":127.61,"box":{"x":96,"y":95.61,"w":87.31,"h":64},"labelT":0.489},{"d":"M189.31,70L199.35,70L209.4,70L219.44,70L229.48,70L239.53,70L249.57,70L259.61,70L269.66,70L279.7,70L289.74,70L299.78,70L309.83,70L319.87,70L329.91,70L339.96,70L350,70L350,161.55L339.96,164.17L329.91,166.85L319.87,169.56L309.83,172.25L299.78,174.89L289.74,177.43L279.7,179.84L269.66,182.09L259.61,184.13L249.57,185.94L239.53,187.49L229.48,188.75L219.44,189.71L209.4,190.35L199.35,190.68L189.31,190.68Z","cx":269.66,"cy":124.89,"box":{"x":195.31,"y":92.89,"w":148.69,"h":64},"labelT":0.477},{"d":"M350,70L356.21,70L362.41,70L368.62,70L374.83,70L381.03,70L387.24,70L393.45,70L399.66,70L405.86,70L412.07,70L418.28,70L424.48,70L430.69,70L436.9,70L443.1,70L449.31,70L449.31,144.53L443.1,144.99L436.9,145.53L430.69,146.15L424.48,146.87L418.28,147.66L412.07,148.55L405.86,149.52L399.66,150.57L393.45,151.7L387.24,152.92L381.03,154.2L374.83,155.56L368.62,156.98L362.41,158.45L356.21,159.98L350,161.55Z","cx":399.66,"cy":109.19,"box":{"x":356,"y":77.19,"w":87.31,"h":64},"labelT":0.464},{"d":"M449.31,70L459.35,70L469.4,70L479.44,70L489.48,70L499.53,70L509.57,70L519.61,70L529.66,70L539.7,70L549.74,70L559.78,70L569.83,70L579.87,70L589.91,70L599.96,70L610,70L610,147.99L599.96,147.65L589.91,147.26L579.87,146.84L569.83,146.38L559.78,145.9L549.74,145.41L539.7,144.93L529.66,144.48L519.61,144.07L509.57,143.74L499.53,143.5L489.48,143.39L479.44,143.41L469.4,143.6L459.35,143.96L449.31,144.53Z","cx":529.66,"cy":107.56,"box":{"x":455.31,"y":75.56,"w":148.69,"h":64},"labelT":0.491},{"d":"M610,70L616.21,70L622.41,70L628.62,70L634.83,70L641.03,70L647.24,70L653.45,70L659.66,70L665.86,70L672.07,70L678.28,70L684.48,70L690.69,70L696.9,70L703.1,70L709.31,70L709.31,150.79L703.1,150.5L696.9,150.24L690.69,150.01L684.48,149.81L678.28,149.63L672.07,149.48L665.86,149.33L659.66,149.2L653.45,149.06L647.24,148.93L641.03,148.8L634.83,148.66L628.62,148.51L622.41,148.35L616.21,148.18L610,147.99Z","cx":659.66,"cy":109.63,"box":{"x":616,"y":77.63,"w":87.31,"h":64},"labelT":0.495},{"d":"M709.31,70L719.35,70L729.4,70L739.44,70L749.48,70L759.53,70L769.57,70L779.61,70L789.66,70L799.7,70L809.74,70L819.78,70L829.83,70L839.87,70L849.91,70L859.96,70L870,70L870,176.46L859.96,174.18L849.91,171.89L839.87,169.6L829.83,167.37L819.78,165.21L809.74,163.16L799.7,161.22L789.66,159.43L779.61,157.8L769.57,156.32L759.53,155.01L749.48,153.87L739.44,152.88L729.4,152.05L719.35,151.36L709.31,150.79Z","cx":789.66,"cy":115.55,"box":{"x":715.31,"y":83.55,"w":148.69,"h":64},"labelT":0.464},{"d":"M90,176.46L96.21,177.84L102.41,179.2L108.62,180.51L114.83,181.78L121.03,183L127.24,184.15L133.45,185.23L139.66,186.23L145.86,187.15L152.07,187.98L158.28,188.7L164.48,189.32L170.69,189.84L176.9,190.23L183.1,190.51L189.31,190.68L189.31,273.06L183.1,273.51L176.9,273.88L170.69,274.16L164.48,274.36L158.28,274.47L152.07,274.51L145.86,274.48L139.66,274.38L133.45,274.22L127.24,274L121.03,273.74L114.83,273.43L108.62,273.08L102.41,272.7L96.21,272.29L90,271.86Z","cx":139.66,"cy":229.44,"box":{"x":96,"y":197.44,"w":87.31,"h":64},"labelT":0.52},{"d":"M189.31,190.68L199.35,190.68L209.4,190.35L219.44,189.71L229.48,188.75L239.53,187.49L249.57,185.94L259.61,184.13L269.66,182.09L279.7,179.84L289.74,177.43L299.78,174.89L309.83,172.25L319.87,169.56L329.91,166.85L339.96,164.17L350,161.55L350,237.61L339.96,240.12L329.91,242.76L319.87,245.5L309.83,248.28L299.78,251.07L289.74,253.83L279.7,256.53L269.66,259.12L259.61,261.58L249.57,263.87L239.53,265.97L229.48,267.86L219.44,269.52L209.4,270.94L199.35,272.12L189.31,273.06Z","cx":269.39,"cy":214.74,"box":{"x":195.31,"y":194.74,"w":148.16,"h":40},"labelT":0.488},{"d":"M350,161.55L356.21,159.98L362.41,158.45L368.62,156.98L374.83,155.56L381.03,154.2L387.24,152.92L393.45,151.7L399.66,150.57L405.86,149.52L412.07,148.55L418.28,147.66L424.48,146.87L430.69,146.15L436.9,145.53L443.1,144.99L449.31,144.53L449.31,225.93L443.1,225.8L436.9,225.79L430.69,225.89L424.48,226.12L418.28,226.47L412.07,226.95L405.86,227.54L399.66,228.25L393.45,229.07L387.24,230.01L381.03,231.05L374.83,232.19L368.62,233.42L362.41,234.74L356.21,236.14L350,237.61Z","cx":399.66,"cy":193.33,"box":{"x":356,"y":165.33,"w":87.31,"h":56},"labelT":0.512},{"d":"M449.31,144.53L459.35,143.96L469.4,143.6L479.44,143.41L489.48,143.39L499.53,143.5L509.57,143.74L519.61,144.07L529.66,144.48L539.7,144.93L549.74,145.41L559.78,145.9L569.83,146.38L579.87,146.84L589.91,147.26L599.96,147.65L610,147.99L610,252.53L599.96,250.74L589.91,248.83L579.87,246.84L569.83,244.77L559.78,242.67L549.74,240.55L539.7,238.45L529.66,236.4L519.61,234.44L509.57,232.61L499.53,230.93L489.48,229.44L479.44,228.17L469.4,227.14L459.35,226.39L449.31,225.93Z","cx":529.66,"cy":190.63,"box":{"x":455.31,"y":158.63,"w":148.69,"h":64},"labelT":0.466},{"d":"M610,147.99L616.21,148.18L622.41,148.35L628.62,148.51L634.83,148.66L641.03,148.8L647.24,148.93L653.45,149.06L659.66,149.2L665.86,149.33L672.07,149.48L678.28,149.63L684.48,149.81L690.69,150.01L696.9,150.24L703.1,150.5L709.31,150.79L709.31,263.01L703.1,262.69L696.9,262.33L690.69,261.94L684.48,261.52L678.28,261.05L672.07,260.54L665.86,259.98L659.66,259.37L653.45,258.71L647.24,257.99L641.03,257.22L634.83,256.39L628.62,255.5L622.41,254.56L616.21,253.57L610,252.53Z","cx":659.66,"cy":204.01,"box":{"x":616,"y":172.01,"w":87.31,"h":64},"labelT":0.494},{"d":"M709.31,150.79L719.35,151.36L729.4,152.05L739.44,152.88L749.48,153.87L759.53,155.01L769.57,156.32L779.61,157.8L789.66,159.43L799.7,161.22L809.74,163.16L819.78,165.21L829.83,167.37L839.87,169.6L849.91,171.89L859.96,174.18L870,176.46L870,271.86L859.96,271.14L849.91,270.4L839.87,269.67L829.83,268.95L819.78,268.26L809.74,267.62L799.7,267.02L789.66,266.48L779.61,265.98L769.57,265.52L759.53,265.1L749.48,264.71L739.44,264.31L729.4,263.91L719.35,263.49L709.31,263.01Z","cx":789.66,"cy":214,"box":{"x":715.31,"y":182,"w":148.69,"h":64},"labelT":0.511},{"d":"M90,271.86L96.21,272.29L102.41,272.7L108.62,273.08L114.83,273.43L121.03,273.74L127.24,274L133.45,274.22L139.66,274.38L145.86,274.48L152.07,274.51L158.28,274.47L164.48,274.36L170.69,274.16L176.9,273.88L183.1,273.51L189.31,273.06L189.31,345.96L183.1,346.48L176.9,346.98L170.69,347.44L164.48,347.88L158.28,348.31L152.07,348.71L145.86,349.1L139.66,349.49L133.45,349.87L127.24,350.26L121.03,350.64L114.83,351.04L108.62,351.45L102.41,351.88L96.21,352.32L90,352.79Z","cx":139.66,"cy":310.88,"box":{"x":96,"y":278.88,"w":87.31,"h":64},"labelT":0.491},{"d":"M189.31,273.06L199.35,272.12L209.4,270.94L219.44,269.52L229.48,267.86L239.53,265.97L249.57,263.87L259.61,261.58L269.66,259.12L279.7,256.53L289.74,253.83L299.78,251.07L309.83,248.28L319.87,245.5L329.91,242.76L339.96,240.12L350,237.61L350,323.02L339.96,324.35L329.91,325.81L319.87,327.38L309.83,329.02L299.78,330.71L289.74,332.42L279.7,334.11L269.66,335.77L259.61,337.37L249.57,338.9L239.53,340.33L229.48,341.67L219.44,342.9L209.4,344.02L199.35,345.04L189.31,345.96Z","cx":269.66,"cy":296.43,"box":{"x":195.31,"y":276.43,"w":148.69,"h":40},"labelT":0.521},{"d":"M350,237.61L356.21,236.14L362.41,234.74L368.62,233.42L374.83,232.19L381.03,231.05L387.24,230.01L393.45,229.07L399.66,228.25L405.86,227.54L412.07,226.95L418.28,226.47L424.48,226.12L430.69,225.89L436.9,225.79L443.1,225.8L449.31,225.93L449.31,322.74L443.1,321.94L436.9,321.25L430.69,320.68L424.48,320.21L418.28,319.87L412.07,319.64L405.86,319.52L399.66,319.52L393.45,319.62L387.24,319.83L381.03,320.14L374.83,320.55L368.62,321.05L362.41,321.63L356.21,322.29L350,323.02Z","cx":399.66,"cy":275.19,"box":{"x":356,"y":243.19,"w":87.31,"h":64},"labelT":0.504},{"d":"M449.31,225.93L459.35,226.39L469.4,227.14L479.44,228.17L489.48,229.44L499.53,230.93L509.57,232.61L519.61,234.44L529.66,236.4L539.7,238.45L549.74,240.55L559.78,242.67L569.83,244.77L579.87,246.84L589.91,248.83L599.96,250.74L610,252.53L610,362.19L599.96,360.06L589.91,357.72L579.87,355.21L569.83,352.54L559.78,349.76L549.74,346.9L539.7,344L529.66,341.11L519.61,338.27L509.57,335.51L499.53,332.88L489.48,330.4L479.44,328.13L469.4,326.07L459.35,324.27L449.31,322.74Z","cx":526.16,"cy":286.28,"box":{"x":455.31,"y":254.28,"w":141.7,"h":64},"labelT":0.461},{"d":"M610,252.53L616.21,253.57L622.41,254.56L628.62,255.5L634.83,256.39L641.03,257.22L647.24,257.99L653.45,258.71L659.66,259.37L665.86,259.98L672.07,260.54L678.28,261.05L684.48,261.52L690.69,261.94L696.9,262.33L703.1,262.69L709.31,263.01L709.31,369.3L703.1,369.58L696.9,369.77L690.69,369.88L684.48,369.9L678.28,369.82L672.07,369.65L665.86,369.37L659.66,368.99L653.45,368.5L647.24,367.91L641.03,367.21L634.83,366.41L628.62,365.5L622.41,364.5L616.21,363.39L610,362.19Z","cx":659.66,"cy":313.26,"box":{"x":616,"y":281.26,"w":87.31,"h":64},"labelT":0.509},{"d":"M709.31,263.01L719.35,263.49L729.4,263.91L739.44,264.31L749.48,264.71L759.53,265.1L769.57,265.52L779.61,265.98L789.66,266.48L799.7,267.02L809.74,267.62L819.78,268.26L829.83,268.95L839.87,269.67L849.91,270.4L859.96,271.14L870,271.86L870,352.79L859.96,353.59L849.91,354.47L839.87,355.42L829.83,356.44L819.78,357.53L809.74,358.68L799.7,359.88L789.66,361.12L779.61,362.36L769.57,363.59L759.53,364.79L749.48,365.93L739.44,366.98L729.4,367.91L719.35,368.69L709.31,369.3Z","cx":789.66,"cy":314.03,"box":{"x":715.31,"y":282.03,"w":148.69,"h":64},"labelT":0.49},{"d":"M90,352.79L96.21,352.32L102.41,351.88L108.62,351.45L114.83,351.04L121.03,350.64L127.24,350.26L133.45,349.87L139.66,349.49L145.86,349.1L152.07,348.71L158.28,348.31L164.48,347.88L170.69,347.44L176.9,346.98L183.1,346.48L189.31,345.96L189.31,421.55L183.1,421.46L176.9,421.39L170.69,421.35L164.48,421.35L158.28,421.39L152.07,421.48L145.86,421.62L139.66,421.81L133.45,422.07L127.24,422.39L121.03,422.78L114.83,423.24L108.62,423.78L102.41,424.39L96.21,425.08L90,425.85Z","cx":139.66,"cy":385.99,"box":{"x":96,"y":357.99,"w":87.31,"h":56},"labelT":0.501},{"d":"M189.31,345.96L199.35,345.04L209.4,344.02L219.44,342.9L229.48,341.67L239.53,340.33L249.57,338.9L259.61,337.37L269.66,335.77L279.7,334.11L289.74,332.42L299.78,330.71L309.83,329.02L319.87,327.38L329.91,325.81L339.96,324.35L350,323.02L350,423.46L339.96,423.36L329.91,423.31L319.87,423.29L309.83,423.29L299.78,423.29L289.74,423.27L279.7,423.23L269.66,423.15L259.61,423.03L249.57,422.87L239.53,422.67L229.48,422.45L219.44,422.21L209.4,421.97L199.35,421.75L189.31,421.55Z","cx":269.7,"cy":380.95,"box":{"x":195.4,"y":348.95,"w":148.6,"h":64},"labelT":0.539},{"d":"M350,323.02L356.21,322.29L362.41,321.63L368.62,321.05L374.83,320.55L381.03,320.14L387.24,319.83L393.45,319.62L399.66,319.52L405.86,319.52L412.07,319.64L418.28,319.87L424.48,320.21L430.69,320.68L436.9,321.25L443.1,321.94L449.31,322.74L449.31,431.3L443.1,430.32L436.9,429.41L430.69,428.57L424.48,427.81L418.28,427.11L412.07,426.49L405.86,425.93L399.66,425.44L393.45,425.01L387.24,424.64L381.03,424.33L374.83,424.07L368.62,423.86L362.41,423.69L356.21,423.55L350,423.46Z","cx":399.66,"cy":373.49,"box":{"x":356,"y":341.49,"w":87.31,"h":64},"labelT":0.491},{"d":"M449.31,322.74L459.35,324.27L469.4,326.07L479.44,328.13L489.48,330.4L499.53,332.88L509.57,335.51L519.61,338.27L529.66,341.11L539.7,344L549.74,346.9L559.78,349.76L569.83,352.54L579.87,355.21L589.91,357.72L599.96,360.06L610,362.19L610,464.69L599.96,463.38L589.91,461.81L579.87,460.01L569.83,458.01L559.78,455.85L549.74,453.55L539.7,451.17L529.66,448.73L519.61,446.28L509.57,443.85L499.53,441.47L489.48,439.17L479.44,436.98L469.4,434.93L459.35,433.03L449.31,431.3Z","cx":528.86,"cy":396.55,"box":{"x":456.75,"y":364.55,"w":144.22,"h":64},"labelT":0.508},{"d":"M610,362.19L616.21,363.39L622.41,364.5L628.62,365.5L634.83,366.41L641.03,367.21L647.24,367.91L653.45,368.5L659.66,368.99L665.86,369.37L672.07,369.65L678.28,369.82L684.48,369.9L690.69,369.88L696.9,369.77L703.1,369.58L709.31,369.3L709.31,461.15L703.1,462.22L696.9,463.2L690.69,464.07L684.48,464.84L678.28,465.5L672.07,466.03L665.86,466.45L659.66,466.75L653.45,466.92L647.24,466.97L641.03,466.89L634.83,466.69L628.62,466.36L622.41,465.92L616.21,465.36L610,464.69Z","cx":659.66,"cy":416.53,"box":{"x":616,"y":384.53,"w":87.31,"h":64},"labelT":0.509},{"d":"M709.31,369.3L719.35,368.69L729.4,367.91L739.44,366.98L749.48,365.93L759.53,364.79L769.57,363.59L779.61,362.36L789.66,361.12L799.7,359.88L809.74,358.68L819.78,357.53L829.83,356.44L839.87,355.42L849.91,354.47L859.96,353.59L870,352.79L870,425.85L859.96,427.27L849.91,428.89L839.87,430.7L829.83,432.7L819.78,434.86L809.74,437.17L799.7,439.6L789.66,442.12L779.61,444.69L769.57,447.28L759.53,449.86L749.48,452.38L739.44,454.81L729.4,457.1L719.35,459.23L709.31,461.15Z","cx":789.66,"cy":398.57,"box":{"x":715.31,"y":374.57,"w":148.69,"h":48},"labelT":0.461},{"d":"M90,425.85L96.21,425.08L102.41,424.39L108.62,423.78L114.83,423.24L121.03,422.78L127.24,422.39L133.45,422.07L139.66,421.81L145.86,421.62L152.07,421.48L158.28,421.39L164.48,421.35L170.69,421.35L176.9,421.39L183.1,421.46L189.31,421.55L189.31,530L183.1,530L176.9,530L170.69,530L164.48,530L158.28,530L152.07,530L145.86,530L139.66,530L133.45,530L127.24,530L121.03,530L114.83,530L108.62,530L102.41,530L96.21,530L90,530Z","cx":139.66,"cy":476.26,"box":{"x":96,"y":444.26,"w":87.31,"h":64},"labelT":0.503},{"d":"M189.31,421.55L199.35,421.75L209.4,421.97L219.44,422.21L229.48,422.45L239.53,422.67L249.57,422.87L259.61,423.03L269.66,423.15L279.7,423.23L289.74,423.27L299.78,423.29L309.83,423.29L319.87,423.29L329.91,423.31L339.96,423.36L350,423.46L350,530L339.96,530L329.91,530L319.87,530L309.83,530L299.78,530L289.74,530L279.7,530L269.66,530L259.61,530L249.57,530L239.53,530L229.48,530L219.44,530L209.4,530L199.35,530L189.31,530Z","cx":269.66,"cy":476.42,"box":{"x":195.31,"y":444.42,"w":148.69,"h":64},"labelT":0.503},{"d":"M350,423.46L356.21,423.55L362.41,423.69L368.62,423.86L374.83,424.07L381.03,424.33L387.24,424.64L393.45,425.01L399.66,425.44L405.86,425.93L412.07,426.49L418.28,427.11L424.48,427.81L430.69,428.57L436.9,429.41L443.1,430.32L449.31,431.3L449.31,530L443.1,530L436.9,530L430.69,530L424.48,530L418.28,530L412.07,530L405.86,530L399.66,530L393.45,530L387.24,530L381.03,530L374.83,530L368.62,530L362.41,530L356.21,530L350,530Z","cx":399.66,"cy":478.09,"box":{"x":356,"y":446.09,"w":87.31,"h":64},"labelT":0.506},{"d":"M449.31,431.3L459.35,433.03L469.4,434.93L479.44,436.98L489.48,439.17L499.53,441.47L509.57,443.85L519.61,446.28L529.66,448.73L539.7,451.17L549.74,453.55L559.78,455.85L569.83,458.01L579.87,460.01L589.91,461.81L599.96,463.38L610,464.69L610,530L599.96,530L589.91,530L579.87,530L569.83,530L559.78,530L549.74,530L539.7,530L529.66,530L519.61,530L509.57,530L499.53,530L489.48,530L479.44,530L469.4,530L459.35,530L449.31,530Z","cx":529.66,"cy":497,"box":{"x":455.31,"y":469,"w":148.69,"h":56},"labelT":0.583},{"d":"M610,464.69L616.21,465.36L622.41,465.92L628.62,466.36L634.83,466.69L641.03,466.89L647.24,466.97L653.45,466.92L659.66,466.75L665.86,466.45L672.07,466.03L678.28,465.5L684.48,464.84L690.69,464.07L696.9,463.2L703.1,462.22L709.31,461.15L709.31,530L703.1,530L696.9,530L690.69,530L684.48,530L678.28,530L672.07,530L665.86,530L659.66,530L653.45,530L647.24,530L641.03,530L634.83,530L628.62,530L622.41,530L616.21,530L610,530Z","cx":659.66,"cy":497.65,"box":{"x":616,"y":473.65,"w":87.31,"h":48},"labelT":0.515},{"d":"M709.31,461.15L719.35,459.23L729.4,457.1L739.44,454.81L749.48,452.38L759.53,449.86L769.57,447.28L779.61,444.69L789.66,442.12L799.7,439.6L809.74,437.17L819.78,434.86L829.83,432.7L839.87,430.7L849.91,428.89L859.96,427.27L870,425.85L870,530L859.96,530L849.91,530L839.87,530L829.83,530L819.78,530L809.74,530L799.7,530L789.66,530L779.61,530L769.57,530L759.53,530L749.48,530L739.44,530L729.4,530L719.35,530L709.31,530Z","cx":789.66,"cy":492.23,"box":{"x":715.31,"y":464.23,"w":148.69,"h":56},"labelT":0.569}],"bounds":{"x":90,"y":70,"width":780,"height":460}},"compact":{"cells":[{"d":"M90,70L99.31,70L108.62,70L117.93,70L127.24,70L136.55,70L145.86,70L155.17,70L164.48,70L173.79,70L183.1,70L192.41,70L201.73,70L211.04,70L220.35,70L229.66,70L238.97,70L238.97,248.9L229.66,250.06L220.35,250.97L211.04,251.6L201.73,251.96L192.41,252.04L183.1,251.85L173.79,251.38L164.48,250.66L155.17,249.68L145.86,248.48L136.55,247.08L127.24,245.48L117.93,243.73L108.62,241.85L99.31,239.86L90,237.79Z","cx":164.48,"cy":158.92,"box":{"x":96,"y":114.92,"w":136.97,"h":88},"labelT":0.494},{"d":"M238.97,70L254.03,70L269.1,70L284.16,70L299.23,70L314.29,70L329.35,70L344.42,70L359.48,70L374.55,70L389.61,70L404.68,70L419.74,70L434.81,70L449.87,70L464.94,70L480,70L480,204.74L464.94,205.07L449.87,205.83L434.81,207.06L419.74,208.8L404.68,211.05L389.61,213.78L374.55,216.95L359.48,220.5L344.42,224.33L329.35,228.34L314.29,232.39L299.23,236.36L284.16,240.12L269.1,243.54L254.03,246.5L238.97,248.9Z","cx":359.48,"cy":146.6,"box":{"x":244.97,"y":102.6,"w":229.03,"h":88},"labelT":0.464},{"d":"M480,70L489.31,70L498.62,70L507.93,70L517.24,70L526.55,70L535.86,70L545.17,70L554.48,70L563.79,70L573.1,70L582.41,70L591.73,70L601.04,70L610.35,70L619.66,70L628.97,70L628.97,209.85L619.66,209.61L610.35,209.33L601.04,209.02L591.73,208.67L582.41,208.28L573.1,207.87L563.79,207.43L554.48,206.98L545.17,206.53L535.86,206.09L526.55,205.68L517.24,205.32L507.93,205.03L498.62,204.82L489.31,204.72L480,204.74Z","cx":554.48,"cy":138.53,"box":{"x":486,"y":94.53,"w":136.97,"h":88},"labelT":0.495},{"d":"M628.97,70L644.03,70L659.1,70L674.16,70L689.23,70L704.29,70L719.35,70L734.42,70L749.48,70L764.55,70L779.61,70L794.68,70L809.74,70L824.81,70L839.87,70L854.94,70L870,70L870,237.79L854.94,234.37L839.87,230.94L824.81,227.61L809.74,224.49L794.68,221.64L779.61,219.13L764.55,216.98L749.48,215.2L734.42,213.78L719.35,212.69L704.29,211.88L689.23,211.29L674.16,210.86L659.1,210.52L644.03,210.2L628.97,209.85Z","cx":749.48,"cy":144.39,"box":{"x":634.97,"y":100.39,"w":229.03,"h":88},"labelT":0.472},{"d":"M90,237.79L99.31,239.86L108.62,241.85L117.93,243.73L127.24,245.48L136.55,247.08L145.86,248.48L155.17,249.68L164.48,250.66L173.79,251.38L183.1,251.85L192.41,252.04L201.73,251.96L211.04,251.6L220.35,250.97L229.66,250.06L238.97,248.9L238.97,388.75L229.66,390.49L220.35,392.05L211.04,393.39L201.73,394.53L192.41,395.46L183.1,396.18L173.79,396.7L164.48,397.02L155.17,397.17L145.86,397.15L136.55,396.98L127.24,396.67L117.93,396.25L108.62,395.75L99.31,395.16L90,394.53Z","cx":164.48,"cy":321.4,"box":{"x":96,"y":277.4,"w":136.97,"h":88},"labelT":0.512},{"d":"M238.97,248.9L254.03,246.5L269.1,243.54L284.16,240.12L299.23,236.36L314.29,232.39L329.35,228.34L344.42,224.33L359.48,220.5L374.55,216.95L389.61,213.78L404.68,211.05L419.74,208.8L434.81,207.06L449.87,205.83L464.94,205.07L480,204.74L480,350.9L464.94,349.44L449.87,348.62L434.81,348.48L419.74,349.05L404.68,350.33L389.61,352.3L374.55,354.91L359.48,358.06L344.42,361.65L329.35,365.58L314.29,369.71L299.23,373.89L284.16,378.01L269.1,381.93L254.03,385.54L238.97,388.75Z","cx":359.48,"cy":296.74,"box":{"x":244.97,"y":252.74,"w":229.03,"h":88},"labelT":0.5},{"d":"M480,204.74L489.31,204.72L498.62,204.82L507.93,205.03L517.24,205.32L526.55,205.68L535.86,206.09L545.17,206.53L554.48,206.98L563.79,207.43L573.1,207.87L582.41,208.28L591.73,208.67L601.04,209.02L610.35,209.33L619.66,209.61L628.97,209.85L628.97,378.22L619.66,376.8L610.35,375.25L601.04,373.6L591.73,371.85L582.41,370.02L573.1,368.12L563.79,366.18L554.48,364.21L545.17,362.25L535.86,360.32L526.55,358.45L517.24,356.66L507.93,354.99L498.62,353.45L489.31,352.08L480,350.9Z","cx":554.48,"cy":285.69,"box":{"x":486,"y":241.69,"w":136.97,"h":88},"labelT":0.483},{"d":"M628.97,209.85L644.03,210.2L659.1,210.52L674.16,210.86L689.23,211.29L704.29,211.88L719.35,212.69L734.42,213.78L749.48,215.2L764.55,216.98L779.61,219.13L794.68,221.64L809.74,224.49L824.81,227.61L839.87,230.94L854.94,234.37L870,237.79L870,394.53L854.94,393.44L839.87,392.33L824.81,391.27L809.74,390.29L794.68,389.41L779.61,388.65L764.55,387.98L749.48,387.37L734.42,386.78L719.35,386.15L704.29,385.42L689.23,384.51L674.16,383.38L659.1,381.98L644.03,380.26L628.97,378.22Z","cx":749.48,"cy":302.98,"box":{"x":634.97,"y":258.98,"w":229.03,"h":88},"labelT":0.502},{"d":"M90,394.53L99.31,395.16L108.62,395.75L117.93,396.25L127.24,396.67L136.55,396.98L145.86,397.15L155.17,397.17L164.48,397.02L173.79,396.7L183.1,396.18L192.41,395.46L201.73,394.53L211.04,393.39L220.35,392.05L229.66,390.49L238.97,388.75L238.97,530L229.66,530L220.35,530L211.04,530L201.73,530L192.41,530L183.1,530L173.79,530L164.48,530L155.17,530L145.86,530L136.55,530L127.24,530L117.93,530L108.62,530L99.31,530L90,530Z","cx":164.48,"cy":462.48,"box":{"x":96,"y":418.48,"w":136.97,"h":88},"labelT":0.511},{"d":"M238.97,388.75L254.03,385.54L269.1,381.93L284.16,378.01L299.23,373.89L314.29,369.71L329.35,365.58L344.42,361.65L359.48,358.06L374.55,354.91L389.61,352.3L404.68,350.33L419.74,349.05L434.81,348.48L449.87,348.62L464.94,349.44L480,350.9L480,530L464.94,530L449.87,530L434.81,530L419.74,530L404.68,530L389.61,530L374.55,530L359.48,530L344.42,530L329.35,530L314.29,530L299.23,530L284.16,530L269.1,530L254.03,530L238.97,530Z","cx":359.48,"cy":446.39,"box":{"x":244.97,"y":402.39,"w":229.03,"h":88},"labelT":0.52},{"d":"M480,350.9L489.31,352.08L498.62,353.45L507.93,354.99L517.24,356.66L526.55,358.45L535.86,360.32L545.17,362.25L554.48,364.21L563.79,366.18L573.1,368.12L582.41,370.02L591.73,371.85L601.04,373.6L610.35,375.25L619.66,376.8L628.97,378.22L628.97,530L619.66,530L610.35,530L601.04,530L591.73,530L582.41,530L573.1,530L563.79,530L554.48,530L545.17,530L535.86,530L526.55,530L517.24,530L507.93,530L498.62,530L489.31,530L480,530Z","cx":554.48,"cy":447.16,"box":{"x":486,"y":403.16,"w":136.97,"h":88},"labelT":0.519},{"d":"M628.97,378.22L644.03,380.26L659.1,381.98L674.16,383.38L689.23,384.51L704.29,385.42L719.35,386.15L734.42,386.78L749.48,387.37L764.55,387.98L779.61,388.65L794.68,389.41L809.74,390.29L824.81,391.27L839.87,392.33L854.94,393.44L870,394.53L870,530L854.94,530L839.87,530L824.81,530L809.74,530L794.68,530L779.61,530L764.55,530L749.48,530L734.42,530L719.35,530L704.29,530L689.23,530L674.16,530L659.1,530L644.03,530L628.97,530Z","cx":749.48,"cy":458.59,"box":{"x":634.97,"y":414.59,"w":229.03,"h":88},"labelT":0.515}],"bounds":{"x":90,"y":70,"width":780,"height":460}}},"laberinto":{"wide":{"cells":[{"d":"M566.63,368.37L558.97,370.33L550.12,371.9L539.69,373.09L526.82,373.89L508.91,374.32L459.08,374.38L437.81,374.06L423.88,373.37L412.83,372.3L403.56,370.85L395.57,369.01L388.62,366.76L382.55,364.1L377.28,360.99L372.74,357.42L368.9,353.31L480,300Z","cx":465.17,"cy":353.86,"box":{"x":409.64,"y":339.86,"w":111.06,"h":28},"labelT":0.605},{"d":"M368.9,353.31L365.71,348.6L363.16,343.15L361.23,336.73L359.93,328.82L359.23,317.79L359.14,287.12L359.65,274.03L360.78,265.46L362.51,258.67L364.87,252.96L367.87,248.04L371.51,243.76L375.84,240.03L380.88,236.79L386.7,234L393.37,231.63L480,300Z","cx":398.51,"cy":292.47,"box":{"x":366.77,"y":268.47,"w":63.47,"h":48},"labelT":0.413},{"d":"M393.37,231.63L401.03,229.67L409.88,228.1L420.31,226.91L433.18,226.11L451.09,225.68L500.92,225.62L522.19,225.94L536.12,226.63L547.17,227.7L556.44,229.15L564.43,230.99L571.38,233.24L577.45,235.9L582.72,239.01L587.26,242.58L591.1,246.69L480,300Z","cx":494.83,"cy":246.14,"box":{"x":439.3,"y":232.14,"w":111.06,"h":28},"labelT":0.395},{"d":"M591.1,246.69L594.29,251.4L596.84,256.85L598.77,263.27L600.07,271.18L600.77,282.21L600.86,312.88L600.35,325.97L599.22,334.54L597.49,341.33L595.13,347.04L592.13,351.96L588.49,356.24L584.16,359.97L579.12,363.21L573.3,366L566.63,368.37L480,300Z","cx":561.49,"cy":307.53,"box":{"x":529.75,"y":283.53,"w":63.47,"h":48},"labelT":0.587},{"d":"M638.09,413.42L632.48,415.49L626.47,417.38L620.04,419.1L613.14,420.64L605.71,422.02L597.69,423.24L588.98,424.29L579.41,425.17L568.77,425.9L556.67,426.46L542.35,426.87L523.91,427.11L487.68,427.2L437.71,427.13L418.81,426.89L404.28,426.5L423.88,373.37L430.36,373.76L437.81,374.06L446.8,374.27L459.08,374.38L493.52,374.4L508.91,374.32L518.86,374.15L526.82,373.89L533.65,373.54L539.69,373.09L545.14,372.54L550.12,371.9L554.72,371.17L558.97,370.33L562.93,369.4L566.63,368.37Z","cx":502.48,"cy":401.83,"box":{"x":427.86,"y":381.83,"w":149.24,"h":40},"labelT":0.494},{"d":"M404.28,426.5L392.05,425.95L381.32,425.23L371.69,424.36L362.91,423.32L354.85,422.12L347.38,420.75L340.44,419.21L333.98,417.51L327.94,415.63L322.31,413.58L317.04,411.35L312.13,408.93L307.55,406.32L303.29,403.52L299.34,400.51L295.69,397.28L368.9,353.31L370.74,355.43L372.74,357.42L374.93,359.27L377.28,360.99L379.82,362.6L382.55,364.1L385.48,365.48L388.62,366.76L391.98,367.93L395.57,369.01L399.42,369.98L403.56,370.85L408.01,371.62L412.83,372.3L418.09,372.88L423.88,373.37Z","cx":366.46,"cy":397.24,"box":{"x":330.11,"y":383.24,"w":72.69,"h":28},"labelT":0.576},{"d":"M295.69,397.28L292.33,393.83L289.26,390.14L286.47,386.18L283.96,381.93L281.71,377.36L279.74,372.43L278.03,367.06L276.59,361.18L275.41,354.63L274.49,347.18L273.84,338.37L273.44,327.02L273.3,304.72L273.42,273.98L273.8,262.34L274.44,253.4L360.78,265.46L360.14,269.45L359.65,274.03L359.32,279.57L359.14,287.12L359.11,308.32L359.23,317.79L359.5,323.91L359.93,328.82L360.5,333.01L361.23,336.73L362.12,340.08L363.16,343.15L364.35,345.98L365.71,348.6L367.22,351.04L368.9,353.31Z","cx":316.53,"cy":304.96,"box":{"x":279.96,"y":272.96,"w":73.15,"h":64},"labelT":0.405},{"d":"M274.44,253.4L275.34,245.88L276.5,239.27L277.92,233.35L279.61,227.95L281.56,222.98L283.78,218.39L286.28,214.12L289.05,210.14L292.1,206.43L295.44,202.96L299.06,199.72L302.99,196.69L307.23,193.88L311.78,191.25L316.67,188.82L321.91,186.58L393.37,231.63L389.92,232.76L386.7,234L383.69,235.34L380.88,236.79L378.27,238.35L375.84,240.03L373.59,241.83L371.51,243.76L369.61,245.83L367.87,248.04L366.29,250.41L364.87,252.96L363.61,255.7L362.51,258.67L361.57,261.9L360.78,265.46Z","cx":324.98,"cy":234.74,"box":{"x":291.91,"y":217.74,"w":66.14,"h":34},"labelT":0.518},{"d":"M321.91,186.58L327.52,184.51L333.53,182.62L339.96,180.9L346.86,179.36L354.29,177.98L362.31,176.76L371.02,175.71L380.59,174.83L391.23,174.1L403.33,173.54L417.65,173.13L436.09,172.89L472.32,172.8L522.29,172.87L541.19,173.11L555.72,173.5L536.12,226.63L529.64,226.24L522.19,225.94L513.2,225.73L500.92,225.62L466.48,225.6L451.09,225.68L441.14,225.85L433.18,226.11L426.35,226.46L420.31,226.91L414.86,227.46L409.88,228.1L405.28,228.83L401.03,229.67L397.07,230.6L393.37,231.63Z","cx":457.52,"cy":198.17,"box":{"x":382.9,"y":178.17,"w":149.24,"h":40},"labelT":0.506},{"d":"M555.72,173.5L567.95,174.05L578.68,174.77L588.31,175.64L597.09,176.68L605.15,177.88L612.62,179.25L619.56,180.79L626.02,182.49L632.06,184.37L637.69,186.42L642.96,188.65L647.87,191.07L652.45,193.68L656.71,196.48L660.66,199.49L664.31,202.72L591.1,246.69L589.26,244.57L587.26,242.58L585.07,240.73L582.72,239.01L580.18,237.4L577.45,235.9L574.52,234.52L571.38,233.24L568.02,232.07L564.43,230.99L560.58,230.02L556.44,229.15L551.99,228.38L547.17,227.7L541.91,227.12L536.12,226.63Z","cx":593.54,"cy":202.76,"box":{"x":557.2,"y":188.76,"w":72.69,"h":28},"labelT":0.424},{"d":"M664.31,202.72L667.67,206.17L670.74,209.86L673.53,213.82L676.04,218.07L678.29,222.64L680.26,227.57L681.97,232.94L683.41,238.82L684.59,245.37L685.51,252.82L686.16,261.63L686.56,272.98L686.7,295.28L686.58,326.02L686.2,337.66L685.56,346.6L599.22,334.54L599.86,330.55L600.35,325.97L600.68,320.43L600.86,312.88L600.89,291.68L600.77,282.21L600.5,276.09L600.07,271.18L599.5,266.99L598.77,263.27L597.88,259.92L596.84,256.85L595.65,254.02L594.29,251.4L592.78,248.96L591.1,246.69Z","cx":643.47,"cy":295.04,"box":{"x":606.89,"y":263.04,"w":73.15,"h":64},"labelT":0.595},{"d":"M685.56,346.6L684.66,354.12L683.5,360.73L682.08,366.65L680.39,372.05L678.44,377.02L676.22,381.61L673.72,385.88L670.95,389.86L667.9,393.57L664.56,397.04L660.94,400.28L657.01,403.31L652.77,406.12L648.22,408.75L643.33,411.18L638.09,413.42L566.63,368.37L570.08,367.24L573.3,366L576.31,364.66L579.12,363.21L581.73,361.65L584.16,359.97L586.41,358.17L588.49,356.24L590.39,354.17L592.13,351.96L593.71,349.59L595.13,347.04L596.39,344.3L597.49,341.33L598.43,338.1L599.22,334.54Z","cx":635.02,"cy":365.26,"box":{"x":601.95,"y":348.26,"w":66.14,"h":34},"labelT":0.482},{"d":"M718.75,457.22L714.01,459.51L709.05,461.68L703.86,463.74L698.43,465.68L692.75,467.51L686.79,469.23L680.56,470.84L674.03,472.34L667.18,473.74L659.98,475.02L652.4,476.21L644.4,477.28L635.93,478.26L626.91,479.13L617.27,479.9L606.87,480.56L547.45,426.75L556.67,426.46L564.93,426.11L572.46,425.68L579.41,425.17L585.89,424.6L591.97,423.95L597.69,423.24L603.11,422.45L608.25,421.58L613.14,420.64L617.79,419.63L622.23,418.54L626.47,417.38L630.52,416.14L634.39,414.82L638.09,413.42Z","cx":640.48,"cy":454.31,"box":{"x":599.35,"y":443.31,"w":82.26,"h":22},"labelT":0.576},{"d":"M606.87,480.56L595.55,481.12L583.02,481.58L568.82,481.94L552.06,482.19L530.47,482.35L485.71,482.4L430.33,482.35L408.51,482.2L391.65,481.95L377.39,481.59L364.82,481.14L353.46,480.58L343.04,479.92L333.37,479.15L324.34,478.29L315.85,477.32L352.29,421.68L357.46,422.54L362.91,423.32L368.68,424.03L374.79,424.67L381.32,425.23L388.33,425.73L395.93,426.15L404.28,426.5L413.63,426.78L424.43,426.99L437.71,427.13L457.06,427.19L505.69,427.19L523.91,427.11L536.83,426.97L547.45,426.75Z","cx":449.83,"cy":456.95,"box":{"x":350.25,"y":436.95,"w":199.14,"h":40},"labelT":0.521},{"d":"M315.85,477.32L307.84,476.24L300.25,475.06L293.03,473.78L286.17,472.39L279.63,470.89L273.39,469.28L267.43,467.56L261.74,465.74L256.3,463.8L251.1,461.75L246.13,459.58L241.39,457.29L236.86,454.89L232.54,452.36L228.43,449.71L224.52,446.92L295.69,397.28L298.09,399.46L300.62,401.53L303.29,403.52L306.09,405.41L309.04,407.21L312.13,408.93L315.37,410.56L318.76,412.11L322.31,413.58L326.02,414.97L329.91,416.28L333.98,417.51L338.24,418.66L342.7,419.74L347.38,420.75L352.29,421.68Z","cx":289.49,"cy":444.31,"box":{"x":258.64,"y":430.31,"w":61.69,"h":28},"labelT":0.548},{"d":"M224.52,446.92L220.8,444.01L217.27,440.96L213.93,437.76L210.77,434.42L207.8,430.92L205,427.26L202.39,423.42L199.95,419.4L197.68,415.19L195.59,410.76L193.66,406.09L191.91,401.17L190.33,395.96L188.92,390.41L187.67,384.47L186.59,378.08L274.03,341.51L274.49,347.18L275.08,352.26L275.78,356.9L276.59,361.18L277.52,365.16L278.57,368.9L279.74,372.43L281.03,375.76L282.43,378.92L283.96,381.93L285.6,384.8L287.37,387.53L289.26,390.14L291.28,392.63L293.42,395.01L295.69,397.28Z","cx":237.55,"cy":391.41,"box":{"x":201.37,"y":377.41,"w":72.38,"h":28},"labelT":0.47},{"d":"M186.59,378.08L185.68,371.11L184.93,363.39L184.35,354.66L183.94,344.35L183.69,331.06L183.6,303.52L183.68,269.44L183.93,256.01L184.34,245.63L184.91,236.86L185.65,229.12L186.56,222.13L187.63,215.72L188.88,209.77L190.28,204.21L191.86,198.99L282.27,221.41L280.88,224.59L279.61,227.95L278.45,231.49L277.42,235.26L276.5,239.27L275.7,243.59L275.01,248.27L274.44,253.4L273.98,259.16L273.64,265.81L273.42,273.98L273.31,285.88L273.32,315.81L273.44,327.02L273.68,334.97L274.03,341.51Z","cx":228.85,"cy":279.77,"box":{"x":190.39,"y":247.77,"w":76.92,"h":64},"labelT":0.455},{"d":"M191.86,198.99L193.61,194.05L195.52,189.38L197.61,184.94L199.87,180.72L202.31,176.7L204.92,172.86L207.71,169.19L210.68,165.69L213.83,162.34L217.16,159.14L220.68,156.08L224.4,153.16L228.31,150.38L232.42,147.72L236.73,145.19L241.25,142.78L321.91,186.58L318.38,188.05L315.01,189.61L311.78,191.25L308.71,192.98L305.78,194.79L302.99,196.69L300.34,198.69L297.82,200.77L295.44,202.96L293.18,205.24L291.05,207.64L289.05,210.14L287.17,212.76L285.42,215.51L283.78,218.39L282.27,221.41Z","cx":250.38,"cy":187.92,"box":{"x":210.19,"y":176.92,"w":80.37,"h":22},"labelT":0.512},{"d":"M241.25,142.78L245.99,140.49L250.95,138.32L256.14,136.26L261.57,134.32L267.25,132.49L273.21,130.77L279.44,129.16L285.97,127.66L292.82,126.26L300.02,124.98L307.6,123.79L315.6,122.72L324.07,121.74L333.09,120.87L342.73,120.1L353.13,119.44L412.55,173.25L403.33,173.54L395.07,173.89L387.54,174.32L380.59,174.83L374.11,175.4L368.03,176.05L362.31,176.76L356.89,177.55L351.75,178.42L346.86,179.36L342.21,180.37L337.77,181.46L333.53,182.62L329.48,183.86L325.61,185.18L321.91,186.58Z","cx":319.52,"cy":145.69,"box":{"x":278.39,"y":134.69,"w":82.26,"h":22},"labelT":0.424},{"d":"M353.13,119.44L364.45,118.88L376.98,118.42L391.18,118.06L407.94,117.81L429.53,117.65L474.29,117.6L529.67,117.65L551.49,117.8L568.35,118.05L582.61,118.41L595.18,118.86L606.54,119.42L616.96,120.08L626.63,120.85L635.66,121.71L644.15,122.68L607.71,178.32L602.54,177.46L597.09,176.68L591.32,175.97L585.21,175.33L578.68,174.77L571.67,174.27L564.07,173.85L555.72,173.5L546.37,173.22L535.57,173.01L522.29,172.87L502.94,172.81L454.31,172.81L436.09,172.89L423.17,173.03L412.55,173.25Z","cx":510.17,"cy":143.05,"box":{"x":410.6,"y":123.05,"w":199.14,"h":40},"labelT":0.479},{"d":"M644.15,122.68L652.16,123.76L659.75,124.94L666.97,126.22L673.83,127.61L680.37,129.11L686.61,130.72L692.57,132.44L698.26,134.26L703.7,136.2L708.9,138.25L713.87,140.42L718.61,142.71L723.14,145.11L727.46,147.64L731.57,150.29L735.48,153.08L664.31,202.72L661.91,200.54L659.38,198.47L656.71,196.48L653.91,194.59L650.96,192.79L647.87,191.07L644.63,189.44L641.24,187.89L637.69,186.42L633.98,185.03L630.09,183.72L626.02,182.49L621.76,181.34L617.3,180.26L612.62,179.25L607.71,178.32Z","cx":670.51,"cy":155.69,"box":{"x":639.66,"y":141.69,"w":61.69,"h":28},"labelT":0.452},{"d":"M735.48,153.08L739.2,155.99L742.73,159.04L746.07,162.24L749.23,165.58L752.2,169.08L755,172.74L757.61,176.58L760.05,180.6L762.32,184.81L764.41,189.24L766.34,193.91L768.09,198.83L769.67,204.04L771.08,209.59L772.33,215.53L773.41,221.92L685.97,258.49L685.51,252.82L684.92,247.74L684.22,243.1L683.41,238.82L682.48,234.84L681.43,231.1L680.26,227.57L678.97,224.24L677.57,221.08L676.04,218.07L674.4,215.2L672.63,212.47L670.74,209.86L668.72,207.37L666.58,204.99L664.31,202.72Z","cx":722.45,"cy":208.59,"box":{"x":686.26,"y":194.59,"w":72.38,"h":28},"labelT":0.53},{"d":"M773.41,221.92L774.32,228.89L775.07,236.61L775.65,245.34L776.06,255.65L776.31,268.94L776.4,296.48L776.32,330.56L776.07,343.99L775.66,354.37L775.09,363.14L774.35,370.88L773.44,377.87L772.37,384.28L771.12,390.23L769.72,395.79L768.14,401.01L677.73,378.59L679.12,375.41L680.39,372.05L681.55,368.51L682.58,364.74L683.5,360.73L684.3,356.41L684.99,351.73L685.56,346.6L686.02,340.84L686.36,334.19L686.58,326.02L686.69,314.12L686.68,284.19L686.56,272.98L686.32,265.03L685.97,258.49Z","cx":731.15,"cy":320.23,"box":{"x":692.69,"y":288.23,"w":76.92,"h":64},"labelT":0.545},{"d":"M768.14,401.01L766.39,405.95L764.48,410.62L762.39,415.06L760.13,419.28L757.69,423.3L755.08,427.14L752.29,430.81L749.32,434.31L746.17,437.66L742.84,440.86L739.32,443.92L735.6,446.84L731.69,449.62L727.58,452.28L723.27,454.81L718.75,457.22L638.09,413.42L641.62,411.95L644.99,410.39L648.22,408.75L651.29,407.02L654.22,405.21L657.01,403.31L659.66,401.31L662.18,399.23L664.56,397.04L666.82,394.76L668.95,392.36L670.95,389.86L672.83,387.24L674.58,384.49L676.22,381.61L677.73,378.59Z","cx":709.62,"cy":412.08,"box":{"x":669.44,"y":401.08,"w":80.37,"h":22},"labelT":0.488},{"d":"M805.68,500.42L800.01,503.75L794.05,506.92L787.82,509.93L781.28,512.78L774.45,515.48L767.3,518.04L759.81,520.44L751.98,522.7L743.77,524.82L735.17,526.79L726.15,528.63L716.67,530.32L706.69,531.87L696.15,533.29L684.99,534.57L673.12,535.71L606.87,480.56L617.27,479.9L626.91,479.13L635.93,478.26L644.4,477.28L652.4,476.21L659.98,475.02L667.18,473.74L674.03,472.34L680.56,470.84L686.79,469.23L692.75,467.51L698.43,465.68L703.86,463.74L709.05,461.68L714.01,459.51L718.75,457.22Z","cx":710.38,"cy":499.84,"box":{"x":656.45,"y":485.84,"w":107.86,"h":28},"labelT":0.532},{"d":"M673.12,535.71L660.42,536.72L646.72,537.59L631.79,538.33L615.28,538.93L596.56,539.4L574.44,539.73L545.88,539.93L480,540L414.12,539.93L385.56,539.73L363.44,539.4L344.72,538.93L328.21,538.33L313.28,537.59L299.58,536.72L286.88,535.71L315.85,477.32L324.34,478.29L333.37,479.15L343.04,479.92L353.46,480.58L364.82,481.14L377.39,481.59L391.65,481.95L408.51,482.2L430.33,482.35L485.71,482.4L530.47,482.35L552.06,482.19L568.82,481.94L583.02,481.58L595.55,481.12L606.87,480.56Z","cx":461.56,"cy":510.41,"box":{"x":318.83,"y":486.41,"w":285.48,"h":48},"labelT":0.49},{"d":"M286.88,535.71L275.01,534.57L263.85,533.29L253.31,531.87L243.33,530.32L233.85,528.63L224.83,526.79L216.23,524.82L208.02,522.7L200.19,520.44L192.7,518.04L185.55,515.48L178.72,512.78L172.18,509.93L165.95,506.92L159.99,503.75L154.32,500.42L224.52,446.92L228.43,449.71L232.54,452.36L236.86,454.89L241.39,457.29L246.13,459.58L251.1,461.75L256.3,463.8L261.74,465.74L267.43,467.56L273.39,469.28L279.63,470.89L286.17,472.39L293.03,473.78L300.25,475.06L307.84,476.24L315.85,477.32Z","cx":242.37,"cy":495.05,"box":{"x":193.61,"y":478.05,"w":97.52,"h":34},"labelT":0.544},{"d":"M154.32,500.42L148.91,496.93L143.76,493.26L138.87,489.43L134.23,485.41L129.84,481.2L125.69,476.8L121.78,472.19L118.11,467.37L114.67,462.32L111.46,457.03L108.48,451.48L105.73,445.64L103.2,439.5L100.9,433.02L98.82,426.15L96.97,418.84L186.59,378.08L187.67,384.47L188.92,390.41L190.33,395.96L191.91,401.17L193.66,406.09L195.59,410.76L197.68,415.19L199.95,419.4L202.39,423.42L205,427.26L207.8,430.92L210.77,434.42L213.93,437.76L217.27,440.96L220.8,444.01L224.52,446.92Z","cx":156.82,"cy":439.25,"box":{"x":123.34,"y":415.25,"w":66.95,"h":48},"labelT":0.485},{"d":"M96.97,418.84L95.33,411.02L93.91,402.6L92.72,393.41L91.74,383.25L90.98,371.73L90.43,358.12L90.11,340.54L90,300L90.11,259.46L90.43,241.88L90.98,228.27L91.74,216.75L92.72,206.59L93.91,197.4L95.33,188.98L96.97,181.16L191.86,198.99L190.28,204.21L188.88,209.77L187.63,215.72L186.56,222.13L185.65,229.12L184.91,236.86L184.34,245.63L183.93,256.01L183.68,269.44L183.6,303.52L183.69,331.06L183.94,344.35L184.35,354.66L184.93,363.39L185.68,371.11L186.59,378.08Z","cx":136.9,"cy":289.24,"box":{"x":96.21,"y":257.24,"w":81.39,"h":64},"labelT":0.458},{"d":"M96.97,181.16L98.82,173.85L100.9,166.98L103.2,160.5L105.73,154.36L108.48,148.52L111.46,142.97L114.67,137.68L118.11,132.63L121.78,127.81L125.69,123.2L129.84,118.8L134.23,114.59L138.87,110.57L143.76,106.74L148.91,103.07L154.32,99.58L241.25,142.78L236.73,145.19L232.42,147.72L228.31,150.38L224.4,153.16L220.68,156.08L217.16,159.14L213.83,162.34L210.68,165.69L207.71,169.19L204.92,172.86L202.31,176.7L199.87,180.72L197.61,184.94L195.52,189.38L193.61,194.05L191.86,198.99Z","cx":158.52,"cy":157.91,"box":{"x":125.42,"y":133.91,"w":66.21,"h":48},"labelT":0.507},{"d":"M154.32,99.58L159.99,96.25L165.95,93.08L172.18,90.07L178.72,87.22L185.55,84.52L192.7,81.96L200.19,79.56L208.02,77.3L216.23,75.18L224.83,73.21L233.85,71.37L243.33,69.68L253.31,68.13L263.85,66.71L275.01,65.43L286.88,64.29L353.13,119.44L342.73,120.1L333.09,120.87L324.07,121.74L315.6,122.72L307.6,123.79L300.02,124.98L292.82,126.26L285.97,127.66L279.44,129.16L273.21,130.77L267.25,132.49L261.57,134.32L256.14,136.26L250.95,138.32L245.99,140.49L241.25,142.78Z","cx":249.62,"cy":100.16,"box":{"x":195.69,"y":86.16,"w":107.86,"h":28},"labelT":0.468},{"d":"M286.88,64.29L299.58,63.28L313.28,62.41L328.21,61.67L344.72,61.07L363.44,60.6L385.56,60.27L414.12,60.07L480,60L545.88,60.07L574.44,60.27L596.56,60.6L615.28,61.07L631.79,61.67L646.72,62.41L660.42,63.28L673.12,64.29L644.15,122.68L635.66,121.71L626.63,120.85L616.96,120.08L606.54,119.42L595.18,118.86L582.61,118.41L568.35,118.05L551.49,117.8L529.67,117.65L474.29,117.6L429.53,117.65L407.94,117.81L391.18,118.06L376.98,118.42L364.45,118.88L353.13,119.44Z","cx":498.44,"cy":89.59,"box":{"x":355.7,"y":65.59,"w":285.48,"h":48},"labelT":0.51},{"d":"M673.12,64.29L684.99,65.43L696.15,66.71L706.69,68.13L716.67,69.68L726.15,71.37L735.17,73.21L743.77,75.18L751.98,77.3L759.81,79.56L767.3,81.96L774.45,84.52L781.28,87.22L787.82,90.07L794.05,93.08L800.01,96.25L805.68,99.58L735.48,153.08L731.57,150.29L727.46,147.64L723.14,145.11L718.61,142.71L713.87,140.42L708.9,138.25L703.7,136.2L698.26,134.26L692.57,132.44L686.61,130.72L680.37,129.11L673.83,127.61L666.97,126.22L659.75,124.94L652.16,123.76L644.15,122.68Z","cx":717.63,"cy":104.95,"box":{"x":668.87,"y":87.95,"w":97.52,"h":34},"labelT":0.456},{"d":"M805.68,99.58L811.09,103.07L816.24,106.74L821.13,110.57L825.77,114.59L830.16,118.8L834.31,123.2L838.22,127.81L841.89,132.63L845.33,137.68L848.54,142.97L851.52,148.52L854.27,154.36L856.8,160.5L859.1,166.98L861.18,173.85L863.03,181.16L773.41,221.92L772.33,215.53L771.08,209.59L769.67,204.04L768.09,198.83L766.34,193.91L764.41,189.24L762.32,184.81L760.05,180.6L757.61,176.58L755,172.74L752.2,169.08L749.23,165.58L746.07,162.24L742.73,159.04L739.2,155.99L735.48,153.08Z","cx":803.18,"cy":160.75,"box":{"x":769.71,"y":136.75,"w":66.95,"h":48},"labelT":0.515},{"d":"M863.03,181.16L864.67,188.98L866.09,197.4L867.28,206.59L868.26,216.75L869.02,228.27L869.57,241.88L869.89,259.46L870,300L869.89,340.54L869.57,358.12L869.02,371.73L868.26,383.25L867.28,393.41L866.09,402.6L864.67,411.02L863.03,418.84L768.14,401.01L769.72,395.79L771.12,390.23L772.37,384.28L773.44,377.87L774.35,370.88L775.09,363.14L775.66,354.37L776.07,343.99L776.32,330.56L776.4,296.48L776.31,268.94L776.06,255.65L775.65,245.34L775.07,236.61L774.32,228.89L773.41,221.92Z","cx":823.1,"cy":310.76,"box":{"x":782.4,"y":278.76,"w":81.39,"h":64},"labelT":0.542},{"d":"M863.03,418.84L861.18,426.15L859.1,433.02L856.8,439.5L854.27,445.64L851.52,451.48L848.54,457.03L845.33,462.32L841.89,467.37L838.22,472.19L834.31,476.8L830.16,481.2L825.77,485.41L821.13,489.43L816.24,493.26L811.09,496.93L805.68,500.42L718.75,457.22L723.27,454.81L727.58,452.28L731.69,449.62L735.6,446.84L739.32,443.92L742.84,440.86L746.17,437.66L749.32,434.31L752.29,430.81L755.08,427.14L757.69,423.3L760.13,419.28L762.39,415.06L764.48,410.62L766.39,405.95L768.14,401.01Z","cx":801.48,"cy":442.09,"box":{"x":768.37,"y":418.09,"w":66.21,"h":48},"labelT":0.493}],"bounds":{"x":90,"y":60,"width":780,"height":480}},"compact":{"cells":[{"d":"M634.7,411.44L623.24,415.3L610.09,418.48L594.85,421L576.78,422.87L554.25,424.11L521.41,424.73L436.84,424.72L404.73,424.08L382.43,422.81L364.5,420.91L349.35,418.36L336.27,415.16L324.88,411.28L314.94,406.69L306.32,401.35L298.91,395.2L480,300Z","cx":464.03,"cy":391.11,"box":{"x":367.84,"y":365.11,"w":192.38,"h":52},"labelT":0.611},{"d":"M298.91,395.2L292.64,388.15L287.48,380.06L283.38,370.68L280.33,359.56L278.31,345.69L277.32,325.49L277.34,273.44L278.37,253.68L280.43,239.96L283.52,228.92L287.66,219.6L292.87,211.55L299.18,204.54L306.64,198.43L315.31,193.12L325.3,188.56L480,300Z","cx":345.3,"cy":291.88,"box":{"x":284.8,"y":253.88,"w":121.02,"h":76},"labelT":0.418},{"d":"M325.3,188.56L336.76,184.7L349.91,181.52L365.15,179L383.22,177.13L405.75,175.89L438.59,175.27L523.16,175.28L555.27,175.92L577.57,177.19L595.5,179.09L610.65,181.64L623.73,184.84L635.12,188.72L645.06,193.31L653.68,198.65L661.09,204.8L480,300Z","cx":495.97,"cy":208.89,"box":{"x":399.78,"y":182.89,"w":192.38,"h":52},"labelT":0.389},{"d":"M661.09,204.8L667.36,211.85L672.52,219.94L676.62,229.32L679.67,240.44L681.69,254.31L682.68,274.51L682.66,326.56L681.63,346.32L679.57,360.04L676.48,371.08L672.34,380.4L667.13,388.45L660.82,395.46L653.36,401.57L644.69,406.88L634.7,411.44L480,300Z","cx":614.7,"cy":308.12,"box":{"x":554.19,"y":270.12,"w":121.02,"h":76},"labelT":0.582},{"d":"M805.68,500.42L797.07,505.35L787.82,509.93L777.91,514.15L767.3,518.04L755.94,521.59L743.77,524.82L730.72,527.73L716.67,530.32L701.49,532.6L684.99,534.57L666.88,536.23L646.72,537.59L623.77,538.65L596.56,539.4L561.34,539.85L480,540L404.73,424.08L418.77,424.47L436.84,424.72L472.1,424.8L521.41,424.73L539.98,424.5L554.25,424.11L566.25,423.57L576.78,422.87L586.24,422.01L594.85,421L602.77,419.82L610.09,418.48L616.9,416.97L623.24,415.3L629.17,413.46L634.7,411.44Z","cx":596.37,"cy":492.57,"box":{"x":479.23,"y":458.57,"w":234.27,"h":68},"labelT":0.555},{"d":"M480,540L398.66,539.85L363.44,539.4L336.23,538.65L313.28,537.59L293.12,536.23L275.01,534.57L258.51,532.6L243.33,530.32L229.28,527.73L216.23,524.82L204.06,521.59L192.7,518.04L182.09,514.15L172.18,509.93L162.93,505.35L154.32,500.42L298.91,395.2L302.46,398.38L306.32,401.35L310.47,404.11L314.94,406.69L319.74,409.07L324.88,411.28L330.38,413.3L336.27,415.16L342.58,416.84L349.35,418.36L356.63,419.72L364.5,420.91L373.05,421.94L382.43,422.81L392.87,423.52L404.73,424.08Z","cx":320.26,"cy":489.42,"box":{"x":220.78,"y":459.42,"w":198.95,"h":60},"labelT":0.58},{"d":"M154.32,500.42L146.3,495.12L138.87,489.43L132,483.33L125.69,476.8L119.91,469.81L114.67,462.32L109.94,454.29L105.73,445.64L102.03,436.3L98.82,426.15L96.12,415L93.91,402.6L92.2,388.47L90.98,371.73L90.24,350.05L90,300L278.37,253.68L277.73,262.32L277.34,273.44L277.2,295.14L277.32,325.49L277.69,336.91L278.31,345.69L279.2,353.08L280.33,359.56L281.73,365.38L283.38,370.68L285.3,375.55L287.48,380.06L289.92,384.25L292.64,388.15L295.63,391.8L298.91,395.2Z","cx":185.37,"cy":352.26,"box":{"x":99.51,"y":308.26,"w":171.73,"h":88},"labelT":0.428},{"d":"M90,300L90.24,249.95L90.98,228.27L92.2,211.53L93.91,197.4L96.12,185L98.82,173.85L102.03,163.7L105.73,154.36L109.94,145.71L114.67,137.68L119.91,130.19L125.69,123.2L132,116.67L138.87,110.57L146.3,104.88L154.32,99.58L325.3,188.56L320.13,190.75L315.31,193.12L310.82,195.68L306.64,198.43L302.76,201.38L299.18,204.54L295.88,207.93L292.87,211.55L290.13,215.43L287.66,219.6L285.46,224.08L283.52,228.92L281.85,234.18L280.43,239.96L279.28,246.38L278.37,253.68Z","cx":187.33,"cy":208.32,"box":{"x":108.97,"y":164.32,"w":156.73,"h":88},"labelT":0.478},{"d":"M154.32,99.58L162.93,94.65L172.18,90.07L182.09,85.85L192.7,81.96L204.06,78.41L216.23,75.18L229.28,72.27L243.33,69.68L258.51,67.4L275.01,65.43L293.12,63.77L313.28,62.41L336.23,61.35L363.44,60.6L398.66,60.15L480,60L555.27,175.92L541.23,175.53L523.16,175.28L487.9,175.2L438.59,175.27L420.02,175.5L405.75,175.89L393.75,176.43L383.22,177.13L373.76,177.99L365.15,179L357.23,180.18L349.91,181.52L343.1,183.03L336.76,184.7L330.83,186.54L325.3,188.56Z","cx":363.63,"cy":107.43,"box":{"x":246.5,"y":73.43,"w":234.27,"h":68},"labelT":0.445},{"d":"M480,60L561.34,60.15L596.56,60.6L623.77,61.35L646.72,62.41L666.88,63.77L684.99,65.43L701.49,67.4L716.67,69.68L730.72,72.27L743.77,75.18L755.94,78.41L767.3,81.96L777.91,85.85L787.82,90.07L797.07,94.65L805.68,99.58L661.09,204.8L657.54,201.62L653.68,198.65L649.53,195.89L645.06,193.31L640.26,190.93L635.12,188.72L629.62,186.7L623.73,184.84L617.42,183.16L610.65,181.64L603.37,180.28L595.5,179.09L586.95,178.06L577.57,177.19L567.13,176.48L555.27,175.92Z","cx":639.74,"cy":110.58,"box":{"x":540.27,"y":80.58,"w":198.95,"h":60},"labelT":0.42},{"d":"M805.68,99.58L813.7,104.88L821.13,110.57L828,116.67L834.31,123.2L840.09,130.19L845.33,137.68L850.06,145.71L854.27,154.36L857.97,163.7L861.18,173.85L863.88,185L866.09,197.4L867.8,211.53L869.02,228.27L869.76,249.95L870,300L681.63,346.32L682.27,337.68L682.66,326.56L682.8,304.86L682.68,274.51L682.31,263.09L681.69,254.31L680.8,246.92L679.67,240.44L678.27,234.62L676.62,229.32L674.7,224.45L672.52,219.94L670.08,215.75L667.36,211.85L664.37,208.2L661.09,204.8Z","cx":774.63,"cy":247.74,"box":{"x":688.76,"y":203.74,"w":171.73,"h":88},"labelT":0.572},{"d":"M870,300L869.76,350.05L869.02,371.73L867.8,388.47L866.09,402.6L863.88,415L861.18,426.15L857.97,436.3L854.27,445.64L850.06,454.29L845.33,462.32L840.09,469.81L834.31,476.8L828,483.33L821.13,489.43L813.7,495.12L805.68,500.42L634.7,411.44L639.87,409.25L644.69,406.88L649.18,404.32L653.36,401.57L657.24,398.62L660.82,395.46L664.12,392.07L667.13,388.45L669.87,384.57L672.34,380.4L674.54,375.92L676.48,371.08L678.15,365.82L679.57,360.04L680.72,353.62L681.63,346.32Z","cx":772.67,"cy":391.68,"box":{"x":694.3,"y":347.68,"w":156.73,"h":88},"labelT":0.522}],"bounds":{"x":90,"y":60,"width":780,"height":480}}},"semillas":{"wide":{"cells":[{"d":"M519.27,319.04L443.89,300.27L485.99,256.94L558.29,260.84L565.38,277.89Z","cx":514.18,"cy":277.94,"box":{"x":488.1,"y":263.94,"w":52.17,"h":28},"labelT":0.458},{"d":"M425.31,354.31L433.21,302.17L443.89,300.27L519.27,319.04L531.1,336.24L470.79,376.81Z","cx":470.29,"cy":333.72,"box":{"x":437.01,"y":319.72,"w":66.56,"h":28},"labelT":0.431},{"d":"M461.66,232.2L485.99,256.94L443.89,300.27L433.21,302.17L398.37,294.02L383.61,236.57L390.46,230.62Z","cx":429.03,"cy":257.42,"box":{"x":400.88,"y":237.42,"w":56.3,"h":40},"labelT":0.409},{"d":"M574.3,346.31L531.1,336.24L519.27,319.04L565.38,277.89L632.28,303.79L636.91,319.16Z","cx":579.22,"cy":313.62,"box":{"x":547.03,"y":302.62,"w":64.37,"h":22},"labelT":0.516},{"d":"M352.31,303.06L398.37,294.02L433.21,302.17L425.31,354.31L360.88,363.82L330.39,350.94Z","cx":387.83,"cy":330.57,"box":{"x":356.25,"y":310.57,"w":63.17,"h":40},"labelT":0.541},{"d":"M574.6,244.88L558.29,260.84L485.99,256.94L461.66,232.2L492.33,200.63L538.51,196.27Z","cx":515.74,"cy":231.98,"box":{"x":487.3,"y":214.98,"w":56.87,"h":34},"labelT":0.516},{"d":"M471.97,380.96L470.79,376.81L531.1,336.24L574.3,346.31L589.94,380.25L557.1,406.5Z","cx":540.13,"cy":372.71,"box":{"x":508.15,"y":358.71,"w":63.95,"h":28},"labelT":0.551},{"d":"M383.61,236.57L398.37,294.02L352.31,303.06L301.55,285.77L293.33,248.92Z","cx":344.5,"cy":268.63,"box":{"x":307.52,"y":254.63,"w":73.96,"h":28},"labelT":0.485},{"d":"M632.28,303.79L565.38,277.89L558.29,260.84L574.6,244.88L631.4,236.01L685.89,261.6Z","cx":616.3,"cy":265.43,"box":{"x":575.36,"y":254.43,"w":81.88,"h":22},"labelT":0.444},{"d":"M360.88,363.82L425.31,354.31L470.79,376.81L471.97,380.96L441.2,411.28L366.77,415.81L365.54,415.09Z","cx":404.02,"cy":386.5,"box":{"x":371.03,"y":366.5,"w":65.98,"h":40},"labelT":0.456},{"d":"M492.33,200.63L461.66,232.2L390.46,230.62L378.81,200.15L428.26,165.2L436.23,165.44Z","cx":428.32,"cy":209.58,"box":{"x":395.52,"y":195.58,"w":65.6,"h":28},"labelT":0.549},{"d":"M589.94,380.25L574.3,346.31L636.91,319.16L672.7,333.22L678.05,379.96L667.46,385.04Z","cx":631.82,"cy":359.39,"box":{"x":596.24,"y":342.39,"w":71.17,"h":34},"labelT":0.583},{"d":"M239.78,311.32L301.55,285.77L352.31,303.06L330.39,350.94L296.58,354.55L236.75,322.32Z","cx":297.37,"cy":318.63,"box":{"x":261.96,"y":307.63,"w":70.82,"h":22},"labelT":0.501},{"d":"M649.48,193.83L631.4,236.01L574.6,244.88L538.51,196.27L554.23,183.57L636.91,182.07Z","cx":596.87,"cy":201.07,"box":{"x":560.69,"y":187.07,"w":72.36,"h":28},"labelT":0.414},{"d":"M473.37,449.34L441.2,411.28L471.97,380.96L557.1,406.5L559.42,417.78L500.09,453.83Z","cx":498.29,"cy":415.69,"box":{"x":462.76,"y":404.69,"w":71.06,"h":22},"labelT":0.48},{"d":"M313.61,184.34L378.81,200.15L390.46,230.62L383.61,236.57L293.33,248.92L284.12,244.36L285.03,192.65Z","cx":332.36,"cy":219.95,"box":{"x":290.85,"y":205.95,"w":83.03,"h":28},"labelT":0.503},{"d":"M672.7,333.22L636.91,319.16L632.28,303.79L685.89,261.6L690.94,261.42L751.86,300.07L738.43,319.7Z","cx":693.13,"cy":305.61,"box":{"x":653.76,"y":294.61,"w":78.73,"h":22},"labelT":0.562},{"d":"M262.52,390.22L296.58,354.55L330.39,350.94L360.88,363.82L365.54,415.09L275.69,412.18Z","cx":320.66,"cy":392.25,"box":{"x":285.67,"y":375.25,"w":69.97,"h":34},"labelT":0.604},{"d":"M540.21,143.63L554.23,183.57L538.51,196.27L492.33,200.63L436.23,165.44L502.8,131.53Z","cx":504.49,"cy":167.38,"box":{"x":472.42,"y":153.38,"w":64.16,"h":28},"labelT":0.549},{"d":"M614.21,442.1L559.42,417.78L557.1,406.5L589.94,380.25L667.46,385.04L658.79,435.83Z","cx":620.72,"cy":407.45,"box":{"x":587.22,"y":390.45,"w":67,"h":34},"labelT":0.508},{"d":"M216.05,247.79L284.12,244.36L293.33,248.92L301.55,285.77L239.78,311.32L188.1,271.66Z","cx":253.78,"cy":269.23,"box":{"x":220.37,"y":252.23,"w":66.81,"h":34},"labelT":0.475},{"d":"M685.89,261.6L631.4,236.01L649.48,193.83L731.78,201.28L738.06,231.91L690.94,261.42Z","cx":688.73,"cy":219.03,"box":{"x":651.97,"y":205.03,"w":73.52,"h":28},"labelT":0.455},{"d":"M364.56,455.94L366.77,415.81L441.2,411.28L473.37,449.34L405.75,477.39Z","cx":406.35,"cy":436.97,"box":{"x":372.7,"y":419.97,"w":67.3,"h":34},"labelT":0.386},{"d":"M387.61,136.22L428.26,165.2L378.81,200.15L313.61,184.34L330.12,136.62Z","cx":363.5,"cy":164.86,"box":{"x":333.27,"y":147.86,"w":60.46,"h":34},"labelT":0.442},{"d":"M737.06,385.13L678.05,379.96L672.7,333.22L738.43,319.7L781.41,360.92Z","cx":715.98,"cy":355.09,"box":{"x":683.49,"y":338.09,"w":64.99,"h":34},"labelT":0.47},{"d":"M189.98,340.7L236.75,322.32L296.58,354.55L262.52,390.22L183.84,377.89Z","cx":232.37,"cy":360.01,"box":{"x":195.6,"y":346.01,"w":73.53,"h":28},"labelT":0.493},{"d":"M650.27,151.79L636.91,182.07L554.23,183.57L540.21,143.63L611.62,120.43Z","cx":595.33,"cy":161.57,"box":{"x":559.52,"y":144.57,"w":71.61,"h":34},"labelT":0.576},{"d":"M522.62,479.93L500.09,453.83L559.42,417.78L614.21,442.1L589.01,488.23Z","cx":558.6,"cy":459.62,"box":{"x":529.48,"y":442.62,"w":58.23,"h":34},"labelT":0.553},{"d":"M241.92,182.86L285.03,192.65L284.12,244.36L216.05,247.79L181.08,203.79Z","cx":247.1,"cy":217.19,"box":{"x":216.01,"y":197.19,"w":62.18,"h":40},"labelT":0.582},{"d":"M751.86,300.07L690.94,261.42L738.06,231.91L814.59,249.74L792.04,290.86Z","cx":756.85,"cy":261.47,"box":{"x":719.22,"y":250.47,"w":75.27,"h":22},"labelT":0.483},{"d":"M257.53,433.44L275.69,412.18L365.54,415.09L366.77,415.81L364.56,455.94L287.84,474.29Z","cx":319.31,"cy":435.69,"box":{"x":280.04,"y":418.69,"w":78.54,"h":34},"labelT":0.472},{"d":"M493.15,110.17L502.8,131.53L436.23,165.44L428.26,165.2L387.61,136.22L422.62,91.25Z","cx":447.93,"cy":124.83,"box":{"x":413.38,"y":113.83,"w":69.1,"h":22},"labelT":0.488},{"d":"M687.61,446.93L658.79,435.83L667.46,385.04L678.05,379.96L737.06,385.13L763.52,432.56Z","cx":703.28,"cy":413.44,"box":{"x":672.54,"y":393.44,"w":61.48,"h":40},"labelT":0.462},{"d":"M156.96,274.64L188.1,271.66L239.78,311.32L236.75,322.32L189.98,340.7L115.46,316.69Z","cx":177.73,"cy":309.26,"box":{"x":142.6,"y":298.26,"w":70.25,"h":22},"labelT":0.523},{"d":"M777.07,131.92L782.28,135.16L794.08,143.16L802.15,149.15L731.78,201.28L649.48,193.83L636.91,182.07L650.27,151.79Z","cx":697.34,"cy":171.88,"box":{"x":656.23,"y":154.88,"w":82.23,"h":34},"labelT":0.471},{"d":"M455.62,543.51L444.27,543.07L426.48,541.91L411.9,540.58L405.75,477.39L473.37,449.34L500.09,453.83L522.62,479.93Z","cx":446.86,"cy":496.43,"box":{"x":415.55,"y":479.43,"w":62.62,"h":34},"labelT":0.426},{"d":"M218.69,112.02L230.41,106.42L244.83,100.13L258.56,94.67L330.12,136.62L313.61,184.34L285.03,192.65L241.92,182.86Z","cx":278.03,"cy":155.32,"box":{"x":247.75,"y":131.32,"w":60.56,"h":48},"labelT":0.576},{"d":"M886.56,331.49L886.49,331.85L883.77,342.37L880.28,352.81L876.03,363.15L875.95,363.32L781.41,360.92L738.43,319.7L751.86,300.07L792.04,290.86Z","cx":826.91,"cy":342.88,"box":{"x":786.32,"y":328.88,"w":81.18,"h":28},"labelT":0.658},{"d":"M146.49,441.85L144.15,439.95L134.21,431.1L124.93,422L116.33,412.67L115.5,411.67L183.84,377.89L262.52,390.22L275.69,412.18L257.53,433.44Z","cx":198.99,"cy":416.36,"box":{"x":146.39,"y":402.36,"w":105.2,"h":28},"labelT":0.561},{"d":"M561.73,60.95L568.74,61.78L586.12,64.31L603.29,67.29L620.23,70.72L623.38,71.44L611.62,120.43L540.21,143.63L502.8,131.53L493.15,110.17Z","cx":569.85,"cy":102.29,"box":{"x":533.81,"y":88.29,"w":72.08,"h":28},"labelT":0.544},{"d":"M693.7,508.17L685,511.31L669.32,516.43L653.27,521.14L636.9,525.43L632.42,526.46L589.01,488.23L614.21,442.1L658.79,435.83L687.61,446.93Z","cx":650.14,"cy":478.07,"box":{"x":618.67,"y":450.07,"w":62.95,"h":56},"labelT":0.525},{"d":"M85.32,234.09L88.98,226.63L94.73,216.55L101.21,206.63L108.41,196.88L111.14,193.59L181.08,203.79L216.05,247.79L188.1,271.66L156.96,274.64Z","cx":142.38,"cy":225.15,"box":{"x":106.21,"y":211.15,"w":72.33,"h":28},"labelT":0.413},{"d":"M738.06,231.91L731.78,201.28L802.15,149.15L805.27,151.46L815.85,160.05L825.79,168.9L835.07,178L843.67,187.33L851.59,196.88L858.79,206.63L865.27,216.55L871.02,226.63L873.11,230.88L814.59,249.74Z","cx":795.66,"cy":215.1,"box":{"x":744.84,"y":201.1,"w":101.64,"h":28},"labelT":0.554},{"d":"M411.9,540.58L408.8,540.29L391.26,538.22L373.88,535.69L356.71,532.71L339.77,529.28L323.1,525.43L306.73,521.14L290.68,516.43L275,511.31L267.58,508.63L287.84,474.29L364.56,455.94L405.75,477.39Z","cx":344.21,"cy":494.87,"box":{"x":293.5,"y":477.87,"w":101.41,"h":34},"labelT":0.495},{"d":"M258.56,94.67L259.71,94.21L275,88.69L290.68,83.57L306.73,78.86L323.1,74.57L339.77,70.72L356.71,67.29L373.88,64.31L391.26,61.78L400.92,60.64L422.62,91.25L387.61,136.22L330.12,136.62Z","cx":350.47,"cy":98.63,"box":{"x":303.3,"y":84.63,"w":94.34,"h":28},"labelT":0.53},{"d":"M875.95,363.32L871.02,373.37L865.27,383.45L858.79,393.37L851.59,403.12L843.67,412.67L835.07,422L825.79,431.1L815.85,439.95L809.37,445.21L763.52,432.56L737.06,385.13L781.41,360.92Z","cx":797.38,"cy":396.35,"box":{"x":760.48,"y":379.35,"w":73.8,"h":34},"labelT":0.427},{"d":"M115.5,411.67L108.41,403.12L101.21,393.37L94.73,383.45L88.98,373.37L83.97,363.15L79.72,352.81L76.23,342.37L73.51,331.85L72.2,324.73L115.46,316.69L189.98,340.7L183.84,377.89Z","cx":136.26,"cy":357.8,"box":{"x":97.5,"y":340.8,"w":77.5,"h":34},"labelT":0.488},{"d":"M623.38,71.44L636.9,74.57L653.27,78.86L669.32,83.57L685,88.69L700.29,94.21L715.17,100.13L729.59,106.42L743.54,113.09L756.99,120.1L769.91,127.47L777.07,131.92L650.27,151.79L611.62,120.43Z","cx":684.68,"cy":123.7,"box":{"x":638.91,"y":112.7,"w":91.55,"h":22},"labelT":0.546},{"d":"M632.42,526.46L620.23,529.28L603.29,532.71L586.12,535.69L568.74,538.22L551.2,540.29L533.52,541.91L515.73,543.07L497.88,543.77L480,544L462.12,543.77L455.62,543.51L522.62,479.93L589.01,488.23Z","cx":551,"cy":516.31,"box":{"x":508.2,"y":502.31,"w":85.61,"h":28},"labelT":0.554},{"d":"M111.14,193.59L116.33,187.33L124.93,178L134.21,168.9L144.15,160.05L154.73,151.46L165.92,143.16L177.72,135.16L190.09,127.47L203.01,120.1L216.46,113.09L218.69,112.02L241.92,182.86L181.08,203.79Z","cx":192.89,"cy":169.1,"box":{"x":159.93,"y":155.1,"w":65.9,"h":28},"labelT":0.624},{"d":"M890,300L889.61,310.64L888.44,321.27L886.56,331.49L792.04,290.86L814.59,249.74L873.11,230.88L876.03,236.85L880.28,247.19L883.77,257.63L886.49,268.15L888.44,278.73L889.61,289.36Z","cx":847.89,"cy":276.97,"box":{"x":819.23,"y":256.97,"w":57.31,"h":40},"labelT":0.514},{"d":"M267.58,508.63L259.71,505.79L244.83,499.87L230.41,493.58L216.46,486.91L203.01,479.9L190.09,472.53L177.72,464.84L165.92,456.84L154.73,448.54L146.49,441.85L257.53,433.44L287.84,474.29Z","cx":223.58,"cy":454.84,"box":{"x":190.15,"y":443.84,"w":66.87,"h":22},"labelT":0.415},{"d":"M400.92,60.64L408.8,59.71L426.48,58.09L444.27,56.93L462.12,56.23L480,56L497.88,56.23L515.73,56.93L533.52,58.09L551.2,59.71L561.73,60.95L493.15,110.17L422.62,91.25Z","cx":472.55,"cy":72.92,"box":{"x":425.55,"y":61.92,"w":93.99,"h":22},"labelT":0.379},{"d":"M809.37,445.21L805.27,448.54L794.08,456.84L782.28,464.84L769.91,472.53L756.99,479.9L743.54,486.91L729.59,493.58L715.17,499.87L700.29,505.79L693.7,508.17L687.61,446.93L763.52,432.56Z","cx":727.76,"cy":461.28,"box":{"x":696.43,"y":450.28,"w":62.67,"h":22},"labelT":0.355},{"d":"M72.2,324.73L71.56,321.27L70.39,310.64L70,300L70.39,289.36L71.56,278.73L73.51,268.15L76.23,257.63L79.72,247.19L83.97,236.85L85.32,234.09L156.96,274.64L115.46,316.69Z","cx":105.17,"cy":279.41,"box":{"x":80.99,"y":265.41,"w":48.36,"h":28},"labelT":0.452}],"bounds":{"x":70,"y":56,"width":820,"height":488}},"compact":{"cells":[{"d":"M560.78,339.15L405.73,300.56L492.33,211.42L641.04,219.45L655.62,254.52Z","cx":551.5,"cy":253.64,"box":{"x":489.37,"y":223.64,"w":124.26,"h":60},"labelT":0.457},{"d":"M367.5,411.72L383.77,304.47L405.73,300.56L560.78,339.15L585.11,374.54L461.05,457.99Z","cx":462.17,"cy":368.34,"box":{"x":385.09,"y":338.34,"w":154.17,"h":60},"labelT":0.433},{"d":"M442.27,160.55L492.33,211.42L405.73,300.56L383.77,304.47L312.1,287.7L278.5,156.91Z","cx":375.38,"cy":212.1,"box":{"x":310.75,"y":168.1,"w":129.25,"h":88},"labelT":0.414},{"d":"M673.96,395.25L585.11,374.54L560.78,339.15L655.62,254.52L836.76,324.66Z","cx":683.69,"cy":328.17,"box":{"x":611.59,"y":302.17,"w":144.2,"h":52},"labelT":0.484},{"d":"M217.35,306.3L312.1,287.7L383.77,304.47L367.5,411.72L154.74,443.09Z","cx":290.34,"cy":363.01,"box":{"x":218.91,"y":319.01,"w":142.85,"h":88},"labelT":0.538},{"d":"M541.14,58.79L551.2,59.71L568.74,61.78L586.12,64.31L603.29,67.29L620.23,70.72L636.9,74.57L653.27,78.86L669.32,83.57L685,88.69L700.29,94.21L715.17,100.13L729.59,106.42L743.54,113.09L747.57,115.19L641.04,219.45L492.33,211.42L442.27,160.55Z","cx":598.28,"cy":132.9,"box":{"x":514.97,"y":94.9,"w":166.61,"h":76},"labelT":0.486},{"d":"M721.01,497.32L715.17,499.87L700.29,505.79L685,511.31L669.32,516.43L653.27,521.14L636.9,525.43L620.23,529.28L603.29,532.71L586.12,535.69L568.74,538.22L551.2,540.29L533.52,541.91L515.73,543.07L497.88,543.77L485.6,543.93L461.05,457.99L585.11,374.54L673.96,395.25Z","cx":587.8,"cy":475.8,"box":{"x":489.63,"y":445.8,"w":196.33,"h":60},"labelT":0.543},{"d":"M76.09,258.17L76.23,257.63L79.72,247.19L83.97,236.85L88.98,226.63L94.73,216.55L101.21,206.63L108.41,196.88L116.33,187.33L124.93,178L134.21,168.9L144.15,160.05L154.73,151.46L165.92,143.16L177.72,135.16L190.09,127.47L202.68,120.29L278.5,156.91L312.1,287.7L217.35,306.3Z","cx":200.85,"cy":229.96,"box":{"x":120.98,"y":191.96,"w":159.76,"h":76},"labelT":0.559},{"d":"M890,300L889.61,310.64L888.44,321.27L888.06,323.34L836.76,324.66L655.62,254.52L641.04,219.45L747.57,115.19L756.99,120.1L769.91,127.47L782.28,135.16L794.08,143.16L805.27,151.46L815.85,160.05L825.79,168.9L835.07,178L843.67,187.33L851.59,196.88L858.79,206.63L865.27,216.55L871.02,226.63L876.03,236.85L880.28,247.19L883.77,257.63L886.49,268.15L888.44,278.73L889.61,289.36Z","cx":758.24,"cy":225.73,"box":{"x":674.34,"y":195.73,"w":167.81,"h":60},"labelT":0.499},{"d":"M485.6,543.93L480,544L462.12,543.77L444.27,543.07L426.48,541.91L408.8,540.29L391.26,538.22L373.88,535.69L356.71,532.71L339.77,529.28L323.1,525.43L306.73,521.14L290.68,516.43L275,511.31L259.71,505.79L244.83,499.87L230.41,493.58L216.46,486.91L203.01,479.9L190.09,472.53L177.72,464.84L165.92,456.84L154.73,448.54L150.82,445.37L154.74,443.09L367.5,411.72L461.05,457.99Z","cx":320.27,"cy":463.22,"box":{"x":233.56,"y":437.22,"w":173.43,"h":52},"labelT":0.448},{"d":"M202.68,120.29L203.01,120.1L216.46,113.09L230.41,106.42L244.83,100.13L259.71,94.21L275,88.69L290.68,83.57L306.73,78.86L323.1,74.57L339.77,70.72L356.71,67.29L373.88,64.31L391.26,61.78L408.8,59.71L426.48,58.09L444.27,56.93L462.12,56.23L480,56L497.88,56.23L515.73,56.93L533.52,58.09L541.14,58.79L442.27,160.55L278.5,156.91Z","cx":359.76,"cy":120.69,"box":{"x":272.7,"y":94.69,"w":174.13,"h":52},"labelT":0.541},{"d":"M888.06,323.34L886.49,331.85L883.77,342.37L880.28,352.81L876.03,363.15L871.02,373.37L865.27,383.45L858.79,393.37L851.59,403.12L843.67,412.67L835.07,422L825.79,431.1L815.85,439.95L805.27,448.54L794.08,456.84L782.28,464.84L769.91,472.53L756.99,479.9L743.54,486.91L729.59,493.58L721.01,497.32L673.96,395.25L836.76,324.66Z","cx":753.65,"cy":415,"box":{"x":702.43,"y":389,"w":102.44,"h":52},"labelT":0.45},{"d":"M150.82,445.37L144.15,439.95L134.21,431.1L124.93,422L116.33,412.67L108.41,403.12L101.21,393.37L94.73,383.45L88.98,373.37L83.97,363.15L79.72,352.81L76.23,342.37L73.51,331.85L71.56,321.27L70.39,310.64L70,300L70.39,289.36L71.56,278.73L73.51,268.15L76.09,258.17L217.35,306.3L154.74,443.09Z","cx":137.73,"cy":330.9,"box":{"x":88.63,"y":304.9,"w":98.19,"h":52},"labelT":0.424}],"bounds":{"x":70,"y":56,"width":820,"height":488}}}};
function buildPoemGeometry(kind,compact=false){
    const model=GEOMETRIES[kind][compact?'compact':'wide'];
    return {bounds:model.bounds,cells:model.cells};
  }
  PAGES.forEach((page,index)=>{page.words=POEM_WORD_BANKS[index].words;page.compactWords=POEM_WORD_BANKS[index].compactWords;});
  const POEMS=[{"paragraphs":["Me hizo recordar esos días, en donde las lecciones comenzaban a ser duras.","Los demás jugando libremente, mientras cohibida estaba ella en una esquina,","La veían débil, pero lo que no sabían era que estaba planeando algo.","Su vida siempre fue diferente, durante su crecimiento, todo eran celos y envidias que pretendían enraizarla y no dejarla volar.","Desde ese día, decidió convertirse en una roca, para que nada la pudiera mover. Estaba tan sucia por todo el lodo que corroía sus aperladas plumas.","Durante los años, veía a otros de su especie entrar a una corriente de vientos que pasaban esporádicamente cada cierto tiempo. Pareciera que dejara estelas de vapor, formando espirales de colores que dirigen a las esquinas de otros mundos, pero la corriente solo succiona a los ligeros.","Con todas sus fuerzas ella hacía todo para limpiar su aspecto, pero esas alas aperladas no relucían como antes, trataba de volar, pero sus alas todavía eran pesadas.","Un peatón de los muchos que pasaban por el parque decidió llevarla a casa. Le limpiaba las heridas que la irritación de la tierra húmeda le había causado, ella se sentía morir.","Luego de meses de cuidado, el peatón la llevó de regreso al parque. Ella estaba determinada a quedarse en el mismo lugar esperando que la onda de colores volviera a brillar frente a sus ojos.","Pasaban años, y no veía nada. Ella no veía nada. Hasta que un día las vio.","Su felicidad era muy grande, pero estaba extrañada que sus compañeros no volaran hacia los colores brillantes.","Emprendió vuelo, las luces ahora se reflejaban en sus plumas. En cualquier momento, la corriente la tomaría entre sus vapores y la llevaría a un mejor lugar. Ella volaba y volaba, aleteaba, pero no había nada succionándola. Estaba volando mucho más arriba de lo que era usual, pero no iba a parar.","Sentía una presión en su pecho, algo no estaba bien. Sus pulmones ya no funcionaban. Comenzó a perder conciencia. Cayendo en picada, el golpeteo de sus plumas, ella caía.","Recuerdo que fue el momento en donde volteé a ver el cielo y veía algo caer desde lo alto, hasta que cayó sobre el periódico que leía. La fuerza con la que cayó hizo que mis dos fémures se quebraran a la mitad. Inmediatamente las personas de alrededor llamaban a la ambulancia, pero mientras llegaba, delirando del dolor, intentaba ver exactamente qué era lo que había caído sobre mí.","Luego de la operación, me llevaban al cuarto de hospital compartido en donde en la otra cama, se encontraba una mujer, envuelta en vendajes que le cubrían todo el cuerpo menos la cara, parecía no tener forma. El cuarto lo dividía una sencilla cortina de algodón muy delgada, lo que nos permitió conocernos y que me contara su historia.","Dos horas pasaron luego que terminara de contarme su historia, cuando entró el doctor a revisarme y exclamó “Es una suerte que hayas tenido este cuarto solo para ti, raras veces pasa”. Corrió la cortina y no había nadie en","la otra cama, solo estaba la ventana abierta. La vi de lejos, volando de nuevo pero ahora ya dentro de los vapores coloridos."],"textSource":"PDF proporcionado por la autora"},{"paragraphs":["Se siente muy lejos,","Se siente inalcanzable, de esas que estiras la mano y la tocas, pero no está realmente allí.","Los ojos lo ven tan claro como el agua, pero los sentidos no lo perciben","¿Cómo es eso posible?","Volando contra la corriente, tratando de alcanzar,","Desesperadamente. El frío le seca los ojos y la velocidad, mientras más se acerca, desfigura su piel","Si tan solo…","Si tan solo pudiera estirar un poco más","Solo un poco más…","La logra alcanzar. Lo logró. ¡De verdad lo ha logrado!","¿Lo ha logrado?","Se le desvanece de las manos","y comienza a caer en un vacío infinito","Sus plumas revoltosas por la caída,","esa presión en el pecho.","Las piernas desfiguradas por esa misma fuerza que ahora pareciera que la succiona.","Siente las lágrimas dentro de su garganta, pero no logran salir","La garganta se le cierra.","Ya no hay más acceso a la vida.","Cae, cae, pero cae como el peso muerto que ahora es.","Repentinamente siente su pulso otra vez,","Vuelve a abrir los ojos.","¿Sigue con vida?"],"textSource":"PDF proporcionado por la autora"},{"paragraphs":["Este mundo era diferente","Era real, colorido y brillante.","Los astros brillaban durante el día, y la noche dentro del mar","Que con sus olas rasca las terrazas de los rascacielos","Creciendo alternos a los árboles.","Ahora hay tres capas: las raíces, donde todos viven, la superficie, donde todos expresan sus talentos y el mar, donde todos admiran los astros vivos.","El aire está conformado por viruta de diamantes, por lo que todos usan un filtro en las fosas nasales y la garganta para poder soportarlo. Los ojos poco a poco se adecúan al dolor.","Inhalo","Exhalo","Por alguna razón se siente bien","Se siente bien en este nuevo mundo en el que ha aterrizado","Un sentimiento de orgullo le llena","Ese vacío en el que, por un momento, ella caía.","Ella todavía no reside, apenas es una nómada que duerme en las calles mientras le pisotean sus alas.","Pero está viva, en una nueva oportunidad,","Ella cree que es real, y podría serlo."],"textSource":"PDF proporcionado por la autora"},{"paragraphs":["No tengo idea por qué estoy aquí.","Luché por tantos años por seguir lo que veía, lo que tenía enfrente de mis ojos,","Y ahora aquí, estoy tirada en la calle de un lugar oscuro, sin luz.","Yo vivía de los rayos solares que suaves rozaban mi piel y mis plumas a veces brillaban por tantas vitaminas que nutrían su fuerza y agilidad.","Aquí no se puede volar, aquí no hay cielo, hay mar.","Quiero llegar a tocarlo, pero no sé cómo escalar","Esos altos edificios que intimidan hasta al más poderoso, no sé si voy a poder más.","Encontré una cueva, formada por la raíz de una Ceiba.","La gente tira sus desechos aquí, pero en una esquina, encontré un artefacto,","Como en el mundo del que vengo le dirían, un piano.","No tengo ni idea cómo se usa, solo lo he escuchado.","La combinación de teclas es deliciosa para mis tímpanos que resuenan a su sonar.","Necesito esas notas para volver a sentir esa pasión que algún día tuve.","Pero ahora solo veo las teclas enlodadas, igual que mis preciosas alas.","Es lo único que tengo, es lo único a lo que le confío.","Tengo que volverme a construir, a lijar mis garras para poder trepar esos edificios","Y poder llegar","A tocar esas aguas majestuosas que quizás me den una pista para saber por dónde seguir","Esta ruta que, sin saberlo, elegí.","Pero para mientras, toco una triste melodía","Que consiste de tan solo tres notas seguidas.","Si las toco lentamente, arrullan mi alma","Y, por fin, logro descansar."],"textSource":"PDF proporcionado por la autora"},{"paragraphs":["Intenté contarles a todos, pero nadie me creyó.","Culparon a la anestesia por mis delirios.","Mi insistencia hizo que me mandaran a meses de terapia,","Pero nadie nunca entendió.","En las noticias hablaron de mí un par de días,","Ya que una empresa constructora tomó la culpa","De la viga de hierro, que quebró mis huesos.","Nunca entendí por qué crearon tantas falsas historias con tal de cubrir mi verdad.","Todavía me cuesta andar. Mi terapista dice que me tomará un año regresar a la normalidad.","Mi vida es normal, es simple.","Pero ese día me cambió,","Cambió mi percepción.","Siempre pensé que las oportunidades caen del cielo, y precisamente fue así","Una oportunidad, una historia, que ahora la transformé en una nueva forma de vida.","Nunca realmente llegué a verla detenidamente… eso me hubiera gustado.","Mi reflejo en el espejo me hace recordar, melancolías.","Escuchar su historia; esa voz de fuego.","Acaricio mis mejillas, trayendo recuerdos de amores pasados.","Podía sentir bajo mi piel cómo la sangre circulaba.","Mis pupilas siempre han sido así.","Otra vez me sentí despierto.","La derecha dilatada y la izquierda no. Me hace sentir especial, por aquel famoso que lo hizo popular.","Su aroma era suave y delicado, no iba con su personalidad.","No entiendo qué hacer ahora. Mi propio reflejo me lo dice.","Tengo una casa, tengo un carro, tengo una familia, o solía tenerla…","Puede que ya no tenga mucho tiempo, o quizás sí.","Quizás y solo quizás, si pudiera volverle a hablar, verla volar...","Qué no daría por verla otra vez, alcanzando sus amados vientos de colores…"],"textSource":"PDF proporcionado por la autora"},{"paragraphs":["El suelo de ambos mundos se estremece","Por las pasiones que pudieron pasar, pero nunca fueron.","Ella se asoma a una de las calles, sus brazos aún están débiles y le cuesta salir de la","cueva.","Puede ver cómo los tintes púrpuras de este nuevo lugar reflejan sobre la piel de sus","manos.","Una tercera mano aparece, y le ofrece ayuda, pero retira la mano y corre de nuevo a","su piano.","...","Lo siento, no soy nadie único.","Mi vida es simple y la verdad es que quisiera ser especial.","Los cuentos de amor ya no me calan bajo la piel, solo algunos, antes eran la","mayoría.","Ya no sé qué hacer, de verdad. Quisiera nada más saltar todos los pasos que hay para","llegar al mar,","Pero es completamente imposible. Quiero pasar de la A a la Z, pero no se puede.","¿Será que mas de algún ser vivo lo ha hecho?","Tiene que haber un atajo, sin que tenga repercusiones.","¡¡Me lo prometieron!! ¡Todos me lo prometieron! ¡Era siempre tan fácil y ahora que","me toca a mí, no lo es!","En este momento, incluso dudo si siquiera sé escribir o leer. Soy un cuerpo relleno","de órganos y fluidos que hacen que esta farsa funcione.","No tengo nada, ni siquiera me tengo a mí.","¿En dónde más busco?","Es todo un romanticismo; el sentarme en el piano, para pensar tristes melodías…","pero luego de eso, ¿qué? ¿Quién me viene a salvar?","¿Alguien me salva?"],"textSource":"PDF proporcionado por la autora"},{"paragraphs":["Aquí estoy comenzando de nuevo","Puede que sea uno lento","Duele el orgullo intentar pintar algo y que todo falle.","No importa con cuántas ganas lo hice. Sin técnica no hay paraíso","Mi padre sigue trabajando en el viñedo. Lo extraño. Él no tiene ni idea de mi cambio de carrera","Solo pienso en regresar a esas largas praderas y correr junto al viento. Pero me he jurado no regresar hasta que logre hacerte orgulloso papá.","Con toda la esperanza del mundo comencé un lienzo, uno grande, pero al dibujar lo que quería, fallé.","Se sintió como caer de un edificio sin paracaídas.","Caí sin llegar al piso. Una caída infinita como un torbellino cargándome y colocándome lentamente en el pavimento.","Acostada en el piso, viendo hacia el cielo, tratando de encontrar las fuerzas para volverme a parar.","Parpadeo lento, puedo oler eucalipto y ver un cielo celeste y nubes blancas pasar.\n¡Qué atrevido el mundo que sigue dando vueltas mientras yo ni me puedo parar!","Sé que tengo que volver a empezar.","Soy un nómada de profesiones. Cambiando de una a otra. A veces siento que vuelo, pero sin alas. Algún día lo voy a lograr y te prometo papá que volveré triunfante."],"textSource":"Poemas del Alma"},{"paragraphs":["Un cielo gris","acalla el despertar","de una noche desvelada","Cansada de tanto llorar","Los astros hinchados","asemejan los ojos","de un alma que no ha","podido despertar"],"textSource":"Poemas del Alma"},{"paragraphs":["Lo escuchas?","escucha La Tierra manifestar","su rebelión contra los vivos que pueden razonar","La naturaleza de aquellos es cruel","van destruyendo un paso a la vez","esa maravilla que alguna vez fue","ahora se defiende ante la autodestrucción de aquel","Afectados están los dos","Querellando entre el mayor y el menor","mientras uno es más ágil,","el otro con sabiduría reacciona al dolor"],"textSource":"Poemas del Alma"},{"paragraphs":["Lo único que tengo es un nombre y apellido","Lo que siempre quise ser, no lo soy","El otro camino que tomé, no soy la mejor.","Ni el mar abraza mi cuerpo","Avergonzado de cómo fue","Desperdiciado es fuego que ahora","Lo único que quema es papel","Rezumando espinas","Caen las gotas a color","Sobre mi pecho","Ensuciando la reputación que, algún día","Quiso tener y que ahora reside en un lecho"],"textSource":"Poemas del Alma"},{"paragraphs":["Tengo acelerado el corazón","Nunca me había sentido tan cerca de la muerte","Tan cerca que me toca las manos y helada me deja.","La sangre ya solo en la cara me queda","Porque la demás a mi pasión le hereda.","Ese miedo cada noche al irme a dormir","Sin saber si otro día podré vivir.","Es la energía que me levanta al amanecer","Con esa euforia, que, en el ocaso, vuelve y me aterra.","Es como si una nueva persona se vistió de mi piel","Y la maneja sin piedad","La lleva a sus límites y no sabe hasta dónde podrá más.","Mis lágrimas son de fuego y queman","Cuando caen por mi tez","Pero con la misma energía que una vez cayeron,","Regresan a su hogar para confortarme","De nuevo y empezar el día una vez más.","05/26/20"],"textSource":"Poemas del Alma"},{"paragraphs":["Incluso se me acabaron las lágrimas de tanto llorar.","Mi tez ahora acostumbrada, se reseca cuando no siente esas gotas.","Tuve dinero y no amor y no lo quise. Tengo amor y no dinero y sigue infeliz.","No sé qué más, me pregunto si es correcto el camino que elegí ya que nada se siente bien,","O solo es un momento de esos amargos de la vida, lo único que tengo que","Hacer es aguantar, aguantar un poco más en esta agonía,","La desesperación de no poder salir, el sentimiento","De encierro, de impotencia.","Trato de ayudar, no me dejan ayudar","Trato de crear, tengo que estudiar muchísimo para lograr hacerlo bien","Lo hago bien, a los de la institución no les interesa.","Ya ni los títulos hacen sentido si solo","Los regalan sin valor alguno.","Puedes estar en un país primer mundista,","Gente muere por estar aquí, y ahora que vivo en una de las ciudades más prestigiosas,","La odio con todo mi corazón. Nada me satisface. Hago todos mis pasatiempos, pero nada me complace.","Ya los hice todos, ya me cansé. Me cansé de ser una niña mantenida,","Tengo todas las herramientas posibles para salir al mundo","Pero ahora resulta que todo depende de la residencia.","Es imposible ser libre en este mundo.","Es completamente imposible.","Vivir siempre con el miedo de estar haciéndolo mal.","Escribo, ¡Me emociono por algo por fin!","Y recibo mensajes hostiles por no haber puesto una mayúscula.","Ni siquiera en un mundo en línea encuentro esa libertad.","Claro, la vida tiene sus altos y sus bajos.","Lo preocupante es","Cuando los bajos","Comienzan a ser","Mucho más constantes","Hirientes","Sin salida."],"textSource":"Poemas del Alma"}];
  const SONGS=[{"title":"Sorrow'sDeep","tags":["agua","calma","introspeccion"],"idea":"contemplación junto al agua","listen":"https://open.spotify.com/track/6tqw9IvBUubD54L0InQZqZ?si=9819f8898d4840c6","page":"/music/sdlc-01/#track-01-sorrow-sdeep"},{"title":"The Bongos","tags":["introspeccion","calma","claridad"],"idea":"un pensamiento que encuentra claridad","listen":"https://open.spotify.com/track/7BDZhZj2Dptg7OJXyOHqkz?si=9f72f04300a24527","page":"/music/sdlc-01/#track-02-the-bongos"},{"title":"Aurel","tags":["encierro","agua","miedo","escape","piano","renacer"],"idea":"un escape que transforma miedo en impulso","listen":"https://open.spotify.com/track/1Sy6P5C26wsJRTDII76xXW?si=a1429ab1dccc4e9e","page":"/music/sdlc-01/#track-03-aurel"},{"title":"Nebuú","tags":["agua","incertidumbre","renacer","amor"],"idea":"un mundo incierto que se vuelve habitable por el amor","listen":"https://open.spotify.com/track/388U7xrRgLbWrLII1Xz99D?si=c097f272ed904210","page":"/music/sdlc-01/#track-04-nebuu"},{"title":"Crystal","tags":["cielo","vuelo","calma","introspeccion","luz"],"idea":"mirar la vida desde nubes luminosas","listen":"https://open.spotify.com/track/4q99bQf60rbszxJ4Ok3p7J?si=0ee84007b7004d50","page":"/music/sdlc-01/#track-05-crystal"},{"title":"Green Tea","tags":["encierro","lucha","miedo","supervivencia","renacer"],"idea":"sobrevivir a una prueba y continuar","listen":"https://open.spotify.com/track/5bI87PYjOM651eZxl3oUID?si=2c84627e12064caf","page":"/music/sdlc-01/#track-06-green-tea"},{"title":"Aurelillo","tags":["calma","vuelo","luz","renacer"],"idea":"flotar hacia el siguiente capítulo","listen":"https://open.spotify.com/track/0SERYFAVImxMROzoeD7VrV?si=0d77c02baba64d40","page":"/music/sdlc-01/#track-07-aurelillo"},{"title":"que Soñaba en el piano","tags":["piano","duda","dolor","introspeccion","creacion"],"idea":"volver al piano tras una crítica dolorosa","listen":"https://open.spotify.com/track/3HMjQdXRUSy782c7zUCmTa?si=112ac0261e8b4c64","page":"/music/sdlc-02/#track-01-que-sonaba-en-el-piano"},{"title":"David Jones Snow","tags":["agua","lucha","heridas","noche","supervivencia"],"idea":"seguir adelante entre olas y cicatrices","listen":"https://open.spotify.com/track/1L6PcQJadFjFTvSSDLyk2n?si=c88b008a65984267","page":"/music/sdlc-02/#track-02-david-jones-snow"},{"title":"Dream 2","tags":["dolor","encierro","miedo","renacer"],"idea":"salir del dolor que acompaña a la protagonista","listen":"https://open.spotify.com/track/2gFLlMdJfXBuAefLhquzJ5?si=75a22c4b545e46eb","page":"/music/sdlc-02/#track-03-dream-2"},{"title":"Tortilla Song","tags":["lucha","fuego","creacion","juego"],"idea":"encontrar una forma propia en la imperfección","listen":"https://open.spotify.com/track/1nKLIpx5RAfYaypFxcmadr?si=21e885a7b55f4802","page":"/music/sdlc-02/#track-04-tortilla-song"},{"title":"Cowgirl","tags":["vuelo","noche","calma","esperanza","juego"],"idea":"flotar y confiar en el rescate","listen":"https://open.spotify.com/track/4WqTJHZJekHE0UTYWmygC2?si=bf7e976bb90240ea","page":"/music/sdlc-02/#track-05-cowgirl"},{"title":"Wait for me UNO","tags":["ciclo","busqueda","juego","piano"],"idea":"perseguir el primer pulso de un círculo","listen":"https://open.spotify.com/track/174g41i2TphNDLr9GRZQZG?si=f9d29385b8e043f5","page":"/music/sdlc-02/#track-06-wait-for-me-uno"},{"title":"Dar","tags":["fe","miedo","esperanza","amor","renacer"],"idea":"aceptar una misión desde el miedo y la esperanza","listen":"https://open.spotify.com/track/0umPWnToJvynL6UVczEphR?si=8fc9a0c1be0f4685","page":"/music/sdlc-07/#track-01-dar"},{"title":"romA","tags":["amor","cielo","vuelo","piano","calma"],"idea":"amor y vida cotidiana alrededor del piano","listen":"https://open.spotify.com/track/2UlpfPcwWfZO14aAW0AWKx?si=02d9faf8999542cb","page":"/music/sdlc-07/#track-02-roma"},{"title":"OOO2","tags":["agua","noche","miedo","supervivencia","busqueda"],"idea":"avanzar hacia lo desconocido mientras el barco se hunde","listen":"https://open.spotify.com/track/6NhoGI1RnAldlaX5FQNJXg?si=2529a92621a24e1c","page":"/music/sdlc-07/#track-03-ooo2"},{"title":"Anoche","tags":["fe","duda","piano","renacer"],"idea":"sostenerse en un diálogo interior","listen":"https://open.spotify.com/track/2hk657AuLlm5RFW30GAgyd?si=0c8da846ef4743e5","page":"/music/sdlc-10/#track-01-anoche"},{"title":"The Rebellion","tags":["rabia","injusticia","lucha","encierro"],"idea":"dos corrientes en conflicto sin salida inmediata","listen":"https://open.spotify.com/track/1SBIqqAJ2jkOWCBZizV9k8?si=834f4a54568446a6","page":"/music/sdlc-10/#track-02-the-rebellion"},{"title":"John 3:16","tags":["fe","amor","calma","esperanza"],"idea":"una pausa para leer, orar y reflexionar","listen":"https://open.spotify.com/track/7nFUIgy2dFCMHJFgfuGIee?si=c5bec00d14624a81","page":"/music/sdlc-10/#track-03-john-3-16"},{"title":"Sandais","tags":["incertidumbre","color","renacer","creacion"],"idea":"la espera que desemboca en color y movimiento","listen":"https://open.spotify.com/track/3uDA8WEPGWFYJxfD1XEmiX?si=63c8ff5402804ef2","page":"/music/sdlc-10/#track-04-sandais"},{"title":"Lo que vibra en la vida","tags":["agua","supervivencia","mundo","renacer","lucha"],"idea":"llegar a una tierra desconocida y comenzar de nuevo","listen":"https://open.spotify.com/track/6V6qN4ECH617Zc6NWc4LJy?si=bf9b23d3646544af","page":"/music/sdlc-10/#track-05-lo-que-vibra-en-la-vida"},{"title":"I hate to love you","tags":["creacion","heridas","lucha","dolor","renacer"],"idea":"aceptar una crítica para seguir creando","listen":"https://open.spotify.com/track/2HZ6dTdViaYssZrWROnUnF?si=8d54798dc6384223","page":"/music/sdlc-10/#track-06-i-hate-to-love-you"},{"title":"Don Perro","tags":["rabia","juego","creacion","libertad"],"idea":"una rebeldía alegre y rítmica","listen":"https://open.spotify.com/track/5ceMVILE4dPtcfmwNX8KQm?si=05c34c940a414bb1","page":"/music/sdlc-10/#track-07-don-perro"},{"title":"Disdain","tags":["rabia","injusticia","envidia","dolor"],"idea":"reconocer y rechazar la envidia","listen":"https://open.spotify.com/track/3QKhxn7ZqluvCwXvj4CsMg?si=d1b7f175eb784e23","page":"/music/sdlc-10/#track-08-disdain"},{"title":"Te Quiero","tags":["vuelo","encierro","cueva","piano","heridas","supervivencia","renacer","luz","amor"],"idea":"el hallazgo de una salida musical dentro de la cueva de una figura alada","listen":"https://open.spotify.com/track/53GvrGVEFuwgua91IcXwIQ?si=ce90b7c46d4940ec","page":"/music/sdlc-10/#track-09-te-quiero"},{"title":"...25 (Bonus Track)","tags":["amor","fe","calma","noche"],"idea":"calor compartido en una noche de Navidad","listen":"https://open.spotify.com/track/0M3NtfoccziVXd9WHnYxpM?si=b7f410a712bb4c9f","page":"/music/sdlc-10/#track-10-25-bonus-track"},{"title":"Linden Ocean","tags":["agua","incertidumbre","calma","renacer","piano"],"idea":"atravesar un mar inquieto e incierto hasta llegar al alivio de la tierra firme","listen":"https://open.spotify.com/track/0VDMTcgDbNsSpoRpsJXIyz?si=0d0f29f98765438e","page":"/music/sdlc-11/#track-01-linden-ocean"},{"title":"Logic","tags":["ciclo","incertidumbre","noche","mundo","suenos"],"idea":"volver a un paisaje cotidiano que cambia poco a poco hasta sentirse extraño","listen":"https://open.spotify.com/track/0AOL1Fv2DBxzeRmF65HPda?si=093ec3292a164978","page":"/music/sdlc-11/#track-02-logic"},{"title":"El Tuki Tuki","tags":["juego","familia","introspeccion","fuego","agua"],"idea":"recordar un día de juegos, conversaciones y comida con amigos que termina junto a la piscina bajo los fuegos artificiales","listen":"https://open.spotify.com/track/0Y3dsfQjj334gpGZChCsfp?si=627669feb02e475c","page":"/music/sdlc-11/#track-03-el-tuki-tuki"},{"title":"Magical Project","tags":["calma","luz","fe","mundo","busqueda"],"idea":"contemplar la luz de un bosque en calma hasta una revelación inspirada en Nuestra Señora de Champion","listen":"https://open.spotify.com/track/14ow0DnfRXg7CRpONSVpTH?si=04e3491213744e95","page":"/music/sdlc-11/#track-04-magical-project"},{"title":"songon B","tags":["busqueda","lucha","mundo","piano","esperanza"],"idea":"crecer entre descubrimientos, responsabilidad y esfuerzo en una aventura de gran escala","listen":"https://open.spotify.com/track/1zo7lgwUzudMEH1sG3OhkD?si=b9e25049b72f4eb5","page":"/music/sdlc-11/#track-05-songon-b"},{"title":"Project 0","tags":["incertidumbre","lucha","esperanza","renacer","introspeccion"],"idea":"seguir esforzándose en el presente a pesar de la incertidumbre, sin perder la esperanza en el futuro","listen":"https://open.spotify.com/track/0taxwy9jN8m2KilAPOkgJc?si=3f165203a784419c","page":"/music/sdlc-11/#track-06-project-0"},{"title":"Oración A Jesús","tags":["fe","introspeccion","calma","ciclo","claridad"],"idea":"atravesar las distracciones de la oración hasta encontrar calma y contemplación en Dios","listen":"https://open.spotify.com/track/5dW6iYf3pe6NonI0hMmLee?si=bf07a1f39a4c4914","page":"/music/sdlc-11/#track-07-oracion-a-jesus"},{"title":"Elbe","tags":["calma","agua","amor","fuego","noche","luz"],"idea":"encontrar estabilidad y un refugio cálido junto a las olas suaves del océano","listen":"https://open.spotify.com/track/4v7I3uTNB3Turu15iYeJTA?si=a7e941e576324bdb","page":"/music/sdlc-11/#track-08-elbe"},{"title":"Lala","tags":["color","suenos","calma","ciclo","vuelo"],"idea":"dejar que un espacio púrpura y suspendido llegue a su culminación y a un final tranquilo","listen":"https://open.spotify.com/track/4TY02J6McUe5sNuQaKU0KH?si=1f5282feece744a0","page":"/music/sdlc-11/#track-09-lala"},{"title":"Seda","tags":["piano","luz","calma","cielo","mundo"],"idea":"despedirse en calma con un piano entre árboles iluminados por el sol","listen":"https://open.spotify.com/track/51yRUSnAZPVSzcj1uhOZhH?si=80767abd5f804dde","page":"/music/sdlc-11/#track-10-seda"}];
  const ALBUMS=[{title:'SDLC_01',note:'Best Soundtracks',url:'/music/sdlc-01/'},{title:'SDLC_02',note:'Anoche',url:'/music/sdlc-02/'},{title:'SDLC_07',note:'',url:'/music/sdlc-07/'},{title:'SDLC_10',note:'',url:'/music/sdlc-10/'},{title:'SDLC_11',note:'Ambience',url:'/music/sdlc-11/'}];
  const themeLabels={vuelo:'el vuelo',encierro:'encierro',cueva:'la cueva',piano:'la música',heridas:'las heridas',supervivencia:'sobrevivir',renacer:'un nuevo comienzo',luz:'la luz',amor:'el amor',miedo:'el miedo',agua:'el agua',noche:'la noche',mundo:'un mundo nuevo',lucha:'la lucha',calma:'la calma',introspeccion:'la reflexión',rabia:'la rabia',injusticia:'la injusticia',creacion:'crear',fe:'la fe',duda:'la duda',busqueda:'la búsqueda',color:'el color',ciclo:'volver',juego:'el juego',esperanza:'la esperanza',incertidumbre:'la incertidumbre',claridad:'la claridad',envidia:'la envidia',libertad:'la libertad',fuego:'el fuego',dolor:'el dolor'};
  const poemThemes=[['vuelo','heridas','renacer'],['vuelo','busqueda','miedo'],['mundo','agua','renacer'],['cueva','piano','lucha'],['heridas','amor','duda'],['cueva','piano','amor'],['creacion','lucha','renacer'],['noche','calma','dolor'],['mundo','rabia','injusticia'],['heridas','creacion','dolor'],['miedo','supervivencia','renacer'],['encierro','duda','lucha']];
  const stems=[['plum','vuelo'],['ala','vuelo'],['vol','vuelo'],['cielo','vuelo'],['cueva','cueva'],['oscuro','encierro'],['encier','encierro'],['piano','piano'],['tecla','piano'],['melod','piano'],['nota','piano'],['musi','piano'],['herid','heridas'],['lodo','heridas'],['quebr','heridas'],['dolor','heridas'],['renac','renacer'],['nuevo','renacer'],['volver','renacer'],['vida','renacer'],['luz','luz'],['brill','luz'],['amor','amor'],['quier','amor'],['mar','agua'],['agua','agua'],['ola','agua'],['noche','noche'],['astro','noche'],['miedo','miedo'],['temor','miedo'],['mundo','mundo'],['tierra','mundo'],['luch','lucha'],['fuerza','lucha'],['calma','calma'],['paz','calma'],['pens','introspeccion'],['rabia','rabia'],['rebel','rabia'],['injust','injusticia'],['crea','creacion'],['dibuj','creacion'],['fe','fe'],['duda','duda'],['busc','busqueda'],['camino','busqueda'],['color','color'],['ciclo','ciclo'],['vuelta','ciclo'],['jueg','juego'],['esper','esperanza'],['incertid','incertidumbre'],['clari','claridad'],['envid','envidia'],['libre','libertad'],['fuego','fuego']];
  const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  const WORD_THEMES={"heridas":{"heridas":1.6,"dolor":1.1},"cuidado":{"compasion":1.6,"confianza":1.2,"amor":0.8},"felicidad":{"alegria":1.7,"confianza":0.7},"celos":{"envidia":1.8,"injusticia":0.8},"esperando":{"paciencia":1.5,"esperanza":1.0},"companeros":{"compania":1.5,"memoria":0.6},"libremente":{"libertad":1.5,"juego":0.9},"brillar":{"luz":1.5,"esperanza":0.7},"roca":{"estabilidad":1.3,"encierro":0.8},"historia":{"memoria":1.4,"compania":0.8,"asombro":0.7},"volando":{"vuelo":1.5,"escape":1.0,"lucha":1.1},"colores":{"color":1.5,"asombro":0.8,"memoria":0.8},"envidias":{"envidia":1.8,"injusticia":1.1},"jugando":{"juego":1.6,"alegria":0.9},"casa":{"refugio":1.6,"compasion":1.1,"estabilidad":1.0},"fuerzas":{"perseverancia":1.7,"lucha":1.1},"ligeros":{"vuelo":1.4,"escape":0.7},"luces":{"luz":1.4,"esperanza":0.7},"determinada":{"perseverancia":1.7,"esperanza":1.0},"plumas":{"vuelo":1.2,"heridas":0.5,"miedo":0.6,"memoria":0.8},"vuelo":{"vuelo":1.6,"libertad":0.8},"dolor":{"dolor":1.5,"heridas":1.1,"adaptacion":0.8,"injusticia":1.2},"ventana abierta":{"escape":1.4,"renacer":1.0},"vientos":{"vuelo":1.2,"mundo":0.5},"lejos":{"busqueda":1.3,"incertidumbre":1.2},"inalcanzable":{"busqueda":1.5,"duda":1.3},"alcanzar":{"perseverancia":1.5,"busqueda":1.1},"frio":{"miedo":1.0,"noche":0.5},"lagrimas":{"dolor":1.5,"heridas":0.6,"lucha":0.8,"agotamiento":0.8},"pulso":{"renacer":1.7,"supervivencia":1.2},"vida":{"renacer":1.5,"supervivencia":1.5,"adaptacion":1.0,"identidad":1.2,"duda":0.9,"perseverancia":1.3,"incertidumbre":0.9},"otra vez":{"renacer":1.4,"ciclo":1.2},"ojos":{"claridad":1.2,"duda":0.8,"introspeccion":1.0,"busqueda":0.8,"agotamiento":1.3},"fuerza":{"lucha":1.3,"miedo":0.8,"perseverancia":1.3},"caida":{"miedo":1.5,"incertidumbre":1.2},"agua":{"agua":1.2,"claridad":1.0},"sentidos":{"introspeccion":1.4,"duda":1.0},"corriente":{"lucha":1.3,"agua":1.0},"desesperadamente":{"lucha":1.5,"miedo":1.4},"logrado":{"confianza":1.3,"incertidumbre":1.0},"desvanece":{"incertidumbre":1.6,"despedida":1.0},"vacio infinito":{"miedo":1.5,"encierro":1.2},"abrir":{"renacer":1.4,"esperanza":1.0},"estirar":{"perseverancia":1.4,"busqueda":1.0},"piel":{"heridas":1.2,"identidad":1.2,"incertidumbre":1.0},"velocidad":{"lucha":1.4,"incertidumbre":0.6},"viva":{"renacer":1.5,"supervivencia":1.4},"orgullo":{"confianza":1.5,"gratitud":0.8,"aprendizaje":1.4,"identidad":1.1},"nomada":{"desarraigo":1.6,"busqueda":1.1},"talentos":{"creacion":1.3,"identidad":1.0},"inhalo":{"calma":1.3,"adaptacion":1.2},"brillante":{"luz":1.3,"asombro":1.1},"mundo":{"mundo":1.5,"adaptacion":1.1,"desarraigo":1.3},"mar":{"agua":1.4,"contemplacion":0.9,"busqueda":1.3,"encierro":1.0},"arboles":{"naturaleza":1.4,"asombro":0.8},"nueva oportunidad":{"renacer":1.6,"esperanza":1.3},"colorido":{"color":1.4,"asombro":1.0},"real":{"claridad":1.1,"incertidumbre":0.7},"astros":{"cielo":1.4,"asombro":1.1,"noche":1.3},"olas":{"agua":1.3,"mundo":0.6},"raices":{"desarraigo":1.0,"mundo":1.3},"exhalo":{"calma":1.4,"adaptacion":1.1},"diamantes":{"asombro":1.4,"luz":1.1},"soportarlo":{"perseverancia":1.4,"adaptacion":1.2},"alas":{"vuelo":1.0,"heridas":1.1},"noche":{"noche":1.5,"contemplacion":0.9,"agotamiento":1.2,"miedo":1.1},"superficie":{"mundo":1.1,"creacion":0.7},"aire":{"vuelo":1.0,"naturaleza":0.9},"diferente":{"asombro":1.2,"adaptacion":1.2},"piano":{"piano":1.6,"creacion":1.1,"introspeccion":1.1},"descansar":{"calma":1.8,"refugio":1.0},"alma":{"contemplacion":1.6,"introspeccion":1.3,"agotamiento":1.2},"construir":{"aprendizaje":1.5,"perseverancia":1.3},"cueva":{"cueva":1.6,"refugio":0.8,"encierro":1.5},"confio":{"confianza":1.7,"piano":0.7},"teclas":{"piano":1.5,"creacion":1.0},"ruta":{"busqueda":1.4,"incertidumbre":1.0},"pasion":{"creacion":1.5,"memoria":0.8,"lucha":1.1},"lentamente":{"calma":1.5,"contemplacion":1.1,"paciencia":1.1},"ceiba":{"naturaleza":1.4,"cueva":1.0},"rayos solares":{"luz":1.5,"memoria":0.8},"triste melodia":{"piano":1.5,"dolor":1.0},"luche":{"perseverancia":1.5,"lucha":1.2},"seguir":{"perseverancia":1.5,"busqueda":0.8},"oscuro":{"encierro":1.2,"duda":0.9},"notas":{"piano":1.4,"creacion":1.0},"tres notas":{"piano":1.4,"ciclo":1.1},"luz":{"luz":1.2,"busqueda":1.0},"aguas majestuosas":{"agua":1.4,"asombro":1.0},"recuerdos":{"memoria":1.8,"amor":0.8},"familia":{"familia":1.7,"compania":1.2},"verdad":{"autenticidad":1.6,"claridad":0.9,"introspeccion":1.3},"percepcion":{"introspeccion":1.6,"claridad":0.8},"melancolias":{"despedida":1.5,"dolor":1.1},"normalidad":{"estabilidad":1.5,"calma":1.0},"reflejo":{"introspeccion":1.5,"contemplacion":1.0},"delirios":{"distraccion":1.4,"duda":1.3},"despierto":{"claridad":1.5,"renacer":1.0},"voz":{"autenticidad":1.3,"memoria":0.8},"nadie me creyo":{"injusticia":1.5,"duda":1.0},"cambio":{"adaptacion":1.5,"renacer":0.8},"amores pasados":{"memoria":1.5,"despedida":1.4},"huesos":{"heridas":1.4,"dolor":1.0},"espejo":{"introspeccion":1.5,"identidad":1.1},"oportunidad":{"renacer":1.4,"esperanza":1.1},"volar":{"vuelo":1.3,"memoria":0.8},"fuego":{"autenticidad":1.0,"fuego":1.3,"creacion":1.1,"despedida":1.0,"dolor":1.1},"aroma":{"memoria":1.3,"contemplacion":0.7},"amores":{"memoria":1.5,"amor":1.2},"normal":{"estabilidad":1.5,"calma":1.0},"suave":{"calma":1.1,"memoria":1.0},"tiempo":{"despedida":1.4,"incertidumbre":1.0},"dudo":{"duda":1.7,"distraccion":1.1},"ayuda":{"compasion":1.6,"compania":1.1},"pasos":{"perseverancia":1.3,"ciclo":1.0},"busco":{"busqueda":1.6,"duda":0.8},"amor":{"amor":1.5,"despedida":1.0,"compania":0.8},"atajo":{"busqueda":1.5,"incertidumbre":1.0},"simple":{"identidad":1.3,"duda":0.8},"manos":{"compasion":1.3,"compania":1.0,"miedo":1.2,"heridas":0.8},"tintes purpuras":{"color":1.5,"contemplacion":0.7},"salvar":{"esperanza":1.3,"compasion":1.2},"pasiones":{"creacion":1.2,"despedida":1.0},"especial":{"identidad":1.5,"duda":1.0},"tristes melodias":{"piano":1.4,"dolor":1.1},"prometieron":{"duda":1.4,"incertidumbre":1.2},"imposible":{"encierro":1.6,"duda":1.2},"no tengo nada":{"encierro":1.4,"dolor":1.4},"cuerpo":{"identidad":1.3,"agotamiento":0.8,"dolor":1.0},"mundos":{"mundo":1.2,"desarraigo":1.0},"romanticismo":{"introspeccion":1.3,"piano":0.8},"empezar":{"perseverancia":1.6,"renacer":1.3},"falle":{"aprendizaje":1.5,"duda":1.3},"esperanza":{"esperanza":1.8,"perseverancia":1.0},"padre":{"familia":1.7,"responsabilidad":1.1},"vinedo":{"memoria":1.4,"familia":1.1,"naturaleza":0.8},"lienzo":{"creacion":1.6,"aprendizaje":1.1},"triunfante":{"confianza":1.4,"esperanza":1.3},"extrano":{"memoria":1.6,"desarraigo":1.3},"eucalipto":{"naturaleza":1.6,"calma":1.0},"comenzando":{"renacer":1.4,"perseverancia":1.1},"tecnica":{"aprendizaje":1.7,"creacion":0.7},"trabajando":{"responsabilidad":1.4,"entrega":1.2},"pintar":{"creacion":1.6,"aprendizaje":1.0},"dibujar":{"creacion":1.5,"aprendizaje":1.0},"praderas":{"naturaleza":1.4,"memoria":1.0},"cielo celeste":{"cielo":1.4,"calma":1.0},"nubes blancas":{"cielo":1.4,"contemplacion":0.8},"volvere":{"esperanza":1.5,"familia":1.0},"vueltas":{"ciclo":1.5,"incertidumbre":0.8},"caida infinita":{"miedo":1.3,"duda":1.2},"cansada":{"agotamiento":1.8,"dolor":1.0},"llorar":{"dolor":1.7,"agotamiento":1.1},"noche desvelada":{"agotamiento":1.6,"noche":1.4,"insomnio":1.8},"cielo gris":{"dolor":1.3,"noche":1.0,"cielo":0.8},"despertar":{"agotamiento":1.3,"suenos":1.2},"acalla":{"agotamiento":1.2,"introspeccion":1.0},"hinchados":{"dolor":1.3,"agotamiento":1.3},"desvelada":{"agotamiento":1.6,"noche":1.1,"insomnio":1.8},"cielo":{"cielo":1.2,"dolor":0.8},"gris":{"dolor":1.3,"noche":0.9},"un alma":{"introspeccion":1.3,"agotamiento":1.2},"podido despertar":{"agotamiento":1.4,"suenos":1.1},"astros hinchados":{"agotamiento":1.4,"noche":1.2},"asemejan":{"introspeccion":1.2,"suenos":0.8},"rebelion":{"injusticia":1.6,"rabia":1.3},"defiende":{"responsabilidad":1.4,"lucha":1.4},"sabiduria":{"claridad":1.5,"introspeccion":1.2},"escucha":{"contemplacion":1.2,"compasion":1.1},"tierra":{"naturaleza":1.5,"responsabilidad":0.8},"maravilla":{"asombro":1.4,"naturaleza":1.1},"naturaleza":{"naturaleza":1.4,"responsabilidad":0.9},"cruel":{"injusticia":1.7,"dolor":1.0},"destruyendo":{"injusticia":1.5,"rabia":1.2},"autodestruccion":{"injusticia":1.4,"supervivencia":1.2},"razonar":{"claridad":1.5,"introspeccion":1.0},"querellando":{"rabia":1.5,"injusticia":1.3},"afectados":{"dolor":1.2,"compasion":1.0},"manifestar":{"autenticidad":1.3,"libertad":1.0},"vivos":{"supervivencia":1.4,"mundo":0.9},"reacciona":{"lucha":1.3,"responsabilidad":0.9},"mayor":{"injusticia":1.1,"responsabilidad":0.8},"menor":{"injusticia":1.2,"compasion":0.8},"agil":{"lucha":1.2,"supervivencia":0.8},"paso":{"perseverancia":1.2,"ciclo":0.8},"quise ser":{"identidad":1.7,"duda":1.2},"camino":{"identidad":1.3,"busqueda":1.4,"duda":1.0},"nombre":{"identidad":1.7,"introspeccion":0.8},"apellido":{"identidad":1.5,"familia":0.6},"espinas":{"heridas":1.6,"dolor":1.3},"papel":{"creacion":1.4,"dolor":1.1},"quema":{"dolor":1.4,"fuego":1.2},"gotas":{"dolor":1.2,"agua":0.9},"color":{"color":1.2,"creacion":1.0},"algun dia":{"incertidumbre":1.4,"esperanza":0.8},"lecho":{"despedida":1.4,"agotamiento":1.0},"avergonzado":{"duda":1.5,"identidad":1.3},"desperdiciado":{"despedida":1.5,"dolor":1.1},"reputacion":{"identidad":1.4,"duda":1.2},"rezumando":{"heridas":1.4,"dolor":1.2},"pecho":{"dolor":1.2,"heridas":1.0},"abraza":{"amor":1.0,"duda":1.0},"quiso tener":{"duda":1.3,"despedida":1.1},"reside":{"despedida":1.2,"memoria":0.8},"caen":{"dolor":1.2,"incertidumbre":0.9},"miedo":{"miedo":1.7,"incertidumbre":1.1,"duda":1.1},"vivir":{"supervivencia":1.5,"esperanza":1.1},"amanecer":{"renacer":1.5,"luz":1.2},"hogar":{"refugio":1.8,"estabilidad":1.3},"confortarme":{"refugio":1.6,"calma":1.4},"energia":{"lucha":1.5,"perseverancia":1.0},"euforia":{"alegria":1.3,"incertidumbre":1.1},"limites":{"encierro":1.4,"lucha":1.1},"dormir":{"suenos":1.3,"miedo":0.9},"corazon":{"miedo":1.2,"introspeccion":1.0,"rabia":1.2,"identidad":0.8},"helada":{"miedo":1.5,"noche":0.7},"muerte":{"miedo":1.6,"supervivencia":1.1},"regresan":{"ciclo":1.6,"refugio":1.1},"dia":{"luz":1.3,"renacer":1.1},"ocaso":{"noche":1.3,"ciclo":1.0},"sangre":{"supervivencia":1.4,"miedo":0.9},"tez":{"dolor":1.2,"heridas":0.8},"aguantar":{"perseverancia":1.8,"lucha":1.1},"ayudar":{"compasion":1.6,"entrega":1.1},"crear":{"creacion":1.7,"perseverancia":1.0},"estudiar":{"aprendizaje":1.8,"perseverancia":1.1},"encierro":{"encierro":1.8,"injusticia":1.0},"impotencia":{"encierro":1.4,"duda":1.3},"libertad":{"libertad":1.5,"escape":1.1},"escribo":{"autenticidad":1.5,"creacion":1.3},"herramientas":{"responsabilidad":1.2,"aprendizaje":1.3},"agonia":{"dolor":1.7,"miedo":1.0},"sin salida":{"encierro":1.8,"incertidumbre":1.0},"hirientes":{"heridas":1.6,"dolor":1.1},"me emociono":{"alegria":1.5,"creacion":1.1},"libre":{"libertad":1.6,"escape":1.0},"momento":{"incertidumbre":1.2,"paciencia":0.8},"altos":{"ciclo":1.3,"esperanza":1.0},"bajos":{"agotamiento":1.3,"ciclo":1.1}};
  Object.assign(themeLabels,{"agotamiento":"el cansancio","suenos":"los sueños","familia":"el calor compartido","escape":"encontrar una salida","cielo":"el cielo"});
  const LANG='es';
  const displayWord=(word,page)=>LANG==='en'?(POEM_EN[page]?.words[word]??word):word;
  let colorMotion=null;
  const opts={trail:1400,textScale:100};
  let active=0,selected=null,wordsHidden=false,history=[0],choices=[],totalClicks=0,lastTouch=null,layoutKey='',resizeTimer;
  const cache=new Map(),geometryCache=new Map();
  const measure=document.createElement('canvas').getContext('2d');
  const pad=i=>String(i+1).padStart(2,'0');
  const svg=(tag,attrs={})=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e;};
  const html=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  const rgb=h=>h.match(/\w\w/g).map(v=>parseInt(v,16));
  const mix=(a,b,t)=>'#'+rgb(a).map((v,i)=>Math.round(v+(rgb(b)[i]-v)*Math.max(0,Math.min(1,t))).toString(16).padStart(2,'0')).join('');
  function colorAt(page,t){t=((t%1)+1)%1;const stops=PAGES[page].palette,n=t*(stops.length-1),i=Math.floor(n);return mix(stops[i],stops[Math.min(i+1,stops.length-1)],n-i);}
  function tone(page,cell,i){const cy=cell.colorY??cell.cy,x=cell.cx/960,y=cy/540,rx=(cell.cx-480)/410,ry=(cy-270)/235,r=Math.hypot(rx,ry),a=Math.atan2(ry,rx);if(page===0)return .08+x*.48+y*.19+Math.sin(x*7-y*4)*.33;if(page===1)return .03+Math.hypot((x-.594)*1.5,y-.944)*.82+Math.sin(Math.atan2(y-.944,x-.594)*3)*.08;if(page===2)return .09+r*.7+Math.cos(a*2)*.12;if(page===3)return .15+(i%13)/16+x*.08;if(page===4)return (x-.09)*1.12+.08*Math.cos(y*5)+(i%2?-.055:.055);if(page===5)return .09+x*.62+y*.16+Math.sin(x*9)*.14;if(page===6)return .12+x*.64+y*.18;if(page===7)return .08+r*.8;if(page===8)return .12+x*.6+y*.23;if(page===9)return .15+r*.65+Math.sin(a*3)*.09;if(page===10)return .08+r*.85+Math.sin(a*6)*.055;return .08+x*.52+y*.32;}
  function luminance(hex){return rgb(hex).map(c=>{c/=255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4);}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
  function textColors(a,b){const bg=mix(a,b,.5),l=luminance(bg),light=(luminance('#f8f4ec')+.05)/(l+.05),dark=(l+.05)/(luminance('#241b18')+.05);return light>=dark?{fill:'#f8f4ec',stroke:'#33241e66'}:{fill:'#241b18',stroke:'#f2eee566'};}
  function fit(word,box,scale,textScale=opts.textScale){
    const tokens=word.split(/\s+/),usableW=Math.max(1,box.w-4/scale),usableH=Math.max(1,box.h-4/scale);
    const desktop=(q('[data-art]').getBoundingClientRect().width>=650);
    const minPx=desktop?14:11.5,targetPx=Math.min(desktop?27:20,Math.max(desktop?19:14,Math.sqrt(box.w*box.h)*scale/(desktop?4.5:6)))*textScale/100;
    let best=null;
    const arrangements=[tokens.length===2?[word]:tokens];if(tokens.length===2)arrangements.push(tokens);
    for(const lines of arrangements){
      let size=Math.min(targetPx/scale,usableH/(lines.length*1.13));
      measure.font=size+'px Georgia';const longest=Math.max(...lines.map(s=>measure.measureText(s).width));
      if(longest>usableW)size*=usableW/longest;
      if(size*scale>=minPx&&(!best||size>best.size)){measure.font=size+'px Georgia';best={lines,size,screenSize:size*scale,width:Math.max(...lines.map(s=>measure.measureText(s).width))};}
    }
    return best;
  }
  function plannedCells(page,compact,scale){
    const geometryKey=PAGES[page].kind+':'+compact;
    if(!geometryCache.has(geometryKey)){
      const generated=buildPoemGeometry(PAGES[page].kind,compact);
      if(compact&&PAGES[page].kind!=='fibonacci')generated.cells=generated.cells.map(c=>({...c,colorY:c.cy,cy:c.cy*1.5,d:c.d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(_,x,y)=>x+','+(Number(y)*1.5).toFixed(2)),box:{...c.box,y:c.box.y*1.5,h:c.box.h*1.5}}));
      geometryCache.set(geometryKey,generated);
    }
    const model=geometryCache.get(geometryKey),pageBank=PAGES[page].words,bank=compact?PAGES[page].compactWords.map(text=>pageBank.find(word=>word.text===text)):pageBank;
    const count=totalClicks%7,excluded=count?choices.slice(-count).map(c=>c.word):[];
    return assignUniqueWords(model.cells,bank,{excluded,scale,compact,shape:PAGES[page].kind,label:w=>displayWord(w.text,page),fit:(word,cell)=>fit(displayWord(word.text,page),cell.box,scale,100)||fit(word.text,cell.box,scale,100)});
  }

  function save(){try{const host=stateHost;if(host?.setWidgetState){const p=host.setWidgetState({modelContent:{version:4,poema:PAGES[active].title,pagina:active+1,destinosVisibles:false,palabrasOcultas:wordsHidden,palabras:choices.slice(-7).map(x=>x.word),elecciones:totalClicks,proximaCancion:7-totalClicks%7,recomendacion:recentSongs.at(-1)||null,palabrasConPoema:choices.slice(-7).map(x=>({palabra:x.word,poema:PAGES[x.page].title}))},privateContent:{version:4,editorialVersion:EDITORIAL_VERSION,active,wordsHidden,history,choices:choices.slice(-7),totalClicks,recentSongs,trail:opts.trail,textScale:opts.textScale,routePage,routeDeck:routeDeck.slice(),previousDecks:Array.from(previousDecks)}});p?.catch?.(()=>{});}}catch(e){}}
  let currentAlbum=-1;
  function paintAlbum(index){currentAlbum=index;const album=ALBUMS[index],title=q('[data-album-title]');title.replaceChildren(document.createTextNode(album.title));if(album.note)title.append(document.createTextNode(' '),html('span','sp-music-note',album.note));q('[data-album-link]').href=window.SusiLocale.url(album.url);q('[data-album-link]').setAttribute('aria-label','Ver álbum '+album.title+' '+album.note);q('[data-album-index]').textContent=String(index+1).padStart(2,'0')+' / '+String(ALBUMS.length).padStart(2,'0');try{localStorage.setItem('susidlc-selective-last-album',String(index));}catch(e){}}
  function rotateAlbum(){let previous=-1;try{const raw=localStorage.getItem('susidlc-selective-last-album');if(raw!==null)previous=Number(raw);}catch(e){}const valid=Number.isInteger(previous)&&previous>=0&&previous<ALBUMS.length;const next=valid?(previous+1+Math.floor(Math.random()*(ALBUMS.length-1)))%ALBUMS.length:Math.floor(Math.random()*ALBUMS.length);paintAlbum(next);}
  function shiftAlbum(direction){paintAlbum((currentAlbum+direction+ALBUMS.length)%ALBUMS.length);}
  function setMenu(open){const nav=q('[data-site-nav]'),toggle=q('[data-menu-toggle]');nav.dataset.open=String(open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Cerrar −':'Menú +';}
  function progress(){const done=totalClicks%7;const node=q('[data-seven-progress]');node.textContent='Tu recorrido · '+done+' de 7 palabras';node.dataset.step=String(done);node.setAttribute('aria-live','polite');}
  const poemReader=createPoemReader({root,pages:PAGES,originals:POEMS,translations:POEM_EN,lang:LANG});
  function readPoem(index=active){poemReader.open(Number.isInteger(index)?index:active);}
  let recentSongs=[];
  let recentVerses=[];try{recentVerses=JSON.parse(sessionStorage.getItem('susi-recent-verses')||'[]').filter(id=>typeof id==='string').slice(-4);}catch(e){}
  const reviewedRecommend=createRecommender({songs:SONGS,wordThemes:WORD_THEMES,wordContexts:WORD_CONTEXTS,themeLabels:THEME_LABELS_ES,lang:LANG,displayWord});
  function recommend(chosen){return reviewedRecommend(chosen,recentSongs);}


  function showResult(chosen,{preview=false}={}){
    const r=recommend(chosen),s=r.song,dialog=q('[data-result]');
    const {reading,verse,theme}=selectReflections(reviewedRecommend.weights(chosen),LANG,s.title,preview?[]:recentVerses);
    if(!preview){recentVerses.push(verse.id);recentVerses=recentVerses.slice(-4);try{sessionStorage.setItem('susi-recent-verses',JSON.stringify(recentVerses));}catch(e){}recentSongs.push(s.title);recentSongs=recentSongs.slice(-4);save();}
    q('[data-result-kicker]').textContent=(LANG==='es'?'Tu recorrido':'Your journey')+(preview?(LANG==='es'?' · Ejemplo':' · Example'):'');
    const line=q('[data-result-route]');line.replaceChildren();
    chosen.forEach((item,i)=>{if(i)line.append(html('span','','→'));line.append(html('b','',displayWord(item.word,item.page)));});
    q('[data-result-title]').textContent=s.title;q('[data-result-reason]').textContent=r.reason;
    const essence=r.reflection;
    q('[data-result-theme]').textContent=theme.label;
    const essenceNode=q('[data-result-essence]');
    const quotedTitle=LANG==='es'?'«'+s.title+'»':'“'+s.title+'”';
    const reasonNode=q('[data-result-reason]'),reasonAt=r.reason.indexOf(quotedTitle);
    reasonNode.replaceChildren();
    if(reasonAt>=0){reasonNode.append(document.createTextNode(r.reason.slice(0,reasonAt)),html('span','sp-reflection-quote',quotedTitle[0]),html('em','sp-reflection-song',s.title),html('span','sp-reflection-quote',quotedTitle.at(-1)),document.createTextNode(r.reason.slice(reasonAt+quotedTitle.length)));}else reasonNode.textContent=r.reason;
    const titleAt=essence.indexOf(quotedTitle);
    essenceNode.replaceChildren();
    if(titleAt>=0){essenceNode.append(document.createTextNode(essence.slice(0,titleAt)),html('span','sp-reflection-quote',quotedTitle[0]),html('em','sp-reflection-song',s.title),html('span','sp-reflection-quote',quotedTitle.at(-1)),document.createTextNode(essence.slice(titleAt+quotedTitle.length)));}else essenceNode.textContent=essence;
    q('[data-result-story]').open=false;
    q('[data-listen]').href=s.listen;q('[data-listen]').setAttribute('aria-label',(LANG==='es'?'Escuchar ':'Listen to ')+s.title);q('[data-song-source]').href=window.SusiLocale.url(s.page);
    const album=/\/music\/(sdlc-\d+)\//.exec(s.page)?.[1];
    if(album){
      q('[data-cover]').src='/assets/music/covers/'+album+'-320.webp';
      q('[data-cover]').alt=(LANG==='es'?'Portada de ':'Cover of ')+album.toUpperCase().replace('-', '_');
      q('[data-cover-link]').href=s.listen;
      q('[data-cover-link]').setAttribute('aria-label',(LANG==='es'?'Escuchar ':'Listen to ')+s.title+' · Spotify');
    }
    const [dwellingTitle,chapterReference]=reading.title.split(' · ');
 q('[data-suggested-reading-title]').textContent=LANG==='es'?dwellingTitle.replace(' Morada',' morada'):dwellingTitle;
 q('[data-suggested-reading-chapter]').textContent=chapterReference||'';
    q('[data-suggested-reading-summary]').textContent=reading.summary;
    q('[data-suggested-reading]').open=false;
 q('[data-reading-go]').href=reading.url;
    q('[data-suggested-reading-link]').setAttribute('aria-label',(LANG==='es'?'Abrir resumen de ':'Open summary of ')+reading.title);
    q('[data-suggested-verse]').open=false;
    q('[data-suggested-verse-reference]').textContent=verse.reference;
    q('[data-mobile-recommendation-name="0"]').textContent=verse.reference;
    q('[data-mobile-recommendation-name="1"]').textContent=s.title;
    q('[data-mobile-recommendation-name="2"]').textContent=LANG==='es'?dwellingTitle.replace(' Morada',' morada'):dwellingTitle;
    
    q('[data-suggested-verse-text]').textContent=LANG==='es'?'«'+verse.text+'»':'“'+verse.text+'”';
    q('[data-suggested-verse-context]').textContent=verse.context;
    q('[data-suggested-verse-version]').textContent=verse.version;
    q('[data-suggested-verse-source]').href=verse.source;
    prepareResultSharing(dialog,{lang:LANG,title:s.title,album:album?.toUpperCase().replace('-', '_')||'',cover:'/assets/music/covers/'+album+'-640.webp',theme:theme.label,themeId:theme.id,weights:reviewedRecommend.weights(chosen),reading,verse});
    prepareResultNavigation(dialog);
    dialog.showModal();
  }
  function followCell(cell){if(cell.decorative||!cell.word)return;choices.push({word:cell.word,page:active,dest:cell.dest});totalClicks++;openPage(cell.dest,true);progress();if(totalClicks%7===0)showResult(choices.slice(-7));}
  let routePage=-1,routeDeck=[];
  const previousDecks=new Map(),paintTimers=new Map();
  function shuffleRoutes(page){
    const count=totalClicks%7;const visited=new Set(count?choices.slice(-count).map(choice=>choice.page):[]);
    const deck=PAGES.map((_,i)=>i).filter(i=>i!==page&&!visited.has(i));
    for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
    const previous=previousDecks.get(page);
    if(previous&&deck.length>1&&deck[0]===previous[0])[deck[0],deck[1]]=[deck[1],deck[0]];
    routePage=page;routeDeck=deck;previousDecks.set(page,deck.slice());
  }
  function cellRelief(page,cell,index,revealed=false){
    const t=tone(page,cell,index)+(revealed ? .43 : 0);
    const a=colorAt(page,t-.055),b=colorAt(page,t+.105);
    const stops=[['0%',mix(a,'#f2eee5',.30)],['30%',a],['64%',b],['100%',mix(b,'#33241e',.26)]];
    const labelT=cell.labelT??.5,positions=[0,.30,.64,1];let segment=0;
    while(segment<2&&labelT>positions[segment+1])segment++;
    const sample=mix(stops[segment][1],stops[segment+1][1],(labelT-positions[segment])/(positions[segment+1]-positions[segment]));
    return {colors:[sample,sample],stops};
  }
  function lightCell(node){
    clearTimeout(paintTimers.get(node));paintTimers.delete(node);node.classList.add('sp-lit');
  }
  function releaseCell(node){
    clearTimeout(paintTimers.get(node));
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){node.classList.remove('sp-lit');paintTimers.delete(node);return;}
    paintTimers.set(node,setTimeout(()=>{node.classList.remove('sp-lit');paintTimers.delete(node);},620));
  }
  function clearPaint(){paintTimers.forEach(clearTimeout);paintTimers.clear();}

  function resetHover(){clearPaint();q('[data-cells]').querySelectorAll('.sp-lit').forEach(e=>e.classList.remove('sp-lit'));}
  function clearSelection(){selected=null;q('[data-detail]').replaceChildren(html('span','sp-idle','Cada palabra te lleva directamente a otro poema.'));root.querySelectorAll('.sp-dest').forEach(e=>e.classList.remove('sp-dest'));}
  function selectCell(cell){
    if(wordsHidden)return;
    selected=cell;q('[data-detail]').replaceChildren(html('span','sp-chosen-word','«'+displayWord(cell.word,active)+'»'),html('span','','→'),html('span','sp-target-name',pad(cell.dest)+' · '+PAGES[cell.dest].title));
    root.querySelectorAll('.sp-atlas-item').forEach(e=>e.classList.toggle('sp-dest',Number(e.dataset.page)===cell.dest));
  }
  function displayCell(cell,scale){
    const label=displayWord(cell.word,active);
    let fitted=fit(label,cell.box,scale);
    if(!fitted){
      // Keep the canonical cell/key even when its translated label needs a smaller fit.
      const lines=label.split(/\s+/),inset=LANG==='en'?2:4,maxWidth=Math.max(1,cell.box.w-inset/scale);
      let size=Math.min(cell.fit.size,(cell.box.h-inset/scale)/(lines.length*1.13));
      measure.font=size+'px Georgia';const widest=Math.max(...lines.map(line=>measure.measureText(line).width));
      if(widest>maxWidth)size*=maxWidth/widest;
      fitted={lines,size,screenSize:size*scale};
      if(LANG==='en'){
        // Editorial break points are display-only; label and the canonical word stay whole.
        const breaks={affected:'af|fect|ed',awaken:'awak|en',awakening:'awak|en|ing',beginning:'be|gin|ning',colorful:'col|or|ful',canvas:'can|vas',confinement:'con|fine|ment',creature:'crea|ture',delirium:'de|lir|i|um',destroying:'de|stroy|ing',diamonds:'di|a|monds',embraces:'em|brac|es',eucalyptus:'eu|ca|lyp|tus',euphoria:'eu|pho|ria',feathers:'feath|ers',helplessness:'help|less|ness',majestic:'ma|jes|tic',melancholy:'mel|an|chol|y',melodies:'mel|o|dies',memories:'mem|o|ries',normality:'nor|mal|i|ty',opportunities:'op|por|tu|ni|ties',opportunity:'op|por|tu|ni|ty',paradise:'par|a|dise',passions:'pas|sions',perception:'per|cep|tion',precious:'pre|cious',quarreling:'quar|rel|ing',rebellion:'re|bel|lion',reflection:'re|flec|tion',resemble:'re|sem|ble',responds:'re|sponds',romanticism:'ro|man|ti|cism','self-destruction':'self-|de|struc|tion',shortcut:'short|cut',skyscrapers:'sky|scrap|ers',sleepless:'sleep|less',terraces:'ter|rac|es',triumphant:'tri|um|phant',vanishes:'van|ish|es',vineyard:'vine|yard',whirlwind:'whirl|wind'};
        const parts=label.split(/\s+/).flatMap((word,wordIndex)=>{
          let offset=0;const pieces=(breaks[word.toLowerCase()]||word).split('|');
          return pieces.map((piece,i)=>{const text=word.slice(offset,offset+piece.length);offset+=piece.length;return {text,join:i===0&&wordIndex?' ':'',wordEnd:i===pieces.length-1};});
        });
        const usableH=Math.max(1,cell.box.h-inset/scale),targetPx=Math.min(20,Math.max(14,Math.sqrt(cell.box.w*cell.box.h)*scale/6))*opts.textScale/100;
        let readable=null,best=fitted;
        function consider(candidateLines,hyphens){
          let candidateSize=Math.min(targetPx/scale,usableH/(candidateLines.length*1.13));
          measure.font=candidateSize+'px Georgia';
          const widest=Math.max(...candidateLines.map(line=>measure.measureText(line).width));
          if(widest>maxWidth)candidateSize*=maxWidth/widest;
          const candidate={lines:candidateLines,size:candidateSize,screenSize:candidateSize*scale,hyphens};
          if(candidate.screenSize>best.screenSize)best=candidate;
          if(candidate.screenSize>=11.5-1e-7&&(!readable||hyphens<readable.hyphens||(hyphens===readable.hyphens&&candidate.screenSize>readable.screenSize)))readable=candidate;
        }
        function arrange(start,candidateLines,hyphens){
          let line='';
          for(let end=start;end<parts.length;end++){
            line+=(end>start?parts[end].join:'')+parts[end].text;
            const split=end<parts.length-1&&!parts[end].wordEnd;
            const next=[...candidateLines,line+(split&&!line.endsWith('-')?'-':'')];
            if(end===parts.length-1)consider(next,hyphens);else arrange(end+1,next,hyphens+Number(split));
          }
        }
        arrange(0,[],0);
        const selected=readable||best;fitted={lines:selected.lines,size:selected.size,screenSize:selected.screenSize};
        if(!readable&&fitted.screenSize<11.5){
          // A short unsplittable word may need modest horizontal fitting, never clipping.
          const minimumSize=11.5/scale;
          if(fitted.lines.length*minimumSize*1.13<=usableH){
            measure.font=minimumSize+'px Georgia';
            const widths=fitted.lines.map(line=>measure.measureText(line).width);
            if(widths.every(width=>width<=maxWidth/.8))fitted={...fitted,size:minimumSize,screenSize:11.5,lineWidths:widths.map(width=>width>maxWidth?maxWidth:null)};
          }
        }
      }
    }
    return {...cell,label,fit:fitted};
  }
  function addWords(parent,cell,colors,route=false){
    const x=cell.box.x+cell.box.w/2,y=cell.box.y+cell.box.h/2;
    const text=svg('text',{x,y,class:route?'sp-route-code':'sp-word','font-size':route?cell.fit.size*.95:cell.fit.size,fill:colors.fill,stroke:route?'none':colors.stroke,'aria-hidden':'true'});
    if(route)text.textContent=pad(cell.dest);
    else cell.fit.lines.forEach((line,i)=>{const t=svg('tspan',{x,y:y+(i-(cell.fit.lines.length-1)/2)*cell.fit.size*1.13});if(cell.fit.lineWidths?.[i]){t.setAttribute('textLength',cell.fit.lineWidths[i]);t.setAttribute('lengthAdjust','spacingAndGlyphs');}t.textContent=line;text.append(t);});
    parent.append(text);
  }
  function draw(){
    const width=Math.max(200,q('[data-art]').getBoundingClientRect().width||900),compact=width<650,scale=width/960;
    const key=active+':'+compact+':'+Math.round(width)+':'+opts.textScale+':'+totalClicks+':'+choices.slice(-(totalClicks%7||0)).map(c=>c.word).join('|');
    layoutKey=key;let cells=cache.get(key);if(!cells){cells=plannedCells(active,compact,scale);cache.set(key,cells);}cells=cells.map((cell,i)=>({...cell,dest:routeDeck[i%routeDeck.length]})).map(cell=>cell.decorative?cell:displayCell(cell,scale));
    const defs=q('[data-defs]'),group=q('[data-cells]');defs.replaceChildren();group.replaceChildren();
    const bounds=GEOMETRIES[PAGES[active].kind][compact?'compact':'wide'].bounds,ys=compact&&PAGES[active].kind!=='fibonacci'?1.5:1;root.style.setProperty('--sp-figure-left',(bounds.x/960*100)+'%');root.style.setProperty('--sp-figure-width',(bounds.width/960*100)+'%');q('[data-art]').setAttribute('viewBox','0 '+((bounds.y-18)*ys)+' 960 '+((bounds.height+36)*ys));
    cells.forEach((cell,i)=>{
      const surface=cellRelief(active,cell,i),hiddenSurface=cellRelief(active,cell,i,true),baseColors=surface.colors,revealColors=hiddenSurface.colors;
      const baseID='susi-p-base-'+i,hiddenID='susi-p-hidden-'+i;
      const base=svg('linearGradient',{id:baseID,x1:'0%',y1:'0%',x2:'100%',y2:'100%'});
      const reveal=svg('linearGradient',{id:hiddenID,x1:'0%',y1:'0%',x2:'100%',y2:'100%'});
      [base,reveal].forEach((g,j)=>{for(const [offset,color] of (j?hiddenSurface:surface).stops)g.append(svg('stop',{offset,'stop-color':color}));});defs.append(base,reveal);
      if(cell.decorative){const decoration=svg('g',{'class':'sp-cell sp-decoration','pointer-events':'none','aria-hidden':'true','data-color-base':baseColors[0],'data-color-reveal':revealColors[0]});decoration.append(svg('path',{d:cell.d,fill:'url(#'+baseID+')',class:'sp-base'}),svg('path',{d:cell.d,fill:'url(#'+hiddenID+')',class:'sp-reveal',stroke:'#f2eee5','stroke-width':1.15}));group.append(decoration);return;}
      const anchor=svg('a',{href:'#poema-'+pad(cell.dest),class:'sp-cell cursor-interaction','data-cell':i,'data-destination':cell.dest,'data-word':cell.word,'data-display-word':cell.label,'data-font-size':cell.fit.screenSize,'lang':LANG,'data-label-box':JSON.stringify(cell.box),'data-color-base':baseColors[0],'data-color-reveal':revealColors[0],'aria-label':cell.label+'. Destino '+pad(cell.dest)+': '+PAGES[cell.dest].title});
      anchor.append(svg('path',{d:cell.d,fill:'url(#'+baseID+')',class:'sp-base'}));
      anchor.append(svg('path',{class:'sp-reveal',d:cell.d,fill:'url(#'+hiddenID+')',stroke:'#f2eee5','stroke-width':1.15}));
      const inkColors=textColors(...baseColors),ink=svg('g',{class:'sp-ink',fill:inkColors.fill,stroke:inkColors.stroke});addWords(ink,cell,inkColors);addWords(ink,cell,inkColors,true);anchor.append(ink);
      anchor.addEventListener('pointerenter',e=>{if(e.pointerType==='touch')return;lightCell(anchor);selectCell(cell);});
      anchor.addEventListener('pointerleave',e=>{if(e.pointerType!=='touch')releaseCell(anchor);});
      anchor.addEventListener('focus',()=>{lightCell(anchor);selectCell(cell);});anchor.addEventListener('blur',()=>releaseCell(anchor));
      anchor.addEventListener('click',e=>{e.preventDefault();followCell(cell);});group.append(anchor);
    });
    q('[data-art]').dataset.cellCount=cells.length;q('[data-art]').dataset.compact=String(compact);colorMotion?.refresh();
  }
  function drawHistory(){const box=q('[data-journey]');box.replaceChildren();box.hidden=history.length<2;if(history.length<2)return;box.append(html('span','','Tu recorrido'));history.slice(-8).forEach((id,i)=>{if(i)box.append(html('span','','→'));const b=html('button','sp-history-step cursor-interaction',pad(id));b.type='button';b.setAttribute('aria-label','Volver a '+PAGES[id].title);b.addEventListener('click',()=>openPage(id,true));box.append(b);});}
  function openPage(index,user=false){
    if(!Number.isInteger(index)||index<0||index>=12)return;
    const restoreFocus=q('[data-cells]').contains(document.activeElement);resetHover();const changed=active!==index;active=index;if(changed)rotateAlbum();if(user||routePage!==index)shuffleRoutes(index);root.dataset.page=index;lastTouch=null;clearSelection();
    const page=PAGES[index];q('[data-select]').value=String(index);q('[data-count]').textContent=pad(index)+' / 12';q('[data-title]').textContent=page.title;q('[data-poem]').textContent='Susi de León Campo';q('[data-art]').setAttribute('aria-label',page.title+' · '+page.shape);
    q('[data-photo]').textContent=page.photo;q('[data-source]').href=page.url;q('[data-source]').setAttribute('aria-label','Leer '+page.title+' en Poemas del Alma');
    q('[data-swatches]').replaceChildren(...page.palette.map(c=>{const s=html('i');s.style.background=c;return s;}));
    root.querySelectorAll('.sp-atlas-item').forEach(b=>{if(Number(b.dataset.page)===index)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    draw();if(user){const hash='#poema-'+pad(index);if(location.hash!==hash)window.history.pushState(null,'',hash);if(history[history.length-1]!==index)history.push(index);history=history.slice(-24);q('[data-announcement]').textContent='Página '+pad(index)+' de 12: '+page.title;if(restoreFocus)q('[data-select]').focus({preventScroll:true});save();}drawHistory();window.SusiLocale.refresh();
  }
  function toggleWords(persist=true){root.dataset.routes='false';root.dataset.wordsHidden=String(wordsHidden);const button=q('[data-words-toggle]');button.setAttribute('aria-pressed',String(wordsHidden));button.textContent=wordsHidden?'Mostrar palabras':'Ocultar palabras';clearSelection();if(persist)save();}
  function restore(state){const p=state?.privateContent;if(p?.version!==2&&p?.version!==4)return;recentSongs=Array.isArray(p.recentSongs)?p.recentSongs.filter(title=>SONGS.some(s=>s.title===title)).slice(-4):[];choices=p.editorialVersion===EDITORIAL_VERSION&&Array.isArray(p.choices)?p.choices.filter(x=>typeof x.word==='string'&&Number.isInteger(x.page)&&x.page>=0&&x.page<12&&Number.isInteger(x.dest)&&x.dest>=0&&x.dest<12).slice(-7):[];totalClicks=p.editorialVersion===EDITORIAL_VERSION&&Number.isInteger(p.totalClicks)&&p.totalClicks>=0?p.totalClicks:choices.length;progress();active=Number.isInteger(p.active)&&p.active>=0&&p.active<12?p.active:0;wordsHidden=Boolean(p.wordsHidden);history=Array.isArray(p.history)?p.history.filter(i=>Number.isInteger(i)&&i>=0&&i<12).slice(-24):[active];opts.trail=Number.isFinite(p.trail)?Math.max(200,Math.min(2400,p.trail)):1400;opts.textScale=Number.isFinite(p.textScale)?Math.max(85,Math.min(115,p.textScale)):100;root.style.setProperty('--out',opts.trail+'ms');toggleWords(false);
    if(p.routePage===active&&Array.isArray(p.routeDeck)&&p.routeDeck.length>=5&&p.routeDeck.length<=11&&new Set(p.routeDeck).size===p.routeDeck.length&&p.routeDeck.every(id=>Number.isInteger(id)&&id>=0&&id<12&&id!==active&&!(totalClicks%7&&choices.slice(-(totalClicks%7)).some(choice=>choice.page===id)))){
      routePage=active;routeDeck=p.routeDeck.slice();
      if(Array.isArray(p.previousDecks))for(const [id,deck]of p.previousDecks){if(Number.isInteger(id)&&Array.isArray(deck)&&deck.length>=5&&deck.length<=11&&deck.every(n=>Number.isInteger(n)&&n>=0&&n<12&&n!==id))previousDecks.set(id,deck.slice());}
    }
    openPage(active);}
  PAGES.forEach((page,i)=>{
    const option=html('option','',pad(i)+' · '+page.title);option.value=i;q('[data-select]').append(option);
    const item=html('div','sp-atlas-item');item.dataset.page=i;
    const body=html('div'),title=html('a','sp-atlas-title cursor-interaction',page.title);title.href='#poema-'+pad(i);title.setAttribute('aria-label','Ir a la figura: '+page.title);title.addEventListener('click',e=>{e.preventDefault();openPage(i,true);q('[data-select]').focus({preventScroll:true});q('.sp-nav').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
    body.append(title,html('span','sp-atlas-meta',page.shape+' · '+page.paletteName));const swatches=html('span','sp-atlas-palette');page.palette.forEach(c=>{const sw=html('i');sw.style.background=c;swatches.append(sw);});body.append(swatches);
    const read=html('button','sp-poem-plus cursor-interaction');read.type='button';read.setAttribute('aria-label','Leer poema completo: '+page.title);read.setAttribute('aria-haspopup','dialog');read.setAttribute('aria-controls','sp-reading-dialog');read.setAttribute('data-tooltip','Leer poema');const plus=html('span','sp-plus-mark','+');plus.setAttribute('aria-hidden','true');read.append(plus);read.addEventListener('click',()=>readPoem(i));item.append(html('span','sp-atlas-number',pad(i)),body,read);q('[data-atlas]').append(item);
  });
  if(new URLSearchParams(location.search).has('nuevo')){try{sessionStorage.removeItem('susidlc-bilingual-journey');}catch{}window.history.replaceState(null,'',location.pathname+'#poema-01');}toggleWords(false);rotateAlbum();openPage(0);progress();restore(stateHost.widgetState);const openHash=()=>{const m=/^#poema-(0[1-9]|1[0-2])$/.exec(location.hash);if(m){openPage(Number(m[1])-1);save();}};openHash();window.addEventListener('hashchange',openHash);if(!location.hash)window.history.replaceState(null,'','#poema-'+pad(active));
  q('[data-select]').addEventListener('change',e=>openPage(Number(e.target.value),true));q('[data-read-poem]').addEventListener('click',()=>readPoem(active));q('[data-close-reading]').addEventListener('click',()=>q('[data-reading]').close());root.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close();}));q('[data-menu-toggle]').addEventListener('click',()=>setMenu(q('[data-site-nav]').dataset.open!=='true'));q('[data-site-nav]').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('click',e=>{if(!q('.sp-header').contains(e.target))setMenu(false);});document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});q('[data-words-toggle]').addEventListener('click',()=>{wordsHidden=!wordsHidden;toggleWords();});
  new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{const width=Math.max(200,q('[data-art]').getBoundingClientRect().width||900),key=active+':'+(width<650)+':'+Math.round(width)+':'+opts.textScale;if(key!==layoutKey){resetHover();clearSelection();draw();}},120);}).observe(q('[data-art]'));
  colorMotion=createColorMotion({root,stage:q('[data-art]'),getCells:()=>q('[data-cells]').children,button:q('[data-demo]'),lang:LANG});
  save();
  if(new URLSearchParams(location.search).get('resultado')==='preview'){
    const previewExamples={"envy":[{"page":0,"word":"celos"},{"page":10,"word":"hogar"},{"page":9,"word":"nombre"},{"page":11,"word":"vida"},{"page":5,"word":"imposible"},{"page":4,"word":"oportunidad"},{"page":1,"word":"corriente"}],"tortilla":[{"page":0,"word":"felicidad"},{"page":11,"word":"escribo"},{"page":3,"word":"pasión"},{"page":8,"word":"sabiduría"},{"page":4,"word":"verdad"},{"page":6,"word":"fallé"},{"page":2,"word":"orgullo"}],"piano":[{"page":0,"word":"felicidad"},{"page":8,"word":"dolor"},{"page":6,"word":"fallé"},{"page":1,"word":"inalcanzable"},{"page":9,"word":"quise ser"},{"page":11,"word":"impotencia"},{"page":5,"word":"piano"}]};
    previewExamples.asombro=[{page:0,word:'cuidado'},{page:11,word:'libertad'},{page:2,word:'brillante'},{page:3,word:'cueva'},{page:8,word:'maravilla'},{page:5,word:'busco'},{page:6,word:'eucalipto'}];
    previewExamples.memoria=[{page:0,word:'colores'},{page:6,word:'extraño'},{page:4,word:'voz'},{page:1,word:'ojos'},{page:10,word:'miedo'},{page:2,word:'inhalo'},{page:10,word:'día'}];
    const example=new URLSearchParams(location.search).get('ejemplo');
    const randomExamples=[previewExamples.asombro,previewExamples.memoria];
    const previewChoices=example==='azar'?randomExamples[Math.floor(Math.random()*randomExamples.length)]:(previewExamples[example]||[{page:0,word:'ligeros'},{page:3,word:'alma'},{page:7,word:'noche desvelada'},{page:2,word:'nómada'},{page:4,word:'cambió'},{page:5,word:'atajo'},{page:11,word:'agonía'}]);
    showResult(previewChoices,{preview:true});
    // A demonstration is shown once; refreshing or continuing uses the real journey.
    const liveUrl=new URL(location.href);liveUrl.searchParams.delete('resultado');liveUrl.searchParams.delete('ejemplo');window.history.replaceState(window.history.state,'',liveUrl);
  }
})();
