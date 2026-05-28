import Image from "next/image";
import addTileIcon from "@/assets/cart-table/add_tile_icon.png";
import { BORDER_BUTTON, COLOR_TAN, BORDER_RADIUS } from "./constants";

interface AddNewTileButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

export default function AddNewTileButton({
  onClick,
  isActive = false,
}: AddNewTileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isActive}
      className="flex items-center gap-2 px-2.5 py-1 mt-2 transition-opacity hover:opacity-85 shrink-0 self-start max-w-[10.75rem]"
      style={{
        border: BORDER_BUTTON,
        backgroundColor: COLOR_TAN,
        borderRadius: BORDER_RADIUS,
      }}
    >
      <span className="flex items-center gap-1 shrink-0">
        <span className="text-[24px] xl:text-[26px] font-black leading-none translate-y-[3px]">
          +
        </span>
        <Image
          src={addTileIcon}
          alt=""
          width={addTileIcon.width}
          height={addTileIcon.height}
          className="w-6 h-6 xl:w-7 xl:h-7 object-contain"
        />
      </span>
      <span className="font-condensed text-[13px] xl:text-[15px] font-black uppercase tracking-tight leading-none text-left text-black">
        Add New Tile
        <br />
        to Cart
      </span>
    </button>
  );
}
