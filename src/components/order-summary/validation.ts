import { PaymentMethod } from "@/types";
import { CustomerForm, FieldErrors } from "./constants";

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export function validateCustomerForm(
  form: CustomerForm,
  paymentMethod: PaymentMethod
): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim()) errors.name = "Required";
  if (!form.email.trim()) {
    errors.email = "Required";
  } else if (!validateEmail(form.email)) {
    errors.email = "Invalid email";
  }
  if (!form.address.trim()) errors.address = "Required";

  if (paymentMethod === "credit_card") {
    if (form.cardNumber.replace(/\s/g, "").length < 16) {
      errors.cardNumber = "Enter 16-digit card number";
    }
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) errors.expiry = "MM/YY";
    if (!form.cvv.match(/^\d{3,4}$/)) errors.cvv = "3-4 digits";
  }

  return errors;
}
