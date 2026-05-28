import { BORDER, COLOR_TAN, COLOR_CREAM, BORDER_RADIUS } from "./constants";

interface TotalRowProps {
  label: string;
  value: string;
  bold?: boolean;
}

export default function TotalRow({ label, value, bold = false }: TotalRowProps) {
  return (
    <>
      <span
        className={`col-start-4 -ml-0.5 font-condensed text-[16px] xl:text-[17px] uppercase tracking-wide text-right leading-none whitespace-nowrap flex items-center justify-end pr-1 min-h-[32px] xl:min-h-[36px] ${
          bold ? "font-black" : "font-bold"
        }`}
      >
        {label}
      </span>
      <span
        className={`col-start-5 -ml-0.5 inline-flex items-center justify-between font-condensed tabular-nums leading-none text-center min-h-[32px] xl:min-h-[36px] px-1 ${
          bold ? "text-[17px] xl:text-[18px] font-black" : "text-[16px] xl:text-[17px] font-bold"
        }`}
        style={{
          width: "calc(100% + 2px)",
          borderLeft: BORDER,
          borderRight: BORDER,
          borderBottom: BORDER,
          borderTop: "none",
          backgroundColor: bold ? COLOR_TAN : COLOR_CREAM,
          borderBottomLeftRadius: bold ? BORDER_RADIUS : undefined,
          borderBottomRightRadius: bold ? BORDER_RADIUS : undefined,
        }}
      >
        <span className="select-none shrink-0">[</span>
        <span className="flex-1 text-center">${value}</span>
        <span className="select-none shrink-0">]</span>
      </span>
    </>
  );
}
