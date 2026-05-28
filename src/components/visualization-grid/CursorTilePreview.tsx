"use client";

import Image from "next/image";
import { getGridTileImage } from "@/lib/gridTileAssets";
import { GRID_CELL_SIZE } from "./constants";

interface CursorTilePreviewProps {
  tileId: string;
  clientX: number;
  clientY: number;
}

export default function CursorTilePreview({
  tileId,
  clientX,
  clientY,
}: CursorTilePreviewProps) {
  const tileImage = getGridTileImage(tileId);
  if (!tileImage) {
    return null;
  }

  const previewSize = GRID_CELL_SIZE;

  return (
    <div
      className="fixed z-[100] pointer-events-none"
      style={{
        left: clientX - previewSize / 2,
        top: clientY - previewSize / 2,
        width: previewSize,
        height: previewSize,
      }}
      aria-hidden
    >
      <Image
        src={tileImage}
        alt=""
        width={previewSize}
        height={previewSize}
        className="w-full h-full object-cover shadow-md"
        draggable={false}
        priority
      />
    </div>
  );
}
