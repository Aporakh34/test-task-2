import { CustomerForm, FieldErrors } from "./constants";
import { formatCardNumber, formatExpiry } from "./validation";
import FieldErrorMessage from "./FieldErrorMessage";
import Image from "next/image";
import { BORDER_BUTTON, COLOR_CREAM } from "@/components/cart-table/constants";
import visaLogo from "@/assets/payment/Visa_Inc.-Logo.wine.svg";
import mastercardLogo from "@/assets/payment/Mastercard-Logo.wine.svg";

interface CreditCardFieldsProps {
  form: CustomerForm;
  errors: FieldErrors;
  onChange: (field: keyof CustomerForm, value: string) => void;
}

function CardBrandBadge({
  alt,
  src,
}: {
  alt: string;
  src: { src: string; height: number; width: number };
}) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md"
      style={{
        border: BORDER_BUTTON,
        backgroundColor: "#faf5e2",
        width: 55,
        height: 36,
      }}
    >
      <Image src={src} alt={alt} className="max-h-[26px] w-auto" priority />
    </span>
  );
}

export default function CreditCardFields({
  form,
  errors,
  onChange,
}: CreditCardFieldsProps) {
  const CARD_FIELD_BORDER = BORDER_BUTTON;
  const CARD_FIELD_BG = "#faf5e2";
  const CARD_FIELD_RADIUS = "8px";

  return (
    <div
      className="mb-2 p-3"
      style={{
        border: CARD_FIELD_BORDER,
        backgroundColor: COLOR_CREAM,
        borderRadius: CARD_FIELD_RADIUS,
      }}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center" aria-label="Save card">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <span
              className="inline-flex items-center justify-center rounded-full peer-checked:[&>span]:opacity-100"
              style={{
                width: 18,
                height: 18,
                border: CARD_FIELD_BORDER,
                backgroundColor: CARD_FIELD_BG,
              }}
              aria-hidden
            >
              <span className="w-2 h-2 rounded-full bg-(--color-navy) opacity-0" />
            </span>
          </label>
          <CardBrandBadge alt="Visa" src={visaLogo} />
          <CardBrandBadge alt="Mastercard" src={mastercardLogo} />
        </div>
      </div>

      <div>
        <p className="font-condensed text-[18px] font-black uppercase tracking-wide whitespace-nowrap leading-none text-black mb-1">
          Card Number
        </p>
        <input
          className="w-full px-3 py-2 font-condensed text-[16px] font-bold leading-none outline-none"
          style={{
            border: CARD_FIELD_BORDER,
            backgroundColor: CARD_FIELD_BG,
            borderRadius: CARD_FIELD_RADIUS,
          }}
          value={form.cardNumber}
          maxLength={19}
          onChange={(event) =>
            onChange("cardNumber", formatCardNumber(event.target.value))
          }
        />
        {errors.cardNumber && (
          <FieldErrorMessage>{errors.cardNumber}</FieldErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <p className="font-condensed text-[18px] font-black uppercase tracking-wide whitespace-nowrap leading-none text-black mb-1">
            Expiration /
          </p>
          <input
            className="w-full px-3 py-2 font-condensed text-[16px] font-bold leading-none outline-none"
            style={{
              border: CARD_FIELD_BORDER,
              backgroundColor: CARD_FIELD_BG,
              borderRadius: CARD_FIELD_RADIUS,
            }}
            value={form.expiry}
            maxLength={5}
            onChange={(event) =>
              onChange("expiry", formatExpiry(event.target.value))
            }
          />
          {errors.expiry && <FieldErrorMessage>{errors.expiry}</FieldErrorMessage>}
        </div>

        <div>
          <p className="font-condensed text-[18px] font-black uppercase tracking-wide whitespace-nowrap leading-none text-black mb-1">
            CVV
          </p>
          <input
            className="w-full px-3 py-2 font-condensed text-[16px] font-bold leading-none outline-none"
            style={{
              border: CARD_FIELD_BORDER,
              backgroundColor: CARD_FIELD_BG,
              borderRadius: CARD_FIELD_RADIUS,
            }}
            value={form.cvv}
            maxLength={4}
            onChange={(event) =>
              onChange("cvv", event.target.value.replace(/\D/g, "").slice(0, 4))
            }
          />
          {errors.cvv && <FieldErrorMessage>{errors.cvv}</FieldErrorMessage>}
        </div>
      </div>
    </div>
  );
}
