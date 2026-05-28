"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getDesignPlateImage } from "@/lib/designPlateAssets";
import { selectPaletteTile } from "@/lib/features/gridSlice";
import PlaceholderTile from "./PlaceholderTile";
import {
  BORDER,
  BORDER_THICK,
  COLOR_CREAM,
  COLOR_TAN,
  PALETTE_COLUMNS,
  PALETTE_SLOTS,
} from "./constants";

export default function DesignPalette() {
  const dispatch = useAppDispatch();
  const selectedPaletteId = useAppSelector(
    (state) => state.grid.selectedPaletteId
  );

  return (
    <aside
      className="shrink-0 flex flex-col min-h-0 self-stretch"
      style={{
        width: "clamp(116px, 28%, 146px)",
        borderLeft: BORDER,
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        if (selectedPaletteId) {
          dispatch(selectPaletteTile(null));
        }
      }}
    >
      <div
        className="py-2.5 px-1 text-center font-display font-normal uppercase text-[17px] xl:text-[20px] leading-none tracking-wide shrink-0 whitespace-nowrap max-[1752px]:hidden"
        style={{
          backgroundColor: COLOR_TAN,
          borderBottom: BORDER,
        }}
      >
        Design Palette
      </div>

      <div
        className="flex-1 overflow-y-auto min-h-0 p-1.5"
        style={{ backgroundColor: COLOR_TAN }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          if (selectedPaletteId) {
            dispatch(selectPaletteTile(null));
          }
        }}
      >
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${PALETTE_COLUMNS}, minmax(0, 1fr))`,
          }}
        >
          {PALETTE_SLOTS.map((slot) => {
            const isSelected = selectedPaletteId === slot.id;
            const plateImage = getDesignPlateImage(slot.id);

            return (
              <motion.button
                key={slot.id}
                type="button"
                disabled={!slot.interactive}
                whileHover={slot.interactive ? { scale: 1.04 } : undefined}
                whileTap={slot.interactive ? { scale: 0.96 } : undefined}
                onClick={() => {
                  if (!slot.interactive) return;
                  dispatch(selectPaletteTile(isSelected ? null : slot.id));
                }}
                className="aspect-square w-full focus:outline-none disabled:cursor-default overflow-hidden cursor-pointer"
                style={{
                  border: isSelected ? BORDER_THICK : BORDER,
                  borderRadius: "4px",
                  backgroundColor: COLOR_CREAM,
                  padding: 0,
                }}
                title={slot.name}
                aria-label={`Select ${slot.name}`}
                aria-pressed={isSelected}
              >
                {plateImage ? (
                  <Image
                    src={plateImage}
                    alt=""
                    width={72}
                    height={72}
                    className="w-full h-full object-cover transition-opacity duration-200 ease-out"
                    style={{ opacity: isSelected ? 0.4 : 1 }}
                    draggable={false}
                  />
                ) : (
                  <PlaceholderTile variant="palette" showBorder={false} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
