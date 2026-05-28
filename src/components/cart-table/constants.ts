import type { CSSProperties } from "react";

export const COLOR_BORDER = "#1A1A1A";
export const COLOR_TAN = "#D9CCA6";
export const COLOR_CREAM = "#F4ECD8";
export const BORDER = `var(--border-width) solid ${COLOR_BORDER}`;
export const BORDER_BUTTON = BORDER;
export const BORDER_RADIUS = "6px";
export const CART_TABLE_COLUMNS = "26% 15% 20% 20% 19%";

export function getTableCellBorderStyle(options: {
  isFirstColumn?: boolean;
  isTopRow?: boolean;
}): CSSProperties {
  return {
    borderTop: options.isTopRow ? BORDER : "none",
    borderLeft: options.isFirstColumn ? BORDER : "none",
    borderRight: BORDER,
    borderBottom: BORDER,
  };
}
