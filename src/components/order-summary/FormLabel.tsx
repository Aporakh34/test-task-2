export default function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-condensed text-[18px] font-black uppercase tracking-wide whitespace-nowrap pt-0.5 shrink-0 leading-none 
      "
      style={{ color: "var(--color-text)" }}
    >
      {children}
    </span>
  );
}
