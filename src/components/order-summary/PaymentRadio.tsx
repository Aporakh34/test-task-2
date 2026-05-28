import { PaymentMethod } from "@/types";
import { BORDER_BUTTON, COLOR_CREAM, COLOR_TAN } from "@/components/cart-table/constants";

interface PaymentRadioProps {
  id: PaymentMethod;
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon?: React.ReactNode;
}

export default function PaymentRadio({
  label,
  selected,
  onSelect,
  icon,
}: PaymentRadioProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center gap-2 px-2.5 py-2 rounded-sm text-[10px] font-condensed font-bold uppercase tracking-wide transition-opacity hover:opacity-90"
      style={{
        border: BORDER_BUTTON,
        backgroundColor: selected ? COLOR_TAN : COLOR_CREAM,
        color: "#1A1A1A",
      }}
    >
      <span
        className="w-3 h-3 rounded-full border-(--border-width) shrink-0 flex items-center justify-center"
        style={{ borderColor: "#1A2847" }}
      >
        {selected && (
          <span
            className="w-1.5 h-1.5 rounded-full block"
            style={{ backgroundColor: "#1A2847" }}
          />
        )}
      </span>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  );
}
