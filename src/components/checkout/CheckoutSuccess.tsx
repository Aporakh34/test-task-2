"use client";

import { motion } from "framer-motion";
import { CheckoutFormData } from "@/types";
import { INITIAL_CHECKOUT_FORM } from "./constants";

interface CheckoutSuccessProps {
  formData: CheckoutFormData;
  onReset: () => void;
}

export default function CheckoutSuccess({
  formData,
  onReset,
}: CheckoutSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[var(--color-white-warm)] rounded-[var(--radius-card)] shadow-sm border border-[var(--color-cream-dark)] p-10 flex flex-col items-center text-center gap-4"
    >
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
        ✓
      </div>
      <h3 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)]">
        Order Placed!
      </h3>
      <p className="text-[var(--color-warm-gray)] text-sm max-w-xs">
        Thank you, {formData.firstName}! Your handcrafted tiles are being
        prepared. You&apos;ll receive a confirmation at {formData.email}.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 px-6 py-2.5 rounded-[var(--radius-button)] bg-[var(--color-terracotta)] text-white text-sm font-medium hover:bg-[var(--color-terracotta-dark)] transition-colors"
      >
        Place Another Order
      </button>
    </motion.div>
  );
}

export { INITIAL_CHECKOUT_FORM };
