"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckoutFormData } from "@/types";
import {
  INITIAL_CHECKOUT_FORM,
  PAYMENT_METHODS,
  CheckoutFieldErrors,
} from "./constants";
import {
  formatCardNumber,
  formatExpiry,
  validateCheckoutForm,
} from "./validation";
import FormField from "./FormField";
import CheckoutSuccess from "./CheckoutSuccess";

export default function CheckoutForm() {
  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_CHECKOUT_FORM);
  const [errors, setErrors] = useState<CheckoutFieldErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(field: keyof CheckoutFormData, value: string) {
    setFormData((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: "" }));
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return (
      <CheckoutSuccess
        formData={formData}
        onReset={() => {
          setFormData(INITIAL_CHECKOUT_FORM);
          setIsSubmitted(false);
        }}
      />
    );
  }

  return (
    <div className="bg-[var(--color-white-warm)] rounded-[var(--radius-card)] shadow-sm border border-[var(--color-cream-dark)]">
      <div className="px-6 py-5 border-b border-[var(--color-cream-dark)]">
        <h2 className="font-serif text-xl font-semibold text-[var(--color-charcoal)]">
          Checkout
        </h2>
        <p className="text-xs text-[var(--color-warm-gray)] mt-1">
          Secure checkout — all fields required
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6" noValidate>
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-warm-gray)] mb-4">
            Shipping Information
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="First Name"
              value={formData.firstName}
              error={errors.firstName}
              onChange={(value) => handleChange("firstName", value)}
              placeholder="Jane"
            />
            <FormField
              label="Last Name"
              value={formData.lastName}
              error={errors.lastName}
              onChange={(value) => handleChange("lastName", value)}
              placeholder="Smith"
            />
          </div>
          <div className="mt-3">
            <FormField
              label="Email"
              type="email"
              value={formData.email}
              error={errors.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="jane@example.com"
            />
          </div>
          <div className="mt-3">
            <FormField
              label="Street Address"
              value={formData.address}
              error={errors.address}
              onChange={(value) => handleChange("address", value)}
              placeholder="123 Pottery Lane"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <FormField
              label="City"
              value={formData.city}
              error={errors.city}
              onChange={(value) => handleChange("city", value)}
              placeholder="Barcelona"
            />
            <FormField
              label="Postal Code"
              value={formData.postalCode}
              error={errors.postalCode}
              onChange={(value) => handleChange("postalCode", value)}
              placeholder="08001"
            />
          </div>
          <div className="mt-3">
            <FormField
              label="Country"
              value={formData.country}
              error={errors.country}
              onChange={(value) => handleChange("country", value)}
              placeholder="Spain"
            />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-warm-gray)] mb-4">
            Payment Method
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => handleChange("paymentMethod", method.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-[var(--radius-button)] border text-sm font-medium transition-all ${
                  formData.paymentMethod === method.id
                    ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)]"
                    : "border-[var(--color-cream-dark)] text-[var(--color-charcoal-light)] hover:border-[var(--color-warm-gray-light)]"
                }`}
              >
                <span>{method.icon}</span>
                <span>{method.label}</span>
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {formData.paymentMethod === "credit_card" && (
            <motion.section
              key="credit-card-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden" }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-warm-gray)] mb-4">
                Card Details
              </h3>
              <FormField
                label="Card Number"
                value={formData.cardNumber}
                error={errors.cardNumber}
                onChange={(value) => handleChange("cardNumber", formatCardNumber(value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <FormField
                  label="Expiry (MM/YY)"
                  value={formData.cardExpiry}
                  error={errors.cardExpiry}
                  onChange={(value) => handleChange("cardExpiry", formatExpiry(value))}
                  placeholder="08/28"
                  maxLength={5}
                />
                <FormField
                  label="CVC"
                  value={formData.cardCvc}
                  error={errors.cardCvc}
                  onChange={(value) =>
                    handleChange("cardCvc", value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </motion.section>
          )}

          {formData.paymentMethod === "paypal" && (
            <motion.div
              key="paypal-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-[var(--radius-button)] bg-blue-50 border border-blue-100 text-sm text-blue-700"
            >
              You&apos;ll be redirected to PayPal to complete your payment securely.
            </motion.div>
          )}

          {formData.paymentMethod === "apple_pay" && (
            <motion.div
              key="apple-pay-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-[var(--radius-button)] bg-gray-50 border border-gray-200 text-sm text-gray-700"
            >
              Apple Pay will be presented at order confirmation.
            </motion.div>
          )}

          {formData.paymentMethod === "bank_transfer" && (
            <motion.div
              key="bank-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-[var(--radius-button)] bg-amber-50 border border-amber-100 text-sm text-amber-700"
            >
              Bank transfer details will be sent to your email after order
              confirmation.
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          className="w-full py-3.5 rounded-[var(--radius-button)] bg-[var(--color-terracotta)] text-white font-semibold text-sm hover:bg-[var(--color-terracotta-dark)] active:scale-[0.98] transition-all"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
