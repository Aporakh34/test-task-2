import type { StaticImageData } from "next/image";
import desigPlate1 from "@/assets/desig_plate1.png";
import desigPlate2 from "@/assets/desig_plate2.png";
import desigPlate3 from "@/assets/desig_plate3.png";
import desigPlate4 from "@/assets/desig_plate4.png";
import desigPlate5 from "@/assets/desig_plate5.png";
import desigPlate6 from "@/assets/desig_plate6.png";
import desigPlate7 from "@/assets/desig_plate7.png";
import desigPlate8 from "@/assets/desig_plate8.png";
import desigPlate9 from "@/assets/desig_plate9.png";

export const DESIGN_PLATE_TILE_IDS = [
  "ocean-wave",
  "forest-fern",
  "terracotta-dot",
  "yellow-star",
  "grid-tile-5",
  "grid-tile-6",
  "grid-tile-7",
  "grid-tile-8",
  "grid-tile-9",
] as const;

const DESIGN_PLATE_IMAGES: Record<
  (typeof DESIGN_PLATE_TILE_IDS)[number],
  StaticImageData
> = {
  "ocean-wave": desigPlate1,
  "forest-fern": desigPlate2,
  "terracotta-dot": desigPlate3,
  "yellow-star": desigPlate4,
  "grid-tile-5": desigPlate5,
  "grid-tile-6": desigPlate6,
  "grid-tile-7": desigPlate7,
  "grid-tile-8": desigPlate8,
  "grid-tile-9": desigPlate9,
};

export function getDesignPlateImage(
  tileId: string
): StaticImageData | undefined {
  return DESIGN_PLATE_IMAGES[tileId as (typeof DESIGN_PLATE_TILE_IDS)[number]];
}
