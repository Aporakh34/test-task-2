export function VisaLogo() {
  return (
    <svg viewBox="0 0 48 16" width="32" height="11" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="16" rx="2" fill="#1A1F71" />
      <text
        x="24"
        y="12"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="bold"
        fontFamily="Arial"
        fontStyle="italic"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardLogo() {
  return (
    <svg viewBox="0 0 36 24" width="28" height="18" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="12" r="10" fill="#EB001B" />
      <circle cx="22" cy="12" r="10" fill="#F79E1B" />
      <path
        d="M18,5.5 A10,10 0 0 1 18,18.5 A10,10 0 0 1 18,5.5"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function ApplePayIcon() {
  return (
    <svg viewBox="0 0 24 16" width="28" height="18" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" rx="2" fill="#000" />
      <text
        x="12"
        y="11"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontFamily="Arial"
        fontWeight="600"
      >
        Pay
      </text>
    </svg>
  );
}

export function BankIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="16"
      height="16"
      fill="currentColor"
    >
      <path d="M4 10v4h3V10H4zm6 0v4h3V10h-3zm-9 6h16v2H1v-2zM10 2L1 6v1h18V6L10 2zm6 8v4h3V10h-3z" />
    </svg>
  );
}
