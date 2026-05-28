import { CheckoutFormData, CheckoutFieldErrors } from "./constants";

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateCardNumber(cardNumber: string): boolean {
  return /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber.replace(/\s/g, ""));
}

export function formatCardNumber(value: string): string {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
  return digitsOnly.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
  if (digitsOnly.length >= 3) {
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
  }
  return digitsOnly;
}

export function validateCheckoutForm(
  formData: CheckoutFormData
): CheckoutFieldErrors {
  const errors: CheckoutFieldErrors = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required";
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!formData.address.trim()) errors.address = "Address is required";
  if (!formData.city.trim()) errors.city = "City is required";
  if (!formData.postalCode.trim()) errors.postalCode = "Postal code is required";
  if (!formData.country.trim()) errors.country = "Country is required";

  if (formData.paymentMethod === "credit_card") {
    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!validateCardNumber(formData.cardNumber)) {
      errors.cardNumber = "Enter a valid 16-digit card number";
    }
    if (!formData.cardExpiry.trim()) errors.cardExpiry = "Expiry is required";
    if (!formData.cardCvc.trim()) errors.cardCvc = "CVC is required";
  }

  return errors;
}
