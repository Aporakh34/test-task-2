"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectCartLineCount } from "@/lib/features/cartSlice";
import {
  DECOR_DOTS,
  HEADER_OUTLINE,
  NAV_LINKS,
  USER_FILL,
} from "./constants";
import {
  MenuIcon,
  ShoppingTrolleyIcon,
  UserSilhouetteIcon,
} from "./HeaderIcons";

export default function Header() {
  const cartLineCount = useAppSelector((state) =>
    selectCartLineCount(state.cart.items)
  );

  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{
        backgroundColor: "var(--color-header-bg)",
        borderBottom: `var(--border-width) solid ${HEADER_OUTLINE}`,
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-10 h-[48px] grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div className="flex items-center gap-2 shrink-0" aria-hidden>
          {DECOR_DOTS.map((dot, index) => (
            <span
              key={index}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dot.color }}
            />
          ))}
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 min-w-0 pl-[155]">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="font-condensed text-[13px] xl:text-sm font-bold uppercase tracking-wide text-black whitespace-nowrap transition-opacity hover:opacity-70"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="lg:hidden" aria-hidden />

        <div className="flex items-center justify-end gap-5 shrink-0">
          <button
            type="button"
            className="lg:hidden p-1 text-black mr-1"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <button
            type="button"
            className="relative flex items-center justify-center transition-opacity hover:opacity-70"
            aria-label={`Cart (${cartLineCount} items)`}
          >
            <ShoppingTrolleyIcon />
            {cartLineCount > 0 && (
              <span
                className="absolute -top-2 -right-2.5 min-w-[22px] h-[22px] px-0.5 rounded-full font-condensed text-[11px] font-bold leading-none flex items-center justify-center text-black border-(--border-width)"
                style={{
                  backgroundColor: "var(--color-header-badge)",
                  borderColor: HEADER_OUTLINE,
                }}
              >
                {cartLineCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1.5">
            <div
              className="w-10 h-10 rounded-full border-(--border-width) flex items-center justify-center shrink-0 overflow-hidden"
              style={{
                borderColor: HEADER_OUTLINE,
                backgroundColor: USER_FILL,
              }}
              aria-hidden
            >
              <UserSilhouetteIcon />
            </div>
            <span
              className="hidden sm:inline-flex items-center h-10 px-5 rounded-full font-sans text-[15px] font-semibold text-white border-(--border-width) whitespace-nowrap"
              style={{
                backgroundColor: USER_FILL,
                borderColor: HEADER_OUTLINE,
              }}
            >
              A. Smith
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
