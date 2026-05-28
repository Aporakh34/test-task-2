export default function FieldErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-[9px] text-red-500 mt-0.5">{children}</p>;
}
