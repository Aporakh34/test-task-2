import Image from "next/image";
import { motion } from "framer-motion";
import { CartItem } from "@/types";
import { getCartTableTileImages } from "@/lib/cartTableTileImages";
import iconAdd from "@/assets/cart-table/icon_add.png";
import iconRemove from "@/assets/cart-table/icon_remove.png";
import TableDataCell from "./TableDataCell";
import BracketDisplay from "./BracketDisplay";
import ActionButton from "./ActionButton";
import { BORDER_RADIUS } from "./constants";

interface CartTableRowProps {
  item: CartItem;
  onAdd: () => void;
  onRemove: () => void;
  isLastRow?: boolean;
}

export default function CartTableRow({
  item,
  onAdd,
  onRemove,
  isLastRow = false,
}: CartTableRowProps) {
  const { collection: collectionImage, item: itemImage } =
    getCartTableTileImages(item.product.id);

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TableDataCell
        isFirstColumn
        style={
          isLastRow ? { borderBottomLeftRadius: BORDER_RADIUS } : undefined
        }
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <Image
            src={collectionImage}
            alt=""
            width={48}
            height={48}
            className="w-11 h-11 xl:w-12 xl:h-12 object-contain"
          />
          <span className="font-condensed text-[11px] xl:text-[13px] font-black uppercase tracking-wide text-center leading-tight">
            {item.product.name}
          </span>
        </div>
      </TableDataCell>

      <TableDataCell>
        <div className="flex items-center justify-center">
          {itemImage && (
            <Image
              src={itemImage}
              alt=""
              width={80}
              height={80}
              className="w-[56px] h-[56px] xl:w-[64px] xl:h-[64px] object-contain"
            />
          )}
        </div>
      </TableDataCell>

      <TableDataCell align="center">
        <BracketDisplay>{item.quantity}</BracketDisplay>
      </TableDataCell>

      <TableDataCell align="center">
        <BracketDisplay prefix="$">{item.product.price.toFixed(2)}</BracketDisplay>
      </TableDataCell>

      <TableDataCell>
        <div className="flex items-center justify-center gap-1 xl:gap-1.5">
          <ActionButton icon={iconAdd} label="Add" onClick={onAdd} />
          <ActionButton icon={iconRemove} label="Remove" onClick={onRemove} />
        </div>
      </TableDataCell>
    </motion.tr>
  );
}
