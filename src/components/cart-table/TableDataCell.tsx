import { getTableCellBorderStyle } from "./constants";

export default function TableDataCell({
  children,
  align = "middle",
  isFirstColumn = false,
  style,
}: {
  children: React.ReactNode;
  align?: "middle" | "center";
  isFirstColumn?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <td
      className={`align-middle py-1.5 px-0.5 ${
        align === "center" ? "text-center" : ""
      }`}
      style={{
        ...getTableCellBorderStyle({ isFirstColumn }),
        backgroundColor: "transparent",
        ...style,
      }}
    >
      {align === "center" ? (
        <div className="flex justify-center">{children}</div>
      ) : (
        children
      )}
    </td>
  );
}
