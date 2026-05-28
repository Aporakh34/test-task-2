"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentMethod } from "@/types";
import { CustomerForm, FieldErrors, PAYMENT_OPTIONS } from "./constants";
import CreditCardFields from "./CreditCardFields";
import { BORDER_BUTTON, COLOR_TAN } from "@/components/cart-table/constants";
import applePayLogo from "@/assets/payment/apple-pay-3.svg";
import bankTransferLogo from "@/assets/payment/bank_transfer_icon.png";

interface PaymentMethodSectionProps {
  paymentMethod: PaymentMethod;
  form: CustomerForm;
  errors: FieldErrors;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onFormChange: (field: keyof CustomerForm, value: string) => void;
}

export default function PaymentMethodSection({
  paymentMethod,
  form,
  errors,
  onPaymentMethodChange,
  onFormChange,
}: PaymentMethodSectionProps) {
  const PAYMENT_RADIO_DOT_COLOR = "#1A2847";
  const RADIO_BORDER = BORDER_BUTTON;
  const CARD_BG = "#faf5e2";

  function renderPaymentCard(options: {
    method: "apple_pay" | "bank_transfer";
    label: string;
    logo: { src: string; height: number; width: number };
  }) {
    const isSelected = paymentMethod === options.method;

    return (
      <button
        key={options.method}
        type="button"
        onClick={() => onPaymentMethodChange(options.method)}
        className="relative w-full px-3 py-5.5 rounded-md transition-opacity hover:opacity-90"
        style={{
          border: BORDER_BUTTON,
          backgroundColor: CARD_BG,
        }}
      >
        <span
          className="absolute left-2 top-2 w-[18px] h-[18px] rounded-full flex items-center justify-center"
          style={{ border: BORDER_BUTTON, backgroundColor: CARD_BG }}
          aria-hidden
        >
          {isSelected && (
            <span
              className="w-[8px] h-[8px] rounded-full block"
              style={{ backgroundColor: PAYMENT_RADIO_DOT_COLOR }}
            />
          )}
        </span>

        <div className="flex flex-col items-center justify-center gap-1.5">
          <Image
            src={options.logo}
            alt=""
            width={48}
            height={24}
            className="h-12 w-auto"
            priority
          />
          <span className="font-condensed text-[18px] font-black uppercase tracking-wide text-black leading-none">
            {options.label}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="px-4 pt-3 pb-2">
      <div
        className="inline-block p-1 mb-2 rounded-md"
        style={{ border: BORDER_BUTTON, backgroundColor: COLOR_TAN }}
      >
        <p
          className="font-condensed text-[18px] font-black uppercase tracking-widest text-black leading-none"
          style={{ letterSpacing: "normal" }}
        >
          Select Payment Method:
        </p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => onPaymentMethodChange("credit_card")}
          className="flex items-center gap-2 font-condensed text-[18px] font-black uppercase tracking-wide text-black leading-none hover:opacity-90"
        >
          <span
            className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
            style={{ border: RADIO_BORDER }}
            aria-hidden
          >
            {paymentMethod === "credit_card" && (
              <span
                className="w-2.5 h-2.5 rounded-full block"
                style={{ backgroundColor: PAYMENT_RADIO_DOT_COLOR }}
              />
            )}
          </span>
          Credit/Debit Card
        </button>

        <button
          type="button"
          onClick={() => onPaymentMethodChange("paypal")}
          className="flex items-center gap-2 font-condensed text-[18px] font-black uppercase tracking-wide text-black leading-none hover:opacity-90"
        >
          <span
            className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
            style={{ border: RADIO_BORDER }}
            aria-hidden
          >
            {paymentMethod === "paypal" && (
              <span
                className="w-2.5 h-2.5 rounded-full block"
                style={{ backgroundColor: PAYMENT_RADIO_DOT_COLOR }}
              />
            )}
          </span>
          <Image
            src="/paypal-4.svg"
            alt=""
            width={26}
            height={26}
            className="h-8 w-auto shrink-0"
          />
          PayPal
        </button>
      </div>

      <AnimatePresence>
        {paymentMethod === "credit_card" && (
          <motion.div
            key="credit-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <CreditCardFields
              form={form}
              errors={errors}
              onChange={onFormChange}
            />
          </motion.div>
        )}
        {paymentMethod === "paypal" && (
          <motion.div
            key="paypal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-2 text-[12px] font-condensed font-bold uppercase tracking-wide text-black/70 leading-none"
          >
            You&apos;ll be redirected to PayPal to complete payment.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2">
        {PAYMENT_OPTIONS.slice(2).map((option) => {
          if (option.id === "apple_pay") {
            return renderPaymentCard({
              method: "apple_pay",
              label: "Apple Pay",
              logo: applePayLogo,
            });
          }

          return renderPaymentCard({
            method: "bank_transfer",
            label: "Bank Transfer",
            logo: bankTransferLogo,
          });
        })}
      </div>
    </div>
  );
}
