import TableDataCell from "./TableDataCell";
import BracketDisplay from "./BracketDisplay";
import { BORDER_RADIUS, COLOR_TAN } from "./constants";

export default function CartTableEmptyRow() {
  return (
    <tr>
      <TableDataCell
        isFirstColumn
        style={{
          borderBottomLeftRadius: BORDER_RADIUS,
          backgroundColor: COLOR_TAN,
          minHeight: 72,
        }}
      >
        <div className="flex flex-col items-center justify-center gap-1 py-2 px-1">
          <span className="font-condensed text-[11px] xl:text-[12px] font-black uppercase tracking-wide text-center leading-tight text-black/50">
            No tiles
            <br />
            in cart
          </span>
        </div>
      </TableDataCell>

      <TableDataCell
        style={{ backgroundColor: COLOR_TAN, minHeight: 72 }}
        align="center"
      >
        <span className="text-black/25 text-lg leading-none select-none">—</span>
      </TableDataCell>

      <TableDataCell
        style={{ backgroundColor: COLOR_TAN, minHeight: 72 }}
        align="center"
      >
        <BracketDisplay>—</BracketDisplay>
      </TableDataCell>

      <TableDataCell
        style={{ backgroundColor: COLOR_TAN, minHeight: 72 }}
        align="center"
      >
        <BracketDisplay prefix="$">—</BracketDisplay>
      </TableDataCell>

      <TableDataCell style={{ backgroundColor: COLOR_TAN, minHeight: 72 }}>
        <span className="sr-only">Actions</span>
      </TableDataCell>
    </tr>
  );
}
