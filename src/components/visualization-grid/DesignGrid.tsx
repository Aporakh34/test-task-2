"use client";

import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { eraseTile, placeTile } from "@/lib/features/gridSlice";
import GridCell from "./GridCell";
import GridScrollBars from "./GridScrollBars";
import {
  BORDER,
  COLOR_TAN,
  GRID_CELL_SIZE,
  GRID_COLS,
  GRID_ROWS,
  GRID_SCROLL_AREA_HEIGHT,
  GRID_SCROLL_AREA_WIDTH,
  GRID_VIEWPORT_HEIGHT,
  GRID_VIEWPORT_WIDTH,
  SCROLLBAR_TRACK_HEIGHT,
  SCROLLBAR_TRACK_WIDTH,
} from "./constants";

export default function DesignGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const cells = useAppSelector((state) => state.grid.cells);
  const selectedPaletteId = useAppSelector(
    (state) => state.grid.selectedPaletteId,
  );

  function handleCellActivate(row: number, col: number) {
    if (selectedPaletteId && selectedPaletteId !== "__eraser__") {
      dispatch(placeTile({ row, col }));
      return;
    }

    const currentTileId = cells[row]?.[col] ?? null;
    if (currentTileId) {
      dispatch(eraseTile({ row, col }));
    }
  }

  const isPlacementActive =
    selectedPaletteId !== null && selectedPaletteId !== "__eraser__";

  const gridWidth = GRID_CELL_SIZE * GRID_COLS;
  const gridHeight = GRID_CELL_SIZE * GRID_ROWS;

  const gridLayoutHeight = GRID_SCROLL_AREA_HEIGHT;

  return (
    <div
      className="shrink-0"
      style={{ width: GRID_SCROLL_AREA_WIDTH, height: GRID_SCROLL_AREA_HEIGHT }}
    >
      <div
        className="grid"
        style={{
          width: GRID_SCROLL_AREA_WIDTH,
          height: gridLayoutHeight,
          gridTemplateColumns: `${GRID_VIEWPORT_WIDTH}px ${SCROLLBAR_TRACK_WIDTH}px`,
          gridTemplateRows: `${GRID_VIEWPORT_HEIGHT}px ${SCROLLBAR_TRACK_HEIGHT}px`,
        }}
      >
        <div
          className="row-start-1 col-start-1 shrink-0"
          style={{
            width: GRID_VIEWPORT_WIDTH,
            height: GRID_VIEWPORT_HEIGHT,
            backgroundColor: COLOR_TAN,
          }}
        >
          <div
            ref={scrollRef}
            className="h-full w-full overflow-auto visualization-grid-scroll"
          >
            <div className="inline-block align-top">
              <div
                className="grid shrink-0"
                style={{
                  width: gridWidth,
                  height: gridHeight,
                  gridTemplateColumns: `repeat(${GRID_COLS}, ${GRID_CELL_SIZE}px)`,
                  gridTemplateRows: `repeat(${GRID_ROWS}, ${GRID_CELL_SIZE}px)`,
                  borderTop: BORDER,
                  borderRight: BORDER,
                  borderBottom: BORDER,
                }}
              >
                {cells.map((row, rowIndex) =>
                  row.map((tileId, colIndex) => (
                    <GridCell
                      key={`${rowIndex}-${colIndex}`}
                      tileId={tileId}
                      row={rowIndex}
                      col={colIndex}
                      cellSize={GRID_CELL_SIZE}
                      isFirstColumn={colIndex === 0}
                      isPlacementActive={isPlacementActive}
                      onActivate={() => handleCellActivate(rowIndex, colIndex)}
                    />
                  )),
                )}
              </div>
            </div>
          </div>
        </div>

        <GridScrollBars
          scrollRef={scrollRef}
          viewportWidth={GRID_VIEWPORT_WIDTH}
        />

        <div
          className="row-start-2 col-start-2 shrink-0"
          style={{
            width: SCROLLBAR_TRACK_WIDTH,
            height: SCROLLBAR_TRACK_HEIGHT,
            backgroundColor: "transparent",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
