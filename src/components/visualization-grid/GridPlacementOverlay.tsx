"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectPaletteTile } from "@/lib/features/gridSlice";
import CursorTilePreview from "./CursorTilePreview";

export default function GridPlacementOverlay() {
  const dispatch = useAppDispatch();
  const selectedPaletteId = useAppSelector(
    (state) => state.grid.selectedPaletteId
  );
  const [cursorPosition, setCursorPosition] = useState<{
    clientX: number;
    clientY: number;
  } | null>(null);

  const isCarryingTile =
    selectedPaletteId !== null && selectedPaletteId !== "__eraser__";

  useEffect(() => {
    if (!isCarryingTile) {
      setCursorPosition(null);
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      setCursorPosition({
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dispatch(selectPaletteTile(null));
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dispatch, isCarryingTile]);

  if (!isCarryingTile || !cursorPosition || !selectedPaletteId) {
    return null;
  }

  return (
    <CursorTilePreview
      tileId={selectedPaletteId}
      clientX={cursorPosition.clientX}
      clientY={cursorPosition.clientY}
    />
  );
}
