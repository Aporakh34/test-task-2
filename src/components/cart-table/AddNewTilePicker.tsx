"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getGridTileImage } from "@/lib/gridTileAssets";
import {
  CART_TILE_QUANTITY,
  VisualizationTileCatalogEntry,
} from "@/lib/visualizationTileCatalog";
import AddNewTileButton from "./AddNewTileButton";
import VerticalScrollBar from "./VerticalScrollBar";
import { BORDER, BORDER_RADIUS, COLOR_CREAM, COLOR_TAN } from "./constants";

const PICKER_SCROLL_MAX_HEIGHT = 268;
const PICKER_PANEL_WIDTH = "15.5rem";

interface AddNewTilePickerProps {
  catalogTiles: VisualizationTileCatalogEntry[];
  onSelectTile: (tileId: string) => void;
}

export default function AddNewTilePicker({
  catalogTiles,
  onSelectTile,
}: AddNewTilePickerProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tileListScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPickerOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isPickerOpen]);

  function handleTogglePicker() {
    setIsPickerOpen((open) => !open);
  }

  function handleSelectTile(tileId: string) {
    onSelectTile(tileId);
    setIsPickerOpen(false);
  }

  return (
    <div ref={containerRef} className="relative self-start">
      <AddNewTileButton onClick={handleTogglePicker} isActive={isPickerOpen} />

      {isPickerOpen && (
        <div
          className="absolute left-0 bottom-full z-50 mb-2 shadow-sm"
          style={{
            border: BORDER,
            borderRadius: BORDER_RADIUS,
            backgroundColor: COLOR_CREAM,
            width: PICKER_PANEL_WIDTH,
            padding: "0.625rem",
          }}
          role="menu"
          aria-label="Choose a visualization tile to add"
        >
          <p className="font-condensed text-[10px] xl:text-[11px] font-bold uppercase text-center text-black mb-1.5 leading-tight">
            Visualize tiles
          </p>

          <div
            className="flex min-h-0"
            style={{ maxHeight: PICKER_SCROLL_MAX_HEIGHT }}
          >
            <div
              ref={tileListScrollRef}
              className="visualization-grid-scroll flex-1 min-w-0 overflow-y-auto overflow-x-hidden"
              style={{ maxHeight: PICKER_SCROLL_MAX_HEIGHT }}
            >
              <div className="grid grid-cols-2 gap-1.5 pr-1">
                {catalogTiles.map((tile) => {
                  const tileImage = getGridTileImage(tile.id);

                  return (
                    <button
                      key={tile.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleSelectTile(tile.id)}
                      className="flex flex-col items-center gap-0.5 p-1.5 transition-opacity hover:opacity-80 focus:outline-none"
                      style={{
                        border: BORDER,
                        borderRadius: "4px",
                        backgroundColor: COLOR_TAN,
                      }}
                    >
                      {tileImage && (
                        <Image
                          src={tileImage}
                          alt=""
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover"
                        />
                      )}
                      <span className="font-condensed text-[9px] xl:text-[10px] font-black uppercase leading-tight text-center text-black">
                        {tile.name}
                      </span>
                      <span className="font-condensed text-[8px] font-bold leading-none text-black/70">
                        {CART_TILE_QUANTITY} sq · ${tile.unitPrice.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <VerticalScrollBar
              scrollRef={tileListScrollRef}
              trackBorder="none"
              size="compact"
            />
          </div>
        </div>
      )}
    </div>
  );
}
