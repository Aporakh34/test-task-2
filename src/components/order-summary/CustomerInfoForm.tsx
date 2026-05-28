import { CustomerForm, FieldErrors } from "./constants";
import FormLabel from "./FormLabel";
import FieldErrorMessage from "./FieldErrorMessage";

interface CustomerInfoFormProps {
  form: CustomerForm;
  errors: FieldErrors;
  onChange: (field: keyof CustomerForm, value: string) => void;
}

export default function CustomerInfoForm({
  form,
  errors,
  onChange,
}: CustomerInfoFormProps) {
  return (
    <div className="px-2 pt-2 pb-12 space-y-2">
      <div className="flex items-end gap-2">
        <FormLabel>Customer Name:</FormLabel>
        <div className="flex-1">
          <input
            className="input-underline"
            value={form.name}
            onChange={(event) => onChange("name", event.target.value)}
          />
          {errors.name && <FieldErrorMessage>{errors.name}</FieldErrorMessage>}
        </div>
      </div>

      <div className="flex items-end gap-2">
        <FormLabel>Phone:</FormLabel>
        <div className="w-28">
          <input
            className="input-underline"
            value={form.phone}
            onChange={(event) => onChange("phone", event.target.value)}
          />
        </div>
        <FormLabel>Email:</FormLabel>
        <div className="flex-1">
          <input
            type="email"
            className="input-underline"
            value={form.email}
            onChange={(event) => onChange("email", event.target.value)}
          />
          {errors.email && (
            <FieldErrorMessage>{errors.email}</FieldErrorMessage>
          )}
        </div>
      </div>

      <div className="flex items-end gap-2">
        <FormLabel>Shipping Address:</FormLabel>
        <div className="flex-1">
          <input
            className="input-underline"
            value={form.address}
            onChange={(event) => onChange("address", event.target.value)}
          />
          {errors.address && (
            <FieldErrorMessage>{errors.address}</FieldErrorMessage>
          )}
        </div>
      </div>

      <div className="flex items-end gap-2">
        <FormLabel>Project Notes:</FormLabel>
        <div className="flex-1">
          <input
            className="input-underline"
            value={form.notes}
            onChange={(event) => onChange("notes", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
