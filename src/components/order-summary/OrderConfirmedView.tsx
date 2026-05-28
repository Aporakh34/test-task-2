"use client";

import { motion } from "framer-motion";
import { CustomerForm } from "./constants";

interface OrderConfirmedViewProps {
  form: CustomerForm;
  onNewOrder: () => void;
}

export default function OrderConfirmedView({
  form,
  onNewOrder,
}: OrderConfirmedViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div
        className="px-4 py-2.5 text-center"
        style={{
          backgroundColor: "var(--color-navy)",
          color: "var(--color-parchment-light)",
        }}
      >
        <h2 className="font-display text-xs font-normal uppercase tracking-widest">
          Order Confirmed
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: "#D4EED4", color: "#2A7A2A" }}
        >
          ✓
        </div>
        <h3 className="font-display text-xl font-normal uppercase tracking-wide text-[var(--color-text)]">
          Order Placed!
        </h3>
        <p className="text-xs max-w-[220px]" style={{ color: "var(--color-text-muted)" }}>
          Thank you, {form.name || "valued customer"}! Confirmation sent to{" "}
          {form.email || "your email"}.
        </p>
        <button
          type="button"
          onClick={() => {
            onNewOrder();
          }}
          className="font-condensed px-5 py-2 rounded text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          New Order
        </button>
      </motion.div>
    </div>
  );
}
