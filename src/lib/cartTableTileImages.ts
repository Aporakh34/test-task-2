import type { StaticImageData } from "next/image";
import { getGridTileImage } from "@/lib/gridTileAssets";
import { getTileCollectionImage } from "@/lib/tileCollectionAssets";
import { getTileAssets } from "@/lib/tileAssets";

export interface CartTableTileImages {
  collection: StaticImageData;
  item?: StaticImageData;
}

export function getCartTableTileImages(productId: string): CartTableTileImages {
  const collection = getTileCollectionImage(productId);
  const gridTileImage = getGridTileImage(productId);
  const cartTileAssets = getTileAssets(productId);
  const item = cartTileAssets?.item ?? gridTileImage ?? undefined;

  return { collection, item };
}
