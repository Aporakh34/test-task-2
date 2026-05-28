import type { TileProduct } from "@/types";

export const CART_TILE_QUANTITY = 25;

export interface VisualizationTileCatalogEntry {
  id: string;
  name: string;
  initialQuantity: number;
  quantityStep: number;
  unitPrice: number;
  colorHex: string;
  patternLabel: string;
}

function catalogEntry(
  entry: Omit<
    VisualizationTileCatalogEntry,
    "initialQuantity" | "quantityStep"
  >
): VisualizationTileCatalogEntry {
  return {
    ...entry,
    initialQuantity: CART_TILE_QUANTITY,
    quantityStep: CART_TILE_QUANTITY,
  };
}

export const VISUALIZATION_TILE_CATALOG: VisualizationTileCatalogEntry[] = [
  catalogEntry({
    id: "grid-tile-1",
    name: "Morning Gild",
    unitPrice: 25,
    colorHex: "#E8C44A",
    patternLabel: "Star",
  }),
  catalogEntry({
    id: "grid-tile-2",
    name: "Tide Pool",
    unitPrice: 30,
    colorHex: "#2B4F8F",
    patternLabel: "Wave",
  }),
  catalogEntry({
    id: "grid-tile-3",
    name: "Verdant Trace",
    unitPrice: 28,
    colorHex: "#4A8030",
    patternLabel: "Fern",
  }),
  catalogEntry({
    id: "grid-tile-4",
    name: "Ember Speck",
    unitPrice: 26,
    colorHex: "#C47A62",
    patternLabel: "Dot",
  }),
  catalogEntry({
    id: "grid-tile-5",
    name: "Harvest Cross",
    unitPrice: 32,
    colorHex: "#C4A46D",
    patternLabel: "Lattice",
  }),
  catalogEntry({
    id: "grid-tile-6",
    name: "Deep Current",
    unitPrice: 25,
    colorHex: "#3B5490",
    patternLabel: "Wave",
  }),
  catalogEntry({
    id: "grid-tile-7",
    name: "Willow Path",
    unitPrice: 29,
    colorHex: "#5C7A5C",
    patternLabel: "Leaf",
  }),
  catalogEntry({
    id: "grid-tile-8",
    name: "Solar Filigree",
    unitPrice: 27,
    colorHex: "#E8C44A",
    patternLabel: "Star",
  }),
  catalogEntry({
    id: "grid-tile-9",
    name: "Burnt Sienna",
    unitPrice: 30,
    colorHex: "#A67C52",
    patternLabel: "Weave",
  }),
  catalogEntry({
    id: "ocean-wave",
    name: "Coastal Ripple",
    unitPrice: 28,
    colorHex: "#2B4F8F",
    patternLabel: "Wave",
  }),
  catalogEntry({
    id: "forest-fern",
    name: "Moss Vale",
    unitPrice: 30,
    colorHex: "#4A8030",
    patternLabel: "Fern",
  }),
  catalogEntry({
    id: "terracotta-dot",
    name: "Kiln Ember",
    unitPrice: 26,
    colorHex: "#C47A62",
    patternLabel: "Dot",
  }),
  catalogEntry({
    id: "yellow-star",
    name: "Apiary Glow",
    unitPrice: 29,
    colorHex: "#E8C44A",
    patternLabel: "Star",
  }),
];

export function getVisualizationCatalogEntry(
  tileId: string
): VisualizationTileCatalogEntry | undefined {
  return VISUALIZATION_TILE_CATALOG.find((entry) => entry.id === tileId);
}

export function catalogEntryToTileProduct(
  entry: VisualizationTileCatalogEntry
): TileProduct {
  return {
    id: entry.id,
    name: entry.name,
    price: entry.unitPrice,
    quantityStep: entry.quantityStep,
    colorHex: entry.colorHex,
    patternLabel: entry.patternLabel,
  };
}
