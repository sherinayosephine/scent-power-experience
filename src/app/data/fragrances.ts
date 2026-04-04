// ONLY ONE FragranceNote interface with everything included!
export interface FragranceNote {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bottleImageUrl: string; // <-- NEW: The picture of the bottle
  color: string;
  audioUrl: string; 
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  accords: {
    name: string;
    bgImage: string;
  }[]; 
}

export const HERO_PERFUMES: Perfume[] = [
  {
    id: "libre-edp",
    name: "YSL Libre EDP",
    brand: "YSL",
    imageUrl: "/asset/libre.png",
    notes: {
      top: ["Mandarin Orange", "Lavender", "Blackcurrant"],
      heart: ["Orange Blossom", "Jasmine", "Lavender"],
      base: ["Vanilla", "Tonka Bean", "Ambergris", "Vetiver"]
    },
    accords: [
      { name: "INTENSE VANILLA BOURBON", bgImage: "/asset/5.jpg" }, 
      { name: "FRESH LIVING ORANGE FLOWER", bgImage: "/asset/6.jpg" },
      { name: "VIBRANT DIVA LAVENDER", bgImage: "/asset/7.jpg" }
    ]
  },
  {
    id: "black-opium",
    name: "YSL Black Opium",
    brand: "YSL",
    imageUrl: "/asset/opium.png",
    notes: {
      top: ["Pink Pepper", "Orange Blossom", "Pear"],
      heart: ["Coffee", "Jasmine", "Bitter Almond"],
      base: ["Vanilla", "Patchouli", "Cedar"]
    },
    accords: [
      { name: "ADDICTIVE COFFEE", bgImage: "/asset/20.jpg" },
      { name: "WHITE FLORALS", bgImage: "/asset/21.jpg" },
      { name: "SWEET VANILLA", bgImage: "/asset/22.jpg" }
    ]
  },
  {
    id: "mon-paris",
    name: "YSL Mon Paris",
    brand: "YSL",
    imageUrl: "/asset/mon paris.png",
    notes: {
      top: ["Strawberry", "Raspberry", "Pear", "Bergamot"],
      heart: ["Peony", "Jasmine", "Orange Blossom"],
      base: ["Musk", "Patchouli", "Ambroxan"]
    },
    accords: [
      { name: "PASSION STRAWBERRY", bgImage: "/asset/23.jpg" },
      { name: "WHITE DATURA FLOWER", bgImage: "/asset/24.jpg" },
      { name: "PATCHOULI SENSUALITY", bgImage: "/asset/25.jpg" }
    ]
  }
];

// Added leading slash "/" to all paths to make them bulletproof
export const LAYERING_NOTES: FragranceNote[] = [
  {
    id: "blouse",
    name: "BLOUSE",
    description: "Luminous floral bouquet with delicate petals and soft elegance",
    imageUrl: "/asset/BLOUSE.jpg",
    bottleImageUrl: "/asset/BLOUSE.jpg", // <-- ADDED
    color: "#FF9A3C",
    audioUrl: "/asset/florent.mp3" 
  },
  {
    id: "saharienne",
    name: "SAHARIENNE",
    description: "Vibrant green fruit accord with fresh citrus and lush botanicals",
    imageUrl: "/asset/SAHARIENNE.jpg",
    bottleImageUrl: "/asset/SAHARIENNE.jpg", // <-- ADDED
    color: "#8BC34A",
    audioUrl: "/asset/neroli.mp3" 
  },
  {
    id: "trench",
    name: "TRENCH",
    description: "Cool aquatic freshness with oceanic minerals and transparent clarity",
    imageUrl: "/asset/TRENCH.jpg",
    bottleImageUrl: "/asset/TRENCH.jpg", // <-- ADDED
    color: "#00B4D8",
    audioUrl: "/asset/mineral-wave.mp3" 
  },
  {
    id: "babycat",
    name: "BABYCAT",
    description: "Bold spicy accord with warming aromatics and vibrant intensity",
    imageUrl: "/asset/BABYCAT.jpg",
    bottleImageUrl: "/asset/BABYCAT.jpg", // <-- ADDED
    color: "#8B4513",
    audioUrl: "/asset/vector.mp3" 
  },
  {
    id: "lavalierre",
    name: "LAVARIELLE",
    description: "Classic fougère accord with herbal lavender and green sophistication",
    imageUrl: "/asset/LAVARIELLE.jpg",
    bottleImageUrl: "/asset/LAVARIELLE.jpg", // <-- ADDED
    color: "#9D4EDD",
    audioUrl: "/asset/aether.mp3"
  },
  {
    id: "capeline",
    name: "CAPÉLINE",
    description: "Pure white tea accord with serene leaves and delicate clarity",
    imageUrl: "/asset/CAPELINE.jpg",
    bottleImageUrl: "/asset/CAPELINE.jpg", // <-- ADDED
    color: "#F8F4E3",
    audioUrl: "/asset/blanc.mp3" 
  }
];

export const PRESENCE_OPTIONS = [
  { id: "summer-warm", label: "SUMMER WARM DAY", description: "Light and radiant" },
  { id: "everyday", label: "EVERYDAY SIGNATURE", description: "Balanced and approachable" },
  { id: "evening", label: "EVENING MAGNETISM", description: "Sensual and captivating" },
  { id: "electric", label: "ELECTRIC BOLDNESS", description: "Daring and unforgettable" },
  { id: "silent", label: "SILENT INTENSITY", description: "Subtle yet powerful" },
  { id: "commanding", label: "COMMANDING PRESENCE", description: "Bold authority" }
];