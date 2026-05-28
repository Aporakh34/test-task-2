import type { StaticImageData } from "next/image";
import tileGrid1 from "@/assets/tile_grid1.png";
import tileGrid2 from "@/assets/tile_grid2.png";
import tileGrid3 from "@/assets/tile_grid3.png";
import tileGrid4 from "@/assets/tile_grid4.png";
import tileGrid5 from "@/assets/tile_grid5.png";
import tileGrid6 from "@/assets/tile_grid6.png";
import tileGrid7 from "@/assets/tile_grid7.png";
import tileGrid8 from "@/assets/tile_grid8.png";
import tileGrid9 from "@/assets/tile_grid9.png";
import { getDesignPlateImage } from "@/lib/designPlateAssets";
import { getTileAssets } from "@/lib/tileAssets";

const GRID_PATTERN_TILES: Record<string, StaticImageData> = {
  "grid-tile-1": tileGrid1,
  "grid-tile-2": tileGrid2,
  "grid-tile-3": tileGrid3,
  "grid-tile-4": tileGrid4,
  "grid-tile-5": tileGrid5,
  "grid-tile-6": tileGrid6,
  "grid-tile-7": tileGrid7,
  "grid-tile-8": tileGrid8,
  "grid-tile-9": tileGrid9,
};

export const CART_GRID_TILE_IDS = [
  "ocean-wave",
  "forest-fern",
  "terracotta-dot",
  "yellow-star",
] as const;

export function getGridTileImage(tileId: string): StaticImageData | undefined {
  const designPlateImage = getDesignPlateImage(tileId);
  if (designPlateImage) {
    return designPlateImage;
  }

  const gridPatternTile = GRID_PATTERN_TILES[tileId];
  if (gridPatternTile) {
    return gridPatternTile;
  }

  const cartTileAssets = getTileAssets(tileId);
  return cartTileAssets?.item;
}

export function getGridTileLabel(tileId: string): string {
  return tileId.replace(/-/g, " ");
}
