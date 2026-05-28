"use client";

import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import {
  selectSubtotal,
  selectShipping,
  selectGrandTotal,
} from "@/lib/features/cartSlice";
import { PaymentMethod } from "@/types";
import {
  BORDER_BUTTON,
  BORDER_RADIUS,
  COLOR_TAN,
} from "@/components/cart-table/constants";
import { CustomerForm, EMPTY_CUSTOMER_FORM, FieldErrors } from "./constants";
import { validateCustomerForm } from "./validation";
import OrderConfirmedView from "./OrderConfirmedView";
import CustomerInfoForm from "./CustomerInfoForm";
import OrderPanelTotals from "./OrderPanelTotals";
import PaymentMethodSection from "./PaymentMethodSection";

export default function OrderSummaryPanel() {
  const ORDER_SUMMARY_BORDER = BORDER_BUTTON;
  const ORDER_SUMMARY_BORDER_BUTTON = BORDER_BUTTON;

  const items = useAppSelector((state) => state.cart.items);
  const subtotal = selectSubtotal(items);
  const shipping = selectShipping(subtotal);
  const grandTotal = selectGrandTotal(subtotal, shipping);

  const [form, setForm] = useState<CustomerForm>(EMPTY_CUSTOMER_FORM);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit_card");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isPlaced, setIsPlaced] = useState(false);

  function handleChange(field: keyof CustomerForm, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: "" }));
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validationErrors = validateCustomerForm(form, paymentMethod);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsPlaced(true);
    }
  }

  if (isPlaced) {
    return (
      <OrderConfirmedView
        form={form}
        onNewOrder={() => {
          setForm(EMPTY_CUSTOMER_FORM);
          setIsPlaced(false);
        }}
      />
    );
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        className=""
        style={{
          backgroundColor: COLOR_TAN,
        }}
      >
        <div className="flex items-end w-full">
          <div
            className="px-4 py-1.5"
            style={{
              borderTop: ORDER_SUMMARY_BORDER_BUTTON,
              borderLeft: ORDER_SUMMARY_BORDER_BUTTON,
              borderRight: ORDER_SUMMARY_BORDER_BUTTON,
              borderBottom: "none",
              backgroundColor: COLOR_TAN,
              borderTopLeftRadius: BORDER_RADIUS,
              borderTopRightRadius: BORDER_RADIUS,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <h2 className="font-display text-[24px] leading-none font-normal uppercase tracking-wide text-black">
              Order Summary
            </h2>
          </div>

          <div
            className="flex-1"
            style={{ borderBottom: ORDER_SUMMARY_BORDER }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 overflow-y-auto"
        noValidate
      >
        <CustomerInfoForm form={form} errors={errors} onChange={handleChange} />

        <OrderPanelTotals
          subtotal={subtotal}
          shipping={shipping}
          grandTotal={grandTotal}
        />

        <PaymentMethodSection
          paymentMethod={paymentMethod}
          form={form}
          errors={errors}
          onPaymentMethodChange={setPaymentMethod}
          onFormChange={handleChange}
        />

        <div className="px-4 pt-2 pb-4 mt-auto">
          <button
            type="submit"
            className="font-display w-full py-1.5 rounded-md text-[32px] leading-none font-normal uppercase tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.98] "
            style={{
              border: BORDER_BUTTON,
              backgroundColor: "#3B4D71",
              lineHeight: "1",
            }}
          >
            Place Secure Order
          </button>
        </div>
      </form>
    </div>
  );
}
