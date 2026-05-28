interface FormFieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}

export default function FormField({
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--color-charcoal-light)] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2.5 rounded-[var(--radius-button)] border text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] bg-[var(--color-cream)] outline-none transition-colors focus:ring-2 focus:ring-[var(--color-terracotta)]/30 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-[var(--color-cream-dark)] focus:border-[var(--color-terracotta)]"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
