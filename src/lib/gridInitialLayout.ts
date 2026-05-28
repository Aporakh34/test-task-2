import { DESIGN_GRID_COLS, DESIGN_GRID_ROWS } from "@/lib/gridConfig";

const GRID_PATTERN_TILE_IDS = [
  "grid-tile-1",
  "grid-tile-2",
  "grid-tile-3",
  "grid-tile-4",
  "grid-tile-5",
  "grid-tile-6",
  "grid-tile-7",
  "grid-tile-8",
  "grid-tile-9",
] as const;

const CART_TILE_IDS = [
  "ocean-wave",
  "forest-fern",
  "terracotta-dot",
  "yellow-star",
] as const;

function createEmptyGrid(): (string | null)[][] {
  return Array.from({ length: DESIGN_GRID_ROWS }, () =>
    Array.from({ length: DESIGN_GRID_COLS }, () => null)
  );
}

/** Demo layout like mockup: cols 0–3 rows 0–4 filled, row 5 cols 0–2 filled */
export function createInitialGridCells(): (string | null)[][] {
  const cells = createEmptyGrid();

  let gridTileIndex = 0;
  let cartTileIndex = 0;

  for (let rowIndex = 0; rowIndex < 5; rowIndex += 1) {
    for (let colIndex = 0; colIndex < 4; colIndex += 1) {
      const useGridTile = (rowIndex + colIndex) % 2 === 0;
      if (useGridTile) {
        cells[rowIndex][colIndex] =
          GRID_PATTERN_TILE_IDS[gridTileIndex % GRID_PATTERN_TILE_IDS.length];
        gridTileIndex += 1;
      } else {
        cells[rowIndex][colIndex] =
          CART_TILE_IDS[cartTileIndex % CART_TILE_IDS.length];
        cartTileIndex += 1;
      }
    }
  }

  for (let colIndex = 0; colIndex < 3; colIndex += 1) {
    cells[5][colIndex] =
      GRID_PATTERN_TILE_IDS[gridTileIndex % GRID_PATTERN_TILE_IDS.length];
    gridTileIndex += 1;
  }

  return cells;
}
