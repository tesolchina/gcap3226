export interface Fall2026Topic {
  id: number;
  slug: string;
  title: string;
  description: string;
  source: "talia" | "draft";
}

// Topics 1–3 seeded from Talia's "[GCAP3226] Topics of 26/27" email (4 Jun 2026).
// Topics 4–10 are placeholder drafts pending Talia's confirmation.
export const FALL_2026_TOPICS: Fall2026Topic[] = [
  {
    id: 1,
    slug: "road-safety",
    title: "Road Safety",
    description:
      "Accident blackspots, junction geometry and Transport Department open data — building on Spring 2026 findings.",
    source: "talia",
  },
  {
    id: 2,
    slug: "typhoon",
    title: "Typhoon Signals",
    description:
      "Hong Kong Observatory signal history, suspension policy and economic impact of tropical cyclones.",
    source: "talia",
  },
  {
    id: 3,
    slug: "ev-charger",
    title: "EV Charger Locations",
    description:
      "EMSD open data on EV charging infrastructure — district equity and access for private vs public housing.",
    source: "talia",
  },
  {
    id: 4,
    slug: "public-transport-access",
    title: "Public Transport Accessibility",
    description: "Draft topic — coverage gaps for MTR, bus and minibus across districts.",
    source: "draft",
  },
  {
    id: 5,
    slug: "air-quality",
    title: "Air Quality Monitoring",
    description: "Draft topic — AQHI data, roadside vs general stations, health implications.",
    source: "draft",
  },
  {
    id: 6,
    slug: "waste-recycling",
    title: "Waste & Recycling",
    description: "Draft topic — MSW charging scheme rollout and district-level recycling rates.",
    source: "draft",
  },
  {
    id: 7,
    slug: "public-housing-wait",
    title: "Public Housing Wait Times",
    description: "Draft topic — HA waiting list trends and policy levers.",
    source: "draft",
  },
  {
    id: 8,
    slug: "elderly-care",
    title: "Elderly Care Services",
    description: "Draft topic — RCHE capacity, district distribution, vouchers programme.",
    source: "draft",
  },
  {
    id: 9,
    slug: "cycling-infrastructure",
    title: "Cycling Infrastructure",
    description: "Draft topic — NT cycle track network, safety and modal share.",
    source: "draft",
  },
  {
    id: 10,
    slug: "hawker-policy",
    title: "Hawker Licensing Policy",
    description: "Draft topic — FEHD licence data, market dynamics and cultural preservation.",
    source: "draft",
  },
];

export const getFall2026Topic = (slug: string) =>
  FALL_2026_TOPICS.find((t) => t.slug === slug);
