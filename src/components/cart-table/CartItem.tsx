"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CartItem as CartItemType } from "@/types";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  selectLineTotal,
} from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const lineTotal = selectLineTotal(item).toFixed(2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22 }}
      className="flex items-center gap-4 py-4 border-b-(--border-width) border-(--color-cream-dark) last:border-0"
    >
      {/* Tile color swatch */}
      <div
        className="w-14 h-14 rounded-[var(--radius-tile)] flex-shrink-0 shadow-sm"
        style={{ backgroundColor: item.product.colorHex }}
        aria-label={item.product.name}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--color-charcoal)] truncate">
          {item.product.name}
        </p>
        <p className="text-xs text-[var(--color-warm-gray)] mt-0.5">
          €{item.product.price.toFixed(2)} / tile
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => dispatch(decrementQuantity(item.product.id))}
            className="w-6 h-6 rounded-full border-(--border-width) border-(--color-warm-gray-light) flex items-center justify-center text-[var(--color-charcoal-light)] hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)] transition-colors text-sm leading-none"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-sm font-medium text-[var(--color-charcoal)] w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(incrementQuantity(item.product.id))}
            className="w-6 h-6 rounded-full border-(--border-width) border-(--color-warm-gray-light) flex items-center justify-center text-[var(--color-charcoal-light)] hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)] transition-colors text-sm leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Line total + remove */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-semibold text-[var(--color-charcoal)]">
          €{lineTotal}
        </span>
        <button
          onClick={() => dispatch(removeItem(item.product.id))}
          className="text-[var(--color-warm-gray)] hover:text-red-500 transition-colors"
          aria-label={`Remove ${item.product.name}`}
        >
          <TrashIcon />
        </button>
      </div>
    </motion.div>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}
