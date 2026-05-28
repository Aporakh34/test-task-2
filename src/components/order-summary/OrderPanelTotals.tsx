import BracketDisplay from "@/components/cart-table/BracketDisplay";

interface OrderPanelTotalsProps {
  subtotal: number;
  shipping: number;
  grandTotal: number;
}

export default function OrderPanelTotals({
  subtotal,
  shipping,
  grandTotal,
}: OrderPanelTotalsProps) {
  return (
    <>
      <div className="mx-4 my-2 h-[3px] bg-black" />

      <div className="px-4 pb-3 flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-2 leading-none">
          <span className="font-condensed text-[16px] font-black uppercase tracking-wide text-black/90">
            Subtotal:
          </span>
          <BracketDisplay
            prefix="$"
            className="text-[18px] xl:text-[20px]"
            valueClassName="min-w-[4.5rem] xl:min-w-[5.25rem]"
          >
            {subtotal.toFixed(2)}
          </BracketDisplay>
        </div>

        <div className="flex items-center gap-2 leading-none">
          <span className="font-condensed text-[16px] font-black uppercase tracking-wide text-black/90">
            Shipping:
          </span>
          <BracketDisplay
            prefix="$"
            className="text-[18px] xl:text-[20px]"
            valueClassName="min-w-[4.5rem] xl:min-w-[5.25rem]"
          >
            {shipping.toFixed(2)}
          </BracketDisplay>
        </div>

        <div className="flex items-center gap-2 leading-none">
          <span className="font-condensed text-[16px] font-black uppercase tracking-widest text-black">
            Grand Total:
          </span>
          <BracketDisplay
            prefix="$"
            className="text-[18px] xl:text-[20px]"
            valueClassName="min-w-[4.5rem] xl:min-w-[5.25rem]"
          >
            {grandTotal.toFixed(2)}
          </BracketDisplay>
        </div>
      </div>

    
    </>
  );
}
