"use client";

interface BracketFieldProps {
  value: string | number;
  onChange?: (value: string) => void;
  prefix?: string;
  readOnly?: boolean;
  className?: string;
  inputClassName?: string;
  type?: "text" | "number";
}

export default function BracketField({
  value,
  onChange,
  prefix = "",
  readOnly = false,
  className = "",
  inputClassName = "",
  type = "text",
}: BracketFieldProps) {
  const displayValue = String(value);

  return (
    <span
      className={`inline-flex items-center justify-center font-bold text-[11px] sm:text-xs text-black ${className}`}
    >
      <span className="select-none">[</span>
      {readOnly || !onChange ? (
        <span className={`px-1 min-w-[2.5rem] text-center ${inputClassName}`}>
          {prefix}
          {displayValue}
        </span>
      ) : (
        <input
          type={type}
          value={displayValue}
          onChange={(event) => onChange(event.target.value)}
          className={`px-1 min-w-[2.5rem] max-w-[4.5rem] text-center bg-transparent border-none outline-none font-bold text-[11px] sm:text-xs ${inputClassName}`}
        />
      )}
      <span className="select-none">]</span>
    </span>
  );
}
