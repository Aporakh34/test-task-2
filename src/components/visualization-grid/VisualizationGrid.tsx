"use client";

import DesignGrid from "./DesignGrid";
import DesignPalette from "./DesignPalette";
import GridPlacementOverlay from "./GridPlacementOverlay";
import { BORDER_THICK, BORDER_RADIUS, COLOR_TAN } from "./constants";

export default function VisualizationGrid() {
  return (
    <div className="flex flex-col w-full shrink-0 px-2 pb-2 pt-13 relative overflow-hidden ">
      <GridPlacementOverlay />
      <div
        className="mx-0 flex flex-col overflow-hidden shrink-0"
        style={{
          backgroundColor: "transparent",
          border: BORDER_THICK,
          borderTopLeftRadius: BORDER_RADIUS,
          borderTopRightRadius: BORDER_RADIUS,
          borderBottomLeftRadius: BORDER_RADIUS,
          borderBottomRightRadius: BORDER_RADIUS,
        }}
      >
        <div className="flex min-h-0 overflow-hidden">
          <div className="flex shrink-0 flex-col pb-1.5">
            <header
              className="shrink-0 text-center px-3 pt-3 pb-4 xl:pt-4 xl:pb-6 "
              style={{ backgroundColor: COLOR_TAN }}
            >
              <h2 className="font-condensed font-bold uppercase text-[21px] xl:text-[24px] tracking-wide text-black leading-tight">
                Visualize Your Order:
              </h2>
              <p className="font-condensed font-bold normal-case text-[19px] xl:text-[21px] text-black leading-snug mt-1 tracking-normal">
                Drag and drop tiles here to create patterns.
              </p>
            </header>

            <div className="shrink-0 w-full">
              <DesignGrid />
            </div>
          </div>

          <DesignPalette />
        </div>
      </div>
    </div>
  );
}
