export type Commodity =
  | "coffee"
  | "nutmeg"
  | "clove"
  | "vanilla"
  | "wild-honey"
  | "cacao";

export type Farmer = {
  slug: string;
  name: string;
  village: string;
  region: string;
  island: string;
  commodity: Commodity;
  commodityLabel: string;
  emoji: string;
  tint: "moss" | "ochre" | "clay" | "indigo";
  story: string;
  storyId: string; // bahasa source (for AI voice mock)
  yearlyEarned: number; // IDR
  thisBatchEarned: number; // IDR this batch
  plotHectares: number;
  practices: string[];
  // Geolocation for satellite (real Indonesian coords)
  lat: number;
  lng: number;
  // Latest batch
  batch: {
    id: string;
    weightKg: number;
    harvestedAt: string;
    pricePerKgUsd: number;
    farmerSharePct: number;
    co2PerKgGrams: number;
  };
  // Mini lab tests / certs
  certs: string[];
};

export const FARMERS: Farmer[] = [
  {
    slug: "karim-aceh",
    name: "Pak Karim Yusuf",
    village: "Lampegajah",
    region: "Aceh Tengah",
    island: "Sumatra",
    commodity: "coffee",
    commodityLabel: "Arabica Coffee, Gayo Highlands",
    emoji: "☕",
    tint: "moss",
    story:
      "I started picking cherries when I was twelve. My father, his father before. We process by giling basah — wet-hulled — that's why Gayo tastes like Gayo. Twenty years ago we sold to whoever showed up. Now you can see me, and I can see you.",
    storyId: "karim-aceh-voice-001",
    yearlyEarned: 47_200_000,
    thisBatchEarned: 1_840_000,
    plotHectares: 1.3,
    practices: ["Shade-grown", "Organic certified", "Wet-hulled"],
    lat: 4.6248,
    lng: 96.8347,
    batch: {
      id: "ASLI-GYO-2026-K048",
      weightKg: 24,
      harvestedAt: "2026-04-12",
      pricePerKgUsd: 18.4,
      farmerSharePct: 68,
      co2PerKgGrams: -1240, // negative = net sequestration
    },
    certs: ["SCA Q-grade 86", "USDA Organic", "Rainforest Alliance"],
  },
  {
    slug: "made-banda",
    name: "Ibu Made Sariati",
    village: "Banda Naira",
    region: "Maluku Tengah",
    island: "Maluku",
    commodity: "nutmeg",
    commodityLabel: "Nutmeg & Mace, Banda Islands",
    emoji: "🌰",
    tint: "ochre",
    story:
      "Pulau Banda is where the nutmeg trade started — five centuries ago Europeans fought wars to control it. Today there are 380 of us still growing it. My trees were planted by my grandmother in 1962. They still give.",
    storyId: "made-banda-voice-001",
    yearlyEarned: 38_500_000,
    thisBatchEarned: 2_240_000,
    plotHectares: 0.8,
    practices: ["Heritage trees (60+ yrs)", "No-till", "Polyculture"],
    lat: -4.5232,
    lng: 129.8965,
    batch: {
      id: "ASLI-BND-2026-M021",
      weightKg: 18,
      harvestedAt: "2026-03-28",
      pricePerKgUsd: 24.5,
      farmerSharePct: 72,
      co2PerKgGrams: -890,
    },
    certs: ["IGE protected origin", "Spice Heritage verified"],
  },
  {
    slug: "yohanes-toraja",
    name: "Pak Yohanes Pongtiku",
    village: "Sapan",
    region: "Toraja Utara",
    island: "Sulawesi",
    commodity: "coffee",
    commodityLabel: "Arabica Coffee, Toraja Highlands",
    emoji: "☕",
    tint: "moss",
    story:
      "We grow coffee at 1,600 meters, between the rice terraces and the tongkonan houses. The mornings are misty. The cherries take longer to ripen here — that's where the chocolate notes come from.",
    storyId: "yohanes-toraja-voice-001",
    yearlyEarned: 52_800_000,
    thisBatchEarned: 1_950_000,
    plotHectares: 1.6,
    practices: ["High altitude (1600m)", "Shade-grown", "Hand-picked"],
    lat: -2.9806,
    lng: 119.8848,
    batch: {
      id: "ASLI-TJA-2026-Y014",
      weightKg: 22,
      harvestedAt: "2026-04-05",
      pricePerKgUsd: 19.8,
      farmerSharePct: 70,
      co2PerKgGrams: -1380,
    },
    certs: ["SCA Q-grade 88", "Direct Trade"],
  },
  {
    slug: "siti-papua",
    name: "Ibu Siti Lapenangga",
    village: "Wamena",
    region: "Jayawijaya",
    island: "Papua",
    commodity: "vanilla",
    commodityLabel: "Vanilla, Papuan Highlands",
    emoji: "🌸",
    tint: "clay",
    story:
      "Vanilla beans take three years from planting to first harvest. Each flower must be pollinated by hand within hours of opening. We curing them for six months. Patience is the work.",
    storyId: "siti-papua-voice-001",
    yearlyEarned: 89_400_000,
    thisBatchEarned: 4_120_000,
    plotHectares: 0.5,
    practices: ["Hand-pollinated", "6-month curing", "Smallholder"],
    lat: -4.0938,
    lng: 138.9477,
    batch: {
      id: "ASLI-PPA-2026-S007",
      weightKg: 4.2,
      harvestedAt: "2026-02-19",
      pricePerKgUsd: 410,
      farmerSharePct: 75,
      co2PerKgGrams: -2100,
    },
    certs: ["DNA-verified Papua origin", "EUDR compliant"],
  },
  {
    slug: "darmawan-kalimantan",
    name: "Pak Darmawan",
    village: "Long Beluah",
    region: "Kalimantan Timur",
    island: "Kalimantan",
    commodity: "wild-honey",
    commodityLabel: "Wild Forest Honey, Borneo",
    emoji: "🍯",
    tint: "ochre",
    story:
      "Madu Apis dorsata — the giant honey bee. We climb the tualang trees at night with a smoking torch. The hive is 30 meters up. My grandfather taught me the songs that calm the bees. They have not been changed.",
    storyId: "darmawan-kalimantan-voice-001",
    yearlyEarned: 24_600_000,
    thisBatchEarned: 1_120_000,
    plotHectares: 0,
    practices: ["Indigenous harvest", "Wild forest", "Climber-collector"],
    lat: 1.9521,
    lng: 117.0143,
    batch: {
      id: "ASLI-KLT-2026-D003",
      weightKg: 8,
      harvestedAt: "2026-03-15",
      pricePerKgUsd: 38,
      farmerSharePct: 80,
      co2PerKgGrams: -3200,
    },
    certs: ["Forest-positive verified", "Dayak community"],
  },
  {
    slug: "thomas-flores",
    name: "Pak Thomas Pareira",
    village: "Bajawa",
    region: "Ngada, NTT",
    island: "Flores",
    commodity: "coffee",
    commodityLabel: "Arabica Coffee, Flores Bajawa",
    emoji: "☕",
    tint: "moss",
    story:
      "Volcanic soil. The trees grow in the shadow of Mount Inerie. We process honey — semi-washed — to keep the body. The mountain feeds the cup.",
    storyId: "thomas-flores-voice-001",
    yearlyEarned: 41_200_000,
    thisBatchEarned: 1_680_000,
    plotHectares: 1.1,
    practices: ["Volcanic soil", "Honey process", "Mountain microclimate"],
    lat: -8.7975,
    lng: 121.0744,
    batch: {
      id: "ASLI-FLB-2026-T011",
      weightKg: 19,
      harvestedAt: "2026-04-08",
      pricePerKgUsd: 17.6,
      farmerSharePct: 67,
      co2PerKgGrams: -1180,
    },
    certs: ["SCA Q-grade 84", "Volcanic single-origin"],
  },
  {
    slug: "rahmat-maluku",
    name: "Pak Rahmat Tamher",
    village: "Saparua",
    region: "Maluku Tengah",
    island: "Maluku",
    commodity: "clove",
    commodityLabel: "Clove, Saparua Island",
    emoji: "🌿",
    tint: "clay",
    story:
      "Saparua's cloves are different — drier soil, deeper red. When you smoke a kretek you taste it: this island. We sun-dry on bamboo mats for six days, turning every two hours.",
    storyId: "rahmat-maluku-voice-001",
    yearlyEarned: 32_400_000,
    thisBatchEarned: 1_540_000,
    plotHectares: 0.7,
    practices: ["Sun-dried", "Hand-sorted", "Traditional grade"],
    lat: -3.5664,
    lng: 128.6669,
    batch: {
      id: "ASLI-MLK-2026-R018",
      weightKg: 26,
      harvestedAt: "2026-03-22",
      pricePerKgUsd: 12.4,
      farmerSharePct: 64,
      co2PerKgGrams: -740,
    },
    certs: ["Origin verified", "Single-island"],
  },
  {
    slug: "wayan-bali",
    name: "Pak Wayan Suarnata",
    village: "Munduk",
    region: "Buleleng, Bali",
    island: "Bali",
    commodity: "cacao",
    commodityLabel: "Heirloom Cacao, Bali Highlands",
    emoji: "🍫",
    tint: "clay",
    story:
      "We grow heirloom cacao — small pods, intense flavor. Fermented in wooden boxes for seven days, dried on bamboo. The smell during fermentation, that's the test. Sweet, deep, alive.",
    storyId: "wayan-bali-voice-001",
    yearlyEarned: 45_600_000,
    thisBatchEarned: 1_780_000,
    plotHectares: 1.2,
    practices: ["Heirloom variety", "7-day fermentation", "Sun-dried"],
    lat: -8.2575,
    lng: 115.0822,
    batch: {
      id: "ASLI-BAL-2026-W022",
      weightKg: 28,
      harvestedAt: "2026-03-30",
      pricePerKgUsd: 9.8,
      farmerSharePct: 66,
      co2PerKgGrams: -1620,
    },
    certs: ["Heirloom verified", "Single-fermentation"],
  },
];

export function getFarmer(slug: string): Farmer | null {
  return FARMERS.find((f) => f.slug === slug) ?? null;
}

export function formatIDR(n: number): string {
  if (n >= 1_000_000) {
    return `Rp ${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `Rp ${(n / 1_000).toFixed(0)}k`;
  }
  return `Rp ${n}`;
}

export function formatUSD(n: number): string {
  return `$${n.toFixed(2)}`;
}
