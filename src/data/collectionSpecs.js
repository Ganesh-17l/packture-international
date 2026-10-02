/**
 * Packaging Specifications & Metadata for all 14 Collections.
 * 
 * Defines authentic technical metadata, category labeling, tier styling,
 * proportional aspect ratios, and engineering specs.
 */

export const COLLECTION_SPECS = {
  "perfume-glass-bottles": {
    index: "01",
    categoryBadge: "FRAGRANCE ARCHITECTURE",
    tier: "featured",
    aspectRatio: "aspect-[4/5]",
    objectPosition: "center 40%",
    meta: "15ML — 100ML · CRIMP NECK FEA15 · HIGH-FLINT GLASS"
  },
  "dropper-packaging": {
    index: "02",
    categoryBadge: "PRECISION DISPENSING",
    tier: "featured",
    aspectRatio: "aspect-[3/4]",
    objectPosition: "center 45%",
    meta: "10ML — 100ML · DIN 18 EURO NECK · NBR & SILICON"
  },
  "fancy-glass-bottles": {
    index: "03",
    categoryBadge: "SCULPTURAL SILHOUETTES",
    tier: "featured",
    aspectRatio: "aspect-[4/5]",
    objectPosition: "center 42%",
    meta: "30ML — 100ML · GEOMETRIC FLAT SHOULDERS · CUSTOM MOLD"
  },
  "cosmetic-glass-jars": {
    index: "04",
    categoryBadge: "SKINCARE RECEPTACLES",
    tier: "featured",
    aspectRatio: "aspect-[4/3]",
    objectPosition: "center 52%",
    meta: "15G — 100G · THICK-WALL FLINT · STRAIGHT & SLANT JARS"
  },
  "cosmetic-tubes": {
    index: "05",
    categoryBadge: "FLEXIBLE BARRIER",
    tier: "standard",
    aspectRatio: "aspect-[4/5]",
    objectPosition: "center 40%",
    meta: "10ML — 250ML · MULTI-LAYER BARRIER · MASSAGE ROLLERS"
  },
  "pet-packaging": {
    index: "06",
    categoryBadge: "LIGHTWEIGHT RESINS",
    tier: "standard",
    aspectRatio: "aspect-square",
    objectPosition: "center 50%",
    meta: "50ML — 500ML · 100% RECYCLABLE · GLASS-LIKE CLARITY"
  },
  "hdpe-packaging": {
    index: "07",
    categoryBadge: "INDUSTRIAL POLYMERS",
    tier: "secondary",
    aspectRatio: "aspect-[3/2]",
    objectPosition: "center 50%",
    meta: "100ML — 1000ML · CHEMICAL-RESISTANT PE · HIGH DENSITY"
  },
  "jar-collections": {
    index: "08",
    categoryBadge: "DOUBLE-WALL CASING",
    tier: "standard",
    aspectRatio: "aspect-[4/3]",
    objectPosition: "center 52%",
    meta: "15G — 100G · DOUBLE-WALL PMMA + PP · METALLIC COLLARS"
  },
  "airless-packaging": {
    index: "09",
    categoryBadge: "VACUUM PRESERVATION",
    tier: "featured",
    aspectRatio: "aspect-[4/5]",
    objectPosition: "center 38%",
    meta: "15ML — 50ML · ZERO OXIDATION · 99% PRODUCT EVACUATION"
  },
  "caps-closures": {
    index: "10",
    categoryBadge: "LUXURY HARDWARE",
    tier: "secondary",
    aspectRatio: "aspect-[16/10]",
    objectPosition: "center 54%",
    meta: "FEA15, 18/410, 24/410 · SAUVAGE & ARCHER · CRC SAFETY"
  },
  "pumps-sprayers": {
    index: "11",
    categoryBadge: "FLUID ATOMIZATION",
    tier: "secondary",
    aspectRatio: "aspect-[3/2]",
    objectPosition: "center 48%",
    meta: "0.12CC — 2.0CC OUTPUT · FINE MIST & CREAM PUMPS"
  },
  "roll-on-packaging": {
    index: "12",
    categoryBadge: "GLIDE APPLICATORS",
    tier: "standard",
    aspectRatio: "aspect-[3/4]",
    objectPosition: "center 44%",
    meta: "3ML — 50ML · GLASS & STEEL BALLS · PATTI PANELED"
  },
  "aluminium-packaging": {
    index: "13",
    categoryBadge: "CIRCULAR METALS",
    tier: "standard",
    aspectRatio: "aspect-[5/4]",
    objectPosition: "center 50%",
    meta: "10G — 250G · 100% INFINITE RECYCLING · FOOD-GRADE LACQUER"
  },
  "cosmetics": {
    index: "14",
    categoryBadge: "COLOR COSMETICS",
    tier: "featured",
    aspectRatio: "aspect-[4/5]",
    objectPosition: "center 42%",
    meta: "MASCARA, LIP GLOSS & EYELINER · PRECISION WANDS"
  }
};

export const COLLECTION_ARCHIVE_DATA = {
  "perfume-glass-bottles": {
    index: "01",
    subtitle: "Fragrance Architecture",
    spec: "FEA15 Crimp · High-Flint",
    type: "perfume"
  },
  "dropper-packaging": {
    index: "02",
    subtitle: "Precision Dispensing",
    spec: "DIN 18 Neck · NBR Pipette",
    type: "dropper"
  },
  "fancy-glass-bottles": {
    index: "03",
    subtitle: "Sculptural Silhouettes",
    spec: "Geometric Shoulders · Bespoke",
    type: "fancy"
  },
  "cosmetic-glass-jars": {
    index: "04",
    subtitle: "Skincare Receptacles",
    spec: "Thick-Wall Flint · 15g—100g",
    type: "jar"
  },
  "cosmetic-tubes": {
    index: "05",
    subtitle: "Flexible Barrier",
    spec: "Multi-Layer · Roller Head",
    type: "tube"
  },
  "pet-packaging": {
    index: "06",
    subtitle: "Lightweight Resins",
    spec: "100% Recyclable · Glass Clarity",
    type: "pet"
  },
  "hdpe-packaging": {
    index: "07",
    subtitle: "Industrial Polymers",
    spec: "Chemical-Resistant · High Density",
    type: "hdpe"
  },
  "jar-collections": {
    index: "08",
    subtitle: "Double-Wall Casing",
    spec: "PMMA + PP · Metallic Collar",
    type: "doublejar"
  },
  "airless-packaging": {
    index: "09",
    subtitle: "Vacuum Preservation",
    spec: "Zero Oxidation · 99% Evacuation",
    type: "airless"
  },
  "caps-closures": {
    index: "10",
    subtitle: "Luxury Hardware",
    spec: "Sauvage & Archer · CRC Safety",
    type: "closure"
  },
  "pumps-sprayers": {
    index: "11",
    subtitle: "Fluid Atomization",
    spec: "Fine Mist & Lotion Actuators",
    type: "pump"
  },
  "roll-on-packaging": {
    index: "12",
    subtitle: "Glide Applicators",
    spec: "Steel Ball · Patti Paneled",
    type: "rollon"
  },
  "aluminium-packaging": {
    index: "13",
    subtitle: "Circular Metals",
    spec: "Infinite Recycling · Food-Grade",
    type: "aluminium"
  },
  "cosmetics": {
    index: "14",
    subtitle: "Color Cosmetics",
    spec: "Mascara, Lip Gloss & Eyeliner",
    type: "cosmetics"
  }
};
