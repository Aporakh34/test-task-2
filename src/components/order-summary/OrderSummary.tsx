"use client";

import { AnimatePresence } from "framer-motion";
import CartItem from "@/components/cart-table/CartItem";
import { useAppSelector } from "@/lib/hooks";
import {
  selectSubtotal,
  selectShipping,
  selectGrandTotal,
} from "@/lib/features/cartSlice";

export default function OrderSummary() {
  const items = useAppSelector((state) => state.cart.items);

  const subtotal = selectSubtotal(items);
  const shipping = selectShipping(subtotal);
  const grandTotal = selectGrandTotal(subtotal, shipping);

  const isFreeShipping = shipping === 0;
  const amountUntilFreeShipping = 500 - subtotal;

  return (
    <div className="bg-[var(--color-white-warm)] rounded-[var(--radius-card)] shadow-sm border border-[var(--color-cream-dark)] flex flex-col h-full">
      {/* Panel header */}
      <div className="px-6 py-5 border-b border-[var(--color-cream-dark)]">
        <h2 className="font-serif text-xl font-semibold text-[var(--color-charcoal)]">
          Your Order
        </h2>
        <p className="text-xs text-[var(--color-warm-gray)] mt-1">
          {items.length} item{items.length !== 1 ? "s" : ""} selected
        </p>
      </div>

      {/* Free shipping progress */}
      {!isFreeShipping && amountUntilFreeShipping > 0 && (
        <div className="px-6 py-3 bg-[var(--color-cream)] border-b border-[var(--color-cream-dark)]">
          <p className="text-xs text-[var(--color-warm-gray)]">
            Add{" "}
            <span className="font-semibold text-[var(--color-terracotta)]">
              €{amountUntilFreeShipping.toFixed(2)}
            </span>{" "}
            more for free shipping
          </p>
          <div className="mt-1.5 h-1.5 rounded-full bg-[var(--color-cream-dark)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-terracotta)] transition-all duration-500"
              style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {isFreeShipping && (
        <div className="px-6 py-2.5 bg-green-50 border-b border-green-100 flex items-center gap-2">
          <span className="text-green-600 text-sm">✓</span>
          <p className="text-xs text-green-700 font-medium">
            You&apos;ve unlocked free shipping!
          </p>
        </div>
      )}

      {/* Cart items list */}
      <div className="flex-1 overflow-y-auto px-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-[var(--color-warm-gray)] text-sm">
              Your cart is empty
            </p>
            <p className="text-[var(--color-warm-gray-light)] text-xs mt-1">
              Add tiles from the collection below
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Totals */}
      <div className="px-6 py-5 border-t border-[var(--color-cream-dark)] space-y-2.5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--color-warm-gray)]">Subtotal</span>
          <span className="font-medium text-[var(--color-charcoal)]">
            €{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--color-warm-gray)]">Shipping</span>
          {isFreeShipping ? (
            <span className="font-medium text-green-600">Free</span>
          ) : (
            <span className="font-medium text-[var(--color-charcoal)]">
              €{shipping.toFixed(2)}
            </span>
          )}
        </div>

        <div className="h-px bg-[var(--color-cream-dark)]" />

        <div className="flex justify-between items-center">
          <span className="font-semibold text-[var(--color-charcoal)]">
            Grand Total
          </span>
          <span className="font-bold text-lg text-[var(--color-charcoal)]">
            €{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
