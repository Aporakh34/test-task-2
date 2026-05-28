"use client";

import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectPaletteTile,
  placeTile,
  eraseTile,
  clearGrid,
} from "@/lib/features/gridSlice";

export default function DesignTool() {
  const dispatch = useAppDispatch();
  const cells = useAppSelector((state) => state.grid.cells);
  const selectedPaletteId = useAppSelector(
    (state) => state.grid.selectedPaletteId
  );
  const availableProducts = useAppSelector(
    (state) => state.cart.availableProducts
  );

  function handleCellClick(row: number, col: number) {
    if (selectedPaletteId === "__eraser__") {
      dispatch(eraseTile({ row, col }));
    } else if (selectedPaletteId !== null) {
      dispatch(placeTile({ row, col }));
    }
  }

  function getCellColor(tileId: string | null): string | undefined {
    if (!tileId) return undefined;
    return availableProducts.find((p) => p.id === tileId)?.colorHex;
  }

  return (
    <div className="bg-[var(--color-white-warm)] rounded-[var(--radius-card)] shadow-sm border border-[var(--color-cream-dark)] p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-xl font-semibold text-[var(--color-charcoal)]">
            Design Your Layout
          </h2>
          <p className="text-xs text-[var(--color-warm-gray)] mt-0.5">
            Select a tile from the palette, then click a cell to place it
          </p>
        </div>
        <button
          onClick={() => dispatch(clearGrid())}
          className="text-xs text-[var(--color-warm-gray)] hover:text-red-500 transition-colors border border-[var(--color-cream-dark)] rounded px-3 py-1.5 hover:border-red-300"
        >
          Clear
        </button>
      </div>

      {/* Design Palette */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-warm-gray)] mb-3">
          Design Palette
        </p>
        <div className="flex flex-wrap gap-2">
          {availableProducts.map((product) => (
            <motion.button
              key={product.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                dispatch(
                  selectPaletteTile(
                    selectedPaletteId === product.id ? null : product.id
                  )
                )
              }
              className={`flex items-center gap-2 px-3 py-2 rounded-[var(--radius-button)] border text-xs font-medium transition-all ${
                selectedPaletteId === product.id
                  ? "border-[var(--color-charcoal)] shadow-md"
                  : "border-[var(--color-cream-dark)] hover:border-[var(--color-warm-gray-light)]"
              }`}
            >
              <span
                className="w-5 h-5 rounded-sm block flex-shrink-0"
                style={{ backgroundColor: product.colorHex }}
              />
              <span className="text-[var(--color-charcoal-light)]">
                {product.name}
              </span>
            </motion.button>
          ))}

          {/* Eraser tool */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              dispatch(
                selectPaletteTile(
                  selectedPaletteId === "__eraser__" ? null : "__eraser__"
                )
              )
            }
            className={`flex items-center gap-2 px-3 py-2 rounded-[var(--radius-button)] border text-xs font-medium transition-all ${
              selectedPaletteId === "__eraser__"
                ? "border-[var(--color-charcoal)] shadow-md"
                : "border-[var(--color-cream-dark)] hover:border-[var(--color-warm-gray-light)]"
            }`}
          >
            <span className="text-base leading-none">⌫</span>
            <span className="text-[var(--color-charcoal-light)]">Eraser</span>
          </motion.button>
        </div>
      </div>

      {/* 6×6 Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
        >
          {cells.map((row, rowIndex) =>
            row.map((cellTileId, colIndex) => {
              const cellColor = getCellColor(cellTileId);
              const isPlaced = cellTileId !== null;

              return (
                <motion.button
                  key={`${rowIndex}-${colIndex}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-14 h-14 rounded-[var(--radius-tile)] border-(--border-width) transition-colors relative overflow-hidden ${
                    isPlaced
                      ? "border-transparent shadow-sm"
                      : "border-[var(--color-cream-dark)] hover:border-[var(--color-warm-gray-light)] bg-[var(--color-cream)]"
                  } ${
                    selectedPaletteId !== null && !isPlaced
                      ? "cursor-cell"
                      : "cursor-pointer"
                  }`}
                  style={
                    isPlaced && cellColor
                      ? { backgroundColor: cellColor }
                      : undefined
                  }
                  aria-label={
                    isPlaced
                      ? `Cell ${rowIndex + 1},${colIndex + 1}: ${cellTileId}`
                      : `Empty cell ${rowIndex + 1},${colIndex + 1}`
                  }
                >
                  {!isPlaced && (
                    <span className="absolute inset-0 flex items-center justify-center text-[var(--color-cream-dark)] text-xs opacity-50">
                      +
                    </span>
                  )}
                </motion.button>
              );
            })
          )}
        </div>
      </div>

      {/* Selected tile indicator */}
      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-warm-gray)]">
        {selectedPaletteId && selectedPaletteId !== "__eraser__" ? (
          <>
            <span
              className="w-4 h-4 rounded-sm"
              style={{
                backgroundColor: availableProducts.find(
                  (p) => p.id === selectedPaletteId
                )?.colorHex,
              }}
            />
            <span>
              Placing:{" "}
              <span className="font-medium text-[var(--color-charcoal)]">
                {
                  availableProducts.find((p) => p.id === selectedPaletteId)
                    ?.name
                }
              </span>
            </span>
          </>
        ) : selectedPaletteId === "__eraser__" ? (
          <span>Eraser active — click a tile to remove it</span>
        ) : (
          <span>Select a tile from the palette to start designing</span>
        )}
      </div>
    </div>
  );
}
