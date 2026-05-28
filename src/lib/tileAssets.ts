import type { StaticImageData } from "next/image";
import oceanWaveCollection from "@/assets/tiles/collections/ocean_wave.png";
import forestFernCollection from "@/assets/tiles/collections/forest_fern.png";
import terracottaDotCollection from "@/assets/tiles/collections/terracotta_dot.png";
import yellowStarCollection from "@/assets/tiles/collections/yellow_star.png";
import itemOcean from "@/assets/tiles/patterns/item_ocean.png";
import itemFern from "@/assets/tiles/patterns/item_fern.png";
import itemDot from "@/assets/tiles/patterns/item_dot.png";
import itemStar from "@/assets/tiles/patterns/item_star.png";

export interface TileAssetSet {
  collection: StaticImageData;
  item: StaticImageData;
}

const TILE_ASSETS: Record<string, TileAssetSet> = {
  "ocean-wave": {
    collection: oceanWaveCollection,
    item: itemOcean,
  },
  "forest-fern": {
    collection: forestFernCollection,
    item: itemFern,
  },
  "terracotta-dot": {
    collection: terracottaDotCollection,
    item: itemDot,
  },
  "yellow-star": {
    collection: yellowStarCollection,
    item: itemStar,
  },
};

export function getTileAssets(productId: string): TileAssetSet | undefined {
  return TILE_ASSETS[productId];
}
