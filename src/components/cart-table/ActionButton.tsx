import Image, { StaticImageData } from "next/image";

interface ActionButtonProps {
  icon: StaticImageData;
  label: string;
  onClick: () => void;
}

export default function ActionButton({
  icon,
  label,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 transition-opacity hover:opacity-75"
    >
      <Image
        src={icon}
        alt=""
        width={28}
        height={28}
        className="w-[22px] h-[22px] xl:w-6 xl:h-6 object-contain"
      />
      <span className="font-condensed text-[11px] xl:text-[13px] font-black uppercase tracking-wide text-black leading-none">
        {label}
      </span>
    </button>
  );
}
