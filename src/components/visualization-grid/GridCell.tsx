"use client";

import Image from "next/image";
import PlaceholderTile from "./PlaceholderTile";
import { BORDER } from "./constants";
import { getGridTileImage, getGridTileLabel } from "@/lib/gridTileAssets";

interface GridCellProps {
  tileId: string | null;
  row: number;
  col: number;
  cellSize: number;
  isFirstColumn?: boolean;
  isPlacementActive: boolean;
  onActivate: () => void;
}

export default function GridCell({
  tileId,
  row,
  col,
  cellSize,
  isFirstColumn = false,
  isPlacementActive,
  onActivate,
}: GridCellProps) {
  const tileImage = tileId ? getGridTileImage(tileId) : undefined;
  const isInteractive = isPlacementActive || Boolean(tileId);

  return (
    <button
      type="button"
      onClick={onActivate}
      className="group relative focus:outline-none p-0 overflow-hidden"
      style={{
        width: cellSize,
        height: cellSize,
        boxSizing: "border-box",
        cursor: isInteractive ? "pointer" : "default",
        borderRight: BORDER,
        borderBottom: BORDER,
        borderLeft: isFirstColumn ? "none" : undefined,
      }}
      aria-label={`Grid cell ${row + 1}, ${col + 1}${
        tileId ? `, ${getGridTileLabel(tileId)}` : ", empty"
      }`}
    >
      {tileImage ? (
        <Image
          src={tileImage}
          alt=""
          width={cellSize}
          height={cellSize}
          className="w-full h-full object-cover transition-opacity duration-200 ease-out group-hover:opacity-75"
          draggable={false}
        />
      ) : (
        <div
          className={`w-full h-full transition-opacity duration-200 ease-out ${
            isPlacementActive ? "group-hover:opacity-75" : ""
          }`}
        >
          <PlaceholderTile variant="empty" showBorder={false} />
        </div>
      )}
    </button>
  );
}
