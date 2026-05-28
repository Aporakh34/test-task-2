"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { selectCartLineCount } from "@/lib/features/cartSlice";
import {
  DECOR_DOTS,
  HEADER_OUTLINE,
  NAV_LINKS,
  USER_FILL,
} from "./constants";
import {
  ShoppingTrolleyIcon,
  UserSilhouetteIcon,
} from "./HeaderIcons";

function MobileMenuToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.path
        d="M4 6h16"
        variants={{
          closed: { rotate: 0, translateY: 0 },
          open: { rotate: 45, translateY: 6 },
        }}
        transition={{ duration: 0.18 }}
      />
      <motion.path
        d="M4 12h16"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.12 }}
      />
      <motion.path
        d="M4 18h16"
        variants={{
          closed: { rotate: 0, translateY: 0 },
          open: { rotate: -45, translateY: -6 },
        }}
        transition={{ duration: 0.18 }}
      />
    </motion.svg>
  );
}

export default function Header() {
  const cartLineCount = useAppSelector((state) =>
    selectCartLineCount(state.cart.items)
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

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
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          >
            <MobileMenuToggleIcon isOpen={isMobileMenuOpen} />
          </button>

          <button
            type="button"
            className="hidden lg:relative lg:flex items-center justify-center transition-opacity hover:opacity-70"
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

          <div className="hidden lg:flex items-center gap-1.5">
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.nav
              id="mobile-nav"
              className="absolute left-0 right-0 top-[48px] mx-4 rounded-md overflow-hidden"
              style={{
                border: `var(--border-width) solid ${HEADER_OUTLINE}`,
                backgroundColor: "var(--color-header-bg)",
              }}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="p-3 grid gap-2">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    className="relative flex items-center justify-center transition-opacity hover:opacity-70"
                    aria-label={`Cart (${cartLineCount} items)`}
                    onClick={() => setIsMobileMenuOpen(false)}
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

                  <button
                    type="button"
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    aria-label="Account"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span
                      className="w-10 h-10 rounded-full border-(--border-width) flex items-center justify-center shrink-0 overflow-hidden"
                      style={{
                        borderColor: HEADER_OUTLINE,
                        backgroundColor: USER_FILL,
                      }}
                      aria-hidden
                    >
                      <UserSilhouetteIcon />
                    </span>
                    <span
                      className="inline-flex items-center h-10 px-5 rounded-full font-sans text-[15px] font-semibold text-white border-(--border-width) whitespace-nowrap"
                      style={{
                        backgroundColor: USER_FILL,
                        borderColor: HEADER_OUTLINE,
                      }}
                    >
                      A. Smith
                    </span>
                  </button>

                  <button
                    type="button"
                    className="font-condensed text-[14px] font-black uppercase tracking-wide text-black px-3 py-2 rounded-sm transition-opacity hover:opacity-70"
                    style={{ border: `var(--border-width) solid transparent` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <div
                  className="my-1"
                  style={{ borderTop: `var(--border-width) solid ${HEADER_OUTLINE}` }}
                  aria-hidden
                />

                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-condensed text-[14px] font-black uppercase tracking-wide text-black px-3 py-2 rounded-sm transition-opacity hover:opacity-70"
                    style={{
                      border: `var(--border-width) solid transparent`,
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
