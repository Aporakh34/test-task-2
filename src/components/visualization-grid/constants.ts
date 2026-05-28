import type { CSSProperties } from "react";
import { DESIGN_GRID_ROWS, DESIGN_GRID_COLS } from "@/lib/gridConfig";

export const COLOR_BORDER = "#1A1A1A";
export const COLOR_CREAM = "#F4ECD8";
export const COLOR_TAN = "#D9CCA6";
export const COLOR_SCROLL = "#1A2847";
export const BORDER = `var(--border-width) solid ${COLOR_BORDER}`;
export const BORDER_THICK = BORDER;
export const BORDER_RADIUS = "6px";
export const GRID_ROWS = DESIGN_GRID_ROWS;
export const GRID_COLS = DESIGN_GRID_COLS;
export const GRID_CELL_SIZE = 72;
export const PALETTE_COLUMNS = 2;
export const SCROLL_THUMB_COLOR = "#1A2847";
export const SCROLL_TRACK_COLOR = "transparent";
export const SCROLLBAR_TRACK_WIDTH = 22;
export const SCROLLBAR_GAP = 0;
export const GRID_VISIBLE_ROWS = 6;
export const GRID_VISIBLE_COLS = 6;
/** 6 rows of cells */
export const GRID_CONTENT_HEIGHT = GRID_CELL_SIZE * GRID_VISIBLE_ROWS;
export const GRID_VIEWPORT_HEIGHT = 435;
export const GRID_VIEWPORT_WIDTH = GRID_CELL_SIZE * GRID_VISIBLE_COLS;
export const SCROLLBAR_TRACK_HEIGHT = 14;
export const GRID_SCROLL_AREA_HEIGHT =
  GRID_VIEWPORT_HEIGHT + SCROLLBAR_TRACK_HEIGHT;
export const GRID_SCROLL_AREA_WIDTH =
  GRID_VIEWPORT_WIDTH + SCROLLBAR_GAP + SCROLLBAR_TRACK_WIDTH;

import { DESIGN_PLATE_TILE_IDS } from "@/lib/designPlateAssets";

export type PaletteSlot = {
  id: string;
  name: string;
  interactive: boolean;
};

export const PALETTE_SLOTS: PaletteSlot[] = [
  { id: "ocean-wave", name: "Ocean Wave", interactive: true },
  { id: "forest-fern", name: "Forest Fern", interactive: true },
  { id: "terracotta-dot", name: "Terracotta Dot", interactive: true },
  { id: "yellow-star", name: "Yellow Star", interactive: true },
  { id: "grid-tile-5", name: "Harvest Cross", interactive: true },
  { id: "grid-tile-6", name: "Deep Current", interactive: true },
  { id: "grid-tile-7", name: "Willow Path", interactive: true },
  { id: "grid-tile-8", name: "Solar Filigree", interactive: true },
  { id: "grid-tile-9", name: "Burnt Sienna", interactive: true },
];

export const PALETTE_TILE_IDS = DESIGN_PLATE_TILE_IDS;

export type PlaceholderTilePattern =
  | "dots"
  | "stripes"
  | "crosshatch"
  | "solid";

export function getPlaceholderPatternStyle(
  swatch: string,
  pattern: PlaceholderTilePattern = "solid",
): CSSProperties {
  switch (pattern) {
    case "dots":
      return {
        backgroundColor: swatch,
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
        backgroundSize: "8px 8px",
      };
    case "stripes":
      return {
        backgroundColor: swatch,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 8px)",
      };
    case "crosshatch":
      return {
        backgroundColor: swatch,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 6px)",
      };
    default:
      return { backgroundColor: swatch };
  }
}
