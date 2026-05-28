import {
  COLOR_TAN,
  BORDER,
  getPlaceholderPatternStyle,
  type PlaceholderTilePattern,
} from "./constants";

interface PlaceholderTileProps {
  swatch?: string;
  pattern?: PlaceholderTilePattern;
  variant?: "empty" | "filled" | "palette";
  showBorder?: boolean;
  className?: string;
}

export default function PlaceholderTile({
  swatch,
  pattern = "solid",
  variant = "empty",
  showBorder = true,
  className = "",
}: PlaceholderTileProps) {
  const isEmpty = variant === "empty";

  return (
    <div
      className={`w-full h-full ${className}`}
      style={{
        border: showBorder ? BORDER : "none",
        borderRadius: variant === "palette" ? "4px" : undefined,
        backgroundColor: isEmpty ? COLOR_TAN : undefined,
        ...(isEmpty || !swatch
          ? {}
          : getPlaceholderPatternStyle(swatch, pattern)),
      }}
      aria-hidden={isEmpty}
    />
  );
}
