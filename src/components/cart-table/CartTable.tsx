"use client";

import { AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
  selectSubtotal,
  selectShipping,
  selectGrandTotal,
} from "@/lib/features/cartSlice";
import { VISUALIZATION_TILE_CATALOG } from "@/lib/visualizationTileCatalog";
import { CART_TABLE_COLUMNS } from "./constants";
import CartTableHeader from "./CartTableHeader";
import CartTableRow from "./CartTableRow";
import CartTableEmptyRow from "./CartTableEmptyRow";
import CartTableFooter from "./CartTableFooter";

export default function CartTable() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = selectSubtotal(items);
  const shipping = selectShipping(subtotal);
  const grandTotal = selectGrandTotal(subtotal, shipping);

  function handleSelectTile(tileId: string) {
    dispatch(addItem(tileId));
  }

  const isCartEmpty = items.length === 0;

  return (
    <div className="flex flex-col w-full shrink-0 text-[110%]">
      <h2 className="font-display w-full px-3 pt-0 pb-2 text-[36px] xl:text-[46px] font-normal uppercase tracking-wide text-black leading-none shrink-0 text-left">
        Shopping Cart &amp; Design Tool
      </h2>

      <div className="mx-2 shrink-0">
        <table
          className="w-full text-black"
          style={{
            borderCollapse: "separate",
            borderSpacing: 0,
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            <col style={{ width: "26%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "19%" }} />
          </colgroup>

          <CartTableHeader />

          <tbody>
            {isCartEmpty ? (
              <CartTableEmptyRow />
            ) : (
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                  <CartTableRow
                    key={item.product.id}
                    item={item}
                    isLastRow={index === items.length - 1}
                    onAdd={() => dispatch(incrementQuantity(item.product.id))}
                    onRemove={() =>
                      dispatch(decrementQuantity(item.product.id))
                    }
                  />
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      <CartTableFooter
        subtotal={subtotal}
        shipping={shipping}
        grandTotal={grandTotal}
        catalogTiles={VISUALIZATION_TILE_CATALOG}
        onSelectTile={handleSelectTile}
      />
    </div>
  );
}
