import type { StaticImageData } from "next/image";
import oceanWaveCollection from "@/assets/tiles/collections/ocean_wave.png";
import forestFernCollection from "@/assets/tiles/collections/forest_fern.png";
import terracottaDotCollection from "@/assets/tiles/collections/terracotta_dot.png";
import yellowStarCollection from "@/assets/tiles/collections/yellow_star.png";

const COLLECTION_IMAGE_MAP: Record<string, StaticImageData> = {
  "ocean-wave":     oceanWaveCollection,
  "grid-tile-1":    oceanWaveCollection,
  "forest-fern":    forestFernCollection,
  "grid-tile-5":    forestFernCollection,
  "terracotta-dot": terracottaDotCollection,
  "grid-tile-6":    terracottaDotCollection,
  "yellow-star":    yellowStarCollection,
};

export function getTileCollectionImage(productId: string): StaticImageData {
  return COLLECTION_IMAGE_MAP[productId] ?? yellowStarCollection;
}
