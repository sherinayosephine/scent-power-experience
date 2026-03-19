export interface FragranceNote {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
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
  accords: string[];
}

export const HERO_PERFUMES: Perfume[] = [
  {
    id: "libre-edp",
    name: "YSL Libre EDP",
    brand: "YSL",
    imageUrl: "asset/libre.png",
    notes: {
      top: ["Mandarin Orange", "Lavender", "Blackcurrant"],
      heart: ["Orange Blossom", "Jasmine", "Lavender"],
      base: ["Vanilla", "Tonka Bean", "Ambergris", "Vetiver"]
    },
    accords: [
      "INTENSE VANILLA BOURBON",
      "FRESH LIVING ORANGE FLOWER",
      "VIBRANT DIVA LAVENDER"
    ]
  },
  {
    id: "black-opium",
    name: "YSL Black Opium",
    brand: "YSL",
    imageUrl: "asset/opium.png",
    notes: {
      top: ["Pink Pepper", "Orange Blossom", "Pear"],
      heart: ["Coffee", "Jasmine", "Bitter Almond"],
      base: ["Vanilla", "Patchouli", "Cedar"]
    },
    accords: [
      "ADDICTIVE COFFEE",
      "WHITE FLORALS",
      "SWEET VANILLA"
    ]
  },
  {
    id: "mon-paris",
    name: "YSL Mon Paris",
    brand: "YSL",
    imageUrl: "asset/mon paris.png",
    notes: {
      top: ["Strawberry", "Raspberry", "Pear", "Bergamot"],
      heart: ["Peony", "Jasmine", "Orange Blossom"],
      base: ["Musk", "Patchouli", "Ambroxan"]
    },
    accords: [
      "PASSION STRAWBERRY",
      "WHITE DATURA FLOWER",
      "PATCHOULI SENSUALITY"
    ]
  }
];

export const LAYERING_NOTES: FragranceNote[] = [
  {
    id: "florent",
    name: "FLORENT",
    description: "Luminous floral bouquet with delicate petals and soft elegance",
    imageUrl: "asset/florent.jpg",
    color: "#FF9A3C"
  },
  {
    id: "neroli",
    name: "NEROLI",
    description: "Vibrant green fruit accord with fresh citrus and lush botanicals",
    imageUrl: "asset/neroli.jpg",
    color: "#8BC34A"
  },
  {
    id: "mineral-wave",
    name: "MINÉRALEWAVE",
    description: "Cool aquatic freshness with oceanic minerals and transparent clarity",
    imageUrl: "asset/minerale.jpg",
    color: "#00B4D8"
  },
  {
    id: "vector",
    name: "VECTOR",
    description: "Bold spicy accord with warming aromatics and vibrant intensity",
    imageUrl: "asset/vector.jpg",
    color: "#8B4513"
  },
  {
    id: "aether",
    name: "AETHER",
    description: "Classic fougère accord with herbal lavender and green sophistication",
    imageUrl: "asset/aether.jpg",
    color: "#9D4EDD"
  },
  {
    id: "blanc",
    name: "BLANC",
    description: "Pure white tea accord with serene leaves and delicate clarity",
    imageUrl: "asset/blanc.jpg",
    color: "#F8F4E3"
  }
];

export const PRESENCE_OPTIONS = [
  {
    id: "summer-warm",
    label: "SUMMER WARM DAY",
    description: "Light and radiant"
  },
  {
    id: "everyday",
    label: "EVERYDAY SIGNATURE",
    description: "Balanced and approachable"
  },
  {
    id: "evening",
    label: "EVENING MAGNETISM",
    description: "Sensual and captivating"
  },
  {
    id: "electric",
    label: "ELECTRIC BOLDNESS",
    description: "Daring and unforgettable"
  },
  {
    id: "silent",
    label: "SILENT INTENSITY",
    description: "Subtle yet powerful"
  },
  {
    id: "commanding",
    label: "COMMANDING PRESENCE",
    description: "Bold authority"
  }
];