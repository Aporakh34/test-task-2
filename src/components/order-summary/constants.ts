import { PaymentMethod } from "@/types";

export interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface FieldErrors {
  [key: string]: string;
}

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
