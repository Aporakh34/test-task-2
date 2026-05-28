import { COLOR_TAN, getTableCellBorderStyle } from "./constants";

export default function TableHeaderCell({
  children,
  isFirstColumn = false,
  style,
}: {
  children: React.ReactNode;
  isFirstColumn?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <th
      className="py-2 px-0.5 text-center font-condensed font-bold uppercase text-[15px] leading-tight tracking-wide max-[644px]:text-[12px]"
      style={{
        ...getTableCellBorderStyle({ isFirstColumn, isTopRow: true }),
        backgroundColor: COLOR_TAN,
        ...style,
      }}
    >
      {children}
    </th>
  );
}
