import type { StaticImageData } from "next/image";
import tileGrid1 from "@/assets/tile_grid1.png";
import tileGrid5 from "@/assets/tile_grid5.png";
import tileGrid6 from "@/assets/tile_grid6.png";
import yellowStarCollection from "@/assets/tiles/collections/yellow_star.png";

const OCEAN_WAVE_COLLECTION_IDS = new Set(["ocean-wave", "grid-tile-1"]);
const FOREST_FERN_COLLECTION_IDS = new Set(["forest-fern", "grid-tile-5"]);
const TERRACOTTA_DOT_COLLECTION_IDS = new Set(["terracotta-dot", "grid-tile-6"]);

/**
 * Tile Collection column uses four visuals:
 * Ocean Wave → tile_grid1, Forest Fern → tile_grid5,
 * Terracotta Dot → tile_grid6, all other tiles → Yellow Star.
 */
export function getTileCollectionImage(productId: string): StaticImageData {
  if (OCEAN_WAVE_COLLECTION_IDS.has(productId)) {
    return tileGrid1;
  }
  if (FOREST_FERN_COLLECTION_IDS.has(productId)) {
    return tileGrid5;
  }
  if (TERRACOTTA_DOT_COLLECTION_IDS.has(productId)) {
    return tileGrid6;
  }
  return yellowStarCollection;
}
