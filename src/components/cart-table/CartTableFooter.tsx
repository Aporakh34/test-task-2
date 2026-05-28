import Image from "next/image";
import handAddTile from "@/assets/cart-table/hand_add_tile.png";
import { CART_TABLE_COLUMNS } from "./constants";
import AddNewTilePicker from "./AddNewTilePicker";
import TotalRow from "./TotalRow";
import { VisualizationTileCatalogEntry } from "@/lib/visualizationTileCatalog";

interface CartTableFooterProps {
  subtotal: number;
  shipping: number;
  grandTotal: number;
  catalogTiles: VisualizationTileCatalogEntry[];
  onSelectTile: (tileId: string) => void;
}

export default function CartTableFooter({
  subtotal,
  shipping,
  grandTotal,
  catalogTiles,
  onSelectTile,
}: CartTableFooterProps) {
  return (
    <div
      className="grid mx-2 mb-2.5 items-start"
      style={{ gridTemplateColumns: CART_TABLE_COLUMNS }}
    >
      <div className="col-span-3 row-span-3 flex items-start gap-2 min-w-0 self-stretch">
        <Image
          src={handAddTile}
          alt=""
          width={handAddTile.width}
          height={handAddTile.height}
          className="w-[92px] xl:w-[104px] h-auto object-contain shrink-0 self-end"
        />
        <AddNewTilePicker
          catalogTiles={catalogTiles}
          onSelectTile={onSelectTile}
        />
      </div>

      <TotalRow label="Subtotal:" value={subtotal.toFixed(2)} />
      <TotalRow
        label="Shipping:"
        value={shipping === 0 ? "0.00" : shipping.toFixed(2)}
      />
      <TotalRow label="Grand Total:" value={grandTotal.toFixed(2)} bold />
    </div>
  );
}
