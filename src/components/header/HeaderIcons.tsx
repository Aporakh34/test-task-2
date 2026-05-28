import { HEADER_OUTLINE } from "./constants";

export function ShoppingTrolleyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="28"
      viewBox="0 0 34 28"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12V5.5C5 4.12 6.12 3 7.5 3H11"
        stroke={HEADER_OUTLINE}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 7H27.5L25 19H12.5L10 11H28"
        stroke={HEADER_OUTLINE}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 19H24.5"
        stroke={HEADER_OUTLINE}
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="14" cy="23.5" r="2.75" fill={HEADER_OUTLINE} />
      <circle cx="23.5" cy="23.5" r="2.75" fill={HEADER_OUTLINE} />
    </svg>
  );
}

export function UserSilhouetteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle cx="12" cy="8.5" r="3.25" fill="white" />
      <path
        d="M6.5 19.5c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6"
        fill="white"
      />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.25}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}
