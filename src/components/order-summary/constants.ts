import { PaymentMethod, CustomerForm, FieldErrors } from "@/types";

export type { CustomerForm, FieldErrors };

export type PaymentOption = {
  id: PaymentMethod;
  label: string;
};

export const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: "credit_card", label: "Credit/Debit Card" },
  { id: "paypal", label: "PayPal" },
  { id: "apple_pay", label: "Apple Pay" },
  { id: "bank_transfer", label: "Bank Transfer" },
];

export const EMPTY_CUSTOMER_FORM: CustomerForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};
