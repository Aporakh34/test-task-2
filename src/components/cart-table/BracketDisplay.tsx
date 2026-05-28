export default function BracketDisplay({
  children,
  prefix = "",
  className = "",
  valueClassName = "",
}: {
  children: React.ReactNode;
  prefix?: string;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-condensed font-bold text-[16px] xl:text-[18px] text-black tabular-nums leading-none ${className}`}
    >
      <span className="select-none">[</span>
      <span className={`text-center min-w-11 xl:min-w-12 ${valueClassName}`}>
        {prefix}
        {children}
      </span>
      <span className="select-none">]</span>
    </span>
  );
}
