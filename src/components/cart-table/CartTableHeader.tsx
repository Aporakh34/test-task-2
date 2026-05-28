import TableHeaderCell from "./TableHeaderCell";
import { BORDER_RADIUS } from "./constants";

export default function CartTableHeader() {
  return (
    <thead>
      <tr>
        <TableHeaderCell
          isFirstColumn
          style={{ borderTopLeftRadius: BORDER_RADIUS }}
        >
          <span className="whitespace-nowrap">Tile Collection</span>
        </TableHeaderCell>
        <TableHeaderCell>Item</TableHeaderCell>
        <TableHeaderCell>
          Quantity<br />
          <span className="font-bold normal-case text-[13px] xl:text-[14px] tracking-normal max-[644px]:text-[11px]">
            (sq. ft.)
          </span>
        </TableHeaderCell>
        <TableHeaderCell>
          Unit Price<br />
          <span className="font-bold normal-case text-[13px] xl:text-[14px] tracking-normal max-[644px]:text-[11px]">
            ($)
          </span>
        </TableHeaderCell>
        <TableHeaderCell style={{ borderTopRightRadius: BORDER_RADIUS }}>
          Actions
        </TableHeaderCell>
      </tr>
    </thead>
  );
}
