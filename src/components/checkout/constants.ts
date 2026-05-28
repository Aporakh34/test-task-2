import { PaymentMethod, CheckoutFormData } from "@/types";

export const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  icon: string;
}[] = [
  { id: "credit_card", label: "Credit Card", icon: "💳" },
  { id: "paypal", label: "PayPal", icon: "🅿" },
  { id: "apple_pay", label: "Apple Pay", icon: "" },
  { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
];

export const INITIAL_CHECKOUT_FORM: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  paymentMethod: "credit_card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

export interface CheckoutFieldErrors {
  [key: string]: string;
}
